# 02 – Phụ Tinh An Theo Can/Chi Năm (Nam Tông)

> File này bao gồm **tất cả** phụ tinh an theo Can năm và Chi năm sinh.  
> Đây là phần **thiếu nhiều nhất** trong các tài liệu dev thông thường.

---

## A. An sao theo CAN NĂM SINH

### A1. Tứ Hóa (Hóa Lộc, Hóa Quyền, Hóa Khoa, Hóa Kỵ)

Tứ Hóa không an vào cung mà **gán vào sao** – sao đó "hóa" tương ứng.

| Can năm | Hóa Lộc     | Hóa Quyền   | Hóa Khoa    | Hóa Kỵ      |
|---------|-------------|-------------|-------------|-------------|
| Giáp    | Liêm Trinh  | Phá Quân    | Vũ Khúc     | Thái Dương  |
| Ất      | Thiên Cơ    | Thiên Lương | Tử Phủ*     | Thái Âm     |
| Bính    | Thiên Đồng  | Thiên Cơ    | Văn Xương   | Liêm Trinh  |
| Đinh    | Thái Âm     | Thiên Đồng  | Thiên Cơ    | Cự Môn      |
| Mậu     | Tham Lang   | Thái Âm     | Hữu Bật     | Thiên Cơ    |
| Kỷ      | Vũ Khúc     | Tham Lang   | Thiên Lương | Văn Khúc    |
| Canh    | Thái Dương  | Vũ Khúc     | Thái Âm     | Thiên Đồng  |
| Tân     | Cự Môn      | Thái Dương  | Văn Xương   | Văn Khúc    |
| Nhâm    | Thiên Lương | Tử Vi       | Tả Phụ      | Vũ Khúc     |
| Quý     | Phá Quân    | Cự Môn      | Thái Âm     | Tham Lang   |

> *Ất: "Tử Phủ" = Tử Vi hóa Khoa theo một số tài liệu Nam Tông, dị bản khác ghi Thiên Phủ.  
> Cần xác nhận với sách nguồn đang sử dụng.

**Cách implement:**

```typescript
// Gán thuộc tính hóa cho sao, không tạo sao mới
function applyTuHoa(lasoStars: Star[], yearCan: ThienCan): void {
  const tuHoaMap: Record<ThienCan, { loc: string; quyen: string; khoa: string; ky: string }> = {
    Giap: { loc: 'Liêm Trinh', quyen: 'Phá Quân', khoa: 'Vũ Khúc',    ky: 'Thái Dương' },
    At:   { loc: 'Thiên Cơ',  quyen: 'Thiên Lương',khoa: 'Tử Vi',     ky: 'Thái Âm'   },
    // ... đủ 10 can
  };
  const hoa = tuHoaMap[yearCan];
  for (const star of lasoStars) {
    if (star.name === hoa.loc)   star.tuHoa = 'LOC';
    if (star.name === hoa.quyen) star.tuHoa = 'QUYEN';
    if (star.name === hoa.khoa)  star.tuHoa = 'KHOA';
    if (star.name === hoa.ky)    star.tuHoa = 'KY';
  }
}
```

---

### A2. Thiên Khôi & Thiên Việt (Khôi Việt)

An vào **cung** (không phải gán vào sao), theo Can năm sinh:

| Can năm | Thiên Khôi | Thiên Việt |
|---------|------------|------------|
| Giáp/Mậu | Sửu (1)   | Mùi (7)    |
| Ất/Kỷ    | Tý (0)    | Thân (8)   |
| Bính/Đinh| Hợi (11)  | Dậu (9)    |
| Canh/Tân | Ngọ (6)   | Dần (2)    |
| Nhâm/Quý | Mão (3)   | Tỵ (5)     |

```typescript
const KHOI_VIET: Record<string, [number, number]> = {
  // [khôi_index, việt_index]
  'Giap': [1, 7], 'Mau': [1, 7],
  'At':   [0, 8], 'Ky':  [0, 8],
  'Binh': [11, 9],'Dinh':[11, 9],
  'Canh': [6, 2], 'Tan': [6, 2],
  'Nham': [3, 5], 'Quy': [3, 5],
};
```

