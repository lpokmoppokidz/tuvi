# 00 — Project Bootstrap Guide

## Overview

**Tử Vi Việt** is a Vietnamese astrology (Tử Vi Đẩu Số) mobile-first web app built with React + TypeScript and packaged as a native Android app via Capacitor. Users enter their birth date, time, and gender to receive a fully calculated 12-palace astrological chart (lá số), destiny period analysis (vận hạn), daily forecasts (ngày mai), and AI-powered chart interpretation via Google Gemini.

**Target users:** Vietnamese speakers interested in traditional astrology, fortune-telling, and daily guidance.

**Core value proposition:**
- Accurate algorithmic Tử Vi calculation (no AI for the math — pure TypeScript)
- Luxury glassmorphism UI with dark theme and gold accents
- AI chat powered by Gemini for natural-language chart interpretation
- Works offline after first load; packaged as a native Android APK via Capacitor

---

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | ^19.0.0 | UI framework |
| TypeScript | ~5.8.2 | Type safety, strict mode |
| Vite | ^6.2.0 | Build tool and dev server |
| Tailwind CSS | ^4.1.14 | Utility-first styling |
| @tailwindcss/vite | ^4.1.14 | Tailwind v4 Vite plugin |
| Capacitor | ^8.2.0 | Native Android/iOS packaging |
| Zustand | ^5.0.11 | Global state management |
| React Hook Form | ^7.71.2 | Form handling |
| Zod | ^4.3.6 | Schema validation |
| @hookform/resolvers | ^5.2.2 | Zod ↔ RHF bridge |
| @tanstack/react-query | ^5.90.21 | Async mutation management |
| motion (Framer Motion) | ^12.23.24 | Animations |
| lucide-react | ^0.546.0 | Icon library |
| lunar-javascript | ^1.7.7 | Solar ↔ Lunar calendar conversion |
| @google/genai | ^1.29.0 | Google Gemini AI SDK |
| react-i18next | latest | Internationalization (vi/en) |
| i18next | latest | i18n core |
| Express | ^4.21.2 | Local API server (dev only) |
| dotenv | ^17.2.3 | Environment variable loading |

---

## Prerequisites

### Required
- **Node.js** ≥ 20.x (LTS recommended — project uses ES modules `"type": "module"`)
- **npm** ≥ 10.x (comes with Node 20)
- **Git**

### For Android builds
- **Android Studio** Hedgehog (2023.1.1) or newer
- **Java JDK** 17 (required by Gradle)
- **Android SDK** API level 33+ (target) / 22+ (minimum)
- **Gradle** (managed by Android Studio wrapper — no manual install needed)

### For iOS builds (if applicable)
> 🚧 TODO: iOS build pipeline not yet configured. Capacitor iOS support requires macOS + Xcode 15+.

---

## Step-by-Step Local Setup

### 1. Clone the Repository

```bash
git clone <repository-url>
cd <project-folder>
```

### 2. Install Dependencies

```bash
npm install
```

This installs all dependencies listed in `package.json` including React, Capacitor, Tailwind, Zustand, and i18n packages.

### 3. Environment Variables Setup

Copy the example file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and configure:

```dotenv
# .env

# Required: Your Google Gemini API key
# Get one at: https://aistudio.google.com/app/apikey
GEMINI_API_KEY="your_gemini_api_key_here"

# The URL where the app is hosted (used for self-referential links)
# For local dev: http://localhost:3000
APP_URL="http://localhost:3000"
```

**Key notes:**
- `GEMINI_API_KEY` is used by both the Express server (`server.ts`) and the client-side `gemini-api.ts`. In production, it must be injected as a server-side secret — never commit it to git.
- The `.env` file is already in `.gitignore`.

### 4. Run the Development Server

**Frontend only (Vite):**
```bash
npm run dev
```
Opens at `http://localhost:3000`

**Backend API server (Express — for Gemini calculation endpoint):**
```bash
npm run dev:server
```
Runs at `http://localhost:3001`

> For full functionality, run both in separate terminals. The Express server handles `/api/tuvi/calculate` which uses the `TUVI_SYSTEM_PROMPT` to call Gemini for chart calculation.

### 5. Run on Android via Capacitor

**Step 1 — Build the web app:**
```bash
npm run build
```

**Step 2 — Sync web assets to Android:**
```bash
npx cap sync
```

**Step 3 — Open in Android Studio:**
```bash
npx cap open android
```

**Step 4 — Run on device/emulator:**
In Android Studio, select your device and click the green Run button (▶).

