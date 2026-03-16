import React, { useState, useEffect } from "react";
import {
  Sparkles,
  Star,
  Coins,
  Stethoscope,
  Heart,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  ChevronDown,
  ChevronUp,
  Compass,
  Clock,
  TrendingUp,
  Shield,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CrystalCard } from "../components/shared/CrystalCard";
import { TuViData } from "../../domain/model/types";
import { NGU_HANH_NGAY, tinhTuongSinh, tinhDiem, phanTichSaoNgay, getDateStr } from "../../data/constants/ngu-hanh-ngay";

interface NgayMaiScreenProps {
  isDark: boolean;
  tuViData?: TuViData | null;
}

export const NgayMaiScreen = ({ isDark, tuViData }: NgayMaiScreenProps) => {
  const [expanded, setExpanded] = useState<string | null>(null);
  const [currentTime, setCurrentTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  // Lấy dữ liệu dự đoán từ tuViData
  const duDoan = (tuViData as any)?.du_doan_ngay_mai;
  const tieuHan = (tuViData as any)?.van_han?.tieu_han_hien_tai;
  const menhCuc = tuViData?.thong_tin_co_ban?.ngu_hanh_menh_cuc || "Mộc";

  const canChiNgay = duDoan?.can_chi_ngay || "Nhâm Thân";
  const nguHanhNgay = duDoan?.ngu_hanh_ngay || "Kim";
  const tuongSinh = duDoan?.tuong_sinh_khac_voi_menh || "trung hòa";
  const nhandan = duDoan?.ket_qua_tong_quat || "Bình thường"; // Used for label, not logic here for now? Wait, check original code logic for nhandan.
  
  // Re-deriving nhandan logic from original if duDoan doesn't have it directly or to match UI
  const diemMayMam = duDoan?.diem_may_man ?? 5;
   const isGood = diemMayMam >= 7;
  const isBad = diemMayMam <= 3;
  const nhandanLabel = isGood
    ? "NGÀY MAY MẮN"
    : isBad
      ? "NGÀY CẦN CẨN THẬN"
      : "NGÀY BÌNH THƯỜNG";
  const nhandanColor = isGood
    ? "text-crystal-gold"
    : isBad
      ? "text-red-400"
      : "text-text-secondary";


  // Phân tích sao tiểu hạn
  const { may, can_than } = phanTichSaoNgay(
    tieuHan?.chinh_tinh || [],
    tieuHan?.phu_tinh || [],
    tieuHan?.tu_hoa || [],
  );

  // Thêm gợi ý từ ngũ hành ngày
  const hanhNgayInfo = NGU_HANH_NGAY[nguHanhNgay] || NGU_HANH_NGAY["Mộc"];

  // Tính điểm
  const diemTai = tinhDiem(tuongSinh, may, can_than, "tai");
  const diemSuc = tinhDiem(tuongSinh, may, can_than, "suc");
  const diemTinh = tinhDiem(tuongSinh, may, can_than, "tinh");
  const diemSu = tinhDiem(tuongSinh, may, can_than, "su");

  // Ngày mai
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);
  const dateStr = getDateStr(tomorrow);

  const toggle = (key: string) =>
    setExpanded((prev) => (prev === key ? null : key));

  const scoreColor = (score: number) => {
    if (score >= 80) return "text-green-400";
    if (score >= 60) return "text-crystal-gold";
    if (score >= 40) return "text-orange-400";
    return "text-red-400";
  };

  const scoreBarColor = (score: number) => {
    if (score >= 80) return "bg-green-400";
    if (score >= 60) return "bg-yellow-400";
    if (score >= 40) return "bg-orange-400";
    return "bg-red-400";
  };

  return (
    <div className="p-6 pb-40 space-y-8 relative z-10">
      {/* Header Upgrade */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-display text-gradient-gold tracking-widest uppercase">
          Ngày Mai
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Sparkles size={12} className="text-celestial-gold opacity-50" />
          <p className="text-[10px] font-display text-white/30 tracking-[0.4em] uppercase">
            Luxury Forecast
          </p>
          <Sparkles size={12} className="text-celestial-gold opacity-50" />
        </div>
      </div>

      {/* Hero Card Upgrade */}
      <div className="glass-panel gold-border p-10 text-center relative overflow-hidden flex flex-col items-center justify-center min-h-[380px] rounded-[3rem] celestial-glow border-opacity-40">
        <div className="shimmer absolute inset-0 pointer-events-none opacity-20" />
        <div className="absolute inset-0 bg-gradient-to-b from-celestial-gold/5 to-transparent pointer-events-none" />
        
        <div className="absolute -top-40 -right-40 opacity-5 rotate-12 text-celestial-gold pointer-events-none">
          <Sparkles size={400} />
        </div>

        {!tuViData && (
          <div className="absolute inset-0 flex items-center justify-center bg-cosmic-navy/80 backdrop-blur-md z-20 rounded-2xl p-8">
            <div className="text-center">
              <Sparkles size={32} className="mx-auto mb-4 text-celestial-gold animate-pulse" />
              <p className="text-xs text-white/40 font-display tracking-widest leading-relaxed">
                HÃY NHẬP THÔNG TIN SINH ĐỂ XEM DỰ ĐOÁN TỪ CÁC VÌ SAO
              </p>
            </div>
          </div>
        )}

        <div className="relative z-10 flex flex-col items-center">
          <div className="relative">
            <div className="w-32 h-32 rounded-full border border-celestial-gold/20 flex items-center justify-center relative">
              <div className="absolute inset-0 rounded-full border border-celestial-gold/10 animate-spin-slow" />
              <div className="text-center">
                <p className="text-[10px] font-display text-celestial-gold/60 mb-1 tracking-widest">CAN CHI</p>
                <p className="text-xl font-display text-gradient-gold">{canChiNgay.toUpperCase()}</p>
              </div>
            </div>
            <div className="absolute -inset-4 rounded-full border border-celestial-gold/5 animate-pulse" />
          </div>

          <div className="mt-12 space-y-4">
            <p className="text-[10px] font-display tracking-[0.4em] uppercase text-white/40">
              {dateStr}
            </p>
            <div className="glass-panel gold-border px-6 py-2.5 rounded-full shadow-[0_0_20px_rgba(212,175,55,0.1)]">
              <span className={`text-[10px] font-display tracking-[0.2em] uppercase ${nhandanColor}`}>
                ★ {nhandanLabel} ★
              </span>
            </div>
            {tuViData && (
              <p className="text-[9px] text-white/30 font-display tracking-widest uppercase mt-2">
                {nguHanhNgay} • {menhCuc} — {tuongSinh}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Điểm số 4 lĩnh vực Upgrade */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { label: "Tài Lộc", score: diemTai, icon: Coins, key: "tai" },
          { label: "Sức Khỏe", score: diemSuc, icon: Stethoscope, key: "suc" },
          { label: "Tình Duyên", score: diemTinh, icon: Heart, key: "tinh" },
          { label: "Sự Nghiệp", score: diemSu, icon: Briefcase, key: "su" },
        ].map((item, idx) => (
          <motion.div
            key={item.key}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 * idx }}
            whileTap={{ scale: 0.97 }}
            onClick={() => toggle(item.key)}
            className="glass-panel gold-border p-6 flex flex-col items-center cursor-pointer rounded-3xl border-opacity-10 hover:border-opacity-30 transition-all"
          >
            <item.icon
              size={20}
              className={`${scoreColor(item.score)} mb-4 opacity-70`}
              strokeWidth={1.5}
            />
            <p className="text-[9px] font-display opacity-40 uppercase tracking-[0.2em] mb-2">
              {item.label}
            </p>
            <p className={`text-2xl font-display ${scoreColor(item.score)} tracking-tighter`}>
              {item.score}%
            </p>
            <div className="w-full mt-3 h-0.5 rounded-full bg-white/5 overflow-hidden">
              <motion.div
                className={`h-full rounded-full ${scoreBarColor(item.score)} opacity-50`}
                initial={{ width: 0 }}
                animate={{ width: `${item.score}%` }}
                transition={{ duration: 1, delay: 0.5 }}
              />
            </div>
          </motion.div>
        ))}
      </div>

      {/* Điều may mắn hôm nay */}
      <motion.div layout>
        <CrystalCard className="overflow-hidden">
          <button
            className="w-full p-4 flex items-center justify-between"
            onClick={() => toggle("may")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-green-400/10 flex items-center justify-center">
                <CheckCircle size={16} className="text-green-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-text">Điều may mắn</p>
                <p className="text-[10px] text-text-secondary opacity-60">
                  {may.length} dấu hiệu tích cực
                </p>
              </div>
            </div>
            {expanded === "may" ? (
              <ChevronUp size={18} className="text-text-secondary" />
            ) : (
              <ChevronDown size={18} className="text-text-secondary" />
            )}
          </button>
          <AnimatePresence>
            {expanded === "may" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2 border-t border-primary/10 pt-3">
                  {may.length > 0 ? (
                    may.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-green-400 text-xs mt-0.5">✦</span>
                        <p className="text-xs text-text-secondary">{item}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-text-secondary opacity-60">
                      Nhập lá số để xem phân tích chi tiết từ các sao.
                    </p>
                  )}
                  {/* Lĩnh vực tốt từ ngũ hành */}
                  <div className="mt-3 pt-3 border-t border-primary/10">
                    <p className="text-[10px] font-black text-primary uppercase tracking-widest mb-2">
                      Hoạt động nên làm hôm nay
                    </p>
                    {hanhNgayInfo.linh_vuc_tot.map((lv, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <TrendingUp
                          size={10}
                          className="text-green-400 mt-1 shrink-0"
                        />
                        <p className="text-xs text-text-secondary">{lv}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CrystalCard>
      </motion.div>

      {/* Điều cần cẩn thận */}
      <motion.div layout>
        <CrystalCard className="overflow-hidden">
          <button
            className="w-full p-4 flex items-center justify-between"
            onClick={() => toggle("can")}
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-xl bg-red-400/10 flex items-center justify-center">
                <AlertTriangle size={16} className="text-red-400" />
              </div>
              <div className="text-left">
                <p className="text-sm font-black text-text">Cần cẩn thận</p>
                <p className="text-[10px] text-text-secondary opacity-60">
                  {can_than.length} điều cần lưu ý
                </p>
              </div>
            </div>
            {expanded === "can" ? (
              <ChevronUp size={18} className="text-text-secondary" />
            ) : (
              <ChevronDown size={18} className="text-text-secondary" />
            )}
          </button>
          <AnimatePresence>
            {expanded === "can" && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.25 }}
                className="overflow-hidden"
              >
                <div className="px-4 pb-4 space-y-2 border-t border-primary/10 pt-3">
                  {can_than.length > 0 ? (
                    can_than.map((item, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-red-400 text-xs mt-0.5">⚠</span>
                        <p className="text-xs text-text-secondary">{item}</p>
                      </div>
                    ))
                  ) : (
                    <p className="text-xs text-text-secondary/60">
                      Không có hung tinh đặc biệt — ngày tương đối bình an.
                    </p>
                  )}
                  {/* Lĩnh vực nên tránh */}
                  <div className="mt-3 pt-3 border-t border-primary/10">
                    <p className="text-[10px] font-black text-red-400 uppercase tracking-widest mb-2">
                      Hoạt động nên tránh
                    </p>
                    {hanhNgayInfo.linh_vuc_tranh.map((lv, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <Shield
                          size={10}
                          className="text-red-400 mt-1 shrink-0"
                        />
                        <p className="text-xs text-text-secondary">{lv}</p>
                      </div>
                    ))}
                    {/* Biểu hiện có thể gặp */}
                    <p className="text-[10px] font-black text-orange-400 uppercase tracking-widest mt-3 mb-2">
                      Biểu hiện cần chú ý
                    </p>
                    {hanhNgayInfo.bien_co_co_the.map((bc, i) => (
                      <div key={i} className="flex items-start gap-2 mb-1">
                        <Zap
                          size={10}
                          className="text-orange-400 mt-1 shrink-0"
                        />
                        <p className="text-xs text-text-secondary">{bc}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </CrystalCard>
      </motion.div>

      {/* Giờ tốt & Hướng xuất hành */}
      <div className="grid grid-cols-2 gap-4">
        <motion.div layout>
          <CrystalCard className="overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between"
              onClick={() => toggle("gio")}
            >
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-primary" />
                <p className="text-xs font-black text-text">Giờ tốt</p>
              </div>
              {expanded === "gio" ? (
                <ChevronUp size={14} className="text-text-secondary" />
              ) : (
                <ChevronDown size={14} className="text-text-secondary" />
              )}
            </button>
            <AnimatePresence>
              {expanded === "gio" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-primary/10 pt-3 space-y-1">
                    {hanhNgayInfo.gio_tot.map((g, i) => (
                      <p key={i} className="text-xs text-text-secondary">
                        ✦ {g}
                      </p>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CrystalCard>
        </motion.div>

        <motion.div layout>
          <CrystalCard className="overflow-hidden">
            <button
              className="w-full p-4 flex items-center justify-between"
              onClick={() => toggle("huong")}
            >
              <div className="flex items-center gap-2">
                <Compass size={16} className="text-primary" />
                <p className="text-xs font-black text-text">Hướng & Màu</p>
              </div>
              {expanded === "huong" ? (
                <ChevronUp size={14} className="text-text-secondary" />
              ) : (
                <ChevronDown size={14} className="text-text-secondary" />
              )}
            </button>
            <AnimatePresence>
              {expanded === "huong" && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  className="overflow-hidden"
                >
                  <div className="px-4 pb-4 border-t border-primary/10 pt-3 space-y-2">
                    <div>
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                        Hướng xuất hành
                      </p>
                      <p className="text-xs text-text-secondary font-bold">
                        {duDoan?.huong_xuat_hanh || hanhNgayInfo.huong}
                      </p>
                    </div>
                    <div>
                      <p className="text-[9px] font-black text-primary uppercase tracking-widest mb-1">
                        Màu sắc may mắn
                      </p>
                      <p className="text-xs text-text-secondary font-bold">
                        {Array.isArray(duDoan?.mau_sac_ho_tro)
                          ? duDoan.mau_sac_ho_tro.join(", ")
                          : hanhNgayInfo.mau}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </CrystalCard>
        </motion.div>
      </div>

      {/* Tóm tắt tổng quan */}
      <CrystalCard className="p-4">
        <div className="flex items-center gap-2 mb-3">
          <Star size={16} className="text-crystal-gold" />
          <p className="text-xs font-black text-text uppercase tracking-widest">
            Tổng quan ngày mai
          </p>
        </div>
        <p className="text-sm text-text-secondary leading-relaxed">
          {tuViData ? (
            <>
              Ngày <span className="font-black text-text">{canChiNgay}</span>{" "}
              mang hành{" "}
              <span className="font-black text-text">{nguHanhNgay}</span>,{" "}
              {tuongSinh.includes("sinh")
                ? `tương sinh với mệnh ${menhCuc} của bạn — ngày rất thuận lợi để hành động.`
                : tuongSinh.includes("khac")
                  ? `có xung khắc nhất định với mệnh ${menhCuc} — nên thận trọng trong các quyết định lớn.`
                  : `trung hòa với mệnh ${menhCuc} — ngày bình thường, có thể thực hiện các việc thường ngày.`}
              {may.length > 0 && ` Điểm sáng: ${may[0].toLowerCase()}.`}
              {can_than.length > 0 && ` Lưu ý: ${can_than[0].toLowerCase()}.`}
            </>
          ) : (
            "Hãy nhập thông tin sinh tại tab Lá Số để nhận dự đoán cá nhân hóa chính xác dựa trên lá số tử vi của bạn."
          )}
        </p>
      </CrystalCard>
    </div>
  );
};
