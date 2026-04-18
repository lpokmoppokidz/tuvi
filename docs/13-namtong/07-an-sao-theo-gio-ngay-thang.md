# 03 – Phụ Tinh An Theo Giờ / Ngày / Tháng + Vòng Tràng Sinh

---

## A. Vòng Tràng Sinh – 12 sao (theo Cục)

### Điểm khởi theo Cục

| Cục       | Hành Cục | Tràng Sinh khởi | Index |
|-----------|----------|-----------------|-------|
| Thủy nhị  | Thủy     | Thân            | 8     |
| Mộc tam   | Mộc      | Hợi             | 11    |
| Kim tứ    | Kim      | Tỵ              | 5     |
| Thổ ngũ   | Thổ      | Thân            | 8     |
| Hỏa lục   | Hỏa      | Dần             | 2     |

### Chiều an vòng Tràng Sinh

```
Nam Dương / Nữ Âm  → đếm THUẬN  (+1 mỗi bước)
Nam Âm   / Nữ Dương → đếm NGHỊCH (-1 mỗi bước)
```

> **Xác định Nam/Nữ Âm/Dương:**
> - Can năm Dương (Giáp, Bính, Mậu, Canh, Nhâm) + Nam giới = **Nam Dương** → thuận
> - Can năm Âm  (Ất, Đinh, Kỷ, Tân, Quý)   + Nam giới = **Nam Âm** → nghịch
> - Nữ giới đảo ngược so với Nam

### 12 sao vòng Tràng Sinh

| Thứ tự | Tên sao     | Bản chất     |
|--------|-------------|--------------|
| 0      | Tràng Sinh  | Đại cát      |
| 1      | Mộc Dục     | Hung (dâm)   |
| 2      | Quan Đới    | Cát          |
| 3      | Lâm Quan    | Cát (vượng)  |
| 4      | Đế Vượng    | Đại cát      |
| 5      | Suy         | Bình         |
| 6      | Bệnh        | Hung         |
| 7      | Tử          | Hung         |
| 8      | Mộ          | Hung (trì trệ)|
| 9      | Tuyệt       | Hung         |
| 10     | Thai        | Bình         |
| 11     | Dưỡng       | Cát          |

### Pseudocode

```typescript
function anVongTrangSinh(
  cucType: CucType,
  amDuong: 'AM' | 'DUONG',
  gender: 'NAM' | 'NU'
): Record<number, string> {
  const startMap: Record<CucType, number> = {
    Thuy2: 8, Moc3: 11, Kim4: 5, Tho5: 8, Hoa6: 2
  };
  const start = startMap[cucType];
  
  // Nam Dương hoặc Nữ Âm → thuận; ngược lại → nghịch
  const isTuan = (gender === 'NAM' && amDuong === 'DUONG') ||
                 (gender === 'NU'  && amDuong === 'AM');
  const dir = isTuan ? 1 : -1;

  const SAO = ['Tràng Sinh','Mộc Dục','Quan Đới','Lâm Quan',
               'Đế Vượng','Suy','Bệnh','Tử','Mộ','Tuyệt','Thai','Dưỡng'];
  
  const result: Record<number, string> = {};
  for (let i = 0; i < 12; i++) {
    const cungIdx = ((start + dir * i) % 12 + 12) % 12;
    result[cungIdx] = SAO[i];
  }
  return result;
}
```

---

## B. An sao theo THÁNG SINH

### B1. Tả Phụ & Hữu Bật

| Tháng | Tả Phụ (thuận từ Thìn) | Hữu Bật (nghịch từ Tuất) |
|-------|------------------------|---------------------------|
| 1     | Thìn (4)               | Tuất (10)                 |
| 2     | Tỵ (5)                 | Dậu (9)                   |
| 3     | Ngọ (6)                | Thân (8)                  |
| 4     | Mùi (7)                | Mùi (7)                   |
| 5     | Thân (8)               | Ngọ (6)                   |
| 6     | Dậu (9)                | Tỵ (5)                    |
| 7     | Tuất (10)              | Thìn (4)                  |
| 8     | Hợi (11)               | Mão (3)                   |
| 9     | Tý (0)                 | Dần (2)                   |
| 10    | Sửu (1)                | Sửu (1)                   |
| 11    | Dần (2)                | Tý (0)                    |
| 12    | Mão (3)                | Hợi (11)                  |

```typescript
function getTaPhu(thang: number): number  { return (4 + thang - 1) % 12; }
function getHuuBat(thang: number): number { return ((10 - thang + 1) + 12 * 2) % 12; }
```

---

### B2. Thiên Hình

Khởi **Dậu (9)** tại tháng Giêng, đếm **thuận**:

