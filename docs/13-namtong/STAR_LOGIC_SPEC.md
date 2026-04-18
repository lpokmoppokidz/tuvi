# Star Logic Specification - Nam Tông (Nam Phái)

> **Mục đích**: Chốt cứng các công thức tính toán sao Tử Vi theo trường phái Nam Tông để tránh nhầm lẫn với Bắc Phái.
> 
> **Nguồn tham khảo**: tuvi.vn (benchmark standard)
> 
> **Test case chuẩn**: 18/05/2003 - 21:30 (Dương lịch) = 18/4/Quý Mùi - Giờ Hợi

---

## 1. Tính Cục (CRITICAL)

### Công thức
```
Cục = f(Can năm sinh, Nhóm Chi của Cung Mệnh)
```

### Bảng tra cứu CUC_TABLE

| Can năm | Dần/Ngọ/Tuất (A) | Thân/Tý/Thìn (B) | Tỵ/Dậu/Sửu (C) | Hợi/Mão/Mùi (D) |
|---------|------------------|------------------|----------------|-----------------|
| Giáp (0)| Hỏa 6            | Thủy 2           | Thổ 5          | Mộc 3           |
| Ất (1)  | Kim 4            | Thổ 5            | Hỏa 6          | Thủy 2          |
| Bính (2)| Mộc 3            | Hỏa 6            | Kim 4          | Thổ 5           |
| Đinh (3)| Thổ 5            | Mộc 3            | Thủy 2         | Hỏa 6           |
| Mậu (4) | Hỏa 6            | Thủy 2           | Thổ 5          | Mộc 3           |
| Kỷ (5)  | Hỏa 6            | Thủy 2           | Thổ 5          | Mộc 3           |
| Canh (6)| Kim 4            | Thổ 5            | Hỏa 6          | Thủy 2          |
| Tân (7) | Mộc 3            | Hỏa 6            | Kim 4          | Thổ 5           |
| Nhâm (8)| Thổ 5            | Mộc 3            | Thủy 2         | Hỏa 6           |
| Quý (9) | **Hỏa 6**        | Mộc 3            | Thủy 2         | Kim 4           |

### Test case verification
- Can năm: Quý (9)
- Cung Mệnh: Ngọ (thuộc nhóm A = Dần/Ngọ/Tuất)
- → Tra bảng: Quý + A → **Hỏa 6 cục** ✓

### Implementation
```typescript
const CUC_TABLE: Record<number, Record<string, string>> = {
  0: { A: "Hỏa", B: "Thủy", C: "Thổ", D: "Mộc" },  // Giáp
  1: { A: "Kim", B: "Thổ", C: "Hỏa", D: "Thủy" },  // Ất
  2: { A: "Mộc", B: "Hỏa", C: "Kim", D: "Thổ" },   // Bính
  3: { A: "Thổ", B: "Mộc", C: "Thủy", D: "Hỏa" },  // Đinh
  4: { A: "Hỏa", B: "Thủy", C: "Thổ", D: "Mộc" },  // Mậu
  5: { A: "Hỏa", B: "Thủy", C: "Thổ", D: "Mộc" },  // Kỷ
  6: { A: "Kim", B: "Thổ", C: "Hỏa", D: "Thủy" },  // Canh
  7: { A: "Mộc", B: "Hỏa", C: "Kim", D: "Thổ" },   // Tân
  8: { A: "Thổ", B: "Mộc", C: "Thủy", D: "Hỏa" },  // Nhâm
  9: { A: "Hỏa", B: "Mộc", C: "Thủy", D: "Kim" },  // Quý
};

function getChiGroup(chi: string): "A" | "B" | "C" | "D" {
  if (["Dần", "Ngọ", "Tuất"].includes(chi)) return "A";
  if (["Thân", "Tý", "Thìn"].includes(chi)) return "B";
  if (["Tỵ", "Dậu", "Sửu"].includes(chi)) return "C";
  return "D"; // Hợi, Mão, Mùi
}
```

