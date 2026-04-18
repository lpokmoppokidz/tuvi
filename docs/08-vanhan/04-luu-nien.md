# 04 – Lưu Niên (流年) – An Sao Vòng Năm

---

## Lưu Niên Thái Tuế

Mỗi năm, **Thái Tuế** di chuyển đến cung mang Chi của năm đó:

```typescript
function getLuuNienThaiTue(yearChi: DiaChi): number {
  // Thái Tuế = cung mang đúng Chi năm hiện tại
  return DIA_CHI_INDEX[yearChi];
}
```

Khi Thái Tuế đến cung Mệnh, cung Tài, cung Quan... → có ý nghĩa đặc biệt.

---

## Lưu Niên Lộc Tồn, Kình Dương, Đà La

An theo **Can của năm hiện tại** (không phải năm sinh):

```typescript
function getLuuNienLocTon(currentYearCan: ThienCan): number {
  return LOC_TON_BY_CAN[currentYearCan];
}
```

---

## Lưu Tứ Hóa (Lưu Niên Tứ Hóa)

Quan trọng nhất trong luận vận hạn — áp dụng Tứ Hóa của **Can năm hiện tại** lên lá số:

```typescript
function getLuuTuHoa(currentYearCan: ThienCan): TuHoaSet {
  return TU_HOA_TABLE[currentYearCan];
  // Trả về { loc: SaoName, quyen: SaoName, khoa: SaoName, ky: SaoName }
}
```
