import React from 'react';

export const CrystalRing = ({ text, glowColor = "crystal-gold" }: { text: string, glowColor?: string }) => {
  const isGold = glowColor === "crystal-gold";
  const accentColor = isGold ? "crystal-gold" : "primary";

  return (
    <div className="relative flex items-center justify-center w-48 h-48">
      {/* Outer Atmosphere */}
      <div className={`absolute inset-0 rounded-full blur-3xl opacity-10 ${isGold ? 'bg-crystal-gold' : 'bg-primary'}`} />
      {/* Outer Glow Ring */}
      <div className={`absolute inset-0 rounded-full border border-${accentColor}/20 shadow-xl`} />
      {/* Orbiting Particles */}
      <div className="absolute inset-[-15px] rounded-full">
        <div className={`absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full shadow-lg ${isGold ? 'bg-crystal-gold' : 'bg-primary'}`} />
      </div>
      {/* Inner Crystal Orb */}
      <div className={`absolute inset-6 rounded-full adaptive-card border-2 border-${accentColor}/40 flex items-center justify-center overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/10 to-transparent" />
        <span className={`text-3xl font-black tracking-[0.3em] z-10 drop-shadow-lg text-glow-gold ${isGold ? 'text-crystal-gold' : 'text-primary'}`}>{text}</span>
      </div>
    </div>
  );
};