**Or use the combined build script:**
```bash
npm run cap:build
```
This runs `build` + `cap copy android` + `cap update android` in sequence.

---

## Folder Structure Overview

```
root/
├── android/                    # Capacitor Android native project (do not edit manually)
├── src/
│   ├── data/
│   │   ├── constants/          # Static lookup tables: stars, palaces, prompts
│   │   └── remote/             # External API clients (Gemini)
│   ├── domain/
│   │   ├── model/              # TypeScript interfaces and types (single source of truth)
│   │   └── services/           # Business logic: calculator, service orchestrator, cache
│   ├── store/                  # Zustand global state stores
│   ├── i18n/                   # i18next config + translation JSON files
│   └── ui/
│       ├── components/
│       │   ├── atoms/          # Primitive UI: Button, Input, Label, Badge
│       │   ├── molecules/      # Composed UI: FormField, SearchBar (🚧 TODO)
│       │   ├── organisms/      # Complex UI: Header, NavigationBar (🚧 TODO)
│       │   ├── la-so/          # Chart-specific: CungGrid, CungGridItem, ProfileHeader
│       │   ├── shared/         # Reusable luxury components: CrystalCard, LuxuryBadge, LanguageSwitcher
│       │   └── form/           # Form schemas (Zod)
│       ├── hooks/              # Custom React hooks
│       ├── screens/            # Full-page screen components
│       └── utils/              # Motion animation configs
├── docs/                       # Project documentation (this folder)
├── .env.example                # Environment variable template
├── capacitor.config.ts         # Capacitor app configuration
├── package.json                # Dependencies and scripts
├── server.ts                   # Express API server (dev/prod backend)
└── index.html                  # Vite HTML entry point
```

---

## Common Setup Errors and Fixes

### Error: `Cannot find module 'lunar-javascript'`
```
npm install lunar-javascript
```

### Error: `GEMINI_API_KEY is not configured`
- Ensure `.env` exists and contains a valid `GEMINI_API_KEY`
- Restart the dev server after editing `.env`

### Error: Vite build fails with Tailwind CSS v4
- Ensure `@tailwindcss/vite` is in `devDependencies` and configured in `vite.config.ts`
- Tailwind v4 does not use `tailwind.config.js` — configuration is in CSS

### Error: Android build fails — `SDK location not found`
- Open Android Studio → SDK Manager → note the SDK path
- Create `android/local.properties`:
  ```
  sdk.dir=/path/to/your/Android/Sdk
  ```

### Error: `cap sync` fails — `web assets not found`
- Run `npm run build` first to generate the `dist/` folder
- Then run `npx cap sync`

### Error: `react-i18next` translations not loading
- Ensure `import './i18n/config'` is in `src/main.tsx` before `<App />`
- Check that `src/i18n/messages/vi.json` and `en.json` exist

### Error: TypeScript strict mode errors on new files
- All files must have explicit return types on exported functions
- No implicit `any` — use `unknown` and narrow types

---

## Team Conventions

### Branch Naming
```
feature/<ticket-id>-short-description    # New features
fix/<ticket-id>-short-description        # Bug fixes
chore/<description>                      # Tooling, deps, config
docs/<description>                       # Documentation only
```

Examples:
```
feature/TV-42-add-van-han-screen
fix/TV-17-cung-menh-calculation-error
chore/upgrade-capacitor-v8
```

### Commit Message Format (Conventional Commits)
```
<type>(<scope>): <short description>

[optional body]
[optional footer]
```

Types: `feat`, `fix`, `chore`, `docs`, `style`, `refactor`, `test`, `perf`

Examples:
```
feat(calculator): add Thiên Mã star placement algorithm
fix(cache): prevent stale du_doan on date change
chore(deps): upgrade @google/genai to 1.29.0
docs(api): document gemini-api.ts error handling
```

### Pull Request Rules
1. All PRs require at least 1 reviewer approval
2. PR title must follow Conventional Commits format
3. No direct pushes to `main` — all changes via PR
4. PR description must include: what changed, why, how to test
5. All TypeScript errors must be resolved before merge (`npm run lint`)
6. Screenshots required for any UI changes
7. Translation keys must be added to both `en.json` and `vi.json` in the same PR

### Code Style
- Use `const` over `let` wherever possible
- Prefer named exports over default exports (except screens and `App.tsx`)
- All components must have `displayName` set when using `memo()`
- No hardcoded Vietnamese or English strings in components — use `t()` from `react-i18next`
