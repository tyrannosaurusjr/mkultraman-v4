# Design System — mkultraman.com

## Product Context
- **What this is:** Solo digital infrastructure consultant site — one message, one CTA, one conversion action.
- **Who it's for:** SME owners in Japan (all industries) with broken workflows, tool sprawl, and no visibility into their digital operations.
- **Space/industry:** Digital consultancy / infrastructure management / operations
- **Project type:** High-performance marketing site (Astro, static)
- **Core message:** "Your tech stack is costing you money. I fix it." + "Make more money with less work."

## Aesthetic Direction
- **Direction:** Industrial/Refined — dark, precise, no decoration
- **Decoration level:** Minimal — typography and whitespace do all the work
- **Mood:** The site should feel like a high-conviction B2B product page. Not a consultant brochure. Confident, fast, built for action. A visitor should feel: "this person knows exactly what they're doing."
- **What to avoid:** Stock photos, wavy dividers, 3-column icon grids, centered everything, purple/violet gradients, bubbly border radius, generic consulting-speak

## Typography
- **Display/Hero:** Fraunces (weight 900, optical size large) — nobody in the digital infra space uses a serif. It signals conviction and results, not technical credentials. Italic used sparingly for emotional emphasis.
- **Stat numbers:** Fraunces (weight 900) — stats carry emotional and narrative weight ("40+", "10yr", "60 days"), so they stay in the display family rather than the mono family. The sub-label under each stat does get mono (see below).
- **Body/UI:** Geist (weights 400, 500, 600) — sharp, clean, built for digital products
- **Data/Mono:** Geist Mono (weights 400, 500) — labels, accents, eyebrows, stat sub-labels, form field labels
- **Loading:** Google Fonts CDN — `family=Fraunces:ital,opsz,wght@0,9..144,700;0,9..144,900;1,9..144,400&family=Geist:wght@300;400;500;600&family=Geist+Mono:wght@400;500`
- **Scale:**
  - Hero: clamp(48px, 6vw, 80px) / weight 900 / line-height 1.0
  - Display LG: clamp(36px, 5vw, 64px) / weight 700 / line-height 1.1
  - Display MD: clamp(24px, 3vw, 40px) / weight 700 / line-height 1.2
  - Heading: 20px / weight 600 / line-height 1.3
  - Body: 16px / weight 400 / line-height 1.7
  - Small: 13px / line-height 1.5
  - Mono/Label: 11-13px / letter-spacing 0.08-0.12em / uppercase

## Color
- **Approach:** Restrained — one accent color, used rarely and with intent
- **Background:** `#111111`
- **Surface:** `#1A1A1A`
- **Surface 2:** `#222222`
- **Border:** `#2A2A2A`
- **Text:** `#F0EDE8` (warm off-white — not pure white)
- **Text Muted:** `#888888`
- **Text Dim:** `#555555`
- **Accent Red:** `#C41E3A` — the brand color, evolved from the original coral to a deeper crimson. Used for: CTA buttons, hover states, eyebrow labels, italic emphasis.
- **Accent Hover:** `#A01830`
- **Accent Soft:** `rgba(196, 30, 58, 0.12)` — backgrounds on icon containers, tag fills
- **Semantic:** success `#22c55e`, warning `#eab308`, error `#ef4444`, info = accent red
- **Light mode:** `--bg: #F8F6F2`, `--surface: #FFFFFF`, `--text: #111111`, `--text-muted: #666666` — accent red stays the same

## Spacing
- **Base unit:** 8px
- **Density:** Comfortable to spacious — generous margins, nothing cramped
- **Scale:** 2px / 4px / 8px / 12px / 16px / 24px / 32px / 48px / 64px / 96px / 128px
- **On 12px:** The scale is 8-based for macro-layout spacing (sections, gutters, page rhythm). 12px exists as a legitimate UI-micro value for things where 8 is too tight and 16 is too loose: pill-button vertical padding, label-to-input gap, icon-text pair gap inside a nav link. Use sparingly — if you reach for 12 for a section-level rhythm, you probably want 16 or 24.

## Layout
- **Approach:** Poster-first. The first viewport is a single statement — headline left, form right. Everything below the fold supports the CTA, it doesn't compete with it.
- **Grid:** 2-column hero (1fr 420px), single column on mobile
- **Max content width:** 1200px
- **Border radius:** sm: 4px / md: 8px / lg: 12px / full: 9999px — used conservatively. Cards and inputs get md. Pills/tags get full.

## Motion
- **Approach:** Minimal functional only
- **Easing:** enter: ease-out / exit: ease-in / move: ease-in-out
- **Duration:** micro: 50-100ms / short: 150ms (hover states) / medium: 250ms (page transitions)
- **Rule:** If the motion doesn't help the user understand something, remove it. Fast page load is the most important "animation."

## Site Structure
1. **Hero** — Headline + subhead + inquiry form. One CTA. Nothing else competes.
2. **Problems** — Three named pains (tool sprawl, workflow debt, no visibility). No fluff.
3. **Services** — Three engagement types (audit, build, management). Cards, direct copy.
4. **About strip** — One paragraph. Who Tetsu is, Tokyo, 6 years, small client list.
5. **Footer** — Minimal. Logo, tagline, nav links, legal.

## Decisions Log
| Date | Decision | Rationale |
|------|----------|-----------|
| 2026-03-31 | Dark background as primary | 95% of consultant sites are white — instant differentiation, premium feel |
| 2026-03-31 | Fraunces serif for hero display | Zero other infra consultants use serif — signals business outcomes, not technical credentials |
| 2026-03-31 | No hero image | Forces copy to work harder, eliminates stock photo feel, massive load speed benefit |
| 2026-03-31 | Single form as primary CTA | Everything on the page serves one action — fill out the inquiry form |
| 2026-03-31 | Astro for build | Best performance for a static marketing site with one form — zero JS by default |
| 2026-03-31 | Red evolved from #original to #C41E3A | Deeper crimson reads more premium than the coral on the old site, retains brand continuity |
| 2026-04-22 | Stat numbers stay Fraunces, not Geist Mono | `/design-review` flagged the implementation-vs-spec drift. Fraunces on stats gives the "40+ / 10yr / 60 days" strip more narrative weight than Geist Mono would. Mono stays on the sub-labels under each stat. |
| 2026-04-22 | `--text-dim` bumped from #555555 to #828282 | Old value failed WCAG AA at 2.66:1 on 117 small-text usages. New value is 4.90:1 (passes AA). Side effect: visual gap to `--text-muted` is now very small. Future cleanup may collapse to one token. |
| 2026-04-22 | 12px formalized in the spacing scale | `--space-12` had been used 37 times across the codebase as a UI-micro value (pill padding, label-to-input gaps). Either the scale was wrong or the code was wrong. Code was right — 12px is a legitimate UI tier between 8 and 16. Added to the scale with guidance on when to use it. |