| Tháng | 1 | 2 | 3 | 4 | 5 | 6  | 7  | 8  | 9  | 10 | 11 | 12 |
|-------|---|---|---|---|---|----|----|----|----|----|----|-----|
| Cung  | Dậu(9) | Tuất(10) | Hợi(11) | Tý(0) | Sửu(1) | Dần(2) | Mão(3) | Thìn(4) | Tỵ(5) | Ngọ(6) | Mùi(7) | Thân(8) |

```typescript
function getThienHinh(thang: number): number { return (9 + thang - 1) % 12; }
```

---

### B3. Thiên Diêu (Hàm Trì)

Khởi **Tý (0)** tại tháng Giêng, đếm **nghịch**:

| Tháng | 1 | 2 | 3 | 4 | 5 | 6  | 7  | 8  | 9  | 10 | 11 | 12 |
|-------|---|---|---|---|---|----|----|----|----|----|----|-----|
| Cung  | Tý(0) | Hợi(11) | Tuất(10) | Dậu(9) | Thân(8) | Mùi(7) | Ngọ(6) | Tỵ(5) | Thìn(4) | Mão(3) | Dần(2) | Sửu(1) |

```typescript
function getThienDieu(thang: number): number { return ((0 - thang + 1) + 12 * 2) % 12; }
```

---

### B4. Giải Thần

Khởi **Thân (8)** tại tháng Giêng, đếm **thuận**:

```typescript
function getGiaiThan(thang: number): number { return (8 + thang - 1) % 12; }
```

---

### B5. Thiên Y

Khởi **Sửu (1)** tại tháng Giêng, đếm **thuận**:

```typescript
function getThienY(thang: number): number { return (1 + thang - 1) % 12; }
```

---

### B6. Thai Phụ & Phong Cáo (Phong Các)

| Sao      | Khởi | Chiều  | Công thức                              |
|----------|------|--------|----------------------------------------|
| Thai Phụ | Tứ(5) tháng 1 | Thuận | `(5 + thang - 1) % 12`  |
| Phong Cáo| Tuất(10) tháng 1 | Nghịch | `((10 - thang + 1) + 24) % 12` |

---

### B7. Nguyệt Đức

Khởi **Dần (2)** tại tháng Giêng, đếm **thuận**:

```typescript
function getNguyetDuc(thang: number): number { return (2 + thang - 1) % 12; }
```

---

## C. An sao theo GIỜ SINH

### Quy ước giờ → index

```
Tý=0, Sửu=1, Dần=2, Mão=3, Thìn=4, Tỵ=5,
Ngọ=6, Mùi=7, Thân=8, Dậu=9, Tuất=10, Hợi=11
```

### C1. Văn Xương

Khởi **Tuất (10)** tại giờ Tý (0), đếm **nghịch**:

```typescript
function getVanXuong(gioIndex: number): number {
  return ((10 - gioIndex) + 12 * 2) % 12;
}
```

| Giờ  | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|------|----|-----|-----|-----|------|----|-----|-----|------|-----|------|-----|
| Cung | Tuất| Dậu | Thân| Mùi | Ngọ  | Tỵ | Thìn| Mão | Dần  | Sửu | Tý   | Hợi |

### C2. Văn Khúc

Khởi **Thìn (4)** tại giờ Tý (0), đếm **thuận**:

```typescript
function getVanKhuc(gioIndex: number): number {
  return (4 + gioIndex) % 12;
}
```

| Giờ  | Tý | Sửu | Dần | Mão | Thìn | Tỵ | Ngọ | Mùi | Thân | Dậu | Tuất | Hợi |
|------|----|-----|-----|-----|------|----|-----|-----|------|-----|------|-----|
| Cung | Thìn|Tỵ  | Ngọ | Mùi | Thân | Dậu| Tuất| Hợi | Tý   | Sửu | Dần  | Mão |

### C3. Địa Không

Khởi **Hợi (11)** tại giờ Tý (0), đếm **nghịch**:

```typescript
function getDiaKhong(gioIndex: number): number {
  return ((11 - gioIndex) + 12 * 2) % 12;
}
```

### C4. Địa Kiếp

Khởi **Hợi (11)** tại giờ Tý (0), đếm **thuận**:

```typescript
function getDiaKiep(gioIndex: number): number {
  return (11 + gioIndex) % 12;
}
```

> ⚠ Địa Không và Địa Kiếp luôn **đối xứng nhau** (cách nhau 180°).  
> Kiểm tra: `(getDiaKhong(g) + getDiaKiep(g)) % 12 === 22 % 12 = 10`... không đổi.

---

## D. An sao theo NGÀY SINH (Âm lịch)

### D1. Tam Thai

