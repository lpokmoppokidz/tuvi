# 03 — Frontend Architecture & UI Guide

> Cross-reference: See [01-system-design](../01-system-design/README.md) for component hierarchy and data flow, [02-backend](../02-backend/README.md) for API integration points.

---

## Component Architecture: Atomic Design

This project follows Atomic Design principles adapted for a mobile-first luxury UI.

### The Rules

| Level | Location | Rules |
|---|---|---|
| **Atoms** | `src/ui/components/atoms/` | No store access. No business logic. No API calls. Props only. |
| **Molecules** | `src/ui/components/form/`, `BirthDataForm.tsx` | May compose atoms. May use React Hook Form. No store access. |
| **Organisms** | `src/ui/components/la-so/`, `src/ui/components/shared/` | May read from store via props passed down. No direct `useTuViStore` calls. |
| **Screens** | `src/ui/screens/` | Own local state. Call hooks. Receive store data as props from `App.tsx`. |

### What Belongs Where

**Atoms** — single-responsibility primitives:
- `Button` — renders a styled button with variants (gold, ghost, danger), loading state, optional icon
- `Input` — renders a styled input with optional icon, label, and error message
- `Label` — renders a styled label with color variants (gold, muted, white)
- `Badge` — renders a small pill badge with color variants (gold, violet, red, green)

**Molecules** — composed from atoms, handle form logic:
- `BirthDataForm` — full birth data entry form using React Hook Form + Zod validation
- > 🚧 TODO: Extract `FormField` molecule (label + input + error) from `BirthDataForm`

**Organisms** — feature-specific, reusable across screens:
- `ProfileHeader` — user avatar + name + Can Chi display + add button
- `CungGrid` — 3-column grid of 12 palace cards
- `CungGridItem` — individual palace card with stars display
- `CrystalCard` — glassmorphism card wrapper with hover/tap animations
- `LuxuryBadge` — gold-accented badge for star names
- `LanguageSwitcher` — vi/en toggle button
- `CrystalRing` — decorative animated ring component

**Screens** — full pages:
- `LaSoScreen`, `AiChatScreen`, `VanHanScreen`, `NgayMaiScreen`, `ProfileScreen`

---

## Design System

### Color Tokens

All colors are defined as Tailwind CSS custom properties. The luxury dark theme uses:

| Token | Hex / Usage | Description |
|---|---|---|
| `celestial-gold` | `#D4AF37` | Primary gold accent — buttons, titles, borders |
| `star-white` | `#F8F6F0` | Primary text on dark backgrounds |
| `cosmic-navy` | `#0A0E1A` | Deep background |
| `cosmic-purple` | `#1A0A2E` | Secondary background, card fills |
| `mystic-violet` | `#8B5CF6` | Secondary accent — lunar calendar, secondary badges |
| `text-secondary` | `rgba(255,255,255,0.4)` | Muted text |
| `primary` | `celestial-gold` | Alias for primary interactive color |

**Semantic colors:**
- Success: `text-green-400` / `bg-green-400/10`
- Warning: `text-orange-400` / `bg-orange-400/10`
- Danger: `text-red-400` / `bg-red-500/10`
- Info: `text-mystic-violet` / `bg-mystic-violet/10`

### Typography Scale

| Class | Usage | Style |
|---|---|---|
| `font-display` | All headings, labels, buttons | Tracking-widest, uppercase |
| `text-3xl font-display` | Screen titles | e.g., "Vận Hạn", "Ngày Mai" |
| `text-2xl font-display` | Section headers | e.g., form title |
| `text-xl font-display` | Card headers | e.g., palace name |
| `text-sm` | Body text, descriptions | Normal weight |
| `text-xs` | Secondary body | Star names, labels |
| `text-[10px] font-display` | Micro labels | Uppercase tracking-widest |
| `text-[9px] font-display` | Field labels | Uppercase tracking-[0.4em] |

**Font family:** `font-display` maps to a custom display font defined in the CSS. All UI text uses this font for the luxury aesthetic.

### Spacing Rules

- Use only Tailwind's default spacing scale (4px base unit)
- Common values: `p-4` (16px), `p-6` (24px), `p-8` (32px), `p-10` (40px)
- Gap between grid items: `gap-4` (16px)
- Bottom padding for scrollable screens: `pb-32` or `pb-40` (accounts for fixed nav bar)
- No arbitrary values like `p-[13px]` — use the nearest scale value

### Component Variants

#### CrystalCard
```tsx
// src/ui/components/shared/CrystalCard.tsx
<CrystalCard>                    // Default glassmorphism card
<CrystalCard isGold={true}>     // Gold-tinted variant
<CrystalCard onClick={fn}>      // Clickable with hover/tap animation
```
CSS classes applied: `adaptive-card p-6 transition-all duration-700`

