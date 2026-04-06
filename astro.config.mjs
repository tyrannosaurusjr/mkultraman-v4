// @ts-check
import { defineConfig } from 'astro/config';
import sitemap from '@astrojs/sitemap';
import { readFileSync, readdirSync } from 'fs';

// Build a map of blog slug → pubDate from frontmatter
function getBlogDates() {
  const dates = new Map();
  const dir = './src/content/blog';
  for (const file of readdirSync(dir)) {
    if (!file.endsWith('.md')) continue;
    const content = readFileSync(`${dir}/${file}`, 'utf-8');
    const match = content.match(/^pubDate:\s*(.+)$/m);
    if (match) {
      const slug = file.replace('.md', '');
      dates.set(slug, new Date(match[1].trim()));
    }
  }
  return dates;
}

const blogDates = getBlogDates();

export default defineConfig({
  site: 'https://mkultraman.com',
  compressHTML: true,
  prefetch: true,
  integrations: [
    sitemap({
      filter: (page) => !page.includes('/guild'),
      serialize: (item) => {
        const match = item.url.match(/\/blog\/([^/]+)\/$/);
        if (match && blogDates.has(match[1])) {
          item.lastmod = blogDates.get(match[1]);
        }
        return item;
      },
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