Khởi **Dần (2)** tại ngày 1, đếm **thuận**:

```typescript
function getTamThai(ngay: number): number { return (2 + ngay - 1) % 12; }
```

### D2. Bát Tọa

Khởi **Tuất (10)** tại ngày 1, đếm **nghịch**:

```typescript
function getBatToa(ngay: number): number { return ((10 - ngay + 1) + 12 * 4) % 12; }
```

### D3. Ân Quang

Khởi **Tý (0)** tại ngày 1, đếm **thuận**:

```typescript
function getAnQuang(ngay: number): number { return (0 + ngay - 1) % 12; }
```

### D4. Thiên Quý

Khởi **Ngọ (6)** tại ngày 1, đếm **nghịch**:

```typescript
function getThienQuy(ngay: number): number { return ((6 - ngay + 1) + 12 * 4) % 12; }
```

---

## E. Bảng tổng hợp nhanh – tất cả phụ tinh theo nguồn

| Sao              | Nguồn        | Hàm khởi        | Chiều   | Ghi chú                   |
|------------------|--------------|-----------------|---------|---------------------------|
| Tả Phụ           | Tháng sinh   | Thìn (T1)       | Thuận   |                           |
| Hữu Bật          | Tháng sinh   | Tuất (T1)       | Nghịch  |                           |
| Thiên Hình       | Tháng sinh   | Dậu (T1)        | Thuận   |                           |
| Thiên Diêu       | Tháng sinh   | Tý (T1)         | Nghịch  | Còn gọi Hàm Trì           |
| Giải Thần        | Tháng sinh   | Thân (T1)       | Thuận   |                           |
| Thiên Y          | Tháng sinh   | Sửu (T1)        | Thuận   |                           |
| Thai Phụ         | Tháng sinh   | Tỵ (T1)         | Thuận   |                           |
| Phong Cáo        | Tháng sinh   | Tuất (T1)       | Nghịch  |                           |
| Nguyệt Đức       | Tháng sinh   | Dần (T1)        | Thuận   |                           |
| Văn Xương        | Giờ sinh     | Tuất (G.Tý)     | Nghịch  |                           |
| Văn Khúc         | Giờ sinh     | Thìn (G.Tý)     | Thuận   |                           |
| Địa Không        | Giờ sinh     | Hợi (G.Tý)      | Nghịch  |                           |
| Địa Kiếp         | Giờ sinh     | Hợi (G.Tý)      | Thuận   |                           |
| Tam Thai         | Ngày sinh    | Dần (N.1)       | Thuận   |                           |
| Bát Tọa          | Ngày sinh    | Tuất (N.1)      | Nghịch  |                           |
| Ân Quang         | Ngày sinh    | Tý (N.1)        | Thuận   |                           |
| Thiên Quý        | Ngày sinh    | Ngọ (N.1)       | Nghịch  |                           |
| Lộc Tồn          | Can năm      | Bảng cố định    | –       | Xem file 02               |
| Kình Dương       | Can năm      | Lộc Tồn +1      | Thuận   |                           |
| Đà La            | Can năm      | Lộc Tồn -1      | Nghịch  |                           |
| Thiên Khôi       | Can năm      | Bảng cố định    | –       |                           |
| Thiên Việt       | Can năm      | Bảng cố định    | –       |                           |
| Thiên Quan       | Can năm      | Bảng cố định    | –       |                           |
| Thiên Phúc       | Can năm      | Bảng cố định    | –       |                           |
| Thiên Mã         | Chi năm      | Bảng cố định    | –       | Xem file 02               |
| Hồng Loan        | Chi năm      | Bảng cố định    | –       |                           |
| Thiên Hỷ         | Chi năm      | Đối xứng H.Loan | –       |                           |
| Long Trì         | Chi năm      | Bảng cố định    | –       |                           |
| Phượng Các       | Chi năm      | Bảng cố định    | –       |                           |
| Thiên Tài        | Chi năm + Mệnh| Từ Mệnh       | Thuận   |                           |
| Thiên Thọ        | Chi năm + Thân| Từ Thân       | Thuận   |                           |
| Kiếp Sát         | Chi năm      | Bảng cố định    | –       |                           |
| Hoa Cái          | Chi năm      | Bảng cố định    | –       |                           |
| Vòng Thái Tuế×12 | Chi năm      | Chi năm sinh    | Thuận   | Xem file 02               |
| Vòng Lộc Tồn×12  | Can năm      | Lộc Tồn         | Thuận   | Xem file 02               |
| Vòng Tràng Sinh×12| Cục + Giới  | Bảng theo Cục   | Thuận/Nghịch | Xem mục A      |
| Tứ Hóa           | Can năm      | Gán vào sao     | –       | Không an vào cung         |