import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Sparkles } from "lucide-react";
import { useTranslation } from "react-i18next";
import type { CungDisplay, TuViData } from "@/domain/model/types";
import { BirthDataForm } from "@/ui/features/la-so/components/BirthDataForm";
import { CungDetailScreen } from "@/ui/features/la-so/components/CungDetailScreen";
import { CungGrid } from "@/ui/features/la-so/components/CungGrid";
import { ProfileHeader } from "@/ui/features/la-so/components/ProfileHeader";
import { TongQuanLaSo } from "@/ui/features/la-so/components/TongQuanLaSo";
import { useCungList } from "@/ui/features/la-so/hooks/useCungList";
import { useTuVi } from "@/ui/features/la-so/hooks/useTuVi";
import { scaleIn, slideUpFull } from "@/ui/shared/utils/motion-config";

interface Props {
  tuViData: TuViData | null;
  onTuViDataChange: (data: TuViData) => void;
}

export const LaSoScreen: React.FC<Props> = ({ tuViData, onTuViDataChange }) => {
  const [selectedCung, setSelectedCung] = useState<CungDisplay | null>(null);
  const [showForm, setShowForm]         = useState(false);
  const { t } = useTranslation();

  const { calculate, isCalculating } = useTuVi(onTuViDataChange);
  const cungList = useCungList(tuViData);

  const handleSubmit = useCallback(async (formData: any) => {
    try {
      await calculate(formData);
      setShowForm(false);
    } catch (err: any) {
      alert(`Có lỗi: ${err?.message || "Vui lòng thử lại."}`);
    }
  }, [calculate]);

  return (
    <div className="p-6 pb-32 space-y-8 relative z-10">
      <ProfileHeader tuViData={tuViData} isCalculating={isCalculating} onAdd={() => setShowForm(true)} />

      {!tuViData && (
        <motion.div {...scaleIn}
          className="py-20 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-celestial-gold/5 flex items-center justify-center mb-8 relative">
            <div className="absolute inset-0 rounded-full border border-celestial-gold/10 animate-spin-slow" />
            <Sparkles size={40} className="text-celestial-gold opacity-40" />
          </div>
          <h3 className="text-xl font-display text-star-white/80 tracking-widest mb-4 uppercase">
            {t("la_so.no_data_title")}
          </h3>
          <p className="text-xs text-white/30 font-display tracking-widest leading-relaxed mb-10 max-w-[240px]">
            {t("la_so.no_data_desc")}
          </p>
          <motion.button whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
            onClick={() => setShowForm(true)}
            className="px-10 py-5 rounded-full bg-celestial-gold/10 text-celestial-gold font-display text-xs tracking-[0.3em] uppercase !border-none">
            {t("la_so.start_btn")}
          </motion.button>
        </motion.div>
      )}

      <CungGrid cungList={cungList} onSelect={setSelectedCung} />

      {tuViData && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.1 }}
        >
          <TongQuanLaSo tuViData={tuViData} />
        </motion.div>
      )}

      <AnimatePresence>
        {selectedCung && (
          <>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedCung(null)} />
            <motion.div {...slideUpFull}
              className="fixed inset-0 z-50 bg-cosmic-navy overflow-y-auto">
              <CungDetailScreen cung={selectedCung} onBack={() => setSelectedCung(null)} />
            </motion.div>
          </>
        )}
        {showForm && (
          <BirthDataForm onClose={() => setShowForm(false)} onSubmit={handleSubmit} />
        )}
      </AnimatePresence>
    </div>
  );
};
