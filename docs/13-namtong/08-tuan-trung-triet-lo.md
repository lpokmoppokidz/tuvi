# 8. Tuần Trung & Triệt Lộ

## 8.1 Tuần Trung (Tuần Không)

Mỗi **Tuần** gồm 10 ngày ứng với 10 Can, nhưng Địa chi có 12 → 2 Chi **không có Can** gọi là **Tuần Không**.

Xác định theo **Can Chi ngày sinh**:

```
Tuần bắt đầu từ Can Giáp, lùi về tìm ngày Giáp gần nhất trước ngày sinh.
Từ đó đếm 10 cung theo chiều thuận → 2 cung cuối = Tuần Không.

VD: Ngày sinh là Bính Ngọ
  → Giáp Thìn là ngày đầu Tuần
  → Tuần đi: Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi → kết thúc
  → Tuần Không: Tý và Sửu
```

## 8.2 Triệt Lộ

Triệt Lộ xác định theo **Can năm sinh**, rơi vào 2 cung trong lá số:

| Can năm   | Triệt Lộ tại 2 cung |
|-----------|---------------------|
| Giáp / Kỷ | Thân – Dậu          |
| Ất / Canh  | Ngọ – Mùi           |
| Bính / Tân | Thìn – Tỵ           |
| Đinh / Nhâm| Dần – Mão           |
| Mậu / Quý  | Tý – Sửu            |

## 8.3 Tác dụng lên sao

```
Sao sáng (Miếu/Vượng) bị Tuần/Triệt: giảm lực → tác dụng tốt suy giảm
Sao tối  (Hãm)        bị Tuần/Triệt: giảm hung → tác dụng xấu được hóa giải
```

Logic xử lý:
```python
def apply_tuan_triet(star, cung_index, tuan_khong_list, triet_lo_list):
    is_blocked = cung_index in tuan_khong_list or cung_index in triet_lo_list
    if is_blocked:
        if star.brightness in ['Mieu', 'Vuong', 'Dac']:
            star.effective_brightness = downgrade(star.brightness)
        elif star.brightness == 'Ham':
            star.effective_brightness = 'Binh'  # hóa giải
    return star
```
