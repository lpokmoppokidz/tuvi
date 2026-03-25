# 05 — Build & Deployment Guide

> Cross-reference: See [00-project-init](../00-project-init/README.md) for local setup, [02-backend](../02-backend/README.md) for environment variables.

---

## Environment Overview

| Environment | Purpose | URL | Branch |
|---|---|---|---|
| **Development** | Local dev with hot reload | `http://localhost:3000` | any |
| **Staging** | Pre-production testing | `https://staging.tuviviet.app` | `develop` |
| **Production** | Live app | `https://tuviviet.app` | `main` |

> 🚧 TODO: Staging environment is not yet configured. Currently only development and production exist.

### Environment Variables Per Environment

| Variable | Development | Staging | Production |
|---|---|---|---|
| `GEMINI_API_KEY` | Local `.env` | CI secret | CI secret / hosting secret |
| `APP_URL` | `http://localhost:3000` | `https://staging.tuviviet.app` | `https://tuviviet.app` |
| `API_PORT` | `3001` | `3001` | Set by hosting platform |

---

## Web Build

### Build Command

```bash
npm run build
```

This runs `vite build` which:
1. Compiles TypeScript with strict mode
2. Bundles all modules with tree-shaking
3. Processes Tailwind CSS v4 (purges unused classes)
4. Outputs to `dist/` folder

### Build Output

```
dist/
├── index.html
├── assets/
│   ├── index-[hash].js      # Main bundle
│   ├── index-[hash].css     # Tailwind output
│   └── [other chunks]
```

### Preview Build Locally

```bash
npm run preview
```

Serves the `dist/` folder at `http://localhost:4173`.

### Clean Build

```bash
npm run clean && npm run build
```

The `clean` script removes the `dist/` folder before rebuilding.

---

## Hosting Setup

### Option A: Vercel (Recommended for web)

1. Connect your GitHub repository to Vercel
2. Configure build settings:
   - **Build Command:** `npm run build`
   - **Output Directory:** `dist`
   - **Install Command:** `npm ci`
3. Add environment variables in Vercel dashboard:
   - `GEMINI_API_KEY` → your API key
   - `APP_URL` → your Vercel deployment URL
4. Deploy triggers automatically on push to `main`

> **Important:** The Express `server.ts` is a separate Node.js process. For Vercel, you need to either:
> - Convert `server.ts` to Vercel Serverless Functions (move to `api/` folder)
> - Deploy the Express server separately (e.g., Railway, Render, or Cloud Run)

### Option B: Netlify

1. Connect GitHub repository
2. Build settings:
   - **Build command:** `npm run build`
   - **Publish directory:** `dist`
3. Add environment variables in Netlify dashboard
4. For the Express server: use Netlify Functions or deploy separately

### Option C: Google Cloud Run (Full-stack)

Since the project already uses Google AI Studio conventions (`APP_URL`, `GEMINI_API_KEY`), Cloud Run is a natural fit:

```dockerfile
# Dockerfile (to be created)
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build
EXPOSE 3000 3001
CMD ["node", "server.js"]
```

> 🚧 TODO: Create `Dockerfile` for containerized deployment.

---

## Android Build via Capacitor

### Prerequisites
- Android Studio installed (Hedgehog 2023.1.1+)
- Java JDK 17
- Android SDK API 33+
- USB debugging enabled on test device (or emulator configured)

### Step-by-Step: Debug APK

**Step 1 — Build web assets:**
```bash
npm run build
```

**Step 2 — Sync to Android project:**
```bash
npx cap sync
```
This copies `dist/` to `android/app/src/main/assets/public/` and updates Capacitor plugins.

**Step 3 — Open Android Studio:**
```bash
npx cap open android
```

**Step 4 — Wait for Gradle sync** (first time takes 2-5 minutes)

**Step 5 — Select device and run:**
- Connect Android device via USB, or start an emulator
- Click the green Run button (▶) in Android Studio
- Select your device from the dropdown

**Or use the combined script:**
```bash
npm run cap:build
# Equivalent to: npm run build && npx cap copy android && npx cap update android
```

### Step-by-Step: Release APK / AAB

**Step 1 — Build web assets:**
```bash
npm run build
npx cap sync
```

**Step 2 — Open Android Studio:**
```bash
npx cap open android
```

**Step 3 — Generate signed APK/AAB:**
- Menu: `Build` → `Generate Signed Bundle / APK`
- Choose `Android App Bundle` (AAB) for Play Store, or `APK` for direct distribution
- Select or create a keystore (see Keystore Setup below)
- Choose `release` build variant
- Click `Finish`

**Output location:**
- APK: `android/app/release/app-release.apk`
- AAB: `android/app/release/app-release.aab`

