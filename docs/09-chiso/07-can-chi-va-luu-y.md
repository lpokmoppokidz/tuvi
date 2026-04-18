# 07. Can Chi Và Lưu Ý Implement

Mở file này khi cần tra Can Chi, chuyển ngày sang JDN, hoặc kiểm tra các edge case trước khi đưa vào production.

## Bao gồm

- `solarYearToCanChi`
- `YEAR_CANCHI`
- `dateToJDN`
- `solarDateToCanChiDay`
- Edge cases âm lịch
- Lưu ý độ chính xác lý học
- Danh sách hàm còn thiếu
- Export gợi ý

## Khi nào dùng

- Cần chuyển đổi Dương lịch sang Can Chi
- Cần xác minh rủi ro về năm nhuận, tháng nhuận, múi giờ
- Chuẩn bị tách module ra file code thực tế

## Hàm nền tảng

```typescript
function solarYearToCanChi(year: number): {
  stem: HeavenlyStem;
  branch: EarthlyBranch;
}

function dateToJDN(year: number, month: number, day: number): number

function solarDateToCanChiDay(
  year: number,
  month: number,
  day: number,
): { stem: HeavenlyStem; branch: EarthlyBranch }
```

## Bảng tra nhanh

- `YEAR_CANCHI` hiện là bảng tra cứu mẫu cho các năm trong khoảng triển khai.
- Nếu cần độ chính xác tuyệt đối theo lịch pháp, không nên chỉ dựa vào công thức modulo đơn giản.

## Edge cases quan trọng

1. Năm nhuận âm lịch
2. Giờ sinh Can Chi
3. Tháng nhuận
4. Tuổi âm lịch so với tuổi dương lịch

## Lưu ý độ chính xác

- Nên dùng múi giờ Việt Nam `Asia/Ho_Chi_Minh`
- Cần làm rõ theo trường phái lý học nào
- Giờ Tý là `23:00-01:00`, không phải đúng `00:00`

## Những phần còn thiếu cần implement

1. Tính Cung Mệnh từ Can Chi năm sinh
2. Tính Cục số từ Tứ Trụ
3. An sao theo cung
4. Xác định Lưu Niên, Lưu Tháng, Lưu Nhật
5. Hóa giải sát tinh
6. Luận đoán chi tiết 12 cung

## Export gợi ý

Nếu gom về một service chính, export nên bao phủ:

- Core calculation
- Cycle calculations
- Moving stars
- Evaluation
- Utilities
- Data maps
- Enums

## Ghi nhớ

- File này là nơi đọc cuối cùng trước khi chuyển tài liệu thành code production.
- Nếu logic chạy đúng trong demo nhưng lệch ngày hoặc lệch Can Chi ngoài thực tế, kiểm tra file này trước.
