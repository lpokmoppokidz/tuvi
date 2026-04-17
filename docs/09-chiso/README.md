# Thuật Toán Tử Vi Đẩu Số – Vận Hạn (Dành Cho Lập Trình)

> **Mục tiêu:** Tính toán vận hạn (Đại hạn, Tiểu hạn, Nguyệt hạn, Nhật hạn) theo chuẩn Tử Vi Đẩu Số cổ truyền.
> **Nguồn tham chiếu:** Lý học Tử Vi Đẩu Số – Hạnh Phúc Tử Vi Lý Học Toàn Thư.
> **Ngôn ngữ đề xuất:** TypeScript / JavaScript (React Native compatible).

---

## I. CẤU TRÚC DỮ LIỆU NỀN TẢNG

### 1.1. Cung (Palace) – 12 Cung Trong Tử Vi

```typescript
enum Palace {
  MỆNH = 'Mệnh',      // 1 - Thân mệnh
  PHỤ MẪU = 'Phụ Mẫu', // 2 - Cha mẹ
  PHÚC ĐỨC = 'Phúc Đức', // 3 - Phúc bẩn
  TÀI BẠCH = 'Tài Bạch', // 4 - Tài lộc
  QUAN LỘC = 'Quan Lộc', // 5 - Công danh
  NẠP ÁI = 'Nạp Ái',   // 6 - Bạn bè
  TẬT ÁCH = 'Tật Ách', // 7 - Bệnh tật
  TÀI QUAN = 'Tài Quan', // 8 - Tài quan
  THIÊN DI = 'Thiên Di', // 9 - Xuất lữ
  ĐIỀN TRẠCH = 'Điền Trạch', // 10 - Nhà cửa
  QUAN LỘC_2 = 'Quan Lộc_2', // 11 - Thiên quan
  BẢO MỆNH = 'Bảo Mệnh', // 12 - Mệnh thân
}
```

### 1.2. Thập Niên (Chi/Năm Sinh)

```typescript
enum EarthlyBranch {
  TÝ = "Tý",
  SỬU = "Sửu",
  DẦN = "Dần",
  MÃO = "Mão",
  THÌN = "Thìn",
  TỴ = "Tỵ",
  NGỌ = "Ngọ",
  MÙI = "Mùi",
  THÂN = "Thân",
  TUẤT = "Tuất",
  DẬU = "Dậu",
  HỢI = "Hợi",
}
```

### 1.3. Thập Can (Can/Năm)

```typescript
enum HeavenlyStem {
  GIÁP = "Giáp", // 1
  ẤT = "Ất", // 2
  BÍNH = "Bính", // 3
  ĐINH = "Đinh", // 4
  MẬU = "Mậu", // 5
  KỶ = "Kỷ", // 6
  CANH = "Canh", // 7
  TÂN = "Tân", // 8
  NHÂM = "Nhâm", // 9
  QUÝ = "Quý", // 10
}
```

### 1.4. Ngũ Hành (Five Elements)

```typescript
enum FiveElement {
  KIM = "Kim", // ♀
  MỘC = "Mộc", // ♃
  THỦY = "Thủy", // ☵
  HỎA = "Hỏa", // ☲
  THỔ = "Thổ", // ☰
}
```

### 1.5. Sao Lưu – Cửu Phi Tinh (9 Moving Stars)

```typescript
enum MovingStar {
  LƯU_THÁI_TUẾ = "Lưu Thái Tuế",
  LƯU_TANG_MÔN = "Lưu Tang Môn",
  LƯU_BẠCH_HỔ = "Lưu Bạch Hổ",
  LƯU_LỘC_TỒN = "Lưu Lộc Tồn",
  LƯU_KÌNH_DƯƠNG = "Lưu Kình Dương",
  LƯU_ĐÀ_LA = "Lưu Đà La",
  LƯU_THIÊN_MÃ = "Lưu Thiên Mã",
  LƯU_KHỐC = "Lưu Khốc",
  LƯU_HƯ = "Lưu Hư",
}
```

### 1.6. Sao Cố Định Chính (Main Fixed Stars)

```typescript
enum MainStar {
  THIÊN ĐỒNG = 'Thiên Đồng',
  THIÊN CƠ = 'Thiên Cơ',
  THIÊN LƯƠNG = 'Thiên Lương',
  THIÊN PHỦ = 'Thiên Phủ',
  THIÊN TÍNH = 'Thiên Tín',
  THIÊN ĐỒNG_2 = 'Thiên Đồng_2',
  LIÊM_TRINH = 'Liêm Trinh',
  THIEN_DUONG = 'Thiên Đường',
  VŨ_KHÚC = 'Vũ Khúc',
  VĂN_XƯƠNG = 'Văn Xương',
  VĂN_KHOA = 'Văn Khoa',
  LIỄU_HẠNH = 'Liễu Hạnh',
  ĐÀO_HOA = 'Đào Hoa',
  HỒNG ĐÀO = 'Hồng Đào',
  THIÊN_HỶ = 'Thiên Hỷ',
  LONG_PHƯỢNG = 'Long Phượng',
  BẠCH_HỔ = 'Bạch Hổ',
  TAM_KỲ = 'Tam Kỳ',
  TỬ_VI = 'Tử Vi',
  THAM_LANG = 'Tham Lang',
  CÀN_KHÔN = 'Càn Khôn',
  XƯƠNG_KHÚC = 'Xương Khúc',
  KHUẾCH_KHÔNG = 'Khấp Khếnh',
  KHOA_BẠI = 'Khoa Bại',
  TRIỆT = 'Triệt',
  TUẦN = 'Tuần',
}
```

### 1.7. Bảng Cục (Cục Number → Element)

```typescript
// Cục số quyết định Ngũ hành Bản Mệnh
const CUC_ELEMENT_MAP: Record<number, FiveElement> = {
  1: FiveElement.MỘC, // Mộc nhị cục
  2: FiveElement.THỦY, // Thủy nhị cục
  3: FiveElement.MỘC, // Mộc tam cục
  4: FiveElement.KIM, // Kim tứ cục
  5: FiveElement.THỔ, // Thổ ngũ cục
  6: FiveElement.KIM, // Kim lục cục
  7: FiveElement.THỦY, // Thủy thất cục
  8: FiveElement.THỔ, // Thổ bát cục
  9: FiveElement.HỎA, // Hỏa cửu cục
};
```

### 1.8. Bảng Can → Ngũ Hành

```typescript
const CAN_ELEMENT_MAP: Record<HeavenlyStem, FiveElement> = {
  HeavenlyStem.GIÁP: FiveElement.MỘC,
  HeavenlyStem.ẤT: FiveElement.MỘC,
  HeavenlyStem.BÍNH: FiveElement.HỎA,
  HeavenlyStem.ĐINH: FiveElement.HỎA,
  HeavenlyStem.MẬU: FiveElement.THỔ,
  HeavenlyStem.KỶ: FiveElement.THỔ,
  HeavenlyStem.CANH: FiveElement.KIM,
  HeavenlyStem.TÂN: FiveElement.KIM,
  HeavenlyStem.NHÂM: FiveElement.THỦY,
  HeavenlyStem.QUÝ: FiveElement.THỦY,
};
```

### 1.9. Bảng Chi → Ngũ Hành

```typescript
const CHI_ELEMENT_MAP: Record<EarthlyBranch, FiveElement> = {
  EarthlyBranch.TÝ: FiveElement.THỦY,
  EarthlyBranch.SỬU: FiveElement.THỔ,
  EarthlyBranch.DẦN: FiveElement.MỘC,
  EarthlyBranch.MÃO: FiveElement.MỘC,
  EarthlyBranch.THÌN: FiveElement.THỔ,
  EarthlyBranch.TỴ: FiveElement.HỎA,
  EarthlyBranch.NGỌ: FiveElement.HỎA,
  EarthlyBranch.MÙI: FiveElement.THỔ,
  EarthlyBranch.THÂN: FiveElement.KIM,
  EarthlyBranch.TUẤT: FiveElement.THỔ,
  EarthlyBranch.DẬU: FiveElement.KIM,
  EarthlyBranch.HỢI: FiveElement.THỦY,
};
```

### 1.10. Bảng Cung → Ngũ Hành (Bản Mệnh Cung)

```typescript
// Ngũ hành tại mỗi cung theo cục
const PALACE_ELEMENT_MAP: Record<Palace, FiveElement> = {
  Palace.MỆNH: FiveElement.KIM,     // Cung Mệnh
  Palace.PHỤ_MẪU: FiveElement.THỦY,
  Palace.PHÚC_ĐỨC: FiveElement.THỦY,
  Palace.TÀI_BẠCH: FiveElement.MỘC,
  Palace.QUAN_LỘC: FiveElement.THỔ,
  Palace.NẠP_ÁI: FiveElement.HỎA,
  Palace.TẬT_ÁCH: FiveElement.THỔ,
  Palace.TÀI_QUAN: FiveElement.THỦY,
  Palace.THIÊN_DI: FiveElement.KIM,
  Palace.ĐIỀN_TRẠCH: FiveElement.MỘC,
  Palace.QUAN_LỘC_2: FiveElement.THỔ,
  Palace.BẢO_MỆNH: FiveElement.KIM,
};
```

---

## II. BẢNG TRA CỨU ĐỘ SÁNG CỦA SAO

```typescript
enum StarBrightness {
  MIẾU = "M", // Miếu - Sáng nhất
  VƯỢNG = "V", // Vượng - Sáng
  ĐẮC = "Đ", // Đắc - Tốt
  HÃM = "H", // Hãm - Mờ/ Xấu
  BÌNH = "B", // Bình - Trung bình
}
```

### 2.1. Độ Sáng của Sao Cố Định (theo Cung nhập)

```typescript
// Sao nhập cung → Độ sáng (M/V/Đ/H/B)
const STAR_BRIGHTNESS: Record<MainStar, StarBrightness> = {
  MainStar.THỦY_LƯƠNG: StarBrightness.ĐẮC,  // Thủy Lương đắc
  MainStar.VĂN_KHOA: StarBrightness.ĐẮC,
  MainStar.VĂN_XƯƠNG: StarBrightness.ĐẮC,
  MainStar.LONG_PHƯỢNG: StarBrightness.ĐẮC,
  MainStar.THAM_LANG: StarBrightness.HÃM,    // Tham Lang hãm
  MainStar.LIÊM_TRINH: StarBrightness.HÃM,
  MainStar.KHUẾCH_KHÔNG: StarBrightness.HÃM,
  MainStar.KHOA_BẠI: StarBrightness.HÃM,
  MainStar.THIÊN_ĐỒNG: StarBrightness.BÌNH,
  MainStar.THIÊN_PHỦ: StarBrightness.VƯỢNG,
  MainStar.TỬ_VI: StarBrightness.MIẾU,
  MainStar.THIÊN_CƠ: StarBrightness.BÌNH,
  MainStar.THIÊN_LƯƠNG: StarBrightness.VƯỢNG,
  MainStar.ĐÀO_HOA: StarBrightness.VƯỢNG,
  MainStar.LIỄU_HẠNH: StarBrightness.ĐẮC,
  MainStar.HỒNG_ĐÀO: StarBrightness.ĐẮC,
  MainStar.THIÊN_HỶ: StarBrightness.ĐẮC,
  // ... mở rộng thêm
};
```

