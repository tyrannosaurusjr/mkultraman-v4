# MKUltraman v4 Audit And Rebuild Plan

Date: April 2, 2026

## Scope

This audit covered:

- The live production site at `https://mkultraman.com`
- The live `services`, `contact`, `ultra-guild`, and `blog` surfaces
- The local Astro repo in `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4`
- The local v4 homepage draft rendered from this repo

Artifacts captured during the audit:

- `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4/output/playwright/mkultraman-home-desktop.png`
- `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4/output/playwright/mkultraman-home-mobile.png`
- `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4/output/playwright/lighthouse-home-mobile.json`
- `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4/output/playwright/local-v4-home-desktop.png`
- `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4/output/playwright/local-v4-home-mobile.png`
- `/Users/mkultraman/Desktop/tyrannojr-github/mkultraman-v4/output/playwright/lighthouse-local-v4-mobile.json`

## Executive Summary

The current live site has a real point of view, real breadth, and real intellectual gravity. It also asks the visitor to do too much work.

Right now `mkultraman.com` is trying to be all of these at once:

- digital strategist
- systems architect
- SEO/web design agency
- Japan business commentator
- advisory portfolio
- Ultra Guild network

That creates two problems:

1. The offer is too diffuse.
2. The site explains philosophy before it earns trust.

The local Astro v4 draft is directionally better because it is narrower, cleaner, and easier to understand. But it currently overcorrects into a severe, proof-light sales page. It is technically a stronger base than the live WordPress/Divi site, but it is not yet a convincing flagship.

The right v4 is not "make the current site prettier" and it is not "ship the current Astro draft as-is."

The right v4 is:

- a focused operator site
- built around one primary commercial offer
- supported by proof, not buried under theory
- visually sharper and more art-directed
- technically rebuilt on Astro with a real SEO and analytics migration plan

## What The Current Brand Signals

At its best, MKUltraman signals:

- sharp, contrarian, systems-first thinking
- Japan-specific operating experience
- direct, anti-bureaucratic posture
- premium advisory energy
- real editorial depth

That is valuable. It should not be thrown away.

## Core Problems On The Live Site

### Brand And Messaging

- The offer is too broad. A visitor has to infer whether this is consulting, infrastructure management, SEO, web design, publishing, or membership.
- The audience is blurry. SMEs, founders, global operators, expats, and "modern organizations in Japan" all appear.
- The tone is intelligent but high-friction. It signals sophistication, but often at the expense of clarity.
- `Ultra Guild` is distinctive, but it currently reads more like mythology than a clearly framed commercial product.

### Psychology And Conversion

- The homepage makes the user absorb a lot of abstract language before showing simple business relevance.
- Proof exists, but too much of it is indirect or buried.
- The contact experience feels selective before trust is firmly established.
- The copy sometimes implies that the visitor's organization is broken before making them feel understood.

### UX And Design

- The homepage is too long and text-dense.
- Visual hierarchy is flattened by repeating similar section treatments and content density.
- The CTA system is fragmented across services, guild, blog, and contact.
- The design feels template-driven rather than brand-owned.
- Mobile carries high cognitive load for too long.

### Technical Debt

The live production site is currently a WordPress/Divi stack behind Cloudflare, not this Astro repo.

Key issues found on April 2, 2026:

- Mobile Lighthouse: `67 performance / 78 accessibility / 77 best practices / 100 SEO`
- Largest Contentful Paint: `7.2s`
- First Contentful Paint: `3.2s`
- Time to Interactive: `7.3s`
- Unused JavaScript savings estimated at `282 KiB`
- Missing main landmark
- Invalid heading order
- `user-scalable=0` in the viewport meta tag
- Console errors and broken resource loads
- Multiple third-party scripts and trackers with no obvious conversion event model

Confirmed live-site defects:

- The homepage CTA labeled `Learn About the Guild` points to `/services/`
- The contact form asks for multiple fields, including LinkedIn and website, which increases perceived friction

## What The Astro Draft Gets Right

The local repo already moves in a healthier direction:

- Astro is a much better long-term platform than the current Divi stack
- The page composition is far simpler
- The primary offer is narrower and easier to understand
- The visual language is more consistent
- The content model is straightforward and maintainable

The local homepage draft currently reads as:

- Hero
- Problems
- Services
- Insights
- About

That is a much better base for a conversion-oriented flagship.

## What The Astro Draft Still Lacks

### Trust And Persuasion

- Not enough proof near the top of the page
- Not enough warmth
- Not enough case-study evidence
- Not enough audience qualification
- Still somewhat aggressive before fully establishing safety

### Content And IA

- The blog still dominates the repo in volume and can overpower the commercial message
- `Ultra Guild` remains potentially distracting unless framed as secondary
- No case study surface yet

### Technical Completeness

- No canonical metadata layer
- No OG/Twitter metadata infrastructure
- No JSON-LD
- No sitemap or RSS setup
- No analytics or event model
- Footer links to `/privacy` and `/terms`, but those routes do not exist
- Some blog frontmatter still contains HTML-entity artifacts

Local Lighthouse on the v4 preview was directionally better:

- `82 performance / 94 accessibility / 100 best practices / 100 SEO`

But the local draft is still not ready to ship as a production flagship.

## Strategic Decision For v4

The site needs one clear commercial identity.

Recommended role for v4:

`MKUltraman helps Japan-based and Japan-entering SMEs replace tool chaos, workflow debt, and execution drag with lean digital infrastructure that makes growth easier.`

