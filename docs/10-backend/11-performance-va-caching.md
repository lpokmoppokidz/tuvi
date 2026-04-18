# 11. Performance Và Caching

Mở file này khi cần chiến lược cache, tối ưu query, hoặc thiết kế index.

## Bao gồm

- Caching layers
- AsyncStorage cache
- Database indexes for performance

## Khi nào dùng

- Khi app chậm
- Khi query trên Supabase bắt đầu nặng
- Khi muốn giảm số lần tính lại lá số hoặc vận hạn

## Cache layers

- Client cache với `AsyncStorage`
- Edge Function cache
- Database query cache
- CDN cache cho nội dung static

## Trọng tâm tối ưu

- Composite indexes
- Partial indexes
- GIN indexes cho `JSONB`
- Full-text search index cho nội dung luận giải

## Ghi nhớ

- Nếu performance có vấn đề, bắt đầu ở file này trước khi đụng logic.
