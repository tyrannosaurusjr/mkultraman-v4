import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const DIST = join(process.cwd(), 'dist');

const walk = (dir: string, predicate: (path: string) => boolean): string[] => {
  const entries = readdirSync(dir, { withFileTypes: true });

  return entries.flatMap((entry) => {
    const fullPath = join(dir, entry.name);

    if (entry.isDirectory()) {
      return walk(fullPath, predicate);
    }

    return predicate(fullPath) ? [fullPath] : [];
  });
};

describe('Build output', () => {
  it('dist directory exists', () => {
    expect(existsSync(DIST)).toBe(true);
  });

  const expectedPages = [
    'index.html',
    'about/index.html',
    'services/index.html',
    'contact/index.html',
    'blog/index.html',
    'guild/index.html',
    'privacy/index.html',
    'terms/index.html',
    'tools/index.html',
  ];

  for (const page of expectedPages) {
    it(`generates ${page}`, () => {
      expect(existsSync(join(DIST, page))).toBe(true);
    });
  }

  it('generates sitemap', () => {
    expect(existsSync(join(DIST, 'sitemap-index.xml'))).toBe(true);
  });

  describe('HTML quality', () => {
    const html = readFileSync(join(DIST, 'index.html'), 'utf-8');

    it('has doctype', () => {
      expect(html.toLowerCase()).toContain('<!doctype html>');
    });

    it('has lang attribute', () => {
      expect(html).toMatch(/<html[^>]+lang="/);
    });

    it('has meta description', () => {
      expect(html).toMatch(/<meta[^>]+name="description"/);
    });

    it('has canonical URL', () => {
      expect(html).toMatch(/<link[^>]+rel="canonical"/);
    });

    it('has OG tags', () => {
      expect(html).toMatch(/<meta[^>]+property="og:title"/);
      expect(html).toMatch(/<meta[^>]+property="og:description"/);
    });
  });

  it('does not ship broken internal anchor links', () => {
    const routes = new Set(
      walk(DIST, (fullPath) => fullPath.endsWith('.html') && !fullPath.endsWith('404.html')).map((fullPath) => {
        const relative = fullPath.replace(`${DIST}/`, '').replace(/\\/g, '/');

        if (relative === 'index.html') {
          return '/';
        }

        if (relative.endsWith('/index.html')) {
          const route = `/${relative.replace(/\/index\.html$/, '')}`;
          return route || '/';
        }

        return `/${relative.replace(/\.html$/, '')}`;
      })
    );

    const redirects = JSON.parse(readFileSync(join(process.cwd(), 'vercel.json'), 'utf-8')).redirects ?? [];
    const redirectSources = new Set(
      redirects.map((redirect: { source: string }) => redirect.source.replace(/\/$/, '') || '/')
    );

    const assetPrefixes = ['/images/', '/fonts/', '/_astro/', '/styles/'];
    const assetExact = new Set([
      '/favicon.ico',
      '/favicon-16.png',
      '/favicon-32.png',
      '/apple-touch-icon.png',
      '/robots.txt',
      '/sitemap-index.xml',
      '/sitemap-0.xml',
      '/llms.txt',
      '/og-default.png',
    ]);

    const brokenLinks = walk(DIST, (fullPath) => fullPath.endsWith('.html')).flatMap((fullPath) => {
      const relativeFile = fullPath.replace(`${DIST}/`, '').replace(/\\/g, '/');
      const html = readFileSync(fullPath, 'utf-8');

      return [...html.matchAll(/<a\b[^>]*href="([^"]+)"/g)]
        .map((match) => match[1])
        .filter((href) => href && !href.startsWith('#') && !href.startsWith('mailto:') && !href.startsWith('tel:'))
        .flatMap((href) => {
          const url = new URL(href, 'https://mkultraman.com');

          if (url.origin !== 'https://mkultraman.com') {
            return [];
          }

          const pathname = url.pathname.replace(/\/$/, '') || '/';
          const isValid =
            routes.has(pathname) ||
            redirectSources.has(pathname) ||
            assetExact.has(pathname) ||
            assetPrefixes.some((prefix) => pathname.startsWith(prefix));

          return isValid ? [] : [`${relativeFile} -> ${pathname}`];
        });
    });

    expect(brokenLinks).toEqual([]);
  });
});

// Regression: ISSUE-001 — the USD->JPY fetch in Base.astro hit api.frankfurter.app,
// which now 301-redirects to api.frankfurter.dev. Browsers don't carry CORS
// headers across the cross-origin redirect, so every fetch silently failed and
// the hardcoded fallback rate of 159 was shown on all service pricing pages.
// Found by /qa on 2026-04-22. Report: .gstack/qa-reports/qa-report-mkultraman-com-2026-04-22.md
describe('USD/JPY price conversion (ISSUE-001 regression)', () => {
  it('ships the post-redirect frankfurter URL, not the legacy one', () => {
    const html = readFileSync(join(DIST, 'services/index.html'), 'utf-8');
    expect(html).toContain('api.frankfurter.dev/v1/latest');
    expect(html).not.toContain('api.frankfurter.app/latest');
  });

  it('every page with [data-usd] also ships the conversion script', () => {
    const broken = walk(DIST, (p) => p.endsWith('.html')).flatMap((fullPath) => {
      const html = readFileSync(fullPath, 'utf-8');
      if (!html.includes('data-usd=')) return [];
      if (html.includes('api.frankfurter.dev')) return [];
      return [fullPath.replace(`${DIST}/`, '')];
    });
    expect(broken).toEqual([]);
  });
});
