# 01 – An 14 Chính Tinh (Nam Tông)

> Đây là file thuật toán chính xác cho 14 chính tinh.  
> Nguồn: Tử Vi Đẩu Số Tân Biên, Tử Vi Chính Biện (Nam Phái).

---

## Quy ước chung

```
Địa chi index (dùng xuyên suốt toàn hệ thống):
  Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5,
  Ngọ=6, Mùi=7, Thân=8, Dậu=9, Tuất=10, Hợi=11

Chiều THUẬN: index tăng dần, vượt 11 thì mod 12
Chiều NGHỊCH: index giảm dần, dưới 0 thì +12
```

---

## I. Xác định vị trí sao TỬ VI

### Đầu vào
- `ngay_am` – ngày sinh âm lịch (1..30)
- `cuc_so` – số cục: 2 / 3 / 4 / 5 / 6

### Thuật toán chuẩn

```
1. Tìm số N nhỏ nhất thỏa mãn:
     N >= ngay_am  VÀ  N % cuc_so == 0  VÀ  (N / cuc_so) <= 12

2. pos_TuVi = (N / cuc_so) - 1 + index(Dần)
            = (N / cuc_so) - 1 + 2
            = (N / cuc_so) + 1   (mod 12)

   ⚠ Dần là điểm xuất phát (index 2).
     Kết quả là index trên vòng 12 Chi.
```

### Ví dụ

```
ngay_am = 17, cuc_so = 3 (Mộc tam cục)
  17 % 3 = 2 ≠ 0  → thử 18: 18 % 3 = 0, 18/3 = 6 ≤ 12 ✓
  N = 18
  pos_TuVi = 2 + (6 - 1) = 7 → Mùi (index 7) ✓

ngay_am = 6, cuc_so = 6 (Hỏa lục cục)
  6 % 6 = 0 ✓
  N = 6, 6/6 = 1
  pos_TuVi = 2 + (1 - 1) = 2 → Dần (index 2) ✓

ngay_am = 29, cuc_so = 4 (Kim tứ cục)
  29 % 4 = 1 → thử 32: 32/4 = 8 ✓
  pos_TuVi = 2 + (8 - 1) = 9 → Dậu (index 9) ✓
```

### Pseudocode

```typescript
function findTuViPosition(ngay_am: number, cuc_so: number): number {
  let N = ngay_am;
  while (N % cuc_so !== 0 || N / cuc_so > 12) {
    N++;
  }
  const step = N / cuc_so; // 1..12
  return (2 + step - 1) % 12; // Dần=2 là gốc
}
```

---

## II. Hệ Tử Vi – 6 sao

An từ vị trí Tử Vi, đi **nghịch chiều**:

| Sao        | Offset từ Tử Vi | Công thức                         |
|------------|-----------------|-----------------------------------|
| **Tử Vi**  | 0               | `pos_TuVi`                        |
| Thiên Cơ   | -1              | `(pos_TuVi - 1 + 12) % 12`       |
| Thái Dương | -3              | `(pos_TuVi - 3 + 12) % 12`       |
| Vũ Khúc    | -4              | `(pos_TuVi - 4 + 12) % 12`       |
| Thiên Đồng | -5              | `(pos_TuVi - 5 + 12) % 12`       |
| Liêm Trinh | -8              | `(pos_TuVi - 8 + 12) % 12`       |

> **Lưu ý quan trọng:** Cung số 2 (offset -2) và cung số 6,7 (offset -6,-7) **bỏ trống** – không có sao chính tinh hệ Tử Vi.  
> Đây là đặc điểm chuẩn Nam Tông, KHÔNG điền sao vào các vị trí này.

---

## III. Hệ Thiên Phủ – 8 sao

### Tìm vị trí Thiên Phủ