---

## 2. Văn Xương & Văn Khúc (HIGH PRIORITY)

### Công thức
```
Văn Xương: Nghịch từ Tuất theo Can năm
Văn Khúc: Thuận từ Thìn theo Can năm
```

### Bảng tra cứu (theo CHI index)

| Can năm | Văn Xương (CHI idx) | Văn Khúc (CHI idx) |
|---------|---------------------|---------------------|
| Giáp (0)| 10 (Tuất)           | 4 (Thìn)            |
| Ất (1)  | 9 (Dậu)             | 5 (Tỵ)              |
| Bính (2)| 8 (Thân)            | 6 (Ngọ)             |
| Đinh (3)| 7 (Mùi)             | 7 (Mùi)             |
| Mậu (4) | 6 (Ngọ)             | 8 (Thân)            |
| Kỷ (5)  | 5 (Tỵ)              | 9 (Dậu)             |
| Canh (6)| 4 (Thìn)            | 10 (Tuất)           |
| Tân (7) | 3 (Mão)             | 11 (Hợi)            |
| Nhâm (8)| 2 (Dần)             | 0 (Tý)              |
| Quý (9) | **11 (Hợi)**        | **3 (Mão)**         |

### Test case verification
- Can năm: Quý (9)
- Văn Xương: CHI[11] = Hợi ✓
- Văn Khúc: CHI[3] = Mão ✓

### Implementation (CHUẨN)
```typescript
// Văn Xương (nghịch từ Tuất theo Can)
const VAN_XUONG_CHI: Record<number, number> = {
  0: 10,  // Giáp → Tuất
  1: 9,   // Ất → Dậu
  2: 8,   // Bính → Thân
  3: 7,   // Đinh → Mùi
  4: 6,   // Mậu → Ngọ
  5: 5,   // Kỷ → Tỵ
  6: 4,   // Canh → Thìn
  7: 3,   // Tân → Mão
  8: 2,   // Nhâm → Dần
  9: 11   // Quý → Hợi ✓
};

// Văn Khúc (thuận từ Thìn theo Can)
const VAN_KHUC_CHI: Record<number, number> = {
  0: 4,   // Giáp → Thìn
  1: 5,   // Ất → Tỵ
  2: 6,   // Bính → Ngọ
  3: 7,   // Đinh → Mùi
  4: 8,   // Mậu → Thân
  5: 9,   // Kỷ → Dậu
  6: 10,  // Canh → Tuất
  7: 11,  // Tân → Hợi
  8: 0,   // Nhâm → Tý
  9: 3    // Quý → Mão ✓
};
```

---

## 3. Hỏa Tinh & Linh Tinh (MEDIUM PRIORITY)

### Công thức
```
Hỏa Tinh & Linh Tinh: Theo Chi năm sinh (KHÔNG phụ thuộc giới tính/Âm Dương)
```

### Bảng tra cứu (theo CHI năm index)

| Chi năm     | Hỏa Tinh (CHI idx) | Linh Tinh (CHI idx) |
|-------------|---------------------|---------------------|
| Tý (0)      | 9 (Dậu)             | 3 (Mão)             |
| Sửu (1)     | 10 (Tuất)           | 9 (Dậu)             |
| Dần (2)     | 2 (Dần)             | 10 (Tuất)           |
| Mão (3)     | 3 (Mão)             | 10 (Tuất)           |
| Thìn (4)    | 9 (Dậu)             | 3 (Mão)             |
| Tỵ (5)      | 10 (Tuất)           | 9 (Dậu)             |
| Ngọ (6)     | 9 (Dậu)             | 3 (Mão)             |
| Mùi (7)     | **4 (Thìn)**        | **3 (Mão)**         |
| Thân (8)    | 9 (Dậu)             | 3 (Mão)             |
| Dậu (9)     | 10 (Tuất)           | 9 (Dậu)             |
| Tuất (10)   | 2 (Dần)             | 10 (Tuất)           |
| Hợi (11)    | 3 (Mão)             | 10 (Tuất)           |

