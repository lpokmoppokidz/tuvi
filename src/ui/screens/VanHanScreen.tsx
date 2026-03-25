// src/ui/screens/VanHanScreen.tsx
import React, { useState } from "react";
import { Star } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import type { TuViData } from "../../domain/model/types";
import { ScreenHeader } from "../components/shared/ScreenHeader";
import { EmptyState }   from "../components/shared/EmptyState";
import { TabSwitcher }  from "../components/van-han/TabSwitcher";
import { DaiHanCard }   from "../components/van-han/DaiHanCard";
import { TieuHanCard }  from "../components/van-han/TieuHanCard";

interface VanHanScreenProps {
  tuViData?: TuViData | null;
}

export const VanHanScreen = ({ tuViData }: VanHanScreenProps) => {
  const { t } = useTranslation();
  const [activeTab, setActiveTab] = useState<"dai_han" | "tieu_han">("dai_han");

  if (!tuViData) {
    return <EmptyState icon={Star} message={t("van_han.empty_message")} />;
  }

  const tabs = [
    { key: "dai_han"  as const, label: t("van_han.tab_dai_han") },
    { key: "tieu_han" as const, label: t("van_han.tab_tieu_han") },
  ];

  return (
    <div className="p-6 pb-40 space-y-8 relative z-10">
      <ScreenHeader title={t("van_han.title")} subtitle={t("van_han.subtitle")} />

      <TabSwitcher tabs={tabs} active={activeTab} onChange={setActiveTab} />

      <AnimatePresence mode="wait">
        {activeTab === "dai_han" ? (
          <motion.div key="dai_han" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <DaiHanCard daiHanHT={tuViData.van_han.dai_han_hien_tai} />
          </motion.div>
        ) : (
          <motion.div key="tieu_han" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.15 }}>
            <TieuHanCard
              tieuHanHT={tuViData.van_han.tieu_han_hien_tai}
              nguHanhMenhCuc={tuViData.thong_tin_co_ban.ngu_hanh_menh_cuc}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