### Capacitor App Configuration

```typescript
// capacitor.config.ts
const config: CapacitorConfig = {
  appId: 'com.tuviviet.app',    // Must match Android package name
  appName: 'Tu Vi Viet',
  webDir: 'dist',               // Vite build output folder
};
```

---

## Signing Keystore Setup

### Create a New Keystore

```bash
keytool -genkey -v \
  -keystore tuviviet-release.keystore \
  -alias tuviviet \
  -keyalg RSA \
  -keysize 2048 \
  -validity 10000
```

You will be prompted for:
- Keystore password
- Key alias password
- Distinguished name (name, org, city, country)

### Store the Keystore Securely

**Never commit the keystore file to git.** Add to `.gitignore`:
```
*.keystore
*.jks
```

**Storage options:**
- Team password manager (1Password, Bitwarden)
- CI/CD secrets (GitHub Actions encrypted secrets)
- Google Play App Signing (recommended — Google manages the key)

### Configure Gradle for Signing

```groovy
// android/app/build.gradle
android {
    signingConfigs {
        release {
            storeFile file(System.getenv("KEYSTORE_PATH") ?: "tuviviet-release.keystore")
            storePassword System.getenv("KEYSTORE_PASSWORD")
            keyAlias System.getenv("KEY_ALIAS")
            keyPassword System.getenv("KEY_PASSWORD")
        }
    }
    buildTypes {
        release {
            signingConfig signingConfigs.release
            minifyEnabled false
        }
    }
}
```

---

## Google Play Store Submission Checklist

> 🚧 TODO: App not yet submitted to Play Store. Use this checklist when ready.

