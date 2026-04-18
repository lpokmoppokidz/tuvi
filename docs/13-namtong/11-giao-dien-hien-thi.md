# 11. Giao diện hiển thị (UI/UX)

## 11.1 Layout chuẩn – Bàn 12 cung 4×3

```
┌───────────────┬───────────────┬───────────────┬───────────────┐
│  [TỴ]         │  [NGỌ]        │  [MÙI]        │  [THÂN]       │
│  Cung: ...    │  Cung: ...    │  Cung: ...    │  Cung: ...    │
│  ★ Thái Dương │  ★ Tử Vi      │               │  ★ Thiên Phủ  │
│  ☆ Văn Xương  │  ★ Thiên Tướng│               │  ☆ Tả Phụ     │
├───────────────┼───────────────┼───────────────┼───────────────┤
│  [THÌN]       │         TRUNG TÂM LÁ SỐ       │  [DẬU]        │
│               │  ┌──────────────────────────┐  │               │
│               │  │  Họ tên: ...             │  │               │
├───────────────┤  │  Sinh: DD/MM/YYYY HH:mm  │  ├───────────────┤
│  [MÃO]        │  │  Mệnh: [Chi] – [Cung]    │  │  [TUẤT]       │
│               │  │  Thân: [Chi] – [Cung]    │  │               │
│               │  │  Cục: [Tên cục]          │  │               │
│               │  │  Bản Mệnh: [Hành]        │  │               │
├───────────────┤  └──────────────────────────┘  ├───────────────┤
│  [DẦN]        │  [SỬU]        │  [TÝ]         │  [HỢI]        │
│  Cung: ...    │  Cung: ...    │  Cung: ...    │  Cung: ...    │
│  ★ Thiên Cơ   │               │               │               │
└───────────────┴───────────────┴───────────────┴───────────────┘
```

## 11.2 Mỗi ô cung hiển thị

```
┌──────────────────────────────┐
│ [Địa Chi]  [Ngũ hành cung]   │  ← Header
│ TÊN CUNG CHỨC DANH           │
│ ──────────────────────────── │
│ ★ Tử Vi        [Miếu] ☀☀☀  │  ← Chính tinh (to, đậm)
│ ★ Thiên Phủ    [Vượng] ☀☀  │
│ ──────────────────────────── │
│ · Tả Phụ       [Đắc]  ☀    │  ← Phụ tinh (nhỏ hơn)
│ · Văn Xương    [Bình] –     │
│ ──────────────────────────── │
│ ⚠ Tuần Không                │  ← Cảnh báo Tuần/Triệt
└──────────────────────────────┘
```

## 11.3 Màu sắc & ký hiệu gợi ý

| Trạng thái | Màu      | Ký hiệu |
|------------|----------|---------|
| Miếu       | Vàng đậm | ☀☀☀   |
| Vượng      | Cam      | ☀☀    |
| Đắc        | Xanh lá  | ☀     |
| Bình       | Xám      | –     |
| Hãm        | Đỏ tối   | ☾     |
| Tuần/Triệt | Viền tím | ⊘     |

## 11.4 Chế độ xem gợi ý

- **Lá số tĩnh:** Hiển thị toàn bộ 12 cung, click vào cung để xem chi tiết luận giải.
- **Luận giải cung:** Panel slide-in hiển thị sao, trạng thái, tương tác ngũ hành, góc chiếu và nhận xét.
- **Cách cục panel:** Danh sách cách cục nhận diện được, phân loại Quý/Bình/Hung.
- **Đại hạn / Tiểu hạn:** Overlay thêm vòng vận hạn theo năm (tính năng mở rộng).
