"use client";
import React, { memo } from "react";
import type { CungDisplay, NamTongLaSo } from "@/domain/model/types";
import { CungGridItem } from "./CungGridItem";
import { LaSoCenterCard } from "./LaSoCenterCard";
import {
  DIA_CHI_ORDER,
  type OverlayMode,
  PALACE_BOARD_STYLE,
} from "@/ui/features/la-so/components/palaceMeta";

interface Props {
  cungList: CungDisplay[];
  tuViData: NamTongLaSo | null;
  isCalculating: boolean;
  overlayMode: OverlayMode;
  onOverlayChange: (mode: OverlayMode) => void;
  onAdd: () => void;
  onSelect: (cung: CungDisplay) => void;
  onShowCachCuc?: () => void;
}

export const CungGrid: React.FC<Props> = memo((
  { cungList, tuViData, isCalculating, overlayMode, onOverlayChange, onAdd, onSelect, onShowCachCuc }
) => {
  const cungMap = new Map(cungList.map((cung) => [cung.canChi, cung]));

  return (
    <div className="relative overflow-hidden rounded-[2rem] border border-white/8 bg-[#0c111b] p-3 shadow-[0_24px_60px_rgba(0,0,0,0.28)] sm:p-4">
      <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(180deg,rgba(255,255,255,0.02),transparent_30%)]" />

      <div className="relative grid grid-cols-4 grid-rows-4 gap-2.5 sm:gap-3">
        {DIA_CHI_ORDER.map((diaChi, index) => {
          const cung = cungMap.get(diaChi);
          if (!cung) return null;

          return (
            <div key={diaChi} style={PALACE_BOARD_STYLE[diaChi]}>
              <CungGridItem
                cung={cung}
                index={index}
                disabled={!tuViData}
                overlayBadges={[]}
                overlayMode={overlayMode}
                onClick={() => { if (tuViData) onSelect(cung); }}
              />
            </div>
          );
        })}

        <div className="col-start-2 col-end-4 row-start-2 row-end-4">
          <LaSoCenterCard
            tuViData={tuViData}
            isCalculating={isCalculating}
            overlayMode={overlayMode}
            onOverlayChange={onOverlayChange}
            onAdd={onAdd}
            onShowCachCuc={onShowCachCuc}
          />
        </div>
      </div>
    </div>
  );
});

CungGrid.displayName = "CungGrid";
