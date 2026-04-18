# 12. Kiến trúc dữ liệu gợi ý

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
