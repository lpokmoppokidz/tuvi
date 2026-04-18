import React from "react";
import { AlertTriangle, Orbit, Sparkles, Target } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { LuuSao } from "@/domain/model/types";

interface Props {
  namXem: number;
  tuoiHienTai: number;
  diemTong: number;
  danhGiaChung: string;
  trungPhung: boolean;
  canhBao: string[];
  cuuPhiTinh: LuuSao[];
}

/** Score color: red ≤3, amber 4-6, green ≥7 */
function scoreColor(score: number) {
  if (score >= 7) return { bar: "bg-emerald-400", text: "text-emerald-400", glow: "shadow-emerald-500/30" };
  if (score >= 4) return { bar: "bg-celestial-gold", text: "text-celestial-gold", glow: "shadow-celestial-gold/30" };
  return { bar: "bg-red-400", text: "text-red-400", glow: "shadow-red-500/30" };
}

export const VanHanSummaryCard: React.FC<Props> = ({
  namXem,
  tuoiHienTai,
  diemTong,
  danhGiaChung,
  trungPhung,
  canhBao,
  cuuPhiTinh,
}) => {
  const { t } = useTranslation();
  const tr = (key: string, defaultValue: string, options?: Record<string, unknown>) =>
    t(key, { defaultValue, ...(options || {}) });

  const sc = scoreColor(diemTong);

  return (
    <div className="space-y-4">
      {/* ── Overview card ── */}
      <div className="glass-panel rounded-[2rem] p-6 shadow-2xl">
        <p className="text-[9px] font-display text-white/35 uppercase tracking-[0.35em] mb-4">
          {tr("van_han.overview", "Tong quan van han")}
        </p>

        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex-1 min-w-0">
            <h3 className="text-2xl font-display text-gradient-gold leading-tight">
              {danhGiaChung}
            </h3>
            <p className="text-sm text-white/55 mt-2 leading-relaxed">
              {tr("van_han.summary_desc", "Năm {{year}} ở tuổi {{age}}, bám theo chu kỳ vận hạn hiện tại để nhìn cả nhịp 10 năm lẫn diễn biến ngắn hạn.", { year: namXem, age: tuoiHienTai })}
            </p>
          </div>
        </div>

        {/* Score + Trung Phung row */}
        <div className="grid grid-cols-2 gap-3">
          {/* Score */}
          <div className="rounded-2xl bg-white/5 border border-white/5 p-4">
            <div className="flex items-center gap-2 mb-3">
              <Target size={14} className="text-celestial-gold/70 shrink-0" />
              <p className="text-[9px] font-display text-white/35 uppercase tracking-widest">
                {tr("van_han.layer_score", "Diem tang han")}
              </p>
            </div>
            <div className="flex items-end gap-2 mb-3">
              <span className={`text-3xl font-display ${sc.text}`}>{diemTong}</span>
              <span className="text-sm text-white/30 mb-1">/10</span>
            </div>
            {/* Progress bar */}
            <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
              <div
                className={`h-full rounded-full ${sc.bar} transition-all duration-700`}
                style={{ width: `${(diemTong / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Trung Phung */}
          <div className={`rounded-2xl p-4 border ${trungPhung ? "bg-amber-500/8 border-amber-500/20" : "bg-white/5 border-white/5"}`}>
            <div className="flex items-center gap-2 mb-3">
              <Orbit size={14} className={trungPhung ? "text-amber-400/80 shrink-0" : "text-celestial-gold/70 shrink-0"} />
              <p className="text-[9px] font-display text-white/35 uppercase tracking-widest">
                {tr("van_han.trung_phung", "Trung phung")}
              </p>
            </div>
            <p className={`text-xl font-display ${trungPhung ? "text-amber-300" : "text-white/50"}`}>
              {trungPhung ? tr("van_han.present", "Có") : tr("van_han.absent", "Không")}
            </p>
            {trungPhung && (
              <p className="text-[10px] text-amber-400/60 mt-1 leading-relaxed">
                {tr("van_han.trung_phung_note", "Cần chú ý")}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ── Canh Bao ── */}
      {canhBao.length > 0 && (
        <div className="glass-panel rounded-[2rem] p-5 border border-red-500/10">
          <div className="flex items-center gap-2.5 mb-4">
            <div className="w-7 h-7 rounded-xl bg-red-500/15 flex items-center justify-center shrink-0">
              <AlertTriangle size={13} className="text-red-400" />
            </div>
            <p className="text-[10px] font-display text-red-300/70 uppercase tracking-[0.3em]">
              {tr("van_han.alerts", "Canh bao")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {canhBao.map((item, index) => (
              <span
                key={`${item}-${index}`}
                className="px-3.5 py-1.5 rounded-full bg-red-500/10 border border-red-500/20 text-xs text-red-300/80 font-display tracking-wide"
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Cuu Phi Tinh ── */}
      <div className="glass-panel rounded-[2rem] p-5">
        <div className="flex items-center gap-2.5 mb-4">
          <div className="w-7 h-7 rounded-xl bg-celestial-gold/10 flex items-center justify-center shrink-0">
            <Sparkles size={13} className="text-celestial-gold" />
          </div>
          <p className="text-[10px] font-display text-white/35 uppercase tracking-[0.3em]">
            {tr("van_han.cuu_phi_tinh", "Cuu phi tinh")}
          </p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          {cuuPhiTinh.map((star) => (
            <div
              key={star.name}
              className="rounded-2xl bg-white/5 border border-white/5 p-3 flex flex-col gap-1"
            >
              <p className="text-[11px] font-display text-star-white leading-snug">{star.name}</p>
              <p className="text-[11px] text-white/60 font-medium">{star.cung}</p>
              <p className="text-[10px] text-white/35">{star.dia_chi}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
