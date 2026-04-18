# 04 – Sửa Lỗi Thuật Toán & Helper Functions

> File này liệt kê các lỗi phổ biến trong implement Tử Vi và cung cấp helper functions chuẩn.

---

## I. Các lỗi thuật toán thường gặp

### ❌ Lỗi 1: Tính vị trí Tử Vi sai

**Sai:**
```typescript
// Thiếu xử lý trường hợp N/cuc_so > 12
const step = Math.ceil(ngay_am / cuc_so);
const pos = (2 + step - 1) % 12; // Có thể cho kết quả sai
```

**Đúng:**
```typescript
function findTuViPosition(ngay_am: number, cuc_so: number): number {
  let N = ngay_am;
  // Tăng N cho đến khi chia hết VÀ kết quả ≤ 12
  while (N % cuc_so !== 0 || N / cuc_so > 12) {
    N++;
    if (N > 12 * cuc_so) throw new Error(`Không tìm được vị trí Tử Vi: ngay=${ngay_am}, cuc=${cuc_so}`);
  }
  const step = N / cuc_so; // 1..12
  return (2 + step - 1) % 12; // Dần=index 2 là gốc
}
```

---

### ❌ Lỗi 2: Đà La không phải Lộc Tồn - 1

**Sai (thường thấy):**
```
Đà La = Lộc Tồn - 1 (liền kề trước Lộc Tồn)
```

**Đúng:**
```
Kình Dương = Lộc Tồn + 1 (thuận)
Đà La      = Lộc Tồn - 1 (nghịch) = 2 cung trước Kình Dương

→ Thứ tự trên bàn: ... Đà La ... Lộc Tồn ... Kình Dương ...
   Đà La và Kình Dương kẹp Lộc Tồn ở giữa.
```

```typescript
function getKinhDuong(locTonIndex: number): number {
  return (locTonIndex + 1) % 12;
}
function getDaLa(locTonIndex: number): number {
  return (locTonIndex - 1 + 12) % 12;
}
```

---

### ❌ Lỗi 3: An Mệnh cung sai chiều đếm

**Sai:**
```
Bước 2 (đếm theo giờ) luôn đếm nghịch
```

**Đúng:**
```
An Mệnh: Bước 2 đếm NGHỊCH
An Thân: Bước 2 đếm THUẬN
```

```typescript
function getMenhCung(thang: number, gioIndex: number): number {
  // Bước 1: từ Dần(2), đếm thuận theo tháng
  const step1 = (2 + thang - 1) % 12;
  // Bước 2: từ step1, đặt Tý, đếm NGHỊCH theo giờ
  return ((step1 - gioIndex) + 12 * 2) % 12;
}

function getThanCung(thang: number, gioIndex: number): number {
  // Bước 1: giống Mệnh
  const step1 = (2 + thang - 1) % 12;
  // Bước 2: từ step1, đặt Tý, đếm THUẬN theo giờ
  return (step1 + gioIndex) % 12;
}
```

---

### ❌ Lỗi 4: Chiều vòng Tràng Sinh không phụ thuộc giới tính

**Sai:**
```
Luôn đếm thuận
```

**Đúng:**
```
Nam Dương / Nữ Âm  → thuận
Nam Âm   / Nữ Dương → nghịch
```

Xem chi tiết ở file `03-phu-tinh-gio-ngay-thang-trang-sinh.md` mục A.

---

### ❌ Lỗi 5: Thiên Phủ đối xứng tính sai

**Sai:**
```typescript
pos_ThienPhu = 12 - pos_TuVi; // Sai
```

**Đúng:**
```typescript
// Trục đối xứng là Dần(2)–Thân(8), tổng = 10
pos_ThienPhu = (10 - pos_TuVi + 12) % 12;

// Hoặc dùng lookup table cho an toàn:
const TUVI_TO_THIENFU: Record<number, number> = {
  2: 8,   // Dần → Thân
  3: 7,   // Mão → Mùi
  4: 6,   // Thìn → Ngọ
  5: 5,   // Tỵ → Tỵ (trùng)
  6: 4,   // Ngọ → Thìn
  7: 3,   // Mùi → Mão
  8: 2,   // Thân → Dần
  9: 1,   // Dậu → Sửu
  10: 0,  // Tuất → Tý
  11: 11, // Hợi → Hợi (trùng)
};
```