---

### A3. Thiên Quan & Thiên Phúc

| Can năm | Thiên Quan | Thiên Phúc |
|---------|------------|------------|
| Giáp    | Mùi (7)    | Dậu (9)    |
| Ất      | Thân (8)   | Hợi (11)   |
| Bính    | Dậu (9)    | Tý (0)     |
| Đinh    | Hợi (11)   | Dần (2)    |
| Mậu     | Sửu (1)    | Mão (3)    |
| Kỷ      | Tý (0)     | Tỵ (5)     |
| Canh    | Dần (2)    | Ngọ (6)    |
| Tân     | Mão (3)    | Thân (8)   |
| Nhâm    | Tỵ (5)     | Dậu (9)    |
| Quý     | Ngọ (6)    | Tuất (10)  |

---

### A4. Lộc Tồn, Kình Dương, Đà La

| Can năm | Lộc Tồn  | Kình Dương       | Đà La             |
|---------|----------|------------------|-------------------|
| Giáp    | Dần (2)  | Mão (3) +1 thuận | Sửu (1) -1 nghịch |
| Ất      | Mão (3)  | Thìn (4)         | Dần (2)           |
| Bính/Mậu| Tỵ (5)   | Ngọ (6)          | Thìn (4)          |
| Đinh/Kỷ | Ngọ (6)  | Mùi (7)          | Tỵ (5)            |
| Canh    | Thân (8) | Dậu (9)          | Mùi (7)           |
| Tân     | Dậu (9)  | Tuất (10)        | Thân (8)          |
| Nhâm    | Hợi (11) | Tý (0)           | Tuất (10)         |
| Quý     | Tý (0)   | Sửu (1)          | Hợi (11)          |

> ⚠ **Kình Dương** = Lộc Tồn + 1 (thuận)  
> ⚠ **Đà La** = Lộc Tồn - 1 (nghịch) – tức là **2 bước** trước Kình Dương, không phải liền kề Lộc Tồn về phía trước.

---

## B. An sao theo CHI NĂM SINH

### B1. Thiên Mã

An tại cung cố định theo **Chi năm sinh** (không phụ thuộc giới tính):

| Chi năm      | Thiên Mã tại |
|--------------|-------------|
| Dần/Ngọ/Tuất | Thân (8)    |
| Thân/Tý/Thìn | Dần (2)     |
| Tỵ/Dậu/Sửu  | Hợi (11)    |
| Hợi/Mão/Mùi | Tỵ (5)      |

```typescript
function getThienMa(yearChi: DiaChi): number {
  const map: Partial<Record<DiaChi, number>> = {
    Dan: 8, Ngo: 8, Tuat: 8,
    Than: 2, Ty: 2, Thin: 2,
    Ti: 11, Dau: 11, Suu: 11,
    Hoi: 5, Mao: 5, Mui: 5,
  };
  return map[yearChi]!;
}
```

---

### B2. Hồng Loan & Thiên Hỷ

| Chi năm | Hồng Loan | Thiên Hỷ      |
|---------|-----------|---------------|
| Tý      | Mão (3)   | Dậu (9)       |
| Sửu     | Dần (2)   | Thân (8)      |
| Dần     | Sửu (1)   | Mùi (7)       |
| Mão     | Tý (0)    | Ngọ (6)       |
| Thìn    | Hợi (11)  | Tỵ (5)        |
| Tỵ      | Tuất (10) | Thìn (4)      |
| Ngọ     | Dậu (9)   | Mão (3)       |
| Mùi     | Thân (8)  | Dần (2)       |
| Thân    | Mùi (7)   | Sửu (1)       |
| Dậu     | Ngọ (6)   | Tý (0)        |
| Tuất    | Tỵ (5)    | Hợi (11)      |
| Hợi     | Thìn (4)  | Tuất (10)     |

> Thiên Hỷ luôn **đối xứng 180°** với Hồng Loan.

---

### B3. Long Trì & Phượng Các

