# 06 – Tam Hóa (Triple Transform) – Kỹ Thuật Nâng Cao Bắc Tông

---

## Khái niệm

Bắc Tông xếp chồng **3 lớp Tứ Hóa** để đánh giá mức độ ảnh hưởng lên từng cung:

```
Lớp 1: Tứ Hóa của CAN NĂM SINH   (bản mệnh, cố định)
Lớp 2: Tứ Hóa của CAN ĐẠI HẠN   (biến động 10 năm)
Lớp 3: Tứ Hóa của CAN LƯU NIÊN  (biến động 1 năm)
```

- Cùng một cung bị **Hóa Kỵ từ cả 3 lớp** → sự kiện rất nặng.
- Cùng một cung được **Hóa Lộc từ cả 3 lớp** → vận may lớn, hiếm gặp.

---

## TypeScript

```typescript
interface TamHoaAnalysis {
  cungIndex: number;
  benMenh: 'LOC' | 'QUYEN' | 'KHOA' | 'KY' | null;    // Lớp 1
  daiHan:  'LOC' | 'QUYEN' | 'KHOA' | 'KY' | null;    // Lớp 2
  luuNien: 'LOC' | 'QUYEN' | 'KHOA' | 'KY' | null;    // Lớp 3
  score: number;  // LOC=+2, QUYEN=+1, KHOA=+1, KY=-3
}

function calculateTamHoa(
  cungIndex: number,
  yearCan: ThienCan,          // Can năm sinh
  daiHanCan: ThienCan,        // Can cung đại hạn
  luuNienCan: ThienCan,       // Can của năm hiện tại
  allStars: Star[],
  cungs: Cung[]
): TamHoaAnalysis {
  const layers = [yearCan, daiHanCan, luuNienCan].map(can => {
    const hoa = TU_HOA_TABLE[can];
    return getHoaAtCung(hoa, cungIndex, allStars, cungs);
  });

  const scoreMap = { LOC: 2, QUYEN: 1, KHOA: 1, KY: -3, null: 0 };
  const score = layers.reduce((sum, h) => sum + (scoreMap[h ?? 'null'] ?? 0), 0);

  return {
    cungIndex,
    benMenh: layers[0],
    daiHan: layers[1],
    luuNien: layers[2],
    score,
  };
}
```
