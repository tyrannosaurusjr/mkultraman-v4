// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';

export default defineConfig({
  site: 'https://mkultraman.com',
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/guild'),
    }),
  ],
});