#### Button (Atom)
```tsx
// src/ui/components/atoms/Button.tsx
<Button variant="gold">         // Gold accent (default)
<Button variant="ghost">        // Subtle white/5 background
<Button variant="danger">       // Red accent
<Button loading={true}>         // Shows spinner, disables interaction
<Button icon={<Sparkles />}>    // Prepends icon
```

#### Input (Atom)
```tsx
// src/ui/components/atoms/Input.tsx
<Input label="Họ và Tên" />
<Input icon={<User size={18} />} />
<Input error="Vui lòng nhập họ tên" />
```

#### Badge (Atom)
```tsx
// src/ui/components/atoms/Badge.tsx
<Badge color="gold">Hóa Lộc</Badge>
<Badge color="violet">Tử Vi</Badge>
<Badge color="red">Kình Dương</Badge>
<Badge color="green">Lộc Tồn</Badge>
```

### CSS Utility Classes (Custom)

These are defined in `src/index.css` and used throughout:

| Class | Effect |
|---|---|
| `glass-panel` | Glassmorphism: `backdrop-blur`, semi-transparent background, subtle border |
| `adaptive-card` | Responsive card that adapts to dark/light mode |
| `text-gradient-gold` | Gold gradient text using `background-clip: text` |
| `gold-border` | Subtle gold border with low opacity |
| `shimmer` | Animated shimmer overlay for luxury effect |
| `celestial-glow` | Radial glow effect using gold color |
| `crystal-morph-gold` | Gold-tinted glassmorphism variant |
| `luxury-glow` | Full-page glow background for dark mode |
| `no-scrollbar` | Hides scrollbar while keeping scroll functionality |
| `animate-spin-slow` | Slow rotation animation (used for decorative rings) |
| `star-field` | Animated twinkling star dot |

---

## Screen-by-Screen Breakdown

### LaSoScreen (`src/ui/screens/LaSoScreen.tsx`)

**Purpose:** Main screen — displays the 12-palace astrological chart.

**Data source:**
- `tuViData: TuViData | null` — passed as prop from `App.tsx` (from `useTuViStore`)
- `onTuViDataChange: (data: TuViData) => void` — callback to update store

**Local state:**
- `selectedCung: CungDisplay | null` — which palace is selected (opens detail modal)
- `showForm: boolean` — whether birth form modal is visible

**Hooks used:**
- `useTuVi(onTuViDataChange)` — provides `calculate()` mutation and `isCalculating` state
- `useCungList(tuViData)` — derives `CungDisplay[]` from raw `TuViData`

**Sub-components:**
- `ProfileHeader` — shows user name, Can Chi, add button
- `CungGrid` → `CungGridItem[]` — the 12-palace grid
- `TongQuanLaSo` — summary overview (shown when chart exists)
- `CungDetailScreen` — full-screen modal for palace detail (with `PhuTinhList`, `PhuTinhTab`)
- `BirthDataForm` — modal form for entering birth data

**Empty state:** When `tuViData` is null, shows a centered prompt with a "Bắt đầu khởi tạo" button (text from `t('la_so.start_btn')`).

**i18n keys used:** `la_so.no_data_title`, `la_so.no_data_desc`, `la_so.start_btn`

---

### AiChatScreen (`src/ui/screens/AiChatScreen.tsx`)

**Purpose:** Conversational AI interface for chart interpretation.

**Data source:** No props — calls `generateGeminiResponse()` directly.

**Local state:**
- `messages: Message[]` — chat history (role: 'user' | 'model', text: string)
- `input: string` — current input field value
- `loading: boolean` — AI response in progress

**Message flow:**
1. User types message → presses Enter or Send button
2. User message appended to `messages`
3. `generateGeminiResponse(userMsg)` called
4. Loading indicator shown (3 animated gold dots)
5. AI response appended to `messages`
6. Auto-scroll to bottom via `scrollRef`

**i18n keys used:** `ai_chat.title`, `ai_chat.subtitle`, `ai_chat.placeholder`, `ai_chat.welcome`, `ai_chat.error`

> 🚧 TODO: Pass `tuViData` as context to the AI prompt so it can give personalized chart interpretations rather than generic astrology answers.

---

### VanHanScreen (`src/ui/screens/VanHanScreen.tsx`)

**Purpose:** Displays current Đại Hạn (10-year destiny period) and Tiểu Hạn (yearly cycle).

**Data source:** `tuViData: TuViData | null` — passed as prop from `App.tsx`.

**Local state:**
- `activeTab: "dai_han" | "tieu_han"` — which tab is active

**Data accessed:**
- `tuViData.van_han.dai_han_hien_tai` — current 10-year period
- `tuViData.van_han.tieu_han_hien_tai` — current yearly cycle
- `CHINH_TINH_DESC[starName].y_nghia` — star meaning from constants

**Empty state:** Shows a centered star icon with a prompt to enter chart data.

