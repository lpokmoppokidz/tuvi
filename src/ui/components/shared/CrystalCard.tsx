import React from 'react';
import { motion } from 'motion/react';
import { smoothSpring } from '../../utils/motion-config';

export const CrystalCard = ({ children, className = "", onClick, isGold = false }: { children: React.ReactNode, className?: string, onClick?: () => void, isGold?: boolean, key?: React.Key }) => (
  <motion.div
    whileHover={onClick ? { y: -12, scale: 1.03 } : {}}
    whileTap={onClick ? { scale: 0.96 } : {}}
    transition={smoothSpring}
    onClick={onClick}
    style={{ willChange: 'transform' }}
    className={`adaptive-card p-6 transition-all duration-700 transform-gpu ${className} ${onClick ? 'cursor-pointer' : ''} group ${isGold ? 'crystal-morph-gold text-white' : ''}`}
  >
    {children}
  </motion.div>
);
