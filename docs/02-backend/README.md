# 02 — Backend & API Layer

> Cross-reference: See [01-system-design](../01-system-design/README.md) for data flow diagrams, [00-project-init](../00-project-init/README.md) for environment setup.

---

## Overview

The backend layer consists of two parts:

1. **`server.ts`** — An Express.js server that exposes a single REST endpoint for chart calculation via Gemini AI. Used in development and can be deployed as a standalone service.
2. **`src/data/remote/gemini-api.ts`** — A client-side Gemini SDK wrapper used directly by the AI chat feature.

> **Important architectural note:** Chart calculation (`TuViCalculator.ts`) is done entirely in TypeScript on the client — it does NOT call any external API. The Gemini API is used only for (a) the AI chat feature and (b) the Express server endpoint which was the original calculation approach before the TypeScript calculator was built.

---

## Express Server (`server.ts`)

### Endpoint

```
POST /api/tuvi/calculate
Content-Type: application/json
```

### Request Body

```typescript
// server.ts — POST /api/tuvi/calculate
{
  ho_ten: string;        // Full name
  ngay_sinh: string;     // Birth date: "DD/MM/YYYY"
  loai_lich: string;     // Calendar type: "duong" | "am"
  gio_sinh: string;      // Birth time: "HH:MM"
  gioi_tinh: string;     // Gender: "Nam" | "Nữ"
  ngay_du_doan: string;  // Forecast date: "DD/MM/YYYY"
}
```

### Response Body

The server returns the raw JSON from Gemini, which should conform to the `TuViData` interface defined in `src/domain/model/types.ts`. The response is parsed with `JSON.parse(text)` and forwarded directly.

```typescript
// Expected shape (see src/domain/model/types.ts for full definition)
{
  thong_tin_co_ban: { ho_ten, gioi_tinh, duong_lich, am_lich, ... },
  cung_menh_than: { cung_menh, cung_than },
  "12_cung": { menh, phu_mau, phuc_duc, ... },
  van_han: { dai_han_hien_tai, dai_han_tiep_theo, tieu_han_hien_tai },
  du_doan_ngay_mai: { ngay, can_chi_ngay, ngu_hanh_ngay, ... }
}
```

### Error Responses

| Status | Condition | Body |
|---|---|---|
| 500 | `GEMINI_API_KEY` not set | `{ error: "GEMINI_API_KEY is not configured" }` |
| 500 | Gemini API error | `{ error: "Failed to calculate chart", details: "..." }` |
| 500 | JSON parse failure | `{ error: "Failed to calculate chart", details: "..." }` |

### CORS Configuration

The server allows all origins (`*`) in development:
```typescript
// server.ts
res.header('Access-Control-Allow-Origin', '*');
res.header('Access-Control-Allow-Headers', 'Content-Type');
res.header('Access-Control-Allow-Methods', 'POST, OPTIONS');
```

> 🚧 TODO: Restrict CORS to specific origins in production. Replace `*` with the actual `APP_URL`.

### Server Port

Default: `3001`. Configurable via `process.env.API_PORT`.

```bash
# Start the server
npm run dev:server
# → ✅ Tu Vi API server running at http://localhost:3001
```

---

## Client-Side Gemini Integration (`src/data/remote/gemini-api.ts`)

### Purpose
Used exclusively by `AiChatScreen` for the conversational AI feature. Sends user messages to Gemini with a Vietnamese astrology expert system prompt.

### Implementation

```typescript
// src/data/remote/gemini-api.ts
import { GoogleGenAI } from "@google/genai";

export const generateGeminiResponse = async (userMsg: string) => {
  const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
  const response = await ai.models.generateContent({
    model: "gemini-3-flash-preview",
    contents: userMsg,
    config: {
      systemInstruction: "Bạn là một chuyên gia Tử Vi Việt Nam cao cấp...",
    }
  });
  return response.text;
};
```

### Model Used
- **Chat:** `gemini-3-flash-preview` (fast, cost-effective for conversational use)
- **Calculation (server):** `gemini-2.0-flash` (more capable for structured JSON output)

### System Instruction (Chat)
```
Bạn là một chuyên gia Tử Vi Việt Nam cao cấp. Hãy trả lời người dùng một cách 
thông thái, sử dụng các thuật ngữ chuyên môn tử vi nhưng vẫn dễ hiểu. 
Luôn giữ thái độ tích cực và hỗ trợ.
```

### Error Handling in Chat
Errors are caught in `AiChatScreen.tsx`:
```typescript
// src/ui/screens/AiChatScreen.tsx
try {
  const text = await generateGeminiResponse(userMsg);
  setMessages(prev => [...prev, { role: 'model', text: text || t('ai_chat.error') }]);
} catch (error) {
  setMessages(prev => [...prev, { role: 'model', text: t('ai_chat.error') }]);
}
```

---

## Prompt Engineering (`src/data/constants/tuvi-prompts.ts`)

### Overview
`TUVI_SYSTEM_PROMPT` is a ~300-line structured prompt used by the Express server to instruct Gemini to perform Tử Vi chart calculation. It is the fallback/alternative to the TypeScript calculator.

