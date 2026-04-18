# 04. Bảo Mật API & Edge Functions

## 4. Bảo Mật API & Edge Functions

### 4.1 API Security Headers

```typescript
// supabase/functions/_shared/cors.ts

export const corsHeaders = {
  "Access-Control-Allow-Origin": "*", // Restrict in production
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": [
    "authorization",
    "content-type",
    "x-client-info",
    "apikey",
    "x-requested-with",
  ].join(", "),
  "Access-Control-Max-Age": "86400", // 24 hours
  "Access-Control-Allow-Credentials": "true",

  // Security headers
  "X-Content-Type-Options": "nosniff",
  "X-Frame-Options": "DENY",
  "X-XSS-Protection": "1; mode=block",
  "Strict-Transport-Security": "max-age=31536000; includeSubDomains",
  "Content-Security-Policy": "default-src 'none'; frame-ancestors 'none'",
  "Referrer-Policy": "strict-origin-when-cross-origin",
};

// Production-specific CORS (more restrictive)
export const productionCorsHeaders = {
  ...corsHeaders,
  "Access-Control-Allow-Origin": "https://tuvi.app", // Only allow our domain
  "Access-Control-Allow-Credentials": "true",
};
```

### 4.2 Edge Function Security Patterns

```typescript
// supabase/functions/_shared/auth.ts

import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "./cors.ts";

export interface AuthenticatedRequest {
  userId: string;
  userEmail: string;
  userRole: string;
  supabaseClient: ReturnType<typeof createClient>;
}

/**
 * Verify JWT token from Authorization header
 */
export async function verifyAuth(
  req: Request,
): Promise<AuthenticatedRequest | Response> {
  const authHeader = req.headers.get("Authorization");

  if (!authHeader) {
    return new Response(
      JSON.stringify({ error: "Missing authorization header" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Extract token
  const token = authHeader.replace("Bearer ", "");

  if (!token) {
    return new Response(
      JSON.stringify({ error: "Invalid authorization format" }),
      {
        status: 401,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }

  // Create Supabase client with user's token
  const supabaseClient = createClient(
    Deno.env.get("SUPABASE_URL") ?? "",
    Deno.env.get("SUPABASE_ANON_KEY") ?? "",
    {
      global: {
        headers: { Authorization: `Bearer ${token}` },
      },
    },
  );

  // Verify the token
  const {
    data: { user },
    error,
  } = await supabaseClient.auth.getUser();

  if (error || !user) {
    return new Response(JSON.stringify({ error: "Invalid or expired token" }), {
      status: 401,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }

  return {
    userId: user.id,
    userEmail: user.email ?? "",
    userRole: user.user_metadata?.role ?? "user",
    supabaseClient,
  };
}

/**
 * Rate limiter for Edge Functions
 */
export class RateLimiter {
  private requests: Map<string, { count: number; resetAt: number }> = new Map();
  private readonly maxRequests: number;
  private readonly windowMs: number;

  constructor(maxRequests: number = 100, windowMs: number = 60000) {
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async check(
    identifier: string,
  ): Promise<{ allowed: boolean; remaining: number }> {
    const now = Date.now();
    const record = this.requests.get(identifier);

    if (!record || now > record.resetAt) {
      // New window
      this.requests.set(identifier, { count: 1, resetAt: now + this.windowMs });
      return { allowed: true, remaining: this.maxRequests - 1 };
    }

    if (record.count >= this.maxRequests) {
      return { allowed: false, remaining: 0 };
    }

    record.count++;
    return { allowed: true, remaining: this.maxRequests - record.count };
  }

  // Clean up old entries periodically
  cleanup(): void {
    const now = Date.now();
    for (const [key, value] of this.requests.entries()) {
      if (now > value.resetAt) {
        this.requests.delete(key);
      }
    }
  }
}

// Global rate limiter instance
export const rateLimiter = new RateLimiter(100, 60000); // 100 requests per minute
```

