// src/ui/components/tong-quan/SectionAccordion.tsx
import React from "react";
import { motion, AnimatePresence } from "motion/react";
import { ChevronDown, type LucideIcon } from "lucide-react";

export interface SectionItem { label: string; content: string; }

interface Props {
  sectionKey: string;
  icon: LucideIcon;
  color: string;
  bg: string;
  title: string;
  sub: string;
  items: SectionItem[];
  isOpen: boolean;
  onToggle: (key: string) => void;
}

export const SectionAccordion: React.FC<Props> = ({
  sectionKey, icon: Icon, color, bg, title, sub, items, isOpen, onToggle,
}) => (
  <div className={`glass-panel rounded-3xl overflow-hidden transition-all duration-300 ${isOpen ? "shadow-xl" : "shadow-md"}`}>
    <button
      onClick={() => onToggle(sectionKey)}
      className="w-full p-5 flex items-center gap-4 hover:bg-white/5 transition-all text-left"
    >
      <div className={`w-10 h-10 rounded-xl flex items-center justify-center shrink-0 ${bg}`}>
        <Icon size={18} className={color} />
      </div>
      <div className="flex-1 min-w-0">
        <h4 className={`text-sm font-display tracking-widest uppercase ${isOpen ? color : "text-white/70"}`}>{title}</h4>
        <p className="text-[9px] text-white/25 uppercase tracking-widest mt-0.5 truncate">{sub}</p>
      </div>
      <motion.div animate={{ rotate: isOpen ? 180 : 0 }} transition={{ duration: 0.15 }} className="shrink-0">
        <ChevronDown size={16} className="text-white/20" />
      </motion.div>
    </button>

    <AnimatePresence initial={false}>
      {isOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.2, ease: "easeInOut" }}
          className="overflow-hidden"
        >
          <div className="px-5 pb-5 space-y-3 border-t border-white/5 pt-4">
            {items.map((item, i) => (
              <div key={i} className="p-4 rounded-2xl bg-white/5">
                <p className={`text-[9px] font-display uppercase tracking-widest mb-2 ${color} opacity-70`}>{item.label}</p>
                <p className="text-xs text-white/60 leading-relaxed">{item.content}</p>
              </div>
            ))}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);
