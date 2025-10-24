import { defineConfig } from '@rsbuild/core';
import { pluginVue } from '@rsbuild/plugin-vue';

export default defineConfig({
  plugins: [pluginVue()],

  html: {
    title: 'Exam Tracker',
    meta: {
      viewport: 'width=device-width, initial-scale=1.0',
      description: 'Start tracking your exams and improve your grades today!',
    },
  },
  output: {
    // Assets relative for capacitor
    assetPrefix: './',
    distPath: {
      root: 'dist',
    },
  },
  server: {
    port: 3000,
  },
});
