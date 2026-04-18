# 10. Cách cục đặc trưng Nam Tông

Cách cục là **bộ điều kiện sao hội tụ** → tạo ra dự đoán đặc biệt. Đây là đặc trưng lớn nhất phân biệt Nam Tông với Bắc Tông.

## 10.1 Cấu trúc dữ liệu cách cục

```python
@dataclass
class CachCuc:
    name: str                     # Tên cách cục
    required_stars: list[str]     # Sao bắt buộc phải hội tụ
    required_cung: str | None     # Cung cụ thể (None = bất kỳ)
    brightness_min: str           # Trạng thái sáng tối thiểu
    tier: str                     # 'QUY' (quý cách) | 'BINH' | 'TIAN' (bần tiện)
    description: str
```

## 10.2 Một số Cách cục tiêu biểu

### Quý Cách (Cát)

| Tên cách cục              | Điều kiện                                              | Ý nghĩa         |
|---------------------------|--------------------------------------------------------|-----------------|
| Quần thần khánh hội       | Tử Vi + Khôi/Việt + Tả Phụ/Hữu Bật + Khoa/Quyền/Lộc | Phú quý hiển hách|
| Nhật Nguyệt tịnh minh     | Thái Dương Miếu + Thái Âm Miếu                         | Sáng suốt, hiển quý|
| Cự Cơ đồng cung           | Cự Môn + Thiên Cơ cùng cung                            | Mưu lược xuất chúng|
| Tử Phủ triều viên         | Tử Vi + Thiên Phủ chiếu Mệnh                           | Quyền lực, lãnh đạo|

### Bần Tiện Cách (Hung)

| Tên cách cục              | Điều kiện                                    | Ý nghĩa     |
|---------------------------|----------------------------------------------|-------------|
| Lộc phùng lưỡng sát       | Lộc Tồn + Địa Không + Địa Kiếp               | Tán tài      |
| Mã đầu đái kiếm           | Thất Sát tại Dần/Thân + Kình Dương           | Bạo lực, tai nạn|
| Liêm Trinh thất sát       | Liêm Trinh + Thất Sát cùng cung              | Sát phạt, khắc bạch|

## 10.3 Thuật toán dò cách cục

```python
def detect_cach_cuc(la_so: LaSo, cach_cuc_db: list[CachCuc]) -> list[CachCuc]:
    matched = []
    for cach in cach_cuc_db:
        for cung in la_so.cungs:
            # Kiểm tra điều kiện cung cụ thể
            if cach.required_cung and cung.dia_chi != cach.required_cung:
                continue
            # Kiểm tra tất cả sao bắt buộc có mặt (kể cả chiếu)
            stars_in_scope = get_stars_with_aspects(la_so, cung)
            if all(s in stars_in_scope for s in cach.required_stars):
                # Kiểm tra trạng thái sáng tối
                if check_brightness(stars_in_scope, cach.brightness_min):
                    matched.append(cach)
    return matched
```
