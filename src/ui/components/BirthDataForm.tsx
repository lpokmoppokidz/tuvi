import React, { memo } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "motion/react";
import { useTranslation } from "react-i18next";
import { X, Calendar, Clock, User, Sparkles, Loader2 } from "lucide-react";
import { birthSchema, BirthSchema } from "./form/schema";
import { fadeIn, scaleIn, tapScale } from "../utils/motion-config";

interface Props {
  onClose: () => void;
  onSubmit: (data: BirthSchema) => Promise<void>;
}

export const BirthDataForm: React.FC<Props> = memo(({ onClose, onSubmit }) => {
  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    watch,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<BirthSchema>({
    resolver: zodResolver(birthSchema),
    defaultValues: { calendarType: "solar", gender: "male" },
  });

  const gender       = watch("gender");
  const calendarType = watch("calendarType");

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <motion.div
        {...fadeIn} transition={{ duration: 0.15 }}
        className="absolute inset-0 bg-black/60 backdrop-blur-md"
        onClick={onClose}
      />
      <motion.div
        {...scaleIn}
        className="relative w-full max-w-md glass-panel p-8 overflow-hidden rounded-[3rem] shadow-2xl !border-none"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="shimmer absolute inset-0 pointer-events-none opacity-10" />

        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h2 className="text-2xl font-display text-gradient-gold tracking-widest flex items-center gap-3">
              <Sparkles className="text-celestial-gold opacity-60" size={20} />
              {t("birth_form.title")}
            </h2>
            <p className="text-[10px] font-display text-white/30 uppercase tracking-[0.3em] mt-2 ml-8">
              {t("birth_form.subtitle")}
            </p>
          </div>
          <button onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-white/40 hover:text-white transition-colors">
            <X size={20} />
          </button>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
          {/* Họ tên */}
          <div className="space-y-2">
            <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2">
              {t("birth_form.full_name")}
            </label>
            <div className="relative">
              <User className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
              <input
                {...register("fullName")}
                placeholder={t("birth_form.full_name_placeholder")}
                className="w-full glass-panel bg-white/5 rounded-2xl py-5 pl-14 pr-6 text-star-white font-display text-xs tracking-widest placeholder:text-white/10 outline-none !border-none shadow-xl"
              />
            </div>
            {errors.fullName && <p className="text-[10px] text-red-400 ml-2">{errors.fullName.message}</p>}
          </div>

          {/* Ngày + Giờ */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2">{t("birth_form.date")}</label>
              <div className="relative">
                <Calendar className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input type="date" {...register("birthDate")}
                  className="w-full glass-panel bg-white/5 rounded-2xl py-5 pl-14 pr-4 text-star-white font-display text-[10px] outline-none !border-none shadow-xl" />
              </div>
              {errors.birthDate && <p className="text-[10px] text-red-400 ml-2">{errors.birthDate.message}</p>}
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2">{t("birth_form.time")}</label>
              <div className="relative">
                <Clock className="absolute left-5 top-1/2 -translate-y-1/2 text-white/20" size={18} />
                <input type="time" {...register("birthTime")}
                  className="w-full glass-panel bg-white/5 rounded-2xl py-5 pl-14 pr-4 text-star-white font-display text-[10px] outline-none !border-none shadow-xl" />
              </div>
              {errors.birthTime && <p className="text-[10px] text-red-400 ml-2">{errors.birthTime.message}</p>}
            </div>
          </div>

          {/* Giới tính + Loại lịch */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2">{t("birth_form.gender")}</label>
              <div className="flex bg-white/5 p-1.5 rounded-2xl shadow-inner">
                {(["male", "female"] as const).map((val) => (
                  <button key={val} type="button" onClick={() => setValue("gender", val)}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-display uppercase tracking-widest transition-all duration-300 ${
                      gender === val ? "bg-celestial-gold/20 text-celestial-gold shadow-lg" : "text-white/20"
                    }`}>
                    {val === "male" ? t("birth_form.gender_male") : t("birth_form.gender_female")}
                  </button>
                ))}
              </div>
            </div>
            <div className="space-y-2">
              <label className="text-[9px] font-display text-celestial-gold/60 uppercase tracking-[0.4em] ml-2">{t("birth_form.calendar")}</label>
              <div className="flex bg-white/5 p-1.5 rounded-2xl shadow-inner">
                {(["solar", "lunar"] as const).map((val) => (
                  <button key={val} type="button" onClick={() => setValue("calendarType", val)}
                    className={`flex-1 py-3 rounded-xl text-[9px] font-display uppercase tracking-widest transition-all duration-300 ${
                      calendarType === val ? "bg-mystic-violet/20 text-mystic-violet shadow-lg" : "text-white/20"
                    }`}>
                    {val === "solar" ? t("birth_form.calendar_solar") : t("birth_form.calendar_lunar")}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <motion.button
            {...tapScale}
            type="submit" disabled={isSubmitting}
            className="w-full py-5 mt-2 rounded-3xl bg-celestial-gold/10 text-celestial-gold font-display tracking-[0.4em] uppercase text-xs shadow-[0_0_30px_rgba(212,175,55,0.15)] hover:bg-celestial-gold/20 transition-all flex items-center justify-center gap-4 disabled:opacity-30 !border-none"
          >
            {isSubmitting
              ? <><Loader2 className="animate-spin" size={18} /> {t("birth_form.submitting")}</>
              : <><Sparkles size={16} /> {t("birth_form.submit")}</>}
          </motion.button>
        </form>
      </motion.div>
    </div>
  );
});

BirthDataForm.displayName = "BirthDataForm";