---

### ❌ Lỗi 6: Tứ Hóa an vào cung thay vì gán vào sao

**Sai:**
```typescript
// Tạo sao Hóa Lộc như một sao thường rồi an vào cung
cungs[locCungIndex].stars.push({ name: 'Hóa Lộc', ... });
```

**Đúng:**
```typescript
// Hóa Lộc, Quyền, Khoa, Kỵ là THUỘC TÍNH của sao chính tinh/phụ tinh
// Không tạo object sao riêng
for (const star of allStars) {
  if (star.name === tuHoaTarget) {
    star.tuHoa = 'LOC'; // 'LOC' | 'QUYEN' | 'KHOA' | 'KY' | null
  }
}
```

---

## II. Helper Functions chuẩn

```typescript
// ============================================================
// CORE HELPERS
// ============================================================

const DIA_CHI = ['Tý','Sửu','Dần','Mão','Thìn','Tỵ','Ngọ','Mùi','Thân','Dậu','Tuất','Hợi'] as const;
type DiaChi = typeof DIA_CHI[number];

/** Đếm cung theo chiều thuận hoặc nghịch */
function countCung(startIndex: number, steps: number, direction: 'thuan' | 'nghich'): number {
  const d = direction === 'thuan' ? 1 : -1;
  return ((startIndex + d * steps) % 12 + 12) % 12;
}

/** Khoảng cách ngắn nhất giữa 2 cung (tính theo chiều thuận) */
function cungDistance(from: number, to: number): number {
  return (to - from + 12) % 12;
}

/** Lấy cung đối xứng 180° */
function oppositeCung(index: number): number {
  return (index + 6) % 12;
}

/** Lấy tam hợp của một cung */
function tamHop(index: number): [number, number, number] {
  return [index, (index + 4) % 12, (index + 8) % 12];
}

/** Kiểm tra 2 cung có tam hợp không */
function isTamHop(a: number, b: number): boolean {
  return (Math.abs(a - b) % 4 === 0) && a !== b;
}

/** Nhị hợp */
const NHI_HOP_MAP: Record<number, number> = {
  0:1, 1:0, 2:11, 11:2, 3:10, 10:3,
  4:9, 9:4, 5:8, 8:5, 6:7, 7:6
};
function nhiHop(index: number): number { return NHI_HOP_MAP[index]; }

// ============================================================
// CAN / CHI HELPERS
// ============================================================

const THIEN_CAN = ['Giáp','Ất','Bính','Đinh','Mậu','Kỷ','Canh','Tân','Nhâm','Quý'] as const;
type ThienCan = typeof THIEN_CAN[number];

function isCanDuong(can: ThienCan): boolean {
  return ['Giáp','Bính','Mậu','Canh','Nhâm'].includes(can);
}

function getAmDuong(can: ThienCan, gender: 'NAM' | 'NU'): 'AM' | 'DUONG' {
  const canDuong = isCanDuong(can);
  if (gender === 'NAM') return canDuong ? 'DUONG' : 'AM';
  else return canDuong ? 'AM' : 'DUONG'; // Nữ đảo ngược
}

function isThuanChieu(can: ThienCan, gender: 'NAM' | 'NU'): boolean {
  // Nam Dương / Nữ Âm → thuận
  const amduong = getAmDuong(can, gender);
  return (gender === 'NAM' && amduong === 'DUONG') ||
         (gender === 'NU'  && amduong === 'AM');
}

// ============================================================
// AN SAO HELPERS
// ============================================================

function getTuViPosition(ngay_am: number, cuc_so: number): number {
  if (ngay_am < 1 || ngay_am > 30) throw new Error('Ngày âm không hợp lệ');
  let N = ngay_am;
  while (N % cuc_so !== 0 || N / cuc_so > 12) {
    N++;
    if (N > 120) throw new Error('Lỗi tìm Tử Vi');
  }
  return (2 + N / cuc_so - 1) % 12;
}

function getThienPhuPosition(tuViIndex: number): number {
  return (10 - tuViIndex + 12) % 12;
}

// Hệ Tử Vi offsets (nghịch chiều)
const TU_VI_OFFSETS: Record<string, number> = {
  'Tử Vi': 0, 'Thiên Cơ': -1, 'Thái Dương': -3,
  'Vũ Khúc': -4, 'Thiên Đồng': -5, 'Liêm Trinh': -8
};

// Hệ Thiên Phủ offsets (thuận chiều)
const THIEN_PHU_OFFSETS: Record<string, number> = {
  'Thiên Phủ': 0, 'Thái Âm': 1, 'Tham Lang': 2,
  'Cự Môn': 3, 'Thiên Tướng': 4, 'Thiên Lương': 5,
  'Thất Sát': 6, 'Phá Quân': 10
};

function anHeTuVi(tuViIndex: number): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [sao, offset] of Object.entries(TU_VI_OFFSETS)) {
    result[sao] = ((tuViIndex + offset) % 12 + 12) % 12;
  }
  return result;
}

function anHeThienPhu(thienPhuIndex: number): Record<string, number> {
  const result: Record<string, number> = {};
  for (const [sao, offset] of Object.entries(THIEN_PHU_OFFSETS)) {
    result[sao] = (thienPhuIndex + offset) % 12;
  }
  return result;
}

// ============================================================
// TUẦN TRUNG & TRIỆT LỘ
// ============================================================

/**
 * Tính Tuần Không từ Can Chi ngày sinh.
 * Trả về 2 index cung bị Tuần.
 */
function getTuanKhong(ngayCan: ThienCan, ngayChi: DiaChi): [number, number] {
  const canIdx  = THIEN_CAN.indexOf(ngayCan);
  const chiIdx  = DIA_CHI.indexOf(ngayChi);
  // Tìm ngày Giáp đầu tuần: chi của ngày Giáp = chiIdx - canIdx
  const giapChi = ((chiIdx - canIdx) % 12 + 12) % 12;
  // 2 chi bị không = giapChi + 10 và giapChi + 11
  return [
    (giapChi + 10) % 12,
    (giapChi + 11) % 12,
  ];
}

const TRIET_LO_MAP: Partial<Record<ThienCan, [number, number]>> = {
  'Giáp': [8, 9], 'Kỷ':  [8, 9],   // Thân(8), Dậu(9)
  'Ất':  [6, 7], 'Canh': [6, 7],   // Ngọ(6), Mùi(7)
  'Bính': [4, 5], 'Tân':  [4, 5],  // Thìn(4), Tỵ(5)
  'Đinh': [2, 3], 'Nhâm': [2, 3],  // Dần(2), Mão(3)
  'Mậu':  [0, 1], 'Quý':  [0, 1],  // Tý(0), Sửu(1)
};

function getTrietLo(namCan: ThienCan): [number, number] {
  return TRIET_LO_MAP[namCan] ?? [0, 0];
}
```

