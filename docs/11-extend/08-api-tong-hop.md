# 08. API Tổng Hợp

Mở file này khi cần contract request/response cho endpoint phân tích mở rộng.

## Bao gồm

- `ExtendedAnalysisRequest`
- `ExtendedAnalysisResponse`

## Khi nào dùng

- Khi thiết kế backend API
- Khi viết service frontend
- Khi test request/response

## Request chính

Các field quan trọng:

- `name`
- `birthDate`
- `birthHour`
- `birthMinute`
- `gender`
- `lunarBirth`
- `timezone`
- `modules`
- `partnerChart`
- `forecastRange`
- `language`

## Response chính

Response trả về:

- metadata chart
- kết quả từng module
- `overallAssessment`
- `priorityAlerts`
- `meta`

## Ghi nhớ

- Nếu bạn cần endpoint cho toàn bộ 6 module, mở file này trước.