---

## III. THUẬT TOÁN TÍNH ĐẠI HẠN (10 NĂM)

### 3.1. Quy Tắc Xác Định Cực

```typescript
interface NatalInfo {
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourBranch: EarthlyBranch;
  cuc: number; // 1-9 (Nhị cục → Cửu cục)
  gender: "male" | "female";
  direction: "順行" | "逆行"; // Thuận/Nghịch
}

function determineDirection(natalInfo: NatalInfo): "順行" | "逆ơ" {
  const isYangYear =
    Object.values(HeavenlyStem).indexOf(natalInfo.yearStem) % 2 === 0;
  const isMale = natalInfo.gender === "male";

  if ((isYangYear && isMale) || (!isYangYear && !isMale)) {
    return "順行"; // Dương Nam / Âm Nữ → Thuận
  } else {
    return "逆行"; // Âm Nam / Dương Nữ → Nghịch
  }
}
```

### 3.2. Thuật Toán Tính Vị Trí Đại Hạn

```typescript
// Thứ tự 12 cung theo chiều thuận
const PALACE_ORDER: Palace[] = [
  Palace.MỆNH,
  Palace.PHỤ_MẪU,
  Palace.PHÚC_ĐỨC,
  Palace.TÀI_BẠCH,
  Palace.QUAN_LỘC,
  Palace.NẠP_ÁI,
  Palace.TẬT_ÁCH,
  Palace.TÀI_QUAN,
  Palace.THIÊN_DI,
  Palace.ĐIỀN_TRẠCH,
  Palace.QUAN_LỘC_2,
  Palace.BẢO_MỆNH,
];

function calculateMajorFateCycle(
  natalInfo: NatalInfo,
  age: number, // Tuổi hiện tại muốn xem (1-99)
  targetYear: number, // Năm Dương lịch muốn xem
): FateCycleResult[] {
  const direction = determineDirection(natalInfo);
  const cuc = natalInfo.cuc; // Số cục (1-9)
  const results: FateCycleResult[] = [];

  // Điểm bắt đầu: Cung Mệnh
  const startingPalace = Palace.MỆNH;
  const startingIndex = PALACE_ORDER.indexOf(startingPalace);

  // Mỗi cung = 10 năm. Tính vị trí tuổi tương ứng trong chu kỳ 120 năm.
  const cyclePosition = (age - 1) % 120;
  const palaceIndex = Math.floor(cyclePosition / 10);
  const yearsInPalace = (cyclePosition % 10) + 1;

  // Xác định cung hiện tại
  let currentPalace: Palace;
  if (direction === "順行") {
    currentPalace = PALACE_ORDER[(startingIndex + palaceIndex) % 12];
  } else {
    currentPalace = PALACE_ORDER[(startingIndex - palaceIndex + 12) % 12];
  }

  // Cung Đại hạn chính là currentPalace
  // Ghi số cục vào cung (ví dụ: Thủy nhị cục → ghi số 2)
  results.push({
    cycleType: "ĐẠI_HẠN",
    palace: currentPalace,
    palaceElement: PALACE_ELEMENT_MAP[currentPalace],
    cucNumber: cuc,
    yearsInPalace,
    ageRange: `${age - yearsInPalace + 1} đến ${age}`,
    direction,
    yearlyBreakdown: generateYearlyBreakdown(
      currentPalace,
      direction,
      yearsInPalace,
      age,
    ),
  });

  return results;
}

interface FateCycleResult {
  cycleType: "ĐẠI_HẠN" | "TIỂU_HẠN" | "NGUYỆT_HẠN" | "NHẬT_HẠN";
  palace: Palace;
  palaceElement: FiveElement;
  // Thông tin bổ sung
  [key: string]: any;
}

function generateYearlyBreakdown(
  startPalace: Palace,
  direction: "順行" | "逆行",
  yearsRemaining: number,
  currentAge: number,
): YearlyBreakdown[] {
  const breakdown: YearlyBreakdown[] = [];
  let currentIndex = PALACE_ORDER.indexOf(startPalace);

  for (let i = 0; i < yearsRemaining; i++) {
    const yearAge = currentAge - yearsRemaining + i + 1;
    breakdown.push({
      age: yearAge,
      palace: PALACE_ORDER[currentIndex],
    });

    // Di chuyển đến cung tiếp theo
    if (direction === "順行") {
      currentIndex = (currentIndex + 1) % 12;
    } else {
      currentIndex = (currentIndex - 1 + 12) % 12;
    }
  }

  return breakdown;
}
```

---

## IV. THUẬT TOÁN TÍNH TIỂU HẠN (1 NĂM)

### 4.1. Bảng Chi Năm Sinh → Cung Khởi Hạn

```typescript
// Tuổi theo Chi → Cung khởi hạn (Tiểu hạn)
const MINOR_FATE_START: Record<string, Palace> = {
  // Tuổi Dần, Ngọ, Tuất → khởi Thìn
  [EarthlyBranch.DẦN]: Palace.THIÊN_DI, // Thìn
  [EarthlyBranch.NGỌ]: Palace.THIÊN_DI, // Thìn
  [EarthlyBranch.TUẤT]: Palace.THIÊN_DI, // Thìn
  // Tuổi Thân, Tý, Thìn → khởi Tuất
  [EarthlyBranch.THÂN]: Palace.QUAN_LỘC_2, // Tuất
  [EarthlyBranch.TÝ]: Palace.QUAN_LỘC_2, // Tuất
  [EarthlyBranch.THÌN]: Palace.QUAN_LỘC_2, // Tuất
  // Tuổi Tỵ, Dậu, Sửu → khổi Mùi
  [EarthlyBranch.TỴ]: Palace.TÀI_QUAN, // Mùi
  [EarthlyBranch.DẬU]: Palace.TÀI_QUAN, // Mùi
  [EarthlyBranch.SỬU]: Palace.TÀI_QUAN, // Mùi
  // Tuổi Hợi, Mão, Mùi → khởi Sửu
  [EarthlyBranch.HỢI]: Palace.ĐIỀN_TRẠCH, // Sửu
  [EarthlyBranch.MÃO]: Palace.ĐIỀN_TRẠCH, // Sửu
  [EarthlyBranch.MÙI]: Palace.ĐIỀN_TRẠCH, // Sửu
};
```

### 4.2. Thuật Toán Tiểu Hạn

```typescript
function calculateMinorFateCycle(
  natalInfo: NatalInfo,
  birthYear: number, // Năm sinh (Dương lịch)
  targetYear: number, // Năm muốn xem vận
  gender: "male" | "female",
): FateCycleResult {
  const yearBranch = getEarthlyBranch(birthYear);
  const startPalace = MINOR_FATE_START[yearBranch];
  const startIndex = PALACE_ORDER.indexOf(startPalace);

  // Chiều quay: Nam → thuận, Nữ → nghịch
  const direction = gender === "male" ? 1 : -1; // +1 = thuận, -1 = nghịch

  // Tính số năm trôi qua kể từ năm sinh
  const yearsElapsed = targetYear - birthYear;

  // Mỗi năm đi 1 cung
  let currentIndex = (startIndex + direction * yearsElapsed) % 12;
  if (currentIndex < 0) currentIndex += 12;

  const minorFatePalace = PALACE_ORDER[currentIndex];

  return {
    cycleType: "TIỂU_HẠN",
    palace: minorFatePalace,
    palaceElement: PALACE_ELEMENT_MAP[minorFatePalace],
    startPalace, // Cung khởi
    direction: direction === 1 ? "Thuận" : "Nghịch",
    yearsElapsed,
  };
}
```

---

## V. THUẬT TOÁN TÍNH NGUYỆT HẠN (THÁNG)

### 5.1. Quy Tắc Nguyệt Hạn

```typescript
// Nguyệt hạn: Lấy cung Tiểu hạn làm tháng Giêng
// Đếm NGHỊCH đến tháng sinh → rồi từ đó gọi là giờ Tý
// đếm THUẬN đến giờ sinh để tìm cung thực sự của tháng Giêng

function calculateMonthFateCycle(
  minorFatePalace: Palace, // Cung Tiểu hạn
  birthMonth: number, // Tháng sinh (1-12)
  birthHour: EarthlyBranch, // Chi giờ sinh
  targetMonth: number, // Tháng muốn xem (1-12)
): FateCycleResult {
  const startIndex = PALACE_ORDER.indexOf(minorFatePalace);

  // Bước 1: Đếm NGHỊCH từ cung Tiểu hạn (tháng Giêng) đến tháng sinh
  // Chiều nghịch: MỆNH → BẢO_MỆNH → QUAN_LỘC_2 → ... → MỆNH
  const monthsToBirth = (birthMonth - 1) % 12;
  let adjustedStartIndex = (startIndex - monthsToBirth + 12) % 12;

  // Bước 2: Từ cung đã điều chỉnh, đếm THUẬN theo giờ sinh
  // Từ giờ Tý → giờ sinh
  const HOUR_ORDER: EarthlyBranch[] = [
    EarthlyBranch.TÝ,
    EarthlyBranch.SỬU,
    EarthlyBranch.DẦN,
    EarthlyBranch.MÃO,
    EarthlyBranch.THÌN,
    EarthlyBranch.TỴ,
    EarthlyBranch.NGỌ,
    EarthlyBranch.MÙI,
    EarthlyBranch.THÂN,
    EarthlyBranch.TUẤT,
    EarthlyBranch.DẬU,
    EarthlyBranch.HỢI,
  ];
  const hourOffset = HOUR_ORDER.indexOf(birthHour);
  const finalStartIndex = (adjustedStartIndex + hourOffset) % 12;

  // Bước 3: Tháng muốn xem → cung tương ứng
  const monthOffset = (targetMonth - 1) % 12;
  const targetIndex = (finalStartIndex + monthOffset) % 12;

  return {
    cycleType: "NGUYỆT_HẠN",
    palace: PALACE_ORDER[targetIndex],
    palaceElement: PALACE_ELEMENT_MAP[PALACE_ORDER[targetIndex]],
    startPalace: PALACE_ORDER[finalStartIndex], // Cung thực sự của tháng Giêng
  };
}
```

