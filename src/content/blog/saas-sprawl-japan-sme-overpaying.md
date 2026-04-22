---
title: "The Hidden Cost of SaaS Sprawl: How Japan SMEs Overpay for Tools They Don't Use"
description: "The average SME pays for 30–50 SaaS tools and actively uses maybe half of them. In Japan, where enterprise software contracts are often signed and forgotten, the problem is worse. Here's what to look for."
pubDate: 2026-03-24
tags: ["Business in Japan", "Digital Transformation & AI"]
author: "Matt Ketchum (MKUltraman)"
---

The average mid-size company pays for 30 to 50 SaaS tools. Studies from SaaS management platforms consistently show that 25–40% of those subscriptions are either unused or significantly underutilized.

Japan SMEs aren't exempt from this. If anything, the problem is more acute here because of how software gets bought. A vendor pitches to someone senior, a contract gets signed, the tool gets deployed to whatever team was involved in the pitch, and then... it quietly keeps billing for years. Nobody checks. Nobody cancels. The person who signed the contract moves on, and institutional memory of why the tool was purchased dissolves.

This is SaaS sprawl. And it's almost certainly costing your business more than you think.

## Where the money actually goes

When I run a [Stack Audit](/services/stack-audit), the first thing that comes back is a full inventory of every tool and subscription the business is paying for. The reaction from clients is almost always the same: surprise at the total, followed by recognition of at least two or three things they forgot existed.

The most common categories of waste:

**Duplicate capability.** Two tools that do essentially the same thing, acquired at different times, now running in parallel. Most often: two project management tools, or two communication platforms, or a CRM plus a separate pipeline tracker. Nobody wants to migrate off the older one, so both keep billing.

**Ghost subscriptions.** Tools purchased for a project that ended, a team member who left, or a trial that auto-renewed. These are often the smallest individual line items — ¥3,000–5,000/month — which is exactly why nobody cancels them. Too small to prioritize, too persistent to die.

**Wrong pricing tier.** A business that signed up for an enterprise tier during a growth phase and didn't downgrade when growth slowed. Or the opposite: a business hitting per-seat overage charges because they never upgraded from a plan that no longer fits.

**Integrations that broke.** Automations that were set up to sync data between two tools. One of the tools updated its API. The automation quietly stopped working six months ago. You're still paying for both tools, plus the automation platform, for a workflow that isn't doing anything.

## The Japan-specific factors

A few things make SaaS sprawl worse in the Japanese market specifically.

**Annual contracts are the default.** Japanese vendors — and Japanese sales motions for international vendors — lean heavily toward annual commitments. This means the window to cancel or renegotiate is one month per year, and if you miss it, you're locked in for another twelve months. Most businesses miss it.

**IT ownership is diffuse.** In many Japan SMEs, there's no one person responsible for the full software stack. Finance handles the accounting tools. Marketing owns the email platform. HR manages their own systems. Nobody has a complete picture, which means nobody catches the overlap.

**Vendor relationships complicate cancellation.** Japanese business culture places significant weight on vendor relationships. Canceling a contract — especially from a Japanese vendor with an established relationship — can feel like a confrontation. So renewals happen by default, even when the tool isn't earning its keep.

**The invoicing system creates switching friction.** Since Japan's インボイス制度 (invoice system) took effect, businesses are more cautious about changing accounting tools and any system that touches invoice generation. This is legitimate friction — but it sometimes paralyzes action on the adjacent tools that could be switched without any tax implications.

## How to run a basic sprawl check yourself

You don't need to hire someone to do a first pass. Here's a reasonable starting point:

1. **Pull all your credit card and bank statements for the past three months.** Look for any line item from a software company. Make a list.

2. **For each tool, answer two questions:** Who on your team uses this actively (not "in theory," but actually logged in this month)? What would break if we turned it off tomorrow?

3. **Flag anything where the answer to question 1 is "nobody" or "one person" and the answer to question 2 is "nothing obvious."** Those are your cancellation candidates.

4. **Check your annual renewal dates.** For any tool you're uncertain about, find out when the contract renews. Set a calendar reminder 60 days before to make a decision, not 5 days before.

The typical first pass surfaces 3-5 candidates for immediate cancellation and 2-3 contracts worth renegotiating. The savings aren't always dramatic individually, but they compound — ¥50,000/month in trimmed tools is ¥600,000/year.

## The harder version of this problem

Ghost subscriptions and duplicate tools are the easy version of SaaS sprawl. They're visible, countable, and cancellable.

The harder version is the tool that's being used, but being used wrong — or being used for something that a cheaper or better tool could do. A ¥60,000/month enterprise project management platform where the actual usage is task lists that could run on a ¥6,000/month tool. A complex CRM being used as a contact spreadsheet. A data pipeline tool bought for an integration that could be replaced by a native API connection.

This is harder to see from a billing statement. It requires understanding what each tool is actually doing in your operation — which is where a proper audit becomes worth doing.

## What to do with what you find

Once you've identified your waste, the decision tree is simple:

- **Unused tool with no data:** Cancel immediately.
- **Unused tool with historical data:** Export the data, archive it somewhere cheap (Google Drive, S3), then cancel.
- **Duplicate capability:** Pick one, migrate everyone onto it, cancel the other. This takes longer but the savings are worth it.
- **Wrong pricing tier:** Call your account manager. Most SaaS vendors would rather downgrade you than lose you entirely. Ask.
- **Broken automation:** Fix it or remove it. A broken automation that looks like it's running is worse than no automation — it creates false confidence that a workflow is happening when it isn't.

If you want someone to do this systematically — inventory, prioritized recommendations, and a clear picture of your full stack — that's what a [Stack Audit](/services/stack-audit) delivers.

---

*Further reading: [what a healthy Japan SME tech stack looks like](/blog/japan-sme-tech-stack-2026/)*
