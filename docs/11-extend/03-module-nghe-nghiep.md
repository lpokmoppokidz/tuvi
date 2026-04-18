# 03. Module Nghề Nghiệp

Mở file này khi cần gợi ý nghề nghiệp từ lá số theo pattern recognition.

## Bao gồm

- Mục đích module 2
- Các `CareerPattern`
- Thuật toán `analyzeCareerMapping`
- Bảng ngưỡng điểm cho từng pattern

## Khi nào dùng

- Khi muốn định hướng nghề nghiệp
- Khi cần xếp hạng mức phù hợp giữa các nhóm nghề
- Khi muốn sinh `suitableIndustries`, `educationPath`, `forbiddenIndustries`

## Các pattern chính

- `VAN_CHUNG_CACH`
- `VO_CHUNG_CACH`
- `KINH_THUONG_CACH`
- `KY_NGH_CHUNG_CACH`
- `NOI_TRO_CACH`
- `XUAT_QUAN_CACH`
- `THUAT_GIA_CACH`

## Trọng tâm thuật toán

Thuật toán quét tổ hợp sao trong:

- `Mệnh`
- `Quan Lộc`
- `Thiên Di`

Sau đó cộng điểm cho từng pattern rồi chọn:

- `primaryPattern`
- `secondaryPattern`
- `confidenceScore`

## Đầu ra chính

- `recommendations`
- `strengths`
- `weaknesses`
- `suitableIndustries`
- `educationPath`
- `timeline`
- `forbiddenIndustries`

## Ghi nhớ

- Nếu bài toán là “người này hợp nghề gì”, mở file này trước.