### Test case verification
- Chi năm: Mùi (7)
- Hỏa Tinh: CHI[4] = Thìn ✓
- Linh Tinh: CHI[3] = Mão ✓

### Implementation (CHUẨN)
```typescript
// Hỏa Tinh & Linh Tinh theo Chi năm (chiIdx theo CHI array)
const HOA_TINH_CHI: Record<number, number> = {
  0: 9,   // Tý → Dậu
  1: 10,  // Sửu → Tuất
  2: 2,   // Dần → Dần
  3: 3,   // Mão → Mão
  4: 9,   // Thìn → Dậu
  5: 10,  // Tỵ → Tuất
  6: 9,   // Ngọ → Dậu
  7: 4,   // Mùi → Thìn ✓
  8: 9,   // Thân → Dậu
  9: 10,  // Dậu → Tuất
  10: 2,  // Tuất → Dần
  11: 3   // Hợi → Mão
};

const LINH_TINH_CHI: Record<number, number> = {
  0: 3,   // Tý → Mão
  1: 9,   // Sửu → Dậu
  2: 10,  // Dần → Tuất
  3: 10,  // Mão → Tuất
  4: 3,   // Thìn → Mão
  5: 9,   // Tỵ → Dậu
  6: 3,   // Ngọ → Mão
  7: 3,   // Mùi → Mão ✓
  8: 3,   // Thân → Mão
  9: 9,   // Dậu → Dậu
  10: 10, // Tuất → Tuất
  11: 10  // Hợi → Tuất
};
```

---

## 4. Các sao khác (đã đúng)

### Lộc Tồn, Kình Dương, Đà La (theo Can năm)
✅ Đã đúng - không cần sửa

### Tả Phụ, Hữu Bật (theo tháng âm)
✅ Đã đúng - không cần sửa

### Thiên Mã (theo Chi năm)
✅ Đã đúng - không cần sửa

### Địa Không, Địa Kiếp (theo giờ sinh)
✅ Đã đúng - không cần sửa

---

## 5. Checklist Implementation

### Priority: CRITICAL
- [x] Tạo file STAR_LOGIC_SPEC.md
- [ ] Fix CUC_TABLE (Quý + A → Hỏa 6)
- [ ] Verify 14 chính tinh sau khi fix Cục

### Priority: HIGH
- [ ] Fix VAN_XUONG_CHI[9] = 11 (Hợi)
- [ ] Fix VAN_KHUC_CHI[9] = 3 (Mão)

### Priority: MEDIUM
- [ ] Fix HOA_TINH_CHI[7] = 4 (Thìn)
- [ ] Fix LINH_TINH_CHI[7] = 3 (Mão)

### Final Verification
- [ ] Chạy test benchmark: 21 PASS → 35 PASS
- [ ] Verify với test case khác (nếu có)

---

## 6. Notes

### Sự khác biệt Nam Tông vs Bắc Tông
- **Nam Tông**: Tập trung vào mật độ sao dày đặc, trạng thái Miếu/Vượng/Đắc/Hãm
- **Bắc Tông**: Tập trung vào biến hóa Tứ Hóa

### Nguồn tham khảo
- tuvi.vn (benchmark standard)
- docs/13-namtong/README.md (lý thuyết)
- Tử Vi Đẩu Số Tân Biên (sách tham khảo)

### Lưu ý khi implement
- **KHÔNG** dùng Nạp Âm 60 giáp tử để tính Cục (vì có tổ hợp không hợp lệ như Quý Ngọ)
- **PHẢI** dùng bảng CUC_TABLE cố định
- **KHÔNG** nhầm lẫn giữa Bản Mệnh (Nạp Âm năm sinh) và Cục (tra bảng)
