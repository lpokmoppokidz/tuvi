import React, { useState, useEffect, useMemo } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutDashboard, CalendarDays, User, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { NavItem } from "./domain/model/types";
import { useTuViStore } from "./store/useTuViStore";
import { useUIStore }   from "./store/useUIStore";
import { LaSoScreen }    from "./ui/screens/LaSoScreen";
import { VanHanScreen }  from "./ui/screens/VanHanScreen";
import { NgayMaiScreen } from "./ui/screens/NgayMaiScreen";
import { ProfileScreen } from "./ui/screens/ProfileScreen";
import { AiChatScreen }  from "./ui/screens/AiChatScreen";
import { pageTransition, navActive } from "./ui/utils/motion-config";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60 * 5 },
  },
});

const NAV_ITEMS = [
  { id: "laso",     icon: LayoutDashboard, label: "Lá Số" },
  { id: "van_han",  icon: Compass,         label: "Giải Mã" },
  { id: "ngay_mai", icon: CalendarDays,    label: "Ngày Tốt" },
  { id: "profile",  icon: User,            label: "Cá Nhân" },
];

export default function App() {
  const [activeTab, setActiveTab] = useState<NavItem>("laso");
  const { tuViData, setTuViData } = useTuViStore();
  const { isDark, toggleDark }    = useUIStore();

  const stars = useMemo(() =>
    [...Array(12)].map((_, i) => ({
      id: i,
      top:      `${Math.random() * 100}%`,
      left:     `${Math.random() * 100}%`,
      duration: `${2 + Math.random() * 4}s`,
    })),
  []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  const renderScreen = () => {
    switch (activeTab) {
      case "laso":     return <LaSoScreen tuViData={tuViData} onTuViDataChange={setTuViData} />;
      case "van_han":  return <VanHanScreen tuViData={tuViData} />;
      case "ngay_mai": return <NgayMaiScreen isDark={isDark} tuViData={tuViData} />;
      case "ai_chat":  return <AiChatScreen />;
      case "profile":  return <ProfileScreen 
        isDark={isDark} 
        setIsDark={toggleDark} 
        tuViData={tuViData}
        onClearData={useTuViStore.getState().clearTuViData}
        onForceRefresh={async () => { /* no-op */ }}
      />;
      default:         return <LaSoScreen tuViData={tuViData} onTuViDataChange={setTuViData} />;
    }
  };

  return (
    <QueryClientProvider client={queryClient}>
      <div className={`min-h-screen max-w-md mx-auto relative overflow-x-hidden ${isDark ? "luxury-glow" : "bg-bg"}`}>
        {stars.map((star) => (
          <div
            key={star.id}
            className="star-field"
            style={{ top: star.top, left: star.left, "--duration": star.duration } as any}
          />
        ))}
        <main className="relative z-10 pt-6">
          <AnimatePresence mode="wait">
            <motion.div key={activeTab}
              {...pageTransition}>
              {renderScreen()}
            </motion.div>
          </AnimatePresence>
        </main>

        <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-40">
          <div className="adaptive-card p-2 flex justify-around items-center rounded-[40px] backdrop-blur-3xl">
            {NAV_ITEMS.map((item) => (
              <button key={item.id} onClick={() => setActiveTab(item.id as NavItem)}
                className={`relative p-4 rounded-[28px] transition-all duration-700 flex flex-col items-center gap-1 group overflow-hidden ${
                  activeTab === item.id ? "text-primary" : "text-text-secondary/40"
                }`}>
                {activeTab === item.id && (
                  <motion.div layoutId="nav-active"
                    className="absolute inset-0 bg-primary/10 rounded-[28px] border border-primary/10"
                    {...navActive} />
                )}
                <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 1.5}
                  className="relative z-10 transition-transform group-hover:scale-110" />
                <span className="relative z-10 text-[8px] font-black uppercase tracking-widest">
                  {item.label}
                </span>
              </button>
            ))}
          </div>
        </nav>
      </div>
    </QueryClientProvider>
  );
}
