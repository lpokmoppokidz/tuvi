"use client";
import React, { memo } from "react";
import { Calendar, Clock3, Loader2, Plus } from "lucide-react";
import type { NamTongLaSo } from "@/domain/model/types";
import { CHI, CUC_LABEL } from "@/domain/services/NamTongCalculator";
import type { OverlayMode } from "@/ui/features/la-so/components/palaceMeta";

interface Props {
  tuViData: NamTongLaSo | null;
  isCalculating: boolean;
  overlayMode: OverlayMode;
  onOverlayChange: (mode: OverlayMode) => void;
  onAdd: () => void;
  onShowCachCuc?: () => void;
}

const OVERLAY_TABS: Array<{ key: OverlayMode; label: string }> = [
  { key: "none", label: "Tĩnh" },
  { key: "dai_han", label: "Đại hạn" },
  { key: "tieu_han", label: "Tiểu hạn" },
];

export const LaSoCenterCard: React.FC<Props> = memo(
  ({ tuViData, isCalculating, overlayMode, onOverlayChange, onAdd }) => {
    if (!tuViData) {
      return (
        <div className="flex h-full flex-col items-center justify-center rounded-[1.75rem] border border-white/8 bg-[#111624] p-5 text-center shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
          <p className="text-[10px] uppercase tracking-[0.28em] text-celestial-gold/80">Nam Tong</p>
          <h3 className="mt-2 text-base font-display font-semibold text-white/92">Lập lá số</h3>
          <p className="mt-2 max-w-[220px] text-[11px] leading-relaxed text-white/42">
            Nhập thông tin sinh để hiển thị bàn 12 cung theo bố cục đơn giản hơn.
          </p>
          <button
            type="button"
            onClick={onAdd}
            className="mt-4 inline-flex items-center gap-2 rounded-full border border-celestial-gold/20 bg-celestial-gold/10 px-4 py-2 text-[11px] font-medium text-celestial-gold transition hover:bg-celestial-gold/14"
          >
            {isCalculating ? <Loader2 size={14} className="animate-spin" /> : <Plus size={14} />}
            {isCalculating ? "Đang tính..." : "Nhập dữ liệu"}
          </button>
        </div>
      );
    }

    const menhChi = CHI[tuViData.menhCungIndex];
    const thanChi = CHI[tuViData.thanCungIndex];
    const menhCung = tuViData.cungs[tuViData.menhCungIndex];
    const thanCung = tuViData.cungs[tuViData.thanCungIndex];

    return (
      <div className="flex h-full flex-col rounded-[1.75rem] border border-white/8 bg-[#111624] p-3 shadow-[0_18px_40px_rgba(0,0,0,0.22)]">
        <div className="border-b border-white/6 pb-3">
          <p className="text-[9px] uppercase tracking-[0.28em] text-celestial-gold/75">Nam Tong</p>
          <h3 className="mt-1 truncate text-[18px] font-display font-semibold leading-tight text-white/94">
            {tuViData.hoTen || "Chủ mệnh"}
          </h3>
          <p className="mt-1 text-[10px] uppercase tracking-[0.18em] text-white/36">
            {tuViData.canChiNam} · {tuViData.amDuong}
          </p>
        </div>

        <div className="grid grid-cols-2 gap-2 py-3">
          <div className="rounded-2xl bg-white/[0.035] p-2">
            <div className="flex items-center gap-1 text-white/28">
              <Calendar size={10} />
              <span className="text-[8px] uppercase tracking-[0.18em]">Dương lịch</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-white/84">{tuViData.duongLich}</p>
            <p className="mt-0.5 text-[9px] text-white/38">{tuViData.gioSinh}</p>
          </div>

          <div className="rounded-2xl bg-white/[0.035] p-2">
            <div className="flex items-center gap-1 text-white/28">
              <Clock3 size={10} />
              <span className="text-[8px] uppercase tracking-[0.18em]">Âm lịch</span>
            </div>
            <p className="mt-1 text-[11px] font-medium text-white/84">{tuViData.amLich}</p>
            <p className="mt-0.5 text-[9px] text-white/38">{tuViData.gioiTinh}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-2xl border border-celestial-gold/14 bg-celestial-gold/[0.05] p-2">
            <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">Mệnh</p>
            <p className="mt-1 text-[14px] font-semibold text-celestial-gold">{menhChi}</p>
            <p className="text-[9px] text-white/38">{menhCung?.chucDanh}</p>
          </div>

          <div className="rounded-2xl border border-sky-300/14 bg-sky-300/[0.05] p-2">
            <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">Thân</p>
            <p className="mt-1 text-[14px] font-semibold text-sky-200">{thanChi}</p>
            <p className="text-[9px] text-white/38">{thanCung?.chucDanh}</p>
          </div>

          <div className="rounded-2xl bg-white/[0.035] p-2">
            <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">Bản mệnh</p>
            <p className="mt-1 text-[11px] font-medium text-white/84">{tuViData.banMenhHanh}</p>
          </div>

          <div className="rounded-2xl bg-white/[0.035] p-2">
            <p className="text-[8px] uppercase tracking-[0.18em] text-white/30">Cục</p>
            <p className="mt-1 text-[11px] font-medium text-white/84">{CUC_LABEL[tuViData.cuc]}</p>
          </div>
        </div>

        <div className="mt-auto pt-3">
          <div className="grid grid-cols-3 rounded-full bg-white/[0.04] p-1">
            {OVERLAY_TABS.map((tab) => (
              <button
                key={tab.key}
                type="button"
                onClick={() => onOverlayChange(tab.key)}
                className={`rounded-full px-2 py-2 text-[9px] font-medium transition ${
                  overlayMode === tab.key
                    ? "bg-celestial-gold/14 text-celestial-gold"
                    : "text-white/38 hover:text-white/62"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </div>
    );
  },
);

LaSoCenterCard.displayName = "LaSoCenterCard";
