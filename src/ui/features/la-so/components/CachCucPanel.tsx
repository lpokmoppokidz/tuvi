import React, { useMemo } from "react";
import { motion } from "motion/react";
import { ArrowLeft, Award, AlertTriangle, Crosshair } from "lucide-react";
import type { NamTongLaSo } from "@/domain/model/types";
import { analyzeCachCuc } from "@/domain/services/analysis/CachCucAnalyzer";
import { slideUpFull } from "@/ui/shared/utils/motion-config";

interface Props {
  laSo: NamTongLaSo;
  onBack: () => void;
}

export const CachCucPanel: React.FC<Props> = ({ laSo, onBack }) => {
  const matched = useMemo(() => analyzeCachCuc(laSo), [laSo]);

  const quyCach = matched.filter((m) => m.cachCuc.tier === "QUY");
  const hungCach = matched.filter((m) => m.cachCuc.tier === "HUNG");
  const binhCach = matched.filter((m) => m.cachCuc.tier === "BINH");

  return (
    <div className="flex h-[80vh] flex-col rounded-t-3xl border-t border-white/10 bg-[linear-gradient(180deg,rgba(24,21,37,1),rgba(8,8,18,1))] shadow-[0_-8px_32px_rgba(0,0,0,0.5)] lg:h-screen lg:rounded-none lg:border-l lg:border-t-0">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b border-white/5 bg-cosmic-navy/80 p-4 backdrop-blur-xl">
        <div className="flex items-center gap-3">
          <button
            onClick={onBack}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-white/5 text-white/70 transition hover:bg-white/10 hover:text-white"
          >
            <ArrowLeft size={18} />
          </button>
          <div>
            <h2 className="text-sm font-medium text-white lg:text-base">Phân tích Cách Cục</h2>
            <div className="mt-0.5 flex items-center gap-2 text-[10px] text-white/40">
              <Crosshair size={10} /> Nam Tông Đẩu Số
            </div>
          </div>
        </div>
        <div className="flex items-center gap-2 rounded-full border border-celestial-gold/15 bg-celestial-gold/5 px-3 py-1.5 text-xs text-celestial-gold">
          {matched.length} cách cục
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 lg:p-6 space-y-8">
        {matched.length === 0 ? (
          <div className="flex h-40 flex-col items-center justify-center text-white/30">
            <Crosshair size={24} className="mb-2 opacity-50" />
            <p className="text-sm">Chưa tìm thấy cách cục đặc trưng</p>
          </div>
        ) : (
          <>
            {quyCach.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <div className="rounded-md bg-green-500/10 p-1.5 text-green-400">
                    <Award size={16} />
                  </div>
                  <h3 className="font-medium text-green-400">Quý Cách (Cát)</h3>
                  <span className="ml-auto text-xs text-white/30">{quyCach.length} cách</span>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {quyCach.map((m, idx) => (
                    <CachCucCard key={`${m.cungIndex}-${idx}`} item={m} color="green" />
                  ))}
                </div>
              </section>
            )}

            {hungCach.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <div className="rounded-md bg-red-500/10 p-1.5 text-red-400">
                    <AlertTriangle size={16} />
                  </div>
                  <h3 className="font-medium text-red-400">Bần Tiện Cách (Hung)</h3>
                  <span className="ml-auto text-xs text-white/30">{hungCach.length} cách</span>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {hungCach.map((m, idx) => (
                    <CachCucCard key={`${m.cungIndex}-${idx}`} item={m} color="red" />
                  ))}
                </div>
              </section>
            )}

            {binhCach.length > 0 && (
              <section className="space-y-3">
                <div className="flex items-center gap-2 border-b border-white/5 pb-2">
                  <div className="rounded-md bg-blue-500/10 p-1.5 text-blue-400">
                    <Crosshair size={16} />
                  </div>
                  <h3 className="font-medium text-blue-400">Bình Cách</h3>
                  <span className="ml-auto text-xs text-white/30">{binhCach.length} cách</span>
                </div>
                <div className="grid gap-3 lg:grid-cols-2">
                  {binhCach.map((m, idx) => (
                    <CachCucCard key={`${m.cungIndex}-${idx}`} item={m} color="blue" />
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  );
};

const CachCucCard = ({ item, color }: { item: any; color: "green" | "red" | "blue" }) => {
  const colorMap = {
    green: "border-green-500/10 bg-green-500/5 text-green-300",
    red: "border-red-500/10 bg-red-500/5 text-red-300",
    blue: "border-blue-500/10 bg-blue-500/5 text-blue-300",
  };

  return (
    <div className={`rounded-xl border ${colorMap[color].split(" ")[0]} bg-white/5 p-4 transition-colors hover:bg-white/10`}>
      <div className="flex items-start justify-between">
        <h4 className={`text-sm font-semibold ${colorMap[color].split(" ")[2]}`}>{item.cachCuc.name}</h4>
        <span className="rounded-md bg-white/5 px-2 py-0.5 text-[10px] text-white/40">
          Tại: {item.cungName}
        </span>
      </div>
      <p className="mt-2 text-xs leading-relaxed text-white/60">{item.cachCuc.description}</p>
    </div>
  );
};