### 4.3 Input Validation

```typescript
// supabase/functions/_shared/validation.ts

export interface ValidationResult {
  valid: boolean;
  errors: string[];
}

/**
 * Validate birth date input
 */
export function validateBirthDate(data: {
  birth_date?: string;
  birth_time?: string;
}): ValidationResult {
  const errors: string[] = [];

  // Birth date validation
  if (!data.birth_date) {
    errors.push("Ngày sinh là bắt buộc");
  } else {
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(data.birth_date)) {
      errors.push("Định dạng ngày sinh không hợp lệ (YYYY-MM-DD)");
    } else {
      const [year, month, day] = data.birth_date.split("-").map(Number);

      // Check valid date
      const date = new Date(year, month - 1, day);
      if (
        date.getFullYear() !== year ||
        date.getMonth() !== month - 1 ||
        date.getDate() !== day
      ) {
        errors.push("Ngày sinh không hợp lệ");
      }

      // Check not in future
      if (date > new Date()) {
        errors.push("Ngày sinh không thể là ngày trong tương lai");
      }

      // Check reasonable age (0-150 years)
      const age = new Date().getFullYear() - year;
      if (age < 0 || age > 150) {
        errors.push("Tuổi không hợp lệ");
      }
    }
  }

  // Birth time validation
  if (!data.birth_time) {
    errors.push("Giờ sinh là bắt buộc");
  } else {
    const timeRegex = /^([01]\d|2[0-3]):([0-5]\d):([0-5]\d)$/;
    if (!timeRegex.test(data.birth_time)) {
      errors.push("Định dạng giờ sinh không hợp lệ (HH:MM:SS)");
    }
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Validate gender input
 */
export function validateGender(gender?: string): ValidationResult {
  const errors: string[] = [];
  const validGenders = ["male", "female"];

  if (!gender) {
    errors.push("Giới tính là bắt buộc");
  } else if (!validGenders.includes(gender)) {
    errors.push(`Giới tính phải là một trong: ${validGenders.join(", ")}`);
  }

  return { valid: errors.length === 0, errors };
}

/**
 * Sanitize string input
 */
export function sanitizeString(input: string): string {
  return input
    .trim()
    .replace(/[<>]/g, "") // Remove potential HTML tags
    .slice(0, 500); // Limit length
}

/**
 * Validate calculate request
 */
export function validateCalculateRequest(body: unknown): ValidationResult {
  const errors: string[] = [];

  if (!body || typeof body !== "object") {
    return { valid: false, errors: ["Request body is required"] };
  }

  const data = body as Record<string, unknown>;

  // Validate birth date
  const dateResult = validateBirthDate({
    birth_date: data.birth_date as string,
    birth_time: data.birth_time as string,
  });
  errors.push(...dateResult.errors);

  // Validate gender
  const genderResult = validateGender(data.gender as string);
  errors.push(...genderResult.errors);

  // Validate optional fields
  if (data.birth_province && typeof data.birth_province !== "string") {
    errors.push("Tỉnh/Thành phố phải là chuỗi");
  }

  if (data.timezone && typeof data.timezone !== "string") {
    errors.push("Timezone phải là chuỗi");
  }

  return { valid: errors.length === 0, errors };
}
```

### 4.4 Edge Function Template

