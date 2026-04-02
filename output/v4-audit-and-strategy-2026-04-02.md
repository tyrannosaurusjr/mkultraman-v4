# MKUltraman v4 Audit and Strategy

Date: 2026-04-02

## Executive Summary

The current production site at `mkultraman.com` has strong thematic raw material, but it is strategically fragmented.

- The homepage positions MKUltraman as a digital strategist and infrastructure operator.
- The services page positions the brand as an SEO agency and web design partner.
- The contact page positions the brand as a Japan business consultant.

Those are adjacent offers, but they do not read as one coherent market position. The result is a site that signals intelligence and breadth, while weakening clarity, trust, memorability, and conversion intent.

The local Astro v4 prototype is directionally much better. It is cleaner, faster, more legible, and more focused around one core offer. It already outperforms the live site on mobile accessibility and best-practices signals. But it is still incomplete as a convincing premium business site. It currently feels like a disciplined wireframe with strong copy instincts, not yet a fully persuasive flagship.

## What The Current Production Site Gets Wrong

### 1. Positioning Drift

The live site currently shifts between:

- digital strategy and infrastructure
- SEO agency and web design
- business consultant
- editorial commentator on Japan

This creates uncertainty around what is actually being sold, for whom, and what the first next step should be.

### 2. SEO-First Structure Overwhelms Human Conversion

The homepage is overloaded with explanatory copy, repeated conceptual framing, accordions, advisory logos, and multiple CTA directions. It reads like a search-optimized authority page more than a sharp operator-led consultancy homepage.

The site demonstrates expertise, but it asks the visitor to do too much interpretation.

### 3. Weak Trust Ladder

The site references applied advisory work, but the trust progression is still weak:

- little quantified proof near the top
- no compact case-study framing
- no clear before/after operational outcomes
- no obvious explanation of process, timeline, and fit

The visitor is told the work is strategic and durable, but is not quickly shown enough evidence to believe it.

### 4. Visual Compression

The live homepage feels dense, template-driven, and vertically overextended. The overall look signals seriousness, but not sharp taste or premium control. The visual system is carrying too much text and not enough structure.

### 5. Brand Temperature Problem

The brand voice is intelligent and forceful, but often lands as remote, theoretical, or severe. That can attract high-agency operators, but it will also repel many qualified buyers unless the site adds clearer warmth, specificity, and practical reassurance.

## Current Production Site: Detailed Audit

### Psychology and Conversion

Top issues:

- The site asks the visitor to infer the offer instead of naming it crisply.
- The primary emotional tone is intellectually dominant rather than practically helpful.
- The user must work too hard to understand what to do next.
- The site builds authority more effectively than it builds trust.
- Editorial worldview competes with commercial clarity.

What this currently attracts:

- intellectually curious founders
- operators who enjoy strong points of view
- people already predisposed to value systems thinking

What it repels:

- buyers who want a fast grasp of scope and fit
- busy decision-makers looking for immediate relevance
- prospects who need social proof before engaging

### Design and UX

Top issues:

- the homepage is too long for the amount of clarity it delivers
- visual hierarchy is flattened by long-form text density
- the CTA system is fragmented across services, guild, insights, and contact
- the design feels template-constrained rather than brand-owned
- mobile browsing appears especially compressed and text-heavy

Current strengths:

- the live site does have a point of view
- the imagery is personal and human rather than sterile stock
- the palette already leans toward a recognizable MKUltraman signal
- there is enough content depth to support a stronger authority system

### Technical and Platform

The live site is currently WordPress-based behind Cloudflare.

Observed signals:

- WordPress API and Divi-related assets are present
- homepage HTML is about 180 KB before asset loading
- homepage contains 5 stylesheets, 22 scripts, and 11 images
- mobile Lighthouse in existing audit artifacts scores 0.67 performance, 0.78 accessibility, 0.77 best practices, and 1.00 SEO

Notable live-site issues from the existing Lighthouse artifacts:

- insufficient color contrast
- heading order problems
- no `main` landmark
- viewport zoom restriction
- console errors
- deprecated APIs

This means the current site is not technically broken, but it is carrying unnecessary platform and template overhead relative to what the brand actually needs.

## Local Astro v4 Prototype Audit

### What Is Better Already

The prototype in this repo is much more coherent than production.

- The homepage is short, focused, and readable.
- The core offer is clearer: digital infrastructure for SMEs in Japan.
- The three-offer model is simpler.
- The visual language is cleaner and more controlled.
- The local mobile Lighthouse artifact scores 0.82 performance, 0.94 accessibility, 1.00 best practices, and 1.00 SEO.

The shift from a sprawling strategy page to a tighter operator page is correct.

### What Is Still Missing

The prototype is not yet persuasive enough to be the finished v4.

- There are only 4 routes: homepage, blog index, blog posts, and guild.
- The nav and footer imply broader site depth than actually exists.
- The footer links to `/privacy` and `/terms`, but those pages do not exist.
- There is no dedicated services page, contact page, case-study page, or proof layer.
- The homepage jumps from claim to form without enough trust scaffolding.
- The form is functional, but it is still a generic inquiry box rather than a well-structured qualification device.
- The blog corpus is large and thematically broad, which risks overpowering the commercial story if not better curated.

### Local Prototype: Design Read

The current prototype looks competent, but it does not yet feel magnetic.

Strengths:

- strong headline structure
- cleaner grid and spacing
- much better control over visual noise
- more premium type pairing than the live site

Gaps:

- the page is too monochrome and austere
- there is not enough visual rhythm or surprise
- service cards and blog cards feel systemically tidy, but emotionally flat
- there is limited use of proof, artifacts, diagrams, or operator evidence
- the page needs stronger signature imagery and more deliberate choreography

## Strategic Recommendation for v4

### Choose One Clear Market Position

The v4 site should not present MKUltraman as all of the following at once:

- strategist
- SEO agency
- web design agency
- consultant
- editorial observer

Instead, anchor the site around one primary identity:

**MKUltraman is the operator layer for Japan-facing organizations whose systems, digital infrastructure, and execution have become fragmented.**

That identity is broad enough to contain the right work, but specific enough to be memorable.

### Recommended Messaging Spine

Core idea:

**When execution feels harder than it should, the problem is usually structural.**

Message stack:

- I diagnose operational and digital friction.
- I redesign the stack, workflows, and structure underneath it.
- I stay involved where continuity matters.

Offer ladder:

- Audit
- Build
- Stewardship

This is already close to the local Astro direction and should be preserved.

### What To De-Emphasize

Reduce or remove these as top-level identities:

- SEO agency
- web design agency
- generic business consultant
- broad thought-leader framing

Those can still appear as capabilities or outcomes, but not as the main brand handle.

## Recommended Visual Direction

### Overall Feel

Aim for:

- operator-grade
- editorial
- premium
- controlled
- human
- slightly confrontational, but not hostile

The current local palette is directionally right, but it needs more dimension.

### Visual System

Recommended direction:

- keep charcoal, bone, and deep red as the base palette
- introduce one warmer neutral to reduce the current hard-edge severity
- use documentary-style personal imagery with tighter crops and stronger art direction
- add structured diagrams, proof snippets, or operating maps as brand artifacts
- use larger type transitions and section pacing to create tension and release
- make CTAs feel intentional and scarce rather than repeated everywhere

Avoid:

- generic startup gradients
- sterile SaaS UI blocks
- over-templated agency aesthetics
- endless card grids with identical treatment

## Recommended Homepage Information Architecture

1. Hero

- one sharp promise
- one sentence of clarification
- one primary CTA
- one secondary CTA
- compact proof strip

2. Who This Is For

- founders, operators, small firms, Japan-facing teams
- clear fit and non-fit language

3. Structural Problems

- tool sprawl
- workflow debt
- no visibility

4. How Engagement Works

- audit
- build
- stewardship

5. Proof

- client examples
- quantified outcomes
- logos only if contextualized
- short case snapshots

6. Operating Method

- how work starts
- what gets mapped
- what gets fixed
- how continuity is maintained

7. About The Operator

- personal credibility
- market context
- why this viewpoint is different

8. Selected Writing

- a curated subset only
- positioned as signal, not the main event

9. Final CTA

- short qualification form or booking mechanism
- clear response expectation

## Content Architecture Recommendations

### Keep

- strong editorial voice
- Japan-specific insight
- systems framing
- operator identity
- the Ultra Guild as proof of execution depth

### Change

- separate commercial pages from editorial pages more aggressively
- curate the blog instead of using it as an undifferentiated firehose
- build a dedicated proof/case-study layer
- create explicit pages for services, contact, privacy, and terms
- turn the guild into proof of operating range, not a parallel brand distraction

### Suggested Top-Level Navigation

- Work
- Services
- Writing
- Guild
- About
- Contact

If the site needs to stay lean, remove one of `Work` or `Services`, but do not ship without a dedicated proof layer.

## Technical Recommendations for the Rebuild

### Preserve

- Astro as the front-end framework
- static delivery model
- lean component structure
- simple content collections for editorial pages

### Add

- explicit SEO metadata per page
- Open Graph and Twitter image handling
- analytics and conversion event tracking
- form backend with clear submission handling and confirmation states
- legal pages
- route parity with the navigation
- stronger image strategy and responsive asset control

### Fix in the Current Prototype Before Launch

- add missing legal and contact/service routes
- replace placeholder README
- fix broken footer link targets
- fix the undefined `--space-10` token in the footer styles
- address remaining contrast issues found in Lighthouse

## Recommended v4 Build Plan

### Phase 1: Positioning Lock

- choose one commercial identity
- define primary audience
- define non-audience
- finalize the three-offer model

### Phase 2: Proof System

- create 3 to 5 compact case studies
- define quantified proof blocks
- identify logos, testimonials, and operator artifacts

### Phase 3: Design System

- evolve the current dark editorial system into a richer premium identity
- design a distinctive homepage with stronger pacing and visual contrast
- build consistent CTA patterns and proof modules

### Phase 4: Site Architecture

- homepage
- services
- work or case studies
- writing
- guild
- about
- contact
- privacy and terms

### Phase 5: Conversion Instrumentation

- event tracking on CTAs
- form completion tracking
- source attribution
- scroll-depth and section engagement

## Bottom Line

The live site proves that there is substance behind the MKUltraman brand, but it currently distributes that substance across too many identities and too much explanatory mass.

The local Astro v4 prototype is the correct strategic direction because it reduces noise and sharpens the offer. But to become a convincing flagship, it needs:

- clearer trust architecture
- a more premium and distinctive visual identity
- proof closer to the top
- full route completeness
- a curated relationship between commercial pages and editorial content

If executed well, v4 should feel less like a consultant website and more like the public interface of a highly capable operator with taste, discipline, and an unusually coherent model for getting real work done in Japan.