### Prompt Structure

The prompt is divided into 8 numbered steps:

```
BƯỚC 1 — ĐỔI DƯƠNG LỊCH SANG ÂM LỊCH
  → Instructions for solar-to-lunar calendar conversion
  → 10 Heavenly Stems (Thiên Can) table
  → 12 Earthly Branches (Địa Chi) table
  → 12 hour periods (giờ) mapping

BƯỚC 2 — XÁC ĐỊNH MỆNH CỤC
  → Nạp Âm Ngũ Hành table (30 Can-Chi pairs → element)
  → Số cục mapping (element → starting number)

BƯỚC 3 — AN CUNG MỆNH VÀ CUNG THÂN
  → Rules for placing Life Palace (Cung Mệnh)
  → Rules for placing Body Palace (Cung Thân)

BƯỚC 4 — AN 12 CUNG CHỨC NĂNG
  → 12 palace names in order from Mệnh

BƯỚC 5 — AN 14 CHÍNH TINH
  → Tử Vi star placement algorithm
  → Thiên Phủ group placement rules
  → All 14 main stars relative positions

BƯỚC 6 — AN PHỤ TINH
  → Kình Dương & Đà La (by year Heavenly Stem)
  → Lộc Tồn (by year Heavenly Stem)
  → Tứ Hóa (4 transformations by year Heavenly Stem)
  → Văn Xương & Văn Khúc (by year Heavenly Stem)
  → Tả Phụ & Hữu Bật (by birth month)
  → Thiên Khôi & Thiên Việt (by year Heavenly Stem)
  → Hỏa Tinh & Linh Tinh (by year Earthly Branch)
  → Thiên Không & Địa Kiếp (by birth hour)

BƯỚC 7 — AN ĐẠI HẠN
  → Direction rules (thuận/nghịch based on gender + yin/yang)
  → Period length = số cục

BƯỚC 8 — AN TIỂU HẠN
  → Male: starts at Dần, counts forward
  → Female: starts at Thân, counts backward

OUTPUT — JSON THUẦN TÚY
  → Instructs Gemini to return only raw JSON, no markdown
```

### Prompt Variables
The user prompt sent alongside the system prompt:
```typescript
// server.ts
const userPrompt = `INPUT
Họ tên: ${ho_ten}
Ngày sinh: ${ngay_sinh} (${loai_lich})
Giờ sinh: ${gio_sinh}
Giới tính: ${gioi_tinh}
Ngày cần dự đoán: ${ngay_du_doan}`;
```

### Response Format Enforcement
The server uses `responseMimeType: 'application/json'` to force Gemini to return valid JSON:
```typescript
config: {
  systemInstruction: TUVI_SYSTEM_PROMPT,
  responseMimeType: 'application/json',
}
```

---

## Rate Limiting and Quota Management

> 🚧 TODO: No rate limiting is currently implemented. The following strategy is recommended:

### Recommended Strategy
1. **Client-side debounce:** The AI chat input already requires user action (button click or Enter). No additional debounce needed.
2. **Server-side rate limiting:** Add `express-rate-limit` to `server.ts`:
   ```typescript
   import rateLimit from 'express-rate-limit';
   const limiter = rateLimit({ windowMs: 60_000, max: 10 });
   app.use('/api/', limiter);
   ```
3. **Gemini quota:** Free tier allows 15 RPM (requests per minute) and 1M TPD (tokens per day) for Gemini Flash. Monitor usage in Google AI Studio.
4. **Cache-first strategy:** `CacheService` prevents redundant chart recalculations — the chart is only recalculated when the user explicitly submits the birth form.

---

## CacheService — Full Reference

**File:** `src/domain/services/CacheService.ts`

### Storage Keys

```typescript
const KEYS = {
  LASO:         "tuvi_laso_data",    // Full chart JSON
  DU_DOAN:      "tuvi_du_doan",      // Today's forecast
  PREDICT_DATE: "tuvi_predict_date", // Date string for TTL
  BIRTH_INFO:   "tuvi_birth_info",   // Birth input for refresh
};
```

### Methods

| Method | Description | TTL |
|---|---|---|
| `saveLaSo(data)` | Saves full chart to localStorage | Permanent |
| `loadLaSo()` | Loads chart, returns `null` on parse error | — |
| `saveBirthInfo(info)` | Saves birth input for daily refresh | Permanent |
| `loadBirthInfo()` | Loads birth input | — |
| `saveDuDoan(data)` | Saves forecast + today's date string | Until midnight |
| `loadDuDoan()` | Returns forecast if date matches today, else `null` | Daily |
| `clearAll()` | Removes all 4 keys | — |
| `clearDuDoan()` | Removes forecast + date keys only | — |
| `hasLaSo()` | Returns `true` if chart exists | — |

