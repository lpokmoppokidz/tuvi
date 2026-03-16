import React, { useState } from "react";
import {
  Star,
  CalendarDays,
  Sparkles,
  AlertCircle,
  TrendingUp,
  ShieldCheck,
  Zap,
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { CrystalCard } from "../components/shared/CrystalCard";
import { TuViData } from "../../domain/model/types";
import { CHINH_TINH_DESC } from "../../data/constants";

interface VanHanScreenProps {
  tuViData?: TuViData | null;
}

export const VanHanScreen = ({ tuViData }: VanHanScreenProps) => {
  const [activeTab, setActiveTab] = useState<"dai_han" | "tieu_han">("dai_han");

  if (!tuViData) {
    return (
      <div className="p-10 flex flex-col items-center justify-center min-h-[60vh] text-center space-y-4">
        <div className="w-20 h-20 rounded-full bg-primary/5 flex items-center justify-center border border-primary/10">
          <Star className="text-primary/40" size={40} />
        </div>
        <p className="text-text-secondary text-sm font-medium">
          Vui lòng nhập thông tin lá số để xem vận hạn chi tiết.
        </p>
      </div>
    );
  }

  const daiHanHT = tuViData.van_han.dai_han_hien_tai;
  const tieuHanHT = tuViData.van_han.tieu_han_hien_tai;

  return (
    <div className="p-6 pb-40 space-y-8 relative z-10">
      {/* Header Upgrade */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-display text-gradient-gold tracking-widest uppercase">
          Vận Hạn
        </h2>
        <div className="flex items-center justify-center gap-2 mt-2">
          <Sparkles size={12} className="text-celestial-gold opacity-50" />
          <p className="text-[10px] font-display text-white/30 tracking-[0.4em] uppercase">
            Timeline of Destiny
          </p>
          <Sparkles size={12} className="text-celestial-gold opacity-50" />
        </div>
      </div>

      {/* Tabs Upgrade */}
      <div className="flex p-1.5 glass-panel rounded-full shadow-2xl">
        {["dai_han", "tieu_han"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as any)}
            className={`flex-1 py-3.5 rounded-full text-[10px] font-display uppercase tracking-widest transition-all duration-500 ${
              activeTab === tab
                ? "bg-celestial-gold/10 text-celestial-gold shadow-[0_0_15px_rgba(212,175,55,0.1)]"
                : "text-white/20 hover:text-white/40"
            }`}
          >
            {tab === "dai_han" ? "Đại Hạn 10 Năm" : "Tiểu Hạn 1 Năm"}
          </button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        {activeTab === "dai_han" ? (
          <motion.div
            key="dai_han"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="shimmer absolute inset-0 pointer-events-none opacity-20" />
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  <Star size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-display text-white/30 uppercase tracking-widest mb-1">
                    Giai đoạn hiện tại
                  </p>
                  <h3 className="text-xl font-display text-gradient-gold">
                    {daiHanHT.tuoi_bat_dau} - {daiHanHT.tuoi_ket_thuc} Tuổi
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-white/5 relative">
                  <p className="text-[9px] font-display text-celestial-gold uppercase mb-3 tracking-widest opacity-60">
                    Chủ Tọa Giai Đoạn
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {daiHanHT.chinh_tinh.map((s, i) => (
                      <span
                        key={i}
                        className="px-4 py-1.5 rounded-full bg-mystic-violet/10 text-mystic-violet text-[10px] font-display tracking-widest uppercase"
                      >
                        {s}
                      </span>
                    ))}
                  </div>
                </div>

                <div className="space-y-4">
                  <h4 className="text-[10px] font-display text-white/40 uppercase tracking-widest px-1">
                    Luận Giải Chi Tiết
                  </h4>
                  {daiHanHT.chinh_tinh.map((s, i) => (
                    <div
                      key={i}
                      className="text-sm text-white/60 leading-relaxed bg-white/5 p-6 rounded-3xl italic font-light relative"
                    >
                      <span className="absolute top-4 left-4 text-4xl text-celestial-gold opacity-10 font-serif">"</span>
                      <p className="relative z-10 pl-4">
                        {(CHINH_TINH_DESC[s] as any)?.y_nghia ||
                          "Đang cập nhật ý nghĩa sao..."}
                      </p>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="p-6 rounded-[2rem] glass-panel bg-green-500/5 transition-all hover:bg-green-500/10 group">
                <TrendingUp className="text-green-400/60 mb-3 group-hover:scale-110 transition-transform" size={20} />
                <p className="text-[9px] font-display text-green-400 uppercase mb-2 tracking-widest opacity-60">
                  Cơ Hội
                </p>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Tập trung phát triển sự nghiệp và danh tiếng.
                </p>
              </div>
              <div className="p-6 rounded-[2rem] glass-panel bg-red-500/5 transition-all hover:bg-red-500/10 group">
                <AlertCircle className="text-red-400/60 mb-3 group-hover:scale-110 transition-transform" size={20} />
                <p className="text-[9px] font-display text-red-400 uppercase mb-2 tracking-widest opacity-60">
                  Rủi Ro
                </p>
                <p className="text-[11px] text-white/40 leading-relaxed">
                  Cẩn trọng các mối quan hệ đầu tư mạo hiểm.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="tieu_han"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="space-y-6"
          >
            <div className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden shadow-2xl">
              <div className="shimmer absolute inset-0 pointer-events-none opacity-20" />
              <div className="flex items-center gap-5 mb-8">
                <div className="w-14 h-14 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold shadow-[0_0_20px_rgba(212,175,55,0.1)]">
                  <CalendarDays size={24} />
                </div>
                <div>
                  <p className="text-[9px] font-display text-white/30 uppercase tracking-widest mb-1">
                    Vận hạn năm nay
                  </p>
                  <h3 className="text-xl font-display text-gradient-gold">
                    {tieuHanHT.can_chi_nam} ({tieuHanHT.nam})
                  </h3>
                </div>
              </div>

              <div className="space-y-6">
                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
                  <div className="mt-1">
                    <Zap size={16} className="text-celestial-gold opacity-60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display text-white/50 uppercase tracking-widest">
                      Điểm nhấn năm nay
                    </p>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">
                      Cung tiểu hạn rơi vào{" "}
                      <span className="text-celestial-gold font-bold">
                        {tieuHanHT.dia_chi}
                      </span>
                      , báo hiệu một năm nhiều biến động về{" "}
                      {tieuHanHT.dia_chi === "Thân" ||
                      tieuHanHT.dia_chi === "Dần"
                        ? "đi lại và thay đổi"
                        : "nội tâm và tích lũy"}
                      .
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
                  <div className="mt-1">
                    <ShieldCheck size={16} className="text-green-400 opacity-60" />
                  </div>
                  <div>
                    <p className="text-[10px] font-display text-white/50 uppercase tracking-widest">
                      Lời khuyên phong thủy
                    </p>
                    <p className="text-sm text-white/70 mt-2 leading-relaxed">
                      Nên sử dụng màu sắc thuộc hành{" "}
                      {tuViData.thong_tin_co_ban.ngu_hanh_menh_cuc} để gia tăng
                      may mắn.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <p className="text-[10px] font-display text-white/30 uppercase tracking-[0.3em] px-2">
                Cát tinh chiếu mệnh
              </p>
              <div className="flex flex-wrap gap-3">
                {tieuHanHT.phu_tinh
                  .filter((_, i) => i % 2 === 0)
                  .map((s, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="px-5 py-4 rounded-[1.5rem] glass-panel flex items-center gap-3 transition-all hover:bg-white/5"
                    >
                      <Sparkles size={12} className="text-celestial-gold/60" />
                      <span className="text-xs font-display text-star-white/80 tracking-widest">{s}</span>
                    </motion.div>
                  ))}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
