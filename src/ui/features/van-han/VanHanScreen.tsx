import React, { useState } from "react";
import { Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { useTranslation } from "react-i18next";
import type { TuViData } from "@/domain/model/types";
import { DaiHanCard } from "@/ui/features/van-han/components/DaiHanCard";
import { TabSwitcher } from "@/ui/features/van-han/components/TabSwitcher";
import { TieuHanCard } from "@/ui/features/van-han/components/TieuHanCard";
import { VanHanSummaryCard } from "@/ui/features/van-han/components/VanHanSummaryCard";
import { useVanHan } from "@/ui/features/van-han/hooks/useVanHan";
import { EmptyState } from "@/ui/shared/components/EmptyState";
import { ScreenHeader } from "@/ui/shared/components/ScreenHeader";

interface VanHanScreenProps {
  tuViData?: TuViData | null;
}

export const VanHanScreen = ({ tuViData }: VanHanScreenProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"dai_han" | "tieu_han">("dai_han");
  const vanHan = useVanHan(tuViData ?? null);

  if (!tuViData || !vanHan) {
    return <EmptyState icon={Star} message={t("van_han.empty_message")} />;
  }

  const tabs: Array<{ key: "dai_han" | "tieu_han"; label: string }> = [
    { key: "dai_han", label: t("van_han.tab_dai_han") },
    { key: "tieu_han", label: t("van_han.tab_tieu_han") },
  ];

  return (
    <div className="p-6 pb-40 space-y-8 relative z-10">
      <ScreenHeader title={t("van_han.title")} subtitle={t("van_han.subtitle")} />

      <VanHanSummaryCard
        namXem={vanHan.namXem}
        tuoiHienTai={vanHan.tuoiHienTai}
        diemTong={vanHan.diemTong}
        danhGiaChung={vanHan.danhGiaChung}
        trungPhung={vanHan.trungPhung}
        canhBao={vanHan.canhBao}
        cuuPhiTinh={vanHan.cuuPhiTinh}
      />

      <TabSwitcher<"dai_han" | "tieu_han">
        tabs={tabs}
        active={activeTab}
        onChange={setActiveTab}
      />

      <AnimatePresence mode="wait">
        {activeTab === "dai_han" ? (
          <motion.div
            key="dai_han"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <DaiHanCard
              daiHanHT={vanHan.daiHanHienTai}
              daiHanNext={vanHan.daiHanTiepTheo}
            />
          </motion.div>
        ) : (
          <motion.div
            key="tieu_han"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <TieuHanCard
              tieuHanHT={vanHan.tieuHanHienTai}
              nguyetHanHT={vanHan.nguyetHanHienTai}
              nhatHanHT={vanHan.nhatHanHienTai}
              thoiHanHT={vanHan.thoiHanHienTai}
              nguyetHan={vanHan.nguyetHan}
              canhBao={vanHan.canhBao}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