---

## VI. THUẬT TOÁN TÍNH NHẬT HẠN (NGÀY)

### 6.1. Quy Tắc Nhật Hạn

```typescript
// Nhật hạn: Lấy cung Nguyệt hạn làm mồng 1, đếm THUẬN mỗi cung một ngày

function calculateDayFateCycle(
  monthFatePalace: Palace, // Cung Nguyệt hạn
  targetDay: number, // Ngày trong tháng (1-30)
  birthDayBranch: EarthlyBranch, // Chi của ngày sinh (Dương lịch → đổi sang Can Chi)
): FateCycleResult {
  const startIndex = PALACE_ORDER.indexOf(monthFatePalace);
  const dayOffset = (targetDay - 1) % 30;

  // Đếm thuận mỗi cung một ngày
  const targetIndex = (startIndex + dayOffset) % 12;

  return {
    cycleType: "NHẬT_HẠN",
    palace: PALACE_ORDER[targetIndex],
    palaceElement: PALACE_ELEMENT_MAP[PALACE_ORDER[targetIndex]],
  };
}
```

---

## VII. HỆ THỐNG SAO LƯU (CỬU PHI TINH)

### 7.1. Thuật Toán Sao Lưu

```typescript
// Các hàm tính vị trí 9 sao lưu theo năm xem hạn

interface MovingStarsResult {
  [MovingStar.LƯU_THÁI_TUẾ]: Palace;
  [MovingStar.LƯU_TANG_MÔN]: Palace;
  [MovingStar.LƯU_BẠCH_HỔ]: Palace;
  [MovingStar.LƯU_LỘC_TỒN]: Palace;
  [MovingStar.LƯU_KÌNH_DƯƠNG]: Palace;
  [MovingStar.LƯU_ĐÀ_LA]: Palace;
  [MovingStar.LƯU_THIÊN_MÃ]: Palace;
  [MovingStar.LƯU_KHỐC]: Palace;
  [MovingStar.LƯU_HƯ]: Palace;
}

function calculateMovingStars(
  targetYearBranch: EarthlyBranch,
): MovingStarsResult {
  // ─────────────────────────────────────────
  // 1. LƯU THÁI TUẾ: Đóng đúng cung có tên Chi của năm xem hạn
  //    Ví dụ: Năm Tuất → cung Tuất; Năm Thân → cung Thân
  // ─────────────────────────────────────────
  const liuThaiTuePalace = palaceMatchingChi(targetYearBranch);

  // ─────────────────────────────────────────
  // 2. LƯU TANG MÔN & BẠCH HỔ: Đi theo Lưu Thái Tuế (kề sau 1 cung)
  //    Tang Môn đi thuận, Bạch Hổ đi nghịch
  // ─────────────────────────────────────────
  const tangMonPalace = moveByDirection(liuThaiTuePalace, 1, "顺行");
  const bachHoPalace = moveByDirection(liuThaiTuePalace, 1, "逆行");

  // ─────────────────────────────────────────
  // 3. LƯU LỘC TỒN, KÌNH DƯƠNG, ĐÀ LA: Theo hàng CAN của năm xem hạn
  //    Bảng CAN → vị trí (thứ tự Can: Giáp=1, Ất=2, Bính=3, ...)
  // ─────────────────────────────────────────
  const canIndex = Object.values(HeavenlyStem).indexOf(
    getStemOfYear(targetYearBranch),
  );
  const locTonPalace = PALACE_ORDER[canIndex % 12];
  const kinhDuongPalace = PALACE_ORDER[(canIndex + 6) % 12]; // Đối xứng
  const daLaPalace = PALACE_ORDER[(canIndex + 8) % 12]; // Kề đối xứng

  // ─────────────────────────────────────────
  // 4. LƯU THIÊN MÃ: Theo Chi của năm (Dần-Ngọ-Tuất → Thân...)
  //    Thìn-Mão-Dần → Mão
  //    Tỵ-Ngọ-Mùi → Mùi
  //    Thân-Tuất-Dậu → Tuất
  //    Hợi-Tý-Sửu → Sửu
  // ─────────────────────────────────────────
  const thienMaPalace = calculateThienMa(targetYearBranch);

  // ─────────────────────────────────────────
  // 5. LƯU KHỐC & LƯU HƯ: Khởi từ Ngọ, đếm đến năm hạn
  //    Hư: đếm thuận từ Ngọ
  //    Khốc: đếm nghịch từ Ngọ
  // ─────────────────────────────────────────
  const ngoIndex = PALACE_ORDER.indexOf(Palace.THIÊN_DI); // Thìn = Ngọ trong thập nhị
  const yearIndex = PALACE_ORDER.indexOf(palaceMatchingChi(targetYearBranch));
  const yearsFromNgo = (yearIndex - ngoIndex + 12) % 12;

  const luuHuPalace = PALACE_ORDER[(ngoIndex + yearsFromNgo) % 12]; // Thuận
  const luuKhocPalace = PALACE_ORDER[(ngoIndex - yearsFromNgo + 12) % 12]; // Nghịch

  return {
    [MovingStar.LƯU_THÁI_TUẾ]: liuThaiTuePalace,
    [MovingStar.LƯU_TANG_MÔN]: tangMonPalace,
    [MovingStar.LƯU_BẠCH_HỔ]: bachHoPalace,
    [MovingStar.LƯU_LỘC_TỒN]: locTonPalace,
    [MovingStar.LƯU_KÌNH_DƯƠNG]: kinhDuongPalace,
    [MovingStar.LƯU_ĐÀ_LA]: daLaPalace,
    [MovingStar.LƯU_THIÊN_MÃ]: thienMaPalace,
    [MovingStar.LƯU_KHỐC]: luuKhocPalace,
    [MovingStar.LƯU_HƯ]: luuHuPalace,
  };
}

// ─────────────────────────────────────────
// Helper: Tìm cung trùng với Chi
// ─────────────────────────────────────────
function palaceMatchingChi(branch: EarthlyBranch): Palace {
  // Cung 12 trên địa bàn tương ứng với 12 Chi
  const PALACE_CHI_MAP: Record<EarthlyBranch, Palace> = {
    [EarthlyBranch.TÝ]: Palace.TẬT_ÁCH, // Tý ở Tật Ách
    [EarthlyBranch.SỬU]: Palace.TÀI_QUAN, // Sửu ở Tài Quan
    [EarthlyBranch.DẦN]: Palace.MỆNH, // Dần ở Mệnh
    [EarthlyBranch.MÃO]: Palace.PHỤ_MẪU, // Mão ở Phụ Mẫu
    [EarthlyBranch.THÌN]: Palace.PHÚC_ĐỨC, // Thìn ở Phúc Đức
    [EarthlyBranch.TỴ]: Palace.TÀI_BẠCH, // Tỵ ở Tài Bạch
    [EarthlyBranch.NGỌ]: Palace.QUAN_LỘC, // Ngọ ở Quan Lộc
    [EarthlyBranch.MÙI]: Palace.NẠP_ÁI, // Mùi ở Nạp Ái
    [EarthlyBranch.THÂN]: Palace.THIÊN_DI, // Thân ở Thiên Di
    [EarthlyBranch.TUẤT]: Palace.ĐIỀN_TRẠCH, // Tuất ở Điền Trạch
    [EarthlyBranch.DẬU]: Palace.QUAN_LỘC_2, // Dậu ở Quan Lộc 2
    [EarthlyBranch.HỢI]: Palace.BẢO_MỆNH, // Hợi ở Bảo Mệnh
  };
  return PALACE_CHI_MAP[branch];
}

// ─────────────────────────────────────────
// Helper: Di chuyển cung theo hướng
// ─────────────────────────────────────────
function moveByDirection(
  palace: Palace,
  steps: number,
  direction: "顺行" | "逆行",
): Palace {
  const index = PALACE_ORDER.indexOf(palace);
  const newIndex =
    direction === "顺行" ? (index + steps) % 12 : (index - steps + 12) % 12;
  return PALACE_ORDER[newIndex];
}

// ─────────────────────────────────────────
// Helper: Tính Lưu Thiên Mã theo Chi năm
// ─────────────────────────────────────────
function calculateThienMa(yearBranch: EarthlyBranch): Palace {
  const THIEN_MA_MAP: Record<string, Palace> = {
    [EarthlyBranch.DẦN]: Palace.THIÊN_DI, // Thân (Dần-Ngọ-Tuất-Thân: Mã lưu ở Thân)
    [EarthlyBranch.NGỌ]: Palace.THIÊN_DI, // Thân
    [EarthlyBranch.TUẤT]: Palace.THIÊN_DI, // Thân
    [EarthlyBranch.THÂN]: Palace.TÀI_QUAN, // Tuất (Thân-Tuất-Dậu-Hợi: Mã lưu ở Hợi)
    [EarthlyBranch.THÌN]: Palace.PHỤ_MẪU, // Mão (Thìn-Tỵ-Mùi-Dần: Mã lưu ở Dần)
    [EarthlyBranch.TỴ]: Palace.MỆNH, // Dần
    [EarthlyBranch.MÙI]: Palace.TẬT_ÁCH, // Dần
    [EarthlyBranch.TÝ]: Palace.BẢO_MỆNH, // Sửu (Tý-Sửu-Hợi-Mão: Mã lưu ở Mão)
    [EarthlyBranch.SỬU]: Palace.PHỤ_MẪU, // Mão
    [EarthlyBranch.HỢI]: Palace.PHỤ_MẪU, // Mão
    [EarthlyBranch.DẬU]: Palace.QUAN_LỘC_2, // Hợi (Dậu-Tuất-Hợi-Tý: Mã lưu ở Tý)
    // Tuất đã cover ở trên
  };
  return THIEN_MA_MAP[yearBranch] || Palace.MỆNH;
}
```

---

## VIII. LOGIC ĐÁNH GIÁ VÀ LUẬN GIẢI (EVALUATION ENGINE)

### 8.1. Bảng Tương Quan Ngũ Hành (Sinh – Khắc)

