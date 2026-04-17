import React, { useState, useEffect, useMemo, lazy, Suspense, useCallback, useTransition } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { LayoutDashboard, CalendarDays, User, Compass } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { useTranslation } from "react-i18next";
import { useShallow } from "zustand/react/shallow";
import type { NavItem } from "./domain/model/types";
import { useTuViStore } from "./store/useTuViStore";
import { useUIStore }   from "./store/useUIStore";
import { pageTransition, navActive } from "./ui/shared/utils/motion-config";

// 3. Lazy load screens — only bundle what's needed on first paint
const LaSoScreen    = lazy(() => import("./ui/features/la-so/LaSoScreen").then(m => ({ default: m.LaSoScreen })));
const VanHanScreen  = lazy(() => import("./ui/features/van-han/VanHanScreen").then(m => ({ default: m.VanHanScreen })));
const NgayMaiScreen = lazy(() => import("./ui/features/ngay-mai/NgayMaiScreen").then(m => ({ default: m.NgayMaiScreen })));
const AiChatScreen  = lazy(() => import("./ui/features/ai-chat/AiChatScreen").then(m => ({ default: m.AiChatScreen })));
const ProfileScreen = lazy(() => import("./ui/features/profile/ProfileScreen").then(m => ({ default: m.ProfileScreen })));
const LoginScreen   = lazy(() => import("./ui/features/auth/LoginScreen").then(m => ({ default: m.LoginScreen })));
const RegisterScreen= lazy(() => import("./ui/features/auth/RegisterScreen").then(m => ({ default: m.RegisterScreen })));

type AuthScreen = "login" | "register" | "app";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // Section 5: stale-while-revalidate — reuse cache, refetch in background
      staleTime:  1000 * 60 * 5,   // 5 min fresh
      gcTime:     1000 * 60 * 10,  // 10 min in cache
      retry: 1,
      refetchOnWindowFocus: false,  // mobile: no refetch on app resume
    },
  },
});

const NAV_ITEMS = [
  { id: "laso",     icon: LayoutDashboard, labelKey: "nav.laso" },
  { id: "van_han",  icon: Compass,         labelKey: "nav.van_han" },
  { id: "ngay_mai", icon: CalendarDays,    labelKey: "nav.ngay_mai" },
  { id: "profile",  icon: User,            labelKey: "nav.profile" },
] as const;

// Minimal loading fallback — no extra bundle cost
const ScreenLoader = () => (
  <div className="flex items-center justify-center min-h-screen">
    <div className="w-8 h-8 rounded-full border-2 border-celestial-gold/30 border-t-celestial-gold animate-spin" />
  </div>
);

export default function App() {
  const [authScreen, setAuthScreen] = useState<AuthScreen>("login");
  const [activeTab, setActiveTab]   = useState<NavItem>("laso");
  const [isPending, startTransition] = useTransition();
  const { t } = useTranslation();

  // 2. Zustand — only subscribe to exact fields needed
  const tuViData  = useTuViStore(state => state.tuViData);
  const setTuViData = useTuViStore(state => state.setTuViData);
  const { isDark, toggleDark } = useUIStore(
    useShallow(state => ({ isDark: state.isDark, toggleDark: state.toggleDark }))
  );

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark);
  }, [isDark]);

  // Scroll to top on every tab change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [activeTab]);

  // useCallback — stable reference, won't cause child re-renders
  const handleLoginSuccess    = useCallback(() => setAuthScreen("app"),      []);
  const handleRegisterSuccess = useCallback(() => setAuthScreen("app"),      []);
  const handleGoRegister      = useCallback(() => setAuthScreen("register"), []);
  const handleGoLogin         = useCallback(() => setAuthScreen("login"),    []);
  const handleClearData       = useCallback(() => useTuViStore.getState().clearTuViData(), []);

  // Section 2: memoize screen — stable JSX reference, no new object each render
  const screen = useMemo(() => {
    switch (activeTab) {
      case "laso":     return <LaSoScreen tuViData={tuViData} onTuViDataChange={setTuViData} />;
      case "van_han":  return <VanHanScreen tuViData={tuViData} />;
      case "ngay_mai": return <NgayMaiScreen isDark={isDark} tuViData={tuViData} />;
      case "ai_chat":  return <AiChatScreen />;
      case "profile":  return (
        <ProfileScreen
          isDark={isDark}
          setIsDark={toggleDark}
          tuViData={tuViData}
          onClearData={handleClearData}
          onForceRefresh={async () => {}}
        />
      );
      default: return <LaSoScreen tuViData={tuViData} onTuViDataChange={setTuViData} />;
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeTab, tuViData, isDark]);

  const handleTabChange = useCallback((tab: NavItem) => {
    startTransition(() => {
      setActiveTab(tab);
    });
  }, []);

  return (
    <QueryClientProvider client={queryClient}>
      <Suspense fallback={<ScreenLoader />}>
        <AnimatePresence mode="wait">
          {authScreen === "login" && (
            <motion.div key="login" {...pageTransition}>
              <LoginScreen
                onNavigateRegister={handleGoRegister}
                onLoginSuccess={handleLoginSuccess}
              />
            </motion.div>
          )}
          {authScreen === "register" && (
            <motion.div key="register" {...pageTransition}>
              <RegisterScreen
                onNavigateLogin={handleGoLogin}
                onRegisterSuccess={handleRegisterSuccess}
              />
            </motion.div>
          )}
          {authScreen === "app" && (
            <motion.div key="app" {...pageTransition}>
              <div className={`min-h-screen max-w-md mx-auto relative overflow-x-hidden ${isDark ? "luxury-glow" : "bg-bg"}`}>
                <main className={`relative z-10 pt-6 transition-opacity duration-300 ${isPending ? 'opacity-50' : 'opacity-100'}`}>
                  <AnimatePresence mode="wait">
                    <motion.div key={activeTab} {...pageTransition}>
                      <Suspense fallback={<ScreenLoader />}>
                        {screen}
                      </Suspense>
                    </motion.div>
                  </AnimatePresence>
                </main>

                <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[94%] max-w-sm z-40">
                  <div className="adaptive-card p-2 flex justify-around items-center rounded-[40px] backdrop-blur-3xl">
                    {NAV_ITEMS.map((item) => (
                      <button key={item.id} onClick={() => handleTabChange(item.id as NavItem)}
                        className={`relative p-4 rounded-[28px] transition-all duration-300 flex flex-col items-center gap-1 group overflow-hidden active:scale-95 ${
                          activeTab === item.id ? "text-primary" : "text-text-secondary/40"
                        }`}>
                        {activeTab === item.id && (
                          <motion.div layoutId="nav-active"
                            className="absolute inset-0 bg-primary/10 rounded-[28px] border border-primary/10"
                            {...navActive} />
                        )}
                        <item.icon size={24} strokeWidth={activeTab === item.id ? 2.5 : 1.5}
                          className={`relative z-10 transition-transform ${activeTab === item.id ? 'scale-110' : 'scale-100'}`} />
                        <span className="relative z-10 text-[8px] font-black uppercase tracking-widest">
                          {t(item.labelKey)}
                        </span>
                      </button>
                    ))}
                  </div>
                </nav>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Suspense>
    </QueryClientProvider>
  );
}
