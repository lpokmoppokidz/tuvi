# 13. Checklist triển khai

## Phase 1 – Nền tảng
- [ ] Implement chuyển đổi Dương → Âm lịch (kiểm tra tháng nhuận)
- [ ] Bảng 60 Hoa Giáp → Nạp âm ngũ hành
- [ ] Xác định Can/Chi năm, tháng, ngày, giờ
- [ ] Tính Âm Dương tuổi, chiều đếm
- [ ] An Mệnh cung, Thân cung
- [ ] An 12 cung chức danh

## Phase 2 – An sao
- [ ] Lập Cục (5 loại)
- [ ] An 14 Chính tinh (Hệ Tử Vi + Hệ Thiên Phủ)
- [ ] An vòng Thái Tuế (12 sao)
- [ ] An vòng Lộc Tồn + Kình Đà (12 sao)
- [ ] An vòng Tràng Sinh (12 sao)
- [ ] An Xương Khúc, Không Kiếp (theo giờ)
- [ ] An Tả Phụ, Hữu Bật (theo tháng)
- [ ] An Tam Thai, Bát Tọa, Ân Quang, Thiên Quý (theo ngày)
- [ ] An còn lại ~50+ phụ tinh khác

## Phase 3 – Tương tác
- [ ] Hardcode bảng trạng thái sao × 12 cung (~100 sao)
- [ ] Xác định Tuần Không, Triệt Lộ
- [ ] Áp dụng Tuần/Triệt lên trạng thái sao
- [ ] Tính góc chiếu (xung, tam hợp, nhị hợp)
- [ ] Tính tương quan Ngũ hành Cung–Sao–Mệnh

## Phase 4 – Cách cục & Hiển thị
- [ ] Xây dựng database cách cục (tối thiểu 30–50 cách)
- [ ] Thuật toán dò cách cục (kể cả chiếu)
- [ ] UI bàn 12 cung 4×3
- [ ] Panel chi tiết từng cung
- [ ] Panel cách cục tổng hợp

## Phase 5 – Nâng cao
- [ ] Đại hạn (vận 10 năm)
- [ ] Tiểu hạn (vận 1 năm)
- [ ] Lưu lịch sử lá số
- [ ] Export PDF

---

## Ghi chú dành cho lập trình viên

> **Bảng trạng thái sao (Miếu/Vượng/Đắc/Hãm)** là phần dữ liệu lớn và quan trọng nhất.  
> Khuyến nghị lưu dưới dạng JSON/YAML tách biệt để dễ bảo trì.

> **Tháng nhuận (tháng âm lịch trùng)** là nguồn lỗi phổ biến nhất.  
> Cần kiểm tra kỹ thuật toán chuyển đổi Âm lịch với các ca sinh nhật trong tháng nhuận.

> **Chiều đếm** (thuận/nghịch) phụ thuộc Âm/Dương + Giới tính và ảnh hưởng đến nhiều vòng sao.  
> Nên tạo helper `count_cung(start, steps, direction)` dùng chung toàn hệ thống.

```python
def count_cung(start_index: int, steps: int, direction: str) -> int:
    """
    start_index: 0-11 (index trong mảng 12 cung)
    steps: số bước đếm
    direction: 'thuan' hoặc 'nghich'
    """
    if direction == 'thuan':
        return (start_index + steps) % 12
    else:
        return (start_index - steps + 12 * 10) % 12
```

---

*README này được sinh từ tài liệu lý học Nam Tông và sẽ được cập nhật khi có thêm script nguồn.*