Recommended offer stack:

- Audit
- Rebuild
- Ongoing stewardship

Recommended brand role:

- not a broad "strategy brand"
- not a generic SEO agency
- not a vague guild-first experience
- a trusted operator for business infrastructure in Japan

## Recommended Audience

Primary audience:

- SMEs operating in Japan
- founder-led or owner-led businesses
- advisory-led or service-led firms
- internationally minded operators who already feel systems drag

Secondary audience:

- Japan-entering organizations that need local operating clarity
- high-context organizations with fragmented tools and workflows

Not the primary homepage audience:

- broad general readers
- culture readers
- people arriving only for editorial commentary
- audiences who are not realistically in-market for infrastructure work

## Messaging Spine

Primary promise:

`I help businesses in Japan fix the digital bottlenecks slowing growth, execution, and visibility.`

Problem language should be concrete, not philosophical:

- too many tools
- broken handoffs
- no clean reporting
- unclear ownership
- slow launches
- rising overhead with no compounding gain

Proof language should appear early:

- years in Japan
- organizations supported
- representative client names or logos
- measurable results where publicly usable

Tone guidance:

- direct
- calm
- premium
- precise
- less abrasive
- less abstract

## Recommended Homepage Information Architecture

1. Hero

- clear ICP
- clear problem
- one primary CTA
- compact proof strip

2. Symptom Recognition

- tool sprawl
- workflow debt
- no visibility

3. Service Paths

- audit
- build
- stewardship

4. Case Snapshots

- two or three short, outcome-oriented examples

5. About

- why MKUltraman
- why Japan
- why this systems-first angle

6. Writing

- selected articles only
- positioned as credibility support

7. Final CTA

- low-friction contact

## Recommended Visual Direction

The live site has a recognizable red-accent editorial tone. Keep that energy, but make it more deliberate.

Recommended direction:

- editorial-consulting flagship, not template-marketing page
- dark base with warmer neutrals: charcoal, bone, deep red
- stronger typographic contrast
- fewer sections
- more breathing room
- larger proof moments
- documentary portraits instead of generic "agency" imagery
- compact case-study modules
- restrained motion
- structural diagrams or system visuals used sparingly

Design rule:

The site should feel like "systems clarity in a noisy Japan market."

## What To Preserve From The Current Site

- The systems thesis: execution fails because structure fails
- The Japan-specific perspective
- The direct, no-fluff posture
- The editorial engine
- Named advisory relationships and proof where useful
- The red accent as a signature, if used with more discipline

## What To Demote Or Remove

- The giant philosophy-heavy homepage sections
- Co-equal presentation of services, guild, advisory, and editorial on first impression
- Any agency-style positioning that is not core to the business
- Vague or mythic framing of `Ultra Guild` on the main conversion path
- Redundant CTAs and scattered offer framing

## Technical Rebuild Recommendation

Use Astro as the v4 base.

Core content model:

- homepage
- services
- case studies
- about
- contact
- blog
- optional guild section as secondary

Required technical work:

- canonical URLs
- OG/Twitter tags
- JSON-LD
- sitemap
- RSS
- robots
- redirect map from current WordPress URLs
- reliable contact form endpoint
- spam protection
- form success state
- analytics event schema
- legal routes
- self-hosted or reduced font payload
- image optimization

Recommended event model:

- hero CTA click
- service CTA click
- case-study CTA click
- form start
- form submit
- form success
- article-to-service click

Performance and quality gates:

- mobile LCP under `2.5s`
- minimal third-party JavaScript
- accessible landmarks and heading structure
- no broken legal or trust routes
- no copy artifacts in titles or metadata

## SEO Migration Guidance

Do not burn current equity for the sake of a clean rewrite.

Preserve:

- high-value blog URLs
- service URLs with current search intent
- any pages already ranking or attracting referral traffic

Migration requirements:

- map current WordPress URLs to final Astro URLs
- retain or redirect old service and blog slugs carefully
- keep editorial authority, but stop letting it dominate the homepage

## Open Strategic Questions

These need explicit decisions before final design and build:

- Is `Ultra Guild` a real revenue driver, a proof vehicle, or a side brand?
- Is the primary customer an SME owner, founder, operator, or advisory lead?
- Which client names and outcomes can be used publicly?
- Is the business primarily infrastructure management, advisory, or both?
- Which current WordPress pages must retain SEO equity?

## Recommended Build Sequence

### Phase 1: Positioning Lock

- finalize ICP
- finalize offer stack
- finalize homepage messaging spine
- decide role of `Ultra Guild`

### Phase 2: Proof Inventory

- gather case studies
- gather named client references
- gather metrics and outcomes
- choose which logos and examples can be public

### Phase 3: IA And Visual System

- design homepage and services IA
- define typography, grid, spacing, and motion rules
- build a brand-owned component system

### Phase 4: Technical Foundation

- finish metadata and SEO infrastructure
- implement analytics schema
- implement forms
- add legal pages
- fix content encoding issues

### Phase 5: Migration

- redirect map
- content pruning
- launch checklist
- post-launch performance and conversion review

## Bottom Line

The current live site proves there is a real voice, a real body of work, and real authority behind MKUltraman.

What it does not yet do is convert that authority into a clean, confident, immediately understandable flagship.

v4 should be:

- narrower
- sharper
- warmer
- more proof-driven
- more art-directed
- technically lighter
- commercially clearer

The local Astro repo is the right foundation, but it needs a stronger strategic frame before it becomes the final site.
