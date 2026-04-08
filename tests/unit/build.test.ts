import { describe, it, expect } from 'vitest';
import { existsSync, readFileSync } from 'fs';
import { join } from 'path';

const DIST = join(process.cwd(), 'dist');

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
});
