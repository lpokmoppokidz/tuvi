# Tử Vi Đẩu Số – Nam Tông (Nam Phái) — Developer README

> Tài liệu kỹ thuật dành cho lập trình viên xây dựng hệ thống lập và luận giải lá số Tử Vi theo trường phái **Nam Tông**.  
> Nguồn lý học tham khảo: *Tử Vi Đẩu Số Tân Biên*, *Tử Vi Chính Biện*.

---

## Mục lục

1. [Tổng quan hệ thống](#1-tổng-quan-hệ-thống)
2. [Đầu vào & Tiền xử lý](#2-đầu-vào--tiền-xử-lý)
3. [Lập Địa bàn & Thiên bàn](#3-lập-địa-bàn--thiên-bàn)
4. [Lập Cục](#4-lập-cục)
5. [An sao – 14 Chính tinh](#5-an-sao--14-chính-tinh)
6. [An sao – Phụ tinh & Vòng sao](#6-an-sao--phụ-tinh--vòng-sao)
7. [An sao theo Giờ / Ngày / Tháng](#7-an-sao-theo-giờ--ngày--tháng)
8. [Tuần Trung & Triệt Lộ](#8-tuần-trung--triệt-lộ)
9. [Tương tác & Luận giải](#9-tương-tác--luận-giải)
10. [Cách cục đặc trưng Nam Tông](#10-cách-cục-đặc-trưng-nam-tông)
11. [Giao diện hiển thị (UI/UX)](#11-giao-diện-hiển-thị-uiux)
12. [Kiến trúc dữ liệu gợi ý](#12-kiến-trúc-dữ-liệu-gợi-ý)
13. [Checklist triển khai](#13-checklist-triển-khai)

---

## 1. Tổng quan hệ thống

Lá số Tử Vi Nam Tông là một **ma trận 12 cung** (Địa chi) xếp thành hình vuông 4×3, trên đó an hơn **100 vì sao** theo các tọa độ kỹ thuật từ thông tin sinh nhật của chủ nhân.

Khác với **Bắc Tông** (tập trung vào biến hóa Tứ Hóa), **Nam Tông** nhấn mạnh vào:
- Mật độ sao dày đặc (số lượng sao nhiều hơn)
- Trạng thái Miếu/Vượng/Đắc/Hãm của từng sao
- Sự hội tụ của các **Cách cục** (bộ sao kết hợp)
- Tương quan Ngũ hành giữa Cung – Sao – Mệnh

### Luồng xử lý tổng thể

```
[INPUT: Ngày/Giờ/Tháng/Năm sinh dương lịch + Giới tính]
        |
        v
[BƯỚC 1] Chuyển sang Âm lịch → Xác định Can Chi năm/tháng/ngày/giờ
        |
        v
[BƯỚC 2] Xác định Âm/Dương tuổi, Bản Mệnh (Nạp âm ngũ hành)
        |
        v
[BƯỚC 3] An Mệnh cung, Thân cung → Xác định 12 cung chức danh
        |
        v
[BƯỚC 4] Lập Cục (Thủy nhị / Mộc tam / Kim tứ / Thổ ngũ / Hỏa lục)
        |
        v
[BƯỚC 5] An 14 Chính tinh (Hệ Tử Vi + Hệ Thiên Phủ)
        |
        v
[BƯỚC 6] An Phụ tinh (Vòng Thái Tuế, Lộc Tồn, Tràng Sinh, ...)
        |
        v
[BƯỚC 7] An sao theo Giờ / Ngày / Tháng sinh
        |
        v
[BƯỚC 8] Xác định Tuần Trung, Triệt Lộ
        |
        v
[BƯỚC 9] Tính trạng thái sáng/tối, Ngũ hành tương tác, Góc chiếu
        |
        v
[OUTPUT] Lá số hoàn chỉnh + Nhận diện Cách cục
```

---

## 2. Đầu vào & Tiền xử lý

### 2.1 Dữ liệu đầu vào

| Trường           | Kiểu      | Ghi chú                                          |
|------------------|-----------|--------------------------------------------------|
| `birth_date`     | `Date`    | Ngày sinh dương lịch                             |
| `birth_hour`     | `string`  | Giờ theo 12 Chi (Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi) |
| `gender`         | `enum`    | `NAM` hoặc `NỮ` (ảnh hưởng cách đếm chiều vận) |
| `solar_or_lunar` | `boolean` | Mặc định: dương lịch → cần convert                |

### 2.2 Chuyển đổi Dương lịch → Âm lịch

Dùng thuật toán chuyển đổi Âm Dương lịch chuẩn (ví dụ: thư viện `lunar-calendar` hoặc implement theo giải thuật Hong Kong Observatory).

Đầu ra cần:
- `lunar_day` – ngày âm
- `lunar_month` – tháng âm (lưu ý tháng nhuận)
- `lunar_year` – năm âm
- `year_can` – Can năm (Giáp/Ất/Bính/Đinh/Mậu/Kỷ/Canh/Tân/Nhâm/Quý)
- `year_chi` – Chi năm (Tý/Sửu/.../Hợi)
- `birth_chi_hour` – Chi giờ sinh

### 2.3 Xác định Âm Dương tuổi

```
Can Dương (phát sáng): Giáp, Bính, Mậu, Canh, Nhâm
Can Âm  (phát tối):   Ất, Đinh, Kỷ, Tân, Quý
```

Âm Dương của tuổi kết hợp với **giới tính** để xác định chiều đếm cung:
- Nam Dương / Nữ Âm → đếm **thuận** (chiều kim đồng hồ trên bàn Địa chi)
- Nam Âm / Nữ Dương → đếm **nghịch**

### 2.4 Tìm Bản Mệnh (Nạp âm)

Dựa vào bảng **Lục thập Hoa Giáp** (Can Chi năm sinh → Nạp âm ngũ hành):

```
VD: Giáp Tý, Ất Sửu → Kim (Hải trung kim)
    Bính Dần, Đinh Mão → Hỏa (Lô trung hỏa)
    ... (60 cặp, cần hardcode bảng đầy đủ)
```

Bản Mệnh được dùng để tính **tương quan Sao sinh/khắc Mệnh** khi luận giải.

---

## 3. Lập Địa bàn & Thiên bàn

### 3.1 Địa bàn – 12 cung cố định theo vị trí

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

### 3.2 An Mệnh cung

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

### 3.3 An Thân cung

```
Thuật toán:
1. Xuất phát tại cung Dần = Tháng 1
2. Đếm THUẬN theo tháng sinh → đến cung X
3. Từ cung X, đặt giờ Tý
4. Đếm THUẬN theo giờ sinh → cung cuối cùng = Thân cung
```

> Thân cung có thể trùng với Mệnh cung, hoặc rơi vào một trong 6 cung chính (Mệnh, Phúc, Di, Quan, Tài, Tật).

### 3.4 An 12 cung chức danh

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

---

## 4. Lập Cục

Cục là **hệ số nền** quyết định vị trí sao Tử Vi và vòng Tràng Sinh.

### 4.1 Quy tắc lập Cục

Dựa vào **Can năm sinh** và **Địa chi của cung Mệnh**:

| Can năm | Cung Mệnh tại Chi... | Cục         |
|---------|----------------------|-------------|
| Giáp/Kỷ | Dần/Ngọ/Tuất        | Hỏa lục cục |
| Giáp/Kỷ | Thân/Tý/Thìn        | Thủy nhị cục|
| Ất/Canh | Dần/Ngọ/Tuất        | Kim tứ cục  |
| Ất/Canh | Thân/Tý/Thìn        | Thổ ngũ cục |
| Bính/Tân | Dần/Ngọ/Tuất       | Mộc tam cục |
| ...     | ...                  | ...         |

> Đây là bảng rút gọn — cần hardcode bảng đầy đủ 10 Can × 4 nhóm Chi.

### 4.2 Tên và số cục

| Tên cục       | Số cục | Ý nghĩa kỹ thuật              |
|---------------|--------|-------------------------------|
| Thủy nhị cục  | 2      | Tử Vi khởi từ ngày thứ 2     |
| Mộc tam cục   | 3      | Tử Vi khởi từ ngày thứ 3     |
| Kim tứ cục    | 4      | Tử Vi khởi từ ngày thứ 4     |
| Thổ ngũ cục   | 5      | Tử Vi khởi từ ngày thứ 5     |
| Hỏa lục cục   | 6      | Tử Vi khởi từ ngày thứ 6     |

Số cục được dùng trực tiếp trong thuật toán tìm vị trí sao **Tử Vi**.

---

## 5. An sao – 14 Chính tinh

### 5.1 Hệ Tử Vi (6 sao)

Danh sách: **Tử Vi, Thiên Cơ, Thái Dương, Vũ Khúc, Thiên Đồng, Liêm Trinh**

**Tìm vị trí sao Tử Vi:**

```
Input: lunar_day (ngày âm lịch), cục_number (2..6)

Thuật toán:
1. Tính: remainder = lunar_day % cục_number
2. Nếu remainder == 0: Tử Vi ở cung ứng với ngày lunar_day / cục_number
3. Nếu remainder != 0: Tìm số ngày nhỏ nhất > lunar_day chia hết cho cục_number
   → Đó là ngày N', Tử Vi ở cung thứ (N' / cục_number) tính từ Dần

VD: Ngày 17, Mộc tam cục (số 3):
  17 % 3 = 2 → không chia hết
  → Tìm số tiếp theo chia hết cho 3 sau 17: 18
  → 18 / 3 = 6 → Tử Vi ở cung thứ 6 từ Dần = Mùi
```

**An 5 sao còn lại của hệ Tử Vi** theo bảng vị trí tương đối với Tử Vi:

| Sao        | Khoảng cách từ Tử Vi | Chiều |
|------------|----------------------|-------|
| Thiên Cơ   | -1 (liền trước)      | Nghịch|
| Thái Dương | -3                   | Nghịch|
| Vũ Khúc    | -4                   | Nghịch|
| Thiên Đồng | -5                   | Nghịch|
| Liêm Trinh | -8                   | Nghịch|

> Khoảng cách tính theo chiều **nghịch** trên 12 cung. Công thức: `(pos_TuVi - offset + 12) % 12`

### 5.2 Hệ Thiên Phủ (8 sao)

Danh sách: **Thiên Phủ, Thái Âm, Tham Lang, Cự Môn, Thiên Tướng, Thiên Lương, Thất Sát, Phá Quân**

**Tìm vị trí Thiên Phủ:**
```
Thiên Phủ đối xứng với Tử Vi qua trục Dần–Thân:
  pos_ThienPhu = (Dần + Thân) - pos_TuVi  (mod 12)

Quy tắc nhanh theo bảng:
  Tử Vi tại Dần → Thiên Phủ tại Thân
  Tử Vi tại Mão → Thiên Phủ tại Mùi
  Tử Vi tại Thìn → Thiên Phủ tại Ngọ
  ... (đối xứng gương)
```

**An 7 sao còn lại của hệ Thiên Phủ** tính từ Thiên Phủ đi **thuận**:

| Sao         | Khoảng cách từ Thiên Phủ | Chiều   |
|-------------|--------------------------|---------|
| Thái Âm     | +1                       | Thuận   |
| Tham Lang   | +2                       | Thuận   |
| Cự Môn      | +3                       | Thuận   |
| Thiên Tướng | +4                       | Thuận   |
| Thiên Lương | +5                       | Thuận   |
| Thất Sát    | +6                       | Thuận   |
| Phá Quân    | +10                      | Thuận   |

---

## 6. An sao – Phụ tinh & Vòng sao

### 6.1 Vòng Thái Tuế (12 sao – theo Chi năm sinh)

Khởi từ cung mang **đúng Chi năm sinh** (VD: năm Dần → Thái Tuế tại cung Dần), an thuận 12 sao:

| Thứ tự | Tên sao       |
|--------|---------------|
| 0      | Thái Tuế      |
| 1      | Thiếu Dương   |
| 2      | Tang Môn      |
| 3      | Thiếu Âm      |
| 4      | Quan Phù      |
| 5      | Tử Phù        |
| 6      | Tuế Phá       |
| 7      | Long Đức      |
| 8      | Bạch Hổ       |
| 9      | Phúc Đức (sao)|
| 10     | Điếu Khách    |
| 11     | Trực Phù      |

### 6.2 Vòng Lộc Tồn (12 sao – theo Can năm sinh)

Vị trí **Lộc Tồn** cố định theo Can năm:

| Can năm | Cung Lộc Tồn |
|---------|-------------|
| Giáp    | Dần         |
| Ất      | Mão         |
| Bính    | Tỵ          |
| Đinh    | Ngọ         |
| Mậu     | Tỵ          |
| Kỷ      | Ngọ         |
| Canh    | Thân        |
| Tân     | Dậu         |
| Nhâm    | Hợi         |
| Quý     | Tý          |

Từ Lộc Tồn, an tiếp các sao liên quan:

```
Kình Dương  = Lộc Tồn + 1  (thuận)
Đà La       = Lộc Tồn - 1  (nghịch)
```

An tiếp vòng 12 sao từ Lộc Tồn đi thuận (Lộc Tồn, Lực Sỹ, Bác Sỹ, Thanh Long, Tiểu Hao, ...):

| Thứ tự | Tên sao   |
|--------|-----------|
| 0      | Lộc Tồn   |
| 1      | Lực Sỹ    |
| 2      | Bác Sỹ    |
| 3      | Quan Phủ  |
| 4      | Tiểu Hao  |
| 5      | Tướng Quân|
| 6      | Tấu Thư   |
| 7      | Phi Liêm  |
| 8      | Hỷ Thần   |
| 9      | Bệnh Phù  |
| 10     | Đại Hao   |
| 11     | Phục Binh |

### 6.3 Vòng Tràng Sinh (12 sao – theo Cục)

Vị trí **Tràng Sinh** phụ thuộc vào Cục (hành của Cục):

| Cục / Hành | Tràng Sinh khởi tại |
|------------|---------------------|
| Thủy nhị   | Thân                |
| Mộc tam    | Hợi                 |
| Kim tứ     | Tỵ                  |
| Thổ ngũ    | Thân                |
| Hỏa lục    | Dần                 |

An 12 sao vòng Tràng Sinh từ điểm khởi đi **thuận** (Nam Dương/Nữ Âm) hoặc **nghịch**:

| Thứ tự | Tên sao     |
|--------|-------------|
| 0      | Tràng Sinh  |
| 1      | Mộc Dục     |
| 2      | Quan Đới    |
| 3      | Lâm Quan    |
| 4      | Đế Vượng    |
| 5      | Suy         |
| 6      | Bệnh        |
| 7      | Tử          |
| 8      | Mộ          |
| 9      | Tuyệt       |
| 10     | Thai        |
| 11     | Dưỡng       |

---

## 7. An sao theo Giờ / Ngày / Tháng

### 7.1 An sao theo Giờ sinh

| Sao           | Quy tắc an                                |
|---------------|-------------------------------------------|
| Văn Xương     | Khởi Tuất tại giờ Tý, đếm nghịch theo giờ|
| Văn Khúc      | Khởi Thìn tại giờ Tý, đếm thuận theo giờ |
| Địa Không     | Khởi Hợi tại giờ Tý, đếm nghịch theo giờ |
| Địa Kiếp      | Khởi Hợi tại giờ Tý, đếm thuận theo giờ  |

> Văn Xương và Văn Khúc thường được gọi chung là **Xương Khúc**.  
> Địa Không và Địa Kiếp thường được gọi là **Không Kiếp**.

### 7.2 An sao theo Tháng sinh

| Sao       | Quy tắc an                                     |
|-----------|------------------------------------------------|
| Tả Phụ    | Khởi Thìn tại tháng Giêng, đếm thuận theo tháng|
| Hữu Bật   | Khởi Tuất tại tháng Giêng, đếm nghịch theo tháng|

> **Tả Hữu** (Tả Phụ + Hữu Bật) là bộ sao trợ lực quan trọng bậc nhất trong Nam Tông.

### 7.3 An sao theo Ngày sinh

| Sao        | Quy tắc an                                       |
|------------|--------------------------------------------------|
| Tam Thai   | Khởi Dần tại ngày 1, đếm thuận theo ngày         |
| Bát Tọa    | Khởi Tuất tại ngày 1, đếm nghịch theo ngày       |
| Ân Quang   | Khởi Tý tại ngày 1, đếm thuận theo ngày          |
| Thiên Quý  | Khởi Ngọ tại ngày 1, đếm nghịch theo ngày        |

---

## 8. Tuần Trung & Triệt Lộ

### 8.1 Tuần Trung (Tuần Không)

Mỗi **Tuần** gồm 10 ngày ứng với 10 Can, nhưng Địa chi có 12 → 2 Chi **không có Can** gọi là **Tuần Không**.

Xác định theo **Can Chi ngày sinh**:

```
Tuần bắt đầu từ Can Giáp, lùi về tìm ngày Giáp gần nhất trước ngày sinh.
Từ đó đếm 10 cung theo chiều thuận → 2 cung cuối = Tuần Không.

VD: Ngày sinh là Bính Ngọ
  → Giáp Thìn là ngày đầu Tuần
  → Tuần đi: Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi → kết thúc
  → Tuần Không: Tý và Sửu
```

### 8.2 Triệt Lộ

Triệt Lộ xác định theo **Can năm sinh**, rơi vào 2 cung trong lá số:

| Can năm   | Triệt Lộ tại 2 cung |
|-----------|---------------------|
| Giáp / Kỷ | Thân – Dậu          |
| Ất / Canh  | Ngọ – Mùi           |
| Bính / Tân | Thìn – Tỵ           |
| Đinh / Nhâm| Dần – Mão           |
| Mậu / Quý  | Tý – Sửu            |

### 8.3 Tác dụng lên sao

```
Sao sáng (Miếu/Vượng) bị Tuần/Triệt: giảm lực → tác dụng tốt suy giảm
Sao tối  (Hãm)        bị Tuần/Triệt: giảm hung → tác dụng xấu được hóa giải
```

Logic xử lý:
```python
def apply_tuan_triet(star, cung_index, tuan_khong_list, triet_lo_list):
    is_blocked = cung_index in tuan_khong_list or cung_index in triet_lo_list
    if is_blocked:
        if star.brightness in ['Mieu', 'Vuong', 'Dac']:
            star.effective_brightness = downgrade(star.brightness)
        elif star.brightness == 'Ham':
            star.effective_brightness = 'Binh'  # hóa giải
    return star
```

---

## 9. Tương tác & Luận giải

### 9.1 Trạng thái Sáng – Tối (Cường – Nhược)

Mỗi sao có bảng trạng thái cố định theo **cung mà sao đóng** (không phải cung Mệnh):

| Trạng thái | Ký hiệu | Mức lực |
|------------|---------|---------|
| Miếu       | ☀☀☀    | Tối đa  |
| Vượng      | ☀☀     | Cao     |
| Đắc        | ☀      | Trung bình|
| Bình       | –      | Yếu     |
| Hãm        | ☾      | Tối thiểu|

> Cần hardcode bảng trạng thái cho từng sao trên 12 cung. Đây là bảng **lớn nhất** trong toàn hệ thống (~100 sao × 12 cung).

### 9.2 Tương quan Ngũ hành

**Cung khắc/sinh Sao:**
```
Ngũ hành tương sinh: Thủy→Mộc→Hỏa→Thổ→Kim→Thủy
Ngũ hành tương khắc: Kim→Mộc, Mộc→Thổ, Thổ→Thủy, Thủy→Hỏa, Hỏa→Kim

Nếu hành Cung SINH hành Sao → Sao được tăng lực
Nếu hành Cung KHẮC hành Sao → Sao bị giảm lực
```

**Sao sinh/khắc Mệnh:**
```
Nếu hành Sao SINH hành Mệnh chủ → Cát tinh (tốt nhất)
Nếu hành Sao KHẮC hành Mệnh chủ → Hung tinh (xấu nhất)
Nếu hành Sao = hành Mệnh chủ → Bình hòa
```

### 9.3 Các góc chiếu

```
┌─────────────┬────────────────────────────────────────┐
│ Loại chiếu  │ Định nghĩa                             │
├─────────────┼────────────────────────────────────────┤
│ Xung (180°) │ Cung đối diện trên bàn 12 cung         │
│ Tam hợp     │ 3 cung cách nhau 120°                  │
│             │ VD: Dần–Ngọ–Tuất, Thân–Tý–Thìn        │
│ Nhị hợp     │ Cặp cung hỗ trợ ngầm                   │
│             │ VD: Tý–Sửu, Dần–Hợi, Mão–Tuất, ...    │
└─────────────┴────────────────────────────────────────┘
```

```python
TAM_HOP = {
    'Dần': ['Dần', 'Ngọ', 'Tuất'],
    'Thân': ['Thân', 'Tý', 'Thìn'],
    'Hợi': ['Hợi', 'Mão', 'Mùi'],
    'Tỵ':  ['Tỵ',  'Dậu', 'Sửu'],
}

NHI_HOP = {
    'Tý': 'Sửu', 'Sửu': 'Tý',
    'Dần': 'Hợi', 'Hợi': 'Dần',
    'Mão': 'Tuất', 'Tuất': 'Mão',
    'Thìn': 'Dậu', 'Dậu': 'Thìn',
    'Tỵ': 'Thân', 'Thân': 'Tỵ',
    'Ngọ': 'Mùi', 'Mùi': 'Ngọ',
}
```

Khi luận giải một cung, cần lấy sao từ:
1. Chính cung (đóng tại cung đó)
2. Cung xung chiếu
3. Hai cung tam hợp

---

## 10. Cách cục đặc trưng Nam Tông

Cách cục là **bộ điều kiện sao hội tụ** → tạo ra dự đoán đặc biệt. Đây là đặc trưng lớn nhất phân biệt Nam Tông với Bắc Tông.

### 10.1 Cấu trúc dữ liệu cách cục

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

### 10.2 Một số Cách cục tiêu biểu

**Quý Cách (Cát):**

| Tên cách cục              | Điều kiện                                              | Ý nghĩa         |
|---------------------------|--------------------------------------------------------|-----------------|
| Quần thần khánh hội       | Tử Vi + Khôi/Việt + Tả Phụ/Hữu Bật + Khoa/Quyền/Lộc | Phú quý hiển hách|
| Nhật Nguyệt tịnh minh     | Thái Dương Miếu + Thái Âm Miếu                         | Sáng suốt, hiển quý|
| Cự Cơ đồng cung           | Cự Môn + Thiên Cơ cùng cung                            | Mưu lược xuất chúng|
| Tử Phủ triều viên         | Tử Vi + Thiên Phủ chiếu Mệnh                           | Quyền lực, lãnh đạo|

**Bần Tiện Cách (Hung):**

| Tên cách cục              | Điều kiện                                    | Ý nghĩa     |
|---------------------------|----------------------------------------------|-------------|
| Lộc phùng lưỡng sát       | Lộc Tồn + Địa Không + Địa Kiếp               | Tán tài      |
| Mã đầu đái kiếm           | Thất Sát tại Dần/Thân + Kình Dương           | Bạo lực, tai nạn|
| Liêm Trinh thất sát       | Liêm Trinh + Thất Sát cùng cung              | Sát phạt, khắc bạch|

### 10.3 Thuật toán dò cách cục

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

---

## 11. Giao diện hiển thị (UI/UX)

### 11.1 Layout chuẩn – Bàn 12 cung 4×3

```
┌───────────────┬───────────────┬───────────────┬───────────────┐
│  [TỴ]         │  [NGỌ]        │  [MÙI]        │  [THÂN]       │
│  Cung: ...    │  Cung: ...    │  Cung: ...    │  Cung: ...    │
│  ★ Thái Dương │  ★ Tử Vi      │               │  ★ Thiên Phủ  │
│  ☆ Văn Xương  │  ★ Thiên Tướng│               │  ☆ Tả Phụ     │
├───────────────┼───────────────┼───────────────┼───────────────┤
│  [THÌN]       │         TRUNG TÂM LÁ SỐ       │  [DẬU]        │
│               │  ┌──────────────────────────┐  │               │
│               │  │  Họ tên: ...             │  │               │
├───────────────┤  │  Sinh: DD/MM/YYYY HH:mm  │  ├───────────────┤
│  [MÃO]        │  │  Mệnh: [Chi] – [Cung]    │  │  [TUẤT]       │
│               │  │  Thân: [Chi] – [Cung]    │  │               │
│               │  │  Cục: [Tên cục]          │  │               │
│               │  │  Bản Mệnh: [Hành]        │  │               │
├───────────────┤  └──────────────────────────┘  ├───────────────┤
│  [DẦN]        │  [SỬU]        │  [TÝ]         │  [HỢI]        │
│  Cung: ...    │  Cung: ...    │  Cung: ...    │  Cung: ...    │
│  ★ Thiên Cơ   │               │               │               │
└───────────────┴───────────────┴───────────────┴───────────────┘
```

### 11.2 Mỗi ô cung hiển thị

```
┌──────────────────────────────┐
│ [Địa Chi]  [Ngũ hành cung]   │  ← Header
│ TÊN CUNG CHỨC DANH           │
│ ──────────────────────────── │
│ ★ Tử Vi        [Miếu] ☀☀☀  │  ← Chính tinh (to, đậm)
│ ★ Thiên Phủ    [Vượng] ☀☀  │
│ ──────────────────────────── │
│ · Tả Phụ       [Đắc]  ☀    │  ← Phụ tinh (nhỏ hơn)
│ · Văn Xương    [Bình] –     │
│ ──────────────────────────── │
│ ⚠ Tuần Không                │  ← Cảnh báo Tuần/Triệt
└──────────────────────────────┘
```

### 11.3 Màu sắc & ký hiệu gợi ý

| Trạng thái | Màu      | Ký hiệu |
|------------|----------|---------|
| Miếu       | Vàng đậm | ☀☀☀   |
| Vượng      | Cam      | ☀☀    |
| Đắc        | Xanh lá  | ☀     |
| Bình       | Xám      | –     |
| Hãm        | Đỏ tối   | ☾     |
| Tuần/Triệt | Viền tím | ⊘     |

### 11.4 Chế độ xem gợi ý

- **Lá số tĩnh:** Hiển thị toàn bộ 12 cung, click vào cung để xem chi tiết luận giải.
- **Luận giải cung:** Panel slide-in hiển thị sao, trạng thái, tương tác ngũ hành, góc chiếu và nhận xét.
- **Cách cục panel:** Danh sách cách cục nhận diện được, phân loại Quý/Bình/Hung.
- **Đại hạn / Tiểu hạn:** Overlay thêm vòng vận hạn theo năm (tính năng mở rộng).

---

## 12. Kiến trúc dữ liệu gợi ý

```typescript
// Enum cơ bản
type DiaChi = 'Ty'|'Suu'|'Dan'|'Mao'|'Thin'|'Ti'|'Ngo'|'Mui'|'Than'|'Dau'|'Tuat'|'Hoi';
type ThienCan = 'Giap'|'At'|'Binh'|'Dinh'|'Mau'|'Ky'|'Canh'|'Tan'|'Nham'|'Quy';
type NguHanh = 'Kim'|'Moc'|'Thuy'|'Hoa'|'Tho';
type TrangThai = 'Mieu'|'Vuong'|'Dac'|'Binh'|'Ham';
type CucType = 'Thuy2'|'Moc3'|'Kim4'|'Tho5'|'Hoa6';

// Sao
interface Star {
  name: string;
  type: 'chinh_tinh' | 'phu_tinh';
  ngu_hanh: NguHanh;
  brightness: TrangThai;           // Trạng thái cơ bản
  effective_brightness: TrangThai; // Sau khi áp Tuần/Triệt
  is_tuan_khong: boolean;
  is_triet_lo: boolean;
}

// Cung
interface Cung {
  index: number;        // 0-11
  dia_chi: DiaChi;
  ngu_hanh: NguHanh;
  chuc_danh: string;    // Mệnh, Phúc Đức, ...
  is_menh: boolean;
  is_than: boolean;
  stars: Star[];
  is_tuan_khong: boolean;
  is_triet_lo: boolean;
}

// Lá số
interface LaSo {
  // Thông tin chủ nhân
  ho_ten: string;
  birth_solar: Date;
  birth_lunar: { day: number; month: number; year: number; is_nhuan: boolean };
  gender: 'NAM' | 'NU';
  
  // Tọa độ kỹ thuật
  year_can: ThienCan;
  year_chi: DiaChi;
  am_duong: 'AM' | 'DUONG';
  ban_menh_hanh: NguHanh;
  cuc: CucType;
  
  // Địa bàn
  cungs: Cung[];       // Array 12 phần tử
  menh_cung_index: number;
  than_cung_index: number;
  
  // Tuần Triệt
  tuan_khong: [DiaChi, DiaChi];
  triet_lo: [DiaChi, DiaChi];
  
  // Kết quả luận giải
  cach_cucs: CachCuc[];
}
```

---

## 13. Checklist triển khai

### Phase 1 – Nền tảng
- [ ] Implement chuyển đổi Dương → Âm lịch (kiểm tra tháng nhuận)
- [ ] Bảng 60 Hoa Giáp → Nạp âm ngũ hành
- [ ] Xác định Can/Chi năm, tháng, ngày, giờ
- [ ] Tính Âm Dương tuổi, chiều đếm
- [ ] An Mệnh cung, Thân cung
- [ ] An 12 cung chức danh

### Phase 2 – An sao
- [ ] Lập Cục (5 loại)
- [ ] An 14 Chính tinh (Hệ Tử Vi + Hệ Thiên Phủ)
- [ ] An vòng Thái Tuế (12 sao)
- [ ] An vòng Lộc Tồn + Kình Đà (12 sao)
- [ ] An vòng Tràng Sinh (12 sao)
- [ ] An Xương Khúc, Không Kiếp (theo giờ)
- [ ] An Tả Phụ, Hữu Bật (theo tháng)
- [ ] An Tam Thai, Bát Tọa, Ân Quang, Thiên Quý (theo ngày)
- [ ] An còn lại ~50+ phụ tinh khác

### Phase 3 – Tương tác
- [ ] Hardcode bảng trạng thái sao × 12 cung (~100 sao)
- [ ] Xác định Tuần Không, Triệt Lộ
- [ ] Áp dụng Tuần/Triệt lên trạng thái sao
- [ ] Tính góc chiếu (xung, tam hợp, nhị hợp)
- [ ] Tính tương quan Ngũ hành Cung–Sao–Mệnh

### Phase 4 – Cách cục & Hiển thị
- [ ] Xây dựng database cách cục (tối thiểu 30–50 cách)
- [ ] Thuật toán dò cách cục (kể cả chiếu)
- [ ] UI bàn 12 cung 4×3
- [ ] Panel chi tiết từng cung
- [ ] Panel cách cục tổng hợp

### Phase 5 – Nâng cao
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