# 02. Chu Kỳ Vận Hạn

Mở file này khi cần implement 4 cấp độ hạn: Đại hạn, Tiểu hạn, Nguyệt hạn, Nhật hạn.

## Bao gồm

- `NatalInfo`
- `determineDirection`
- `PALACE_ORDER`
- `FateCycleResult`
- `calculateMajorFateCycle`
- `generateYearlyBreakdown`
- `MINOR_FATE_START`
- `calculateMinorFateCycle`
- `calculateMonthFateCycle`
- `calculateDayFateCycle`

## Khi nào dùng

- Tính vị trí cung hạn theo tuổi, năm, tháng, ngày
- Xác định chiều thuận/nghịch
- Cần luồng tính hạn trước khi nối sang sao lưu và scoring

## 1. Direction và thứ tự cung

```typescript
interface NatalInfo {
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourBranch: EarthlyBranch;
  cuc: number;
  gender: "male" | "female";
  direction: "順行" | "逆行";
}

function determineDirection(natalInfo: NatalInfo): "順行" | "逆行" {
  const isYangYear =
    Object.values(HeavenlyStem).indexOf(natalInfo.yearStem) % 2 === 0;
  const isMale = natalInfo.gender === "male";

  return (isYangYear && isMale) || (!isYangYear && !isMale)
    ? "順行"
    : "逆行";
}
```

```typescript
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
```

## 2. Đại hạn

- Dùng khi cần biết cung vận 10 năm hiện tại
- Bắt đầu từ `Cung Mệnh`
- Mỗi cung ứng với 10 năm

```typescript
function calculateMajorFateCycle(
  natalInfo: NatalInfo,
  age: number,
  targetYear: number,
): FateCycleResult[] {
  const direction = determineDirection(natalInfo);
  const cyclePosition = (age - 1) % 120;
  const palaceIndex = Math.floor(cyclePosition / 10);
  const yearsInPalace = (cyclePosition % 10) + 1;
  // ... xác định currentPalace theo chiều thuận/nghịch
}
```

## 3. Tiểu hạn

- Dùng khi cần cung của từng năm
- Điểm khởi tính theo Chi năm sinh
- Nam thuận, nữ nghịch

```typescript
const MINOR_FATE_START: Record<string, Palace> = {
  [EarthlyBranch.DẦN]: Palace.THIÊN_DI,
  [EarthlyBranch.NGỌ]: Palace.THIÊN_DI,
  [EarthlyBranch.TUẤT]: Palace.THIÊN_DI,
  [EarthlyBranch.THÂN]: Palace.QUAN_LỘC_2,
  [EarthlyBranch.TÝ]: Palace.QUAN_LỘC_2,
  [EarthlyBranch.THÌN]: Palace.QUAN_LỘC_2,
  [EarthlyBranch.TỴ]: Palace.TÀI_QUAN,
  [EarthlyBranch.DẬU]: Palace.TÀI_QUAN,
  [EarthlyBranch.SỬU]: Palace.TÀI_QUAN,
  [EarthlyBranch.HỢI]: Palace.ĐIỀN_TRẠCH,
  [EarthlyBranch.MÃO]: Palace.ĐIỀN_TRẠCH,
  [EarthlyBranch.MÙI]: Palace.ĐIỀN_TRẠCH,
};
```

## 4. Nguyệt hạn

- Lấy cung Tiểu hạn làm tháng Giêng
- Đếm nghịch tới tháng sinh
- Từ đó đếm thuận theo giờ sinh

```typescript
function calculateMonthFateCycle(
  minorFatePalace: Palace,
  birthMonth: number,
  birthHour: EarthlyBranch,
  targetMonth: number,
): FateCycleResult {
  // ... điều chỉnh startIndex theo tháng sinh và giờ sinh
}
```

## 5. Nhật hạn

- Lấy cung Nguyệt hạn làm mồng 1
- Mỗi cung ứng một ngày, đếm thuận

```typescript
function calculateDayFateCycle(
  monthFatePalace: Palace,
  targetDay: number,
  birthDayBranch: EarthlyBranch,
): FateCycleResult {
  const startIndex = PALACE_ORDER.indexOf(monthFatePalace);
  const dayOffset = (targetDay - 1) % 30;
  const targetIndex = (startIndex + dayOffset) % 12;
  // ...
}
```

## Ghi nhớ

- Nếu bạn đang nối pipeline tính vận hạn, đây là file phải đọc đầu tiên sau dữ liệu nền tảng.
- Nếu bạn chỉ sửa phần luận giải mà không đụng cung hạn, không cần bắt đầu từ file này.
