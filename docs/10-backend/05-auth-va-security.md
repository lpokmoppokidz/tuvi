# 05. Authentication Và Security

Mở file này khi cần xem flow đăng nhập, cấu hình Supabase Auth, và quản lý bảo mật cơ bản.

## Bao gồm

- Authentication flow
- Supabase Auth configuration
- API key management

## Khi nào dùng

- Khi setup auth
- Khi cần review security
- Khi cần biết client dùng anon key còn Edge Function dùng service role thế nào

## Các điểm chính

- Auth dựa trên `Supabase Auth` và `JWT`
- Mobile client dùng `anon key`
- Edge Functions có thể dùng `service role`
- Cần tách rõ quyền truy cập user thường và service role

## Ghi nhớ

- File này nên đọc cùng `08-rls.md`.
