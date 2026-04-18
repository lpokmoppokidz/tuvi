# 01. Scoring Engine Trung Tâm

Mở file này khi cần hiểu nền tảng chấm điểm chung mà tất cả module mở rộng đều dựa vào.

## Bao gồm

- Nguyên lý hoạt động
- Bảng điểm sao cơ bản
- Combo multipliers
- Cấu trúc dữ liệu lá số mở rộng

## Khi nào dùng

- Trước khi triển khai bất kỳ module mở rộng nào
- Khi cần sửa logic điểm số tổng
- Khi cần hiểu `badge`, `activeCombos`, `overall score`

## Nguyên lý hoạt động

```text
Điểm cung
= điểm sao hiện có
+ điểm bộ sao
+ điểm tam hóa
+ điểm ngũ hành sinh/khắc
+ điểm vị trí
```

## Mức phân loại

- `quy_cach` nếu `>= 80`
- `binh_cach` nếu `40–79`
- `luc_bai` nếu `10–39`
- `hung_cach` nếu `< 10`

## Nhóm sao và điểm cơ bản

- `Tứ Linh`
- `Tứ Văn`
- `Lục Tài`
- `Tứ Sát`
- `Lục Bại`
- `Cát Tinh`
- `Hung Tinh`

## Combo multipliers

Scoring engine có các luật kiểu:

- `Tứ Linh hội tụ`
- `Trúc La tụ hội`
- `Xương Khúc tại Mệnh`

Các luật này có:

- `comboId`
- `requiredStars`
- `multiplier`
- `condition`
- `label`

## Dữ liệu lá số mở rộng

`ExtendedNatalChart` trong tài liệu gốc bao gồm:

- dữ liệu cơ bản
- 12 cung chính
- cung chiếu
- scores
- kết quả của cả 6 module

## Ghi nhớ

- Đây là file phải đọc đầu tiên trong `11-extend`.
- Nếu điểm tổng bị sai, kiểm tra file này trước khi kiểm tra từng module riêng.