```
Thiên Phủ đối xứng Tử Vi qua trục Dần(2)–Thân(8):

  pos_ThienPhu = (4 - pos_TuVi + 12) % 12

  Bảng nhanh:
  Tử Vi tại Dần(2)  → Thiên Phủ tại Thân(8)
  Tử Vi tại Mão(3)  → Thiên Phủ tại Mùi(7)
  Tử Vi tại Thìn(4) → Thiên Phủ tại Ngọ(6)
  Tử Vi tại Tỵ(5)   → Thiên Phủ tại Tỵ(5)   ← trùng cung
  Tử Vi tại Ngọ(6)  → Thiên Phủ tại Thìn(4)
  Tử Vi tại Mùi(7)  → Thiên Phủ tại Mão(3)
  Tử Vi tại Thân(8) → Thiên Phủ tại Dần(2)
  Tử Vi tại Dậu(9)  → Thiên Phủ tại Sửu(1)
  Tử Vi tại Tuất(10)→ Thiên Phủ tại Tý(0)
  Tử Vi tại Hợi(11) → Thiên Phủ tại Hợi(11)  ← trùng cung
  Tử Vi tại Tý(0)   → Thiên Phủ tại Tuất(10) ← không thể xảy ra (N/cuc ≥1)
  Tử Vi tại Sửu(1)  → Thiên Phủ tại Dậu(9)   ← không thể xảy ra
```

> ⚠ Thực tế Tử Vi chỉ rơi vào Dần→Dậu (12 vị trí tối đa tùy cục).  
> Tử Vi KHÔNG bao giờ ở Tý(0) hay Sửu(1) trong lá số hợp lệ.

### An 7 sao hệ Thiên Phủ (đi **thuận** từ Thiên Phủ)

| Sao          | Offset từ Thiên Phủ | Công thức                              |
|--------------|---------------------|----------------------------------------|
| **Thiên Phủ**| 0                   | `pos_ThienPhu`                         |
| Thái Âm      | +1                  | `(pos_ThienPhu + 1) % 12`             |
| Tham Lang    | +2                  | `(pos_ThienPhu + 2) % 12`             |
| Cự Môn       | +3                  | `(pos_ThienPhu + 3) % 12`             |
| Thiên Tướng  | +4                  | `(pos_ThienPhu + 4) % 12`             |
| Thiên Lương  | +5                  | `(pos_ThienPhu + 5) % 12`             |
| Thất Sát     | +6                  | `(pos_ThienPhu + 6) % 12`             |
| Phá Quân     | +10                 | `(pos_ThienPhu + 10) % 12`            |

> **Lưu ý:** Offset +7, +8, +9 **bỏ trống** – không có sao chính tinh hệ Thiên Phủ tại các vị trí này.

---

## IV. Bảng trạng thái sáng/tối chuẩn 14 Chính tinh

Ký hiệu: **M** = Miếu | **V** = Vượng | **Đ** = Đắc | **B** = Bình | **H** = Hãm

| Sao \ Cung   | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|--------------|----|-----|-----|-----|------|----|-----|-----|------|-----|------|-----|
| Tử Vi        | Đ  | B   | M   | B   | M    | B  | Đ   | B   | M    | B   | M    | B   |
| Thiên Cơ     | Đ  | H   | M   | V   | Đ    | H  | H   | Đ   | B    | V   | M    | Đ   |
| Thái Dương   | H  | H   | V   | M   | Đ    | Đ  | M   | Đ   | B    | B   | H    | H   |
| Vũ Khúc      | M  | Đ   | H   | B   | M    | Đ  | H   | B   | M    | V   | H    | B   |
| Thiên Đồng   | V  | H   | B   | Đ   | H    | H  | M   | V   | B    | Đ   | B    | M   |
| Liêm Trinh   | B  | Đ   | H   | B   | M    | B  | B   | Đ   | H    | B   | M    | B   |
| Thiên Phủ    | M  | V   | B   | B   | Đ    | M  | B   | B   | M    | V   | Đ    | B   |
| Thái Âm      | M  | V   | H   | Đ   | H    | H  | H   | H   | Đ    | M   | V    | V   |
| Tham Lang    | B  | M   | V   | H   | B    | M  | H   | M   | V    | H   | B    | B   |
| Cự Môn       | H  | B   | H   | M   | B    | H  | H   | B   | M    | Đ   | B    | H   |
| Thiên Tướng  | M  | B   | Đ   | B   | M    | B  | M   | B   | Đ    | B   | M    | B   |
| Thiên Lương  | Đ  | V   | M   | Đ   | B    | H  | V   | B   | H    | Đ   | B    | M   |
| Thất Sát     | H  | B   | M   | H   | H    | M  | H   | H   | M    | H   | H    | M   |
| Phá Quân     | H  | M   | M   | H   | H    | M  | H   | M   | M    | H   | H    | M   |

> ⚠ Bảng trên là tham khảo theo *Tử Vi Chính Biện* (Nam Tông).  
> Có thể có dị bản nhỏ giữa các tài liệu – cần đối chiếu với sách nguồn bạn đang dùng.