### Pre-submission
- [ ] App ID `com.tuviviet.app` is unique and registered in Play Console
- [ ] Target SDK is API 33+ (required by Google Play since Aug 2023)
- [ ] `android/app/build.gradle` has correct `versionCode` and `versionName`
- [ ] App icons are present in all mipmap densities (mdpi, hdpi, xhdpi, xxhdpi, xxxhdpi)
- [ ] Splash screen configured in `android/app/src/main/res/drawable/`
- [ ] `AndroidManifest.xml` has correct permissions (only what's needed)
- [ ] Release AAB is signed with the release keystore
- [ ] App tested on physical device (not just emulator)
- [ ] App tested on Android 8.0+ (API 26+)

### Play Console Setup
- [ ] Create app in Google Play Console
- [ ] Complete store listing (title, description, screenshots, feature graphic)
- [ ] Set content rating (complete questionnaire)
- [ ] Set pricing (free)
- [ ] Configure countries/regions
- [ ] Upload AAB to Internal Testing track first
- [ ] Test with internal testers
- [ ] Promote to Production when ready

### App Store Listing Content
- **App name:** Tu Vi Viet — Lá Số Tử Vi
- **Short description:** Xem lá số Tử Vi Đẩu Số chính xác với AI giải đoán
- **Category:** Lifestyle / Entertainment
- **Content rating:** Everyone

---

## iOS Build via Capacitor

> 🚧 TODO: iOS build not yet configured. Requires macOS + Xcode 15+.

### Prerequisites (when ready)
- macOS 13+ (Ventura or later)
- Xcode 15+
- Apple Developer account ($99/year)
- iOS device or simulator

### Basic Steps
```bash
# Install iOS platform
npx cap add ios

# Sync
npx cap sync ios

# Open Xcode
npx cap open ios
```

### App Store Submission Checklist
> 🚧 TODO: Complete when iOS build is implemented.

---

## CI/CD Pipeline Setup

> 🚧 TODO: CI/CD not yet configured. Recommended GitHub Actions setup:

### Web Deployment Pipeline

```yaml
# .github/workflows/deploy-web.yml
name: Deploy Web

on:
  push:
    branches: [main]

jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Type check
        run: npm run lint

      - name: Build
        run: npm run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}
          APP_URL: ${{ secrets.APP_URL }}

      - name: Deploy to Vercel
        uses: amondnet/vercel-action@v25
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.VERCEL_ORG_ID }}
          vercel-project-id: ${{ secrets.VERCEL_PROJECT_ID }}
          vercel-args: '--prod'
```

### Android Build Pipeline

```yaml
# .github/workflows/build-android.yml
name: Build Android

on:
  push:
    branches: [main]
  workflow_dispatch:  # Manual trigger

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - uses: actions/setup-java@v4
        with:
          java-version: '17'
          distribution: 'temurin'

      - name: Install dependencies
        run: npm ci

      - name: Build web assets
        run: npm run build
        env:
          GEMINI_API_KEY: ${{ secrets.GEMINI_API_KEY }}

      - name: Sync Capacitor
        run: npx cap sync android

      - name: Decode keystore
        run: |
          echo "${{ secrets.KEYSTORE_BASE64 }}" | base64 -d > android/app/tuviviet-release.keystore

      - name: Build release AAB
        run: ./gradlew bundleRelease
        working-directory: android
        env:
          KEYSTORE_PATH: tuviviet-release.keystore
          KEYSTORE_PASSWORD: ${{ secrets.KEYSTORE_PASSWORD }}
          KEY_ALIAS: ${{ secrets.KEY_ALIAS }}
          KEY_PASSWORD: ${{ secrets.KEY_PASSWORD }}

      - name: Upload AAB artifact
        uses: actions/upload-artifact@v4
        with:
          name: app-release.aab
          path: android/app/build/outputs/bundle/release/app-release.aab
```

### Trigger Conditions
| Trigger | Action |
|---|---|
| Push to `main` | Deploy web + build Android AAB |
| Push to `develop` | Deploy to staging only |
| PR opened | Run lint + type check only |
| Manual dispatch | Build Android AAB on demand |

---

## Environment Variable Management

### Local Development
- Store in `.env` (gitignored)
- Copy from `.env.example` as template

### CI/CD (GitHub Actions)
Store as GitHub repository secrets:
- `GEMINI_API_KEY`
- `APP_URL`
- `VERCEL_TOKEN`, `VERCEL_ORG_ID`, `VERCEL_PROJECT_ID` (for Vercel deployment)
- `KEYSTORE_BASE64` (base64-encoded keystore file)
- `KEYSTORE_PASSWORD`, `KEY_ALIAS`, `KEY_PASSWORD`

**Encode keystore for CI:**
```bash
base64 -i tuviviet-release.keystore | pbcopy  # macOS
base64 tuviviet-release.keystore              # Linux
```

### Production Hosting
- Vercel: Set in Project Settings → Environment Variables
- Cloud Run: Set in Cloud Run service configuration or Secret Manager
- Never log environment variables in application code

---

## Rollback Strategy

### Web Rollback
**Vercel:** Each deployment creates an immutable snapshot. To rollback:
1. Go to Vercel dashboard → Deployments
2. Find the last known-good deployment
3. Click "..." → "Promote to Production"

**Manual rollback:**
```bash
git revert HEAD
git push origin main
```

### Android Rollback
- Google Play Console allows rolling back to a previous release within the same track
- For emergency rollback: use "Halt rollout" in Play Console if using staged rollout
- Keep the previous signed AAB artifact in CI for re-upload if needed

---

## Post-Deployment Verification Checklist

After each production deployment, verify:

### Web
- [ ] App loads at production URL
- [ ] Birth form opens and submits successfully
- [ ] Chart renders with correct palace layout
- [ ] AI chat sends and receives messages
- [ ] Language switcher toggles vi/en correctly
- [ ] Dark mode toggle works
- [ ] Data persists after page refresh (localStorage)
- [ ] No console errors in browser DevTools

### Android
- [ ] APK/AAB installs successfully on test device
- [ ] App launches without crash
- [ ] All screens navigate correctly
- [ ] Birth form calculation works
- [ ] AI chat works (requires internet)
- [ ] App works offline (chart display, no AI)
- [ ] Back button behavior is correct

---

## Common Deployment Errors and Fixes

### Error: `vite build` fails — `Cannot find module`
```bash
npm ci  # Clean install instead of npm install
npm run build
```

### Error: Tailwind CSS classes not applied in production
- Ensure `@tailwindcss/vite` plugin is in `vite.config.ts`
- Tailwind v4 scans files automatically — no `content` config needed
- Check that component files are in `src/` (not excluded)

### Error: `GEMINI_API_KEY` undefined in production build
- Verify the environment variable is set in your hosting platform
- For Vite: ensure the variable is accessible at build time (not just runtime)
- Check `vite.config.ts` for any `define` configuration needed

### Error: Android Gradle build fails — `Execution failed for task ':app:processReleaseResources'`
- Usually a resource naming conflict
- Run `./gradlew clean` in `android/` then rebuild

### Error: `cap sync` fails — `Plugin not installed`
```bash
npm install @capacitor/core @capacitor/android
npx cap sync
```

### Error: White screen on Android after deployment
- Check that `webDir: 'dist'` in `capacitor.config.ts` matches the actual build output folder
- Run `npm run build` before `npx cap sync`
- Check Android Studio Logcat for JavaScript errors

### Error: Keystore not found in CI
- Verify `KEYSTORE_BASE64` secret is set correctly
- Test the base64 decode locally:
  ```bash
  echo "$KEYSTORE_BASE64" | base64 -d > test.keystore
  keytool -list -keystore test.keystore
  ```
