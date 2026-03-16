import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft,
  Star,
  Zap,
  Shield,
  TrendingUp,
  Heart,
  Coins,
  Briefcase,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Users,
  Home,
  Activity,
  Globe,
  Baby,
  Swords,
  ChevronRight,
  Sparkles,
} from "lucide-react";
import { CungDisplay } from "../../domain/model/types";
import { 
  CUNG_CHI_TIET, 
  CHINH_TINH_DESC, 
  PHU_TINH_DESC, 
  TU_HOA_DESC 
} from "../../data/constants";
import { PhuTinhTab } from "./cung-detail/PhuTinhTab";

interface CungDetailScreenProps {
  cung: CungDisplay;
  onBack: () => void;
}

// ─── ICON CONFIG ─────────────────────────────────────────────────
export const CUNG_ICON: Record<string, any> = {
  Mệnh: { icon: Star, color: "text-purple-400", bg: "bg-purple-400/10" },
  "Phu Thê": { icon: Heart, color: "text-pink-400", bg: "bg-pink-400/10" },
  "Tài Bạch": { icon: Coins, color: "text-yellow-400", bg: "bg-yellow-400/10" },
  "Quan Lộc": { icon: Briefcase, color: "text-blue-400", bg: "bg-blue-400/10" },
  "Thiên Di": { icon: Globe, color: "text-green-400", bg: "bg-green-400/10" },
  "Phụ Mẫu": { icon: Users, color: "text-orange-400", bg: "bg-orange-400/10" },
  "Điền Trạch": { icon: Home, color: "text-amber-400", bg: "bg-amber-400/10" },
  "Tật Ách": { icon: Activity, color: "text-red-400", bg: "bg-red-400/10" },
  "Tử Tức": { icon: Baby, color: "text-cyan-400", bg: "bg-cyan-400/10" },
  "Huynh Đệ": { icon: Users, color: "text-indigo-400", bg: "bg-indigo-400/10" },
  "Nô Bộc": { icon: Users, color: "text-teal-400", bg: "bg-teal-400/10" },
  "Phúc Đức": { icon: Star, color: "text-violet-400", bg: "bg-violet-400/10" },
  default: { icon: Shield, color: "text-primary", bg: "bg-primary/10" },
};