| Chi năm | Long Trì | Phượng Các |
|---------|----------|------------|
| Tý      | Thìn (4) | Dậu (9)    |
| Sửu     | Tỵ (5)   | Tuất (10)  |
| Dần     | Ngọ (6)  | Hợi (11)   |
| Mão     | Mùi (7)  | Tý (0)     |
| Thìn    | Thân (8) | Sửu (1)    |
| Tỵ      | Dậu (9)  | Dần (2)    |
| Ngọ     | Tuất (10)| Mão (3)    |
| Mùi     | Hợi (11) | Thìn (4)   |
| Thân    | Tý (0)   | Tỵ (5)     |
| Dậu     | Sửu (1)  | Ngọ (6)    |
| Tuất    | Dần (2)  | Mùi (7)    |
| Hợi     | Mão (3)  | Thân (8)   |

---

### B4. Thiên Tài & Thiên Thọ

Khởi từ **cung Mệnh** (không phải Chi năm):

```
Thiên Tài: từ cung Mệnh, đếm THUẬN đến số thứ tự = Chi năm tính từ Tý
           (Tý=1, Sửu=2, Dần=3, ..., Hợi=12)

Thiên Thọ: từ cung Thân, đếm THUẬN đến số thứ tự = Chi năm
```

```typescript
const CHI_ORDER: Record<DiaChi, number> = {
  Ty:0, Suu:1, Dan:2, Mao:3, Thin:4, Ti:5,
  Ngo:6, Mui:7, Than:8, Dau:9, Tuat:10, Hoi:11
};

function getThienTai(menhIndex: number, yearChi: DiaChi): number {
  return (menhIndex + CHI_ORDER[yearChi]) % 12;
}
function getThienTho(thanIndex: number, yearChi: DiaChi): number {
  return (thanIndex + CHI_ORDER[yearChi]) % 12;
}
```

---

### B5. Vòng Thái Tuế – 12 sao (Chi năm)

Khởi tại cung **trùng với Chi năm sinh**, an **thuận**:

| Thứ tự | Tên sao        | Bản chất |
|--------|----------------|----------|
| 0      | Thái Tuế       | Hung     |
| 1      | Thiếu Dương    | Bình     |
| 2      | Tang Môn       | Hung     |
| 3      | Thiếu Âm       | Cát      |
| 4      | Quan Phù       | Hung     |
| 5      | Tử Phù         | Hung     |
| 6      | Tuế Phá        | Hung     |
| 7      | Long Đức       | Cát      |
| 8      | Bạch Hổ        | Hung     |
| 9      | Phúc Đức       | Cát      |
| 10     | Điếu Khách     | Hung     |
| 11     | Trực Phù       | Bình     |

---

### B6. Kiếp Sát, Hoa Cái, Kiếp Sát phụ tinh

| Chi năm      | Kiếp Sát  | Hoa Cái   |
|--------------|-----------|-----------|
| Dần/Ngọ/Tuất | Hợi (11)  | Thìn (4)  |
| Thân/Tý/Thìn | Tỵ (5)    | Tuất (10) |
| Tỵ/Dậu/Sửu  | Dần (2)   | Mùi (7)   |
| Hợi/Mão/Mùi | Thân (8)  | Sửu (1)   |

---

## C. Vòng Lộc Tồn – 12 sao (Can năm)

Khởi từ vị trí **Lộc Tồn** (xem bảng A4), an **thuận**:

| Thứ tự | Tên sao    | Bản chất       |
|--------|------------|----------------|
| 0      | Lộc Tồn   | Cát (đại cát)  |
| 1      | Lực Sỹ    | Cát            |
| 2      | Bác Sỹ    | Cát            |
| 3      | Quan Phủ  | Hung (quan tụng)|
| 4      | Tiểu Hao  | Hung           |
| 5      | Tướng Quân| Bình           |
| 6      | Tấu Thư   | Cát            |
| 7      | Phi Liêm  | Hung           |
| 8      | Hỷ Thần   | Cát            |
| 9      | Bệnh Phù  | Hung           |
| 10     | Đại Hao   | Hung (tán tài) |
| 11     | Phục Binh | Hung           |

> ⚠ Vòng này khởi tại **Lộc Tồn** (theo Can năm, xem A4), không phải tại Dần.