**Hardcoded strings present:**
> 🚧 TODO: "Đại Hạn 10 Năm", "Tiểu Hạn 1 Năm", "Giai đoạn hiện tại", "Vận hạn năm nay", "Cơ Hội", "Rủi Ro" — these should be moved to `vi.json`/`en.json`.

---

### NgayMaiScreen (`src/ui/screens/NgayMaiScreen.tsx`)

**Purpose:** Daily forecast for tomorrow based on Can Chi and Ngũ Hành analysis.

**Data source:**
- `tuViData: TuViData | null` — passed as prop
- `isDark: boolean` — passed as prop (for potential theme-specific rendering)

**Data accessed:**
- `tuViData.du_doan_ngay_mai` — pre-calculated tomorrow forecast
- `tuViData.van_han.tieu_han_hien_tai` — for star analysis
- `NGU_HANH_NGAY[nguHanhNgay]` — daily element data (lucky hours, directions, colors)

**Score calculation:**
- `tinhDiem(tuongSinh, may, can_than, category)` — calculates 0-100 score for Tài/Sức/Tình/Sự
- `phanTichSaoNgay(chinhTinh, phuTinh, tuHoa)` — returns `{ may: string[], can_than: string[] }`

**Expandable sections:** Lucky items, caution items, lucky hours, direction & color — all use `AnimatePresence` with height animation.

**Hardcoded strings present:**
> 🚧 TODO: Most display strings in this screen are hardcoded Vietnamese. They should be moved to `vi.json`/`en.json`.

---

### ProfileScreen (`src/ui/screens/ProfileScreen.tsx`)

**Purpose:** User profile, settings, and data management.

**Props:**
- `isDark: boolean` — current theme
- `setIsDark: (v: boolean) => void` — theme toggle (maps to `useUIStore.toggleDark`)
- `tuViData: TuViData | null` — for displaying user info
- `onClearData: () => void` — clears chart data
- `onForceRefresh: () => Promise<void>` — forces forecast refresh

**Features:**
- Dark/light mode toggle with animated switch
- Premium membership placeholder (🚧 TODO: not implemented)
- Clear chart data with confirmation dialog
- Force refresh daily forecast

> 🚧 TODO: Add `LanguageSwitcher` component to this screen.

---

## Routing Structure

The app uses a **manual tab-based routing** system in `App.tsx` — no React Router.

```typescript
// src/App.tsx
type NavItem = "laso" | "van_han" | "ngay_mai" | "ai_chat" | "profile";
const [activeTab, setActiveTab] = useState<NavItem>("laso");
```

The `renderScreen()` function returns the appropriate screen component based on `activeTab`. Page transitions use `AnimatePresence` with `pageTransition` motion config.

> 🚧 TODO: Consider React Router v6 if deep linking or browser history navigation is needed for the web version.

---

## Hooks Documentation

### `useTuVi(onSuccess)` — `src/ui/hooks/useTuVi.ts`

**Purpose:** Wraps the chart calculation mutation.

**Parameters:**
- `onSuccess: (data: TuViData) => void` — called when calculation succeeds

**Returns:**
```typescript
{
  calculate: (formData: BirthFormData) => Promise<TuViData>,
  isCalculating: boolean,
  error: Error | null,
}
```

**Internally:** Uses `useMutation` from React Query. Transforms form data (converts `YYYY-MM-DD` to `DD/MM/YYYY`, maps `solar`→`duong`, `male`→`Nam`) before calling `TuViService.calculateAndSave()`.

---

### `useVanHan(tuViData)` — `src/ui/hooks/useVanHan.ts`

**Purpose:** Extracts and memoizes destiny period data from `TuViData`.

**Parameters:**
- `tuViData: TuViData | null`

**Returns:**
```typescript
{
  daiHanHienTai: DaiHan,
  daiHanTiepTheo: DaiHan,
  tieuHanHienTai: TieuHan,
} | null
```

**Note:** Currently not used by `VanHanScreen` (which accesses `tuViData.van_han` directly). This hook is available for use.

---

### `useCungList(tuViData)` — `src/ui/hooks/useCungList.ts`

**Purpose:** Transforms raw `TuViData["12_cung"]` into a display-ready `CungDisplay[]` array ordered by `DIA_CHI_ORDER`.

**Parameters:**
- `tuViData: TuViData | null`

**Returns:** `CungDisplay[]` — always 12 items. Returns `TRAD_CUNG_LIST` (default empty palaces) when `tuViData` is null.

**Memoized:** Yes — only recomputes when `tuViData` reference changes.

---

### `useNgayMai` — `src/ui/hooks/useNgayMai.ts`

> 🚧 TODO: Document this hook after reviewing its implementation.

---

### `QueryClientProviderWrapper` — `src/ui/hooks/QueryClientProviderWrapper.tsx`