```typescript
// Ngũ hành tương sinh: Thủy → Mộc → Hỏa → Thổ → Kim → Thủy
const GENERATING_CYCLE: Record<FiveElement, FiveElement[]> = {
  [FiveElement.THỦY]: [FiveElement.MỘC],
  [FiveElement.MỘC]: [FiveElement.HỎA],
  [FiveElement.HỎA]: [FiveElement.THỔ],
  [FiveElement.THỔ]: [FiveElement.KIM],
  [FiveElement.KIM]: [FiveElement.THỦY],
};

// Ngũ hành tương khắc: Kim → Mộc → Thổ → Thủy → Hỏa → Kim
const CONTROLLING_CYCLE: Record<FiveElement, FiveElement[]> = {
  [FiveElement.KIM]: [FiveElement.MỘC],
  [FiveElement.MỘC]: [FiveElement.THỔ],
  [FiveElement.THỔ]: [FiveElement.THỦY],
  [FiveElement.THỦY]: [FiveElement.HỎA],
  [FiveElement.HỎA]: [FiveElement.KIM],
};

type Relation = "相生" | "相克" | "比和" | "同宮";

function getElementRelation(
  element1: FiveElement,
  element2: FiveElement,
): Relation {
  if (element1 === element2) return "同宮"; // Bình nhau

  const isGenerating = GENERATING_CYCLE[element1].includes(element2);
  const isControlled = CONTROLLING_CYCLE[element1].includes(element2);

  if (isGenerating) return "相生"; // Sinh
  if (isControlled) return "相克"; // Khắc
  return "同宮"; // Còn lại là bình
}
```

### 8.2. Hàm Scoring – Tính Điểm Mỗi Cung Hạn

```typescript
interface FateScore {
  palace: Palace;
  score: number; // Tổng điểm (-100 đến +100)
  wuxingBonus: number; // Điểm ngũ hành
  starBonus: number; // Điểm sao
  trapBonus: number; // Điểm cục
  warnings: string[]; // Cảnh báo
  predictions: string[]; // Luận giải
  fortuneLevel: "大吉" | "吉" | "平" | "凶" | "大凶"; // Mức độ may rủi
}

function scoreFatePalace(
  fatePalace: Palace,
  fatePalaceElement: FiveElement,
  menhElement: FiveElement,
  starsInPalace: MainStar[],
  movingStarsInPalace: MovingStar[],
  trapStars: MainStar[], // Tuần, Triệt
  isOverlapping: boolean, // Trùng phùng (Đại + Tiểu cùng cung)
  hasKhoaQuyen: boolean, // Có Khoa Quyền Lộc
  hasSatThan: boolean, // Có sát tinh
): FateScore {
  let score = 0;
  const warnings: string[] = [];
  const predictions: string[] = [];

  // ─────────────────────────────────────────
  // 1. ĐIỂM NGŨ HÀNH (权重: ±30)
  // ─────────────────────────────────────────
  const relation = getElementRelation(menhElement, fatePalaceElement);
  const wuxingBonus = {
    相生: 20, // Mệnh sinh cung hạn → tốt
    相克: -20, // Mệnh khắc cung hạn → xấu
    同宮: 5, // Cùng hành → bình
  }[relation];
  score += wuxingBonus;

  // ─────────────────────────────────────────
  // 2. ĐIỂM SAO CỐ ĐỊNH (权重: ±40)
  // ─────────────────────────────────────────
  let starBonus = 0;
  for (const star of starsInPalace) {
    const brightness = STAR_BRIGHTNESS[star];
    starBonus += {
      [StarBrightness.MIẾU]: 10,
      [StarBrightness.VƯỢNG]: 8,
      [StarBrightness.ĐẮC]: 5,
      [StarBrightness.BÌNH]: 0,
      [StarBrightness.HÃM]: -8,
    }[brightness];
  }
  score += starBonus;

  // ─────────────────────────────────────────
  // 3. ĐIỂM SAO LƯU (权重: ±20)
  // ─────────────────────────────────────────
  let movingBonus = 0;
  for (const star of movingStarsInPalace) {
    switch (star) {
      case MovingStar.LƯU_LỘC_TỒN:
        movingBonus += 10;
        break;
      case MovingStar.LƯU_THIÊN_MÃ:
        movingBonus += 5;
        break;
      case MovingStar.LƯU_KÌNH_DƯƠNG:
        movingBonus += hasKhoaQuyen ? 8 : -5;
        break;
      case MovingStar.LƯU_ĐÀ_LA:
        movingBonus += -3;
        break;
      case MovingStar.LƯU_TANG_MÔN:
        movingBonus += -5;
        break;
      case MovingStar.LƯU_BẠCH_HỔ:
        movingBonus += -5;
        break;
      case MovingStar.LƯU_KHỐC:
        movingBonus += -8;
        break;
      case MovingStar.LƯU_HƯ:
        movingBonus += -4;
        break;
    }
  }
  score += movingBonus;

  // ─────────────────────────────────────────
  // 4. ĐIỂM TUẦN TRIỆT GIẢI CỨU
  // ─────────────────────────────────────────
  const hasRescue =
    trapStars.includes(MainStar.TUẦN) || trapStars.includes(MainStar.TRIỆT);
  if (hasRescue) {
    const hasHamStar = starsInPalace.some(
      (s) => STAR_BRIGHTNESS[s] === StarBrightness.HÃM,
    );
    if (hasHamStar) {
      score += 10; // Tuần/Triệt giải sao hãm → +10
    }
  }

  // ─────────────────────────────────────────
  // 5. ĐIỂM TRÙNG PHÙNG (权重: ±15)
  // ─────────────────────────────────────────
  if (isOverlapping) {
    if (hasSatThan) {
      score -= 15; // Trùng phùng + sát tinh → đại hạn nặng
      warnings.push(
        "⚠️ ĐẠI HẠN TRÙNG PHÙNG với SÁT TINH - Cần đặc biệt thận trọng!",
      );
    } else {
      score += 15; // Trùng phùng không sát → đại hạn tốt
      predictions.push(
        "✨ Vận hạn TRÙNG PHÙNG - Cơ hội bùng nổ, thành công vượt bậc.",
      );
    }
  }

  // ─────────────────────────────────────────
  // 6. CẢNH BÁO SÁT TINH TỰ ĐỘNG
  // ─────────────────────────────────────────
  const SAT_STARS = [
    MovingStar.LƯU_KHỐC,
    MovingStar.LƯU_HƯ,
    MovingStar.LƯU_KÌNH_DƯƠNG,
    MovingStar.LƯU_ĐÀ_LA,
    MainStar.KHUẾCH_KHÔNG,
    MainStar.KHOA_BẠI,
  ];
  const satCount = movingStarsInPalace.filter((s) =>
    SAT_STARS.includes(s as any),
  ).length;
  if (satCount >= 3) {
    warnings.push(`🚨 Cảnh báo: ${satCount} sát tinh lưu động tại cung hạn!`);
    score -= satCount * 5;
  }

  // ─────────────────────────────────────────
  // 7. XÁC ĐỊNH MỨC ĐỘ
  // ─────────────────────────────────────────
  let fortuneLevel: FateScore["fortuneLevel"];
  if (score >= 50) fortuneLevel = "大吉";
  else if (score >= 20) fortuneLevel = "吉";
  else if (score >= -20) fortuneLevel = "平";
  else if (score >= -50) fortuneLevel = "凶";
  else fortuneLevel = "大凶";

  return {
    palace: fatePalace,
    score,
    wuxingBonus,
    starBonus,
    trapBonus: 0,
    warnings,
    predictions,
    fortuneLevel,
  };
}
```

### 8.3. Bảng Giải Mã Bộ Sao Khi Nhập Hạn

