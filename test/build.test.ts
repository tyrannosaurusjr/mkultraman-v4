import { describe, it, expect, beforeAll } from 'vitest';
import { execSync } from 'child_process';
import { readdirSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const DIST = join(process.cwd(), 'dist');

function getAllHtmlFiles(dir: string): string[] {
  const files: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const full = join(dir, entry.name);
    if (entry.isDirectory()) files.push(...getAllHtmlFiles(full));
    else if (entry.name.endsWith('.html')) files.push(full);
  }
  return files;
}

describe('Build', () => {
  beforeAll(() => {
    execSync('npm run build', { stdio: 'pipe', timeout: 30000 });
  });

  it('produces dist directory', () => {
    expect(existsSync(DIST)).toBe(true);
  });

  it('generates expected page count (80+)', () => {
    const htmlFiles = getAllHtmlFiles(DIST);
    expect(htmlFiles.length).toBeGreaterThanOrEqual(80);
  });

  it('generates sitemap', () => {
    expect(existsSync(join(DIST, 'sitemap-index.xml'))).toBe(true);
    expect(existsSync(join(DIST, 'sitemap-0.xml'))).toBe(true);
  });

  it('generates robots.txt', () => {
    const robots = readFileSync(join(DIST, 'robots.txt'), 'utf-8');
    expect(robots).toContain('Sitemap:');
    expect(robots).toContain('User-agent:');
  });
});

describe('HTML quality', () => {
  let htmlFiles: string[] = [];

  beforeAll(() => {
    htmlFiles = getAllHtmlFiles(DIST);
  });

  it('every page has a <title>', () => {
    const missing: string[] = [];
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8');
      if (!/<title>.+<\/title>/.test(html)) {
        missing.push(f.replace(DIST, ''));
      }
    }
    expect(missing).toEqual([]);
  });

  it('every page has a meta description', () => {
    const missing: string[] = [];
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8');
      if (!/<meta\s+name="description"\s+content="[^"]+"/i.test(html)) {
        missing.push(f.replace(DIST, ''));
      }
    }
    expect(missing).toEqual([]);
  });

  it('every page has a canonical URL', () => {
    const missing: string[] = [];
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8');
      if (!/<link\s+rel="canonical"/i.test(html)) {
        missing.push(f.replace(DIST, ''));
      }
    }
    expect(missing).toEqual([]);
  });

  it('no pages contain unescaped HTML entities in visible text', () => {
    const broken: string[] = [];
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8');
      // Check for leftover WordPress HTML entities in text content (not in tags/attributes)
      if (/&amp;amp;|&amp;#039;|&amp;quot;/.test(html)) {
        broken.push(f.replace(DIST, ''));
      }
    }
    expect(broken).toEqual([]);
  });

  it('no pages have empty titles', () => {
    const empty: string[] = [];
    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8');
      if (/<title>\s*<\/title>/.test(html)) {
        empty.push(f.replace(DIST, ''));
      }
    }
    expect(empty).toEqual([]);
  });
});

describe('Internal links', () => {
  let htmlFiles: string[] = [];

  beforeAll(() => {
    htmlFiles = getAllHtmlFiles(DIST);
  });

  it('all internal href targets exist in dist', () => {
    const broken: { page: string; href: string }[] = [];
    const validPaths = new Set(
      htmlFiles.map((f) =>
        f.replace(DIST, '').replace('/index.html', '/').replace('/index.html', '/')
      )
    );
    // Also add non-HTML assets
    validPaths.add('/');

    for (const f of htmlFiles) {
      const html = readFileSync(f, 'utf-8');
      const hrefs = html.match(/href="(\/[^"#?]*)"/g) || [];
      for (const match of hrefs) {
        const href = match.replace('href="', '').replace('"', '');
        // Skip asset files
        if (/\.(css|js|png|jpg|webp|svg|ico|xml|txt)$/.test(href)) continue;
        // Check if the path exists as a directory with index.html
        const normalized = href.endsWith('/') ? href : href + '/';
        const indexPath = join(DIST, normalized, 'index.html');
        const directPath = join(DIST, href);
        if (!existsSync(indexPath) && !existsSync(directPath)) {
          broken.push({ page: f.replace(DIST, ''), href });
        }
      }
    }
    if (broken.length > 0) {
      console.table(broken.slice(0, 20));
    }
    expect(broken).toEqual([]);
  });
});

describe('SEO essentials', () => {
  it('homepage has JSON-LD structured data', () => {
    const html = readFileSync(join(DIST, 'index.html'), 'utf-8');
    expect(html).toContain('application/ld+json');
    expect(html).toContain('"@type"');
  });

  it('homepage has Open Graph tags', () => {
    const html = readFileSync(join(DIST, 'index.html'), 'utf-8');
    expect(html).toMatch(/property="og:title"/);
    expect(html).toMatch(/property="og:description"/);
    expect(html).toMatch(/property="og:image"/);
  });

  it('sitemap excludes /guild', () => {
    const sitemap = readFileSync(join(DIST, 'sitemap-0.xml'), 'utf-8');
    expect(sitemap).not.toContain('/guild');
  });

  it('guild page has noindex', () => {
    const html = readFileSync(join(DIST, 'guild/index.html'), 'utf-8');
    expect(html).toMatch(/name="robots".*noindex/);
  });

  it('services page has JSON-LD ItemList', () => {
    const html = readFileSync(join(DIST, 'services/index.html'), 'utf-8');
    expect(html).toContain('ItemList');
  });
});
