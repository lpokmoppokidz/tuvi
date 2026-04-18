# Backend System Design

Tài liệu `10-backend` đã được tách từ một file lớn thành các file nhỏ hơn để dễ đọc, dễ điều hướng, và rõ hơn khi nào nên dùng file nào.

## Dùng file nào khi nào

| Khi bạn cần | Mở file |
|---|---|
| Nắm tổng quan hệ thống, business logic, data flow | [01-tong-quan-he-thong.md](./01-tong-quan-he-thong.md) |
| Xem stack công nghệ và quyết định dùng Supabase | [02-technology-stack.md](./02-technology-stack.md) |
| Thiết kế schema database và các bảng chính | [03-database-schema.md](./03-database-schema.md) |
| Xem kiến trúc API và request/response mẫu | [04-api-architecture.md](./04-api-architecture.md) |
| Xem auth, security, API key management | [05-auth-va-security.md](./05-auth-va-security.md) |
| Xem engine thuật toán tính lá số và vận hạn | [06-algorithm-engine.md](./06-algorithm-engine.md) |
| Xem Edge Functions Supabase và cấu trúc project | [07-edge-functions.md](./07-edge-functions.md) |
| Xem Row Level Security policies | [08-rls.md](./08-rls.md) |
| Xem cách frontend tích hợp với backend | [09-frontend-integration.md](./09-frontend-integration.md) |
| Xem deploy, migration, CI/CD | [10-deployment-va-devops.md](./10-deployment-va-devops.md) |
| Xem performance, cache, index | [11-performance-va-caching.md](./11-performance-va-caching.md) |
| Xem cost estimation và scaling path | [12-cost-estimation.md](./12-cost-estimation.md) |
| Xem roadmap triển khai | [13-roadmap.md](./13-roadmap.md) |
| Xem appendix, bảng tra cứu, env vars | [14-appendix.md](./14-appendix.md) |

## Thứ tự đọc khuyến nghị

1. Đọc [01-tong-quan-he-thong.md](./01-tong-quan-he-thong.md)
2. Đọc [02-technology-stack.md](./02-technology-stack.md)
3. Đọc [03-database-schema.md](./03-database-schema.md)
4. Đọc [04-api-architecture.md](./04-api-architecture.md)
5. Đọc [05-auth-va-security.md](./05-auth-va-security.md)
6. Đọc [06-algorithm-engine.md](./06-algorithm-engine.md) và [07-edge-functions.md](./07-edge-functions.md)
7. Kết thúc bằng [08-rls.md](./08-rls.md), [09-frontend-integration.md](./09-frontend-integration.md), [10-deployment-va-devops.md](./10-deployment-va-devops.md), [11-performance-va-caching.md](./11-performance-va-caching.md), [12-cost-estimation.md](./12-cost-estimation.md), [13-roadmap.md](./13-roadmap.md), và [14-appendix.md](./14-appendix.md)

## Ghi chú

- `README.md` giờ chỉ là trang điều hướng.
- Nội dung đã được chia theo workflow thiết kế backend.
- Nếu cần, có thể tách tiếp `03`, `04`, hoặc `06` thành các file nhỏ hơn vì đây là các phần nặng nhất.
