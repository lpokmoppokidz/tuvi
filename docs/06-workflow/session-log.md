# Session Log

## 2026-04-16

### Quyết định
- Áp dụng harness agent-level cho repo hiện tại.
- Không dùng nguyên mẫu rule ép `Next.js` và `pnpm` vì repo thực tế đang là `Vite + React 19 + TypeScript + Capacitor 8` và có `package-lock.json`.
- Chuẩn hóa rule để agent phải đọc `AGENTS.md`, `docs/06-workflow/TASK.md`, và `docs/06-workflow/session-log.md` trước khi làm việc.
- Chốt `npm` là package manager chính thức cho repo trong giai đoạn hiện tại; chưa mở task migrate sang `pnpm`.

### Ghi chú kỹ thuật
- Script `cap:build` trong `package.json` hiện vẫn gọi `npm run build`, nên chưa thể khóa cứng `pnpm` nếu chưa migrate repo.
- Tài liệu và script hiện tại của repo đã nhất quán theo `npm`, nên việc tiếp tục dùng `npm` có rủi ro thấp nhất.
- Chưa đụng tới mã nguồn ứng dụng; thay đổi chỉ nằm ở lớp harness và tài liệu điều phối agent.

### Kết quả
- Đã thêm `.codex/config.toml`
- Đã thêm `docs/06-workflow/TASK.md`
- Đã thêm `docs/06-workflow/session-log.md`
- Đã thêm `GEMINI.md`
- Đã thêm `.cursorrules`
