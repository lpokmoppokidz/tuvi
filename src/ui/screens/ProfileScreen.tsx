import React, { useState } from "react";
import {
  ShieldCheck,
  Moon,
  Sun,
  Star,
  ChevronRight,
  RefreshCw,
  Trash2,
  User,
  Sparkles,
} from "lucide-react";
import { motion } from "motion/react";
import { CrystalCard } from "../components/shared/CrystalCard";
import { TuViData } from "../../domain/model/types";

interface ProfileScreenProps {
  isDark: boolean;
  setIsDark: (v: boolean) => void;
  tuViData?: TuViData | null;
  onClearData: () => void;
  onForceRefresh: () => Promise<void>;
}

export const ProfileScreen = ({
  isDark,
  setIsDark,
  tuViData,
  onClearData,
  onForceRefresh,
}: ProfileScreenProps) => {
  const [refreshing, setRefreshing] = useState(false);

  const handleRefresh = async () => {
    setRefreshing(true);
    try {
      await onForceRefresh();
      alert("✅ Đã cập nhật dự đoán mới nhất!");
    } catch {
      alert("❌ Không thể cập nhật, thử lại sau.");
    } finally {
      setRefreshing(false);
    }
  };

  const handleClear = () => {
    if (window.confirm("Xóa toàn bộ lá số và nhập lại từ đầu?")) {
      onClearData();
    }
  };

  const ho_ten = tuViData?.thong_tin_co_ban?.ho_ten || "Khách Nhân";
  const can_chi = tuViData?.thong_tin_co_ban?.can_chi_nam || "";
  const ngu_hanh = tuViData?.thong_tin_co_ban?.ngu_hanh_menh_cuc || "";
  const am_duong = tuViData?.thong_tin_co_ban?.am_duong || "";
  const initials = ho_ten
    .split(" ")
    .slice(-2)
    .map((w: string) => w[0])
    .join("")
    .toUpperCase();

  return (
    <div className="p-6 pb-40 space-y-10 relative z-10">
      {/* Avatar & Info Upgrade */}
      <div className="flex flex-col items-center text-center pt-8">
        <div className="relative group mb-8">
          <div className="w-40 h-40 rounded-[48px] glass-panel p-2 relative z-10 shadow-2xl">
            <div className="w-full h-full rounded-[36px] flex items-center justify-center bg-cosmic-purple/40 text-gradient-gold text-5xl font-display shadow-inner overflow-hidden relative">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(139,92,246,0.2),transparent_70%)]" />
              {tuViData ? (
                <span className="relative z-10 drop-shadow-2xl">
                  {initials}
                </span>
              ) : (
                <User size={48} className="relative z-10 opacity-30 text-celestial-gold" />
              )}
            </div>
          </div>

          <div className="absolute inset-0 bg-celestial-gold/15 blur-3xl rounded-full -z-0 scale-75 group-hover:scale-100 transition-transform duration-1000" />

          <motion.div
            whileHover={{ scale: 1.1, rotate: 15 }}
            className="absolute -bottom-2 -right-2 p-3 rounded-2xl bg-celestial-gold/20 text-celestial-gold shadow-xl z-20 shadow-celestial-gold/10 !border-none"
          >
            <ShieldCheck size={22} />
          </motion.div>
        </div>

        <h2 className="text-3xl font-display tracking-widest text-gradient-gold">
          {ho_ten}
        </h2>

        {tuViData ? (
          <div className="flex flex-col items-center gap-2 mt-4">
            <div className="flex items-center gap-3">
              <Sparkles size={12} className="text-celestial-gold opacity-50" />
              <p className="text-[10px] font-display text-white/30 tracking-[0.3em] uppercase">
                {can_chi} • {ngu_hanh}
              </p>
              <Sparkles size={12} className="text-celestial-gold opacity-50" />
            </div>
            <p className="text-[9px] font-display text-celestial-gold/40 tracking-[0.4em] uppercase">
              {am_duong}
            </p>
          </div>
        ) : (
          <p className="text-[10px] font-display text-white/20 mt-4 tracking-widest uppercase">
            Chưa có dữ liệu vận mệnh
          </p>
        )}
      </div>

      {/* Settings Upgrade */}
      <div className="space-y-4">
        <p className="text-[10px] font-display text-white/20 uppercase tracking-[0.4em] px-2 mb-2">
          Nghi Thức Hệ Thống
        </p>

        {/* Dark mode toggle */}
        <div
          className="glass-panel flex items-center justify-between p-6 rounded-[2.5rem] cursor-pointer shadow-xl !border-none group"
          onClick={() => setIsDark(!isDark)}
        >
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(212,175,55,0.1)]">
              {isDark ? (
                <Moon size={22} strokeWidth={1.5} />
              ) : (
                <Sun size={22} strokeWidth={1.5} />
              )}
            </div>
            <span className="font-display uppercase tracking-widest text-xs text-star-white/80">
              {isDark ? "Chế độ Tối" : "Chế độ Sáng"}
            </span>
          </div>
          <div className="w-12 h-6 rounded-full bg-celestial-gold/10 relative p-1 overflow-hidden">
             <div className="absolute inset-0 bg-celestial-gold/5 blur-sm" />
            <motion.div
              animate={{ x: isDark ? 24 : 2 }}
              transition={{ type: "spring", stiffness: 500, damping: 30 }}
              className="absolute top-1 w-4 h-4 rounded-full bg-celestial-gold shadow-[0_0_10px_#d4af37]"
            />
          </div>
        </div>

        {/* Premium */}
        <div className="glass-panel flex items-center justify-between p-6 rounded-[2.5rem] shadow-xl !border-none group cursor-pointer">
          <div className="flex items-center gap-5">
            <div className="w-12 h-12 rounded-2xl bg-mystic-violet/10 flex items-center justify-center text-mystic-violet group-hover:scale-110 transition-transform shadow-[0_0_15px_rgba(139,92,246,0.1)]">
              <Star size={22} strokeWidth={1.5} />
            </div>
            <div>
              <span className="font-display uppercase tracking-widest text-xs text-star-white/80 block">
                Hội Viên Premium
              </span>
              <span className="text-[9px] font-display text-white/20 uppercase tracking-widest mt-1">
                Celestial Access
              </span>
            </div>
          </div>
          <ChevronRight size={18} className="text-white/20 group-hover:text-celestial-gold/60 transition-colors" />
        </div>
      </div>

      {/* Data management */}
      {tuViData && (
        <div className="space-y-4">
          <p className="text-[10px] font-display text-white/20 uppercase tracking-[0.4em] px-2 mb-2">
            Quản Lý Thiên Cơ
          </p>

          {/* Xóa lá số */}
          <div
            className="glass-panel flex items-center justify-between p-6 rounded-[2.5rem] cursor-pointer shadow-xl !border-none group hover:bg-red-500/5 transition-colors"
            onClick={handleClear}
          >
            <div className="flex items-center gap-5">
              <div className="w-12 h-12 rounded-2xl bg-red-500/10 flex items-center justify-center text-red-400/60 group-hover:scale-110 transition-transform">
                <Trash2 size={22} strokeWidth={1.5} />
              </div>
              <div>
                <span className="font-display uppercase tracking-widest text-xs text-red-400/60 block">
                  Xóa Lá Số
                </span>
                <span className="text-[9px] font-display text-red-400/20 uppercase tracking-widest mt-1">
                  Erase Spirit Data
                </span>
              </div>
            </div>
            <ChevronRight size={18} className="text-red-400/20" />
          </div>
        </div>
      )}

      {/* Đăng xuất Upgrade */}
      <button className="w-full py-5 rounded-[2rem] glass-panel bg-red-500/5 text-red-400/40 font-display tracking-[0.4em] uppercase text-[10px] hover:bg-red-500/10 transition-all shadow-xl !border-none">
        Kết thúc phiên bản
      </button>
    </div>
  );
};
