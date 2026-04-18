# 07. Tối Ưu Code & Bundle

## 7. Tối Ưu Hóa Tài Nguyên - Code & Bundle

### 7.1 Bundle Size Analysis

```typescript
// metro.config.js - Optimized for production

const { getDefaultConfig } = require("expo/metro-config");

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);

  // Enable tree shaking
  config.transformer.minifierPath = "metro-react-native-babel-preset";

  // Custom resolver
  config.resolver = {
    ...config.resolver,

    // Blocklist for unused modules
    blockList: [
      // Exclude dev-only modules in production
      /react-native-safe-area-view/,
    ],

    // Source extensions
    sourceExts: [...config.resolver.sourceExts, "svg", "cjs"],

    // Asset extensions
    assetExts: config.resolver.assetExts.filter(
      (ext) =>
        !["png", "jpg", "jpeg", "webp", "gif", "bmp", "tiff", "svg"].includes(
          ext,
        ),
    ),
  };

  // Optimize babel
  config.transformer.babelTransformerPath =
    require.resolve("react-native-svg-transformer");

  return config;
})();
```

### 7.2 Code Splitting Strategy

```typescript
// src/app/(main)/(tabs)/_layout.tsx

import React, { Suspense, lazy } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { colors } from '@/theme';

// Lazy load tab screens
const HomeScreen = lazy(() => import('@/modules/home/screens/HomeScreen'));
const HoroscopeScreen = lazy(() => import('@/modules/horoscope/screens/HoroscopeScreen'));
const VanHanScreen = lazy(() => import('@/modules/vanhan/screens/VanHanScreen'));
const ProfileScreen = lazy(() => import('@/modules/profile/screens/ProfileScreen'));

// Lazy load heavy components
const HoroscopeChart = lazy(() => import('@/shared/components/HoroscopeChart'));
const VanHanTimeline = lazy(() => import('@/shared/components/VanHanTimeline'));

function LoadingFallback() {
  return (
    <View style={styles.loading}>
      <ActivityIndicator size="large" color={colors.primary} />
    </View>
  );
}

function TabLayout() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="index" component={LazyHome} />
      <Tab.Screen name="horoscope" component={LazyHoroscope} />
      <Tab.Screen name="vanhan" component={LazyVanHan} />
      <Tab.Screen name="profile" component={LazyProfile} />
    </Tab.Navigator>
  );
}

// Wrapped components with suspense
function LazyHome() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <HomeScreen />
    </Suspense>
  );
}

// ... similar for other tabs
```

### 7.3 Module Federation / Shared Dependencies

```typescript
// babel.config.js

module.exports = function (api) {
  api.cache(true);

  return {
    presets: ["babel-preset-expo"],

    plugins: [
      // Enable decorators for mobx/react-native etc.
      ["@babel/plugin-proposal-decorators", { legacy: true }],

      // Optimize imports
      [
        "import",
        {
          libraryName: "@ant-design/icons-react-native",
          customName: (name) => {
            const mapping = {
              HomeOutlined: "@ant-design/icons-react-native",
            };
            return mapping[name] || `@ant-design/icons-react-native`;
          },
        },
      ],

      // Remove console logs in production
      ...(process.env.NODE_ENV === "production"
        ? [["transform-remove-console", { exclude: ["error", "warn"] }]]
        : []),

      // Reanimated plugin
      "react-native-reanimated/plugin",
    ],
  };
};
```

### 7.4 Dynamic Import

```typescript
// src/shared/utils/dynamic-import.ts

/**
 * Dynamic import for heavy modules
 * Use when module is not needed immediately
 */
export async function dynamicImport<T>(modulePath: string): Promise<T | null> {
  try {
    return await import(modulePath);
  } catch (error) {
    console.error(`Failed to dynamically import: ${modulePath}`, error);
    return null;
  }
}

/**
 * Lazy load chart library only when needed
 */
export const loadChartLibrary = () =>
  dynamicImport<typeof import("react-native-gifted-charts")>(
    "react-native-gifted-charts",
  );

/**
 * Lazy load PDF library for export feature
 */
export const loadPDFLibrary = () =>
  dynamicImport<typeof import("react-native-pdf-lib")>("react-native-pdf-lib");

/**
 * Preload critical modules
 */
export function preloadModule(modulePath: string): void {
  // Preload without executing
  const preloadLink = document.createElement("link");
  preloadLink.rel = "modulepreload";
  preloadLink.href = modulePath;
  document.head.appendChild(preloadLink);
}
```

### 7.5 Asset Optimization

```typescript
// src/theme/images.ts

import { Image as ExpoImage } from "expo-image";

// Pre-load critical images
const CRITICAL_IMAGES = [
  require("@/assets/images/logo.png"),
  require("@/assets/images/loading.gif"),
  require("@/assets/images/empty-state.png"),
];

// Preload images on app start
export async function preloadCriticalAssets(): Promise<void> {
  await Promise.all(
    CRITICAL_IMAGES.map((image) =>
      ExpoImage.prefetch(Image.resolveAssetSource(image).uri),
    ),
  );
}

// Lazy load non-critical images
export function useLazyImage(uri: string | undefined) {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    if (uri) {
      Image.prefetch(uri).then(() => setIsLoaded(true));
    }
  }, [uri]);

  return isLoaded;
}
```
