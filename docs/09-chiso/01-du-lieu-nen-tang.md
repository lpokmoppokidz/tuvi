# 01. Dữ Liệu Nền Tảng

Mở file này khi cần các kiểu dữ liệu gốc và bảng tra cứu dùng chung cho toàn bộ module vận hạn.

## Bao gồm

- `Palace`
- `EarthlyBranch`
- `HeavenlyStem`
- `FiveElement`
- `MovingStar`
- `MainStar`
- `CUC_ELEMENT_MAP`
- `CAN_ELEMENT_MAP`
- `CHI_ELEMENT_MAP`
- `PALACE_ELEMENT_MAP`
- `StarBrightness`
- `STAR_BRIGHTNESS`

## Khi nào dùng

- Trước khi implement bất kỳ hàm tính hạn nào
- Khi cần map Can, Chi, Cục, Cung sang Ngũ hành
- Khi chấm điểm sao theo độ sáng

## Mẫu cấu trúc

```typescript
enum Palace {
  MỆNH = "Mệnh",
  PHỤ_MẪU = "Phụ Mẫu",
  PHÚC_ĐỨC = "Phúc Đức",
  TÀI_BẠCH = "Tài Bạch",
  QUAN_LỘC = "Quan Lộc",
  NẠP_ÁI = "Nạp Ái",
  TẬT_ÁCH = "Tật Ách",
  TÀI_QUAN = "Tài Quan",
  THIÊN_DI = "Thiên Di",
  ĐIỀN_TRẠCH = "Điền Trạch",
  QUAN_LỘC_2 = "Quan Lộc_2",
  BẢO_MỆNH = "Bảo Mệnh",
}

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

enum HeavenlyStem {
  GIÁP = "Giáp",
  ẤT = "Ất",
  BÍNH = "Bính",
  ĐINH = "Đinh",
  MẬU = "Mậu",
  KỶ = "Kỷ",
  CANH = "Canh",
  TÂN = "Tân",
  NHÂM = "Nhâm",
  QUÝ = "Quý",
}
```

## Các bảng map chính

```typescript
const CUC_ELEMENT_MAP: Record<number, FiveElement> = {
  1: FiveElement.MỘC,
  2: FiveElement.THỦY,
  3: FiveElement.MỘC,
  4: FiveElement.KIM,
  5: FiveElement.THỔ,
  6: FiveElement.KIM,
  7: FiveElement.THỦY,
  8: FiveElement.THỔ,
  9: FiveElement.HỎA,
};

const CAN_ELEMENT_MAP: Record<HeavenlyStem, FiveElement> = {
  [HeavenlyStem.GIÁP]: FiveElement.MỘC,
  [HeavenlyStem.ẤT]: FiveElement.MỘC,
  [HeavenlyStem.BÍNH]: FiveElement.HỎA,
  [HeavenlyStem.ĐINH]: FiveElement.HỎA,
  [HeavenlyStem.MẬU]: FiveElement.THỔ,
  [HeavenlyStem.KỶ]: FiveElement.THỔ,
  [HeavenlyStem.CANH]: FiveElement.KIM,
  [HeavenlyStem.TÂN]: FiveElement.KIM,
  [HeavenlyStem.NHÂM]: FiveElement.THỦY,
  [HeavenlyStem.QUÝ]: FiveElement.THỦY,
};
```

```typescript
const CHI_ELEMENT_MAP: Record<EarthlyBranch, FiveElement> = {
  [EarthlyBranch.TÝ]: FiveElement.THỦY,
  [EarthlyBranch.SỬU]: FiveElement.THỔ,
  [EarthlyBranch.DẦN]: FiveElement.MỘC,
  [EarthlyBranch.MÃO]: FiveElement.MỘC,
  [EarthlyBranch.THÌN]: FiveElement.THỔ,
  [EarthlyBranch.TỴ]: FiveElement.HỎA,
  [EarthlyBranch.NGỌ]: FiveElement.HỎA,
  [EarthlyBranch.MÙI]: FiveElement.THỔ,
  [EarthlyBranch.THÂN]: FiveElement.KIM,
  [EarthlyBranch.TUẤT]: FiveElement.THỔ,
  [EarthlyBranch.DẬU]: FiveElement.KIM,
  [EarthlyBranch.HỢI]: FiveElement.THỦY,
};
```

## Độ sáng sao

```typescript
enum StarBrightness {
  MIẾU = "M",
  VƯỢNG = "V",
  ĐẮC = "Đ",
  HÃM = "H",
  BÌNH = "B",
}
```

`STAR_BRIGHTNESS` là bảng tra dùng trực tiếp trong bước scoring. Nếu bạn đang sửa điểm số hoặc luận giải sao, bắt đầu từ file này trước.
