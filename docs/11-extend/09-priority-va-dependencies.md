# 09. Priority Và Dependencies

Mở file này khi cần lên kế hoạch triển khai và hiểu phụ thuộc giữa các module.

## Bao gồm

- Thứ tự ưu tiên triển khai
- Module dependency graph
- Database schema đề xuất
- Validation rules

## Khi nào dùng

- Khi planning sprint
- Khi chia phase triển khai
- Khi thiết kế schema cho phần mở rộng

## Thứ tự ưu tiên

### Giai đoạn 1

- Scoring Engine
- Crisis Alert
- Medical Astrology
- Birth Hour Analysis

### Giai đoạn 2

- Career Mapping
- Auspicious Timing
- Compatibility

### Giai đoạn 3

- Visualization
- Multi-chart comparison
- Historical matching
- AI-powered interpretation

## Dependency graph

`ScoringEngine` là trung tâm, các module còn lại đều phụ thuộc vào nó.

## Schema đề xuất

Tài liệu gốc đề xuất thêm các bảng:

- `natal_charts`
- `priority_alerts`
- `auspicious_timing_cache`

## Validation rules

- `birthHour` từ `1–12`
- `birthDate` hợp lệ
- `forecastRange` trong ngưỡng cho phép
- `moduleNames` phải nằm trong danh sách được hỗ trợ

## Ghi nhớ

- Nếu cần triển khai thực tế, đây là file nên đọc cùng `08-api-tong-hop.md`.