export const CungDetailScreen: React.FC<CungDetailScreenProps> = ({
  cung,
  onBack,
}) => {
  const [activeTab, setActiveTab] = useState<
    "tong_quan" | "chinh_tinh" | "phu_tinh" | "tu_hoa"
  >("tong_quan");

  const iconConfig = CUNG_ICON[cung.ten] || CUNG_ICON["default"];
  const IconComp = iconConfig.icon;
  const chiTiet = CUNG_CHI_TIET[cung.ten];

  const hasChinhTinh = (cung.chinhTinh ?? []).length > 0;
  const hasPhuTinh = (cung.phuTinh ?? []).length > 0;
  const hasTuHoa = (cung.tuHoa ?? []).length > 0;

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.05 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0 },
  };

  const tabs = [
    { key: "tong_quan", label: "Tổng Quan" },
    {
      key: "chinh_tinh",
      label: `Chính Tinh${hasChinhTinh ? ` (${cung.chinhTinh.length})` : ""}`,
    },
    {
      key: "phu_tinh",
      label: `Phụ Tinh${hasPhuTinh ? ` (${cung.phuTinh.length})` : ""}`,
    },
    {
      key: "tu_hoa",
      label: `Tứ Hóa${hasTuHoa ? ` (${cung.tuHoa.length})` : ""}`,
    },
  ];

  return (
    <div className="min-h-screen bg-cosmic-navy relative overflow-x-hidden">
      {/* Dynamic Background Glows */}
      <div className="fixed top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <div className={`absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] ${iconConfig.color.replace('text-', 'bg-')}`} />
      </div>

      {/* Sticky Header Upgrade */}
      <div className="sticky top-0 z-20 glass-panel shadow-2xl !border-none">
        <div className="px-6 pt-6 pb-2 flex items-center gap-4 relative z-10">
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-display text-gradient-gold tracking-widest leading-none">Cung {cung.ten}</h1>
            <p className="text-[10px] font-display text-white/30 tracking-[0.3em] uppercase mt-1">
              Địa Chi {cung.canChi}
            </p>
          </div>
          <div
            className={`w-12 h-12 rounded-2xl flex items-center justify-center shadow-lg relative overflow-hidden ${iconConfig.bg}`}
          >
            <div className="shimmer absolute inset-0 opacity-20" />
            <IconComp size={24} className={`${iconConfig.color} relative z-10`} />
          </div>
        </div>

        {/* Tabs Upgrade */}
        <div className="flex px-6 mt-4 gap-2 overflow-x-auto pb-0 no-scrollbar relative z-10">
          {tabs.map((tab) => (
            <button
              key={tab.key}
              onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 text-[10px] font-display uppercase tracking-widest whitespace-nowrap transition-all duration-500 relative ${
                activeTab === tab.key
                  ? "text-celestial-gold"
                  : "text-white/20 hover:text-white/40"
              }`}
            >
              {tab.label}
              {activeTab === tab.key && (
                <motion.div
                  layoutId="activeTab"
                  className="absolute bottom-0 left-0 right-0 h-0.5 bg-celestial-gold shadow-[0_0_10px_#d4af37]"
                />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content Upgrade */}
      <div className="relative z-10 px-6 pt-8 pb-32">
        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0, y: -10 }}
            className="space-y-6"
          >
            {/* ── TAB: TỔNG QUAN ── */}
            {activeTab === "tong_quan" && (
              <>
                <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl">
                  <div className="shimmer absolute inset-0 pointer-events-none opacity-10" />
                  <div className="flex items-center gap-3 mb-4">
                    <Sparkles size={14} className="text-celestial-gold opacity-60" />
                    <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">Bản Chất Cung</h3>
                  </div>
                  <p className="text-sm text-white/80 leading-relaxed font-light italic">
                    "{chiTiet?.mo_ta || "Đang cập nhật ý nghĩa cung này..."}"
                  </p>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <TrendingUp size={16} className="text-green-400 opacity-60" />
                    <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">Ảnh Hưởng Tích Cực</h3>
                  </div>
                  <div className="space-y-4">
                    {chiTiet?.loi.map((l, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-green-400/40 mt-1.5 shadow-[0_0_8px_rgba(74,222,128,0.4)]" />
                        <p className="text-xs text-white/60 leading-relaxed">{l}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] bg-red-500/5 shadow-xl">
                  <div className="flex items-center gap-3 mb-6">
                    <AlertTriangle size={16} className="text-red-400 opacity-60" />
                    <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">Thử Thách & Rủi Ro</h3>
                  </div>
                  <div className="space-y-4">
                    {chiTiet?.bat_loi.map((l, i) => (
                      <div key={i} className="flex items-start gap-4">
                        <div className="w-1.5 h-1.5 rounded-full bg-red-400/40 mt-1.5 shadow-[0_0_8px_rgba(248,113,113,0.4)]" />
                        <p className="text-xs text-white/60 leading-relaxed">{l}</p>
                      </div>
                    ))}
                  </div>
                </motion.div>

                <motion.div variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] bg-celestial-gold/5 shadow-2xl">
                  <div className="flex items-center gap-3 mb-4">
                    <Shield size={16} className="text-celestial-gold opacity-60" />
                    <h3 className="text-[10px] font-display text-celestial-gold/60 uppercase tracking-[0.3em]">Lời Khuyên Thiên Cơ</h3>
                  </div>
                  <p className="text-sm text-star-white/80 leading-relaxed font-display tracking-widest text-center">
                    {chiTiet?.loi_khuyen || "Hãy giữ tâm an tịnh để đón nhận vận mệnh."}
                  </p>
                </motion.div>
              </>
            )}

            {/* ── TAB: CHÍNH TINH ── */}
            {activeTab === "chinh_tinh" && (
              <div className="space-y-6">
                {hasChinhTinh ? (
                  cung.chinhTinh.map((sao, idx) => {
                    const desc = CHINH_TINH_DESC[sao];
                    return (
                      <motion.div key={idx} variants={itemVariants} className="glass-panel p-8 rounded-[2.5rem] relative overflow-hidden shadow-xl">
                        <div className="absolute top-0 right-0 p-6 opacity-5">
                          <Star size={80} className="text-celestial-gold" />
                        </div>
                        <h3 className="text-2xl font-display text-gradient-gold mb-2 tracking-widest">{sao}</h3>
                        <p className="text-[9px] font-display text-white/30 uppercase tracking-[0.4em] mb-6">Chủ Tể Phương Vị</p>
                        
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <Zap size={14} className="text-celestial-gold/60" />
                              <span className="text-[10px] font-display text-white/40 uppercase tracking-widest">Đặc Tính Tinh Tú</span>
                            </div>
                            <p className="text-sm text-white/70 leading-relaxed font-light pl-5">{desc?.y_nghia || "Đang cập nhật ý nghĩa..."}</p>
                          </div>

                          <div className="grid grid-cols-1 gap-4">
                            <div className="p-5 rounded-3xl bg-white/5">
                              <span className="text-[9px] font-display text-celestial-gold/40 uppercase tracking-widest block mb-2">Tính Cách</span>
                              <p className="text-xs text-white/60 leading-relaxed">{desc?.tinh_cach || "Đang cập nhật..."}</p>
                            </div>
                            <div className="p-5 rounded-3xl bg-white/5">
                              <span className="text-[9px] font-display text-mystic-violet/40 uppercase tracking-widest block mb-2">Công Danh</span>
                              <p className="text-xs text-white/60 leading-relaxed">{desc?.cong_danh || "Đang cập nhật..."}</p>
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })
                ) : (
                  <div className="py-20 text-center glass-panel rounded-[2.5rem] shadow-xl">
                    <p className="text-xs font-display text-white/20 uppercase tracking-widest">Cung này vô chính diệu</p>
                  </div>
                )}
              </div>
            )}

            {/* ── TAB: PHỤ TINH ── */}
            {activeTab === "phu_tinh" && (
              <PhuTinhTab
                phuTinh={cung.phuTinh ?? []}
                cungTen={cung.ten}
              />
            )}

            {/* ── TAB: TỨ HÓA ── */}
            {activeTab === "tu_hoa" && (
              <div className="space-y-4">
                {hasTuHoa ? (
                  cung.tuHoa.map((sao, idx) => {
                    const desc = TU_HOA_DESC[sao];
                    return (
                      <motion.div key={idx} variants={itemVariants} className={`p-8 rounded-[2.5rem] glass-panel shadow-xl !border-none`}>
                        <h3 className={`text-lg font-display mb-2 tracking-widest ${desc?.color}`}>{sao}</h3>
                        <p className="text-sm text-white/70 leading-relaxed font-light italic mb-4">"{desc?.mo_ta || "Đang cập nhật..."}"</p>
                        <div className="p-4 rounded-2xl bg-black/20 text-xs text-white/50 leading-relaxed">{desc?.loi || "Tác động tích cực đang được cập nhật."}</div>
                      </motion.div>
                    );
                  })
                ) : (
                  <p className="text-center text-white/20 font-display text-xs py-10 uppercase tracking-widest">Không có tứ hóa</p>
                )}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
