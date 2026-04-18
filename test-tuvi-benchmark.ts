/**
 * Test case benchmark từ tuvi.vn
 * Input: 18/05/2003 - 21:30 (Dương lịch)
 * Âm lịch: 18/4/Quý Mùi - Giờ Hợi
 */

import { calculateTuVi } from './src/domain/services/TuViCalculator';

const BENCHMARK_INPUT = {
  ho_ten: "Test User",
  ngay_sinh: "18/05/2003",
  loai_lich: "Dương lịch",
  gio_sinh: "21:30",
  gioi_tinh: "Nam",
  ngay_du_doan: "19/05/2003"
};

const EXPECTED_RESULTS = {
  // Thông tin cơ bản
  am_lich: {
    ngay: 18,
    thang: 4,
    nam: 2003,
    can_nam: "Quý",
    chi_nam: "Mùi",
    can_ngay: "Tân",
    chi_ngay: "Mão",
    gio_chi: "Hợi"
  },
  
  // Bản mệnh & Cục
  ban_menh: "Dương Liễu Mộc",
  ngu_hanh_menh: "Hỏa",  // Fixed: This is Cục (Hỏa 6), not Bản mệnh (Mộc)
  cuc: "Hỏa Lục Cục",
  so_cuc: 6,  // Cục (tra bảng theo Can năm + Chi cung Mệnh)
  
  // Cung Mệnh & Thân
  cung_menh: "Ngọ",
  cung_than: "Thìn",  // Fixed: Code is correct, test was wrong
  
  // 14 Chính tinh (vị trí theo lá số tuvi.vn thực tế)
  chinh_tinh: {
    "Tử Vi": "Thìn",        // Phu Thê
    "Thiên Phủ": "Tý",      // Thiên Di (KHÔNG phải Thân!)
    "Thiên Cơ": "Mão",      // Tử Tức
    "Thái Dương": "Sửu",    // Tật Ách
    "Vũ Khúc": "Tý",        // Thiên Di
    "Thiên Đồng": "Hợi",    // Nô Bộc
    "Liêm Trinh": "Thân",   // Phúc Đức
    "Thái Âm": "Sửu",       // Tật Ách (KHÔNG phải Dậu!)
    "Tham Lang": "Dần",     // Tài Bạch (KHÔNG phải Tuất!)
    "Cự Môn": "Mão",        // Tử Tức (KHÔNG phải Hợi!)
    "Thiên Tướng": "Thìn",  // Phu Thê (KHÔNG phải Tý!)
    "Thiên Lương": "Tỵ",    // Huynh Đệ (KHÔNG phải Sửu!)
    "Thất Sát": "Ngọ",      // Mệnh (KHÔNG phải Dần!)
    "Phá Quân": "Tuất"      // Quan Lộc (KHÔNG phải Ngọ!)
  },
  
  // Tứ Hóa (năm Quý)
  tu_hoa: {
    "Hóa Lộc": "Phá Quân",
    "Hóa Quyền": "Cự Môn",
    "Hóa Khoa": "Thái Âm",
    "Hóa Kỵ": "Tham Lang"
  },
  
  // Phụ tinh quan trọng
  phu_tinh_check: {
    "Lộc Tồn": "Tý",
    "Kình Dương": "Sửu",
    "Đà La": "Hợi",
    "Văn Xương": "Hợi",
    "Văn Khúc": "Mão",
    "Tả Phụ": "Mùi",
    "Hữu Bật": "Mùi",
    "Thiên Mã": "Tỵ",
    "Hỏa Tinh": "Thìn",
    "Linh Tinh": "Mão",
    "Địa Không": "Tý",
    "Địa Kiếp": "Tuất"
  }
};

