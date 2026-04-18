# Chỉ Số Vận Hạn

Tài liệu này đã được tách từ một file lớn thành các file nhỏ hơn để dễ đọc, dễ bảo trì, và rõ hơn về mục đích sử dụng của từng phần.

## Dùng file nào khi nào

| Khi bạn cần | Mở file |
|---|---|
| Nắm tổng quan input/output, luồng xử lý toàn bộ | [06-pipeline-va-luan-giai.md](./06-pipeline-va-luan-giai.md) |
| Xem các enum, map nền tảng, độ sáng sao | [01-du-lieu-nen-tang.md](./01-du-lieu-nen-tang.md) |
| Implement Đại hạn, Tiểu hạn, Nguyệt hạn, Nhật hạn | [02-chu-ky-van-han.md](./02-chu-ky-van-han.md) |
| Implement hệ sao lưu, helper di chuyển cung | [03-sao-luu.md](./03-sao-luu.md) |
| Chấm điểm vận hạn, ngũ hành sinh khắc, giải mã sao | [04-danh-gia-va-diem-so.md](./04-danh-gia-va-diem-so.md) |
| Detect cách cục đặc trưng theo sự kiện | [05-cach-cuc-dac-trung.md](./05-cach-cuc-dac-trung.md) |
| Tra Can Chi, JDN, edge cases, lưu ý implement/export | [07-can-chi-va-luu-y.md](./07-can-chi-va-luu-y.md) |

## Thứ tự đọc khuyến nghị

1. Đọc [01-du-lieu-nen-tang.md](./01-du-lieu-nen-tang.md)
2. Đọc [02-chu-ky-van-han.md](./02-chu-ky-van-han.md)
3. Đọc [03-sao-luu.md](./03-sao-luu.md)
4. Đọc [04-danh-gia-va-diem-so.md](./04-danh-gia-va-diem-so.md)
5. Đọc [05-cach-cuc-dac-trung.md](./05-cach-cuc-dac-trung.md)
6. Kết thúc bằng [06-pipeline-va-luan-giai.md](./06-pipeline-va-luan-giai.md) và [07-can-chi-va-luu-y.md](./07-can-chi-va-luu-y.md)

## Ghi chú

- `README.md` giờ chỉ là trang điều hướng.
- Nội dung được chia theo workflow implement thay vì nhồi toàn bộ thuật toán vào một chỗ.
- Nếu sau này cần, có thể tách tiếp `04` và `05` thành file nhỏ hơn theo từng nhóm sao hoặc từng nhóm sự kiện.
