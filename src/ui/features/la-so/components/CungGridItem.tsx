"use client";
import React, { memo } from "react";
import { motion } from "motion/react";
import type { CungDisplay, NamTongStar } from "@/domain/model/types";
import type { OverlayMode } from "@/ui/features/la-so/components/palaceMeta";
import { getHanhTone } from "@/ui/features/la-so/components/palaceMeta";
import { resolvePhuTinhList } from "@/ui/features/la-so/components/phuTinhHelper";
import { staggerItem } from "@/ui/shared/utils/motion-config";

interface OverlayBadge {
  label: string;
  tone: "gold" | "amber" | "sky" | "violet" | "emerald";
}

const OVERLAY_TONE_CLASS: Record<OverlayBadge["tone"], string> = {
  gold: "border-celestial-gold/25 bg-celestial-gold/10 text-celestial-gold",
  amber: "border-amber-300/25 bg-amber-300/10 text-amber-200",
  sky: "border-sky-300/25 bg-sky-300/10 text-sky-200",
  violet: "border-violet-300/25 bg-violet-300/10 text-violet-200",
  emerald: "border-emerald-300/25 bg-emerald-300/10 text-emerald-200",
};

const BRIGHTNESS_DOT: Record<string, string> = {
  Miếu: "bg-yellow-300",
  Vượng: "bg-orange-300",
  Đắc: "bg-emerald-300",
  Bình: "bg-white/20",
  Hãm: "bg-rose-400",
};

const TU_HOA_STYLE: Record<string, string> = {
  "Hóa Lộc": "text-celestial-gold bg-celestial-gold/10 border-celestial-gold/20",
  "Hóa Quyền": "text-orange-300 bg-orange-400/10 border-orange-400/20",
  "Hóa Khoa": "text-sky-300 bg-sky-400/10 border-sky-400/20",
  "Hóa Kỵ": "text-rose-400 bg-rose-500/10 border-rose-500/20",
};

const TU_HOA_SHORT: Record<string, string> = {
  "Hóa Lộc": "Lộc",
  "Hóa Quyền": "Q",
  "Hóa Khoa": "K",
  "Hóa Kỵ": "Kỵ",
};

interface Props {
  cung: CungDisplay;
  index: number;
  disabled?: boolean;
  overlayMode?: OverlayMode;
  overlayBadges?: OverlayBadge[];
  onClick: () => void;
}

