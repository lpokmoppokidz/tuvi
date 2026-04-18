# 08. Row Level Security

Mở file này khi cần xem chính sách truy cập dữ liệu trong Supabase/PostgreSQL.

## Bao gồm

- RLS policies cho `users`
- RLS policies cho `horoscopes`
- RLS policies cho `van_hans`
- RLS policies cho `user_settings`
- RLS policies cho `user_favorites`
- Ghi chú về service role bypass

## Khi nào dùng

- Khi review security database
- Khi viết hoặc sửa policy
- Khi debug lỗi “user không đọc được dữ liệu của chính mình”

## Quy tắc chính

- User chỉ xem và sửa dữ liệu của chính mình
- Lá số public có thể được xem công khai
- Service role bypass RLS

## Ghi nhớ

- Nếu có bug quyền truy cập, file này là nơi kiểm tra đầu tiên.
