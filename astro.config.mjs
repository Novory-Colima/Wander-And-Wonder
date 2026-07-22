// @ts-check
import { defineConfig } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';

// https://astro.build/config
export default defineConfig({
  site: "https://novory-colima.github.io",
  base: "/Wander-And-Wonder",
  compressHTML: true,
  build: {
    inlineStylesheets: 'auto',
  },
  image: {
    domains: [],
    remotePatterns: [],
  },
  vite: {
    plugins: [tailwindcss()],
    build: {
      cssMinify: true,
    },
  },
});