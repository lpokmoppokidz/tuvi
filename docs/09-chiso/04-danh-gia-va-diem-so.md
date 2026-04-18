# 04. Đánh Giá Và Điểm Số

Mở file này khi cần chấm điểm cung hạn, xét sinh khắc ngũ hành, hoặc giải mã ý nghĩa sao khi nhập hạn.

## Bao gồm

- `GENERATING_CYCLE`
- `CONTROLLING_CYCLE`
- `getElementRelation`
- `FateScore`
- `scoreFatePalace`
- `STAR_INTERPRETATION`

## Khi nào dùng

- Sau khi đã có cung hạn và sao trong cung
- Khi cần chuyển dữ liệu thô thành mức độ tốt/xấu
- Khi cần ra cảnh báo và dự báo sơ bộ

## Quan hệ ngũ hành

```typescript
const GENERATING_CYCLE: Record<FiveElement, FiveElement[]> = {
  [FiveElement.THỦY]: [FiveElement.MỘC],
  [FiveElement.MỘC]: [FiveElement.HỎA],
  [FiveElement.HỎA]: [FiveElement.THỔ],
  [FiveElement.THỔ]: [FiveElement.KIM],
  [FiveElement.KIM]: [FiveElement.THỦY],
};

const CONTROLLING_CYCLE: Record<FiveElement, FiveElement[]> = {
  [FiveElement.KIM]: [FiveElement.MỘC],
  [FiveElement.MỘC]: [FiveElement.THỔ],
  [FiveElement.THỔ]: [FiveElement.THỦY],
  [FiveElement.THỦY]: [FiveElement.HỎA],
  [FiveElement.HỎA]: [FiveElement.KIM],
};
```

## Kiểu dữ liệu chấm điểm

```typescript
interface FateScore {
  palace: Palace;
  score: number;
  wuxingBonus: number;
  starBonus: number;
  trapBonus: number;
  warnings: string[];
  predictions: string[];
  fortuneLevel: "大吉" | "吉" | "平" | "凶" | "大凶";
}
```

## Nguồn điểm chính

- Điểm ngũ hành
- Điểm sao cố định theo độ sáng
- Điểm sao lưu
- Điểm giải cứu bởi Tuần/Triệt
- Điểm cộng/trừ khi trùng phùng
- Trừ thêm khi sát tinh quá nhiều

## Khung hàm scoring

```typescript
function scoreFatePalace(
  fatePalace: Palace,
  fatePalaceElement: FiveElement,
  menhElement: FiveElement,
  starsInPalace: MainStar[],
  movingStarsInPalace: MovingStar[],
  trapStars: MainStar[],
  isOverlapping: boolean,
  hasKhoaQuyen: boolean,
  hasSatThan: boolean,
): FateScore
```

## Mapping mức độ

```typescript
if (score >= 50) fortuneLevel = "大吉";
else if (score >= 20) fortuneLevel = "吉";
else if (score >= -20) fortuneLevel = "平";
else if (score >= -50) fortuneLevel = "凶";
else fortuneLevel = "大凶";
```

## Giải mã sao

`STAR_INTERPRETATION` là nơi để viết lời giải theo từng sao và từng trạng thái như `miếu`, `vượng`, `đắc`, `hãm`, `hạn_tốt`, `hạn_xấu`.

Dùng file này khi:

- Muốn sửa cách tính điểm
- Muốn thay đổi threshold tốt/xấu
- Muốn bổ sung nội dung luận giải từng sao

Không dùng file này khi:

- Bạn đang sửa vị trí cung hạn
- Bạn đang sửa vị trí sao lưu
