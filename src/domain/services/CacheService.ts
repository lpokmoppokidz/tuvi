const KEYS = {
  LASO: "tuvi_laso_data",
  DU_DOAN: "tuvi_du_doan",
  PREDICT_DATE: "tuvi_predict_date",
  BIRTH_INFO: "tuvi_birth_info",
};

export const CacheService = {
  // ── Lá số — lưu mãi mãi ─────────────────────────────────
  saveLaSo(data: any) {
    localStorage.setItem(KEYS.LASO, JSON.stringify(data));
  },

  loadLaSo(): any | null {
    try {
      const raw = localStorage.getItem(KEYS.LASO);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // ── Thông tin sinh — để refresh dự đoán mỗi ngày ────────
  saveBirthInfo(info: any) {
    localStorage.setItem(KEYS.BIRTH_INFO, JSON.stringify(info));
  },

  loadBirthInfo(): any | null {
    try {
      const raw = localStorage.getItem(KEYS.BIRTH_INFO);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // ── Dự đoán ngày — expire sau 1 ngày ────────────────────
  saveDuDoan(data: any) {
    const today = new Date().toLocaleDateString("vi-VN");
    localStorage.setItem(KEYS.DU_DOAN, JSON.stringify(data));
    localStorage.setItem(KEYS.PREDICT_DATE, today);
  },

  loadDuDoan(): any | null {
    try {
      const savedDate = localStorage.getItem(KEYS.PREDICT_DATE);
      const today = new Date().toLocaleDateString("vi-VN");
      if (savedDate !== today) return null; // Khác ngày → cũ rồi
      const raw = localStorage.getItem(KEYS.DU_DOAN);
      return raw ? JSON.parse(raw) : null;
    } catch {
      return null;
    }
  },

  // ── Xóa toàn bộ (khi đổi thông tin sinh) ────────────────
  clearAll() {
    Object.values(KEYS).forEach((k) => localStorage.removeItem(k));
  },

  // ── Xóa chỉ dự đoán (force refresh thủ công) ────────────
  clearDuDoan() {
    localStorage.removeItem(KEYS.DU_DOAN);
    localStorage.removeItem(KEYS.PREDICT_DATE);
  },

  // ── Kiểm tra đã có lá số chưa ───────────────────────────
  hasLaSo(): boolean {
    return !!localStorage.getItem(KEYS.LASO);
  },
};
