# 3. Lập Địa bàn & Thiên bàn

## 3.1 Địa bàn – 12 cung cố định theo vị trí

Địa bàn là lưới 12 ô cố định, mỗi ô mang một **Địa chi**:

```
┌──────┬──────┬──────┬──────┐
│  Tỵ  │  Ngọ │  Mùi │  Thân│
├──────┼──────┼──────┼──────┤
│  Thìn│      │      │  Dậu │
├──────┼──────┼──────┼──────┤
│  Mão │      │      │  Tuất│
├──────┼──────┼──────┼──────┤
│  Dần │  Sửu │  Tý  │  Hợi │
└──────┴──────┴──────┴──────┘
```

> Chiều đi trên Địa bàn: **Dần → Mão → Thìn → Tỵ → Ngọ → ... → Sửu** (theo chiều thuận).

Mỗi cung Địa chi mang một **Ngũ hành cố định**:

| Chi    | Hành | Chi    | Hành |
|--------|------|--------|------|
| Dần/Mão | Mộc  | Thân/Dậu | Kim  |
| Tỵ/Ngọ  | Hỏa  | Hợi/Tý   | Thủy |
| Thìn/Tuất/Sửu/Mùi | Thổ | | |

## 3.2 An Mệnh cung

```
Thuật toán:
1. Xuất phát tại cung Dần = Tháng 1 (tháng Giêng)
2. Đếm THUẬN theo tháng sinh → đến cung X
3. Từ cung X, đặt giờ Tý
4. Đếm NGHỊCH theo giờ sinh → cung cuối cùng = Mệnh cung
```

Ví dụ: Sinh tháng 3, giờ Mão
- Dần=T1, Mão=T2, Thìn=T3 → dừng tại Thìn
- Từ Thìn: Tý, đếm nghịch: Tý=Thìn, Sửu=Mão, Dần=Dần, Mão=Sửu...
  → Giờ Mão là bước thứ 3 → Mệnh tại **Dần**

## 3.3 An Thân cung

```
Thuật toán:
1. Xuất phát tại cung Dần = Tháng 1
2. Đếm THUẬN theo tháng sinh → đến cung X
3. Từ cung X, đặt giờ Tý
4. Đếm THUẬN theo giờ sinh → cung cuối cùng = Thân cung
```

> Thân cung có thể trùng với Mệnh cung, hoặc rơi vào một trong 6 cung chính (Mệnh, Phúc, Di, Quan, Tài, Tật).

## 3.4 An 12 cung chức danh

Từ **Mệnh cung**, an các cung theo chiều **thuận**:

| Thứ tự | Tên cung      |
|--------|---------------|
| 0      | **Mệnh**      |
| 1      | Phụ Mẫu       |
| 2      | Phúc Đức      |
| 3      | Điền Trạch    |
| 4      | Quan Lộc      |
| 5      | Nô Bộc        |
| 6      | Thiên Di       |
| 7      | Tật Ách        |
| 8      | Tài Bạch       |
| 9      | Tử Tức         |
| 10     | Phu Thê        |
| 11     | Huynh Đệ       |

> **Lưu ý:** Một số tài liệu Nam Tông sắp xếp theo chiều nghịch từ Mệnh. Cần xác nhận trường phái cụ thể trước khi implement. Chuẩn phổ biến nhất đi **thuận** chiều kim đồng hồ.
