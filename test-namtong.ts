/**
 * Test NamTongCalculator trực tiếp
 */

import { calculateNamTong } from './src/domain/services/NamTongCalculator';

const input = {
  ho_ten: "Test",
  ngay_sinh: "18/05/2003",
  loai_lich: "duong",
  gio_sinh: "21:30",
  gioi_tinh: "Nam",
};

console.log('=== TEST NAMTONG CALCULATOR ===\n');

try {
  const result = calculateNamTong(input);
  
  console.log('Thông tin cơ bản:');
  console.log('- Âm lịch:', result.amLich);
  console.log('- Can Chi năm:', result.canChiNam);
  console.log('- Giờ Chi:', result.gioChi);
  console.log('- Bản mệnh:', result.banMenhHanh);
  console.log('- Cục:', result.cuc, '(số:', result.cucSo + ')');
  console.log('- Cung Mệnh index:', result.menhCungIndex);
  console.log('- Cung Thân index:', result.thanCungIndex);
  
  console.log('\n14 Chính tinh:');
  const chinhTinhMap: Record<string, string> = {};
  
  Object.values(result.cungs).forEach((cung: any) => {
    if (cung.stars && cung.stars.length > 0) {
      cung.stars.forEach((star: any) => {
        if (star.type === 'chinh_tinh') {
          chinhTinhMap[star.name] = cung.diaChi;
        }
      });
    }
  });
  
  const expectedPositions = {
    "Tử Vi": "Thìn",
    "Thiên Phủ": "Tý",
    "Thiên Cơ": "Mão",
    "Thái Dương": "Sửu",
    "Vũ Khúc": "Tý",
    "Thiên Đồng": "Hợi",
    "Liêm Trinh": "Thân",
    "Thái Âm": "Sửu",
    "Tham Lang": "Dần",
    "Cự Môn": "Mão",
    "Thiên Tướng": "Thìn",
    "Thiên Lương": "Tỵ",
    "Thất Sát": "Ngọ",
    "Phá Quân": "Tuất"
  };
  
  let passCount = 0;
  let failCount = 0;
  
  Object.entries(expectedPositions).forEach(([tinh, expectedCung]) => {
    const actualCung = chinhTinhMap[tinh];
    if (actualCung === expectedCung) {
      console.log(`✅ ${tinh}: ${actualCung}`);
      passCount++;
    } else {
      console.log(`❌ ${tinh}: ${actualCung} (mong đợi: ${expectedCung})`);
      failCount++;
    }
  });
  
  console.log('\n' + '='.repeat(50));
  console.log(`KẾT QUẢ: ${passCount} PASS / ${failCount} FAIL`);
  console.log('='.repeat(50));
  
  if (failCount === 0) {
    console.log('\n✅ NAMTONG CALCULATOR ĐÚNG!');
  } else {
    console.log('\n❌ NAMTONG CALCULATOR VẪN SAI!');
  }
  
} catch (error: any) {
  console.error('❌ LỖI:', error.message);
  console.error(error.stack);
}