```typescript
// Bảng sao → ý nghĩa khi nhập cung hạn
const STAR_INTERPRETATION: Record<
  MainStar,
  {
    miếu: string; // Khi ở M (Miếu)
    vượng: string; // Khi ở V (Vượng)
    đắc: string; // Khi ở Đ (Đắc)
    hãm: string; // Khi ở H (Hãm)
    hạn_tốt: string; // Luận giải khi nhập hạn tốt
    hạn_xấu: string; // Luận giải khi nhập hạn xấu
  }
> = {
  [MainStar.TỬ_VI]: {
    miếu: "Chủ nhân trí tuệ, quyền uy, địa vị cao.",
    vượng: "Có tài lãnh đạo, được quý nhân phù trợ.",
    đắc: "Công danh thuận lợi, học hành đỗ đạt.",
    hãm: "Dễ bị hãm hại, mất uy tín, tai bay vạ gió.",
    hạn_tốt:
      "Tử Vi nhập hạn (M): Đại hung hóa cát, chủ về hưng vượng, thăng tiến, gặp quý nhân, thành công vượt bậc trong sự nghiệp. Năm này là năm bùng nổ về danh và tài.",
    hạn_xấu:
      "Tử Vi nhập hạn (H): Năm nhiều biến cố, khó khăn chồng chất, cần thận trọng trong mọi quyết định, tránh đầu tư lớn.",
  },
  [MainStar.THIÊN_PHỦ]: {
    miếu: "Chủ tài lộc, vinh hoa, phú quý.",
    vượng: "Tài lộc tăng, có lộc về bất động sản.",
    đắc: "Thu nhập ổn định, tiết kiệm được tiền.",
    hãm: "Tài hao, mất tiền bất ngờ, kiện tụng.",
    hạn_tốt:
      "Thiên Phủ nhập hạn (V/M): Chủ về tài lộc, của cải ùa đến, đặc biệt tốt cho đầu tư, kinh doanh, mua bán bất động sản.",
    hạn_xấu:
      "Thiên Phủ nhập hạn (H): Tài hao, mất của, dễ bị lừa đảo, đầu tư thua lỗ. Cần thận trọng với tiền bạc.",
  },
  [MainStar.LIÊM_TRINH]: {
    miếu: "Chủ sắc dục, ghen tuông, tranh cãi.",
    vượng: "Có sức quyến rũ, giao tiếp tốt.",
    đắc: "Nổi bật trong nghệ thuật, giải trí.",
    hãm: "Dâm ô, bệnh tật, kiện tụng, tù tội.",
    hạn_tốt:
      "Liêm Trinh nhập hạn (V): Năm có sức hút, giao tiếp rộng, được chú ý. Thuận lợi cho nghệ thuật, truyền thông, giải trí.",
    hạn_xấu:
      "Liêm Trinh nhập hạn (H): Năm xung đột, kiện tụng, bệnh tật nhất là tiết hóa. Cần tránh tranh cãi, giữ sức khỏe.",
  },
  [MainStar.THAM_LANG]: {
    miếu: "Chủ quyền lực, bạo dạn, mạnh mẽ.",
    vượng: "Có ý chí phi thường, dám nghĩ dám làm.",
    đắc: "Có sức mạnh tinh thần, kiên trì.",
    hãm: "Hung tính, bạo lực, nghiện rượu, tù tội.",
    hạn_tốt:
      "Tham Lang nhập hạn (V): Có ý chí phi thường, dám đột phá, thành công trong các dự án táo bạo. Thuận lợi cho khởi nghiệp.",
    hạn_xấu:
      "Tham Lang nhập hạn (H): Hung tính nổi lên, dễ xung đột, nghiện rượu, cờ bạc, bệnh nặng. Cần kiềm chế, tránh quyết định liều lĩnh.",
  },
  [MainStar.CÀN_KHÔN]: {
    miếu: "Chủ trí tuệ, sáng tạo, quyền năng.",
    vượng: "Tư duy sắc bén, sáng tạo vượt trội.",
    đắc: "Có năng lực lãnh đạo, trí tuệ.",
    hãm: "Tâm thần bất ổn, hoang tưởng, tự cao.",
    hạn_tốt:
      "Càn Khôn nhập hạn (V/M): Trí tuệ bùng nổ, sáng tạo vượt bậc, thuận lợi cho học tập, nghiên cứu, sáng tác.",
    hạn_xấu:
      "Càn Khôn nhập hạn (H): Tư duy rối loạn, hoang tưởng, tự cao. Cần giữ cái đầu lạnh, tránh quyết định thiếu cân nhắc.",
  },
  [MainStar.ĐÀO_HOA]: {
    miếu: "Chủ tình duyên, hôn nhân, duyên phận.",
    vượng: "Gặp duyên lành, hạnh phúc gia đình.",
    đắc: "Tình cảm thuận lợi, kết duyên tốt đẹp.",
    hãm: "Tan tác, ngoại tình, scandal.",
    hạn_tốt:
      "Đào Hoa nhập hạn (V/Đ): Năm gặp duyên lành, hạnh phúc, hôn nhân thuận lợi. Độc thân gặp ý trung nhân.",
    hạn_xấu:
      "Đào Hoa nhập hạn (H): Tình duyên lậu lạc, tan tác, ngoại tình, scandal. Cần thận trọng trong các mối quan hệ.",
  },
  [MainStar.VĂN_KHOA]: {
    miếu: "Chủ khoa danh, học vấn, danh tiếng.",
    vượng: "Học giỏi, đỗ đạt, được khen ngợi.",
    đắc: "Có tiếng tăm, được nể trọng.",
    hãm: "Học hành trì trệ, mất danh.",
    hạn_tốt:
      "Văn Khoa nhập hạn (Đ): Thuận lợi cho thi cử, học hành, nghiên cứu. Đỗ đạt, được thăng tiến trong chính quyền.",
    hạn_xấu:
      "Văn Khoa nhập hạn (H): Học hành trì trệ, thi cử không đỗ, mất danh. Cần nỗ lực gấp đôi.",
  },
  [MainStar.LONG_PHƯỢNG]: {
    miếu: "Chủ công danh, danh lợi, thăng tiến.",
    vượng: "Được hậu thuẫn, có quý nhân.",
    đắc: "Sự nghiệp thuận lợi, thăng quan.",
    hãm: "Mất danh, thất bại, bị hãm hại.",
    hạn_tốt:
      "Long Phượng nhập hạn (V/Đ): Năm đại cát về công danh, thăng tiến vượt bậc, được quý nhân phù trợ. Đặc biệt tốt cho làm quan.",
    hạn_xấu:
      "Long Phượng nhập hạn (H): Công danh chật vật, thất bại, bị hãm hại. Cần thận trọng trong quan hệ cấp trên.",
  },
  [MainStar.XƯƠNG_KHÚC]: {
    miếu: "Chủ y tế, sức khỏe, trị liệu.",
    vượng: "Sức khỏe tốt, lành bệnh.",
    đắc: "Có thể chất tốt, ít bệnh.",
    hãm: "Bệnh tật, đau ốm, tai nạn.",
    hạn_tốt:
      "Xương Khúc nhập hạn (V/Đ): Sức khỏe tốt, lành bệnh, có thể chất sung mãn. Thuận lợi cho việc chữa trị bệnh.",
    hạn_xấu:
      "Xương Khúc nhập hạn (H): Bệnh tật kéo dài, đau ốm, tai nạn. Cần chú ý sức khỏe, khám sức khỏe định kỳ.",
  },
};
```

---

## IX. CÁC "CÁCH CỤC" ĐẶC TRƯNG KHI XEM HẠN

### 9.1. Bảng Cách Cục – Sự Kiện Cụ Thể

```typescript
interface FatePattern {
  name: string; // Tên cách cục
  category:
    | "HÔN_NHÂN"
    | "SINH_CON"
    | "TAI_NẠN"
    | "CÔNG_DANH"
    | "TÀI_LỘC"
    | "SỨC_KHỎE";
  requiredStars: (MainStar | MovingStar)[]; // Sao bắt buộc có
  requiredPalace?: Palace; // Cung bắt buộc
  forbiddenStars?: (MainStar | MovingStar)[]; // Sao không được có
  description: string; // Mô tả
  severity: "CAO" | "TRUNG_BÌNH" | "THẤP"; // Mức độ nghiêm trọng
  interpretation: string; // Luận giải chi tiết
}

const FATE_PATTERNS: FatePattern[] = [
  // ─── HÔN NHÂN ───
  {
    name: "ĐÀO – HỒNG HỘI CHIẾU",
    category: "HÔN_NHÂN",
    requiredStars: [MainStar.ĐÀO_HOA, MainStar.HỒNG_ĐÀO],
    description: "Hạn gặp Đào Hoa, Hồng Đào hội chiếu tại cung hạn.",
    severity: "CAO",
    interpretation:
      "Năm có duyên lành về hôn nhân. Độc thân gặp ý trung nhân, hữu hảo sẽ tiến triển tốt đẹp. Người đã kết hôn thì tình cảm vợ chồng viên mãn, hòa hợp.",
  },
  {
    name: "HỶ – NHẬT – NGUYỆT HỘI",
    category: "HÔN_NHÂN",
    requiredStars: [
      MainStar.THIÊN_HỶ,
      MainStar.THIÊN_ĐỒNG_2,
      MainStar.THIÊN_LƯƠNG,
    ],
    description: "Hạn gặp Thiên Hỷ, Nhật, Nguyệt hội chiếu.",
    severity: "CAO",
    interpretation:
      "Năm vui cưới, hỷ sự. Đám cưới, hỏi hỏi, sinh nhật đại gia đình đều thuận lợi. Có quý nhân nâng đỡ trong gia đình.",
  },
  {
    name: "TẢ – HỮU HỘI CHIẾU",
    category: "HÔN_NHÂN",
    requiredStars: [MainStar.VĂN_XƯƠNG, MainStar.VĂN_KHOA],
    requiredPalace: Palace.QUAN_LỘC,
    description: "Hạn gặp Tả Hữu hội chiếu tại cung Quan Lộc.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "Thuận lợi cho giao tiếp, hợp tác, mở rộng quan hệ. Có thể gặp bạn bè tri kỷ, quý nhân trong công việc và cuộc sống.",
  },

  // ─── SINH CON ───
  {
    name: "THAI HỘI LONG PHƯỢNG",
    category: "SINH_CON",
    requiredStars: [MainStar.THIÊN_LƯƠNG, MainStar.LONG_PHƯỢNG],
    description:
      "Hạn gặp Thai (Thiên Lương) hội cùng Long Phượng tại cung hạn.",
    severity: "CAO",
    interpretation:
      "Năm hạnh phúc về con cái. Người chưa có con sẽ sinh con, người đã có con thì con cái khỏe mạnh, học giỏi,乖巧. Đặc biệt tốt cho nữ giới.",
  },
  {
    name: "THAI HỘI THANH LONG",
    category: "SINH_CON",
    requiredStars: [MainStar.THIÊN_LƯƠNG, MainStar.LONG_PHƯỢNG],
    description: "Hạn gặp Thai hội Thanh Long, Bạch Hổ.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "Năm có tin vui về con cái, hạnh phúc gia đình. Con cái có tiến bộ trong học tập, được khen ngợi.",
  },
  {
    name: "THAI HỘI QUAN PHÚC",
    category: "SINH_CON",
    requiredStars: [
      MainStar.THIÊN_LƯƠNG,
      MainStar.LONG_PHƯỢNG,
      MainStar.THAM_LANG,
    ],
    description: "Hạn gặp Thai hội Quan Phúc tại cung hạn.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "Năm vui về con cái, thêm người trong gia đình. Có thể là sinh con hoặc con cái đạt thành tích tốt, được thăng tiến.",
  },

  // ─── CÔNG DANH ───
  {
    name: "KHOA QUYỀN LỘC HỘI CHIẾU",
    category: "CÔNG_DANH",
    requiredStars: [
      MainStar.VĂN_KHOA,
      MainStar.LIÊM_TRINH,
      MainStar.LƯU_LỘC_TỒN,
    ],
    requiredPalace: Palace.QUAN_LỘC,
    description: "Hạn gặp Khoa, Quyền, Lộc hội chiếu tại cung Quan Lộc.",
    severity: "CAO",
    interpretation:
      "Năm đại cát về công danh. Thi cử đỗ đạt, thăng quan tiến chức, được khen thưởng, tăng lương. Đặc biệt thuận lợi cho người đi học, thi cử, làm quan.",
  },
  {
    name: "XƯƠNG KHÚC – KHÔI VIỆT HỘI",
    category: "CÔNG_DANH",
    requiredStars: [MainStar.XƯƠNG_KHÚC, MainStar.LONG_PHƯỢNG],
    description: "Hạn gặp Xương Khúc, Khôi Việt tại cung hạn.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "Thuận lợi cho học hành, thi cử, sức khỏe và công danh. Đặc biệt tốt cho trẻ em, học sinh.",
  },
  {
    name: "VĂN XƯƠNG VĂN KHOA HỘI",
    category: "CÔNG_DANH",
    requiredStars: [MainStar.VĂN_XƯƠNG, MainStar.VĂN_KHOA],
    description: "Hạn gặp Văn Xương, Văn Khoa hội tụ.",
    severity: "CAO",
    interpretation:
      "Năm cực kỳ thuận lợi cho học vấn, danh tiếng. Đỗ đạt, được công nhận, nổi tiếng trong lĩnh vực chuyên môn.",
  },

  // ─── TAI NẠN (ĐẶC BIỆT LƯU Ý) ───
  {
    name: "KÌNH ĐÀ KHÔNG KIẾP HỘI TỤ",
    category: "TAI_NẠN",
    requiredStars: [
      MovingStar.LƯU_KÌNH_DƯƠNG,
      MovingStar.LƯU_ĐÀ_LA,
      MainStar.KHUẾCH_KHÔNG,
      MainStar.KHOA_BẠI,
    ],
    description: "Bộ sát tinh Kình, Đà, Không, Kiếp hội tụ tại cung hạn.",
    severity: "CAO",
    interpretation:
      "⚠️ ĐÂY LÀ CÁCH CỤC ĐẠI SÁT – TUYỆT ĐỐI KHÔNG ĐẦU TƯ LỚN!\n" +
      "Năm nguy hiểm: có tai nạn, ốm đau nặng, thị phi, kiện tụng, tù tội.\n" +
      "Cần đặc biệt thận trọng trong việc đi lại, lái xe, đầu tư, ký kết hợp đồng.\n" +
      "Đề nghị: Hóa giải bằng cách tăng cường làm việc thiện, cầu nguyện, thỉnh bùa hộ mệnh.",
  },
  {
    name: "HÌNH KỴ TỌA MỆNH",
    category: "TAI_NẠN",
    requiredStars: [
      MainStar.LIÊM_TRINH,
      MovingStar.LƯU_KHỐC,
      MovingStar.LƯU_HƯ,
    ],
    requiredPalace: Palace.MỆNH,
    description: "Hình, Kỵ, Khốc, Hư tọa tại cung Mệnh.",
    severity: "CAO",
    interpretation:
      "⚠️ Năm nguy hiểm nhất – đại hạn về thân thể!\n" +
      "Có thể gặp tai nạn nghiêm trọng, ốm đau kéo dài, phẫu thuật.\n" +
      "Cần: Khám sức khỏe định kỳ, tránh leo trèo, các hoạt động mạo hiểm.\n" +
      "Đề nghị: Làm phúc, tích đức, thỉnh vật phẩm phong thủy hóa giải.",
  },
  {
    name: "ĐÀ LA KÌNH DƯƠNG CỰC HÌNH",
    category: "TAI_NẠN",
    requiredStars: [MovingStar.LƯU_ĐÀ_LA, MovingStar.LƯU_KÌNH_DƯƠNG],
    description: "Đà La và Kình Dương cùng nhập cung hạn.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "⚠️ Cảnh báo: Năm có xung đột mạnh, dễ bị thương, tai nạn giao thông.\n" +
      "Cần kiềm chế cảm xúc, tránh tranh cãi, không uống rượu khi lái xe.\n" +
      "Công việc có nhiều trở ngại, đối tác không thuận lợi.",
  },

  // ─── TÀI LỘC ───
  {
    name: "PHỦ TÀI QUYỀN HỘI",
    category: "TÀI_LỘC",
    requiredStars: [MainStar.THIÊN_PHỦ, MainStar.TÀI_BẠCH, MainStar.LIÊM_TRINH],
    requiredPalace: Palace.TÀI_BẠCH,
    description: "Thiên Phủ, Tài Bạch, Liêm Trinh hội tụ tại cung Tài Bạch.",
    severity: "CAO",
    interpretation:
      "Năm đại phú! Tài lộc ùa đến từ nhiều nguồn: đầu tư sinh lời, kinh doanh thuận lợi, được thưởng, được cho, được mừng.",
  },
  {
    name: "LỘC TỒN NHẬP TÀI",
    category: "TÀI_LỘC",
    requiredStars: [MovingStar.LƯU_LỘC_TỒN],
    requiredPalace: Palace.TÀI_BẠCH,
    description: "Lưu Lộc Tồn nhập cung Tài Bạch.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "Năm có lộc về tài chính. Đầu tư có lãi, công việc có thu nhập bất ngờ. Thuận lợi cho mua sắm, đầu tư nhỏ.",
  },

  // ─── SỨC KHỎE ───
  {
    name: "XƯƠNG KHÚC GIÁ ĐỖ",
    category: "SỨC_KHỎE",
    requiredStars: [MainStar.XƯƠNG_KHÚC, MainStar.VĂN_KHOA],
    requiredPalace: Palace.TẬT_ÁCH,
    description: "Xương Khúc nhập cung Tật Ách, được Văn Khoa chiếu.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "Sức khỏe ổn định, bệnh tật chuyển biến tốt. Thuận lợi cho việc khám chữa bệnh, phẫu thuật.",
  },
  {
    name: "BẠCH HỔ TANG MÔN",
    category: "SỨC_KHỎE",
    requiredStars: [MovingStar.LƯU_BẠCH_HỔ, MovingStar.LƯU_TANG_MÔN],
    requiredPalace: Palace.TẬT_ÁCH,
    description: "Lưu Bạch Hổ và Lưu Tang Môn nhập cung Tật Ách.",
    severity: "TRUNG_BÌNH",
    interpretation:
      "⚠️ Cảnh báo: Năm dễ bị bệnh tật, tai nạn, hoặc có tang trong gia đình.\n" +
      "Cần chú ý sức khỏe, đặc biệt là người lớn tuổi. Nên đi khám sức khỏe định kỳ.",
  },
];
```

