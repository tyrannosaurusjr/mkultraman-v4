// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mkultraman.com',
  compressHTML: true,
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/guild'),
    }),
  ],
  image: {
    service: {
      entrypoint: 'astro/assets/services/sharp',
    },
  },
  vite: {
    build: {
      cssMinify: true,
    },
  },
});
