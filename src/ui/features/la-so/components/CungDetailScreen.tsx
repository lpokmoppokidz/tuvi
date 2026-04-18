// src/ui/components/CungDetailScreen.tsx
import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import {
  ArrowLeft, Star, Zap, Shield, TrendingUp, Heart, Coins,
  Briefcase, AlertTriangle, Users, Home, Activity, Globe, Baby, Sparkles, GitBranch, Layers,
} from "lucide-react";
import { useTranslation } from "react-i18next";
import { CUNG_CHI_TIET, CHINH_TINH_DESC, TU_HOA_DESC } from "@/data/constants";
import type { CungDisplay } from "@/domain/model/types";
import { PhuTinhTab } from "./PhuTinhTab";
import { resolvePhuTinhList } from "./phuTinhHelper";
import {
  getXungCung,
  getTamHopCungs,
  getNhiHopCung,
  analyzeCungSaoRelation,
  analyzeSaoMenhRelation,
} from "./aspectsHelper";

interface Props { 
  cung: CungDisplay; 
  onBack: () => void;
  banMenhHanh?: string; // Bản mệnh ngũ hành của chủ nhân
}

export const CUNG_ICON: Record<string, any> = {
  menh:         { icon: Star,      color: "text-purple-400", bg: "bg-purple-400/10" },
  phu_the:      { icon: Heart,     color: "text-pink-400",   bg: "bg-pink-400/10"   },
  tai_bach:     { icon: Coins,     color: "text-yellow-400", bg: "bg-yellow-400/10" },
  quan_loc:     { icon: Briefcase, color: "text-blue-400",   bg: "bg-blue-400/10"   },
  thien_di:     { icon: Globe,     color: "text-green-400",  bg: "bg-green-400/10"  },
  phu_mau:      { icon: Users,     color: "text-orange-400", bg: "bg-orange-400/10" },
  dien_trach:   { icon: Home,      color: "text-amber-400",  bg: "bg-amber-400/10"  },
  tat_ach:      { icon: Activity,  color: "text-red-400",    bg: "bg-red-400/10"    },
  tu_tuc:       { icon: Baby,      color: "text-cyan-400",   bg: "bg-cyan-400/10"   },
  huynh_de:     { icon: Users,     color: "text-indigo-400", bg: "bg-indigo-400/10" },
  no_boc:       { icon: Users,     color: "text-teal-400",   bg: "bg-teal-400/10"   },
  phuc_duc:     { icon: Star,      color: "text-violet-400", bg: "bg-violet-400/10" },
  default:      { icon: Shield,    color: "text-primary",    bg: "bg-primary/10"    },
};

const cv = { hidden: { opacity: 0 }, visible: { opacity: 1, transition: { staggerChildren: 0.04 } } };
const iv = { hidden: { opacity: 0, y: 12 }, visible: { opacity: 1, y: 0 } };

