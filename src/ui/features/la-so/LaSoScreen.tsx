"use client";
import React, { useState, useCallback } from "react";
import { motion, AnimatePresence } from "motion/react";
import type { CungDisplay, NamTongLaSo } from "@/domain/model/types";
import { BirthDataForm } from "@/ui/features/la-so/components/BirthDataForm";
import { CungDetailScreen } from "@/ui/features/la-so/components/CungDetailScreen";
import { CungGrid } from "@/ui/features/la-so/components/CungGrid";
import { ProfileHeader } from "@/ui/features/la-so/components/ProfileHeader";
import { CachCucPanel } from "@/ui/features/la-so/components/CachCucPanel";
import type { OverlayMode } from "@/ui/features/la-so/components/palaceMeta";
import { useCungList } from "@/ui/features/la-so/hooks/useCungList";
import { useTuVi } from "@/ui/features/la-so/hooks/useTuVi";
import { scaleIn, slideUpFull } from "@/ui/shared/utils/motion-config";

interface Props {
  tuViData: NamTongLaSo | null;
  onTuViDataChange: (data: NamTongLaSo) => void;
}

export const LaSoScreen: React.FC<Props> = ({ tuViData, onTuViDataChange }) => {
  const [selectedCung, setSelectedCung] = useState<CungDisplay | null>(null);
  const [showForm, setShowForm]         = useState(false);
  const [showCachCuc, setShowCachCuc]   = useState(false);
  const [overlayMode, setOverlayMode]   = useState<OverlayMode>("none");

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
    <div className="relative z-10 space-y-6 p-4 pb-32">
      <ProfileHeader
        tuViData={tuViData}
        isCalculating={isCalculating}
        onAdd={() => setShowForm(true)}
      />

      <motion.div {...scaleIn}>
        <CungGrid
          cungList={cungList}
          tuViData={tuViData}
          isCalculating={isCalculating}
          overlayMode={overlayMode}
          onOverlayChange={setOverlayMode}
          onAdd={() => setShowForm(true)}
          onSelect={setSelectedCung}
          onShowCachCuc={() => setShowCachCuc(true)}
        />
      </motion.div>

      <AnimatePresence>
        {selectedCung && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.15 }}
              className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl"
              onClick={() => setSelectedCung(null)}
            />
            <motion.div
              {...slideUpFull}
              className="fixed inset-0 z-50 overflow-y-auto bg-cosmic-navy"
            >
              <CungDetailScreen
                cung={selectedCung}
                onBack={() => setSelectedCung(null)}
                banMenhHanh={tuViData?.banMenhHanh}
              />
            </motion.div>
          </>
        )}

        {/* Cach Cuc Panel Overlay */}
        {showCachCuc && tuViData && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
              onClick={() => setShowCachCuc(false)}
            />
            <motion.div
              {...slideUpFull}
              className="fixed bottom-0 left-0 right-0 z-50 overflow-hidden lg:bottom-auto lg:left-auto lg:right-0 lg:top-0 lg:h-screen lg:w-[480px]"
            >
              <CachCucPanel
                laSo={tuViData}
                onBack={() => setShowCachCuc(false)}
              />
            </motion.div>
          </>
        )}

        {showForm && (
          <BirthDataForm
            onClose={() => setShowForm(false)}
            onSubmit={handleSubmit}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
