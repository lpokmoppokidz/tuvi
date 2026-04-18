import React from "react";
import { CalendarDays, Clock3, Sparkles, SunMedium } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { NguyetHanInfo, NhatHanInfo, ThoiHanInfo, TieuHanInfo } from "@/domain/model/types";

interface Props {
  tieuHanHT: TieuHanInfo;
  nguyetHanHT: NguyetHanInfo;
  nhatHanHT: NhatHanInfo;
  thoiHanHT: ThoiHanInfo;
  nguyetHan: NguyetHanInfo[];
  canhBao: string[];
}

export const TieuHanCard: React.FC<Props> = ({
  tieuHanHT,
  nguyetHanHT,
  nhatHanHT,
  thoiHanHT,
  nguyetHan,
  canhBao,
}) => {
  const { t } = useTranslation();
  const tr = (key: string, defaultValue: string, options?: Record<string, unknown>) =>
    t(key, { defaultValue, ...(options || {}) });

  const timeline = [
    {
      key: "month",
      label: tr("van_han.monthly_limit", "Nguyet han"),
      value: `Tháng ${nguyetHanHT.thang}`,
      detail: `${nguyetHanHT.ten_cung} • ${nguyetHanHT.dia_chi}`,
    },
    {
      key: "day",
      label: tr("van_han.daily_limit", "Nhat han"),
      value: `Ngày ${nhatHanHT.ngay}`,
      detail: `${nhatHanHT.ten_cung} • ${nhatHanHT.dia_chi}`,
    },
    {
      key: "hour",
      label: tr("van_han.hourly_limit", "Thoi han"),
      value: thoiHanHT.gio_chi,
      detail: `${thoiHanHT.ten_cung} • ${thoiHanHT.khung_gio}`,
    },
  ];

  return (
    <div className="space-y-6">
      <div className="glass-panel p-8 rounded-[2.5rem] shadow-2xl">
        <div className="flex items-center gap-5 mb-8">
          <div className="w-14 h-14 rounded-2xl bg-celestial-gold/10 flex items-center justify-center text-celestial-gold">
            <CalendarDays size={24} />
          </div>
          <div>
            <p className="text-[9px] font-display text-white/30 uppercase tracking-widest mb-1">
              {t("van_han.yearly_destiny")}
            </p>
            <h3 className="text-xl font-display text-gradient-gold">
              {tieuHanHT.can_chi_nam} ({tieuHanHT.nam})
            </h3>
          </div>
        </div>

        <div className="space-y-6">
          <div className="flex items-start gap-4 p-4 rounded-2xl bg-white/5">
            <SunMedium size={16} className="text-celestial-gold opacity-60 mt-1 shrink-0" />
            <div>
              <p className="text-[10px] font-display text-white/50 uppercase tracking-widest">
                {t("van_han.yearly_highlight")}
              </p>
              <p className="text-sm text-white/70 mt-2 leading-relaxed">
                {tr("van_han.current_palace_desc", "Tiểu hạn đang rơi vào cung {{palace}} ({{branch}}), thuộc hành {{element}} nên nhịp năm dồn vào cung này.", {
                  palace: tieuHanHT.ten_cung,
                  branch: tieuHanHT.dia_chi,
                  element: tieuHanHT.hanh_cung,
                })}
              </p>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-3">
            {timeline.map((item) => (
              <div key={item.key} className="p-4 rounded-2xl bg-white/5">
                <p className="text-[10px] font-display text-white/40 uppercase tracking-widest">{item.label}</p>
                <p className="text-sm font-display text-star-white mt-3">{item.value}</p>
                <p className="text-xs text-white/55 mt-2 leading-relaxed">{item.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid lg:grid-cols-[1.5fr_1fr] gap-4">
        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Clock3 size={16} className="text-celestial-gold/70" />
            <p className="text-[10px] font-display text-white/35 uppercase tracking-[0.3em]">
              {tr("van_han.monthly_flow", "Dong 12 thang")}
            </p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {nguyetHan.map((item) => (
              <div
                key={item.thang}
                className={`rounded-2xl p-4 border ${
                  item.thang === nguyetHanHT.thang
                    ? "border-celestial-gold/30 bg-celestial-gold/10"
                    : "border-white/5 bg-white/5"
                }`}
              >
                <p className="text-[10px] font-display text-white/40 uppercase tracking-widest">
                  {tr("van_han.month_short", "Th{{month}}", { month: item.thang })}
                </p>
                <p className="text-sm font-display text-star-white mt-2">{item.dia_chi}</p>
                <p className="text-xs text-white/55 mt-2">{item.ten_cung}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="glass-panel rounded-[2rem] p-6">
          <div className="flex items-center gap-3 mb-4">
            <Sparkles size={16} className="text-celestial-gold/70" />
            <p className="text-[10px] font-display text-white/35 uppercase tracking-[0.3em]">
              {tr("van_han.alerts", "Canh bao")}
            </p>
          </div>
          <div className="flex flex-wrap gap-2">
            {(canhBao.length > 0 ? canhBao : tieuHanHT.phu_tinh.slice(0, 6)).map((star, index) => (
              <span key={`${star}-${index}`} className="px-4 py-2 rounded-full bg-white/5 text-xs text-white/70">
                {star}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