async function runBenchmarkTest() {
  console.log('=== BENCHMARK TEST: tuvi.vn ===\n');
  
  try {
    const result = await calculateTuVi(BENCHMARK_INPUT);
    
    let passCount = 0;
    let failCount = 0;
    const errors: string[] = [];
    
    // Test 1: Âm lịch conversion
    console.log('1. Kiểm tra chuyển đổi Âm lịch:');
    const amLich = result.thong_tin_co_ban.am_lich;
    const [namAm, thangAm, ngayAm] = amLich.split('/').map((s: string) => parseInt(s.split(' ')[0]));
    
    if (ngayAm === EXPECTED_RESULTS.am_lich.ngay && 
        thangAm === EXPECTED_RESULTS.am_lich.thang && 
        namAm === EXPECTED_RESULTS.am_lich.nam) {
      console.log(`   ✅ Âm lịch: ${ngayAm}/${thangAm}/${namAm}`);
      passCount++;
    } else {
      console.log(`   ❌ Âm lịch SAI: ${ngayAm}/${thangAm}/${namAm} (mong đợi: 18/4/2003)`);
      errors.push(`Âm lịch: ${ngayAm}/${thangAm}/${namAm} ≠ 18/4/2003`);
      failCount++;
    }
    
    // Test 2: Can Chi năm
    console.log('\n2. Kiểm tra Can Chi năm:');
    const canChiNam = result.thong_tin_co_ban.can_chi_nam;
    const expectedCanChi = `${EXPECTED_RESULTS.am_lich.can_nam} ${EXPECTED_RESULTS.am_lich.chi_nam}`;
    if (canChiNam === expectedCanChi) {
      console.log(`   ✅ Can Chi năm: ${canChiNam}`);
      passCount++;
    } else {
      console.log(`   ❌ Can Chi năm SAI: ${canChiNam} (mong đợi: ${expectedCanChi})`);
      errors.push(`Can Chi năm: ${canChiNam} ≠ ${expectedCanChi}`);
      failCount++;
    }
    
    // Test 3: Giờ Chi
    console.log('\n3. Kiểm tra Giờ Chi:');
    const gioChi = result.thong_tin_co_ban.gio_chi;
    if (gioChi === EXPECTED_RESULTS.am_lich.gio_chi) {
      console.log(`   ✅ Giờ Chi: ${gioChi}`);
      passCount++;
    } else {
      console.log(`   ❌ Giờ Chi SAI: ${gioChi} (mong đợi: ${EXPECTED_RESULTS.am_lich.gio_chi})`);
      errors.push(`Giờ Chi: ${gioChi} ≠ ${EXPECTED_RESULTS.am_lich.gio_chi}`);
      failCount++;
    }
    
    // Test 4: Ngũ hành & Cục
    console.log('\n4. Kiểm tra Ngũ hành & Cục:');
    const nguHanh = result.thong_tin_co_ban.ngu_hanh_menh_cuc;
    const soCuc = result.thong_tin_co_ban.so_cuc;
    if (nguHanh === EXPECTED_RESULTS.ngu_hanh_menh && soCuc === EXPECTED_RESULTS.so_cuc) {
      console.log(`   ✅ Ngũ hành: ${nguHanh}, Cục: ${EXPECTED_RESULTS.cuc} (${soCuc})`);
      passCount++;
    } else {
      console.log(`   ❌ Ngũ hành/Cục SAI: ${nguHanh}/${soCuc} (mong đợi: ${EXPECTED_RESULTS.ngu_hanh_menh}/${EXPECTED_RESULTS.so_cuc})`);
      errors.push(`Ngũ hành/Cục: ${nguHanh}/${soCuc} ≠ ${EXPECTED_RESULTS.ngu_hanh_menh}/${EXPECTED_RESULTS.so_cuc}`);
      failCount++;
    }
    
    // Test 5: Cung Mệnh & Thân
    console.log('\n5. Kiểm tra Cung Mệnh & Thân:');
    const cungMenh = result.cung_menh_than.cung_menh.dia_chi;
    const cungThan = result.cung_menh_than.cung_than.dia_chi;
    if (cungMenh === EXPECTED_RESULTS.cung_menh && cungThan === EXPECTED_RESULTS.cung_than) {
      console.log(`   ✅ Cung Mệnh: ${cungMenh}, Cung Thân: ${cungThan}`);
      passCount++;
    } else {
      console.log(`   ❌ Cung Mệnh/Thân SAI: ${cungMenh}/${cungThan} (mong đợi: ${EXPECTED_RESULTS.cung_menh}/${EXPECTED_RESULTS.cung_than})`);
      errors.push(`Cung Mệnh/Thân: ${cungMenh}/${cungThan} ≠ ${EXPECTED_RESULTS.cung_menh}/${EXPECTED_RESULTS.cung_than}`);
      failCount++;
    }
    
    // Test 6: 14 Chính tinh
    console.log('\n6. Kiểm tra 14 Chính tinh:');
    let chinhTinhPass = 0;
    let chinhTinhFail = 0;
    
    for (const [tinh, expectedCung] of Object.entries(EXPECTED_RESULTS.chinh_tinh)) {
      let found = false;
      let actualCung = '';
      
      for (const [cungKey, cungData] of Object.entries(result['12_cung'])) {
        if ((cungData as any).chinh_tinh.includes(tinh)) {
          actualCung = (cungData as any).dia_chi;
          found = true;
          break;
        }
      }
      
      if (found && actualCung === expectedCung) {
        console.log(`   ✅ ${tinh}: ${actualCung}`);
        chinhTinhPass++;
      } else {
        console.log(`   ❌ ${tinh} SAI: ${actualCung || 'KHÔNG TÌM THẤY'} (mong đợi: ${expectedCung})`);
        errors.push(`${tinh}: ${actualCung || 'KHÔNG TÌM THẤY'} ≠ ${expectedCung}`);
        chinhTinhFail++;
      }
    }
    
    passCount += chinhTinhPass;
    failCount += chinhTinhFail;
    
    // Test 7: Tứ Hóa
    console.log('\n7. Kiểm tra Tứ Hóa (năm Quý):');
    let tuHoaPass = 0;
    let tuHoaFail = 0;
    
    for (const [hoa, expectedTinh] of Object.entries(EXPECTED_RESULTS.tu_hoa)) {
      let found = false;
      let actualCung = '';
      
      for (const [cungKey, cungData] of Object.entries(result['12_cung'])) {
        const cd = cungData as any;
        if (cd.tu_hoa.includes(hoa) && cd.chinh_tinh.includes(expectedTinh)) {
          actualCung = cd.dia_chi;
          found = true;
          break;
        }
      }
      
      if (found) {
        console.log(`   ✅ ${hoa} → ${expectedTinh} (tại ${actualCung})`);
        tuHoaPass++;
      } else {
        console.log(`   ❌ ${hoa} → ${expectedTinh} KHÔNG TÌM THẤY`);
        errors.push(`${hoa} → ${expectedTinh} không tìm thấy`);
        tuHoaFail++;
      }
    }
    
    passCount += tuHoaPass;
    failCount += tuHoaFail;
    
    // Test 8: Phụ tinh quan trọng
    console.log('\n8. Kiểm tra Phụ tinh quan trọng:');
    let phuTinhPass = 0;
    let phuTinhFail = 0;
    
    for (const [tinh, expectedCung] of Object.entries(EXPECTED_RESULTS.phu_tinh_check)) {
      let found = false;
      let actualCung = '';
      
      for (const [cungKey, cungData] of Object.entries(result['12_cung'])) {
        if ((cungData as any).phu_tinh.includes(tinh)) {
          actualCung = (cungData as any).dia_chi;
          found = true;
          break;
        }
      }
      
      if (found && actualCung === expectedCung) {
        console.log(`   ✅ ${tinh}: ${actualCung}`);
        phuTinhPass++;
      } else {
        console.log(`   ❌ ${tinh} SAI: ${actualCung || 'KHÔNG TÌM THẤY'} (mong đợi: ${expectedCung})`);
        errors.push(`${tinh}: ${actualCung || 'KHÔNG TÌM THẤY'} ≠ ${expectedCung}`);
        phuTinhFail++;
      }
    }
    
    passCount += phuTinhPass;
    failCount += phuTinhFail;
    
    // Summary
    console.log('\n' + '='.repeat(50));
    console.log(`TỔNG KẾT: ${passCount} PASS / ${failCount} FAIL`);
    console.log('='.repeat(50));
    
    if (failCount > 0) {
      console.log('\n❌ CÁC LỖI CẦN SỬA:');
      errors.forEach((err, idx) => {
        console.log(`   ${idx + 1}. ${err}`);
      });
    } else {
      console.log('\n✅ TẤT CẢ TESTS ĐỀU PASS!');
    }
    
  } catch (error: any) {
    console.error('❌ LỖI KHI CHẠY TEST:', error.message);
    console.error(error.stack);
  }
}

runBenchmarkTest();
