import { describe, it, expect } from 'vitest';
import { readFileSync, readdirSync } from 'fs';
import { join } from 'path';

const BLOG_DIR = join(process.cwd(), 'src/content/blog');
const REQUIRED_FIELDS = ['title', 'description', 'pubDate'];

function parseFrontmatter(content: string) {
  const match = content.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const fields: Record<string, string> = {};
  for (const line of match[1].split('\n')) {
    const colonIdx = line.indexOf(':');
    if (colonIdx > 0) {
      fields[line.slice(0, colonIdx).trim()] = line.slice(colonIdx + 1).trim();
    }
  }
  return fields;
}

describe('Blog content', () => {
  const files = readdirSync(BLOG_DIR).filter(f => f.endsWith('.md'));

  it('has blog posts', () => {
    expect(files.length).toBeGreaterThan(0);
  });

  for (const file of files) {
    describe(file, () => {
      const content = readFileSync(join(BLOG_DIR, file), 'utf-8');
      const frontmatter = parseFrontmatter(content);

      it('has valid frontmatter', () => {
        expect(frontmatter).not.toBeNull();
      });

      for (const field of REQUIRED_FIELDS) {
        it(`has required field: ${field}`, () => {
          expect(frontmatter).not.toBeNull();
          expect(frontmatter![field]).toBeDefined();
          expect(frontmatter![field].length).toBeGreaterThan(0);
        });
      }

      it('has a valid pubDate', () => {
        expect(frontmatter).not.toBeNull();
        const date = new Date(frontmatter!.pubDate);
        expect(date.toString()).not.toBe('Invalid Date');
      });

      it('has body content', () => {
        const body = content.replace(/^---[\s\S]*?---/, '').trim();
        expect(body.length).toBeGreaterThan(0);
      });

      it('slug matches filename', () => {
        const slug = file.replace('.md', '');
        expect(slug).toMatch(/^[a-z0-9]+(?:-[a-z0-9]+)*$/);
      });
    });
  }
});
