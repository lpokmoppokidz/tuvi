import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'com.tuviviet.app',
  appName: 'Tu Vi Viet',
  webDir: 'dist',
  server: {
    androidScheme: 'https'
  },
  android: {
    buildOptions: {
      releaseType: 'AAB',
    },
    // Section 4: Capacitor hardware acceleration
    allowMixedContent: true,
    captureInput: true,
    backgroundColor: "#050510",
  }
};

export default config;
