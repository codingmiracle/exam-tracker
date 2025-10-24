import type { CapacitorConfig } from '@capacitor/cli';

const config: CapacitorConfig = {
  appId: 'at.codingmiracle.examtracker',
  appName: 'exam-tracker',
  webDir: 'dist',
  server: {
    androidScheme: 'https',
    // Für Live Reload (siehe später)
    // url: 'http://192.168.1.100:3000',
    // cleartext: true
  },
  plugins: {
    SplashScreen: {
      launchShowDuration: 2000,
      backgroundColor: '#ff69b4',
      androidScaleType: 'CENTER_CROP',
      showSpinner: false,
    }
  }
};

export default config;
