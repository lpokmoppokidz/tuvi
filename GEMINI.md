# Gemini CLI Rules

Trước khi phân tích hoặc sửa code trong repo này, bắt buộc:

1. Đọc `AGENTS.md`.
2. Đọc `docs/06-workflow/TASK.md` và giữ đúng phạm vi đang được chỉ định.
3. Đọc `docs/06-workflow/session-log.md` để tránh lặp lại quyết định cũ.

## Stack hiện tại
- React 19
- Vite
- TypeScript
- Capacitor 8

## Quy ước làm việc
- Tôn trọng stack hiện tại của repo, không giả định đây là dự án Next.js.
- Dùng `npm` cho repo này.
- Không tự ý đổi package manager hoặc refactor quy mô lớn ngoài phạm vi `docs/06-workflow/TASK.md`.
- Nếu gặp lỗi compile hoặc logic, phải ghi ngắn gọn nguyên nhân và cách xử lý vào `docs/06-workflow/session-log.md`.
- Sau khi xong việc, cập nhật lại `docs/06-workflow/TASK.md` nếu trạng thái phiên làm việc thay đổi.
