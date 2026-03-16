import React from 'react';
import { motion } from 'motion/react';

export const LuxuryBadge = ({ text, icon: Icon }: { text: string, icon: any }) => (
  <motion.div 
    initial={{ opacity: 0, y: 10 }}
    animate={{ opacity: 1, y: 0 }}
    className="inline-flex items-center gap-3 px-8 py-3 bg-primary/10 border border-primary/20 rounded-full text-[10px] font-black uppercase tracking-[0.3em] text-primary shadow-sm"
  >
    <Icon size={16} fill="currentColor" /> {text}
  </motion.div>
);
