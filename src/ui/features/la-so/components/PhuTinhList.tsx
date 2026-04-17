import React, { memo, useEffect, useMemo, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { CheckCircle, ChevronDown, Shield, XCircle, Zap } from "lucide-react";
import { useTranslation } from "react-i18next";
import { PHU_TINH_DESC } from "@/data/constants";

interface Props {
  phuTinh: Array<string | number>;
  cungTen: string;
}

type PhuTinhDesc = (typeof PHU_TINH_DESC)[string];

interface ResolvedPhuTinh {
  key: string;
  label: string;
  desc?: PhuTinhDesc;
}

const PHU_TINH_ENTRIES = Object.entries(PHU_TINH_DESC);

function resolvePhuTinh(raw: string | number): ResolvedPhuTinh {
  if (typeof raw === "number" && Number.isInteger(raw)) {
    const byIndex = PHU_TINH_ENTRIES[raw] ?? PHU_TINH_ENTRIES[raw - 1];
    if (byIndex) {
      const [label, desc] = byIndex;
      return { key: String(raw), label, desc };
    }
  }

  const normalized = String(raw ?? "").trim();
  const direct = PHU_TINH_DESC[normalized];
  if (direct) {
    return { key: normalized, label: normalized, desc: direct };
  }

  if (/^\d+$/.test(normalized)) {
    const numeric = Number(normalized);
    const byIndex = PHU_TINH_ENTRIES[numeric] ?? PHU_TINH_ENTRIES[numeric - 1];
    if (byIndex) {
      const [label, desc] = byIndex;
      return { key: normalized, label, desc };
    }
  }

  return { key: normalized || "unknown", label: normalized || String(raw) };
}

function getToneMeta(loai?: PhuTinhDesc["loai"], t?: (key: string) => string) {
  switch (loai) {
    case "cat":
      return {
        label: t?.("cung_detail.cat_tinh") ?? "Cat Tinh",
        toneClass: "border-emerald-400/20 bg-emerald-500/5",
        chipClass: "border border-emerald-400/20 bg-emerald-500/10 text-emerald-300",
        icon: CheckCircle,
        iconClass: "text-emerald-300",
      };
    case "hung":
      return {
        label: t?.("cung_detail.hung_tinh") ?? "Hung Tinh",
        toneClass: "border-red-400/20 bg-red-500/5",
        chipClass: "border border-red-400/20 bg-red-500/10 text-red-300",
        icon: XCircle,
        iconClass: "text-red-300",
      };
    default:
      return {
        label: t?.("cung_detail.trung_tinh") ?? "Trung Tinh",
        toneClass: "border-white/10 bg-white/5",
        chipClass: "border border-white/10 bg-white/5 text-white/60",
        icon: Shield,
        iconClass: "text-white/60",
      };
  }
}

export const PhuTinhList: React.FC<Props> = memo(({ phuTinh, cungTen }) => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState<Set<string>>(() => new Set());

  const resolvedPhuTinh = useMemo(
    () => (phuTinh ?? []).map(resolvePhuTinh),
    [phuTinh],
  );

  const toggle = (sao: string) =>
    setExpanded((prev) => {
      const next = new Set(prev);
      if (next.has(sao)) {
        next.delete(sao);
      } else {
        next.add(sao);
      }
      return next;
    });

  useEffect(() => {
    setExpanded(new Set());
  }, [cungTen]);

  if (!resolvedPhuTinh.length) {
    return (
      <p className="py-10 text-center font-display text-xs uppercase tracking-widest text-white/20">
        {t("cung_detail.no_phu_tinh")}
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-3">
      {resolvedPhuTinh.map((item, idx) => {
        const meta = getToneMeta(item.desc?.loai, t);
        const Icon = meta.icon;
        const influence =
          item.desc?.anh_huong_cung?.[cungTen] ?? t("cung_detail.phu_tinh_default");
        const isOpen = expanded.has(item.key);

        return (
          <motion.div
            key={`${item.key}-${idx}`}
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.02 }}
            className={`adaptive-card overflow-hidden rounded-3xl ${meta.toneClass}`}
          >
            <button
              type="button"
              onClick={() => toggle(item.key)}
              className="smooth w-full p-5 text-left"
            >
              <div className="flex items-start gap-4">
                <div className={`mt-0.5 flex h-10 w-10 items-center justify-center rounded-2xl border ${meta.chipClass}`}>
                  <Icon size={18} className={meta.iconClass} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="mb-2 flex items-center gap-2">
                    <span className={`rounded-full px-2.5 py-1 text-[9px] font-display uppercase tracking-[0.2em] ${meta.chipClass}`}>
                      {meta.label}
                    </span>
                  </div>
                  <h3 className="mb-1 text-base font-semibold tracking-[0.02em] text-star-white">
                    {item.label}
                  </h3>
                  <p className="text-sm leading-6 text-text-secondary">
                    {item.desc?.mo_ta ?? t("cung_detail.updating")}
                  </p>
                </div>
                <ChevronDown
                  size={18}
                  className={`mt-0.5 shrink-0 text-text-secondary transition-transform ${isOpen ? "rotate-180" : ""}`}
                />
              </div>
            </button>

            <AnimatePresence initial={false}>
              {isOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="overflow-hidden"
                >
                  <div className="border-t border-border px-5 pb-5 pt-4">
                    <div className="grid grid-cols-1 gap-3">
                      <div className="rounded-2xl border border-primary/15 bg-primary/5 p-4">
                        <div className="mb-2 flex items-center gap-2">
                          <Zap size={14} className="text-primary" />
                          <span className="text-[10px] font-display uppercase tracking-[0.18em] text-text-secondary">
                            {t("cung_detail.phu_tinh_influence", { palace: cungTen })}
                          </span>
                        </div>
                        <p className="text-sm leading-6 text-star-white/80">{influence}</p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="mb-2 block text-[10px] font-display uppercase tracking-[0.18em] text-emerald-300/80">
                          {t("cung_detail.benefit")}
                        </span>
                        <p className="text-sm leading-6 text-star-white/80">
                          {item.desc?.loi ?? t("cung_detail.updating")}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="mb-2 block text-[10px] font-display uppercase tracking-[0.18em] text-red-300/80">
                          {t("cung_detail.drawback")}
                        </span>
                        <p className="text-sm leading-6 text-star-white/80">
                          {item.desc?.bat_loi ?? t("cung_detail.updating")}
                        </p>
                      </div>

                      <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                        <span className="mb-2 block text-[10px] font-display uppercase tracking-[0.18em] text-celestial-gold/80">
                          {t("cung_detail.detail")}
                        </span>
                        <p className="text-sm leading-6 text-star-white/80">
                          {item.desc?.chi_tiet ?? t("cung_detail.updating")}
                        </p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        );
      })}
    </div>
  );
});

PhuTinhList.displayName = "PhuTinhList";
