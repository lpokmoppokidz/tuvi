# 2. Đầu vào & Tiền xử lý

## 2.1 Dữ liệu đầu vào

| Trường           | Kiểu      | Ghi chú                                          |
|------------------|-----------|--------------------------------------------------|
| `birth_date`     | `Date`    | Ngày sinh dương lịch                             |
| `birth_hour`     | `string`  | Giờ theo 12 Chi (Tý, Sửu, Dần, Mão, Thìn, Tỵ, Ngọ, Mùi, Thân, Dậu, Tuất, Hợi) |
| `gender`         | `enum`    | `NAM` hoặc `NỮ` (ảnh hưởng cách đếm chiều vận) |
| `solar_or_lunar` | `boolean` | Mặc định: dương lịch → cần convert                |

## 2.2 Chuyển đổi Dương lịch → Âm lịch

Dùng thuật toán chuyển đổi Âm Dương lịch chuẩn (ví dụ: thư viện `lunar-calendar` hoặc implement theo giải thuật Hong Kong Observatory).

Đầu ra cần:
- `lunar_day` – ngày âm
- `lunar_month` – tháng âm (lưu ý tháng nhuận)
- `lunar_year` – năm âm
- `year_can` – Can năm (Giáp/Ất/Bính/Đinh/Mậu/Kỷ/Canh/Tân/Nhâm/Quý)
- `year_chi` – Chi năm (Tý/Sửu/.../Hợi)
- `birth_chi_hour` – Chi giờ sinh

## 2.3 Xác định Âm Dương tuổi

```
Can Dương (phát sáng): Giáp, Bính, Mậu, Canh, Nhâm
Can Âm  (phát tối):   Ất, Đinh, Kỷ, Tân, Quý
```

Âm Dương của tuổi kết hợp với **giới tính** để xác định chiều đếm cung:
- Nam Dương / Nữ Âm → đếm **thuận** (chiều kim đồng hồ trên bàn Địa chi)
- Nam Âm / Nữ Dương → đếm **nghịch**

## 2.4 Tìm Bản Mệnh (Nạp âm)

Dựa vào bảng **Lục thập Hoa Giáp** (Can Chi năm sinh → Nạp âm ngũ hành):

```
VD: Giáp Tý, Ất Sửu → Kim (Hải trung kim)
    Bính Dần, Đinh Mão → Hỏa (Lô trung hỏa)
    ... (60 cặp, cần hardcode bảng đầy đủ)
```

Bản Mệnh được dùng để tính **tương quan Sao sinh/khắc Mệnh** khi luận giải.