export const CungDetailScreen: React.FC<Props> = ({ cung, onBack, banMenhHanh }) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"tong_quan"|"chinh_tinh"|"phu_tinh"|"tu_hoa"|"goc_chieu">("tong_quan");

  const ic  = CUNG_ICON[cung.key || "default"] || CUNG_ICON["default"];
  const IC  = ic.icon;
  const chi = CUNG_CHI_TIET[cung.ten];

  const hasCT = (cung.chinhTinh ?? []).length > 0;
  const hasPT = (cung.phuTinh   ?? []).length > 0;
  const hasTH = (cung.tuHoa     ?? []).length > 0;
  const resolvedPhuTinh = resolvePhuTinhList(cung.phuTinh ?? []);

  // Góc chiếu
  const xungCung = getXungCung(cung.canChi);
  const tamHopCungs = getTamHopCungs(cung.canChi);
  const nhiHopCung = getNhiHopCung(cung.canChi);

  const tabs = [
    { key: "tong_quan",  label: t("cung_detail.tab_overview") },
    { key: "chinh_tinh", label: t("cung_detail.tab_chinh_tinh") + (hasCT ? ` (${cung.chinhTinh.length})` : "") },
    { key: "phu_tinh",   label: t("cung_detail.tab_phu_tinh")   + (hasPT ? ` (${cung.phuTinh.length})` : "") },
    { key: "tu_hoa",     label: t("cung_detail.tab_tu_hoa")     + (hasTH ? ` (${cung.tuHoa.length})` : "") },
    { key: "goc_chieu",  label: "Góc chiếu & Tương tác" },
  ];

  return (
    <div className="min-h-screen bg-cosmic-navy relative overflow-x-hidden">
      {/* Background glow */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className={`absolute top-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full opacity-10 blur-[120px] ${ic.color.replace("text-","bg-")}`} />
      </div>

      {/* Sticky header — constrained to max-w-md */}
      <div className="sticky top-0 z-20 glass-panel shadow-2xl py-10 !border-none">
        <div className="max-w-md mx-auto px-6 pt-6 pb-2 flex items-center gap-4">
          <motion.button whileTap={{ scale: 0.9 }} onClick={onBack}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/60">
            <ArrowLeft size={20} />
          </motion.button>
          <div className="flex-1">
            <h1 className="text-xl font-display text-gradient-gold tracking-widest">
              {t("cung_detail.palace_prefix")} {cung.ten}
            </h1>
            <p className="text-[10px] font-display text-white/30 tracking-[0.3em] uppercase mt-1">
              {t("cung_detail.earthly_branch")} {cung.canChi}
              {cung.hanhCung ? ` · ${cung.hanhCung}` : ""}
            </p>
          </div>
          <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${ic.bg}`}>
            <IC size={24} className={ic.color} />
          </div>
        </div>
        {/* Tabs */}
        <div className="max-w-md mx-auto flex px-6 mt-4 gap-2 overflow-x-auto pb-0 no-scrollbar">
          {tabs.map((tab) => (
            <button key={tab.key} onClick={() => setActiveTab(tab.key as any)}
              className={`px-4 py-3 text-[10px] font-display uppercase tracking-widest whitespace-nowrap transition-all relative ${activeTab === tab.key ? "text-celestial-gold" : "text-white/20"}`}>
              {tab.label}
              {activeTab === tab.key && (
                <motion.div layoutId="cdt" className="absolute bottom-0 left-0 right-0 h-0.5 bg-celestial-gold" />
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Content — constrained to max-w-md */}
      <div className="max-w-md mx-auto p-6 pb-32 relative z-10">
        <AnimatePresence mode="wait">
          <motion.div key={activeTab} variants={cv} initial="hidden" animate="visible"
            exit={{ opacity: 0 }} className="space-y-8">

            {activeTab === "tong_quan" && (<>
              <motion.div variants={iv} className="glass-panel p-6 rounded-[2.5rem] shadow-xl">
                <div className="grid grid-cols-2 gap-3">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <span className="text-[9px] font-display text-white/35 uppercase tracking-[0.3em] block">
                      Vai trò
                    </span>
                    <p className="mt-2 text-sm text-white/85">{cung.ten}</p>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {cung.isMenh && (
                        <span className="rounded-full border border-celestial-gold/20 bg-celestial-gold/10 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-celestial-gold">
                          Mệnh
                        </span>
                      )}
                      {cung.isThan && (
                        <span className="rounded-full border border-sky-300/20 bg-sky-300/10 px-3 py-1 text-[9px] uppercase tracking-[0.2em] text-sky-200">
                          Thân
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="rounded-3xl bg-white/5 p-4">
                    <span className="text-[9px] font-display text-white/35 uppercase tracking-[0.3em] block">
                      Địa chi
                    </span>
                    <p className="mt-2 text-sm text-white/85">{cung.canChi}</p>
                    <p className="mt-1 text-xs text-white/45">{cung.hanhCung || "Chưa rõ hành cung"}</p>
                  </div>
                </div>

                <div className="mt-4 grid grid-cols-3 gap-3">
                  <div className="rounded-3xl bg-white/5 p-4">
                    <span className="text-[9px] font-display text-white/35 uppercase tracking-[0.3em] block">
                      Chính tinh
                    </span>
                    <p className="mt-2 text-lg text-celestial-gold">{cung.chinhTinh.length}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <span className="text-[9px] font-display text-white/35 uppercase tracking-[0.3em] block">
                      Phụ tinh
                    </span>
                    <p className="mt-2 text-lg text-white/80">{cung.phuTinh.length}</p>
                  </div>
                  <div className="rounded-3xl bg-white/5 p-4">
                    <span className="text-[9px] font-display text-white/35 uppercase tracking-[0.3em] block">
                      Tứ hóa
                    </span>
                    <p className="mt-2 text-lg text-white/80">{cung.tuHoa.length}</p>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  <div>
                    <span className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.3em] block mb-2">
                      Chính tinh tọa thủ
                    </span>
                    <p className="text-sm text-white/72 leading-relaxed">
                      {hasCT ? cung.chinhTinh.join(", ") : "Cung này chưa có chính tinh nổi bật trong dữ liệu hiện tại."}
                    </p>
                  </div>

                  {hasPT && (
                    <div>
                      <span className="text-[9px] font-display text-white/35 uppercase tracking-[0.3em] block mb-2">
                        Phụ tinh đi kèm
                      </span>
                      <p className="text-sm text-white/58 leading-relaxed">
                        {resolvedPhuTinh.map((item) => item.label).join(", ")}
                      </p>
                    </div>
                  )}
                </div>
              </motion.div>

              <motion.div variants={iv} className="glass-panel p-8 rounded-[2.5rem] shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <Sparkles size={14} className="text-celestial-gold opacity-60" />
                  <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">{t("cung_detail.nature")}</h3>
                </div>
                <p className="text-sm text-white/80 leading-relaxed font-light italic">"{chi?.mo_ta || t("cung_detail.nature_updating")}"</p>
              </motion.div>

              <motion.div variants={iv} className="glass-panel p-8 rounded-[2.5rem] shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <TrendingUp size={16} className="text-green-400 opacity-60" />
                  <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">{t("cung_detail.positive_influence")}</h3>
                </div>
                <div className="space-y-4">
                  {chi?.loi.map((l, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-green-400/40 mt-1.5" />
                      <p className="text-xs text-white/60 leading-relaxed">{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={iv} className="glass-panel p-8 rounded-[2.5rem] bg-red-500/5 shadow-xl">
                <div className="flex items-center gap-3 mb-6">
                  <AlertTriangle size={16} className="text-red-400 opacity-60" />
                  <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">{t("cung_detail.challenges")}</h3>
                </div>
                <div className="space-y-4">
                  {chi?.bat_loi.map((l, i) => (
                    <div key={i} className="flex items-start gap-4">
                      <div className="w-1.5 h-1.5 rounded-full bg-red-400/40 mt-1.5" />
                      <p className="text-xs text-white/60 leading-relaxed">{l}</p>
                    </div>
                  ))}
                </div>
              </motion.div>

              <motion.div variants={iv} className="glass-panel p-8 rounded-[2.5rem] bg-celestial-gold/5 shadow-2xl">
                <div className="flex items-center gap-3 mb-4">
                  <Shield size={16} className="text-celestial-gold opacity-60" />
                  <h3 className="text-[10px] font-display text-celestial-gold/60 uppercase tracking-[0.3em]">{t("cung_detail.celestial_advice")}</h3>
                </div>
                <p className="text-sm text-star-white/80 leading-relaxed font-display tracking-widest text-center">
                  {chi?.loi_khuyen || t("cung_detail.advice_default")}
                </p>
              </motion.div>
            </>)}

            {activeTab === "chinh_tinh" && (
              <div className="space-y-6">
                {hasCT ? cung.chinhTinh.map((sao, idx) => {
                  const desc = CHINH_TINH_DESC[sao];
                  const starObj = (cung.stars as any[])?.find((s: any) => s.name === sao);
                  const brightness = starObj?.brightness;
                  const tuHoa = starObj?.tuHoa;
                  const BRIGHTNESS_STYLE: Record<string, { color: string; icon: string }> = {
                    "Miếu":  { color: "text-yellow-300",  icon: "☀☀☀ Miếu"  },
                    "Vượng": { color: "text-orange-300",  icon: "☀☀ Vượng"  },
                    "Đắc":   { color: "text-emerald-300", icon: "☀ Đắc"    },
                    "Bình":  { color: "text-white/40",    icon: "– Bình"    },
                    "Hãm":   { color: "text-rose-400",    icon: "☾ Hãm"    },
                  };
                  const TU_HOA_STYLE: Record<string, string> = {
                    "Hóa Lộc":   "text-celestial-gold bg-celestial-gold/10 border-celestial-gold/25",
                    "Hóa Quyền": "text-orange-300 bg-orange-400/10 border-orange-400/25",
                    "Hóa Khoa":  "text-sky-300 bg-sky-400/10 border-sky-400/25",
                    "Hóa Kỵ":   "text-rose-400 bg-rose-500/10 border-rose-500/25",
                  };
                  const brStyle = brightness ? BRIGHTNESS_STYLE[brightness] : null;
                  return (
                    <motion.div key={idx} variants={iv} className="glass-panel p-8 rounded-[2.5rem] shadow-xl">
                      <div className="flex items-start justify-between gap-3 mb-2">
                        <h3 className="text-2xl font-display text-gradient-gold tracking-widest">{sao}</h3>
                        <div className="flex flex-col items-end gap-1.5">
                          {brStyle && (
                            <span className={`text-[11px] font-semibold ${brStyle.color}`}>{brStyle.icon}</span>
                          )}
                          {tuHoa && (
                            <span className={`rounded border px-2 py-0.5 text-[9px] font-semibold ${TU_HOA_STYLE[tuHoa] ?? ""}`}>
                              {tuHoa}
                            </span>
                          )}
                        </div>
                      </div>
                      <p className="text-[9px] font-display text-white/30 uppercase tracking-[0.4em] mb-6">{t("cung_detail.ruling_position")}</p>
                      <div className="space-y-6">
                        <div>
                          <div className="flex items-center gap-2 mb-3">
                            <Zap size={14} className="text-celestial-gold/60" />
                            <span className="text-[10px] font-display text-white/40 uppercase tracking-widest">{t("cung_detail.star_traits")}</span>
                          </div>
                          <p className="text-sm text-white/70 leading-relaxed font-light pl-5">{desc?.y_nghia || t("cung_detail.updating")}</p>
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                          <div className="p-5 rounded-3xl bg-white/5">
                            <span className="text-[9px] font-display text-celestial-gold/40 uppercase tracking-widest block mb-2">{t("cung_detail.personality")}</span>
                            <p className="text-xs text-white/60 leading-relaxed">{desc?.tinh_cach || t("cung_detail.updating")}</p>
                          </div>
                          <div className="p-5 rounded-3xl bg-white/5">
                            <span className="text-[9px] font-display text-mystic-violet/40 uppercase tracking-widest block mb-2">{t("cung_detail.career")}</span>
                            <p className="text-xs text-white/60 leading-relaxed">{desc?.cong_danh || t("cung_detail.updating")}</p>
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  );
                }) : (
                  <div className="py-20 text-center glass-panel rounded-[2.5rem] shadow-xl">
                    <p className="text-xs font-display text-white/20 uppercase tracking-widest">{t("cung_detail.no_main_stars")}</p>
                  </div>
                )}
              </div>
            )}

            {activeTab === "phu_tinh" && (
              <PhuTinhTab phuTinh={cung.phuTinh ?? []} cungTen={cung.ten} />
            )}

            {activeTab === "tu_hoa" && (
              <div className="space-y-4">
                {hasTH ? cung.tuHoa.map((sao, idx) => {
                  const desc = TU_HOA_DESC[sao];
                  return (
                    <motion.div key={idx} variants={iv} className="p-8 rounded-[2.5rem] glass-panel shadow-xl !border-none">
                      <h3 className={`text-lg font-display mb-2 tracking-widest ${desc?.color}`}>{sao}</h3>
                      <p className="text-sm text-white/70 leading-relaxed font-light italic mb-4">"{desc?.mo_ta || t("cung_detail.transformation_updating")}"</p>
                      <div className="p-4 rounded-2xl bg-black/20 text-xs text-white/50 leading-relaxed">{desc?.loi || t("cung_detail.transformation_positive")}</div>
                    </motion.div>
                  );
                }) : (
                  <p className="text-center text-white/20 font-display text-xs py-10 uppercase tracking-widest">{t("cung_detail.no_transformations")}</p>
                )}
              </div>
            )}

            {activeTab === "goc_chieu" && (
              <div className="space-y-6">
                {/* Góc chiếu */}
                <motion.div variants={iv} className="glass-panel p-6 rounded-[2.5rem] shadow-xl">
                  <div className="flex items-center gap-2 mb-4">
                    <GitBranch size={14} className="text-celestial-gold/60" />
                    <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">Góc chiếu</h3>
                  </div>
                  <div className="space-y-3">
                    <div className="rounded-2xl bg-white/5 p-4">
                      <span className="text-[9px] font-display text-white/35 uppercase tracking-wide block mb-2">
                        Xung chiếu (180°)
                      </span>
                      <p className="text-sm text-white/80">{xungCung || "—"}</p>
                      <p className="text-[10px] text-white/40 mt-1">Cung đối diện, ảnh hưởng mạnh</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <span className="text-[9px] font-display text-white/35 uppercase tracking-wide block mb-2">
                        Tam hợp (120°)
                      </span>
                      <p className="text-sm text-white/80">{tamHopCungs.join(", ") || "—"}</p>
                      <p className="text-[10px] text-white/40 mt-1">3 cung hỗ trợ lẫn nhau</p>
                    </div>
                    <div className="rounded-2xl bg-white/5 p-4">
                      <span className="text-[9px] font-display text-white/35 uppercase tracking-wide block mb-2">
                        Nhị hợp
                      </span>
                      <p className="text-sm text-white/80">{nhiHopCung || "—"}</p>
                      <p className="text-[10px] text-white/40 mt-1">Cung hỗ trợ ngầm</p>
                    </div>
                  </div>
                </motion.div>

                {/* Tương quan Ngũ hành */}
                {hasCT && cung.hanhCung && (
                  <motion.div variants={iv} className="glass-panel p-6 rounded-[2.5rem] shadow-xl">
                    <div className="flex items-center gap-2 mb-4">
                      <Layers size={14} className="text-sky-400/60" />
                      <h3 className="text-[10px] font-display text-white/40 uppercase tracking-[0.3em]">
                        Tương quan Ngũ hành
                      </h3>
                    </div>
                    <div className="space-y-3">
                      {cung.chinhTinh.slice(0, 3).map((saoName) => {
                        const starObj = (cung.stars as any[])?.find((s: any) => s.name === saoName);
                        const hanhSao = starObj?.ngu_hanh || starObj?.nguHanh;
                        if (!hanhSao) return null;

                        const cungSaoRel = analyzeCungSaoRelation(cung.hanhCung, hanhSao);
                        const saoMenhRel = banMenhHanh 
                          ? analyzeSaoMenhRelation(hanhSao, banMenhHanh)
                          : null;

                        return (
                          <div key={saoName} className="rounded-2xl bg-white/5 p-4 space-y-2">
                            <p className="text-sm font-semibold text-white/90">{saoName} ({hanhSao})</p>
                            <div className="space-y-1">
                              <p className={`text-[10px] leading-relaxed ${cungSaoRel.color}`}>
                                • {cungSaoRel.label}
                              </p>
                              {saoMenhRel && (
                                <p className={`text-[10px] leading-relaxed ${saoMenhRel.color}`}>
                                  • {saoMenhRel.label}
                                </p>
                              )}
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </motion.div>
                )}

                {/* Giải thích Ngũ hành */}
                <motion.div variants={iv} className="glass-panel p-6 rounded-[2.5rem] bg-white/5 shadow-xl">
                  <h4 className="text-[9px] font-display text-white/35 uppercase tracking-wide mb-3">
                    Quy luật Ngũ hành
                  </h4>
                  <div className="space-y-2 text-[10px] text-white/50 leading-relaxed">
                    <p>• <span className="text-green-400">Tương sinh:</span> Thủy→Mộc→Hỏa→Thổ→Kim→Thủy</p>
                    <p>• <span className="text-red-400">Tương khắc:</span> Kim→Mộc, Mộc→Thổ, Thổ→Thủy, Thủy→Hỏa, Hỏa→Kim</p>
                  </div>
                </motion.div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};
