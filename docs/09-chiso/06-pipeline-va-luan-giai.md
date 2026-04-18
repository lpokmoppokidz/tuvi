# 06. Pipeline Và Luận Giải

Mở file này khi cần xem luồng xử lý end-to-end: input, gọi các bước tính, ghép kết quả, rồi sinh luận giải cuối cùng.

## Bao gồm

- `FateInput`
- `FateOutput`
- `calculateFate`
- `generateInterpretation`
- `buildStarInterpretation`

## Khi nào dùng

- Muốn hiểu toàn bộ module hoạt động ra sao
- Muốn nối UI/API với engine vận hạn
- Muốn debug đầu ra cuối cùng

## Input/Output chính

```typescript
interface FateInput {
  birthYear: number;
  birthMonth: number;
  birthDay: number;
  birthHour: number;
  gender: "male" | "female";
  yearStem: HeavenlyStem;
  yearBranch: EarthlyBranch;
  monthStem: HeavenlyStem;
  monthBranch: EarthlyBranch;
  dayStem: HeavenlyStem;
  dayBranch: EarthlyBranch;
  hourBranch: EarthlyBranch;
  palaces: Record<Palace, { stars: MainStar[]; elements: FiveElement }>;
  cuc: number;
  targetYear: number;
  targetMonth?: number;
  targetDay?: number;
}
```

```typescript
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
    summary: string;
    majorFateInterpretation: string;
    minorFateInterpretation: string;
    warnings: string[];
    recommendations: string[];
  };
}
```

## Luồng xử lý chuẩn

1. Tính tuổi và `NatalInfo`
2. Tính `majorFate`, `minorFate`, `monthFate`, `dayFate`
3. Tính `movingStars`
4. Thu thập sao tại các cung hạn
5. Chấm điểm `majorScore` và `minorScore`
6. Kiểm tra trùng phùng
7. Detect `FATE_PATTERNS`
8. Tạo `interpretation`
9. Trả về `FateOutput`

## Khung hàm chính

```typescript
function calculateFate(input: FateInput): FateOutput {
  // 1. Tính các cấp độ hạn
  // 2. Tính sao lưu
  // 3. Thu thập sao trong cung hạn
  // 4. Scoring
  // 5. Detect pattern
  // 6. Generate interpretation
}
```

## Luận giải cuối

`generateInterpretation` dùng để:

- Tạo `summary`
- Sinh luận giải Đại hạn và Tiểu hạn
- Gom `warnings`
- Đề xuất `recommendations`

`buildStarInterpretation` dùng để render text chi tiết theo điểm số và pattern đã detect.

## Dùng file này nếu

- Bạn đang tìm entry point
- Bạn cần biết file nào gọi file nào
- Bạn muốn kiểm tra output cuối bị sai ở bước nào

Không dùng file này nếu:

- Bạn chỉ sửa một bảng map nền tảng
- Bạn chỉ sửa một pattern cụ thể
