# 02. Module Giờ Sinh Đặc Biệt

Mở file này khi cần phân tích giờ sinh đặc biệt, nhất là cho trẻ nhỏ hoặc các giờ có mức rủi ro cao.

## Bao gồm

- Mục đích module 1
- Phân loại giờ sinh đặc biệt
- Thuật toán `analyzeSpecialBirthHour`
- Bảng giờ sinh sang ngũ hành
- Ví dụ JSON output

## Khi nào dùng

- Khi chủ mệnh dưới 12 tuổi
- Khi muốn kiểm tra “giờ hung hiểm”
- Khi cần lời khuyên cứu vãn theo cung Phúc Đức

## Nhóm giờ sinh đặc biệt

- Nhóm nguy hiểm nhất
  - `KIM_XA_THIET_TOA`
  - `QUAN_SAT`
- Nhóm bất thường
  - `TUONG_QUAN`
  - `DIEM_VUONG`
  - `DA_DE`
- Nhóm cảnh báo nhẹ
  - `HOA_LINH_NIGHT`
  - `BAC_KY`

## Đầu ra chính

- `category`
- `hourType`
- `riskScore`
- `rescueFactors`
- `warnings`
- `recommendations`
- `survivalYearThreshold`

## Trọng tâm thuật toán

1. Xác định giờ sinh thuộc loại nào
2. Kiểm tra yếu tố cứu vãn ở `Phúc Đức`
3. Kiểm tra tương sinh/tương khắc với mệnh
4. Xác định ngưỡng an toàn theo tuổi
5. Phân loại kết quả cuối

## Ghi nhớ

- Nếu cần cảnh báo sớm cho trẻ nhỏ, đây là file bắt buộc phải đọc.
