# 03 – Tiểu Hạn (小限) – Nam Tông

---

## Nguyên tắc

- Tiểu hạn đi qua **1 cung mỗi năm** (tuổi âm lịch)
- Điểm xuất phát và chiều đi theo **giới tính**:

```
Nam: Khởi tại cung DẦN (index 2), tuổi 1 = Dần → đi THUẬN
Nữ:  Khởi tại cung THÂN (index 8), tuổi 1 = Thân → đi NGHỊCH
```

```typescript
function getTieuHanCung(tuoi: number, gender: 'NAM' | 'NU'): number {
  if (gender === 'NAM') {
    return (2 + tuoi - 1) % 12;              // Dần, thuận
  } else {
    return ((8 - tuoi + 1) + 12 * 10) % 12; // Thân, nghịch
  }
}
```

> **Lưu ý:** Một số tài liệu Nam Tông dùng **tuổi âm** (tính từ 1), không phải tuổi dương. Cần thống nhất với sách nguồn.

---

## Bảng Tiểu hạn Nam (khởi Dần)

| Tuổi | 1   | 2   | 3    | 4  | 5  | 6   | 7    | 8   | 9    | 10  | 11 | 12  |
|------|-----|-----|------|----|----|-----|------|-----|------|-----|----|-----|
| Cung | Dần | Mão | Thìn | Tỵ | Ngọ| Mùi | Thân | Dậu | Tuất | Hợi | Tý | Sửu |

*Lặp lại mỗi 12 tuổi. Tuổi 13 = Dần, tuổi 25 = Dần...*

---

## Bảng Tiểu hạn Nữ (khởi Thân)

| Tuổi | 1    | 2   | 3  | 4  | 5    | 6   | 7    | 8   | 9  | 10  | 11   | 12  |
|------|------|-----|----|----|------|-----|------|-----|----|-----|------|-----|
| Cung | Thân | Mùi | Ngọ| Tỵ | Thìn | Mão | Dần  | Sửu | Tý | Hợi | Tuất | Dậu |

---

## Luận Tiểu hạn trong Đại hạn

```
Tiểu hạn nằm trong Đại hạn → kết hợp 2 cung:
- Cung Đại hạn = nền tảng 10 năm
- Cung Tiểu hạn = sự kiện cụ thể năm đó

Quy tắc ưu tiên:
  Đại hạn cung TỐT + Tiểu hạn cung TỐT  → Năm rất thuận lợi
  Đại hạn cung TỐT + Tiểu hạn cung XẤU  → Năm có trở ngại nhỏ
  Đại hạn cung XẤU + Tiểu hạn cung TỐT  → Năm vẫn khó, có cứu tinh
  Đại hạn cung XẤU + Tiểu hạn cung XẤU  → Năm nguy hiểm, cần đề phòng
```
