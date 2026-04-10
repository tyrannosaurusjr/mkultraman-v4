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
      filter: (page) =>
        !page.includes('/guild') &&
        !page.includes('/privacy') &&
        !page.includes('/terms'),
      serialize: (item) => {
        // Blog posts: use real pubDate as lastmod
        const blogMatch = item.url.match(/\/blog\/([^/]+)\/$/);
        if (blogMatch && blogDates.has(blogMatch[1])) {
          item.lastmod = blogDates.get(blogMatch[1]);
          return item;
        }
        // Commercial pages: pin to known build date
        const commercialLastmod = {
          'https://mkultraman.com/': '2026-04-10',
          'https://mkultraman.com/services/': '2026-04-10',
          'https://mkultraman.com/services/stack-audit/': '2026-04-10',
          'https://mkultraman.com/services/infrastructure-build/': '2026-04-10',
          'https://mkultraman.com/services/ongoing-management/': '2026-04-10',
          'https://mkultraman.com/contact/': '2026-04-10',
        };
        if (commercialLastmod[item.url]) {
          item.lastmod = new Date(commercialLastmod[item.url]);
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
