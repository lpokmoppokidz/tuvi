# 02 – Đại Hạn (大限) – Nam Tông

---

## Nguyên tắc

- Mỗi Đại hạn kéo dài **10 năm**
- Khởi đầu từ **cung Mệnh**, lần lượt đi qua 12 cung
- Chiều đi phụ thuộc **Âm/Dương + Giới tính** (giống chiều vòng Tràng Sinh)
- **Tuổi bắt đầu Đại hạn 1 = Số cục**

```
Nam Dương / Nữ Âm  → Đại hạn đi THUẬN (chiều kim đồng hồ)
Nam Âm   / Nữ Dương → Đại hạn đi NGHỊCH
```

---

## Bảng tuổi Đại hạn

| Đại hạn | Tuổi (Thủy 2) | Tuổi (Mộc 3) | Tuổi (Kim 4) | Tuổi (Thổ 5) | Tuổi (Hỏa 6) |
|---------|--------------|-------------|-------------|-------------|-------------|
| 1       | 2 – 11       | 3 – 12      | 4 – 13      | 5 – 14      | 6 – 15      |
| 2       | 12 – 21      | 13 – 22     | 14 – 23     | 15 – 24     | 16 – 25     |
| 3       | 22 – 31      | 23 – 32     | 24 – 33     | 25 – 34     | 26 – 35     |
| 4       | 32 – 41      | 33 – 42     | 34 – 43     | 35 – 44     | 36 – 45     |
| 5       | 42 – 51      | 43 – 52     | 44 – 53     | 45 – 54     | 46 – 55     |
| 6       | 52 – 61      | 53 – 62     | 54 – 63     | 55 – 64     | 56 – 65     |
| ...     | ...          | ...         | ...         | ...         | ...         |

---

## TypeScript

```typescript
interface DaiHan {
  hanSo: number;        // Đại hạn thứ mấy (1, 2, 3...)
  cungIndex: number;    // Cung đang active
  tuoiBatDau: number;   // Tuổi bắt đầu
  tuoiKetThuc: number;  // Tuổi kết thúc (= tuoiBatDau + 9)
}

function buildDaiHanList(
  menhCungIndex: number,
  cucSo: number,            // 2 | 3 | 4 | 5 | 6
  isThuanChieu: boolean,    // Nam Dương/Nữ Âm = true
  maxHan: number = 12
): DaiHan[] {
  const result: DaiHan[] = [];
  const dir = isThuanChieu ? 1 : -1;

  for (let i = 0; i < maxHan; i++) {
    const cungIndex = ((menhCungIndex + dir * i) % 12 + 12) % 12;
    result.push({
      hanSo: i + 1,
      cungIndex,
      tuoiBatDau: cucSo + i * 10,
      tuoiKetThuc: cucSo + i * 10 + 9,
    });
  }
  return result;
}

/** Tìm Đại hạn hiện tại theo tuổi */
function getCurrentDaiHan(daiHanList: DaiHan[], currentAge: number): DaiHan | null {
  return daiHanList.find(h =>
    currentAge >= h.tuoiBatDau && currentAge <= h.tuoiKetThuc
  ) ?? null;
}
```

---

## Cách luận Đại hạn (Nam Tông)

Khi Đại hạn rơi vào cung X:

1. **Đọc sao tại cung X** (chính tinh + phụ tinh + trạng thái sáng/tối)
2. **Đọc sao tại cung xung chiếu** (đối diện 180°)
3. **Đọc sao tại 2 cung tam hợp** của cung X
4. **Kiểm tra Tuần Không / Triệt Lộ** tại cung X
5. **Kiểm tra Tứ Hóa** có sao nào đóng trong cung X không
6. So sánh với **cung Mệnh gốc** → vận hạn tốt/xấu hơn bản mệnh?

```typescript
interface DaiHanAnalysis {
  daiHan: DaiHan;
  mainCung: Cung;
  xungCung: Cung;
  tamHopCungs: [Cung, Cung];
  isTuanKhong: boolean;
  isTrietLo: boolean;
  tuHoaInCung: string[];    // ['LOC', 'QUYEN'...] nếu có
  overallTone: 'CAT' | 'HUNG' | 'BINH';
}
```
