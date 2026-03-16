import { calculateTuVi } from "./TuViCalculator";
import { CacheService } from "./CacheService";

export interface TuViInput {
  ho_ten: string;
  ngay_sinh: string;
  loai_lich: string;
  gio_sinh: string;
  gioi_tinh: string;
  ngay_du_doan: string;
}

// Tính ngày mai format DD/MM/YYYY
function getTomorrow(): string {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dd = String(tomorrow.getDate()).padStart(2, '0');
  const mm = String(tomorrow.getMonth() + 1).padStart(2, '0');
  const yyyy = tomorrow.getFullYear();
  return `${dd}/${mm}/${yyyy}`;
}

export const TuViService = {
  // ── Tính lá số lần đầu (khi user nhập form) ─────────────
  async calculateAndSave(input: Omit<TuViInput, 'ngay_du_doan'>) {
    const ngay_du_doan = getTomorrow();

    const result = await calculateTuVi({ ...input, ngay_du_doan });

    // Lưu lá số (vĩnh viễn)
    CacheService.saveLaSo(result);

    // Lưu thông tin sinh (để refresh dự đoán mỗi ngày)
    CacheService.saveBirthInfo(input);

    // Lưu dự đoán hôm nay
    CacheService.saveDuDoan(result.du_doan_ngay_mai);

    return result;
  },

  // ── Load data khi mở app ─────────────────────────────────
  async loadOrRefresh(): Promise<any | null> {
    const laso = CacheService.loadLaSo();
    if (!laso) return null; // Chưa có lá số

    // Kiểm tra dự đoán còn fresh không
    const duDoan = CacheService.loadDuDoan();

    if (duDoan) {
      // Cache còn dùng được → trả về ngay
      console.log('✅ Dùng cache dự đoán hôm nay');
      return { ...laso, du_doan_ngay_mai: duDoan };
    }

    // Cache đã cũ → tính lại dự đoán
    console.log('🔄 Refresh dự đoán ngày mới...');
    const birthInfo = CacheService.loadBirthInfo();
    if (!birthInfo) return laso;

    try {
      const ngay_du_doan = getTomorrow();
      const newResult = await calculateTuVi({ ...birthInfo, ngay_du_doan });

      // Cập nhật dự đoán mới, giữ nguyên lá số
      const updated = { ...laso, du_doan_ngay_mai: newResult.du_doan_ngay_mai };
      CacheService.saveLaSo(updated);
      CacheService.saveDuDoan(newResult.du_doan_ngay_mai);

      console.log('✅ Đã refresh dự đoán mới');
      return updated;
    } catch (err) {
      console.error('❌ Refresh thất bại, dùng lá số cũ');
      return laso;
    }
  },
};

// Giữ export cũ để không phá code hiện tại
export const calculateTuViChart = async (input: TuViInput) => {
  try {
    const result = await calculateTuVi(input);
    return result;
  } catch (error: any) {
    console.error('❌ Error calculating Tu Vi chart:', error);
    throw new Error(error?.message || 'Lỗi tính toán tử vi');
  }
};
