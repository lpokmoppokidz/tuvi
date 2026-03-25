// src/ui/components/van-han/TabSwitcher.tsx
import React from "react";

interface Tab<T extends string> {
  key: T;
  label: string;
}

interface Props<T extends string> {
  tabs: Tab<T>[];
  active: T;
  onChange: (key: T) => void;
}

export function TabSwitcher<T extends string>({ tabs, active, onChange }: Props<T>) {
  return (
    <div className="flex p-1.5 glass-panel rounded-full shadow-2xl">
      {tabs.map((tab) => (
        <button
          key={tab.key}
          onClick={() => onChange(tab.key)}
          className={`flex-1 py-3.5 rounded-full text-[10px] font-display uppercase tracking-widest transition-all duration-300 ${
            active === tab.key
              ? "bg-celestial-gold/10 text-celestial-gold"
              : "text-white/20"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
