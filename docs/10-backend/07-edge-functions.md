# 07. Edge Functions

Mở file này khi cần xem cấu trúc project Supabase Functions và ví dụ implementation.

## Bao gồm

- Project structure
- Edge Function example cho `calculate`
- Edge Function example cho `van-han`

## Khi nào dùng

- Khi bắt đầu viết function mới
- Khi deploy logic server-side
- Khi tách business logic khỏi app client

## Các use case chính

- `calculate` để tính lá số đầy đủ
- `van-han` để tính vận hạn theo năm

## Ghi nhớ

- File này gắn trực tiếp với runtime `Deno`.
- Nếu cần deploy hoặc CI/CD cho functions, xem `10-deployment-va-devops.md`.
