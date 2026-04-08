# mkultraman-v4

Personal/business site for Matt Ketchum (MKUltraman) — digital infrastructure consultant for SMEs in Japan. Live at **mkultraman.com**.

## What this is

Astro 6 static site deployed on Vercel. Services consulting site + 73-article blog covering Japan business, digital transformation, SME strategy, and market analysis.

## Tech stack

- **Framework**: Astro 6 (static, no SSR)
- **Hosting**: Vercel (see `vercel.json` for headers, redirects)
- **Styling**: Custom CSS tokens (`src/styles/tokens.css`, `src/styles/global.css`) — no Tailwind
- **Content**: Markdown blog posts in `src/content/blog/` via Astro Content Collections
- **Images**: Astro Sharp image service
- **Sitemap**: `@astrojs/sitemap` (excludes `/guild`)
- **SEO**: JSON-LD schema (`SchemaOrg.astro`, `ToolsSchema.astro`), `public/llms.txt`, `public/robots.txt`
- **Forms**: Formspree for contact

## Key directories

```
src/
  components/   # Astro components (Hero, Nav, Services, About, etc.)
  content/
    blog/       # 73 markdown posts (frontmatter: title, description, pubDate, tags, author)
  layouts/      # Base.astro layout
  pages/        # Routes: index, about, blog, contact, services, tools/*, privacy, terms, guild
  styles/       # tokens.css (design tokens), global.css
public/
  images/       # Static images
  llms.txt      # AI-readable site summary
vercel.json     # Redirects (old WordPress slugs → /blog/*), security headers, caching
```

## Blog content schema

```ts
// src/content.config.ts
{ title, description, pubDate, tags: string[], draft: boolean, author: string }
```

## Commands

```sh
npm run dev      # localhost:4321
npm run build    # production build → dist/
npm run preview  # preview build locally
```

## Important context

- Migrated from WordPress — `vercel.json` has ~70 permanent redirects from old flat slugs to `/blog/*`
- `/guild` is excluded from sitemap and search (hidden page)
- Author name is "Matt Ketchum" (not Tetsu) on this site
- Node >= 22.12.0 required

## Cross-project references

- See `~/Desktop/tyrannojr-github/project-rules/PROJECT-MAP.md` for the full repo ecosystem
- Tools pages reference other projects: Hitoe, RedditReach, Tetsuno Claw, Japan Money Tracker
