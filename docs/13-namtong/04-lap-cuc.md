# 4. Lập Cục

Cục là **hệ số nền** quyết định vị trí sao Tử Vi và vòng Tràng Sinh.

## 4.1 Quy tắc lập Cục

Dựa vào **Can năm sinh** và **Địa chi của cung Mệnh**:

| Can năm | Cung Mệnh tại Chi... | Cục         |
|---------|----------------------|-------------|
| Giáp/Kỷ | Dần/Ngọ/Tuất        | Hỏa lục cục |
| Giáp/Kỷ | Thân/Tý/Thìn        | Thủy nhị cục|
| Ất/Canh | Dần/Ngọ/Tuất        | Kim tứ cục  |
| Ất/Canh | Thân/Tý/Thìn        | Thổ ngũ cục |
| Bính/Tân | Dần/Ngọ/Tuất       | Mộc tam cục |
| ...     | ...                  | ...         |

> Đây là bảng rút gọn — cần hardcode bảng đầy đủ 10 Can × 4 nhóm Chi.

## 4.2 Tên và số cục

| Tên cục       | Số cục | Ý nghĩa kỹ thuật              |
|---------------|--------|-------------------------------|
| Thủy nhị cục  | 2      | Tử Vi khởi từ ngày thứ 2     |
| Mộc tam cục   | 3      | Tử Vi khởi từ ngày thứ 3     |
| Kim tứ cục    | 4      | Tử Vi khởi từ ngày thứ 4     |
| Thổ ngũ cục   | 5      | Tử Vi khởi từ ngày thứ 5     |
| Hỏa lục cục   | 6      | Tử Vi khởi từ ngày thứ 6     |

Số cục được dùng trực tiếp trong thuật toán tìm vị trí sao **Tử Vi**.
