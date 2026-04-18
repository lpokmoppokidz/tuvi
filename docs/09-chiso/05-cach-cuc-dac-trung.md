# 05. Cách Cục Đặc Trưng

Mở file này khi cần detect các tổ hợp sao gắn với sự kiện cụ thể như hôn nhân, công danh, tai nạn, tài lộc, sức khỏe.

## Bao gồm

- `FatePattern`
- `FATE_PATTERNS`
- `detectFatePatterns`

## Khi nào dùng

- Sau khi đã có danh sách sao trong cung hạn
- Khi cần đưa ra sự kiện cụ thể thay vì chỉ điểm số tổng quát
- Khi cần cảnh báo mạnh cho các bộ sát tinh

## Cấu trúc pattern

```typescript
interface FatePattern {
  name: string;
  category:
    | "HÔN_NHÂN"
    | "SINH_CON"
    | "TAI_NẠN"
    | "CÔNG_DANH"
    | "TÀI_LỘC"
    | "SỨC_KHỎE";
  requiredStars: (MainStar | MovingStar)[];
  requiredPalace?: Palace;
  forbiddenStars?: (MainStar | MovingStar)[];
  description: string;
  severity: "CAO" | "TRUNG_BÌNH" | "THẤP";
  interpretation: string;
}
```

## Nhóm pattern chính

- `HÔN_NHÂN`
- `SINH_CON`
- `CÔNG_DANH`
- `TAI_NẠN`
- `TÀI_LỘC`
- `SỨC_KHỎE`

## Ví dụ pattern đáng chú ý

- `ĐÀO – HỒNG HỘI CHIẾU`
- `KHOA QUYỀN LỘC HỘI CHIẾU`
- `KÌNH ĐÀ KHÔNG KIẾP HỘI TỤ`
- `HÌNH KỴ TỌA MỆNH`
- `LỘC TỒN NHẬP TÀI`
- `BẠCH HỔ TANG MÔN`

## Thuật toán detect

```typescript
function detectFatePatterns(
  palace: Palace,
  starsInPalace: (MainStar | MovingStar)[],
  fateCycleResult: FateCycleResult,
): FatePattern[] {
  const detected: FatePattern[] = [];

  for (const pattern of FATE_PATTERNS) {
    if (pattern.requiredPalace && pattern.requiredPalace !== palace) {
      continue;
    }

    const allStarsPresent = pattern.requiredStars.every((requiredStar) =>
      starsInPalace.includes(requiredStar),
    );

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

## Ghi nhớ

- File này bổ sung ý nghĩa sự kiện cho kết quả scoring, không thay scoring.
- Nếu cần thêm case nghiệp vụ mới kiểu “bộ sao nào thì ra sự kiện gì”, thêm vào đây trước.