A wrapper component that provides the React Query `QueryClient`. Currently the `QueryClient` is instantiated directly in `App.tsx` — this wrapper may be an alternative approach.

---

## i18n Usage Guide

### How to Use Translations in a Component

```tsx
// Any component
import { useTranslation } from 'react-i18next';

const MyComponent = () => {
  const { t } = useTranslation();
  return <h1>{t('la_so.title')}</h1>;
};
```

### How to Add New Strings

1. Add the key to `src/i18n/messages/vi.json`:
```json
{
  "my_feature": {
    "my_key": "Giá trị tiếng Việt"
  }
}
```

2. Add the **same key** to `src/i18n/messages/en.json`:
```json
{
  "my_feature": {
    "my_key": "English value"
  }
}
```

3. Use in component:
```tsx
const { t } = useTranslation();
t('my_feature.my_key')
```

### Key Naming Convention

```
<feature>.<element>
```

- Feature names: `common`, `birth_form`, `la_so`, `ai_chat`, `van_han`, `ngay_mai`, `nav`, `profile`
- Element names: snake_case, descriptive
- Examples: `birth_form.gender_male`, `la_so.no_data_title`, `common.loading`

### Rules
- Keys must be identical in `en.json` and `vi.json`
- Never hardcode display strings in components — always use `t()`
- Placeholders use `{{variable}}` syntax: `t('greeting', { name: 'Minh' })` with `"greeting": "Xin chào {{name}}"`

### Switching Language

```tsx
// LanguageSwitcher component
const { i18n } = useTranslation();
i18n.changeLanguage('en'); // or 'vi'
```

---

## Responsive & Mobile-First Rules

### Touch Targets
- All interactive elements must be at least **44×44px** (Apple HIG / WCAG 2.5.5)
- Buttons use `py-4 px-6` minimum (48px height with default line-height)
- Nav bar buttons use `p-4` (48px touch area)
- The `+` button in `ProfileHeader` is `w-12 h-12` (48px)

### Layout
- Max width: `max-w-md mx-auto` — constrains to ~448px, centered on larger screens
- All screens use `p-6` horizontal padding (24px)
- Bottom padding: `pb-32` or `pb-40` to clear the fixed navigation bar (which is `bottom-8` + height)

### Capacitor Considerations
- The app is designed for portrait orientation only
- Safe area insets are handled by the `pt-6` top padding on `<main>`
- > 🚧 TODO: Add `@capacitor/status-bar` plugin and handle safe area insets properly for notched devices

---

## How to Add a New Screen

1. **Create the screen file:**
```tsx
// src/ui/screens/MyNewScreen.tsx
import React from 'react';
import { useTranslation } from 'react-i18next';

export const MyNewScreen: React.FC = () => {
  const { t } = useTranslation();
  return (
    <div className="p-6 pb-32 space-y-8 relative z-10">
      <h2 className="text-3xl font-display text-gradient-gold tracking-widest uppercase">
        {t('my_feature.title')}
      </h2>
    </div>
  );
};
```

2. **Add translation keys** to both `en.json` and `vi.json`

3. **Add NavItem type** to `src/domain/model/types.ts`:
```typescript
export type NavItem = "laso" | "van_han" | "ngay_mai" | "ai_chat" | "profile" | "my_new";
```

4. **Add to `NAV_ITEMS`** in `App.tsx`:
```typescript
{ id: "my_new", icon: MyIcon, labelKey: "nav.my_new" }
```

5. **Add to `renderScreen()`** in `App.tsx`:
```typescript
case "my_new": return <MyNewScreen />;
```

6. **Add nav translation key** to `en.json` and `vi.json` under `"nav"`

---

## How to Add a New Component

1. **Determine the level** (atom/molecule/organism) based on the rules above

2. **Create the file** in the appropriate folder:
```tsx
// src/ui/components/atoms/MyAtom.tsx
import React from 'react';

interface MyAtomProps {
  children: React.ReactNode;
  variant?: 'default' | 'gold';
}

export const MyAtom: React.FC<MyAtomProps> = ({ children, variant = 'default' }) => {
  return (
    <span className={`font-display text-xs ${variant === 'gold' ? 'text-celestial-gold' : 'text-white/60'}`}>
      {children}
    </span>
  );
};
```

3. **Export from index** (if atoms):
```typescript
// src/ui/components/atoms/index.ts
export { MyAtom } from './MyAtom';
```

4. **Rules checklist:**
   - [ ] No hardcoded display strings — use `t()` if text is shown to user
   - [ ] No direct store access in atoms
   - [ ] Props interface defined with TypeScript
   - [ ] `displayName` set if using `React.memo()`
   - [ ] Touch target ≥ 44px if interactive
   - [ ] Uses Tailwind classes only (no inline styles except for dynamic CSS variables)
