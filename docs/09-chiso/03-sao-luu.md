# 03. Sao Lưu

Mở file này khi cần tính vị trí 9 sao lưu theo năm xem hạn và các helper đi cung.

## Bao gồm

- `MovingStarsResult`
- `calculateMovingStars`
- `palaceMatchingChi`
- `moveByDirection`
- `calculateThienMa`

## Khi nào dùng

- Sau khi đã có Đại hạn/Tiểu hạn
- Trước bước scoring hoặc detect cách cục
- Khi cần map Chi năm hạn sang cung thực tế

## Vai trò trong pipeline

1. Nhận `targetYearBranch`
2. Tính 9 sao lưu
3. Đổ các sao đó vào cung hạn tương ứng
4. Chuyển tiếp sang scoring và pattern detection

## Kiểu dữ liệu chính

```typescript
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
```

## Thuật toán chính

```typescript
function calculateMovingStars(
  targetYearBranch: EarthlyBranch,
): MovingStarsResult {
  const liuThaiTuePalace = palaceMatchingChi(targetYearBranch);
  const tangMonPalace = moveByDirection(liuThaiTuePalace, 1, "顺行");
  const bachHoPalace = moveByDirection(liuThaiTuePalace, 1, "逆行");

  const canIndex = Object.values(HeavenlyStem).indexOf(
    getStemOfYear(targetYearBranch),
  );
  const locTonPalace = PALACE_ORDER[canIndex % 12];
  const kinhDuongPalace = PALACE_ORDER[(canIndex + 6) % 12];
  const daLaPalace = PALACE_ORDER[(canIndex + 8) % 12];

  const thienMaPalace = calculateThienMa(targetYearBranch);

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
```

## Helper cần nhớ

### `palaceMatchingChi`

Dùng khi cần đổi một `EarthlyBranch` sang `Palace` tương ứng trên địa bàn.

### `moveByDirection`

Dùng cho mọi logic đi cung theo số bước và theo chiều thuận/nghịch.

```typescript
function moveByDirection(
  palace: Palace,
  steps: number,
  direction: "顺行" | "逆行",
): Palace
```

### `calculateThienMa`

Dùng riêng cho sao Lưu Thiên Mã theo nhóm Chi.

## Ghi nhớ

- File này chỉ lo vị trí sao lưu, không lo điểm số hay luận giải.
- Nếu bug nằm ở sao nào nhập cung nào, kiểm tra file này trước file scoring.
