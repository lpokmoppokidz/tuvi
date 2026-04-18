# 01. Tổng Quan Hệ Thống

Mở file này khi cần hiểu bức tranh tổng thể của backend, business logic cốt lõi, và luồng dữ liệu từ input đến output.

## Bao gồm

- Mô hình kiến trúc tổng thể
- Core business logic Tử Vi Bắc Tông
- Data flow từ mobile đến Supabase rồi trả kết quả

## Khi nào dùng

- Khi onboarding vào module backend
- Khi cần giải thích kiến trúc hệ thống cho team
- Khi cần biết backend đang giải quyết bài toán gì

## 1. Mô hình kiến trúc

Kiến trúc gốc gồm:

- `Mobile Client` dùng `React Native Expo`
- `Supabase Auth`
- `Supabase Database`
- `Supabase Edge Functions`
- `Supabase Storage`
- Các external services như email, analytics, push notification

## 2. Core business logic

Các khối nghiệp vụ chính:

- An Mệnh và 12 cung trên địa bàn
- Tam Hợp, Tứ Hợp
- Ngũ Hành tương sinh tương khắc
- 100+ sao cố định và sao lưu
- Vận Hạn nhiều cấp: Đại, Tiểu, Nguyệt, Nhật, Thời
- Cục Số

## 3. Data flow

Luồng xử lý chính:

1. Nhận dữ liệu sinh của người dùng
2. Edge Function `/calculate` tính Can Chi, Mệnh, Cục, 12 cung, sao, vận hạn
3. Lưu kết quả vào database
4. Trả JSON về mobile để đưa vào Redux Store và UI

## Ghi nhớ

- Nếu bạn chưa rõ backend này làm gì, bắt đầu từ file này.
- Nếu cần quyết định công nghệ, chuyển sang `02-technology-stack.md`.
