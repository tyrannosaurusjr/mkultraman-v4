# CLAUDE.md — mkultraman-v4

Project rules and learned context for Claude Code. Committed to the repo so they travel across machines.

---

## Site basics

- Astro.js static site, deployed on Vercel via git push to `main`
- Live at mkultraman.com
- GA4 property ID: 483174837

---

## Rules: copy and content

### No em dashes or en dashes

Never use em dashes (—) or en dashes (–) in any user-facing copy. This includes pages, blog posts, components, schema JSON, and data files. Full site-wide sweep completed April 2026.

Rewrite sentences to avoid needing a dash — use commas, colons, periods, or parentheses instead. Simple substitution with a hyphen is not acceptable.

Three intentional exceptions (CSS comments only, not rendered): `services.astro:409`, `guild.astro:101`, `blog/[slug].astro:321`.

### Split-word artifacts

AI-generated content pages (guides, service pages, comparison pages) can have words split at syllable boundaries with a space inserted: "opera tor", "au tomation", "Cus tomer", "bot tom" (CSS), etc.

When any split-word artifact is found, run a full systematic audit before fixing — do not fix only the known pattern and move on. Reactive cleanup misses things every time.

**Audit method:**
1. Primary pattern (most splits occur before "t"): `grep -rn "[a-z]{2,4} t[a-z]{3,}"` across .astro/.md files
2. Also check splits before s, c, p, r, d, n, f, l
3. CSS: grep for `bot tom`, `au to;`, `mar gin`, `pad ding`
4. Broken links: grep for spaces inside href attributes
5. Cover both lowercase (`au tomation`) and capitalized (`Au tomation`) in sed patterns

Compile the full list first, then fix in one pass.

---

## Rules: git and deployment

### Always commit and push when done

File edits are not complete until committed and pushed. Vercel deploys on push — until then the live site still shows old code.

At the end of any editing session, run `git status`. If there are uncommitted changes, commit and push before stopping. This applies especially before `/compact` or any context handoff.

**Incident:** April 2026 — 107-file em dash sweep completed locally but never committed. Session compacted, next session had no record of pending push. Live site still showed em dashes.

---

## Rules: SEO and analytics

### No paid SEO tooling

Default to WebSearch + WebFetch + manual SERP observation. Do not suggest DataForSEO, Ahrefs, SEMrush, or paid Clutch placement. Free path only.

### GA4 via analytics-mcp

Uses OAuth2 user credentials (`authorized_user` type), not service accounts. `GOOGLE_APPLICATION_CREDENTIALS` must be explicitly set in the MCP server's env block in `.claude.json` — never inherited from shell.

If GA4 tools fail, check first: does `$GOOGLE_APPLICATION_CREDENTIALS` point to a file that exists? A stale env var pointing to a deleted file is the most common cause.