```typescript
// supabase/functions/calculate/index.ts

import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from "../_shared/cors.ts";
import { verifyAuth, rateLimiter } from "../_shared/auth.ts";
import { validateCalculateRequest } from "../_shared/validation.ts";
import {
  tinhCanChiNam,
  tinhCanChiThang,
  tinhCanChiNgay,
  tinhCanChiGio,
} from "./can-chi.ts";
import { tinhMenh } from "./menh.ts";
import { tinhCucSo } from "./cuc.ts";
import { anDiaBan } from "./dia-ban.ts";
import { anSaoCoDinh } from "./sao.ts";
import { anTuHop } from "./tu-hop.ts";
import { anTamHop } from "./tam-hop.ts";
import { anHoaSao } from "./hoa.ts";

serve(async (req: Request) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  const startTime = Date.now();

  try {
    // 1. RATE LIMITING
    const clientIp = req.headers.get("x-forwarded-for") ?? "unknown";
    const rateCheck = await rateLimiter.check(clientIp);

    if (!rateCheck.allowed) {
      return new Response(
        JSON.stringify({
          error: "Quá nhiều yêu cầu. Vui lòng thử lại sau.",
          retryAfter: 60,
        }),
        {
          status: 429,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
            "Retry-After": "60",
            "X-RateLimit-Remaining": "0",
          },
        },
      );
    }

    // 2. AUTHENTICATION
    const authResult = await verifyAuth(req);

    if (authResult instanceof Response) {
      return authResult;
    }

    const { userId, userEmail, supabaseClient } = authResult;

    // 3. INPUT VALIDATION
    const body = await req.json().catch(() => null);

    if (!body) {
      return new Response(
        JSON.stringify({ error: "Request body is required" }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const validation = validateCalculateRequest(body);

    if (!validation.valid) {
      return new Response(
        JSON.stringify({
          error: "Dữ liệu không hợp lệ",
          details: validation.errors,
        }),
        {
          status: 400,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        },
      );
    }

    const {
      birth_date,
      birth_time,
      gender,
      birth_province,
      birth_country,
      timezone,
    } = body;

    // 4. LOG THE REQUEST (for audit)
    console.log(
      JSON.stringify({
        type: "calculate_request",
        userId,
        timestamp: new Date().toISOString(),
        birthDate: birth_date, // Don't log birth_time for privacy
      }),
    );

    // 5. CALCULATE HOROSCOPE
    const [year, month, day] = birth_date.split("-").map(Number);
    const [hour, minute] = birth_time.split(":").map(Number);

    // Lunar calendar conversion
    const lunarDate = solarToLunar(year, month, day, 7);

    // Calculate Can Chi
    const canChiNam = tinhCanChiNam(lunarDate.year);
    const canChiThang = tinhCanChiThang(canChiNam.can, lunarDate.month);
    const canChiNgay = tinhCanChiNgay(getJulianDayNumber(year, month, day));
    const canChiGio = tinhCanChiGio(hour, minute, canChiNgay.can);

    // Calculate Mệnh
    const menh = tinhMenh(canChiNam.can, canChiNam.chi, lunarDate.isLeap);

    // Calculate Cục
    const cuc = tinhCucSo(
      canChiNam.can,
      canChiNam.chi,
      lunarDate.month,
      menh.amDuong,
      gender,
    );

    // An Địa Bàn
    const diaBan = anDiaBan(menh.chi, gender, cuc.direction);

    // An Sao
    const saoList = anSaoCoDinh(
      diaBan,
      canChiNam.can,
      canChiNam.chi,
      canChiThang.can,
      lunarDate.isLeap,
      menh.chi,
      gender,
    );

    // An Tứ Hợp, Tam Hợp
    const tuHop = anTuHop(diaBan);
    const tamHop = anTamHop(diaBan);

    // An Hóa Sao
    const hoaSao = anHoaSao(canChiNam.can, canChiNam.chi, diaBan);

    // 6. SAVE TO DATABASE
    // Update user profile with calculated data
    const { error: userError } = await supabaseClient
      .from("users")
      .update({
        can_nam: canChiNam.can,
        chi_nam: canChiNam.chi,
        can_thang: canChiThang.can,
        chi_thang: canChiThang.chi,
        can_ngay: canChiNgay.can,
        chi_ngay: canChiNgay.chi,
        can_gio: canChiGio.can,
        chi_gio: canChiGio.chi,
        menh_can: menh.can,
        menh_chi: menh.chi,
        menh_text: menh.text,
        cuc_number: cuc.soCuc,
        cuc_text: cuc.text,
        am_duong: menh.amDuong,
        updated_at: new Date().toISOString(),
      })
      .eq("id", userId);

    if (userError) {
      console.error("User update error:", userError);
      // Continue anyway - horoscope calculation is more important
    }

    // Create or update horoscope
    const { data: horoscope, error: horoscopeError } = await supabaseClient
      .from("horoscopes")
      .upsert(
        {
          user_id: userId,
          name: `Lá số ${new Date().getFullYear()}`,
          dia_chi: diaBan,
          sao_list: saoList,
          tu_hop_1: tuHop.filter((t) => t.name === "Tý-Dần-Thìn"),
          tu_hop_2: tuHop.filter((t) => t.name === "Tỵ-Dậu-Sửu"),
          tu_hop_3: tuHop.filter((t) => t.name === "Ngọ-Tuất-Mùi"),
          tu_hop_4: tuHop.filter((t) => t.name === "Hợi-Mão-Mùi"),
          tam_hop_1: tamHop[0],
          tam_hop_2: tamHop[1],
          tam_hop_3: tamHop[2],
          tam_hop_4: tamHop[3],
          hoa_loc: hoaSao.find((h) => h.type === "loc"),
          hoa_quyen: hoaSao.find((h) => h.type === "quyen"),
          hoa_khoa: hoaSao.find((h) => h.type === "khoa"),
          hoa_kiep: hoaSao.find((h) => h.type === "kiep"),
          natal_chart: {
            birth_data: { birth_date, birth_time, gender, birth_province },
            can_chi: {
              nam: canChiNam,
              thang: canChiThang,
              ngay: canChiNgay,
              gio: canChiGio,
            },
            menh,
            cuc,
            calculated_at: new Date().toISOString(),
          },
          calculated_at: new Date().toISOString(),
          version: 1,
        },
        { onConflict: "user_id" },
      )
      .select()
      .single();

    if (horoscopeError) {
      console.error("Horoscope save error:", horoscopeError);
      throw new Error("Không thể lưu lá số");
    }

    // 7. RETURN RESPONSE
    const processingTime = Date.now() - startTime;

    return new Response(
      JSON.stringify({
        success: true,
        data: {
          user: {
            id: userId,
            email: userEmail,
            can_nam: canChiNam.can,
            chi_nam: canChiNam.chi,
            can_thang: canChiThang.can,
            chi_thang: canChiThang.chi,
            can_ngay: canChiNgay.can,
            chi_ngay: canChiNgay.chi,
            can_gio: canChiGio.can,
            chi_gio: canChiGio.chi,
            menh_can: menh.can,
            menh_chi: menh.chi,
            menh_text: menh.text,
            cuc_number: cuc.soCuc,
            cuc_text: cuc.text,
            am_duong: menh.amDuong,
          },
          horoscope: {
            id: horoscope.id,
            dia_chi: diaBan,
            sao_list: saoList,
            tu_hop: tuHop,
            tam_hop: tamHop,
            hoa_loc: hoaSao.find((h) => h.type === "loc"),
            hoa_quyen: hoaSao.find((h) => h.type === "quyen"),
            hoa_khoa: hoaSao.find((h) => h.type === "khoa"),
            hoa_kiep: hoaSao.find((h) => h.type === "kiep"),
            calculated_at: horoscope.calculated_at,
            version: horoscope.version,
          },
        },
        meta: {
          processingTime,
          rateLimitRemaining: rateCheck.remaining,
        },
      }),
      {
        status: 200,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
          "X-Processing-Time": String(processingTime),
          "X-RateLimit-Remaining": String(rateCheck.remaining),
        },
      },
    );
  } catch (error) {
    console.error("Calculate function error:", error);

    return new Response(
      JSON.stringify({
        error: "Đã xảy ra lỗi khi tính lá số",
        message: error instanceof Error ? error.message : "Unknown error",
        code: "CALCULATION_ERROR",
      }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      },
    );
  }
});
```