### TTL Implementation
```typescript
// src/domain/services/CacheService.ts
loadDuDoan(): any | null {
  const savedDate = localStorage.getItem(KEYS.PREDICT_DATE);
  const today = new Date().toLocaleDateString("vi-VN");
  if (savedDate !== today) return null; // Different date → stale
  const raw = localStorage.getItem(KEYS.DU_DOAN);
  return raw ? JSON.parse(raw) : null;
}
```

---

## TuViService — Full Reference

**File:** `src/domain/services/TuViService.ts`

### Method Signatures

```typescript
// src/domain/services/TuViService.ts

interface TuViInput {
  ho_ten: string;
  ngay_sinh: string;    // "DD/MM/YYYY"
  loai_lich: string;    // "duong" | "am"
  gio_sinh: string;     // "HH:MM"
  gioi_tinh: string;    // "Nam" | "Nữ"
  ngay_du_doan: string; // "DD/MM/YYYY"
}

TuViService.calculateAndSave(
  input: Omit<TuViInput, 'ngay_du_doan'>
): Promise<TuViData>

TuViService.loadOrRefresh(): Promise<TuViData | null>

// Legacy export
calculateTuViChart(input: TuViInput): Promise<TuViData>
```

### `calculateAndSave` Flow
1. Generates tomorrow's date string
2. Calls `calculateTuVi({ ...input, ngay_du_doan })`
3. Saves full result to `CacheService.saveLaSo()`
4. Saves birth info to `CacheService.saveBirthInfo()`
5. Saves forecast to `CacheService.saveDuDoan()`
6. Returns the full `TuViData`

### `loadOrRefresh` Flow
1. Loads chart from `CacheService.loadLaSo()` — returns `null` if none
2. Checks `CacheService.loadDuDoan()` — if fresh, returns merged data
3. If stale: loads birth info, recalculates, saves new forecast, returns updated data
4. If recalculation fails: logs error, returns old chart without updated forecast

---

## Error Handling Patterns

### Calculator Errors
`TuViCalculator.ts` throws descriptive errors:
```typescript
throw new Error(`Ngày sinh không hợp lệ: ${e.message}`);
throw new Error(`Ngày ${d}/${m}/${y} (${loai_lich}) không hợp lệ: ${error.message}`);
```

These bubble up through `TuViService` → `useTuVi` hook → `LaSoScreen`:
```typescript
// src/ui/screens/LaSoScreen.tsx
} catch (err: any) {
  alert(`Có lỗi: ${err?.message || "Vui lòng thử lại."}`);
}
```

> 🚧 TODO: Replace `alert()` with a proper toast/notification component.

### Gemini API Errors
- Chat errors are caught in `AiChatScreen` and display a localized error message via `t('ai_chat.error')`
- Server errors return HTTP 500 with a JSON error body

### Cache Errors
All `CacheService` methods wrap `JSON.parse` in try/catch and return `null` on failure — silent degradation.

---

## Environment Variables — Full Reference

| Variable | Required | Description | Example |
|---|---|---|---|
| `GEMINI_API_KEY` | Yes | Google Gemini API key | `AIzaSy...` |
| `APP_URL` | No | Hosted app URL | `https://tuviviet.app` |
| `API_PORT` | No | Express server port (default: 3001) | `3001` |

### Getting a Gemini API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey)
2. Click "Create API Key"
3. Copy the key to your `.env` file

### Vite Environment Variable Access
Vite exposes `process.env` variables that are prefixed with `VITE_` to the client bundle. However, `GEMINI_API_KEY` does not use the `VITE_` prefix — it is accessed via `process.env.GEMINI_API_KEY` which Vite replaces at build time using its `define` config.

> 🚧 TODO: Verify that `GEMINI_API_KEY` is properly configured in `vite.config.ts` `define` block, or move client-side Gemini calls to the Express server to avoid exposing the key in the bundle.

---

## How to Add a New API Integration

Follow these steps to add a new external API (e.g., a weather API for auspicious day calculation):

### Step 1 — Create the client file
```typescript
// src/data/remote/weather-api.ts
export const getWeatherForecast = async (date: string): Promise<WeatherData> => {
  const response = await fetch(`https://api.weather.com/forecast?date=${date}&key=${process.env.WEATHER_API_KEY}`);
  if (!response.ok) throw new Error(`Weather API error: ${response.status}`);
  return response.json();
};
```

### Step 2 — Add environment variable
```dotenv
# .env.example
WEATHER_API_KEY="your_weather_api_key"
```

### Step 3 — Add types to `src/domain/model/types.ts`
```typescript
export interface WeatherData {
  date: string;
  condition: string;
  temperature: number;
}
```

### Step 4 — Create a hook if needed
```typescript
// src/ui/hooks/useWeather.ts
import { useQuery } from "@tanstack/react-query";
import { getWeatherForecast } from "../../data/remote/weather-api";

export const useWeather = (date: string) =>
  useQuery({
    queryKey: ["weather", date],
    queryFn: () => getWeatherForecast(date),
    staleTime: 1000 * 60 * 60, // 1 hour
  });
```

### Step 5 — Document in this file
Add the new integration to the "External API Integrations" section above.