---

## III. Thứ tự implement khuyến nghị

```
1. convertToLunar()          → Âm lịch chuẩn (kiểm tra tháng nhuận!)
2. getCanChi()               → Can Chi năm/tháng/ngày/giờ
3. getMenhCung()             → Cung Mệnh
4. getThanCung()             → Cung Thân
5. assignPalaceNames()       → 12 cung chức danh
6. determineCuc()            → Số cục
7. getTuViPosition()         → Tử Vi
8. anHeTuVi()                → 6 chính tinh hệ Tử Vi
9. getThienPhuPosition()     → Thiên Phủ
10. anHeThienPhu()           → 8 chính tinh hệ Thiên Phủ
11. anVongThaiTue()          → 12 sao Chi năm
12. anVongLocTon()           → Lộc Tồn + Kình Đà + 12 sao vòng
13. anVongTrangSinh()        → 12 sao theo Cục
14. anSaoTheoThang()         → Tả Hữu + 7 sao tháng
15. anSaoTheoGio()           → Xương Khúc + Không Kiếp
16. anSaoTheoNgay()          → Tam Thai + Bát Tọa + Ân Quang + Thiên Quý
17. anSaoTheoCanNam()        → Khôi Việt + Thiên Mã + Hồng Loan + ...
18. applyTuHoa()             → Gán Tứ Hóa vào sao
19. getTuanKhong()           → Tuần Không
20. getTrietLo()             → Triệt Lộ
21. calculateBrightness()    → Trạng thái Miếu/Vượng/Đắc/Hãm
22. detectCachCuc()          → Nhận diện Cách cục
```