export const CungGridItem: React.FC<Props> = memo(
  ({ cung, index, disabled = false, overlayMode = "none", overlayBadges = [], onClick }) => {
    const tone = getHanhTone(cung.hanhCung);
    const isOverlayActive = overlayMode !== "none" && overlayBadges.length > 0;
    const isTuanKhong = Boolean((cung as { isTuanKhong?: boolean }).isTuanKhong);
    const isTrietLo = Boolean((cung as { isTrIetLo?: boolean }).isTrIetLo);

    const stars: NamTongStar[] = (cung.stars as NamTongStar[]) ?? [];
    const chinhTinhStars = stars.filter((star) => star.type === "chinh_tinh");
    const phuTinhStars = stars.filter((star) => star.type === "phu_tinh" || star.type === "sao_luu");

    const chinhTinhNames =
      chinhTinhStars.length > 0 ? chinhTinhStars.map((star) => star.name) : (cung.chinhTinh ?? []);
    const phuTinhNames =
      phuTinhStars.length > 0 ? phuTinhStars.map((star) => star.name) : (cung.phuTinh ?? []);
    const resolvedPhuTinh = resolvePhuTinhList(phuTinhNames);

    const getBrightness = (name: string) =>
      chinhTinhStars.find((star) => star.name === name)?.brightness;
    const getTuHoa = (name: string) =>
      stars.find((star) => star.name === name)?.tuHoa;

    const stateBadges = [
      ...(cung.isMenh ? ["Mệnh"] : []),
      ...(cung.isThan ? ["Thân"] : []),
      ...(isTuanKhong ? ["Tuần"] : []),
      ...(!isTuanKhong && isTrietLo ? ["Triệt"] : []),
    ];

    return (
      <motion.button
        {...staggerItem(index)}
        whileTap={disabled ? undefined : { scale: 0.98 }}
        type="button"
        onClick={disabled ? undefined : onClick}
        style={{ willChange: "transform" }}
        className={`group relative h-full w-full overflow-hidden rounded-2xl border p-2.5 text-left transition-all duration-300 transform-gpu ${
          isTuanKhong || isTrietLo
            ? "border-violet-400/20 bg-[#101522]"
            : isOverlayActive
              ? "border-celestial-gold/22 bg-[#121a2a]"
              : cung.isMenh
                ? "border-celestial-gold/20 bg-[#141826]"
                : "border-white/6 bg-[#0f1420] hover:bg-[#141a29]"
        } ${disabled ? "cursor-default" : "cursor-pointer"}`}
      >
        <div className="pointer-events-none absolute inset-x-0 top-0 h-16 bg-gradient-to-b from-white/[0.03] to-transparent" />

        <div className="relative flex h-full flex-col gap-2">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-[8px] font-semibold uppercase tracking-[0.24em] text-white/38">
                  {cung.canChi}
                </span>
                <span className={`rounded-full border px-1.5 py-0.5 text-[7px] font-medium leading-none ${tone.badge}`}>
                  {cung.hanhCung}
                </span>
              </div>
              <h3 className={`mt-1 text-[12px] font-display font-semibold uppercase tracking-[0.08em] leading-tight ${tone.accent}`}>
                {cung.ten}
              </h3>
            </div>

            {stateBadges.length > 0 && (
              <div className="flex max-w-[46%] flex-wrap justify-end gap-1">
                {stateBadges.map((badge) => (
                  <span
                    key={badge}
                    className="rounded-full border border-white/8 bg-white/[0.04] px-1.5 py-0.5 text-[6.5px] uppercase tracking-wide text-white/52"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            )}
          </div>

          {overlayBadges.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {overlayBadges.map((badge) => (
                <span
                  key={`${badge.tone}-${badge.label}`}
                  className={`rounded-full border px-1.5 py-0.5 text-[6.5px] uppercase tracking-wide ${OVERLAY_TONE_CLASS[badge.tone]}`}
                >
                  {badge.label}
                </span>
              ))}
            </div>
          )}

          <div className="space-y-1.5">
            {chinhTinhNames.length > 0 ? (
              chinhTinhNames.slice(0, 2).map((name) => {
                const brightness = getBrightness(name);
                const tuHoa = getTuHoa(name);
                return (
                  <div key={name} className="flex items-center gap-2 rounded-xl bg-white/[0.03] px-2 py-1.5">
                    <span
                      className={`inline-block h-2 w-2 shrink-0 rounded-full ${BRIGHTNESS_DOT[brightness ?? ""] ?? "bg-white/12"}`}
                      title={brightness}
                    />
                    <p className="flex-1 truncate text-[10px] font-medium leading-none text-white/88">
                      {name}
                    </p>
                    {tuHoa && (
                      <span className={`rounded-full border px-1.5 py-0.5 text-[6.5px] leading-none ${TU_HOA_STYLE[tuHoa] ?? ""}`}>
                        {TU_HOA_SHORT[tuHoa] ?? tuHoa.replace("Hóa ", "")}
                      </span>
                    )}
                  </div>
                );
              })
            ) : (
              <div className="rounded-xl bg-white/[0.03] px-2 py-2 text-[8px] uppercase tracking-[0.18em] text-white/18">
                Chưa có chính tinh
              </div>
            )}
          </div>

          {resolvedPhuTinh.length > 0 && (
            <div className="mt-auto border-t border-white/6 pt-1.5">
              <p className="mb-1 text-[7px] uppercase tracking-[0.2em] text-white/28">Phụ tinh</p>
              <div className="flex flex-wrap gap-1">
                {resolvedPhuTinh.slice(0, 3).map((item, idx) => {
                  const tuHoa = getTuHoa(phuTinhNames[idx] ?? item.label);
                  return (
                    <span
                      key={`${item.key}-${idx}`}
                      className="inline-flex max-w-full items-center gap-1 rounded-full bg-white/[0.04] px-1.5 py-0.5 text-[7px] text-white/50"
                    >
                      <span className="max-w-[56px] truncate">{item.label}</span>
                      {tuHoa && (
                        <span className={`rounded-full border px-1 py-0.5 text-[6px] leading-none ${TU_HOA_STYLE[tuHoa] ?? ""}`}>
                          {TU_HOA_SHORT[tuHoa] ?? tuHoa.replace("Hóa ", "")}
                        </span>
                      )}
                    </span>
                  );
                })}
                {resolvedPhuTinh.length > 3 && (
                  <span className="inline-flex items-center rounded-full bg-white/[0.04] px-1.5 py-0.5 text-[7px] text-white/28">
                    +{resolvedPhuTinh.length - 3}
                  </span>
                )}
              </div>
            </div>
          )}
        </div>
      </motion.button>
    );
  },
);

CungGridItem.displayName = "CungGridItem";