### 9.2. Thuật Toán Detect Cách Cục

```typescript
function detectFatePatterns(
  palace: Palace,
  starsInPalace: (MainStar | MovingStar)[],
  fateCycleResult: FateCycleResult,
): FatePattern[] {
  const detected: FatePattern[] = [];

  for (const pattern of FATE_PATTERNS) {
    // Kiểm tra cung bắt buộc
    if (pattern.requiredPalace && pattern.requiredPalace !== palace) {
      continue;
    }

    // Kiểm tra tất cả sao bắt buộc đều có mặt
    const allStarsPresent = pattern.requiredStars.every((requiredStar) =>
      starsInPalace.includes(requiredStar),
    );

    // Kiểm tra không có sao cấm (nếu có thì pattern không khớp)
    if (pattern.forbiddenStars) {
      const hasForbidden = pattern.forbiddenStars.some((forbidden) =>
        starsInPalace.includes(forbidden),
      );
      if (hasForbidden) continue;
    }

    if (allStarsPresent) {
      detected.push(pattern);
    }
  }

  return detected;
}
```

---

## X. THUẬT TOÁN CHÍNH – TÍNH TOÀN DIỆN VẬN HẠN

### 10.1. Input/Output

```typescript
interface FateInput {
  birthYear: number; // Năm sinh Dương lịch (VD: 1990)
  birthMonth: number; // Tháng sinh (1-12)
  birthDay: number; // Ngày sinh Dương lịch (1-31)
  birthHour: number; // Giờ sinh (1-12 hoặc 0-23)
  gender: "male" | "female"; // Giới tính
  // Thông tin Can Chi (cần tính từ ngày sinh Dương lịch hoặc input trực tiếp)
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourBranch: EarthlyBranch;
  // Cung Mệnh và các cung đã an
  palaces: Record<Palace, { stars: MainStar[]; elements: FiveElement }>;
  cuc: number; // Số cục (1-9)
  // Năm muốn xem hạn
  targetYear: number;
  targetMonth?: number; // Mặc định = tháng hiện tại
  targetDay?: number; // Mặc định = ngày hiện tại
}

interface FateOutput {
  birthInfo: {
    yearStem: HeavenlyStem;
    yearBranch: EarthlyBranch;
    menhElement: FiveElement;
    direction: "Thuận" | "Nghịch";
    cuc: number;
  };
  targetYear: number;
  age: number;

  majorFate: FateCycleResult;
  minorFate: FateCycleResult;
  monthFate: FateCycleResult;
  dayFate: FateCycleResult;

  movingStars: MovingStarsResult;

  score: FateScore;

  fatePatterns: FatePattern[];

  interpretation: {
    summary: string; // Tổng quan vận hạn năm
    majorFateInterpretation: string; // Luận giải Đại hạn
    minorFateInterpretation: string; // Luận giải Tiểu hạn
    warnings: string[]; // Các cảnh báo
    recommendations: string[]; // Lời khuyên (đầu tư, sức khỏe, tình cảm...)
  };
}
```

### 10.2. Hàm Chính

```typescript
function calculateFate(input: FateInput): FateOutput {
  const {
    birthYear, birthMonth, birthDay, birthHour,
    gender, yearStem, yearBranch,
    monthStem, monthBranch, dayStem, dayBranch, hourBranch,
    palaces, cuc, targetYear,
    targetMonth, targetDay,
  } = input;

  const age = targetYear - birthYear;
  const natalInfo: NatalInfo = { yearStem, yearBranch, monthStem, monthBranch,
                                  dayStem, dayBranch, hourBranch, cuc, gender,
                                  direction: determineDirection({...}) };

  // ─── Bước 1: Tính 4 cấp độ hạn ───
  const majorFate = calculateMajorFateCycle(natalInfo, age, targetYear);
  const minorFate = calculateMinorFateCycle(natalInfo, birthYear, targetYear, gender);
  const monthFate = calculateMonthFateCycle(
    minorFate.palace,
    birthMonth,
    hourBranch,
    targetMonth ?? new Date().getMonth() + 1
  );
  const dayFate = calculateDayFateCycle(
    monthFate.palace,
    targetDay ?? new Date().getDate(),
    dayBranch
  );

  // ─── Bước 2: Tính 9 sao lưu theo năm xem hạn ───
  const targetYearBranch = getYearBranch(targetYear); // Cần hàm chuyển đổi Dương lịch → Can Chi
  const movingStars = calculateMovingStars(targetYearBranch);

  // ─── Bước 3: Thu thập sao tại mỗi cung hạn ───
  const majorFateStars = palaces[majorFate.palace].stars;
  const minorFateStars = palaces[minorFate.palace].stars;

  // Sao lưu nhập cung nào
  const movingStarsInMajorFate = Object.entries(movingStars)
    .filter(([_, palace]) => palace === majorFate.palace)
    .map(([star]) => star as MovingStar);
  const movingStarsInMinorFate = Object.entries(movingStars)
    .filter(([_, palace]) => palace === minorFate.palace)
    .map(([star]) => star as MovingStar);

  // ─── Bước 4: Tính điểm và luận giải ───
  const menhElement = CUC_ELEMENT_MAP[cuc];

  // Đánh giá Đại hạn
  const majorScore = scoreFatePalace(
    majorFate.palace,
    majorFate.palaceElement,
    menhElement,
    majorFateStars,
    movingStarsInMajorFate,
    [MainStar.TUẦN, MainStar.TRIỆT], // Kiểm tra có Tuần/Triệt
    false, // isOverlapping - kiểm tra bên dưới
    false, // hasKhoaQuyen
    false  // hasSatThan
  );

  // Đánh giá Tiểu hạn
  const minorScore = scoreFatePalace(
    minorFate.palace,
    minorFate.palaceElement,
    menhElement,
    minorFateStars,
    movingStarsInMinorFate,
    [MainStar.TUẦN, MainStar.TRIỆT],
    false,
    false,
    false
  );

  // ─── Bước 5: Kiểm tra Trùng Phùng ───
  const isOverlapping = majorFate.palace === minorFate.palace;
  if (isOverlapping) {
    // Tính lại với trùng phùng
    majorScore.score += 15;
    majorScore.predictions.push(
      `🔄 ĐẠI HẠN & TIỂU HẠN TRÙNG PHÙNG tại cung ${majorFate.palace}! ` +
      `Tính chất cung hạn được NHÂN ĐÔI.`
    );
    // Kiểm tra sát tinh
    const hasSatThan = movingStarsInMajorFate.some(s =>
      [MovingStar.LƯU_KHỐC, MovingStar.LƯU_HƯ, MovingStar.LƯU_KÌNH_DƯƠNG].includes(s)
    );
    if (hasSatThan) {
      majorScore.warnings.push(
        '⚠️ TRÙNG PHÙNG ĐẠI SÁT! Đại hạn TRẦM TRỌNG - Cần hóa giải ngay!'
      );
      majorScore.score -= 30;
    }
  }

  // ─── Bước 6: Detect các cách cục đặc biệt ───
  const majorPatterns = detectFatePatterns(majorFate.palace, [
    ...majorFateStars, ...movingStarsInMajorFate
  ], majorFate);
  const minorPatterns = detectFatePatterns(minorFate.palace, [
    ...minorFateStars, ...movingStarsInMinorFate
  ], minorFate);

  // ─── Bước 7: Tạo tổng hợp luận giải ───
  const interpretation = generateInterpretation(
    majorScore, minorScore,
    majorPatterns, minorPatterns,
    isOverlapping, age
  );

  return {
    birthInfo: {
      yearStem, yearBranch,
      menhElement,
      direction: determineDirection(natalInfo) === '順行' ? 'Thuận' : 'Nghịch',
      cuc,
    },
    targetYear,
    age,
    majorFate,
    minorFate,
    monthFate,
    dayFate,
    movingStars,
    score: majorScore,
    fatePatterns: [...majorPatterns, ...minorPatterns],
    interpretation,
  };
}
```

