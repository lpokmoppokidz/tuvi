# Tử Vi Đẩu Số — Vận Hạn Tính Toán Kỹ Thuật Chi Tiết

## Mục Lục

1. [Tổng Quan Hệ Thống Vận Hạn](#1-tổng-quan-hệ-thống-vận-hạn)
2. [Đại Hạn — Chu Kỳ 10 Năm](#2-đại-hạn--chu-kỳ-10-năm)
3. [Tiểu Hạn — Chu Kỳ 1 Năm](#3-tiểu-hạn--chu-kỳ-1-năm)
4. [Nguyệt Hạn — Hạn Tháng](#4-nguyệt-hạn--hạn-tháng)
5. [Nhật Hạn — Hạn Ngày](#5-nhật-hạn--hạn-ngày)
6. [Thời Hạn — Hạn Giờ](#6-thời-hạn--hạn-giờ)
7. [Hệ Thống Lưu Sao — Cửu Phi Tinh](#7-hệ-thống-lưu-sao--cửu-phi-tinh)
8. [Nguyên Tắc Luận Đoán](#8-nguyên-tắc-luận-đoán)
9. [Cấu Trúc Dữ Liệu & Giao Diện Lập Trình](#9-cấu-trúc-dữ-liệu--giao-diện-lập-trình)
10. [Thuật Toán Tổng Hợp](#10-thuật-toán-tổng-hợp)

---

## 1. Tổng Quan Hệ Thống Vận Hạn

### 1.1. Kiến Trúc Tầng

Hệ thống vận hạn trong Tử Vi Đẩu Số được tổ chức theo **5 tầng thời gian lồng nhau**, mỗi tầng có chu kỳ và cơ chế tính riêng biệt:

```
Tầng 5: Đại Hạn  ──→ Mỗi cung = 10 năm  (chu kỳ 120 năm / 12 cung)
Tầng 4: Tiểu Hạn  ──→ Mỗi cung = 1 năm   (chu kỳ 12 năm / 12 cung)
Tầng 3: Nguyệt Hạn ──→ Mỗi cung = 1 tháng (chu kỳ 12 tháng / 12 cung)
Tầng 2: Nhật Hạn  ──→ Mỗi cung = 1 ngày   (chu kỳ 12 ngày / 12 cung)
Tầng 1: Thời Hạn  ──→ Mỗi cung = 1 giờ   (chu kỳ 12 giờ / 12 cung)
```

### 1.2. Mười Hai Cung Trên Địa Bàn

Mười hai cung được sắp xếp trên địa bàn theo chiều thuận (kim đồng hồ), mỗi cung tương ứng với một Chi:

| Thứ tự | Tên Cung   | Ký hiệu | Vị trí góc (độ) |
| ------ | ---------- | ------- | --------------- |
| 1      | Mệnh       | Mệnh    | 0° (Tý)         |
| 2      | Phụ Mẫu    | Phu     | 30° (Sửu)       |
| 3      | Phúc Đức   | Duc     | 60° (Dần)       |
| 4      | Điền Trạch | Tra     | 90° (Mão)       |
| 5      | Quan Lộc   | Quan    | 120° (Thìn)     |
| 6      | Nô Bộc     | No      | 150° (Tỵ)       |
| 7      | Thiên Di   | Tài     | 180° (Ngọ)      |
| 8      | Tài Bạch   | Tue     | 210° (Mùi)      |
| 9      | Tử Tức     | Tu      | 240° (Thân)     |
| 10     | Bảo Quang  | Huong   | 270° (Dậu)      |
| 11     | Đạo Sĩ     | Di      | 300° (Tuất)     |
| 12     | Tật Ách    | Ac      | 330° (Hợi)      |

### 1.3. Ngũ Hành Của Mười Hai Cung

Mỗi cung mang thuộc tính Ngũ Hành, đây là cơ sở để xét tương sinh/tương khắc khi luận đoán:

| Cung     | Hành          | Cung       | Hành |
| -------- | ------------- | ---------- | ---- |
| Mệnh     | Theo Cục Mệnh | Phụ Mẫu    | Thổ  |
| Phúc Đức | Mộc           | Điền Trạch | Thổ  |
| Quan Lộc | Mộc           | Nô Bộc     | Thổ  |
| Thiên Di | Hỏa           | Tài Bạch   | Kim  |
| Tử Tức   | Hỏa           | Bảo Quang  | Kim  |
| Đạo Sĩ   | Thủy          | Tật Ách    | Thủy |

---

## 2. Đại Hạn — Chu Kỳ 10 Năm

### 2.1. Định Nghĩa

Đại hạn là tầng vận hạn lớn nhất, cho biết khung cảnh tổng quát của **10 năm** cuộc đời. Đây là nền tảng để đánh giá xu hướng chung của một giai đoạn dài.

### 2.2. Thuật Toán Xác Định Vị Trí Khởi Đầu

**Nguyên tắc:** Bắt đầu ghi số Cục ngay tại cung An Mệnh.

Bảng tra cứu số khởi đầu theo Cục:

| Cục          | Số bắt đầu | Cục         | Số bắt đầu |
| ------------ | ---------- | ----------- | ---------- |
| Thủy Nhị Cục | 2          | Kim Tứ Cục  | 4          |
| Mộc Tam Cục  | 3          | Thổ Ngũ Cục | 5          |
| Hỏa Lục Cục  | 6          | Thổ Lục Cục | 6          |
| Thủy Bát Cục | 8          | Kim Nhị Cục | 2          |

### 2.3. Thuật Toán Xác Định Chiều Đi

Chiều đi của Đại hạn phụ thuộc vào **giới tính** và **tính âm dương** của lá số:

| Giới tính | Tính  | Chiều đi | Mô tả                   |
| --------- | ----- | -------- | ----------------------- |
| Nam       | Dương | Thuận    | Theo chiều kim đồng hồ  |
| Nữ        | Âm    | Nghịch   | Ngược chiều kim đồng hồ |
| Nam       | Âm    | Nghịch   | Ngược chiều kim đồng hồ |
| Nữ        | Dương | Thuận    | Theo chiều kim đồng hồ  |

**Quy tắc tổng quát:**

```
Nếu (giới tính === "Nam" VÀ âm dương === "Dương")
  HOẶC (giới tính === "Nữ" VÀ âm dương === "Dương")
    → Chiều thuận
Ngược lại
    → Chiều nghịch
```

### 2.4. Thuật Toán Tính Vị Trí Đại Hạn Cho Năm Bất Kỳ

**Đầu vào:**

- `startingCung`: Cung khởi đầu (dựa trên Cục)
- `direction`: "forward" hoặc "backward"
- `currentYear`: Năm hiện tại cần xem
- `birthYear`: Năm sinh

**Các bước:**

```
Bước 1: Tính số năm từ lúc sinh đến năm hiện tại
        age = currentYear - birthYear

Bước 2: Tính số thứ tự Đại hạn (0-indexed)
        daihanIndex = Math.floor(age / 10)

Bước 3: Tính vị trí cung
        IF direction === "forward"
            position = (startingCung + daihanIndex) % 12
        ELSE
            position = (startingCung - daihanIndex + 12) % 12

Bước 4: Xác định năm bắt đầu của Đại hạn
        startYear = birthYear + (daihanIndex * 10)

Bước 5: Tính năm trong Đại hạn
        yearInDaihan = age - (daihanIndex * 10)
        → Giá trị từ 0 đến 9
```

**Ví dụ minh họa:**

- Giới tính: Nam
- Cục: Thủy Nhị Cục → số khởi = 2 → cung khởi = Mệnh
- Năm sinh: 1990
- Năm xem: 2025

```
age = 2025 - 1990 = 35
daihanIndex = floor(35 / 10) = 3
direction = Thuận (Nam Dương)
position = (2 + 3) % 12 = 5 → cung Quan Lộc
startYear = 1990 + 30 = 2020
yearInDaihan = 35 - 30 = 5
→ Đại hạn thứ 4 (index 3), năm thứ 6 trong kỳ, tại cung Quan Lộc (2020-2029)
```

### 2.5. Bảng Mẫu Đại Hạn

Với cung khởi là Mệnh và chiều thuận:

| Đại Hạn số    | Cung       | Năm bắt đầu (từ Mệnh) |
| ------------- | ---------- | --------------------- |
| 1 (index 0)   | Mệnh       | Năm 0–9               |
| 2 (index 1)   | Phụ Mẫu    | Năm 10–19             |
| 3 (index 2)   | Phúc Đức   | Năm 20–29             |
| 4 (index 3)   | Điền Trạch | Năm 30–39             |
| 5 (index 4)   | Quan Lộc   | Năm 40–49             |
| 6 (index 5)   | Nô Bộc     | Năm 50–59             |
| 7 (index 6)   | Thiên Di   | Năm 60–69             |
| 8 (index 7)   | Tài Bạch   | Năm 70–79             |
| 9 (index 8)   | Tử Tức     | Năm 80–89             |
| 10 (index 9)  | Bảo Quang  | Năm 90–99             |
| 11 (index 10) | Đạo Sĩ     | Năm 100–109           |
| 12 (index 11) | Tật Ách    | Năm 110–119           |

---

## 3. Tiểu Hạn — Chu Kỳ 1 Năm

### 3.1. Định Nghĩa

Tiểu hạn dùng để xem biến cố cụ thể xảy ra trong **một năm**. Đây là tầng vận hạn quan trọng nhất trong việc luận đoán sự kiện.

### 3.2. Thuật Toán Xác Định Cung Khởi Tiểu Hạn

Cung khởi Tiểu hạn được xác định dựa trên **Địa chi (Chi) của năm sinh**:

| Địa chi năm sinh | Cung khởi Tiểu hạn |
| ---------------- | ------------------ |
| Dần, Ngọ, Tuất   | Thìn               |
| Thân, Tý, Thìn   | Tuất               |
| Tỵ, Dậu, Sửu     | Mùi                |
| Hợi, Mão, Mùi    | Sửu                |

**Bảng tra cứu số thứ tự cung (0-indexed):**

```
Sửu = 1, Dần = 3, Mão = 4, Thìn = 5, Tỵ = 6, Ngọ = 7
Mùi = 8, Thân = 9, Dậu = 10, Tuất = 11, Hợi = 0
```

### 3.3. Thuật Toán Xác Định Chiều Quay

- **Nam (Đàn ông):** Chiều **thuận** (kim đồng hồ)
- **Nữ (Đàn bà):** Chiều **nghịch** (ngược kim đồng hồ)

### 3.4. Thuật Toán Tính Vị Trí Tiểu Hạn Cho Năm Bất Kỳ

**Đầu vào:**

- `zodiacChi`: Địa chi năm sinh (0-11, 0 = Hợi)
- `gender`: "Nam" hoặc "Nữ"
- `currentYear`: Năm hiện tại cần xem

**Các bước:**

```
Bước 1: Tra cứu cung khởi dựa trên địa chi năm sinh
        startCung = getTieuHanStartCung(zodiacChi)

Bước 2: Xác định chiều quay
        direction = (gender === "Nam") ? "forward" : "backward"

Bước 3: Tính số năm cần di chuyển kể từ năm sinh
        yearsToMove = currentYear - birthYear

Bước 4: Tính vị trí cung Tiểu hạn
        IF direction === "forward"
            position = (startCung + yearsToMove) % 12
        ELSE
            position = (startCung - yearsToMove + 12) % 12
```

**Ví dụ minh họa:**

- Năm sinh: 1990 → Địa chi Hợi → cung khởi = Sửu (số 1)
- Giới tính: Nam → chiều thuận
- Năm xem: 2025

```
yearsToMove = 2025 - 1990 = 35
position = (1 + 35) % 12 = 36 % 12 = 0 → cung Hợi (Tật Ách)
→ Tiểu hạn năm 2025 tại cung Tật Ách
```

### 3.5. Bảng Mẫu Tiểu Hạn (Năm sinh Hợi, Nam, chiều thuận)

| Năm           | offset từ sinh | Cung Tiểu hạn |
| ------------- | -------------- | ------------- |
| Năm sinh + 0  | 0              | Sửu           |
| Năm sinh + 1  | 1              | Dần           |
| Năm sinh + 2  | 2              | Mão           |
| Năm sinh + 3  | 3              | Thìn          |
| Năm sinh + 4  | 4              | Tỵ            |
| Năm sinh + 5  | 5              | Ngọ           |
| Năm sinh + 6  | 6              | Mùi           |
| Năm sinh + 7  | 7              | Thân          |
| Năm sinh + 8  | 8              | Dậu           |
| Năm sinh + 9  | 9              | Tuất          |
| Năm sinh + 10 | 10             | Hợi           |
| Năm sinh + 11 | 11             | Sửu           |

---

## 4. Nguyệt Hạn — Hạn Tháng

### 4.1. Định Nghĩa

Nguyệt hạn cho biết xu hướng của từng **tháng** trong năm xem hạn. Đây là tầng vận hạn thứ 3, chi tiết hóa Tiểu hạn thành từng tháng.

### 4.2. Thuật Toán 3 Bước

Nguyệt hạn có cơ chế tính đặc biệt gồm 3 bước:

**Bước 1 — Xác định cung của tháng Giêng:**

```
Lấy cung của Tiểu hạn năm đó làm tháng Giêng.
Đếm NGHỊCH đến tháng sinh (tính tháng Giêng là 1).
Cung dừng lại chính là cung của tháng Giêng.
```

Công thức:

```
Tháng Giêng = (tieuHanCung - (thangSinh - 1) + 12) % 12
```

Trong đó:

- `thangSinh`: Tháng sinh âm lịch (1–12)
- Đếm nghịch: nghĩa là mỗi bước đi về phía âm trên vòng tròn (Hợi → Tuất → Dậu → ...)

**Bước 2 — Kiểm tra lại cung tháng Giêng:**

```
Từ cung đó gọi là giờ Tý, đếm THUẬN đến giờ sinh.
Cung dừng lại chính là cung của tháng Giêng (xác nhận lại).
```

**Bước 3 — Phân bổ các tháng còn lại:**

```
Từ tháng Giêng, đếm THUẬN mỗi cung một tháng.
Tháng 2 = (Tháng Giêng + 1) % 12
Tháng 3 = (Tháng Giêng + 2) % 12
...
Tháng 12 = (Tháng Giêng + 11) % 12
```

### 4.3. Thuật Toán Chi Tiết

**Đầu vào:**

- `tieuHanCung`: Cung của Tiểu hạn năm xem (0–11)
- `birthMonth`: Tháng sinh âm lịch (1–12)
- `birthHour`: Giờ sinh (1–12, 1 = Tý)

**Các bước:**

```
Bước 1: Đếm nghịch từ Tiểu hạn đến tháng sinh
        Tháng Giêng = tieuHanCung
        FOR i = 1 TO (thangSinh - 1)
            Tháng Giêng = (Tháng Giênh - 1 + 12) % 12  // đếm nghịch
        END FOR

Bước 2: Xác nhận bằng giờ sinh (đếm thuận từ giờ Tý)
        Tháng Giêng_confirm = Tháng Giêng
        IF (Tháng Giêng_confirm + birthHour - 1) % 12 != Tháng Giêng
            // Có lỗi, cần điều chỉnh
            Tháng Giêng = (Tháng Giêng + 1) % 12  // thử điều chỉnh
        END IF

Bước 3: Phân bổ 12 tháng
        FOR thang = 1 TO 12
            cungNguyenHan[thang] = (Tháng Giêng + thang - 1) % 12
        END FOR
```

### 4.4. Ví Dụ Chi Tiết

- Tiểu hạn năm 2025 tại cung Dần (3)
- Tháng sinh: 5 (tháng 5 âm lịch)
- Giờ sinh: 3 (giờ Mão)

```
Bước 1: Đếm nghịch từ cung Dần (3) đến tháng 5
  - Dần (3) → Sửu (1) → Hợi (0) → Tuất (11) → Tháng Giêng = Tuất (11)

Bước 2: Xác nhận bằng giờ sinh (giờ Mão = 3)
  - Từ Tuất (11), đếm thuận: Hợi (0) → Sửu (1) → Mão (2) → Đến Mão = 3 bước
  - Cung dừng = Mão (2) ≠ Tháng Giêng (11) → Lỗi
  - Thử điều chỉnh: Tháng Giêng = (11 + 1) % 12 = 0 (Hợi)
  - Từ Hợi (0), đếm thuận 3 bước: Sửu(1) → Mão(2) → Thìn(4) → Đến giờ Mão = 3 bước
  - Cung dừng = Thìn (4) ≠ Tháng Giêng (0) → Vẫn lỗi, tiếp tục điều chỉnh
  - Thử đến khi: Tháng Giêng = Mão (2)
    Từ Mão (2), đếm thuận 3 bước: Thìn(4) → Tỵ(6) → Ngọ(7) → Đến Mão = 3 bước
    Cung dừng = Ngọ (7) ≠ Tháng Giêng (2) → Thử tiếp
  - Quá trình điều chỉnh cho đến khi khớp

Bước 3: Kết quả → Tháng Giêng = ?, phân bổ 12 tháng
```

---

## 5. Nhật Hạn — Hạn Ngày

### 5.1. Định Nghĩa

Nhật hạn cho biết xu hướng của từng **ngày** trong tháng. Đây là tầng vận hạn thứ 2.

### 5.2. Thuật Toán

**Quy tắc:**

```
Bắt đầu từ cung của Nguyệt hạn tháng đó coi là mùng Một (ngày 1).
Đếm THUẬN mỗi cung là một ngày.
```

**Công thức:**

```
Nhật Hạn(ngày) = (cungNguyenHan[tháng] + ngày - 1) % 12
```

### 5.3. Ví Dụ

- Nguyệt hạn tháng 3 tại cung Mão (4)
- Ngày 7:

```
Nhật Hạn(ngày 7) = (4 + 7 - 1) % 12 = 10 → cung Dậu
→ Ngày 7 tháng 3 có Nhật hạn tại cung Dậu
```

### 5.4. Lưu Ý

- Chu kỳ Nhật hạn là **12 ngày** (mỗi cung ứng với 1 ngày)
- Sau ngày 12, quay lại cung bắt đầu

---

## 6. Thời Hạn — Hạn Giờ

### 6.1. Định Nghĩa

Thời hạn cho biết xu hướng của từng **giờ** trong ngày. Đây là tầng vận hạn chi tiết nhất.

### 6.2. Thuật Toán

**Quy tắc:**

```
Bắt đầu từ cung của Nhật hạn coi là giờ Tý (1 giờ).
Đếm THUẬN mỗi cung là một giờ, theo hàng Chi.
```

**Công thức:**

```
Thời Hạn(giờ) = (cungNhatHan + giờ - 1) % 12
```

### 6.3. Bảng 12 Giờ Chi (Địa Chi Giờ)

| Giờ         | Tên  | Số thứ tự |
| ----------- | ---- | --------- |
| 23:00–01:00 | Tý   | 0         |
| 01:00–03:00 | Sửu  | 1         |
| 03:00–05:00 | Dần  | 2         |
| 05:00–07:00 | Mão  | 3         |
| 07:00–09:00 | Thìn | 4         |
| 09:00–11:00 | Tỵ   | 5         |
| 11:00–13:00 | Ngọ  | 6         |
| 13:00–15:00 | Mùi  | 7         |
| 15:00–17:00 | Thân | 8         |
| 17:00–19:00 | Dậu  | 9         |
| 19:00–21:00 | Tuất | 10        |
| 21:00–23:00 | Hợi  | 11        |

---

## 7. Hệ Thống Lưu Sao — Cửu Phi Tinh

### 7.1. Định Nghĩa

Cửu Phi Tinh là **9 sao lưu động** được an thêm hằng năm khi xem hạn. Chúng dịch chuyển theo quy luật dựa trên Can Chi của năm.

### 7.2. Danh Sách 9 Sao Lưu

| STT | Tên sao        | Ý nghĩa          | Ghi chú                   |
| --- | -------------- | ---------------- | ------------------------- |
| 1   | Lưu Thái Tuế   | Sao chủ quản năm | Nằm tại cung theo Chi năm |
| 2   | Lưu Tang Môn   | Sao họa vặn      | Dịch theo Lưu Thái Tuế    |
| 3   | Lưu Bạch Hổ    | Sao phò ngự      | Dịch theo Lưu Thái Tuế    |
| 4   | Lưu Thiên Khốc | Sao bệnh tật     | Dịch theo Lưu Thái Tuế    |
| 5   | Lưu Thiên Hư   | Sao xấu          | Dịch theo Lưu Thái Tuế    |
| 6   | Lưu Lộc Tồn    | Sao tài lộc      | Dịch theo Lưu Thái Tuế    |
| 7   | Lưu Thiên Mã   | Sao hành         | Dịch theo Lưu Thái Tuế    |
| 8   | Lưu Kình Dương | Sao hung         | Dịch theo Lưu Thái Tuế    |
| 9   | Lưu Đà La      | Sao khốn         | Dịch theo Lưu Thái Tuế    |

### 7.3. Thuật Toán Xác Định Lưu Thái Tuế

**Nguyên tắc:**

```
Lưu Thái Tuế nằm tại cung ứng với địa chi của năm đang xem.
```

| Năm (Địa chi) | Cung Lưu Thái Tuế |
| ------------- | ----------------- |
| Tý            | Tý                |
| Sửu           | Sửu               |
| Dần           | Dần               |
| Mão           | Mão               |
| Thìn          | Thìn              |
| Tỵ            | Tỵ                |
| Ngọ           | Ngọ               |
| Mùi           | Mùi               |
| Thân          | Thân              |
| Dậu           | Dậu               |
| Tuất          | Tuất              |
| Hợi           | Hợi               |

**Công thức:**

```
Lưu Thái Tuế = getChiIndex(namDangXem)
```

### 7.4. Thuật Toán Xác Định Các Sao Lưu Còn Lại

Các sao lưu còn lại được tính theo **quy luật dịch chuyển** từ Lưu Thái Tuế:

**Quy tắc chung:**

```
Vị trí sao Lưu (năm N) = (Lưu Thái Tuế năm N + offsetSao + 12) % 12
```

Bảng offset của từng sao:

| Sao            | Offset cung | Chiều đi | Ghi chú       |
| -------------- | ----------- | -------- | ------------- |
| Lưu Thái Tuế   | 0           | Thuận    | Gốc quy chiếu |
| Lưu Tang Môn   | +4          | Thuận    |               |
| Lưu Bạch Hổ    | -4          | Nghịch   |               |
| Lưu Thiên Khốc | +8 hoặc -4  | Thuận    |               |
| Lưu Thiên Hư   | +8          | Thuận    |               |
| Lưu Lộc Tồn    | +2          | Thuận    |               |
| Lưu Thiên Mã   | +3          | Thuận    |               |
| Lưu Kình Dương | +6          | Thuận    |               |
| Lưu Đà La      | -3          | Nghịch   |               |

### 7.5. Thuật Toán Chi Tiết Tính Toàn Bộ Cửu Phi Tinh

```typescript
interface LiuSao {
  name: string;
  cung: number; // 0-11
  chi: number; // 0-11
}

function calculateCuuPhiTinh(
  namDangXem: number,
  direction: "forward" | "backward",
): LiuSao[] {
  const thaiTueChi = getChiIndex(namDangXem); // Địa chi năm xem
  const offset = direction === "forward" ? 1 : -1;

  const saoLuu = [
    { name: "Lưu Thái Tuế", offset: 0 },
    { name: "Lưu Tang Môn", offset: 4 },
    { name: "Lưu Bạch Hổ", offset: -4 },
    { name: "Lưu Thiên Khốc", offset: 8 },
    { name: "Lưu Thiên Hư", offset: 8 },
    { name: "Lưu Lộc Tồn", offset: 2 },
    { name: "Lưu Thiên Mã", offset: 3 },
    { name: "Lưu Kình Dương", offset: 6 },
    { name: "Lưu Đà La", offset: -3 },
  ];

  return saoLuu.map((sao) => ({
    name: sao.name,
    cung: (thaiTueChi + sao.offset * offset + 12) % 12,
    chi: thaiTueChi,
  }));
}
```

### 7.6. Ví Dụ Tính Toán Cửu Phi Tinh

- Năm xem: 2025 (năm Ất Tỵ, Chi = Tỵ = 6)
- Giới tính: Nam → chiều thuận

```
Lưu Thái Tuế: (6 + 0) % 12 = 6 → cung Tỵ
Lưu Tang Môn: (6 + 4) % 12 = 10 → cung Dậu
Lưu Bạch Hổ: (6 - 4 + 12) % 12 = 2 → cung Dần
Lưu Thiên Khốc: (6 + 8) % 12 = 2 → cung Dần
Lưu Thiên Hư: (6 + 8) % 12 = 2 → cung Dần
Lưu Lộc Tồn: (6 + 2) % 12 = 8 → cung Mùi
Lưu Thiên Mã: (6 + 3) % 12 = 9 → cung Thân
Lưu Kình Dương: (6 + 6) % 12 = 0 → cung Hợi
Lưu Đà La: (6 - 3 + 12) % 12 = 3 → cung Mão
```

---

## 8. Nguyên Tắc Luận Đoán

### 8.1. Tươ Quan Ngũ Hành

**Quy tắc cơ bản:**

```
Hành cung hạn ──sinh──→ Hành Bản Mệnh → TỐT
Hành cung hạn ──khắc──→ Hành Bản Mệnh → XẤU
Hành cung hạn = Hành Bản Mệnh → BÌNH THƯỜNG
```

**Bảng tương quan Ngũ Hành:**

| Hành | Sinh | Bị Sinh | Khắc | Bị Khắc |
| ---- | ---- | ------- | ---- | ------- |
| Kim  | Thủy | Kim     | Mộc  | Hỏa     |
| Mộc  | Hỏa  | Mộc     | Thổ  | Kim     |
| Hỏa  | Thổ  | Hỏa     | Kim  | Thủy    |
| Thủy | Mộc  | Thủy    | Hỏa  | Thổ     |
| Thổ  | Kim  | Thổ     | Thủy | Mộc     |

### 8.2. Sự Phối Hợp Đại Hạn và Tiểu Hạn

**Quy tắc:**

```
Đại hạn TỐT + Tiểu hạn TỐT → Rất tốt, thành công vượt bậc
Đại hạn TỐT + Tiểu hạn XẤU → Đại hạn có thể giải cứu một phần
Đại hạn XẤU + Tiểu hạn TỐT → Tiểu hạn tốt bị chiết giảm đáng kể
Đại hạn XẤU + Tiểu hạn XẤU → Rất xấu, nhiều trở ngại
```

**Thuật toán đánh giá:**

```typescript
function evaluateYearFortune(
  daiHanCung: number,
  tieuHanCung: number,
  saoInDaihan: Sao[],
  saoInTieuhan: Sao[],
  menhHang: string,
): "rất_tốt" | "tốt" | "trung_bình" | "xấu" | "rất_xấu" {
  const daiHanHang = getCungHanh(daiHanCung);
  const tieuHanHang = getCungHanh(tieuHanCung);

  const daiHanScore = evaluateHan(daiHanHang, menhHang);
  const tieuHanScore = evaluateHan(tieuHanHang, menhHang);

  const comboScore = daiHanScore + tieuHanScore;

  if (comboScore >= 8) return "rất_tốt";
  if (comboScore >= 4) return "tốt";
  if (comboScore >= 0) return "trung_bình";
  if (comboScore >= -4) return "xấu";
  return "rất_xấu";
}

function evaluateHan(hanhCung: string, menhHang: string): number {
  if (hanhCung === menhHang) return 0;
  if (sinh(hanhCung, menhHang)) return 2;
  if (khac(hanhCung, menhHang)) return -2;
  return 0;
}
```

### 8.3. Hạn Trùng Phùng

**Định nghĩa:**

```
Đại hạn và Tiểu hạn cùng rơi vào một cung → TRÙNG PHÙNG
```

**Quy tắc:**

```
TRÙNG PHÙNG + cung TỐT → Rất tốt, gia tăng mạnh
TRÙNG PHÙNG + cung XẤU → Rất xấu, tai họa gia tăng
TRÙNG PHÙNG + sao Thiên Không / Địa Không / Địa Kiếp → ĐẶC BIỆT KỴ
```

**Thuật toán phát hiện trùng phùng:**

```typescript
function kiemTraTrungPhung(daiHanCung: number, tieuHanCung: number): boolean {
  return daiHanCung === tieuHanCung;
}

function kiemTraSaoKy(cung: number, saoList: Sao[]): boolean {
  const saoKy = ["Thiên Không", "Địa Không", "Địa Kiếp"];
  return saoList.some((s) => saoKy.includes(s.name) && s.cung === cung);
}
```

### 8.4. Các Sao Đặc Biệt Kỵ Khi Nhập Hạn

| Sao         | Tính chất | Khi nhập cung trùng phùng     |
| ----------- | --------- | ----------------------------- |
| Thiên Không | Hung      | Đặc biệt kỵ, hao tán tiền của |
| Địa Không   | Hung      | Đặc biệt kỵ, mất mát          |
| Địa Kiếp    | Hung      | Đặc biệt kỵ, tai ương         |
| Thiên Tặc   | Hung      | Đặc biệt kỵ, tổn thất lớn     |
| Quan Đới    | Hung nhẹ  | Tranh chấp, kiện tụng         |
| Phá Toái    | Hung      | Phá hủy, tan vỡ               |
| Đào Hoa     | May mắn   | Tình duyệt, hỷ sự             |
| Lộc Tồn     | May mắn   | Tài lộc, thịnh vượng          |
| Thái Tuế    | Trung lập | Tượng trưng năm               |

---

## 9. Cấu Trúc Dữ Liệu & Giao Diện Lập Trình

### 9.1. Các Kiểu Dữ Liệu Cơ Bản

```typescript
// 12 Cung trên địa bàn
enum DiaBanCung {
  Hợi = 0, // Tật Ách
  Sửu = 1, // Phụ Mẫu
  Dần = 2, // Phúc Đức
  Mão = 3, // Điền Trạch
  Thìn = 4, // Quan Lộc
  Tỵ = 5, // Nô Bộc
  Ngọ = 6, // Thiên Di
  Mùi = 7, // Tài Bạch
  Thân = 8, // Tử Tức
  Dậu = 9, // Bảo Quang
  Tuất = 10, // Đạo Sĩ
  Tý = 11, // Mệnh
}

// 12 Địa chi
enum DiaChi {
  Tý = 0,
  Sửu = 1,
  Dần = 2,
  Mão = 3,
  Thìn = 4,
  Tỵ = 5,
  Ngọ = 6,
  Mùi = 7,
  Thân = 8,
  Dậu = 9,
  Tuất = 10,
  Hợi = 11,
}

// 10 Thiên can
enum ThienCan {
  Giáp = 0,
  Ất = 1,
  Bính = 2,
  Đinh = 3,
  Mậu = 4,
  Kỷ = 5,
  Canh = 6,
  Tân = 7,
  Nhâm = 8,
  Quý = 9,
}

// Ngũ hành
enum NguHanh {
  Kim = "Kim",
  Mộc = "Mộc",
  Thủy = "Thủy",
  Hỏa = "Hỏa",
  Thổ = "Thổ",
}

// Giới tính
enum GioiTinh {
  Nam = "Nam",
  Nữ = "Nữ",
}
```

### 9.2. Giao Diện Dữ Liệu

```typescript
interface ThongTinNguoiXem {
  namSinh: number;
  thangSinh: number;
  ngaySinh: number;
  gioSinh: number; // 1-12 (1 = Tý)
  gioiTinh: GioiTinh;
  diaChi: DiaChi; // Địa chi năm sinh
  thienCan: ThienCan; // Thiên can năm sinh
  cuc: number; // Số Cục (1-10)
  cucName: string; // Tên Cục (Thủy nhị cục, Mộc tam cục,...)
  amDuong: "Âm" | "Dương";
  menhHang: NguHanh; // Hành của Bản Mệnh
  cungMenh: DiaBanCung; // Cung An Mệnh
}

interface VanHanResult {
  namXem: number;
  daiHan: DaiHanInfo;
  tieuHan: TieuHanInfo;
  nguyenHan: NguyenHanInfo[];
  nhatHan: NhatHanInfo[];
  cuuPhiTinh: LiuSao[];
  trungPhung: boolean;
  danhGiaChung: string;
  diemTong: number;
}

interface DaiHanInfo {
  so: number; // Số thứ tự Đại hạn (1-12)
  cung: DiaBanCung;
  tenCung: string;
  namBatDau: number;
  namKetThuc: number;
  namTrongKi: number; // 0-9
  hanhCung: NguHanh;
}

interface TieuHanInfo {
  cung: DiaBanCung;
  tenCung: string;
  namXem: number;
  hanhCung: NguHanh;
}

interface NguyenHanInfo {
  thang: number; // 1-12
  cung: DiaBanCung;
  tenCung: string;
}

interface NhatHanInfo {
  ngay: number; // 1-30
  cung: DiaBanCung;
  tenCung: string;
}

interface LiuSao {
  ten: string;
  cung: DiaBanCung;
  tenCung: string;
}
```

---

## 10. Thuật Toán Tổng Hợp

### 10.1. Thuật Toán Chính — Tính Toàn Bộ Vận Hạn

```typescript
function tinhVanHan(thongTin: ThongTinNguoiXem, namXem: number): VanHanResult {
  // Bước 1: Xác định chiều đi của Đại hạn
  const daiHanDirection = getDaiHanDirection(
    thongTin.gioiTinh,
    thongTin.amDuong,
  );

  // Bước 2: Tính Đại hạn
  const daiHan = tinhDaiHan(
    thongTin.cungMenh,
    thongTin.cuc,
    thongTin.namSinh,
    namXem,
    daiHanDirection,
  );

  // Bước 3: Tính Tiểu hạn
  const tieuHan = tinhTieuHan(
    thongTin.diaChi,
    thongTin.gioiTinh,
    thongTin.namSinh,
    namXem,
  );

  // Bước 4: Tính Nguyệt hạn cho 12 tháng
  const nguyenHan = tinhNguyenHan(
    tieuHan.cung,
    thongTin.thangSinh,
    thongTin.gioSinh,
  );

  // Bước 5: Tính Nhật hạn (cho tháng hiện tại)
  const nhatHan = tinhNhatHan(nguyenHan[thongTin.thangSinh - 1].cung);

  // Bước 6: Tính Cửu Phi Tinh
  const cuuPhiTinh = tinhCuuPhiTinh(namXem, daiHanDirection);

  // Bước 7: Kiểm tra trùng phùng
  const trungPhung = kiemTraTrungPhung(daiHan.cung, tieuHan.cung);

  // Bước 8: Đánh giá tổng quát
  const diemTong = tinhDiemTong(daiHan, tieuHan, cuuPhiTinh, thongTin.menhHang);
  const danhGiaChung = danhGiaVanHan(diemTong, trungPhung);

  return {
    namXem,
    daiHan,
    tieuHan,
    nguyenHan,
    nhatHan,
    cuuPhiTinh,
    trungPhung,
    danhGiaChung,
    diemTong,
  };
}
```

### 10.2. Hàm Phụ Trợ

```typescript
// Xác định chiều đi của Đại hạn
function getDaiHanDirection(
  gioiTinh: GioiTinh,
  amDuong: "Âm" | "Dương",
): "forward" | "backward" {
  if (gioiTinh === GioiTinh.Nam && amDuong === "Dương") return "forward";
  if (gioiTinh === GioiTinh.Nữ && amDuong === "Dương") return "forward";
  return "backward";
}

// Xác định cung khởi Đại hạn từ Cục
function getDaiHanStartCung(cuc: number): DiaBanCung {
  const bangTra: Record<number, DiaBanCung> = {
    2: DiaBanCung.Tý, // Thủy nhị cục
    3: DiaBanCung.Sửu, // Mộc tam cục
    4: DiaBanCung.Dần, // Kim tứ cục
    5: DiaBanCung.Thìn, // Thổ ngũ cục
    6: DiaBanCung.Ngọ, // Hỏa lục cục
    8: DiaBanCung.Mùi, // Thủy bát cục
  };
  return bangTra[cuc] ?? DiaBanCung.Tý;
}

// Xác định cung khởi Tiểu hạn từ địa chi năm sinh
function getTieuHanStartCung(diaChi: DiaChi): DiaBanCung {
  const bangTra: Record<number, DiaBanCung> = {
    3: DiaBanCung.Thìn, // Dần
    7: DiaBanCung.Thìn, // Ngọ
    11: DiaBanCung.Thìn, // Tuất
    8: DiaBanCung.Tuất, // Thân
    0: DiaBanCung.Tuất, // Tý
    4: DiaBanCung.Tuất, // Thìn
    5: DiaBanCung.Mùi, // Tỵ
    9: DiaBanCung.Mùi, // Dậu
    1: DiaBanCung.Mùi, // Sửu
    10: DiaBanCung.Sửu, // Tuất
    3: DiaBanCung.Sửu, // Mão (lỗi trong bảng gốc, đã sửa)
    7: DiaBanCung.Sửu, // Mùi
  };
  return bangTra[diaChi] ?? DiaBanCung.Sửu;
}

// Tính cung từ index với chiều đi
function tinhCung(
  position: number,
  direction: "forward" | "backward",
  steps: number,
): number {
  if (direction === "forward") {
    return (position + steps) % 12;
  } else {
    return (position - steps + 12) % 12;
  }
}
```

### 10.3. Sơ Đồ Luồng Tính Toán

```
                ┌──────────────────────┐
                │   ĐẦU VÀO           │
                │ - Thông tin người xem│
                │ - Năm cần xem        │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 1. ĐẠI HẠN           │
                │ - Cung khởi (Cục)    │
                │ - Chiều đi          │
                │ - Tính vị trí        │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 2. TIỂU HẠN          │
                │ - Cung khởi (Chi)    │
                │ - Chiều quay         │
                │ - Tính vị trí        │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 3. NGUYỆT HẠN       │
                │ - 3 bước đặc biệt   │
                │ - 12 tháng          │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 4. NHẬT HẠN          │
                │ - Từ Nguyệt hạn      │
                │ - 30 ngày           │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 5. THỜI HẠN          │
                │ - Từ Nhật hạn        │
                │ - 12 giờ            │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 6. CỬU PHI TINH      │
                │ - Lưu Thái Tuế       │
                │ - 8 sao lưu còn lại  │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │ 7. LUẬN ĐOÁN         │
                │ - Trùng phùng?       │
                │ - Ngũ hành           │
                │ - Đánh giá tổng      │
                └──────────┬───────────┘
                           │
                           ▼
                ┌──────────────────────┐
                │   ĐẦU RA             │
                │ - VanHanResult       │
                └──────────────────────┘
```

### 10.4. Danh Sách Các Hàm Cần Triển Khai

| Hàm                   | Mô tả                          | Đầu vào                                             | Đầu ra            |
| --------------------- | ------------------------------ | --------------------------------------------------- | ----------------- |
| `tinhVanHan()`        | Hàm chính tính toàn bộ vận hạn | `ThongTinNguoiXem`, `namXem`                        | `VanHanResult`    |
| `tinhDaiHan()`        | Tính Đại hạn                   | `cungMenh`, `cuc`, `namSinh`, `namXem`, `direction` | `DaiHanInfo`      |
| `tinhTieuHan()`       | Tính Tiểu hạn                  | `diaChi`, `gioiTinh`, `namSinh`, `namXem`           | `TieuHanInfo`     |
| `tinhNguyenHan()`     | Tính Nguyệt hạn 12 tháng       | `tieuHanCung`, `thangSinh`, `gioSinh`               | `NguyenHanInfo[]` |
| `tinhNhatHan()`       | Tính Nhật hạn                  | `nguyenHanCung`                                     | `NhatHanInfo[]`   |
| `tinhCuuPhiTinh()`    | Tính Cửu Phi Tinh              | `namXem`, `direction`                               | `LiuSao[]`        |
| `danhGiaVanHan()`     | Đánh giá tổng quát vận hạn     | `diemTong`, `trungPhung`                            | `string`          |
| `tinhDiemTong()`      | Tính điểm tổng hợp             | `daiHan`, `tieuHan`, `cuuPhiTinh`, `menhHang`       | `number`          |
| `kiemTraTrungPhung()` | Kiểm tra trùng phùng           | `daiHanCung`, `tieuHanCung`                         | `boolean`         |
| `kiemTraSaoKy()`      | Kiểm tra sao kỵ                | `cung`, `saoList`                                   | `boolean`         |
| `sinhHanh()`          | Kiểm tra tương sinh            | `hanh1`, `hanh2`                                    | `boolean`         |
| `khacHanh()`          | Kiểm tra tương khắc            | `hanh1`, `hanh2`                                    | `boolean`         |
| `layTenCung()`        | Lấy tên cung                   | `cungIndex`                                         | `string`          |
| `layHanhCung()`       | Lấy hành của cung              | `cungIndex`                                         | `NguHanh`         |

---

## Phụ Lục A — Bảng Tra Cứu Nhanh

### A.1. Cung khởi Đại hạn theo Cục

| Cục          | Tên đầy đủ   | Cung khởi | Số  |
| ------------ | ------------ | --------- | --- |
| Thủy Nhị Cục | Thủy nhị cục | Tý        | 2   |
| Mộc Tam Cục  | Mộc tam cục  | Sửu       | 3   |
| Kim Tứ Cục   | Kim tứ cục   | Dần       | 4   |
| Thổ Ngũ Cục  | Thổ ngũ cục  | Thìn      | 5   |
| Hỏa Lục Cục  | Hỏa lục cục  | Ngọ       | 6   |
| Thổ Lục Cục  | Thổ lục cục  | Ngọ       | 6   |
| Thủy Bát Cục | Thủy bát cục | Mùi       | 8   |
| Kim Nhị Cục  | Kim nhị cục  | Tý        | 2   |

### A.2. Cung khởi Tiểu hạn theo địa chi năm sinh

| Địa chi        | Cung khởi |
| -------------- | --------- |
| Dần, Ngọ, Tuất | Thìn      |
| Thân, Tý, Thìn | Tuất      |
| Tỵ, Dậu, Sửu   | Mùi       |
| Hợi, Mão, Mùi  | Sửu       |

### A.3. Ngũ hành của 12 cung

| Cung     | Hành     | Cung       | Hành |
| -------- | -------- | ---------- | ---- |
| Mệnh     | Theo Cục | Phụ Mẫu    | Thổ  |
| Phúc Đức | Mộc      | Điền Trạch | Thổ  |
| Quan Lộc | Mộc      | Nô Bộc     | Thổ  |
| Thiên Di | Hỏa      | Tài Bạch   | Kim  |
| Tử Tức   | Hỏa      | Bảo Quang  | Kim  |
| Đạo Sĩ   | Thủy     | Tật Ách    | Thủy |

### A.4. Offset Cửu Phi Tinh

| Sao            | Offset | Chiều  |
| -------------- | ------ | ------ |
| Lưu Thái Tuế   | +0     | Gốc    |
| Lưu Tang Môn   | +4     | Thuận  |
| Lưu Bạch Hổ    | -4     | Nghịch |
| Lưu Thiên Khốc | +8     | Thuận  |
| Lưu Thiên Hư   | +8     | Thuận  |
| Lưu Lộc Tồn    | +2     | Thuận  |
| Lưu Thiên Mã   | +3     | Thuận  |
| Lưu Kình Dương | +6     | Thuận  |
| Lưu Đà La      | -3     | Nghịch |

---

## Phụ Lục B — Ví Dụ Hoàn Chỉnh

### B.1. Dữ liệu đầu vào

```
Họ tên: Nguyễn Văn A
Năm sinh: 1990 (Canh Ngọ)
Tháng sinh: 5 (âm lịch)
Ngày sinh: 15
Giờ sinh: Giờ Mão (3)
Giới tính: Nam
Cục: Thủy Nhị Cục (số 2)
Cung An Mệnh: Tý (Mệnh)
Hành Bản Mệnh: Thủy
Âm Dương: Dương
```

### B.2. Kết quả tính cho năm 2025

**Bước 1 — Đại hạn:**

```
Năm xem: 2025
Tuổi: 2025 - 1990 = 35
Đại hạn số: floor(35/10) = 3 → Đại hạn thứ 4
Cung khởi: Tý (số 2 của Thủy Nhị Cục)
Chiều đi: Thuận (Nam Dương)
Position: (11 + 3) % 12 = 2 → cung Dần (Phúc Đức)
Năm trong kỳ: 35 - 30 = 5
→ Đại hạn thứ 4, năm thứ 6 (2020-2029), tại cung Phúc Đức
```

**Bước 2 — Tiểu hạn:**

```
Năm sinh 1990 → Chi Hợi → cung khởi = Sửu
Chiều quay: Thuận (Nam)
Năm cần di chuyển: 35
Position: (1 + 35) % 12 = 0 → cung Hợi (Tật Ách)
→ Tiểu hạn năm 2025 tại cung Tật Ách
```

**Bước 3 — Nguyệt hạn:**

```
Cung Tiểu hạn: Hợi (0)
Tháng sinh: 5
Đếm nghịch từ Hợi đến tháng 5:
  Hợi → Tuất → Dậu → Thân → Mùi → Tháng Giêng = Mùi (7)
Đếm thuận từ Mùi đến giờ Mão (3):
  Mùi → Thân → Dậu → Đến giờ Mão = 3 bước → cung Thân
Xác nhận Tháng Giêng = Thân
Phân bổ:
  Tháng 1: Thân, Tháng 2: Dậu, Tháng 3: Tuất
  Tháng 4: Hợi, Tháng 5: Sửu, Tháng 6: Dần
  Tháng 7: Mão, Tháng 8: Thìn, Tháng 9: Tỵ
  Tháng 10: Ngọ, Tháng 11: Mùi, Tháng 12: Thân
```

**Bước 4 — Nhật hạn (tháng 5):**

```
Cung Nguyệt hạn tháng 5: Sửu (1)
Nhật hạn mùng 1: Sửu, mùng 2: Dần, ..., mùng 12: Hợi
```

**Bước 5 — Cửu Phi Tinh năm 2025:**

```
Năm 2025 = Ất Tỵ → Chi Tỵ (5)
Lưu Thái Tuế: Tỵ (5)
Lưu Tang Môn: (5+4)%12 = 9 → Dậu
Lưu Bạch Hổ: (5-4+12)%12 = 1 → Sửu
Lưu Thiên Khốc: (5+8)%12 = 1 → Sửu
Lưu Thiên Hư: (5+8)%12 = 1 → Sửu
Lưu Lộc Tồn: (5+2)%12 = 7 → Mùi
Lưu Thiên Mã: (5+3)%12 = 8 → Thân
Lưu Kình Dương: (5+6)%12 = 11 → Hợi
Lưu Đà La: (5-3+12)%12 = 2 → Dần
```

**Bước 6 — Luận đoán:**

```
Đại hạn: cung Phúc Đức (Mộc)
Tiểu hạn: cung Tật Ách (Thủy)
Hành Phúc Đức (Mộc) sinh Hành Tật Ách (Thủy) → TƯƠNG SINH
Hành Tật Ách (Thủy) sinh Hành Bản Mệnh (Thủy) → ĐỒNG HÀNH
Trùng phùng: KHÔNG (Dần ≠ Hợi)
Sao kỵ tại cung trùng phùng: KHÔNG CÓ
→ Năm 2025: Vận hạn TỐT TRUNG BÌNH, có cơ hội phát triển nhưng cần cẩn thận sức khỏe
```
