import React, { useMemo } from "react";
import { CheckCircle2, CircleDot, Sparkles, XCircle } from "lucide-react";
import { useTranslation } from "react-i18next";
import { getPhuTinhMeta } from "@/data/constants";
import { PhuTinhList } from "./PhuTinhList";

interface PhuTinhTabProps {
  phuTinh: string[];
  cungTen: string;
}

const summarizePhuTinh = (items: string[]) =>
  items.reduce(
    (acc, item) => {
      const meta = getPhuTinhMeta(item);

      if (meta?.loai === "cat") acc.cat += 1;
      else if (meta?.loai === "hung") acc.hung += 1;
      else acc.trung += 1;

      return acc;
    },
    { cat: 0, hung: 0, trung: 0 },
  );

export const PhuTinhTab: React.FC<PhuTinhTabProps> = ({ phuTinh, cungTen }) => {
  const { t } = useTranslation();
  const summary = useMemo(() => summarizePhuTinh(phuTinh ?? []), [phuTinh]);

  const items = [
    {
      key: "cat",
      label: t("cung_detail.cat_tinh"),
      value: summary.cat,
      icon: CheckCircle2,
      tone: "text-emerald-300 bg-emerald-500/10 border-emerald-400/20",
    },
    {
      key: "trung",
      label: t("cung_detail.trung_tinh"),
      value: summary.trung,
      icon: CircleDot,
      tone: "text-slate-300 bg-white/5 border-white/10",
    },
    {
      key: "hung",
      label: t("cung_detail.hung_tinh"),
      value: summary.hung,
      icon: XCircle,
      tone: "text-rose-300 bg-rose-500/10 border-rose-400/20",
    },
  ];

  return (
    <div className="space-y-5">
      <section className="adaptive-card rounded-3xl p-5">
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary">
              <Sparkles size={14} />
              <span className="text-[11px] font-display uppercase tracking-[0.24em]">
                {t("cung_detail.tab_phu_tinh")}
              </span>
            </div>
            <h3 className="text-lg font-semibold text-star-white">
              {t("cung_detail.palace_prefix")} {cungTen}
            </h3>
            <p className="max-w-sm text-sm leading-6 text-text-secondary">
              {phuTinh?.length
                ? t("cung_detail.phu_tinh_summary", {
                    count: phuTinh.length,
                    label: t("cung_detail.tab_phu_tinh").toLowerCase(),
                  })
                : t("cung_detail.no_phu_tinh")}
            </p>
          </div>

          <div className="rounded-2xl border border-primary/15 bg-primary/8 px-4 py-3 text-right">
            <div className="text-2xl font-semibold text-star-white">{phuTinh?.length ?? 0}</div>
            <div className="text-[10px] uppercase tracking-[0.22em] text-text-secondary">
              {t("cung_detail.total_stars")}
            </div>
          </div>
        </div>

        <div className="mt-4 grid grid-cols-3 gap-3">
          {items.map((item) => {
            const Icon = item.icon;
            return (
              <div key={item.key} className={`rounded-2xl border p-3 ${item.tone}`}>
                <div className="mb-3 flex items-center justify-between gap-2">
                  <Icon size={16} />
                  <span className="text-lg font-semibold leading-none">{item.value}</span>
                </div>
                <p className="text-[10px] uppercase tracking-[0.18em]">{item.label}</p>
              </div>
            );
          })}
        </div>
      </section>

      <PhuTinhList phuTinh={phuTinh} cungTen={cungTen} />
    </div>
  );
};
