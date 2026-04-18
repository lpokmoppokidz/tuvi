# 08 – Data Types Đầy Đủ

---

## VanHanResult

```typescript
interface VanHanResult {
  // Đại hạn
  currentDaiHan: DaiHan;
  daiHanCung: Cung;
  daiHanCan: ThienCan;

  // Tiểu hạn
  tieuHanCungIndex: number;
  tieuHanCung: Cung;

  // Lưu niên
  luuNienYearCan: ThienCan;
  luuNienThaiTue: number;     // Cung index
  luuNienLocTon: number;
  luuNienTuHoa: TuHoaSet;

  // Phi Hóa (Bắc Tông)
  phiHoaBenMenh: PhiHoaResult;
  phiHoaDaiHan: PhiHoaResult;
  phiHoaLuuNien: PhiHoaResult;
  tamHoaAllCungs: TamHoaAnalysis[]; // 12 phần tử

  // Tổng hợp
  hotCungs: number[];    // Cung được nhiều Lộc
  dangerCungs: number[]; // Cung bị nhiều Kỵ
  overallScore: number;
}
```

## PhiHoaResult

```typescript
interface PhiHoaResult {
  locCung: number;
  quyenCung: number;
  khoaCung: number;
  kyCung: number;
}
```

## TuHoaSet

```typescript
interface TuHoaSet {
  loc: string;    // Tên sao
  quyen: string;
  khoa: string;
  ky: string;
}
```