---

## XI. HÀM TỔNG HỢP LUẬN GIẢI

```typescript
function generateInterpretation(
  majorScore: FateScore,
  minorScore: FateScore,
  majorPatterns: FatePattern[],
  minorPatterns: FatePattern[],
  isOverlapping: boolean,
  age: number,
): FateOutput["interpretation"] {
  const warnings: string[] = [...majorScore.warnings, ...minorScore.warnings];
  const recommendations: string[] = [];

  // ─── Mức độ tổng quát ───
  const level = majorScore.fortuneLevel;
  const levelText = {
    大吉: "ĐẠI CÁT – Năm TỐT NHẤT trong chu kỳ",
    吉: "CÁT – Năm thuận lợi, nhiều cơ hội",
    平: "BÌNH – Năm trung bình, cố gắng sẽ có kết quả",
    凶: "Hung – Năm nhiều thử thách, cần thận trọng",
    大凶: "ĐẠI HUNG – Năm gian nan nhất, cần hóa giải",
  }[level];

  const summary =
    `Năm ${isOverlapping ? "TRÙNG PHÙNG – " : ""}${levelText}. ` +
    `Đại hạn tại ${majorScore.palace} (${majorScore.palaceElement}) ` +
    `với điểm số ${majorScore.score > 0 ? "+" : ""}${majorScore.score}. ` +
    `Tiểu hạn tại ${minorScore.palace}.`;

  // ─── Luận giải Đại hạn ───
  const majorInterpretation = buildStarInterpretation(
    majorScore,
    majorPatterns,
    "ĐẠI HẠN",
  );

  // ─── Luận giải Tiểu hạn ───
  const minorInterpretation = buildStarInterpretation(
    minorScore,
    minorPatterns,
    "TIỂU HẠN",
  );

  // ─── Lời khuyên theo mức độ ───
  if (level === "大凶" || level === "凶") {
    recommendations.push(
      "📌 Cẩn trọng: Đây là năm nhiều thử thách. Hạn chế đầu tư lớn, " +
        "kỳ vọng quá cao, thay đổi lớn về công việc/nhà cửa.",
      "📌 Sức khỏe: Khám sức khỏe định kỳ, chú ý bệnh mãn tính.",
      "📌 Tài chính: Tiết kiệm, tránh chi tiêu hoang phí, không cho vay.",
      "📌 Tâm linh: Làm việc thiện, cầu nguyện, hóa giải bằng phong thủy.",
    );
  } else if (level === "吉" || level === "大吉") {
    recommendations.push(
      "🎯 Đây là năm thuận lợi để: Khởi nghiệp, đầu tư, mở rộng kinh doanh.",
      "🎯 Thuận lợi cho: Thi cử, thăng tiến, học hành, kết hôn, sinh con.",
      "🎯 Nắm bắt cơ hội: Đây là thời điểm vàng để thực hiện kế hoạch lớn.",
      "🎯 Sức khỏe: Duy trì luyện tập, ăn uống lành mạnh.",
    );
  } else {
    recommendations.push(
      "📌 Năm trung bình: Cố gắng và nỗ lực sẽ được đền đáp.",
      "📌 Tập trung vào: Học hành, rèn luyện kỹ năng, xây dựng quan hệ.",
      "📌 Tránh: Mạo hiểm, đầu tư lớn, thay đổi lớn.",
    );
  }

  // ─── Thêm lời khuyên riêng từ cách cục ───
  for (const pattern of majorPatterns) {
    if (pattern.category === "HÔN_NHÂN") {
      recommendations.push(
        "💕 Hạn này đặc biệt tốt/xấu về TÌNH CẢM – Hãy cân nhắc kỹ trước khi ra quyết định lớn về hôn nhân.",
      );
    }
    if (pattern.category === "TAI_NẠN") {
      recommendations.push(
        "⚠️ CẢNH BÁO ĐẶC BIỆT VỀ TAI NẠN – Hạn chế đi lại, lái xe cẩn thận, tránh hoạt động mạo hiểm.",
      );
    }
    if (pattern.category === "CÔNG_DANH") {
      recommendations.push(
        "🏆 Hạn thuận lợi cho THI CỬ, THĂNG TIẾN – Hãy tận dụng cơ hội này!",
      );
    }
  }

  return {
    summary,
    majorFateInterpretation: majorInterpretation,
    minorFateInterpretation: minorInterpretation,
    warnings,
    recommendations,
  };
}

function buildStarInterpretation(
  score: FateScore,
  patterns: FatePattern[],
  cycleName: string,
): string {
  let text = `【${cycleName} tại ${score.palace}】\n`;
  text += `Mức độ: ${score.fortuneLevel} (${score.score > 0 ? "+" : ""}${score.score} điểm)\n`;
  text += `Ngũ hành: ${score.palaceElement}\n`;

  if (patterns.length > 0) {
    text += `\n📋 Cách cục phát hiện:\n`;
    for (const p of patterns) {
      text += `• ${p.name}: ${p.interpretation}\n`;
    }
  }

  if (score.predictions.length > 0) {
    text += `\n✨ Dự báo:\n`;
    for (const p of score.predictions) {
      text += `• ${p}\n`;
    }
  }

  return text;
}
```

---

## XII. BẢNG CAN CHI TRA CỨU (1900–2100)

### 12.1. Hàm Chuyển Năm Dương Lịch → Can Chi

