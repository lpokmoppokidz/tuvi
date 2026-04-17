# TỬ VI ĐẨU SỐ — MODULE MỞ RỘNG

## Đặc Tả Kỹ Thuật & Thuật Toán Chi Tiết

---

## MỤC LỤC

1. [Kiến trúc Scoring Engine](#phần-i---kiến-trúc-scoring-engine-trung-tâm)
2. [Module 1 — Kiểm tra Giờ sinh Đặc biệt (Tiểu Nhi Lý Đoán)](#module-1--kiểm-tra-giờ-sinh-đặc-biệt-tiểu-nhi-lý-đoán)
3. [Module 2 — Phân tích Chuyên sâu về Nghề nghiệp (Career Mapping)](#module-2--phân-tích-nghề-nghiệp-career-mapping)
4. [Module 3 — Hệ thống Cảnh báo Sức khỏe (Medical Astrology)](#module-3--hệ-thống-cảnh-báo-sức-khỏe-medical-astrology)
5. [Module 4 — So khớp và Tương quan (Compatibility)](#module-4--so-khớp-và-tương-quan-compatibility)
6. [Module 5 — Dự báo Thời điểm Đại lợi (Auspicious Timing)](#module-5--dự-báo-thời-điểm-đại-lợi-auspicious-timing)
7. [Module 6 — Dự báo Biến cố và Giải hạn (Crisis Alert)](#module-6--dự-báo-biến-cố-và-giải-hạn-crisis-alert)
8. [Đầu vào / Đầu ra API tổng hợp](#đầu-vào--đầu-ra-api-tổng-hợp)
9. [Priority Implementation & Dependencies](#priority-implementation--dependencies)

---

## PHẦN I — KIẾN TRÚC SCORING ENGINE TRUNG TÂM

### 1.1. Nguyên lý hoạt động

Tất cả 6 module đều dựa trên một **Scoring Engine** thống nhất. Mỗi cung chức trong lá số được chấm điểm theo nguyên tắc:

```
Điểm cung = Σ(điểm sao hiện có) + Σ(điểm bộ sao) + Σ(điểm tam hóa) + Σ(điểm ngũ hành tương sinh/tương khắc) + Σ(điểm vị trí)
```

**Phạm vi điểm:**

- **Quý cách (≥ 80):** Hội tụ Tứ Linh, gặp nhiều cát tinh → Đánh dấu `badge: "quy_cach"`
- **Bình cách (40–79):** Cân bằng, không xấu không tốt → `badge: "binh_cach"`
- **Lục bại (10–39):** Gặp nhiều sát tinh, bại tinh → `badge: "luc_bai"` kèm `warnings[]`
- **Hung cách (< 10):** Toàn sát tinh, đại hung → `badge: "hung_cach"` kèm `critical_alerts[]`

### 1.2. Bảng điểm sao cơ bản

| Nhóm sao      | Danh sách                                                 | Điểm        | Ghi chú                            |
| ------------- | --------------------------------------------------------- | ----------- | ---------------------------------- |
| **Tứ Linh**   | Long, Phượng, Hổ, Quy                                     | +25 mỗi sao | Bộ "Tứ Linh" hội tụ → điểm × 1.5   |
| **Tứ Văn**    | Văn Xương, Văn Khúc, Tả Hữu, Thiên Vănơng                 | +20 mỗi sao | Chủ văn trí, học vấn               |
| **Lục Tài**   | Lộc Tồn, Lộc Đỉnh, Lộc Khố, Thai, Đào, Hồng               | +15 mỗi sao | Tài lộc, sinh sản                  |
| **Tứ Sát**    | Sát Phá Tham, Liêm Trinh, Tham Vũ, Vũ Phá                 | −15 mỗi sao | Bộ "Trúc La" khi hội tụ → −40      |
| **Lục Bại**   | Bại Vong, Đại Hao, Tiểu Hao, Phong Ba, Ly Hỏa, Trùng Tang | −20 mỗi sao | Gặp 3/6 → kích hoạt alert          |
| **Cát Tinh**  | Cơ, Nguyệt, Đức, Phúc, Thọ, Thiên, Lộc (nhũ), Tướng       | +20 mỗi sao |                                    |
| **Hung Tinh** | Hỏa Linh, Linh Hỏa, Đầu Sĩ, Đao, Kiếp, Sát                | −10 mỗi sao | Gặp Hình, Tướng → cảnh báo tai nạn |

### 1.3. Bộ sao hệ số nhân (Combo Multipliers)

```typescript
interface ComboRule {
  comboId: string;
  requiredStars: string[]; // danh sách sao cần có đủ
  multiplier: number; // nhân bao nhiêu lần
  condition?: (ctx: ChartContext) => boolean;
  label: string; // VD: "Tứ Linh vầng quang"
}

// Ví dụ bảng combo
const COMBO_RULES: ComboRule[] = [
  {
    comboId: "tu_linh_convergence",
    requiredStars: ["Long", "Phượng", "Hổ", "Quy"],
    multiplier: 1.5,
    label: "Tứ Linh hội tụ — Quý cách vượng phát",
  },
  {
    comboId: "truc_la_assembly",
    requiredStars: ["Sát", "Phá", "Tham"],
    multiplier: 0.3,
    label: "Trúc La tụ hội — Lục bại nghiêm trọng",
  },
  {
    comboId: "xương_khuc_triumph",
    requiredStars: ["Xương", "Khúc"],
    multiplier: 1.3,
    condition: (ctx) => ctx.palace === "Mệnh",
    label: "Xương Khúc tại Mệnh — Văn chứng cách",
  },
];
```

### 1.4. Cấu trúc dữ liệu lá số mở rộng

```typescript
interface ExtendedNatalChart {
  // Dữ liệu cơ bản đã có
  basic: {
    name: string;
    birthDate: string; // ISO 8601
    birthHour: number; // 1–12 (theo can chi)
    gender: "male" | "female";
    lunarBirth: boolean;
  };

  // 12 cung chính mở rộng
  palaces: Record<PalaceName, PalaceData>;

  // Cung chiếu (Tứ Trụ bổ sung)
  watchPalaces: {
    tamHợpPalaces: PalaceName[];
    hộiChiếuPalaces: PalaceName[];
  };

  // Kết quả scoring
  scores: {
    byPalace: Record<PalaceName, number>;
    overall: number;
    badge: "quy_cach" | "binh_cach" | "luc_bai" | "hung_cach";
    activeCombos: string[]; // comboId đang trigger
  };

  // Kết quả 6 module mở rộng
  modules: {
    birthHourAnalysis: BirthHourResult;
    careerMapping: CareerResult;
    medicalAstrology: MedicalResult;
    compatibility: CompatibilityResult;
    auspiciousTiming: AuspiciousTimingResult;
    crisisAlert: CrisisAlertResult;
  };
}

type PalaceName =
  | "Mệnh"
  | "Phụ Mẫu"
  | "Phúc Đức"
  | "Điền Trạch"
  | "Quan Lộc"
  | "Nạp Bạch"
  | "Thiên Di"
  | "Tật Ách"
  | "Tài Bạch"
  | "Phu Thê"
  | "Tử Tức"
  | "Phú Đạo";
```

---

## PHẦN II — CÁC MODULE CHI TIẾT

---

### MODULE 1 — KIỂM TRA GIỜ SINH ĐẶC BIỆT (Tiểu Nhi Lý Đoán)

#### 1.1. Mục đích

Phân tích giờ sinh để phát hiện các "Giờ Hung Hiểm" ảnh hưởng đến trẻ dưới 12 tuổi. Đây là module bắt buộc khi lá số có chủ nhân **dưới 12 tuổi tính từ năm hiện tại**, hoặc khi giờ sinh rơi vào các khung giờ đặc biệt.

#### 1.2. Phân loại giờ sinh đặc biệt

```typescript
enum SpecialBirthHourType {
  // ═══════════════════════════════════════════
  // NHÓM 1: GIỜ NGUY HIỂM NHẤT — CẢNH BÁO ĐỎ
  // ═══════════════════════════════════════════
  KIM_XA_THIET_TOA = "KIM_XA_THIET_TOA", // [1]
  // Giờ: Tý (23:00–01:00) + Dần (03:00–05:00)
  // Đặc điểm: Trẻ khó nuôi, bệnh nan y, gặp tai nạn
  // Cần cung Phúc đủ sáng mới cứu vãn trước 12 tuổi
  // Thuật toán: birthHour ∈ [1, 4] && (tháng sinh mod 2 === 0)

  QUAN_SAT = "QUAN_SAT", // [2]
  // Giờ: Mão (05:00–07:00)
  // Đặc điểm: Trẻ hay ốm đau, cần thuốc thầy, suy nhược
  // Thuật toán: birthHour === 4 && tổng thiên không × địa không === 0

  // ═══════════════════════════════════════════
  // NHÓM 2: GIỜ BẤT THƯỜNG — CẢNH BÁO VÀNG
  // ═══════════════════════════════════════════
  TUONG_QUAN = "TUONG_QUAN", // [3]
  // Giờ: Thìn (07:00–09:00)
  // Đặc điểm: Trẻ hay giật mình, khó ngủ, quấy khóc đêm
  // Liên quan đến thần khí bất ổn theo mùa sinh

  DIEM_VUONG = "DIEM_VUONG", // [4]
  // Giờ: Tỵ (09:00–11:00)
  // Đặc điểm: Tính khí nóng nảy, dễ bị bỏng, té nước

  DA_DE = "DA_DE", // [5]
  // Giờ: Ngọ (11:00–13:00)
  // Đặc điểm: Trẻ khóc đêm, gặp ác梦, cần an thần
  // Thuật toán: birthHour === 6 && (mùa === "hạ")

  // ═══════════════════════════════════════════
  // NHÓM 3: GIỜ CẢNH BÁO NHẸ
  // ═══════════════════════════════════════════
  HOA_LINH_NIGHT = "HOA_LINH_NIGHT", // [6]
  // Giờ sinh trùng Hỏa Linh → trẻ hay sốt, co giật
  // Thuật toán: birthHour === Hỏa Linh.location.hour

  BAC_KY = "BAC_KY", // [7]
  // Giờ: Dậu (17:00–19:00)
  // Trẻ dễ bị cảm lạnh, hen suyễn, hô hấp yếu
}
```

#### 1.3. Thuật toán chi tiết — Module 1

```typescript
/**
 * ALGORITHM: analyzeSpecialBirthHour
 *
 * INPUT:
 *   birthHour: number (1–12 theo Địa Chi giờ)
 *   birthMonth: number (1–12)
 *   birthSeason: "xuân" | "hạ" | "thu" | "đông"
 *   chart: NatalChart (lá số đầy đủ)
 *
 * OUTPUT:
 *   BirthHourResult {
 *     category: "NGUY_HIEM" | "BAT_THUONG" | "CANH_BAO_NHE" | "BINH_THUONG"
 *     hourType: SpecialBirthHourType | null
 *     riskScore: number (0–100)
 *     rescueFactors: string[]           // Các yếu tố cứu vãn
 *     warnings: WarningItem[]
 *     recommendations: string[]         // Lời khuyên cụ thể
 *     survivalYearThreshold: number     // Năm tuổi mấy thì an toàn hơn
 *   }
 *
 * PSEUDOCODE:
 */

function analyzeSpecialBirthHour(
  birthHour: number,
  birthMonth: number,
  birthSeason: Season,
  chart: NatalChart,
): BirthHourResult {
  const warnings: WarningItem[] = [];
  const rescueFactors: string[] = [];
  const recommendations: string[] = [];
  let riskScore = 0;
  let hourType: SpecialBirthHourType | null = null;

  // ── Bước 1: Xác định giờ sinh đặc biệt ──────────────────────
  if (birthHour === 1 || birthHour === 2 || birthHour === 3) {
    // Kim Xà Thiết Tỏa: Tý (1), Sửu (2), Dần (3)
    hourType = SpecialBirthHourType.KIM_XA_THIET_TOA;
    riskScore = 90;
    recommendations.push("Cần tích đức, làm việc thiện từ nhỏ");
    recommendations.push("Tránh xa nước, lửa, cao độ trước 12 tuổi");
    recommendations.push("Nên đặt tên theo ngũ hành bù trừ Kim");
  } else if (birthHour === 4) {
    hourType = SpecialBirthHourType.QUAN_SAT;
    riskScore = 75;
    recommendations.push("Chú ý sức khỏe, khám định kỳ");
    recommendations.push("Cần thuốc thầy hỗ trợ khi bệnh");
  } else if (birthHour === 5) {
    hourType = SpecialBirthHourType.TUONG_QUAN;
    riskScore = 50;
    // Giật mình, khó ngủ → liên quan Mệnh cung + Thiên Di
  } else if (birthHour === 6) {
    hourType = SpecialBirthHourType.DIEM_VUONG;
    riskScore = 40;
    recommendations.push("Tránh bỏng nước sôi, lửa");
  } else if (birthHour === 7) {
    hourType =
      birthSeason === "hạ"
        ? SpecialBirthHourType.DA_DE
        : SpecialBirthHourType.BAC_KY;
    riskScore = birthSeason === "hạ" ? 65 : 30;
  } else {
    hourType = null;
    riskScore = 10;
  }

  // ── Bước 2: Kiểm tra yếu tố cứu vãn ────────────────────────
  // Cung Phúc (Phúc Đức) là cung cứu vãn chính cho trẻ em
  const fucPalace = chart.palaces["Phúc Đức"];
  const phucStars = fucPalace.stars as string[];

  // Yếu tố cứu vãn mạnh
  if (phucStars.includes("Cơ") || phucStars.includes("Nguyệt")) {
    rescueFactors.push("Phúc Đức có Cơ/Nguyệt — cứu vãn tốt");
    riskScore = Math.max(0, riskScore - 30);
  }
  if (phucStars.includes("Lộc")) {
    rescueFactors.push("Phúc Đức có Lộc Tồn — vượng phúc");
    riskScore = Math.max(0, riskScore - 15);
  }
  if (phucStars.includes("Tướng") || phucStars.includes("Phượng")) {
    rescueFactors.push("Phúc Đức có Tướng/Phượng — quý nhân phù trợ");
    riskScore = Math.max(0, riskScore - 20);
  }

  // Yếu tố cứu vãn yếu / không có → nguy hiểm
  const hasTrulyRescue = phucStars.some((s) =>
    ["Cơ", "Nguyệt", "Lộc", "Tướng", "Phượng", "Long"].includes(s),
  );
  if (!hasTrucRescue) {
    warnings.push({
      level: "HIGH",
      code: "PHUC_KHONG_CUU",
      message: "Cung Phúc Đức không có cát tinh cứu vãn — nguy cơ cao",
      detail: "Cần tu tạo phúc đức, làm việc thiện để tích lũy",
    });
  }

  // ── Bước 3: Kiểm tra Lục Hành tương sinh ─────────────────────
  // Nếu giờ sinh thuộc hành Dương Mộc → cần Kim来相剋
  const hourElement = mapHourToElement(birthHour);
  const menhElement = chart.element; // ngũ hành mệnh

  if (isRestraining(hourElement, menhElement)) {
    warnings.push({
      level: "MEDIUM",
      code: "SINH_KHAC_MENH",
      message: `Giờ ${birthHour} thuộc ${hourElement}, sinh khắc mệnh ${menhElement}`,
      detail: "Cần chú ý cân bằng ngũ hành trong sinh hoạt",
    });
  }

  // ── Bước 4: Xác định ngưỡng an toàn ──────────────────────────
  let survivalYearThreshold = 12;
  if (hourType === SpecialBirthHourType.KIM_XA_THIET_TOA) {
    survivalYearThreshold = 12;
    if (hasTruongRescue) survivalYearThreshold = 10;
    if (phucStars.includes("Thiên")) survivalYearThreshold = 8;
  }

  // ── Bước 5: Phân loại kết quả ─────────────────────────────────
  let category: Category;
  if (riskScore >= 70) category = "NGUY_HIEM";
  else if (riskScore >= 40) category = "BAT_THUONG";
  else if (riskScore >= 20) category = "CANH_BAO_NHE";
  else category = "BINH_THUONG";

  return {
    category,
    hourType,
    riskScore: Math.min(100, riskScore),
    rescueFactors,
    warnings,
    recommendations,
    survivalYearThreshold,
    interpretation: generateInterpretation(hourType, category),
  };
}
```

#### 1.4. Bảng tra cứu Giờ sinh — Element Map

```
Giờ (theo Địa Chi) → Ngũ Hành:
  Tý (1)  → Thủy (Dương Thủy)
  Sửu (2) → Thổ (Dương Thổ)
  Dần (3) → Mộc (Dương Mộc)
  Mão (4) → Mộc (Âm Mộc)
  Thìn (5) → Thổ (Âm Thổ)
  Tỵ  (6) → Hỏa (Âm Hỏa)
  Ngọ (7) → Hỏa (Dương Hỏa)
  Mùi (8) → Thổ (Âm Thổ)
  Thân (9) → Kim (Dương Kim)
  Dậu (10) → Kim (Âm Kim)
  Tuất (11) → Thổ (Dương Thổ)
  Hợi (12) → Thủy (Âm Thủy)
```

#### 1.5. Ví dụ đầu ra JSON

```json
{
  "birthHourAnalysis": {
    "category": "NGUY_HIEM",
    "hourType": "KIM_XA_THIET_TOA",
    "riskScore": 65,
    "hourName": "Giờ Tý",
    "element": "Thủy (Dương Thủy)",
    "rescueFactors": [
      "Phúc Đức có Nguyệt — cứu vãn tốt",
      "Phúc Đức có Long — quý nhân phù trợ"
    ],
    "warnings": [],
    "recommendations": [
      "Cần tích đức, làm việc thiện từ nhỏ",
      "Tránh xa nước, lửa, cao độ trước 12 tuổi",
      "Nên đặt tên theo ngũ hành bù trừ Kim"
    ],
    "survivalYearThreshold": 10,
    "interpretation": "Giờ Tý sinh vào lúc 23:00–01:00 thuộc hành Thủy Dương, thuộc nhóm Kim Xà Thiết Tỏa — giờ nguy hiểm bậc nhất. Trẻ sinh giờ này khó nuôi, hay bệnh, cần cung Phúc đủ sáng mới cứu vãn. May mắn Phúc Đức có Nguyệt và Long, nên ngưỡng an toàn rút xuống còn 10 tuổi. Cần tu tạo phúc đức, tránh xa các yếu tố nguy hiểm trước 10 tuổi."
  }
}
```

---

### MODULE 2 — PHÂN TÍCH NGHỀ NGHIỆP (Career Mapping)

#### 2.1. Mục đích

Phân tích lá số để xác định "Cách" (Career Pattern) phù hợp với chủ nhân. Thay vì chỉ liệt kê sao, module này quét tổ hợp sao theo pattern recognition để đưa ra gợi ý nghề nghiệp cụ thể, kèm điểm số phù hợp.

#### 2.2. Phân loại Cách (Career Patterns)

```typescript
enum CareerPattern {
  VAN_CHUNG_CACH = "VAN_CHUNG_CACH", // [5]
  // Đặc điểm: Văn trí, học vấn, quan lâm, giáo dục
  // Bộ sao: Xương Khúc + Khôi Việt + Tả Hữu + Tam Hóa
  // Điểm threshold: Xương Khúc tại Mệnh/Quan Lộc = +30

  VO_CHUNG_CACH = "VO_CHUNG_CACH", // [5]
  // Đặc điểm: Quân sự, công an, kỹ thuật quân sự, thể thao
  // Bộ sao: Vũ, Tướng, Sát, Phá, Liêm, Tham đắc địa
  //         + Binh, Hình, Tướng, Ấn
  // Điểm threshold: Vũ Tướng hội Quan Lộc = +35

  KINH_THUONG_CACH = "KINH_THUONG_CACH", // [5, 6]
  // Đặc điểm: Kinh doanh, thương mại, đầu tư
  // Pattern đặc biệt: "Lộc Mã giao trì" = Lộc + Mã cùng cung Tứ Mộ
  //                    Vũ Khúc hội Lộc tại cung Tứ Mộ
  // Điểm threshold: Lộc Mã giao trì = +40

  KY_NGH_CHUNG_CACH = "KY_NGH_CHUNG_CACH", // [6, 7]
  // Đặc điểm: Kỹ thuật, thủ công, nghệ thuật
  // Bộ sao: Tham Vũ, Vũ Phá, hoặc Hồng, Đào, Tấu (nghề thêu thùa)
  //         Họa Sĩ cho hội họa

  NOI_TRO_CACH = "NOI_TRO_CACH",
  // Đặc điểm: Làm việc trong nhà, ổn định, ít xuất quân
  // Cung Quan Lộc tại Tý/Ngọ/Mão/Dậu (bốn cung tĩnh)

  XUAT_QUAN_CACH = "XUAT_QUAN_CACH",
  // Đặc điểm: Xuất ngoại, du lịch, ngoại giao, xuất khẩu
  // Thiên Di có Mã, Tang Mông, Xui, Xương

  THUAT_GIẢ_CACH = "THUAT_GIA_CACH",
  // Đặc điểm: Ca sĩ, diễn viên, người mẫu, truyền thông
  // Văn Xương + Nhật + Quang + Hồng Đào tại Quan/Thiên Di
}
```

#### 2.3. Thuật toán chi tiết — Module 2

```typescript
/**
 * ALGORITHM: analyzeCareerMapping
 *
 * INPUT:
 *   chart: NatalChart
 *   currentAge: number
 *
 * OUTPUT:
 *   CareerResult {
 *     primaryPattern: CareerPattern
 *     secondaryPattern: CareerPattern | null
 *     confidenceScore: number (0–100)
 *     recommendations: CareerRecommendation[]
 *     strengths: string[]
 *     weaknesses: string[]
 *     suitableIndustries: string[]
 *     educationPath: string[]           // Gợi ý con đường học vấn
 *     timeline: CareerTimelineItem[]     // Dự báo thời điểm chuyển nghề
 *     forbiddenIndustries: string[]      // Nghề nên tránh
 *   }
 *
 * PSEUDOCODE:
 */

function analyzeCareerMapping(chart: NatalChart): CareerResult {
  const scores: Record<CareerPattern, number> = {
    [CareerPattern.VAN_CHUNG_CACH]: 0,
    [CareerPattern.VO_CHUNG_CACH]: 0,
    [CareerPattern.KINH_THUONG_CACH]: 0,
    [CareerPattern.KY_NGH_CHUNG_CACH]: 0,
    [CareerPattern.NOI_TRO_CACH]: 0,
    [CareerPattern.XUAT_QUAN_CACH]: 0,
    [CareerPattern.THUAT_GIA_CACH]: 0,
  };

  const strengths: string[] = [];
  const weaknesses: string[] = [];
  const suitableIndustries: string[] = [];
  const forbiddenIndustries: string[] = [];

  // ── Bước 1: Quét Văn chứng cách ──────────────────────────────
  // Pattern: Xương Khúc + Khôi Việt + Tả Hữu + Tam Hóa
  const menhPalace = chart.palaces["Mệnh"];
  const quanPalace = chart.palaces["Quan Lộc"];
  const thienDiPalace = chart.palaces["Thiên Di"];

  const hasXuongKhuc = (palace: PalaceData) =>
    palace.stars.some((s) => ["Xương", "Khúc"].includes(s));
  const hasKhoiViet = (palace: PalaceData) =>
    palace.stars.some((s) => ["Khôi", "Việt", "Bá", "Hiên"].includes(s));
  const hasTaHuu = (palace: PalaceData) =>
    palace.stars.some((s) => ["Tả Hữu", "Văn Xương", "Văn Khúc"].includes(s));
  const hasTamHoa = (palace: PalaceData) =>
    palace.stars.some((s) => ["Tướng", "Lộc", "Khoa"].includes(s)); // Tam Hóa

  // Van Chung: Xương Khúc tại Mệnh + Khôi Việt
  if (hasXuongKhuc(menhPalace)) {
    scores[CarrerPattern.VAN_CHUNG_CACH] += 30;
    strengths.push("Mệnh cung có Xương Khúc — văn trí xuất chúng");
  }
  if (hasKhoiViet(menhPalace) || hasKhoiViet(quanPalace)) {
    scores[CarrerPattern.VAN_CHUNG_CACH] += 20;
    strengths.push("Có Khôi Việt — thiên tư học hỏi nhanh nhạy");
  }
  if (hasTaHuu(quanPalace)) {
    scores[CarrerPattern.VAN_CHUNG_CACH] += 15;
    strengths.push("Quan Lộc có Tả Hữu — thích hợp quan chức");
  }
  if (hasTamHoa(menhPalace) || hasTamHoa(quanPalace)) {
    scores[CarrerPattern.VAN_CHUNG_CACH] += 25;
    strengths.push("Có Tam Hóa tại Mệnh/Quan — đường quan lộc rộng mở");
  }

  // Van Chung: Kiểm tra Lục Đức (Lộc, Phúc, Thọ, Đức, Phú, Trí)
  const hasLucDuc = (palace: PalaceData) =>
    ["Lộc", "Phúc", "Thọ", "Đức", "Phú", "Trí"].some((s) =>
      palace.stars.includes(s),
    );
  if (hasLucDuc(quanPalace) && scores[CarrerPattern.VAN_CHUNG_CACH] >= 50) {
    scores[CarrerPattern.VAN_CHUNG_CACH] += 20;
    suitableIndustries.push(
      "Hành chính nhà nước",
      "Giáo dục",
      "Tư pháp",
      "Ngoại giao",
    );
  }

  // ── Bước 2: Quét Võ chứng cách ──────────────────────────────
  // Pattern: Vũ, Tướng, Sát, Phá, Liêm, Tham đắc địa + Binh, Hình, Tướng, Ấn
  const hasVuTuong = (palace: PalaceData) =>
    palace.stars.some((s) => ["Vũ", "Tướng"].includes(s));
  const hasSatPhuTham = (palace: PalaceData) =>
    palace.stars.some((s) => ["Sát", "Phá", "Tham", "Liêm"].includes(s));
  const hasBinhHinhTuong = (palace: PalaceData) =>
    palace.stars.some((s) => ["Binh", "Hình", "Ấn"].includes(s));

  if (hasVuTuong(quanPalace) || hasVuTuong(menhPalace)) {
    scores[CarrerPattern.VO_CHUNG_CACH] += 25;
    strengths.push("Có Vũ/Tướng tại Mệnh hoặc Quan — tiềm năng võ tướng");
  }
  if (hasSatPhuTham(quanPalace) && hasBinhHinhTuong(quanPalace)) {
    scores[CarrerPattern.VO_CHUNG_CACH] += 30;
    strengths.push("Quan Lộc hội Sát Phá Tham + Binh Hình — võ sĩ/quân nhân");
    suitableIndustries.push(
      "Quân đội",
      "Công an",
      "Thể thao chuyên nghiệp",
      "An ninh",
    );
  }

  // Võ cách đắc địa: Tướng tại Dần, Mão, Tuất, Hợi
  const tuongLocation = findStarLocation(chart, "Tướng");
  if (tuongLocation && isFavorableMilitaryPosition(tuongLocation)) {
    scores[CarrerPattern.VO_CHUNG_CACH] += 15;
    strengths.push("Tướng đắc địa tại cung thuận — võ cách vượng");
  }

  // ── Bước 3: Quét Kinh thương cách ────────────────────────────
  // Pattern: Lộc Mã giao trì = Lộc + Mã cùng cung Tứ Mộ
  //         Vũ Khúc hội Lộc tại cung Tứ Mộ
  const tuMoLocation = chart.palaces["Tài Bạch"]; // Tứ Mộ = Tài Bạch
  const thiênDi = chart.palaces["Thiên Di"];

  const hasLocMaGiaoTri = (palace: PalaceData) =>
    palace.stars.includes("Lộc") && palace.stars.includes("Mã");

  const hasVuKhucHoiLoc = (palace: PalaceData) =>
    palace.stars.some((s) => ["Vũ", "Khúc"].includes(s)) &&
    palace.stars.includes("Lộc");

  if (hasLocMaGiaoTri(tuMoLocation)) {
    scores[CarrerPattern.KINH_THUONG_CACH] += 40;
    strengths.push("Lộc Mã giao trì tại Tài Bạch — kinh doanh phát đạt");
    suitableIndustries.push(
      "Kinh doanh tự do",
      "Đầu tư",
      "Bất động sản",
      "Xuất nhập khẩu",
    );
  }

  if (hasVuKhucHoiLoc(tuMoLocation)) {
    scores[CarrerPattern.KINH_THUONG_CACH] += 35;
    strengths.push("Vũ Khúc hội Lộc tại Tứ Mộ — thương mại tài chính");
  }

  // Kiểm tra Thất Sát tại Tài Bạch (dấu hiệu kinh doanh mạo hiểm)
  const hasThatSat = tuMoLocation.stars.includes("Thất Sát");
  if (hasThatSat) {
    scores[CarrerPattern.KINH_THUONG_CACH] += 10;
    strengths.push("Thất Sát tại Tài Bạch — kinh doanh dám nghĩ dám làm");
    warnings.push(
      "Thương trường có rủi ro, cần cân nhắc kỹ trước khi đầu tư lớn",
    );
  }

  // ── Bước 4: Quét Kỹ nghệ cách ───────────────────────────────
  // Pattern: Tham Vũ, Vũ Phá, Hồng, Đào, Tấu
  const hasThamVu = (palace: PalaceData) =>
    palace.stars.some((s) => ["Tham", "Vũ"].includes(s));
  const hasKyNangNghe = (palace: PalaceData) =>
    palace.stars.some((s) => ["Hồng", "Đào", "Tấu", "Lưu Hãn"].includes(s));

  if (hasThamVu(menhPalace) || hasThamVu(quanPalace)) {
    scores[CarrerPattern.KY_NGH_CHUNG_CACH] += 20;
    strengths.push("Có Tham Vũ — thích hợp kỹ thuật, cơ khí");
    suitableIndustries.push("Kỹ thuật", "Cơ khí", "CNTT", "Điện tử");
  }

  if (hasKyNangNghe(menhPalace)) {
    scores[CarrerPattern.KY_NGH_CHUNG_CACH] += 25;
    strengths.push("Mệnh cung có Hồng/Đào/Tấu — khéo tay, nghệ thuật");
    suitableIndustries.push("Thiết kế", "Hội họa", "Thêu thùa", "Nghệ thuật");
  }

  // Họa Sĩ: Nhật + Quang + Hồng tại Quan/Thiên Di
  const hasNgheSi =
    hasKyNangNghe(quanPalace) &&
    quanPalace.stars.some((s) => ["Quang", "Hồng", "Nhật"].includes(s));
  if (hasNgheSi) {
    scores[CarrerPattern.THUAT_GIA_CACH] += 30;
    suitableIndustries.push(
      "Ca sĩ",
      "Diễn viên",
      "Người mẫu",
      "MC",
      "Truyền thông",
    );
    strengths.push("Có thiên phú nghệ thuật — phù hợp truyền thông, giải trí");
  }

  // ── Bước 5: Xác định nghề cấm ────────────────────────────────
  // Nếu có nhiều sát tinh tại Quan Lộc → tránh nghề áp lực cao
  if (scores[CarrerPattern.VO_CHUNG_CACH] < 20) {
    forbiddenIndustries.push("Quân đội chiến đấu", "Công an hình sự");
  }
  if (scores[CarrerPattern.VAN_CHUNG_CACH] < 20) {
    forbiddenIndustries.push("Hành chính nhà nước", "Tư pháp");
  }

  // Trúc La tại Quan → không nên kinh doanh lớn
  const trucLaAtQuan = hasSatPhuTham(quanPalace);
  if (trucLaAtQuan) {
    forbiddenIndustries.push("Kinh doanh rủi ro cao", "Đầu tư mạo hiểm");
    weaknesses.push("Quan Lộc gặp Trúc La — đường công danh trắc trở");
  }

  // ── Bước 6: Xác định kết quả chính ──────────────────────────
  const sortedPatterns = Object.entries(scores).sort(
    ([, a], [, b]) => b - a,
  ) as [CareerPattern, number][];

  const [primary, secondary] = sortedPatterns;
  const primaryPattern = primary[0];
  const primaryScore = primary[1];
  const secondaryPattern =
    primaryScore - secondary[1] > 20 ? null : secondary[0];

  const confidenceScore = Math.min(100, Math.round(primaryScore / 1.5));

  // Tạo timeline dự báo (tham khảo vận hạn 10 năm)
  const timeline = generateCareerTimeline(chart, primaryPattern, primaryScore);

  return {
    primaryPattern,
    secondaryPattern,
    confidenceScore,
    recommendations: buildCareerRecommendations(
      primaryPattern,
      primaryScore,
      chart,
    ),
    strengths,
    weaknesses,
    suitableIndustries: [...new Set(suitableIndustries)],
    educationPath: buildEducationPath(primaryPattern),
    timeline,
    forbiddenIndustries: [...new Set(forbiddenIndustries)],
    patternDetail: getPatternDetail(primaryPattern, chart),
  };
}
```

#### 2.4. Bảng điểm ngưỡng Career Pattern

| Pattern          | Điểm ≥ 60                     | Điểm 40–59                       | Điểm < 40          |
| ---------------- | ----------------------------- | -------------------------------- | ------------------ |
| Văn chứng cách   | Quan lớn, giáo sư, ngoại giao | Văn thư, giáo viên, luật sư      | Văn phòng, nhân sự |
| Võ chứng cách    | Tướng lĩnh, công an cấp cao   | Trung sĩ, thể thao chuyên nghiệp | Kỹ thuật, bảo vệ   |
| Kinh thương cách | Chủ doanh nghiệp lớn, đầu tư  | Kinh doanh nhỏ, môi giới         | Nhân viên bán hàng |
| Kỹ nghệ cách     | Kỹ sư cấp cao, chuyên gia     | Kỹ thuật viên, thợ lành nghề     | Lao động phổ thông |
| Thất giả cách    | Ngôi sao giải trí hạng A      | Ca sĩ, diễn viên nhỏ             | MC, PR             |
| Xuất quan cách   | Đại sứ, ngoại giao viên       | Du lịch, xuất khẩu lao động      | Hướng dẫn viên     |

---

### MODULE 3 — HỆ THỐNG CẢNH BÁO SỨC KHỎE (Medical Astrology)

#### 3.1. Mục đích

Quét bệnh lý tiềm ẩn và cảnh báo tai nạn dựa trên cung **Giải Ách** (`Tật Ách`), ngũ hành tương sinh/tương khắc của các sao, và sự tương tác giữa các bộ sao nguy hiểm.

#### 3.2. Bảng ánh xạ Sao → Cơ quan / Bệnh lý

```typescript
interface DiseaseMapping {
  star: string;
  element: Element;
  organSystems: string[]; // Hệ cơ quan liên quan
  diseases: string[]; // Bệnh lý tiềm ẩn
  severity: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  triggerCondition?: (chart: NatalChart) => boolean;
}

// ── Bảng ánh xạ sao → bệnh ──────────────────────────────────
const DISEASE_MAP: DiseaseMapping[] = [
  // [8, 9]
  {
    star: "Thiên Cơ",
    element: "Mộc",
    organSystems: ["Phổi", "Hô hấp", "Gan", "Gân"],
    diseases: ["Hen suyễn", "Viêm phổi", "Gan nhiễm mỡ", "Đau nhức gân"],
    severity: "MEDIUM",
  },
  {
    star: "Khốc Hư",
    element: "Thổ",
    organSystems: ["Phổi", "Da", "Tiêu hóa"],
    diseases: ["Ho khan mãn tính", "Eczema", "Viêm đại tràng"],
    severity: "HIGH",
    triggerCondition: (c) => c.palaces["Tật Ách"].stars.includes("Thiên Cơ"),
    // Khi Thiên Cơ + Khốc Hư → BỆNH PHỔI NẶNG
  },

  // [8, 9]
  {
    star: "Nhật",
    element: "Hỏa",
    organSystems: ["Mắt", "Tim", "Máu", "Tuần hoàn"],
    diseases: [
      "Đau mắt đỏ",
      "Viêm kết giác mạc",
      "Tim đập nhanh",
      "Cao huyết áp",
    ],
    severity: "MEDIUM",
  },
  {
    star: "Nguyệt",
    element: "Thủy",
    organSystems: ["Mắt", "Thận", "Bàng quang", "Tiết niệu"],
    diseases: ["Mờ mắt", "Viêm thận", "Sỏi thận", "Loạn tuần hoàn"],
    severity: "MEDIUM",
  },

  // [10, 11] — Bộ cảnh báo tai nạn
  {
    star: "Hỏa Linh",
    element: "Hỏa",
    organSystems: ["Da", "Mắt", "Thần kinh"],
    diseases: ["Bỏng", "Cháy", "Viêm da", "Sốt cao co giật"],
    severity: "HIGH",
    triggerCondition: (c) => c.palaces["Tật Ách"].stars.includes("Hình Việt"),
    // Hỏa Linh + Hình Việt → TAI NẠN BỎNG NƯỚC SÔI, SÉT ĐÁNH
  },
  {
    star: "Mộc Dục",
    element: "Mộc",
    organSystems: ["Gan", "Gân", "Cơ", "Da"],
    diseases: ["Viêm gan", "Co rút gân", "Dị ứng da"],
    severity: "MEDIUM",
    triggerCondition: (c) => c.palaces["Tật Ách"].stars.includes("Hỏa Linh"),
    // Mộc Dục + Hỏa Linh → NGẤT XỈU, BỎNG NƯỚC
  },
  {
    star: "Hình Việt",
    element: "Kim",
    organSystems: ["Xương", "Phổi", "Da"],
    diseases: ["Gãy xương", "Tai nạn giao thông", "Vết thương hở"],
    severity: "HIGH",
    triggerCondition: (c) =>
      c.palaces["Tật Ách"].stars.some((s) =>
        ["Binh", "Tướng", "Sát"].includes(s),
      ),
    // Hình Việt + Binh/Tướng/Sát → TAI NẠN NGHIÊM TRỌNG
  },
  {
    star: "Lâm Tướng",
    element: "Mộc",
    organSystems: ["Gan", "Mắt", "Thần kinh"],
    diseases: ["Đau gan", "Loạn thị", "Động kinh"],
    severity: "HIGH",
  },
  {
    star: "Đầu Sĩ",
    element: "Hỏa",
    organSystems: ["Đầu", "Não", "Tim"],
    diseases: ["Chấn thương sọ não", "Đau nửa đầu", "Nhồi máu cơ tim"],
    severity: "CRITICAL",
  },
  {
    star: "Đao",
    element: "Kim",
    organSystems: ["Cổ", "Họng", "Phổi"],
    diseases: ["Viêm họng", "Nhiễm trùng đường hô hấp", "Chấn thương cổ"],
    severity: "MEDIUM",
  },
  {
    star: "Kiếp Sát",
    element: "Thủy",
    organSystems: ["Thận", "Tiết niệu", "Sinh sản"],
    diseases: ["Sỏi thận", "Viêm bàng quang", "Vô sinh"],
    severity: "HIGH",
  },

  // Bệnh lý theo cung
  {
    star: "Thất Sát",
    element: "Hỏa",
    organSystems: ["Tim", "Mạch máu", "Gan"],
    diseases: ["Nhồi máu cơ tim", "Xuất huyết nội tạng", "Viêm gan nặng"],
    severity: "CRITICAL",
  },
  {
    star: "Phá Toàn",
    element: "Hỏa",
    organSystems: ["Đại tràng", "Phổi", "Da"],
    diseases: ["Polyp đại tràng", "Ung thư phổi giai đoạn muộn"],
    severity: "CRITICAL",
  },

  // Ngũ hành → cơ quan yếu
  {
    star: "THUỘC KIM",
    element: "Kim",
    organSystems: ["Phổi", "Da", "Đại tràng"],
    diseases: ["Hen", "Viêm phổi", "Eczema", "Viêm đại tràng"],
    severity: "LOW",
    triggerCondition: (c) => c.element === "Kim",
  },
  {
    star: "THUỘC THỦY",
    element: "Thủy",
    organSystems: ["Thận", "Bàng quang", "Tiết niệu", "Sinh sản"],
    diseases: ["Viêm thận", "Sỏi thận", "Viêm bàng quang"],
    severity: "LOW",
    triggerCondition: (c) => c.element === "Thủy",
  },
  {
    star: "THUỘC HỎA",
    element: "Hỏa",
    organSystems: ["Tim", "Mạch máu", "Mắt", "Tiểu não"],
    diseases: ["Tim đập nhanh", "Cao huyết áp", "Mờ mắt", "Đau nửa đầu"],
    severity: "LOW",
    triggerCondition: (c) => c.element === "Hỏa",
  },
  {
    star: "THUỘC MỘC",
    element: "Mộc",
    organSystems: ["Gan", "Gân", "Cơ", "Thần kinh"],
    diseases: ["Viêm gan", "Co rút gân", "Mất ngủ", "Lo âu"],
    severity: "LOW",
    triggerCondition: (c) => c.element === "Mộc",
  },
  {
    star: "THUỘC THỔ",
    element: "Thổ",
    organSystems: ["Lách", "Dạ dày", "Tuổi hoa", "Da"],
    diseases: ["Viêm селезенка", "Đau dạ dày", "Mụn nhọt", "Dị ứng"],
    severity: "LOW",
    triggerCondition: (c) => c.element === "Thổ",
  },
];
```

#### 3.3. Thuật toán chi tiết — Module 3

```typescript
/**
 * ALGORITHM: analyzeMedicalAstrology
 *
 * INPUT:
 *   chart: NatalChart
 *
 * OUTPUT:
 *   MedicalResult {
 *     healthScore: number (0–100)     // 0 = rất yếu, 100 = rất khỏe
 *     riskLevel: "RAT_KHOE" | "KHOE" | "BINH_THUONG" | "YEU" | "RAT_YEU"
 *     organRisk: OrganRiskItem[]     // Rủi ro theo cơ quan
 *     diseaseAlerts: DiseaseAlert[] // Cảnh báo bệnh lý
 *     accidentAlerts: AccidentAlert[] // Cảnh báo tai nạn
 *     lifeThreateningPeriods: YearAlert[] // Giai đoạn nguy hiểm tính mạng
 *     preventionTips: string[]       // Lời khuyên phòng bệnh
 *     elementWeakness: Element[]     // Hành yếu cần bồi bổ
 *     luckyElement: Element          // Hành hỗ trợ sức khỏe
 *   }
 *
 * PSEUDOCODE:
 */

function analyzeMedicalAstrology(chart: NatalChart): MedicalResult {
  const diseaseAlerts: DiseaseAlert[] = [];
  const accidentAlerts: AccidentAlert[] = [];
  const organRisk: OrganRiskItem[] = [];
  const preventionTips: string[] = [];
  const lifeThreateningPeriods: YearAlert[] = [];
  const elementWeakness: Element[] = [];

  // ── Bước 1: Đánh giá tổng thể sức khỏe ──────────────────────
  const tuAchPalace = chart.palaces["Tật Ách"];
  const menhPalace = chart.palaces["Mệnh"];

  let healthScore = 70; // baseline

  // Yếu tố giảm điểm sức khỏe
  const badStars = [
    "Thất Sát",
    "Phá Toàn",
    "Hỏa Linh",
    "Lâm Tướng",
    "Đầu Sĩ",
    "Đao",
    "Kiếp Sát",
  ];
  const tuAchBadCount = tuAchPalace.stars.filter((s) =>
    badStars.includes(s),
  ).length;
  healthScore -= tuAchBadCount * 10;

  // Yếu tố tăng điểm sức khỏe
  const goodStars = [
    "Thiên",
    "Lộc",
    "Tướng",
    "Phúc",
    "Thọ",
    "Phú",
    "Đức",
    "Trí",
  ];
  const tuAchGoodCount = tuAchPalace.stars.filter((s) =>
    goodStars.includes(s),
  ).length;
  healthScore += tuAchGoodCount * 8;

  // Kiểm tra cung Mệnh yếu → giảm healthScore
  if (menhPalace.stars.includes("Hãm")) {
    healthScore -= 15;
    elementWeakness.push(chart.element);
    preventionTips.push("Mệnh cung hãm — cần chú ý bồi bổ ngũ hành");
  }

  // ── Bước 2: Quét bệnh lý theo cung Tật Ách ───────────────────
  for (const diseaseMap of DISEASE_MAP) {
    const { star, organSystems, diseases, severity, triggerCondition } =
      diseaseMap;

    if (!tuAchPalace.stars.includes(star)) continue;

    // Kiểm tra điều kiện trigger
    if (triggerCondition && !triggerCondition(chart)) continue;

    // Phát hiện bệnh lý
    diseaseAlerts.push({
      cause: star,
      diseases,
      organSystems,
      severity,
      description: generateDiseaseDescription(star, diseases),
      severityScore: getSeverityScore(severity),
    });

    // Cập nhật organ risk
    for (const organ of organSystems) {
      const existing = organRisk.find((r) => r.organ === organ);
      if (existing) {
        existing.riskLevel += getSeverityScore(severity);
        existing.relatedStars.push(star);
      } else {
        organRisk.push({
          organ,
          riskLevel: getSeverityScore(severity),
          relatedStars: [star],
        });
      }
    }

    // Cảnh báo nghiêm trọng
    if (severity === "CRITICAL") {
      preventionTips.push(
        `CẢNH BÁO: ${star} tại Tật Ách — ${diseases.join(", ")}`,
      );
      preventionTips.push(
        `Cần khám chuyên khoa ${organSystems.join(", ")} định kỳ`,
      );
    }
  }

  // ── Bước 3: Quét cặp sao nguy hiểm đặc biệt ─────────────────
  const tuAchStars = tuAchPalace.stars as string[];

  // Thiên Cơ + Khốc Hư → Bệnh phổi nặng [8, 9]
  if (tuAchStars.includes("Thiên Cơ") && tuAchStars.includes("Khốc Hư")) {
    diseaseAlerts.push({
      cause: "Thiên Cơ + Khốc Hư",
      diseases: ["Viêm phổi mãn tính", "Hen phế quản", "Lao phổi"],
      organSystems: ["Phổi", "Hô hấp"],
      severity: "CRITICAL",
      description:
        "Cặp sao Thiên Cơ Khốc Hư tại Tật Ách — bệnh phổi nghiêm trọng, cần chữa trị kịp thời",
      severityScore: 95,
    });
    preventionTips.push("Hen, viêm phổi: Hạn chế môi trường ô nhiễm, khói bụi");
  }

  // Nhật/Nguyệt hãm + Đà Kỵ → Mắt nặng, tuần hoàn [8, 9]
  const coNhatHayNguyet =
    tuAchStars.includes("Nhật") || tuAchStars.includes("Nguyệt");
  const coDaKy = tuAchStars.includes("Đà Kỵ");
  if (coNhatHayNguyet && coDaKy) {
    diseaseAlerts.push({
      cause: "Nhật/Nguyệt + Đà Kỵ",
      diseases: ["Viêm kết giác mạc nặng", "Glaucoma", "Loạn tuần hoàn máu"],
      organSystems: ["Mắt", "Tuần hoàn"],
      severity: "HIGH",
      description:
        "Nhật hoặc Nguyệt hãm gặp Đà Kỵ tại Tật Ách — đau mắt nặng, rối loạn tuần hoàn",
      severityScore: 80,
    });
    preventionTips.push(
      "Mắt: Khám nhãn khoa 6 tháng/lần. Tuần hoàn: Tập thể dục đều đặn",
    );
  }

  // ── Bước 4: Quét cảnh báo tai nạn ────────────────────────────
  // Hỏa Linh + Hình Việt → Bỏng nước sôi, điện giật [10, 11]
  if (tuAchStars.includes("Hỏa Linh") && tuAchStars.includes("Hình Việt")) {
    accidentAlerts.push({
      type: "BỎNG",
      causeStars: ["Hỏa Linh", "Hình Việt"],
      accidents: ["Bỏng nước sôi", "Bỏng lửa", "Điện giật"],
      severity: "HIGH",
      description:
        "Hỏa Linh hội Hình Việt tại Tật Ách — cảnh báo tai nạn bỏng, điện. Tránh nấu nướng, tiếp xúc điện.",
      highRiskAgeRanges: [
        {
          start: 1,
          end: 12,
          note: "Trẻ em: cần giám sát kỹ gần bếp, nước sôi",
        },
        {
          start: 20,
          end: 35,
          note: "Thanh niên: cẩn thận khi làm việc với điện",
        },
      ],
      preventionTips: [
        "Tránh nấu nướng khi trẻ nhỏ ở gần",
        "Kiểm tra hệ thống điện trong nhà định kỳ",
        "Học cách sơ cứu bỏng cơ bản",
      ],
    });
  }

  // Mộc Dục + Hỏa Linh → Ngất xỉu, bỏng nước [10, 11]
  if (tuAchStars.includes("Mộc Dục") && tuAchStars.includes("Hỏa Linh")) {
    accidentAlerts.push({
      type: "NGAT_XIU_BONG",
      causeStars: ["Mộc Dục", "Hỏa Linh"],
      accidents: ["Ngất xỉu", "Bỏng nước sôi", "Sốc nhiệt"],
      severity: "HIGH",
      description:
        "Mộc Dục gặp Hỏa Linh tại Tật Ách — nguy cơ ngất xỉu đột ngột, bỏng nước.",
      highRiskAgeRanges: [
        {
          start: 5,
          end: 18,
          note: "Trẻ vị thành niên: hay té ngã bất thình lình",
        },
      ],
      preventionTips: [
        "Tránh thay đổi nhiệt độ đột ngột",
        "Uống đủ nước, tránh nắng gắt",
        "Có người đi cùng khi tắm rửa",
      ],
    });
  }

  // Hình Việt + Binh/Tướng/Sát → Tai nạn giao thông [10, 11]
  const hasHinhViet = tuAchStars.includes("Hình Việt");
  const hasChienBinh = tuAchStars.some((s) =>
    ["Binh", "Tướng", "Sát Phá Tham"].includes(s),
  );
  if (hasHinhViet && hasChienBinh) {
    accidentAlerts.push({
      type: "TAI_NAN_GIAO_THONG",
      causeStars: ["Hình Việt", "Binh", "Tướng", "Sát"],
      accidents: ["Tai nạn xe cộ", "Chấn thương cột sống", "Gãy xương"],
      severity: "CRITICAL",
      description:
        "Hình Việt hội Binh/Tướng/Sát tại Tật Ách — nguy cơ tai nạn giao thông rất cao. Cần hạn chế lái xe đêm, đường đèo.",
      highRiskAgeRanges: [
        { start: 16, end: 35, note: "Thanh niên: cao điểm tai nạn giao thông" },
        {
          start: 55,
          end: 65,
          note: "Trung niên: phản xạ giảm, cẩn thận đường xa",
        },
      ],
      preventionTips: [
        "Không lái xe khi mệt mỏi, uống rượu",
        "Hạn chế đi đường đêm một mình",
        "Tránh đường đèo, núi khi trời mưa",
        "Bảo hiểm tai nạn là cần thiết",
      ],
    });
  }

  // ── Bước 5: Xác định giai đoạn nguy hiểm tính mạng ───────────
  // Dựa trên vận hạn: khi Tiểu hạn trùng Tật Ách + sát tinh
  const dangerYears = analyzeLifeThreateningYears(chart);
  lifeThreateningPeriods.push(...dangerYears);

  // ── Bước 6: Xác định hành bù trừ ─────────────────────────────
  const menhElement = chart.element;
  const luckyElement = getComplementElement(menhElement); // Ngũ hành tương sinh
  elementWeakness.push(menhElement);

  preventionTips.push(
    `Ngũ hành bù trừ: Tăng cường ${luckyElement} để cân bằng ${menhElement}`,
  );

  // ── Bước 7: Phân loại kết quả ─────────────────────────────────
  let riskLevel: RiskLevel;
  if (healthScore >= 80) riskLevel = "RAT_KHOE";
  else if (healthScore >= 60) riskLevel = "KHOE";
  else if (healthScore >= 40) riskLevel = "BINH_THUONG";
  else if (healthScore >= 20) riskLevel = "YEU";
  else riskLevel = "RAT_YEU";

  return {
    healthScore: Math.max(0, Math.min(100, healthScore)),
    riskLevel,
    organRisk: organRisk.sort((a, b) => b.riskLevel - a.riskLevel),
    diseaseAlerts: diseaseAlerts.sort(
      (a, b) => b.severityScore - a.severityScore,
    ),
    accidentAlerts,
    lifeThreateningPeriods,
    preventionTips: [...new Set(preventionTips)],
    elementWeakness: [...new Set(elementWeakness)],
    luckyElement,
  };
}
```

---

### MODULE 4 — SO KHỚP VÀ TƯƠNG QUAN (Compatibility)

#### 4.1. Mục đích

Phân tích tương tác giữa hai lá số để đưa ra:

- **Hợp tác làm ăn:** Tìm tuổi hợp tác kinh doanh, đối tác chiến lược
- **Hôn nhân bền vững:** Phân tích hòa hợp qua cung Phu Thê và Phúc Đức
- **Tử Tức (Con cái):** Dự đoán số lượng, giới tính, khả năng nuôi nấng con cái

#### 4.2. Các loại so khớp

```typescript
enum CompatibilityType {
  KINH_DOANH = "KINH_DOANH", // Hợp tác làm ăn [12]
  HON_NHAN = "HON_NHAN", // Hôn nhân [13, 14]
  TU_TUC = "TU_TUC", // Con cái [15, 16]
}
```

##### 4.2.1. So khớp Hợp tác Kinh doanh [12]

```typescript
// Bảng tuổi hợp tác kinh doanh theo bản mệnh
const BUSINESS_COMPATIBILITY: BusinessPair[] = [
  // Mậu Dần hợp với: Nhâm Thìn, Ất Mùi, Canh Ngọ, Tân Dậu, Quý Hợi [12]
  {
    mainElement: "Mậu Dần",
    compatibleElements: [
      "Nhâm Thìn",
      "Ất Mùi",
      "Canh Ngọ",
      "Tân Dậu",
      "Quý Hợi",
    ],
    incompatibleElements: ["Bính Tý", "Giáp Thìn", "Đinh Mùi"],
    bestPartnership: [
      {
        element: "Nhâm Thìn",
        reason: "Hợp Tài Lộc — hợp tác phát tài",
        scoreBonus: 30,
      },
      {
        element: "Ất Mùi",
        reason: "Hợp Công Danh — đối tác chiến lược",
        scoreBonus: 25,
      },
      {
        element: "Canh Ngọ",
        reason: "Hợp Quan Lộc — mở rộng quy mô",
        scoreBonus: 20,
      },
    ],
  },
  // ... thêm các cặp tuổi khác theo bảng kinh doanh
];

// Bảng tuổi theo Can Chi
const ALL_CAN_CHI = [
  "Giáp Tý",
  "Ất Sửu",
  "Bính Dần",
  "Đinh Mão",
  "Mậu Thìn",
  "Kỷ Tỵ",
  "Canh Ngọ",
  "Tân Mùi",
  "Nhâm Thân",
  "Quý Dậu",
  "Giáp Tuất",
  "Ất Hợi",
  "Bính Tý",
  "Đinh Sửu",
  "Mậu Dần",
  "Kỷ Mão",
  "Canh Thìn",
  "Tân Tỵ",
  "Nhâm Ngọ",
  "Quý Mùi",
  "Giáp Thân",
  "Ất Dậu",
  "Bính Tuất",
  "Đinh Hợi",
  "Mậu Tý",
  "Kỷ Sửu",
  "Canh Dần",
  "Tân Mão",
  "Nhâm Thìn",
  "Quý Tỵ",
  "Giáp Ngọ",
  "Ất Mùi",
  "Bính Thân",
  "Đinh Dậu",
  "Mậu Tuất",
  "Kỷ Hợi",
];
```

##### 4.2.2. So khớp Hôn nhân [13, 14]

```typescript
// Cung Phu Thê phân tích
interface SpousePalace {
  palace: PalaceData;
  genderOfSpouse: "male" | "female";
  spouseAgeRange: string;
  spouseElement: Element;
  relationshipStrength: number; // 0–100
  conflictFactors: string[]; // Yếu tố xung khắc
  harmonyFactors: string[]; // Yếu tố hòa hợp
  warningCodes: string[]; // Mã cảnh báo
}

// Bảng xung khắc cung Phu Thê
const PALACE_CONFLICT_RULES = [
  {
    condition: "Tứ Hành Xung",
    palaces: ["Phu Thê", "Tài Bạch"],
    incompatible: true,
    description: "Phu Thê xung Tài Bạch — tiền bạc gây mâu thuẫn hôn nhân",
  },
  {
    condition: "Lục Hợp xung Phu Thê",
    palaces: ["Phu Thê", "Phúc Đức"],
    incompatible: false,
    description: "Phu Thê hợp Phúc Đức — hôn nhân có phúc đức gia đình",
  },
  {
    condition: "Tương Khắc Ngũ Hành",
    palaces: ["Phu Thê", "Mệnh"],
    incompatible: true,
    description: "Vợ/chồng thuộc ngũ hành khắc chồng/vợ — cần hòa giải",
  },
];
```

##### 4.2.3. So khớp Tử Tức (Con cái) [15, 16]

```typescript
// Phân tích cung Tử Tức
interface ChildPalaceAnalysis {
  // Số lượng con dự đoán
  predictedChildren: {
    min: number;
    max: number;
    gender: "more_boys" | "more_girls" | "balanced" | "uncertain";
    confidence: number; // 0–100
  };

  // Yếu tố thuận lợi
  favorableIndicators: {
    stars: string[];
    description: string;
    impact: "positive" | "very_positive";
  }[];

  // Cảnh báo hiếm muộn
  infertilityWarnings: {
    causeStars: string[];
    causeDescription: string;
    severity: "MEDIUM" | "HIGH" | "CRITICAL";
    solutionTips: string[];
  }[];

  // Thời điểm sinh con thuận lợi
  favorableBirthPeriods: {
    yearRange: string;
    reason: string;
    bestMonths: string[];
  }[];

  // Nuôi dạy con
  parentingAdvice: {
    challenges: string[];
    strengths: string[];
    tips: string[];
  };
}

// Bảng sao liên quan đến con cái [15, 16]
const CHILD_STARS = {
  favorable: ["Thai", "Đào", "Hồng", "Lộc", "Phúc", "Thọ", "Tướng", "Phượng"],
  warning: ["Đẩu Quân", "Linh Hỏa", "Đầu Sĩ", "Bại Vong"],
  neutral: ["Thiên", "Quang", "Hậu", "Cơ", "Nguyệt"],
};

// Thai Tinh: sao chủ sinh con
// Đế Vượng: sao chủ nuôi dưỡng con
// Đẩu Quân: sao chủ hiếm muộn, khó nuôi con
// Linh Hỏa: sao chủ bệnh tật cho con, khó nuôi
```

#### 4.3. Thuật toán chi tiết — Module 4

```typescript
/**
 * ALGORITHM: analyzeCompatibility
 *
 * INPUT:
 *   chart1: NatalChart (bản thân)
 *   chart2: NatalChart | null (đối phương, null = tra cứu đơn)
 *   compatibilityType: CompatibilityType
 *
 * OUTPUT:
 *   CompatibilityResult {
 *     type: CompatibilityType;
 *     overallScore: number (0–100)
 *     level: "RAT_HOP" | "HOP" | "BINH_THUONG" | "KHONG_HOP" | "BAT_HOP";
 *     details: {...}          // Chi tiết theo từng loại
 *     recommendations: string[];
 *     warnings: WarningItem[];
 *   }
 */

function analyzeCompatibility(
  chart1: NatalChart,
  chart2: NatalChart | null,
  compatibilityType: CompatibilityType
): CompatibilityResult {

  if (compatibilityType === CompatibilityType.KINH_DOANH) {
    return analyzeBusinessCompatibility(chart1, chart2);
  }
  if (compatibilityType === CompatibilityType.HON_NHAN) {
    return analyzeMarriageCompatibility(chart1, chart2);
  }
  if (compatibilityType === CompatibilityType.TU_TUC) {
    return analyzeChildCompatibility(chart1);
  }
}

// ── 4.3.1: So khớp Kinh doanh ─────────────────────────────────

function analyzeBusinessCompatibility(
  chart1: NatalChart,
  chart2: NatalChart | null
): CompatibilityResult {
  const recommendations: string[] = [];
  const warnings: WarningItem[] = [];
  let score = 50; // baseline

  // Tìm bảng tương hợp cho chart1
  const pairConfig = findBusinessPair(chart1.canChi);

  if (!chart2) {
    // Trả về danh sách tuổi hợp tác tốt nhất
    return {
      type: CompatibilityType.KINH_DOANH,
      overallScore: 0,
      level: "TRA_CUU",
      bestPartners: pairConfig.compatibleElements.map(el => ({
        element: el,
        scoreBonus: getPartnershipScore(el, pairConfig),
        reason: getPartnershipReason(el, pairConfig),
      })),
      worstPartners: pairConfig.incompatibleElements.map(el => ({
        element: el,
        scorePenalty: getPartnershipPenalty(el, pairConfig),
        reason: "Xung khắc Tài Lộc hoặc Quan Lộc",
      })),
      recommendations: buildBusinessRecommendation(chart1, pairConfig),
      warnings: [],
    };
  }

  // So sánh 2 lá số
  const el1 = chart1.canChi;
  const el2 = chart2.canChi;

  if (pairConfig.compatibleElements.includes(el2)) {
    score += 30;
    recommendations.push(
      `Tuổi ${el2} thuộc nhóm hợp tác tốt với ${el1}`
    );
  }
  if (pairConfig.incompatibleElements.includes(el2)) {
    score -= 30;
    warnings.push({
      level: "HIGH",
      code: "KINH_DOANH_XUNG",
      message: `${el1} và ${el2} xung khắc trong hợp tác kinh doanh`,
      detail: "Tránh hợp tác vốn lớn, nên thử hợp tác nhỏ trước",
    });
  }

  // Kiểm tra cung Tài Bạch
  const tai1 = chart1.palaces["Tài Bạch"];
  const tai2 = chart2.palaces["Tài Bạch"];

  // Cùng Lộc Mã giao trì → hợp tác tài chính tốt
  const hasLocMa1 = tai1.stars.includes("Lộc") && tai1.stars.includes("Mã");
  const hasLocMa2 = tai2.stars.includes("Lộc") && tai2.stars.includes("Mã");
  if (hasLocMa1 && hasLocMa2) {
    score += 20;
    recommendations.push("Cả hai cùng có Lộc Mã giao trì — hợp tác tài chính rất thuận lợi");
  }

  // Kiểm tra cung Quan Lộc
  const quan1 = chart1.palaces["Quan Lộc"];
  const quan2 = chart2.palaces["Quan Lộc"];

  // Cùng Văn chứng cách → bổ trợ về chiến lược
  const van1Score = getVanChungScore(quan1);
  const van2Score = getVanChungScore(quan2);
  if (van1Score > 50 && van2Score > 50) {
    score += 15;
    recommendations.push("Cả hai đều có Văn chứng cách — bổ trợ chiến lược kinh doanh");
  }

  // Kiểm tra xung khắc Quan Lộc
  if (isPalaceConflict(quan1, quan2, "Lục Xung")) {
    score -= 20;
    warnings.push({
      level: "MEDIUM",
      code: "QUAN_XUNG",
      message: "Quan Lộc xung nhau — mâu thuẫn trong quản lý",
      detail: "Cần phân công vai trò rõ ràng khi hợp tác",
    });
  }

  // Kiểm tra Phúc Đức
  const phuc1 = chart1.palaces["Phúc Đức"];
  const phuc2 = chart2.palaces["Phúc Đức"];

  if (hasGoodStars(phuc1) && hasGoodStars(phuc2)) {
    score += 10;
    recommendations.push("Cả hai đều có Phúc Đức tốt — hợp tác lâu dài bền vững");
  }

  return buildCompatibilityResult(score, recommendations, warnings);
}

// ── 4.3.2: So khớp Hôn nhân ──────────────────────────────────

function analyzeMarriageCompatibility(
  chart1: NatalChart,
  chart2: NatalChart | null
): CompatibilityResult {
  const recommendations: string[] = [];
  const warnings: WarningItem[] = [];
  let score = 50;

  // Cung Phu Thê
  const phuThe1 = chart1.palaces["Phu Thê"];
  const phuThe2 = chart2?.palaces["Phu Thê"];
  const phuc1 = chart1.palaces["Phúc Đức"];
  const phuc2 = chart2?.palaces["Phúc Đức"];

  // Kiểm tra Tả Hữu / Hữu Phủ (sao chủ hôn nhân)
  const hasTaiHu = (palace: PalaceData) =>
    palace.stars.some(s => ["Tả Hữu", "Hữu Phủ"].includes(s));

  if (hasTaiHu(phuThe1)) {
    score += 15;
    recommendations.push("Bản thân có Tả Hữu tại Phu Thê — duyên vợ chồng tốt");
  }

  if (chart2 && phuThe2 && hasTaiHu(phuThe2)) {
    score += 15;
    recommendations.push("Đối phương có Tả Hữu tại Phu Thê — duyên vợ chồng tốt");
  }

  // Kiểm tra cung Phu Thê × Phúc Đức
  if (chart2) {
    // Lục Hợp Phu Thê và Phúc Đức của cả hai → hôn nhân có phúc
    if (isPalaceHarmony(phuThe1, phuc1, "Lục Hợp")) score += 20;
    if (isPalaceHarmony(phuThe2, phuc2, "Lục Hợp")) score += 20;

    // Kiểm tra xung khắc ngũ hành
    const menhElement1 = chart1.element;
    const menhElement2 = chart2.element;

    const conflict = checkWuXingConflict(menhElement1, menhElement2);
    if (conflict.isSevere) {
      score -= 30;
      warnings.push({
        level: "HIGH",
        code: "NGU_HANH_XUNG",
        message: `${menhElement1} và ${menhElement2} xung khắc nghiêm trọng`,
        detail: conflict.description,
      });
    } else if (conflict.isMild) {
      score -= 10;
      warnings.push({
        level: "LOW",
        code: "NGU_HANH_BAT_HOI",
        message: `${menhElement1} và ${menhElement2} không hòa hợp hoàn toàn`,
        detail: "Cần thời gian thích nghi, có thể hòa giải bằng ngũ hành",
      });
    }

    // Kiểm tra xung Tứ Hành Xung
    if (isTuHaXung(chart1.canChi, chart2.canChi)) {
      score -= 25;
      warnings.push({
        level: "HIGH",
        code: "TU_HANH_XUNG",
        message: `${chart1.canChi} và ${chart2.canChi} thuộc Tứ Hành Xung`,
        detail: "Hôn nhân có nhiều thử thách, cần nỗ lực hòa giải nhiều hơn`,
      });
    }

    // Kiểm tra Đối Xung
    if (isDoiXung(chart1.canChi, chart2.canChi)) {
      score += 15;
      recommendations.push("Can Chi đối xung — vợ chồng bổ sung cho nhau về ngũ hành");
    }
  }

  return buildCompatibilityResult(score, recommendations, warnings);
}

// ── 4.3.3: Phân tích Tử Tức ────────────────────────────────────

function analyzeChildCompatibility(chart1: NatalChart): CompatibilityResult {
  const tuTuPalace = chart1.palaces["Tử Tức"];
  const tuTuStars = tuTuPalace.stars as string[];

  const favorableIndicators: ChildIndicator[] = [];
  const infertilityWarnings: InfertilityWarning[] = [];
  const challenges: string[] = [];
  const strengths: string[] = [];

  // ── Đếm sao hiếm muộn [15, 16] ────────────────────────────────
  const infertilityStars = ["Đẩu Quân", "Linh Hỏa", "Đầu Sĩ", "Bại Vong"];
  const infertilityCount = tuTuStars.filter(s =>
    infertilityStars.includes(s)
  ).length;

  if (infertilityCount >= 3) {
    infertilityWarnings.push({
      causeStars: tuTuStars.filter(s => infertilityStars.includes(s)),
      causeDescription: "Tử Tức hội nhiều sát tinh — khó có con, khó nuôi",
      severity: "CRITICAL",
      solutionTips: [
        "Cần tích đức, làm việc thiện để hóa giải",
        "Hỏi thầy cúng giải hoặc tu tạo phúc đức",
        "Khám y khoa hỗ trợ sinh sản",
      ],
    });
    challenges.push("Tử Tức gặp nhiều sát tinh — hiếm muộn, khó nuôi");
  } else if (infertilityCount >= 1) {
    infertilityWarnings.push({
      causeStars: tuTuStars.filter(s => infertilityStars.includes(s)),
      causeDescription: "Có sát tinh ảnh hưởng đến con cái",
      severity: "MEDIUM",
      solutionTips: [
        "Chú ý sức khỏe con trong những năm đầu",
        "Cẩn thận trong việc chăm sóc, giáo dục",
      ],
    });
  }

  // ── Kiểm tra sao thuận lợi [15, 16] ──────────────────────────
  if (tuTuStars.includes("Thai")) {
    favorableIndicators.push({
      stars: ["Thai"],
      description: "Thai Tinh tại Tử Tức — có con, sinh nở thuận lợi",
      impact: "very_positive",
    });
    strengths.push("Thai Tinh — dấu hiệu sinh con tốt đẹp");
  }

  if (tuTuStars.includes("Đào")) {
    favorableIndicators.push({
      stars: ["Đào", "Hồng"],
      description: "Đào Hồng tại Tử Tức — con cái xinh đẹp, duyên dáng",
      impact: "positive",
    });
    strengths.push("Đào Hồng — con cái có duyên, được yêu thương");
  }

  if (tuTuStars.includes("Tướng")) {
    favorableIndicators.push({
      stars: ["Tướng"],
      description: "Tướng tại Tử Tức — con có địa vị, tài giỏi",
      impact: "very_positive",
    });
    strengths.push("Tướng — con cái có tài, có tướng");
  }

  if (tuTuStars.includes("Phượng")) {
    favorableIndicators.push({
      stars: ["Phượng"],
      description: "Phượng tại Tử Tức — con gái phúc hậu, hiếu thảo",
      impact: "positive",
    });
  }

  // ── Dự đoán số lượng và giới tính con ────────────────────────
  let predictedMin = 1;
  let predictedMax = 2;
  let gender = "uncertain";
  let confidence = 60;

  // Thai + Đào + Lộc → nhiều con
  const childStarsCount = tuTuStars.filter(s =>
    ["Thai", "Đào", "Hồng", "Lộc", "Tướng", "Phượng", "Long"].includes(s)
  ).length;

  if (childStarsCount >= 4) {
    predictedMin = 3;
    predictedMax = 5;
    confidence = 80;
  } else if (childStarsCount >= 2) {
    predictedMin = 2;
    predictedMax = 3;
    confidence = 70;
  }

  // Giới tính: Quản Hạ (Tứ Mộ) + Thai → con trai
  // Đào Hồng → con gái
  const hasConTrai = tuTuStars.includes("Thai") &&
    chart1.palaces["Quản Hạ"].stars.includes("Mã");
  const hasConGai = tuTuStars.includes("Đào") || tuTuStars.includes("Hồng");

  if (hasConTrai && hasConGai) gender = "balanced";
  else if (hasConTrai) gender = "more_boys";
  else if (hasConGai) gender = "more_girls";

  // ── Thời điểm sinh con thuận lợi ─────────────────────────────
  const favorableBirthPeriods = findFavorableBirthYears(chart1);

  return {
    type: CompatibilityType.TU_TUC,
    overallScore: 50 + (favorableIndicators.length * 10) - (infertilityWarnings.length * 15),
    level: determineLevel(score),
    details: {
      predictedChildren: { min: predictedMin, max: predictedMax, gender, confidence },
      favorableIndicators,
      infertilityWarnings,
      favorableBirthPeriods,
      parentingAdvice: {
        challenges,
        strengths,
        tips: buildParentingTips(favorableIndicators, infertilityWarnings),
      },
    },
    recommendations: buildChildRecommendations(favorableIndicators, infertilityWarnings),
    warnings: infertilityWarnings.map(w => ({
      level: w.severity === "CRITICAL" ? "HIGH" : "MEDIUM",
      code: "HIEMUON",
      message: w.causeDescription,
      detail: w.solutionTips.join("; "),
    })),
  };
}
```

---

### MODULE 5 — DỰ BÁO THỜI ĐIỂM ĐẠI LỢI (Auspicious Timing)

#### 5.1. Mục đích

Giúp người dùng chọn ngày giờ xuất hành hoặc khởi sự phù hợp với từng bản mệnh, đồng thời nhận diện các năm "Hoạnh Phát" để nắm bắt cơ hội.

#### 5.2. Thuật toán chi tiết — Module 5

```typescript
/**
 * ALGORITHM: analyzeAuspiciousTiming
 *
 * INPUT:
 *   chart: NatalChart
 *   currentYear: number
 *
 * OUTPUT:
 *   AuspiciousTimingResult {
 *     departureTiming: DepartureTiming {
 *       suitableDayType: "chan" | "le" | "both";  // Ngày chẵn/lẻ [17, 18]
 *       suitableHourType: "chan" | "le" | "both"; // Giờ chẵn/lẻ [17, 18]
 *       suitableMonths: number[];                  // Tháng phù hợp
 *       unsuitableMonths: number[];
 *       bestDays: string[];                        // Ngày tốt cụ thể
 *       explanation: string;
 *     };
 *     hoanhPhatYears: YearHighlight[];  // Năm đại lợi [19]
 *     hoanhPhatExplanation: string;
 *     fengShuiDirections: DirectionAdvice[]; // Hướng tốt/xấu theo tuổi
 *   }
 */

function analyzeAuspiciousTiming(
  chart: NatalChart,
  currentYear: number,
): AuspiciousTimingResult {
  // ── Bước 1: Xác định ngày giờ xuất hành ───────────────────────
  // Theo nguyên tắc: Tuổi Giáp Tý hạp ngày chẵn, giờ chẵn, tháng lẻ [17, 18]
  // Công thức: Dựa trên Can của bản mệnh

  const can = extractCan(chart.canChi); // Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý

  const suitableDayType = getSuitableDayType(can);
  const suitableHourType = getSuitableHourType(can);
  const suitableMonths = getSuitableMonths(can, chart.element);
  const unsuitableMonths = getUnsuitableMonths(can);

  // ── Bước 2: Tìm năm Hoạnh Phát ────────────────────────────────
  // Pattern: Năm có cát tinh như "Cẩm thượng thiêm hoa", "Phong vân tế hội" [19]
  // Thuật toán: Quét Tiểu hạn của 60 năm tới, tìm năm có cát tinh mạnh

  const hoanhPhatYears: YearHighlight[] = [];
  for (let yearOffset = 0; yearOffset <= 60; yearOffset++) {
    const year = currentYear + yearOffset;
    const yearCanChi = calculateCanChi(year, chart.lunarBirth);
    const minorFatePalace = getMinorFatePalace(chart, yearOffset);

    // Kiểm tra cát tinh hoạnh phát
    const hoanhPhatStars = [
      "Cẩm",
      "Thượng",
      "Thiên Hữu",
      "Lộc",
      "Tướng",
      "Phượng",
      "Long",
      "Quang",
      "Hồng",
      "Đào",
    ];
    const hasHoanhPhat = minorFatePalace.stars.some((s) =>
      hoanhPhatStars.includes(s),
    );

    // Kiểm tra hung tinh
    const hungStars = [
      "Hỏa Linh",
      "Đầu Sĩ",
      "Phá Toàn",
      "Thất Sát",
      "Linh Hỏa",
      "Đẩu Quân",
    ];
    const hasHung = minorFatePalace.stars.some((s) => hungStars.includes(s));

    if (hasHoanhPhat && !hasHung) {
      hoanhPhatYears.push({
        year,
        canChi: yearCanChi,
        palace: minorFatePalace.name,
        mainStars: minorFatePalace.stars.filter((s) =>
          hoanhPhatStars.includes(s),
        ),
        reason: generateHoanhPhatReason(minorFatePalace.stars),
        opportunityType: classifyOpportunity(minorFatePalace.stars),
        // Ví dụ: "Cẩm thượng thiêm hoa" → học hành, danh lợi
        //        "Phong vân tế hội" → giao tiếp, ngoại giao, hợp tác
      });
    }
  }

  // Sắp xếp theo năm gần nhất, lấy top 5
  hoanhPhatYears.sort((a, b) => a.year - b.year);
  const topHoanhPhat = hoanhPhatYears.slice(0, 5);

  // ── Bước 3: Hướng tốt/xấu theo tuổi ───────────────────────────
  const fengShuiDirections = calculateFengShuiDirections(chart);

  return {
    departureTiming: {
      suitableDayType,
      suitableHourType,
      suitableMonths,
      unsuitableMonths,
      bestDays: generateBestDays(suitableDayType, suitableMonths),
      explanation: generateDepartureExplanation(
        can,
        suitableDayType,
        suitableHourType,
      ),
    },
    hoanhPhatYears: topHoanhPhat,
    hoanhPhatExplanation: generateHoanhPhatExplanation(topHoanhPhat),
    fengShuiDirections,
  };
}

// ── Hàm hỗ trợ ────────────────────────────────────────────────

function getSuitableDayType(can: string): "chan" | "le" | "both" {
  // Giáp, Bính, Mậu, Canh, Nhâm → ngày CHẴN
  // Ất, Đinh, Kỷ, Tân, Quý → ngày LẺ
  const chanCans = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"];
  return chanCans.includes(can) ? "chan" : "le";
}

function getSuitableHourType(can: string): "chan" | "le" | "both" {
  // Cùng quy tắc với ngày
  const chanCans = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"];
  return chanCans.includes(can) ? "chan" : "le";
}

function getSuitableMonths(can: string, element: Element): number[] {
  // Công thức: Can + Ngũ hành → tháng phù hợp
  // Ví dụ: Kim → tháng 7, 8 (Bạch Dương, Kim Mão)
  const monthByElement: Record<Element, number[]> = {
    Kim: [7, 8], // Tháng Bạch Dương, Kim Mão
    Thủy: [10, 11], // Tháng Sửu, Dần (Kim sinh Thủy → nhưng 10, 11 là Thủy)
    Hỏa: [2, 3], // Tháng Hợi, Tý (Thủy sinh Mộc... chờ chỉnh)
    Mộc: [1, 2], // Tháng Dần, Mão
    Thổ: [6, 9], // Tháng Mão, Thân
  };

  // Can dương → tháng lẻ; Can âm → tháng chẵn
  const yangCans = ["Giáp", "Bính", "Mậu", "Canh", "Nhâm"];
  const isYang = yangCans.includes(can);

  const baseMonths = monthByElement[element] || [
    1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12,
  ];
  const suitableMonths = isYang
    ? baseMonths.filter((m) => m % 2 === 1)
    : baseMonths.filter((m) => m % 2 === 0);

  return suitableMonths;
}

function generateHoanhPhatReason(stars: string[]): string {
  if (stars.includes("Cẩm") && stars.includes("Thiên")) {
    return "Cẩm thượng thiêm hoa — học hành đỗ đạt, danh lợi song toàn";
  }
  if (stars.includes("Phong") && stars.includes("Vân")) {
    return "Phong vân tế hội — giao tiếp thuận lợi, ngoại giao thành công";
  }
  if (stars.includes("Lộc") && stars.includes("Mã")) {
    return "Lộc Mã giao trì — tài lộc đại phát, kinh doanh thuận lợi";
  }
  if (stars.includes("Tướng") && stars.includes("Phượng")) {
    return "Tướng Phượng hội — công danh thăng tiến, gia đình hòa thuận";
  }
  return "Cát tinh vượng — năm thuận lợi cho khởi sự, mở rộng";
}
```

---

### MODULE 6 — DỰ BÁO BIẾN CỐ VÀ GIẢI HẠN (Crisis Alert)

#### 6.1. Mục đích

Tự động nhận diện các năm hạn nặng và đưa ra hướng dẫn giải hạn cụ thể theo từng tuổi và năm gặp hạn.

#### 6.2. Các loại hạn nguy hiểm

```typescript
enum CrisisType {
  TRUNG_PHUNG = "TRUNG_PHUNG", // Đại hạn + Tiểu hạn trùng 1 cung [20, 21]
  TRUC_LA_NANG = "TRUC_LA_NANG", // Trúc La gia thêm sát tinh [20, 21]
  HIEU_CHINH = "HIEU_CHINH", // Hiệu chỉnh — đại hạn xấu
  PHUOC_LOC_VONG = "PHUOC_LOC_VONG", // Phước Lộc Vong — mất phước
  DAI_KhanH = "DAI_KHANH", // Đại Kiếp
}
```

#### 6.3. Thuật toán chi tiết — Module 6

```typescript
/**
 * ALGORITHM: analyzeCrisisAlert
 *
 * INPUT:
 *   chart: NatalChart
 *   currentYear: number
 *   rangeYears: number = 60  // Phạm vi dự báo
 *
 * OUTPUT:
 *   CrisisAlertResult {
 *     crisisYears: CrisisYear[];          // Các năm có hạn
 *     rescueYears: RescueYear[];         // Năm hóa giải
 *     annualCrisisDetail: CrisisYearDetail[]; // Chi tiết từng năm
 *     ritualGuide: RitualGuide[];         // Hướng dẫn cúng sao giải hạn [22-24]
 *     tuNhanTichDuc: TuNhanAdvice[];     // Tu nhân tích đức [22-24]
 *   }
 */

function analyzeCrisisAlert(
  chart: NatalChart,
  currentYear: number,
  rangeYears: number = 60,
): CrisisAlertResult {
  const crisisYears: CrisisYear[] = [];
  const ritualGuide: RitualGuide[] = [];
  const tuNhanAdvice: TuNhanAdvice[] = [];

  // ── Bước 1: Tính Đại hạn (60 năm vòng) ────────────────────────
  // Đại hạn = 1 năm/1 cung, 12 năm/1 vòng, 60 năm/5 vòng
  // Bắt đầu từ cung Mệnh khi sinh ra

  const ageAtFateStart = 0; // Đại hạn bắt đầu từ năm sinh
  const fateRotation: PalaceName[] = [
    "Mệnh",
    "Phụ Mẫu",
    "Phúc Đức",
    "Điền Trạch",
    "Quan Lộc",
    "Nạp Bạch",
    "Thiên Di",
    "Tật Ách",
    "Tài Bạch",
    "Phu Thê",
    "Tử Tức",
    "Phú Đạo",
  ];

  // ── Bước 2: Quét 60 năm tới ─────────────────────────────────
  for (let yearOffset = 0; yearOffset < rangeYears; yearOffset++) {
    const year = currentYear + yearOffset;
    const age = yearOffset;
    const fateIndex = age % 12;
    const fatePalaceName = fateRotation[fateIndex];
    const fatePalace = chart.palaces[fatePalaceName];

    // ── Tính Tiểu hạn (1 năm/1 cung, bắt đầu từ cung Nạp Bạch) ──
    const minorFateIndex = (age + chart.birthMonth) % 12;
    const minorFatePalace = chart.palaces[fateRotation[minorFateIndex]];

    const crisis: CrisisYear = {
      year,
      age,
      ageInLunar: age + 1, // Tuổi âm lịch
      canChi: calculateCanChi(year, chart.lunarBirth),
      daiHanPalace: fatePalaceName,
      tieuHanPalace: fateRotation[minorFateIndex],
      starsAtDaiHan: fatePalace.stars,
      starsAtTieuHan: minorFatePalace.stars,
      severity: 0,
      crisisTypes: [],
      warnings: [],
    };

    // ── Bước 3: Kiểm tra Trùng Phùng [20, 21] ─────────────────
    // Đại hạn và Tiểu hạn cùng vào 1 cung → nguy hiểm cao
    if (fatePalaceName === fateRotation[minorFateIndex]) {
      crisis.crisisTypes.push(CrisisType.TRUNG_PHUNG);
      crisis.severity += 50;
      crisis.warnings.push({
        level: "CRITICAL",
        code: "DAI_TIEU_TRUNG",
        message: `Đại hạn và Tiểu hạn cùng tại cung ${fatePalaceName}`,
        detail:
          "Năm này gặp hạn nặng nhất — trùng phùng. Cần hạn chế thay đổi lớn, tránh đại sự.",
      });

      // Kiểm tra cung đó có sát tinh không
      const satCount = countSatStars(fatePalace.stars);
      if (satCount >= 2) {
        crisis.severity += 30;
        crisis.warnings.push({
          level: "CRITICAL",
          code: "TRUNG_PHUNG_SAT",
          message: `Trùng phùng tại cung ${fatePalaceName} có nhiều sát tinh`,
          detail:
            "Năm này có thể gặp biến cố lớn. Tu nhân tích đức, làm việc thiện.",
        });
      }
    }

    // ── Bước 4: Kiểm tra Trúc La nặng [20, 21] ─────────────────
    // Sát Phá Tham hội tụ + thêm sát tinh → hung cao
    const hasSatPhathTham = fatePalace.stars.some((s) =>
      ["Sát", "Phá", "Tham"].includes(s),
    );
    const hasExtraSat = fatePalace.stars.some((s) =>
      ["Hỏa Linh", "Linh Hỏa", "Đầu Sĩ", "Bại Vong", "Đao"].includes(s),
    );

    if (hasSatPhathTham && hasExtraSat) {
      crisis.crisisTypes.push(CrisisType.TRUC_LA_NANG);
      crisis.severity += 40;
      crisis.warnings.push({
        level: "HIGH",
        code: "TRUC_LA_TREN_SAT",
        message: `Trúc La tại ${fatePalaceName} gia thêm sát tinh`,
        detail:
          "Bộ Trúc La (Sát Phá Tham) gặp sát tinh — hung hiểm, cần giải hạn",
      });
    }

    // ── Bước 5: Kiểm tra cung hạn nặng theo tuổi ───────────────
    // Theo bảng "Nhâm Tý → đến Quý Hợi", mỗi tuổi có cung hạn riêng
    const heavyFatePalace = getHeavyFatePalace(chart.canChi, age);
    if (fatePalaceName === heavyFatePalace) {
      crisis.severity += 20;
      crisis.warnings.push({
        level: "MEDIUM",
        code: "CANH_TRONG_NAM",
        message: `Năm ${year} (${crisis.canChi}) tuổi ${age} thuộc cung hạn nặng`,
        detail: getHeavyFateExplanation(chart.canChi, age),
      });
    }

    // ── Bước 6: Kiểm tra hung tinh tại cung Đại hạn ────────────
    if (
      fatePalace.stars.includes("Hỏa Linh") ||
      fatePalace.stars.includes("Linh Hỏa")
    ) {
      crisis.severity += 20;
      crisis.warnings.push({
        level: "HIGH",
        code: "HOA_LINH_TAI_DAI_HAN",
        message: "Đại hạn có Hỏa Linh/Linh Hỏa — cảnh báo hỏa hoạn, bỏng",
        detail: "Tránh xa lửa, điện; không đặt tượng, bếp đối diện cung này",
      });
    }

    if (fatePalace.stars.includes("Đầu Sĩ")) {
      crisis.severity += 25;
      crisis.warnings.push({
        level: "HIGH",
        code: "DAU_SI_TAI_DAI_HAN",
        message:
          "Đại hạn có Đầu Sĩ — cảnh báo chấn thương đầu, tai nạn bất ngờ",
        detail: "Cẩn thận khi tham gia giao thông, công việc nguy hiểm",
      });
    }

    if (
      fatePalace.stars.includes("Thất Sát") ||
      fatePalace.stars.includes("Phá Toàn")
    ) {
      crisis.severity += 30;
      crisis.warnings.push({
        level: "CRITICAL",
        code: "SAT_PHA_TAI_DAI_HAN",
        message:
          "Đại hạn có Thất Sát hoặc Phá Toàn — nguy cơ bệnh nặng, tài lộc giảm",
        detail: "Chú ý sức khỏe, tài chính; hạn chế đầu tư lớn",
      });
    }

    // ── Bước 7: Gán mức độ nghiêm trọng ─────────────────────────
    if (crisis.severity >= 70) {
      crisis.level = "NẶNG_NHẤT";
    } else if (crisis.severity >= 50) {
      crisis.level = "NẶNG";
    } else if (crisis.severity >= 30) {
      crisis.level = "TRUNG_BINH";
    } else if (crisis.severity >= 15) {
      crisis.level = "NHẸ";
    } else {
      crisis.level = "BÌNH_AN";
    }

    if (crisis.level !== "BÌNH_AN") {
      crisisYears.push(crisis);

      // ── Bước 8: Sinh hướng dẫn giải hạn ───────────────────────
      ritualGuide.push(generateRitualGuide(crisis, chart));
      tuNhanAdvice.push(generateTuNhanAdvice(crisis, chart));
    }
  }

  // ── Bước 9: Xác định năm hóa giải ────────────────────────────
  // Năm có cung Phúc Đức hoặc Thiên Di có nhiều cát tinh
  const rescueYears = crisisYears
    .filter((c) => {
      const phuc = chart.palaces["Phúc Đức"];
      const thienDi = chart.palaces["Thiên Di"];
      return (
        phuc.stars.some((s) => ["Cơ", "Lộc", "Tướng", "Phúc"].includes(s)) ||
        thienDi.stars.some((s) => ["Quang", "Hồng", "Lộc"].includes(s))
      );
    })
    .map((c) => ({
      year: c.year,
      reason: "Phúc Đức/Thiên Di có cát tinh — năm hóa giải tốt",
      activities: ["Làm việc thiện", "Từ thiện", "Mở rộng quan hệ"],
    }));

  return {
    crisisYears: crisisYears.sort((a, b) => a.year - b.year),
    rescueYears,
    annualCrisisDetail: crisisYears.map((c) => buildCrisisDetail(c)),
    ritualGuide,
    tuNhanTichDuc: tuNhanAdvice,
  };
}

// ── Hướng dẫn cúng sao giải hạn [22-24] ─────────────────────

function generateRitualGuide(
  crisis: CrisisYear,
  chart: NatalChart,
): RitualGuide {
  const rituals: RitualGuide = {
    year: crisis.year,
    canChi: crisis.canChi,
    crisisType: crisis.crisisTypes[0] || CrisisType.HIEU_CHINH,
    severityLevel: crisis.level,
    basicRituals: [],
    advancedRituals: [],
    avoidance: [],
  };

  // ── Cúng sao giải hạn theo cung ────────────────────────────
  if (
    crisis.starsAtDaiHan.includes("Hỏa Linh") ||
    crisis.starsAtDaiHan.includes("Linh Hỏa")
  ) {
    rituals.basicRituals.push({
      name: "Cúng Sao Thái Dương",
      frequency: "Mỗi ngày Chủ Nhật hàng tuần",
      description: "Cúng 49 cây nhang, đĩa hoa quả, trà nước",
      direction: "Hướng Đông nam",
      benefit: "Giảm hỏa hoạn, bỏng, sức khỏe",
    });
    rituals.avoidance.push(
      "Tránh xa lửa, bếp gas, nến trong tháng 3, 6, 9, 12",
    );
  }

  if (
    crisis.starsAtDaiHan.includes("Thất Sát") ||
    crisis.starsAtDaiHan.includes("Phá Toàn")
  ) {
    rituals.basicRituals.push({
      name: "Cúng Sao Thái Âm",
      frequency: "Mỗi ngày mùng 15 âm lịch",
      description: "Cúng 36 cây nhang, bánh trôi, nước trà",
      direction: "Hướng Tây",
      benefit: "Giảm bệnh tật, tai nạn, thị phi",
    });
    rituals.avoidance.push("Tránh đi xa, thay đổi lớn trong tháng 1, 4, 7, 10");
  }

  if (crisis.crisisTypes.includes(CrisisType.TRUNG_PHUNG)) {
    rituals.advancedRituals.push({
      name: "Cúng giải hạn trùng phùng",
      frequency: "Đầu năm âm lịch (tháng 1)",
      description: "Cúng 108 cây nhang, 3 đĩa ngũ quả, trà rượu, vàng mã",
      direction: "Hướng cung Mệnh",
      benefit: "Giải trùng phùng, cân bằng Đại/Tiểu hạn",
      specialNote:
        "Năm trùng phùng: hạn chế cưới xin, xây nhà, khai trương lớn",
    });
    rituals.avoidance.push(
      "Không khai trương lớn, không cưới xin, không xây cất trong năm",
    );
  }

  // ── Tu nhân tích đức ───────────────────────────────────────
  if (crisis.level === "NẶNG" || crisis.level === "NẶNG_NHẤT") {
    rituals.basicRituals.push({
      name: "Làm việc thiện",
      frequency: "Thường xuyên trong năm",
      description: "Từ thiện, giúp đỡ người nghèo, phóng sinh, đi chùa cầu an",
      direction: "Bất kỳ",
      benefit: "Tích đức giải hạn, mang lại may mắn",
    });
  }

  return rituals;
}

// ── Tu nhân tích đức [22-24] ─────────────────────────────────

function generateTuNhanAdvice(
  crisis: CrisisYear,
  chart: NatalChart,
): TuNhanAdvice {
  const advice: TuNhanAdvice = {
    year: crisis.year,
    level: crisis.level,
    principles: [],
    practices: [],
    warnings: [],
  };

  if (crisis.level === "NẶNG_NHẤT" || crisis.level === "NẶNG") {
    advice.principles.push(
      "Năm hạn nặng: thuận tự nhiên, không chống lại số mệnh",
      "Tu tâm tích đức: nhẫn nhịn, không tham lam, không sát sinh",
      "Mở rộng lòng từ bi: tha thứ cho kẻ có lỗi với mình",
    );

    advice.practices.push(
      "Mỗi tháng: làm ít nhất 1 việc từ thiện (tiền, vật chất, công sức)",
      "Mỗi tuần: ăn chay 1-2 ngày để giải nghiệp",
      "Mỗi ngày: tụng kinh hoặc thiền định 15-30 phút",
      "Tránh giết chóc, đánh nhau, nói xấu người khác",
    );

    advice.warnings.push(
      "Không tham gia tài chính mạo hiểm (cờ bạc, đầu tư lớn)",
      "Không kết hôn hoặc mang thai trong năm trùng phùng (nếu có)",
      "Tránh xa đối tượng tiêu cực, môi trường xấu",
    );
  }

  return advice;
}
```

---

## ĐẦU VÀO / ĐẦU RA API TỔNG HỢP

### API Request

```typescript
// POST /api/v1/chart/extended-analysis
interface ExtendedAnalysisRequest {
  // Dữ liệu cơ bản
  name: string;
  birthDate: string; // "1990-01-15"
  birthHour: number; // 1–12 (theo Địa Chi giờ, 1 = Tý, 2 = Sửu, ...)
  birthMinute?: number; // 0–59 (nếu có, để chính xác giờ sinh)
  gender: "male" | "female";
  lunarBirth: boolean; // Sinh âm lịch hay dương lịch
  timezone: string; // "Asia/Ho_Chi_Minh"

  // Module muốn phân tích (optional, mặc định = all)
  modules?: Array<
    | "birthHour"
    | "career"
    | "medical"
    | "compatibility"
    | "auspiciousTiming"
    | "crisisAlert"
  >;

  // Đối tác so khớp (chỉ dùng khi module = compatibility)
  partnerChart?: {
    birthDate: string;
    birthHour: number;
    gender: "male" | "female";
    lunarBirth: boolean;
  };

  // Phạm vi dự báo (mặc định 60 năm)
  forecastRange?: number;

  // Ngôn ngữ phản hồi
  language?: "vi" | "en" | "zh";
}
```

### API Response

```typescript
// Full response structure
interface ExtendedAnalysisResponse {
  success: boolean;
  timestamp: string;
  data: {
    // Metadata
    chartId: string;
    inputSummary: {
      name: string;
      age: number;
      canChi: string;
      element: Element;
      fateElement: Element;
    };

    // ── Module Results ─────────────────────────────────────────
    birthHourAnalysis?: BirthHourResult; // Module 1
    careerMapping?: CareerResult; // Module 2
    medicalAstrology?: MedicalResult; // Module 3
    compatibility?: CompatibilityResult; // Module 4
    auspiciousTiming?: AuspiciousTimingResult; // Module 5
    crisisAlert?: CrisisAlertResult; // Module 6

    // ── Summary Score ──────────────────────────────────────────
    overallAssessment: {
      lifeScore: number; // 0–100: Tổng điểm cuộc đời
      strengths: string[]; // Điểm mạnh nổi bật
      weaknesses: string[]; // Điểm yếu cần khắc phục
      keyOpportunities: string[]; // Cơ hội chính
      keyRisks: string[]; // Rủi ro chính
    };

    // ── Priority Alerts ───────────────────────────────────────
    priorityAlerts: {
      critical: AlertItem[]; // Cần xử lý NGAY
      high: AlertItem[]; // Cần xử lý trong tháng
      medium: AlertItem[]; // Theo dõi
    };
  };
  meta: {
    modulesExecuted: string[];
    executionTimeMs: number;
    version: string; // "1.0.0"
  };
}
```

---

## PRIORITY IMPLEMENTATION & DEPENDENCIES

### Thứ tự ưu tiên triển khai

```
GIAI ĐOẠN 1 (Core Foundation):
├── Scoring Engine — Bắt buộc làm trước, tất cả module dựa vào
├── Module 6: Crisis Alert — Xác định rủi ro lớn nhất
├── Module 3: Medical Astrology — Cảnh báo sức khỏe
└── Module 1: Birth Hour Analysis — Trẻ em

GIAI ĐOẠN 2 (Business Value):
├── Module 2: Career Mapping — Định hướng nghề nghiệp
├── Module 5: Auspicious Timing — Chọn ngày giờ
└── Module 4: Compatibility — So khớp

GIAI ĐOẠN 3 (Advanced):
├── Visualization (biểu đồ, lá số tương tác)
├── Multi-chart comparison (so sánh nhiều lá số)
├── Historical matching (đối chiếu lịch sử)
└── AI-powered interpretation (sinh văn bản tự nhiên)
```

### Module Dependencies Graph

```
ScoringEngine (TRUNG TÂM)
    ├── Module 1: BirthHour    → dùng scores, rescueFactors
    ├── Module 2: Career       → dùng scores, comboRules
    ├── Module 3: Medical      → dùng tuAchPalace, stars
    ├── Module 4: Compatibility → dùng palaceAnalysis
    ├── Module 5: Auspicious  → dùng canChi, element, minorFate
    └── Module 6: Crisis      → dùng fateRotation, palaceAnalysis
```

### Database Schema (đề xuất)

```sql
-- Bảng lá số mở rộng
CREATE TABLE natal_charts (
  id UUID PRIMARY KEY,
  name VARCHAR(100),
  birth_date DATE,
  birth_hour INT,        -- 1–12
  birth_minute INT,      -- 0–59
  gender VARCHAR(10),
  lunar_birth BOOLEAN,
  can_chi VARCHAR(20),
  element VARCHAR(10),
  chart_data JSONB,      -- Lá số đầy đủ 12 cung + sao

  -- Kết quả scoring engine
  scores JSONB,

  -- Kết quả từng module
  module_birth_hour JSONB,
  module_career JSONB,
  module_medical JSONB,
  module_compatibility JSONB,
  module_auspicious JSONB,
  module_crisis JSONB,

  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Bảng cảnh báo ưu tiên
CREATE TABLE priority_alerts (
  id UUID PRIMARY KEY,
  chart_id UUID REFERENCES natal_charts(id),
  level VARCHAR(20),     -- CRITICAL, HIGH, MEDIUM, LOW
  category VARCHAR(50),  -- HEALTH, CAREER, CRISIS, etc.
  code VARCHAR(50),      -- Mã lỗi/warning
  message TEXT,
  detail TEXT,
  acknowledged BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT NOW()
);

-- Bảng xung đột/ngày giờ
CREATE TABLE auspicious_timing_cache (
  id UUID PRIMARY KEY,
  can_chi VARCHAR(20),
  suitable_day_type VARCHAR(10),
  suitable_hour_type VARCHAR(10),
  suitable_months INT[],
  best_days_cache TEXT,
  valid_from DATE,
  valid_to DATE
);
```

### Validation Rules quan trọng

```typescript
const VALIDATION_RULES = {
  birthHour: {
    min: 1,
    max: 12,
    required: true,
    error: "Giờ sinh phải từ 1 (Tý) đến 12 (Hợi)",
  },
  birthDate: {
    format: "YYYY-MM-DD",
    min: "1900-01-01",
    max: "2026-12-31",
    required: true,
  },
  forecastRange: {
    min: 10,
    max: 120,
    default: 60,
  },
  moduleNames: {
    allowed: [
      "birthHour",
      "career",
      "medical",
      "compatibility",
      "auspiciousTiming",
      "crisisAlert",
    ],
  },
};
```

---

## BẢNG THAM CHIẾU NHANH

### Ký hiệu viết tắt

| Ký hiệu         | Giải nghĩa                                                |
| --------------- | --------------------------------------------------------- |
| `PalaceData`    | Dữ liệu 1 cung trong lá số                                |
| `Tứ Mộ`         | 4 cung Tài Bạch, Quan Lộc, Phu Thê, Điền Trạch            |
| `Tứ Linh`       | Long, Phượng, Hổ, Quy                                     |
| `Lục Tài`       | Lộc Tồn, Lộc Đỉnh, Lộc Khố, Thai, Đào, Hồng               |
| `Tứ Sát`        | Sát Phá Tham, Liêm Trinh, Tham Vũ, Vũ Phá                 |
| `Lục Bại`       | Bại Vong, Đại Hao, Tiểu Hao, Phong Ba, Ly Hỏa, Trùng Tang |
| `Tam Hóa`       | Tướng Hóa, Lộc Hóa, Khoa Hóa                              |
| `Trúc La`       | Bộ Sát Phá Tham                                           |
| `Lục Hành Xung` | 4 cặp xung: Tý-Mão, Sửu-Mùi, Dần-Thân, Thìn-Tỵ            |
| `Tứ Hành Xung`  | Tý-Ngọ-Mão-Dậu (bốn phương)                               |
| `Lục Hợp`       | Tý-Sửu, Dần-Hợi, Mão-Tuất, Thìn-Dậu, Tỵ-Thân, Ngọ-Mùi     |
| `Đối Xung`      | Cung đối diện nhau trong 12 cung                          |
| `Đại hạn`       | Vận hạn lớn, 1 năm/1 cung                                 |
| `Tiểu hạn`      | Vận hạn nhỏ, 1 năm/1 cung, bắt đầu từ Nạp Bạch            |

### Ngũ hành tương sinh / tương khắc

```
TƯƠNG SINH:  Kim → Thủy → Mộc → Hỏa → Thổ → Kim
TƯƠNG KHẮC: Kim ✗ Mộc, Mộc ✗ Thổ, Thổ ✗ Thủy,
            Thủy ✗ Hỏa, Hỏa ✗ Kim
```

### Bảng Can Chi

```
Can:  Giáp, Ất, Bính, Đinh, Mậu, Kỷ, Canh, Tân, Nhâm, Quý
Chi:  Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi
```

---

_Tài liệu này được thiết kế để lập trình viên có thể triển khai đầy đủ 6 module mở rộng theo đúng nguyên tắc Tử Vi Đẩu Số. Mỗi module đều có thuật toán chi tiết, cấu trúc dữ liệu, và ví dụ đầu ra cụ thể._
