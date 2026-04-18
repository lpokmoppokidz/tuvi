# 03. Database Schema

Mở file này khi cần thiết kế hoặc triển khai schema PostgreSQL/Supabase cho hệ thống.

## Bao gồm

- Entity Relationship Diagram
- Các bảng chính
- Indexes
- Kiểu dữ liệu được lưu cho users, lá số, vận hạn, luận giải

## Khi nào dùng

- Khi viết migration
- Khi cần hiểu dữ liệu lưu ở đâu
- Khi tối ưu query hoặc thiết kế index

## Các bảng chính

- `users`
- `horoscopes`
- `van_hans`
- `sao_master`
- `luuan_gia`
- `user_favorites`
- `user_settings`
- `audit_log`

## Trọng tâm của từng bảng

### `users`

Lưu:

- profile cơ bản
- birth data
- location at birth
- Can Chi đã tính
- Mệnh, Cục, Âm Dương
- metadata và subscription

### `horoscopes`

Lưu:

- thông tin lá số
- 12 cung trên địa bàn
- các bộ tam hợp, tứ hợp
- danh sách sao
- chart natal đầy đủ dạng `JSONB`

### `van_hans`

Lưu:

- dữ liệu vận hạn theo năm
- các cấp hạn
- sao lưu
- scoring và interpretation

### `sao_master` và `luuan_gia`

Đây là bảng reference, dùng cho tra cứu sao và nội dung luận giải.

## Ghi nhớ

- File này là trung tâm nếu bạn đang viết migration.
- Nếu cần API đi qua dữ liệu này thế nào, chuyển sang `04-api-architecture.md`.
