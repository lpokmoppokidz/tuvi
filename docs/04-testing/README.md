# 04 — Testing Strategy & Guide

> Cross-reference: See [01-system-design](../01-system-design/README.md) for data flow, [02-backend](../02-backend/README.md) for service layer details.

---

## Testing Philosophy

> 🚧 TODO: No tests are currently implemented in this project. This document defines the testing strategy to be adopted.

The testing philosophy for this project follows the **Testing Trophy** model (Kent C. Dodds):

```
        /\
       /E2E\          ← Few, high-value end-to-end tests
      /------\
     /Integr. \       ← Most value: form → store → screen flows
    /----------\
   /  Unit Tests \    ← TuViCalculator algorithm correctness
  /--------------\
 /  Static (TS)   \   ← Already enforced by TypeScript strict mode
/------------------\
```

**Coverage goals (target):**
- `TuViCalculator.ts` — 90%+ (critical path, pure functions)
- `CacheService.ts` — 80%+ (localStorage interactions)
- `TuViService.ts` — 70%+ (orchestration logic)
- Atom components — 60%+ (rendering and variants)
- Screen integration flows — key happy paths covered

---

## Test Types

### 1. Unit Tests — `TuViCalculator` Logic

The calculator is the most critical code in the project. It contains pure functions that can be tested in isolation.

**Key functions to test:**
- `parseDateFlexible()` — date parsing with both formats
- `getCanChiNam()` — Can Chi year calculation
- `getGioChiIdx()` — hour-to-branch mapping
- `chiIdxToCungIdx()` — branch index to palace index conversion
- `calculateTuVi()` — full integration of all steps

**Example test cases:**
```typescript
// tests/unit/TuViCalculator.test.ts

describe('parseDateFlexible', () => {
  it('parses DD/MM/YYYY format', () => {
    expect(parseDateFlexible('15/08/1990')).toEqual([15, 8, 1990]);
  });
  it('parses YYYY-MM-DD format', () => {
    expect(parseDateFlexible('1990-08-15')).toEqual([15, 8, 1990]);
  });
  it('throws on invalid date', () => {
    expect(() => parseDateFlexible('invalid')).toThrow();
  });
});

describe('getGioChiIdx', () => {
  it('maps 23:00 to Tý (index 0)', () => {
    expect(getGioChiIdx(23, 0)).toBe(0);
  });
  it('maps 00:30 to Tý (index 0)', () => {
    expect(getGioChiIdx(0, 30)).toBe(0);
  });
  it('maps 11:00 to Ngọ (index 6)', () => {
    expect(getGioChiIdx(11, 0)).toBe(6);
  });
});

describe('calculateTuVi — known chart', () => {
  // Use a verified chart from a trusted Tử Vi source
  it('places Tử Vi correctly for a known birth date', async () => {
    const result = await calculateTuVi({
      ho_ten: 'Test User',
      ngay_sinh: '15/08/1990',
      loai_lich: 'duong',
      gio_sinh: '10:00',
      gioi_tinh: 'Nam',
      ngay_du_doan: '01/01/2025',
    });
    expect(result['12_cung'].menh.chinh_tinh).toContain('Tử Vi');
    expect(result.thong_tin_co_ban.ngu_hanh_menh_cuc).toBe('Kim');
  });
});
```

### 2. Unit Tests — Service Methods

```typescript
// tests/unit/CacheService.test.ts

describe('CacheService', () => {
  beforeEach(() => localStorage.clear());

  it('saves and loads laso', () => {
    const data = { test: true };
    CacheService.saveLaSo(data);
    expect(CacheService.loadLaSo()).toEqual(data);
  });

  it('returns null for stale du_doan', () => {
    CacheService.saveDuDoan({ forecast: 'test' });
    // Manually set a past date
    localStorage.setItem('tuvi_predict_date', '01/01/2020');
    expect(CacheService.loadDuDoan()).toBeNull();
  });

  it('clearAll removes all keys', () => {
    CacheService.saveLaSo({ test: true });
    CacheService.clearAll();
    expect(CacheService.hasLaSo()).toBe(false);
  });
});
```

