# 07 – Quy Trình Luận Vận Hạn Đầy Đủ (Nam + Bắc Tông)

---

## Sơ đồ quy trình

```
INPUT: Lá số đã an đầy đủ + Tuổi hiện tại + Năm hiện tại

BƯỚC 1: Tìm Đại hạn hiện tại
  → getCurrentDaiHan(daiHanList, currentAge)
  → Xác định cung Đại hạn (cungDH)

BƯỚC 2: Tìm Tiểu hạn hiện tại
  → getTieuHanCung(currentAge, gender)
  → Xác định cung Tiểu hạn (cungTH)

BƯỚC 3: Luận Nam Tông
  → Đọc sao tại cungDH (chính + xung + tam hợp)
  → Đọc sao tại cungTH
  → Phát hiện Cách cục trong cung DH/TH
  → Kiểm tra Tuần Không / Triệt Lộ tại 2 cung này

BƯỚC 4: Luận Bắc Tông (Phi Hóa)
  → Lấy Can năm sinh → Tứ Hóa bản mệnh
  → Lấy Can cung DH → Phi Hóa Đại hạn
  → Lấy Can năm hiện tại → Lưu Niên Tứ Hóa
  → Tính Tam Hóa cho 12 cung
  → Tìm cung bị KỴ nhiều lớp (nguy hiểm) và cung được LỘC nhiều lớp (cơ hội)

BƯỚC 5: Tổng hợp
  → Score Nam Tông (cách cục, mật độ sao cát/hung)
  → Score Bắc Tông (Tam Hóa)
  → Output: Tổng đánh giá + Các mảng đời cụ thể (tài, quan, hôn nhân...)
```
