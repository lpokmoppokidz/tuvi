# 9. Tương tác & Luận giải

## 9.1 Trạng thái Sáng – Tối (Cường – Nhược)

Mỗi sao có bảng trạng thái cố định theo **cung mà sao đóng** (không phải cung Mệnh):

| Trạng thái | Ký hiệu | Mức lực |
|------------|---------|---------|
| Miếu       | ☀☀☀    | Tối đa  |
| Vượng      | ☀☀     | Cao     |
| Đắc        | ☀      | Trung bình|
| Bình       | –      | Yếu     |
| Hãm        | ☾      | Tối thiểu|

> Cần hardcode bảng trạng thái cho từng sao trên 12 cung. Đây là bảng **lớn nhất** trong toàn hệ thống (~100 sao × 12 cung).

## 9.2 Tương quan Ngũ hành

**Cung khắc/sinh Sao:**
```
Ngũ hành tương sinh: Thủy→Mộc→Hỏa→Thổ→Kim→Thủy
Ngũ hành tương khắc: Kim→Mộc, Mộc→Thổ, Thổ→Thủy, Thủy→Hỏa, Hỏa→Kim

Nếu hành Cung SINH hành Sao → Sao được tăng lực
Nếu hành Cung KHẮC hành Sao → Sao bị giảm lực
```

**Sao sinh/khắc Mệnh:**
```
Nếu hành Sao SINH hành Mệnh chủ → Cát tinh (tốt nhất)
Nếu hành Sao KHẮC hành Mệnh chủ → Hung tinh (xấu nhất)
Nếu hành Sao = hành Mệnh chủ → Bình hòa
```

## 9.3 Các góc chiếu

```
┌─────────────┬────────────────────────────────────────┐
│ Loại chiếu  │ Định nghĩa                             │
├─────────────┼────────────────────────────────────────┤
│ Xung (180°) │ Cung đối diện trên bàn 12 cung         │
│ Tam hợp     │ 3 cung cách nhau 120°                  │
│             │ VD: Dần–Ngọ–Tuất, Thân–Tý–Thìn        │
│ Nhị hợp     │ Cặp cung hỗ trợ ngầm                   │
│             │ VD: Tý–Sửu, Dần–Hợi, Mão–Tuất, ...    │
└─────────────┴────────────────────────────────────────┘
```

```python
TAM_HOP = {
    'Dần': ['Dần', 'Ngọ', 'Tuất'],
    'Thân': ['Thân', 'Tý', 'Thìn'],
    'Hợi': ['Hợi', 'Mão', 'Mùi'],
    'Tỵ':  ['Tỵ',  'Dậu', 'Sửu'],
}

NHI_HOP = {
    'Tý': 'Sửu', 'Sửu': 'Tý',
    'Dần': 'Hợi', 'Hợi': 'Dần',
    'Mão': 'Tuất', 'Tuất': 'Mão',
    'Thìn': 'Dậu', 'Dậu': 'Thìn',
    'Tỵ': 'Thân', 'Thân': 'Tỵ',
    'Ngọ': 'Mùi', 'Mùi': 'Ngọ',
}
```

Khi luận giải một cung, cần lấy sao từ:
1. Chính cung (đóng tại cung đó)
2. Cung xung chiếu
3. Hai cung tam hợp