### 3. Component Tests — Atoms and Molecules

```typescript
// tests/components/Button.test.tsx

import { render, screen, fireEvent } from '@testing-library/react';
import { Button } from '../../src/ui/components/atoms/Button';

describe('Button', () => {
  it('renders children', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });

  it('shows spinner when loading', () => {
    render(<Button loading>Submit</Button>);
    expect(screen.getByRole('button')).toBeDisabled();
  });

  it('applies gold variant classes by default', () => {
    render(<Button>Gold</Button>);
    expect(screen.getByRole('button')).toHaveClass('text-celestial-gold');
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button onClick={onClick}>Click</Button>);
    fireEvent.click(screen.getByRole('button'));
    expect(onClick).toHaveBeenCalledOnce();
  });
});
```

```typescript
// tests/components/Input.test.tsx

describe('Input', () => {
  it('renders label when provided', () => {
    render(<Input label="Họ và Tên" />);
    expect(screen.getByText('Họ và Tên')).toBeInTheDocument();
  });

  it('renders error message', () => {
    render(<Input error="Vui lòng nhập họ tên" />);
    expect(screen.getByText('Vui lòng nhập họ tên')).toBeInTheDocument();
  });

  it('renders icon when provided', () => {
    render(<Input icon={<span data-testid="icon" />} />);
    expect(screen.getByTestId('icon')).toBeInTheDocument();
  });
});
```

### 4. Integration Tests — Full Data Flow

```typescript
// tests/integration/birth-form-to-store.test.tsx

import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { LaSoScreen } from '../../src/ui/screens/LaSoScreen';
import { useTuViStore } from '../../src/store/useTuViStore';

// Mock TuViService
vi.mock('../../src/domain/services/TuViService', () => ({
  TuViService: {
    calculateAndSave: vi.fn().mockResolvedValue(mockTuViData),
  },
}));

describe('BirthDataForm → Store → LaSoScreen flow', () => {
  it('submitting form updates store and renders CungGrid', async () => {
    const queryClient = new QueryClient();
    const onTuViDataChange = vi.fn();

    render(
      <QueryClientProvider client={queryClient}>
        <LaSoScreen tuViData={null} onTuViDataChange={onTuViDataChange} />
      </QueryClientProvider>
    );

    // Open form
    fireEvent.click(screen.getByText(/bắt đầu khởi tạo/i));

    // Fill form
    fireEvent.change(screen.getByPlaceholderText(/nhập danh tính/i), {
      target: { value: 'Nguyễn Văn A' },
    });
    fireEvent.change(screen.getByDisplayValue(''), { target: { value: '1990-08-15' } });

    // Submit
    fireEvent.click(screen.getByText(/lập lá số/i));

    await waitFor(() => {
      expect(onTuViDataChange).toHaveBeenCalledWith(mockTuViData);
    });
  });
});
```

### 5. E2E Tests (Capacitor Device Testing)

> 🚧 TODO: E2E testing on device is not yet set up. Recommended approach:

**Tool:** [Detox](https://wix.github.io/Detox/) for React Native-style E2E, or [Playwright](https://playwright.dev/) for web-based E2E.

**Key E2E scenarios:**
1. First launch → empty state → open form → fill → submit → chart renders
2. App restart → chart persists from localStorage
3. AI chat → send message → receive response
4. Language switch → all text updates to English
5. Clear data → chart disappears → empty state shown

---

## Testing Tools and Setup

> 🚧 TODO: Install and configure the following:

### Recommended Stack

```bash
npm install -D vitest @vitest/ui jsdom @testing-library/react @testing-library/jest-dom @testing-library/user-event
```

### `vite.config.ts` — Add test config

```typescript
// vite.config.ts
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';

export default defineConfig({
  plugins: [react(), tailwindcss()],
  test: {
    environment: 'jsdom',
    globals: true,
    setupFiles: ['./tests/setup.ts'],
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: ['src/main.tsx', 'src/**/*.d.ts'],
    },
  },
});
```

### `tests/setup.ts`

```typescript
// tests/setup.ts
import '@testing-library/jest-dom';
import { vi } from 'vitest';

// Mock localStorage
const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: (key: string) => store[key] ?? null,
    setItem: (key: string, value: string) => { store[key] = value; },
    removeItem: (key: string) => { delete store[key]; },
    clear: () => { store = {}; },
  };
})();
Object.defineProperty(window, 'localStorage', { value: localStorageMock });

// Mock react-i18next
vi.mock('react-i18next', () => ({
  useTranslation: () => ({
    t: (key: string) => key,
    i18n: { changeLanguage: vi.fn(), language: 'vi' },
  }),
  initReactI18next: { type: '3rdParty', init: vi.fn() },
}));
```

---

## How to Run Tests

> 🚧 TODO: Add these scripts to `package.json` after installing Vitest.

```bash
# Run all tests (single pass)
npm run test

# Run tests in watch mode (development)
npm run test:watch

# Run a single test file
npx vitest run tests/unit/TuViCalculator.test.ts

# Run with coverage report
npm run test:coverage

# Open Vitest UI (visual test runner)
npx vitest --ui
```

### Recommended `package.json` scripts

```json
{
  "scripts": {
    "test": "vitest run",
    "test:watch": "vitest",
    "test:ui": "vitest --ui",
    "test:coverage": "vitest run --coverage"
  }
}
```

---

## Test File Naming Convention and Folder Placement

```
tests/
├── setup.ts                          # Global test setup
├── unit/
│   ├── TuViCalculator.test.ts        # Pure function tests
│   ├── CacheService.test.ts          # localStorage service tests
│   └── TuViService.test.ts           # Orchestration tests
├── components/
│   ├── atoms/
│   │   ├── Button.test.tsx
│   │   ├── Input.test.tsx
│   │   ├── Label.test.tsx
│   │   └── Badge.test.tsx
│   ├── BirthDataForm.test.tsx
│   └── CungGrid.test.tsx
├── integration/
│   ├── birth-form-flow.test.tsx      # Form → Store → Screen
│   └── cache-refresh.test.ts         # Daily forecast refresh
└── mocks/
    ├── tuvi-data.mock.ts             # Mock TuViData fixture
    └── gemini-api.mock.ts            # Mock Gemini responses
```

**Naming rules:**
- Unit tests: `<FileName>.test.ts`
- Component tests: `<ComponentName>.test.tsx`
- Integration tests: `<feature-name>.test.tsx`
- Mock files: `<name>.mock.ts`

---

## Writing Guide: TuViCalculator Tests (Critical Path)

The calculator is the most important code to test. Use **known verified charts** as test fixtures.

### Step 1 — Create a verified fixture

Find a birth date with a known, verified Tử Vi chart from a trusted source (e.g., a professional astrologer's output or a well-known reference chart).

```typescript
// tests/mocks/tuvi-data.mock.ts
export const KNOWN_CHART_INPUT = {
  ho_ten: 'Test Person',
  ngay_sinh: '15/08/1990',  // Solar: 15 Aug 1990
  loai_lich: 'duong',
  gio_sinh: '10:30',         // Tỵ hour
  gioi_tinh: 'Nam',
  ngay_du_doan: '01/01/2025',
};

export const KNOWN_CHART_EXPECTED = {
  ngu_hanh_menh_cuc: 'Kim',  // Canh Ngọ year → Kim 4 cục
  cung_menh_dia_chi: 'Thìn', // Expected Mệnh palace
  tu_vi_position: 'Thìn',    // Expected Tử Vi star position
};
```

### Step 2 — Test each calculation step independently

```typescript
describe('Mệnh Cục calculation', () => {
  it('Canh Ngọ year → Kim 4 cục', async () => {
    const result = await calculateTuVi(KNOWN_CHART_INPUT);
    expect(result.thong_tin_co_ban.ngu_hanh_menh_cuc).toBe('Kim');
    expect(result.thong_tin_co_ban.so_cuc).toBe(4);
  });
});

describe('Cung Mệnh placement', () => {
  it('places Mệnh at correct palace', async () => {
    const result = await calculateTuVi(KNOWN_CHART_INPUT);
    expect(result.cung_menh_than.cung_menh.dia_chi).toBe(KNOWN_CHART_EXPECTED.cung_menh_dia_chi);
  });
});

describe('Tứ Hóa placement', () => {
  it('Canh year: Hóa Lộc on Thái Dương', async () => {
    const result = await calculateTuVi(KNOWN_CHART_INPUT);
    const allCungs = Object.values(result['12_cung']);
    const locCung = allCungs.find(c => c.tu_hoa.includes('Hóa Lộc'));
    expect(locCung?.chinh_tinh).toContain('Thái Dương');
  });
});
```

---

## Writing Guide: Component Tests

### Pattern for atoms

```typescript
// Always test:
// 1. Renders without crashing
// 2. Renders children/content
// 3. Each variant applies correct classes
// 4. Interactive behavior (onClick, onChange)
// 5. Disabled/loading states
// 6. Error states (for Input)
```

### Pattern for screens

```typescript
// Always test:
// 1. Empty state renders correctly (no tuViData)
// 2. Loaded state renders correctly (with tuViData)
// 3. User interactions trigger correct callbacks
// 4. i18n keys are used (not hardcoded strings)
```

---

## Mocking Strategy

### Mock Zustand Stores

```typescript
// In test files
vi.mock('../../src/store/useTuViStore', () => ({
  useTuViStore: vi.fn(() => ({
    tuViData: null,
    setTuViData: vi.fn(),
    clearTuViData: vi.fn(),
  })),
}));
```

### Mock Gemini API

```typescript
// tests/mocks/gemini-api.mock.ts
vi.mock('../../src/data/remote/gemini-api', () => ({
  generateGeminiResponse: vi.fn().mockResolvedValue(
    'Đây là câu trả lời từ AI Tử Vi.'
  ),
}));
```

### Mock react-i18next

Already handled in `tests/setup.ts` — `t(key)` returns the key itself, making assertions straightforward:
```typescript
expect(screen.getByText('la_so.title')).toBeInTheDocument();
```

### Mock lunar-javascript

```typescript
vi.mock('lunar-javascript', () => ({
  Solar: {
    fromYmd: vi.fn().mockReturnValue({
      getLunar: vi.fn().mockReturnValue({
        getYear: () => 1990,
        getMonth: () => 7,
        getDay: () => 23,
        getDayInGanZhi: () => '甲子',
      }),
    }),
  },
  Lunar: { fromYmd: vi.fn() },
}));
```

---

## CI Test Pipeline

> 🚧 TODO: Set up GitHub Actions CI. Recommended configuration:

```yaml
# .github/workflows/test.yml
name: Tests

on:
  push:
    branches: [main, develop]
  pull_request:
    branches: [main]

jobs:
  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run test
      - run: npm run test:coverage
      - uses: actions/upload-artifact@v4
        with:
          name: coverage-report
          path: coverage/
```

---

## Known Issues and Exclusions

### Currently No Tests
The entire test suite is yet to be written. Priority order for implementation:
1. `TuViCalculator.ts` — highest business risk
2. `CacheService.ts` — data persistence correctness
3. `Button`, `Input`, `Label`, `Badge` atoms — UI regression prevention
4. `BirthDataForm` — form validation correctness
5. Integration: form → store → screen flow

### Potential Flaky Tests
- **`TuViCalculator` date-dependent tests:** The `loadOrRefresh()` method in `TuViService` uses `new Date()` internally. Tests that depend on "today's date" must mock `Date` to avoid flakiness.
  ```typescript
  vi.setSystemTime(new Date('2025-01-15'));
  // ... test ...
  vi.useRealTimers();
  ```

- **Animation tests:** Components using `motion` (Framer Motion) may behave differently in jsdom. Mock or disable animations in tests:
  ```typescript
  vi.mock('motion/react', () => ({
    motion: { div: 'div', button: 'button' },
    AnimatePresence: ({ children }: any) => children,
  }));
  ```