```typescript
// Năm Dương lịch → Can Chi
// Công thức: Can = (Năm + 6) % 10; Chi = (Năm + 8) % 12
// (Điều chỉnh cho năm âm lịch, cần xem xét ngày giao thừa âm lịch)

function solarYearToCanChi(year: number): {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
} {
  const stemIndex = (((year + 6) % 10) + 10) % 10;
  const branchIndex = (((year + 8) % 12) + 12) % 12;

  const stems = Object.values(HeavenlyStem);
  const branches = Object.values(EarthlyBranch);

  return {
    stem: stems[stemIndex],
    branch: branches[branchIndex],
  };
}

// Ví dụ: 1990 → Nhâm Thân (Nhâm=9, Thân=9)
// 1990 + 6 = 1996 % 10 = 6 → Kỷ (sai vì 1990 là Canh Thân)
// Cần điều chỉnh: Dùng Lịch Pháp Việt Nam chuẩn

// Bảng tra nhanh (lấy mẫu, cần đủ 120 năm)
const YEAR_CANCHI: Record<
  number,
  { stem: HeavenlyStem; branch: EarthlyBranch }
> = {
  1984: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.TÝ }, // Giáp Tý
  1985: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.SỬU }, // Ất Sửu
  1986: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.DẦN }, // Bính Dần
  1987: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.MÃO }, // Đinh Mão
  1988: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.THÌN }, // Mậu Thìn
  1989: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.TỴ }, // Kỷ Tỵ
  1990: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.NGỌ }, // Canh Ngọ
  1991: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.MÙI }, // Tân Mùi
  1992: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.THÂN }, // Nhâm Thân
  1993: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.TUẤT }, // Quý Tuất
  1994: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.DẬU }, // Giáp Dậu
  1995: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.HỢI }, // Ất Hợi
  1996: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.TÝ }, // Bính Tý
  1997: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.SỬU }, // Đinh Sửu
  1998: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.DẦN }, // Mậu Dần
  1999: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.MÃO }, // Kỷ Mão
  2000: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.THÌN }, // Canh Thìn
  2001: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.TỴ }, // Tân Tỵ
  2002: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.NGỌ }, // Nhâm Ngọ
  2003: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.MÙI }, // Quý Mùi
  2004: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.THÂN }, // Giáp Thân
  2005: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.TUẤT }, // Ất Tuất
  2006: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.DẬU }, // Bính Dậu
  2007: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.HỢI }, // Đinh Hợi
  2008: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.TÝ }, // Mậu Tý
  2009: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.SỬU }, // Kỷ Sửu
  2010: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.DẦN }, // Canh Dần
  2011: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.MÃO }, // Tân Mão
  2012: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.THÌN }, // Nhâm Thìn
  2013: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.TỴ }, // Quý Tỵ
  2014: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.NGỌ }, // Giáp Ngọ
  2015: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.MÙI }, // Ất Mùi
  2016: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.THÂN }, // Bính Thân
  2017: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.TUẤT }, // Đinh Tuất
  2018: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.DẬU }, // Mậu Dậu
  2019: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.HỢI }, // Kỷ Hợi
  2020: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.TÝ }, // Canh Tý
  2021: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.SỬU }, // Tân Sửu
  2022: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.DẦN }, // Nhâm Dần
  2023: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.MÃO }, // Quý Mão
  2024: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.THÌN }, // Giáp Thìn
  2025: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.TỴ }, // Ất Tỵ
  2026: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.NGỌ }, // Bính Ngọ
  2027: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.MÙI }, // Đinh Mùi
  2028: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.THÂN }, // Mậu Thân
  2029: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.TUẤT }, // Kỷ Tuất
  2030: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.DẬU }, // Canh Dậu
  2031: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.HỢI }, // Tân Hợi
  2032: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.TÝ }, // Nhâm Tý
  2033: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.SỬU }, // Quý Sửu
  2034: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.DẦN }, // Giáp Dần
  2035: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.MÃO }, // Ất Mão
  2036: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.THÌN }, // Bính Thìn
  2037: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.TỴ }, // Đinh Tỵ
  2038: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.NGỌ }, // Mậu Ngọ
  2039: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.MÙI }, // Kỷ Mùi
  2040: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.THÂN }, // Canh Thân
  2041: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.TUẤT }, // Tân Tuất
  2042: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.DẬU }, // Nhâm Dậu
  2043: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.HỢI }, // Quý Hợi
  2044: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.TÝ }, // Giáp Tý
  2045: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.SỬU }, // Ất Sửu
  2046: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.DẦN }, // Bính Dần
  2047: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.MÃO }, // Đinh Mão
  2048: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.THÌN }, // Mậu Thìn
  2049: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.TỴ }, // Kỷ Tỵ
  2050: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.NGỌ }, // Canh Ngọ
  2051: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.MÙI }, // Tân Mùi
  2052: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.THÂN }, // Nhâm Thân
  2053: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.TUẤT }, // Quý Tuất
  2054: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.DẬU }, // Giáp Dậu
  2055: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.HỢI }, // Ất Hợi
  2056: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.TÝ }, // Bính Tý
  2057: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.SỬU }, // Đinh Sửu
  2058: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.DẦN }, // Mậu Dần
  2059: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.MÃO }, // Kỷ Mão
  2060: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.THÌN }, // Canh Thìn
  2061: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.TỴ }, // Tân Tỵ
  2062: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.NGỌ }, // Nhâm Ngọ
  2063: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.MÙI }, // Quý Mùi
  2064: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.THÂN }, // Giáp Thân
  2065: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.TUẤT }, // Ất Tuất
  2066: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.DẬU }, // Bính Dậu
  2067: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.HỢI }, // Đinh Hợi
  2068: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.TÝ }, // Mậu Tý
  2069: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.SỬU }, // Kỷ Sửu
  2070: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.DẦN }, // Canh Dần
  2071: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.MÃO }, // Tân Mão
  2072: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.THÌN }, // Nhâm Thìn
  2073: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.TỴ }, // Quý Tỵ
  2074: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.NGỌ }, // Giáp Ngọ
  2075: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.MÙI }, // Ất Mùi
  2076: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.THÂN }, // Bính Thân
  2077: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.TUẤT }, // Đinh Tuất
  2078: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.DẬU }, // Mậu Dậu
  2079: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.HỢI }, // Kỷ Hợi
  2080: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.TÝ }, // Canh Tý
  2081: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.SỬU }, // Tân Sửu
  2082: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.DẦN }, // Nhâm Dần
  2083: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.MÃO }, // Quý Mão
  2084: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.THÌN }, // Giáp Thìn
  2085: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.TỴ }, // Ất Tỵ
  2086: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.NGỌ }, // Bính Ngọ
  2087: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.MÙI }, // Đinh Mùi
  2088: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.THÂN }, // Mậu Thân
  2089: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.TUẤT }, // Kỷ Tuất
  2090: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.DẬU }, // Canh Dậu
  2091: { stem: HeavenlyStem.TÂN, branch: EarthlyBranch.HỢI }, // Tân Hợi
  2092: { stem: HeavenlyStem.NHÂM, branch: EarthlyBranch.TÝ }, // Nhâm Tý
  2093: { stem: HeavenlyStem.QUÝ, branch: EarthlyBranch.SỬU }, // Quý Sửu
  2094: { stem: HeavenlyStem.GIÁP, branch: EarthlyBranch.DẦN }, // Giáp Dần
  2095: { stem: HeavenlyStem.ẤT, branch: EarthlyBranch.MÃO }, // Ất Mão
  2096: { stem: HeavenlyStem.BÍNH, branch: EarthlyBranch.THÌN }, // Bính Thìn
  2097: { stem: HeavenlyStem.ĐINH, branch: EarthlyBranch.TỴ }, // Đinh Tỵ
  2098: { stem: HeavenlyStem.MẬU, branch: EarthlyBranch.NGỌ }, // Mậu Ngọ
  2099: { stem: HeavenlyStem.KỶ, branch: EarthlyBranch.MÙI }, // Kỷ Mùi
  2100: { stem: HeavenlyStem.CANH, branch: EarthlyBranch.THÂN }, // Canh Thân
};
```

### 12.2. Hàm Chuyển Ngày Dương Lịch → Can Chi Ngày

```typescript
// Hàm Julian Day Number (JDN) cho ngày Dương lịch
function dateToJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return (
    day +
    Math.floor((153 * m + 2) / 5) +
    365 * y +
    Math.floor(y / 4) -
    Math.floor(y / 100) +
    Math.floor(y / 400) -
    32045
  );
}

function solarDateToCanChiDay(
  year: number,
  month: number,
  day: number,
): { stem: HeavenlyStem; branch: EarthlyBranch } {
  const jdn = dateToJDN(year, month, day);
  // Can của ngày: (JDN + 1) % 10
  const stemIndex = (((jdn + 1) % 10) + 10) % 10;
  // Chi của ngày: (JDN + 2) % 12
  const branchIndex = (((jdn + 2) % 12) + 12) % 12;

  const stems = Object.values(HeavenlyStem);
  const branches = Object.values(EarthlyBranch);

  return {
    stem: stems[stemIndex],
    branch: branches[branchIndex],
  };
}
```

---

## XIII. CẢNH BÁO VÀ LƯU Ý KHI IMPLEMENT

### 13.1. Các Edge Cases Cần Xử Lý

```typescript
// 1. Năm nhuận âm lịch
// → Can Chi năm phụ thuộc vào ngày giao thừa âm lịch (thường rơi vào
//   khoảng 21/01 – 20/02). Nếu ngày sinh < ngày giao thừa → dùng Can Chi năm trước.

// 2. Giờ Sinh (Can Chi giờ)
// → Giờ = Can của ngày * 2 + Chi của giờ (mod 60)
// → Cần hàm riêng tính Can Chi giờ từ Can Chi ngày + giờ địa lý

// 3. Tháng Nhuận
// → Tháng nhuận âm lịch: Cần xác định tháng chính hay tháng nhuận
// → Nếu nhập tháng nhuận, cần thêm thông tin tháng đó là tháng nhuận

// 4. Tuổi âm lịch vs tuổi Dương lịch
// → Đại hạn tính theo tuổi âm lịch (tuổi đúng ngày sinh âm)
// → Điều chỉnh: tuổi_âm = Dương lịch năm xem - Năm sinh âm lịch
// → Nếu chưa qua sinh nhật âm → tuổi âm = tuổi dương - 1
```

### 13.2. Độ Chính Xác Lý Học

```typescript
// Tuỳ theo phái lý học, có thể có sai khác nhỏ:
// 1. Phái Tử Vi Lý Học: Tính chính xác theo Lịch Pháp Việt Nam (LPVN)
// 2. Phái Đông Phương: Có thể dùng âm lịch Trung Quốc (khác LPVN vài ngày/năm)
// 3. Lưu ý múi giờ: Nên dùng múi giờ Việt Nam (UTC+7) cho người Việt
// 4. Giờ giao thừa: 23:00-01:00 (giờ Tý) chứ không phải 00:00

const VIETNAM_TIMEZONE = "Asia/Ho_Chi_Minh";
```

### 13.3. Các Hàm Cần Implement Thêm

```typescript
// 1. Tính Cung Mệnh từ Can Chi năm sinh
// 2. Tính Cục số từ Tứ Trụ (năm, tháng, ngày, giờ)
// 3. An sao theo cung (Tử Vi, Thiên Phủ, v.v.)
// 4. Xác định Vận (Lưu Niên, Lưu Tháng, Lưu Nhật)
// 5. Hóa giải sát tinh (các phương pháp)
// 6. Luận đoán chi tiết từng cung (12 cung)

// Đây là file thuật toán VẬN HẠN.
// Các phần khác (an cung, tứ trụ, lá số) nằm trong file riêng.
```

---

## XIV. FILE EXPORT CHÍNH

```typescript
// src/features/fate/services/fateCalculator.ts
export {
  // Core calculation
  calculateFate,
  FateInput,
  FateOutput,
  // Cycle calculations
  calculateMajorFateCycle,
  calculateMinorFateCycle,
  calculateMonthFateCycle,
  calculateDayFateCycle,
  // Moving stars
  calculateMovingStars,
  // Evaluation
  scoreFatePalace,
  detectFatePatterns,
  getElementRelation,
  // Utilities
  solarYearToCanChi,
  solarDateToCanChiDay,
  dateToJDN,
  palaceMatchingChi,
  moveByDirection,
  determineDirection,
  // Data
  FATE_PATTERNS,
  STAR_INTERPRETATION,
  CUC_ELEMENT_MAP,
  CAN_ELEMENT_MAP,
  CHI_ELEMENT_MAP,
  PALACE_ELEMENT_MAP,
  GENERATING_CYCLE,
  CONTROLLING_CYCLE,
  YEAR_CANCHI,
  MINOR_FATE_START,
  // Enums
  Palace,
  EarthlyBranch,
  HeavenlyStem,
  FiveElement,
  MovingStar,
  MainStar,
  StarBrightness,
};
```

---

**Ghi chú cuối file:**

- File này chỉ tập trung vào **Vận Hạn** (Đại/Tiểu/Nguyệt/Nhật hạn).
- Phần **An Cung** (đặt sao vào 12 cung) và **Tứ Trụ** cần triển khai ở file riêng.
- Phần **Hóa Giải Sát Tinh** cần thêm module riêng với các phương pháp cụ thể.
- Độ chính xác phụ thuộc vào việc sử dụng đúng Lịch Pháp Việt Nam và múi giờ UTC+7.
