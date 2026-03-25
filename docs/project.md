# 🛡️ PROJECT CONTEXT — READ THIS BEFORE WRITING ANY CODE

You are working on an existing production app. Before writing or modifying ANY code,
you MUST read and follow every rule in this document. Violating any rule = broken app.

---

## 🏗️ PROJECT IDENTITY

- **App name**: TuVi Luxury
- **Type**: React 19 + TypeScript (strict) + Capacitor (Mobile App)
- **UI Style**: Luxury Dark Theme — glassmorphism, dark background (#0a0a0f), gold accents (#d4af37)
- **Build tool**: Vite 6
- **Package manager**: npm

---

## 📦 CORE DEPENDENCIES (DO NOT replace or suggest alternatives)

- **UI**: React 19 + TypeScript (strict)
- **Styling**: Tailwind CSS 4 — use existing utility classes, NO inline styles unless necessary
- **State**: Zustand 5 only — NEVER use Redux, Context API, or useState for global data
- **Data Fetching**: TanStack React Query v5 — ALL async data/mutations must go through hooks
- **i18n**: react-i18next — ALL display text must come from en.json or vi.json
- **Forms**: react-hook-form + Zod (schema.ts)
- **Animation**: Motion (formerly Framer Motion) — use utils/motion-config.ts
- **Icons**: Lucide React
- **Mobile**: Capacitor 8 — touch targets min 44px, no hover effects
- **AI**: Google Gemini API (@google/genai) — DO NOT use OpenAI
- **Logic**: lunar-javascript — core lunar calculations

---

## 📁 FOLDER STRUCTURE — STRICTLY FOLLOW THIS

src/
├── data/
│   ├── constants/
│   │   ├── chinh-tinh.ts        # Chính tinh definitions
│   │   ├── phu-tinh.ts          # Phụ tinh definitions
│   │   ├── cung-list.ts         # 12 cung names/order
│   │   ├── cung-chi-tiet.ts     # Content for Cung details
│   │   ├── tu-hoa.ts            # Tứ hóa definitions
│   │   ├── tuvi-prompts.ts      # Gemini AI prompts
│   │   └── ui/                  # UI-only constants (colors, relations, tabs)
│   └── remote/
│       └── gemini-api.ts        # Gemini connection
│
├── domain/
│   ├── model/
│   │   └── types.ts             # ⚠️ SINGLE SOURCE OF TRUTH for all types
│   └── services/
│       ├── TuViCalculator.ts    # ⚠️ Core algorithm — DO NOT touch logic
│       ├── TuViService.ts       # Orchestrator (calculates + saves to cache)
│       └── CacheService.ts      # Persistent storage layer (LocalStorage)
│
├── store/
│   ├── useTuViStore.ts          # Persistence of calculation results
│   └── useUIStore.ts            # Ephemeral UI state (tabs, lang)
│
├── i18n/
│   └── messages/
│       ├── en.json              # English (ALL keys must exist here)
│       └── vi.json              # Vietnamese (ALL keys must mirror en.json)
│
└── ui/
    ├── screens/                 # Full-page views
    │   ├── LaSoScreen.tsx       # Main chart view
    │   ├── VanHanScreen.tsx     # Predictions for periods
    │   ├── NgayMaiScreen.tsx    # Daily predictions
    │   ├── AiChatScreen.tsx     # Gemini Chat
    │   ├── LoginScreen.tsx      # Auth
    │   ├── RegisterScreen.tsx   # Auth
    │   └── ProfileScreen.tsx    # User settings
    ├── components/
    │   ├── atoms/               # Smallest units (Button, Input, Badge, Label)
    │   ├── molecules/           # Common patterns (ProfileSettingRow)
    │   ├── shared/              # Reusable Luxury UI (CrystalCard, LuxuryBadge)
    │   ├── form/                # BirthDataForm + Inputs + Zod schemas
    │   ├── la-so/               # Chart components (CungGrid, ProfileHeader)
    │   ├── cung-detail/         # Detailed components for CungCard views
    │   ├── ngay-mai/            # Daily prediction specific components
    │   ├── van-han/             # Period prediction specific components
    │   └── tong-quan/           # General overview components
    ├── hooks/
    │   ├── useTuVi.ts           # Mutation hook for calculating Lá Số
    │   ├── useVanHan.ts         # Fetching period data
    │   └── useNgayMai.ts        # Fetching daily data
    └── utils/
        └── motion-config.ts     # Framer Motion shared configurations

---

## 🔁 DATA FLOW — DO NOT break this chain

[User Input]
    ↓ BirthDataForm (react-hook-form + zod)
    ↓ useTuVi.ts (TanStack Mutation)
    ↓ TuViService.ts (Domain Orchestrator)
    ↓ TuViCalculator.ts (Core logic) → returns result
    ↓ TuViService.ts (Saves result to CacheService)
    ↓ useTuViStore.ts (Updates global Zustand state)
    ↓ UI Screens (Reactive update from Zustand)

⚠️ NEVER fetch data directly in a Screen. Use Hooks.
⚠️ NEVER write calculation logic inside a component.
⚠️ ALWAYS use CacheService for persistent data.

---

## 🎨 DESIGN SYSTEM — MUST FOLLOW

### Colors (Luxury Dark)
- Background:     #0a0a0f (primary), #12121a (card), #1a1a2e (elevated)
- Gold accent:    #d4af37 (primary), #f0d060 (hover), #a08020 (muted)
- Text:           #ffffff (primary), #a0a0b0 (secondary), #606070 (disabled)
- Cards: glassmorphism → backdrop-blur-md bg-white/5 border border-white/10

### Component Rules
- Buttons: min height 44px (mobile touch), gold gradient on primary actions
- Animation: use `motion` from `motion/react` with presets in `motion-config.ts`
- Spacing: use Tailwind scale (p-4, gap-3...)
- Radius: rounded-xl for cards, rounded-lg for buttons, rounded-md for inputs

---

## 🌐 i18n RULES — ZERO EXCEPTIONS

1. Every string visible to user → MUST be in en.json AND vi.json
2. Use namespaces: `common.*`, `birth_form.*`, `la_so.*`, `ai_chat.*`, `van_han.*`, `ngay_mai.*`
3. NEVER hardcode Vietnamese or English text in JSX

---

## ⚙️ CODING RULES

### TypeScript
- strict mode ON — no `any`, no `as unknown`
- All props must have explicit interface defined in types.ts or co-located
- Use type imports: `import type { X } from '...'`

### Components
- Functional components only
- Atoms: no business logic, no store access, props only
- Organisms/Screens: access store/data via hooks

### Hooks
- No direct API/Logic calls inside components — use hooks or services
- Use TanStack Query for all asynchronous operations

---

## 🚫 THINGS YOU MUST NEVER DO

- ❌ Add new dependencies without asking first
- ❌ Refactor existing working files unless task specifically asks
- ❌ Move files to different folders
- ❌ Hardcode text strings in JSX
- ❌ Access store from atoms
- ❌ Put business logic inside screen components
- ❌ Skip TypeScript types ("just use any for now")

---

## ✅ BEFORE YOU WRITE ANY CODE — CHECKLIST

□ Are all new text strings added to BOTH en.json and vi.json?
□ Does the new code follow the data flow chain?
□ Are all TypeScript types defined in types.ts or as local interface?
□ Is min touch target 44px for any interactive element?

---

## 💬 HOW TO RESPOND

- If task is unclear → ask ONE clarifying question before coding
- If task requires touching a protected file (TuViCalculator, types.ts, gemini-api) 
  → warn the user first and confirm
- Always show file path at top of every code block:
  // src/ui/components/atoms/Button.tsx
- If adding new translation keys → show the diff for BOTH en.json and vi.json
[PASTE YOUR TASK HERE — e.g. "Add a loading skeleton to LaSoScreen"]