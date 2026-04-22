#!/usr/bin/env python3
"""
Internal linking pass for mkultraman.com blog posts.
Appends a 'Further reading' footer to each post based on a curated mapping.
Skips posts that already have 3+ internal links.
"""

import os
import re
from pathlib import Path

BLOG_DIR = Path(__file__).parent.parent / "src" / "content" / "blog"

# Each entry: slug (without .md) -> list of (anchor_text, relative_url) tuples
# Goal: each post gets 3 internal links total (body + footer combined)
LINK_MAP = {
    "ai-hype-cycle-japanese-tech-startups-innovation": [
        ("what a healthy Japan SME tech stack looks like in 2026", "/blog/japan-sme-tech-stack-2026/"),
        ("how technology adoption stalls at procurement", "/blog/technology-adoption-japan-systems-procurement/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "ai-misuse-ai-in-japan-reasoning-guide": [
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "aizu-strategy-rural-japan-blueprint": [
        ("rural revitalization Japan and SoftBank investment", "/blog/rural-revitalization-japan-softbank-investment/"),
        ("Japan entrepreneurship and akiya success", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("Stack Audit for local Japan operations", "/services/stack-audit/"),
    ],
    "artisan-mindset-business-growth-craftsmanship": [
        ("heritage crafts and artisan decline in Japan", "/blog/heritage-crafts-artisan-decline-kogei/"),
        ("blue ocean market creation strategy", "/blog/blue-ocean-market-creation-strategy/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
    ],
    "automate-schedule-monetize-your-time-for-profit": [
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("shared systems and Japan's business model", "/blog/shared-systems-japan-business-failure/"),
        ("Stack Audit: map your full digital infrastructure", "/services/stack-audit/"),
    ],
    "bitcoin-mining-grid-stability-japan": [
        ("Japan's systemic labor shortfall", "/blog/japan-systemic-labor-shortfall-collapse/"),
        ("Japan technology and AI copyright law", "/blog/japan-technology-ai-copyright-innovation/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "blue-ocean-market-creation-strategy": [
        ("Japan market and untapped value", "/blog/japan-market-untapped-value-investment/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
        ("Stack Audit: identify what's holding your business back", "/services/stack-audit/"),
    ],
    "chatgpt5-review-from-the-trenches": [
        ("AI hype cycle and Japanese tech startups", "/blog/ai-hype-cycle-japanese-tech-startups-innovation/"),
        ("OpenAI ecosystem and ChatGPT integration in Japan", "/blog/openai-ecosystem-chatgpt-integration-japan/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "chigasaki-beach-event-wild-food-experience": [
        ("modern event management vs outdated logistics", "/blog/modern-event-management-outdated-event-logistics/"),
        ("RedditReach: organic growth for Japan communities", "/tools/redditreach/"),
    ],
    "corporate-training-programs-japanese-leadership": [
        ("Japanese leadership culture and the concept of Wa", "/blog/japanese-leadership-culture-wa/"),
        ("modern disaster: Japan's dangerous 2-hour sleep ethic", "/blog/modern-disaster-dated-practice-karoshi-japan/"),
        ("Ongoing Management: retained operational oversight", "/services/ongoing-management/"),
    ],
    "creative-collaboration-product-design-illustration": [
        ("visual brand strategy in Japan", "/blog/visual-brand-strategy-psychedelic-fashion-branding/"),
        ("visual identity strategy and branding in Japan", "/blog/visual-identity-strategy-branding-japan/"),
        ("when to stop DIY-ing your business infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
    ],
    "crm-japan-sme-why-deployments-fail": [
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
    ],
    "digital-business-card-japan-networking": [
        ("how to kill the fax in Japan businesses", "/blog/kill-the-fax-japan-business-migration/"),
        ("digital paradox in Japan: 6 ways to smash analog systems", "/blog/digital-paradox-analog-transformation/"),
        ("Infrastructure Build: redesign your digital stack", "/services/infrastructure-build/"),
    ],
    "digital-facade-japan-inc-mirage": [
        ("digital ghost: insolvency and the digital façade", "/blog/digital-ghost-insolvency-facade-japan/"),
        ("technology adoption in Japan fails at procurement", "/blog/technology-adoption-japan-systems-procurement/"),
        ("Stack Audit: see what's actually in your stack", "/services/stack-audit/"),
    ],
    "digital-ghost-insolvency-facade-japan": [
        ("the digital facade: Japan Inc. is a dangerous mirage", "/blog/digital-facade-japan-inc-mirage/"),
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("Stack Audit: map your full digital infrastructure", "/services/stack-audit/"),
    ],
    "digital-immigrants-agi-cognitive-labor": [
        ("AI hype cycle and Japanese tech startups", "/blog/ai-hype-cycle-japanese-tech-startups-innovation/"),
        ("AI misuse in Japan: fix with better reasoning", "/blog/ai-misuse-ai-in-japan-reasoning-guide/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "digital-literacy-crisis-japan-business": [
        ("digital paradox in Japan: 6 ways to smash analog systems", "/blog/digital-paradox-analog-transformation/"),
        ("digital skills and Japan's legacy systems", "/blog/digital-skills-japan-legacy-systems-workforce/"),
        ("Infrastructure Build: rebuild your digital stack from the ground up", "/services/infrastructure-build/"),
    ],
    "digital-paradox-analog-transformation": [
        ("how to kill the fax in Japan businesses", "/blog/kill-the-fax-japan-business-migration/"),
        ("digital literacy crisis in Japan business", "/blog/digital-literacy-crisis-japan-business/"),
        ("Stack Audit: identify the analog bottlenecks in your stack", "/services/stack-audit/"),
    ],
    "digital-skills-japan-legacy-systems-workforce": [
        ("technology adoption in Japan fails at procurement", "/blog/technology-adoption-japan-systems-procurement/"),
        ("digital literacy crisis in Japan business", "/blog/digital-literacy-crisis-japan-business/"),
        ("Infrastructure Build: replace legacy systems with working ones", "/services/infrastructure-build/"),
    ],
    "fall-corporate-japan-osaka-expo-2025": [
        ("Osaka Expo 2025: Japan's costly nostalgia", "/blog/osaka-expo-2025-japan-economic-stagnation/"),
        ("Stack Audit: build operational infrastructure that actually works", "/services/stack-audit/"),
    ],
    "foreign-labor-public-order-data-shift": [
        ("Japan's systemic labor shortfall: the 2040 collapse", "/blog/japan-systemic-labor-shortfall-collapse/"),
        ("Japanese society and foreign workers", "/blog/japanese-society-foreign-workers-consensus/"),
        ("zombie companies and tough business visas in Japan", "/blog/zombie-companies-japan-stifled-entrepreneurship/"),
    ],
    "fractional-it-management-japan-sme": [
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("Ongoing Management: what fractional oversight looks like in practice", "/services/ongoing-management/"),
    ],
    "fragmented-communication-tool-overload-etiquette": [
        ("Notion vs Backlog vs Linear for Japanese teams", "/blog/notion-vs-backlog-vs-linear-japan-teams/"),
        ("the hidden cost of SaaS sprawl", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("Stack Audit: audit your communication tool stack", "/services/stack-audit/"),
    ],
    "future-of-japan-2026-visible-shift": [
        ("Japan business execution 2026: operators destroy competition", "/blog/japan-business-execution-2026/"),
        ("Japan third cities and the frontier beyond Tokyo", "/blog/japan-third-cities-frontier-escape-tokyo/"),
        ("Stack Audit: position your operations for what's next", "/services/stack-audit/"),
    ],
    "heritage-crafts-artisan-decline-kogei": [
        ("artisan mindset and business growth", "/blog/artisan-mindset-business-growth-craftsmanship/"),
        ("Japan entrepreneurship and rural revitalization", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("Ongoing Management: infrastructure for cultural businesses", "/services/ongoing-management/"),
    ],
    "hidden-markets-japan-investor-insight-alpha": [
        ("Japan market and untapped investment value", "/blog/japan-market-untapped-value-investment/"),
        ("blue ocean market creation strategy", "/blog/blue-ocean-market-creation-strategy/"),
        ("Stack Audit: understand your operational foundation before you scale", "/services/stack-audit/"),
    ],
    "hollow-empire-japan-inc-visa-barrier": [
        ("Japan's systemic labor shortfall: the 2040 collapse", "/blog/japan-systemic-labor-shortfall-collapse/"),
        ("zombie companies and stifled entrepreneurship in Japan", "/blog/zombie-companies-japan-stifled-entrepreneurship/"),
        ("Japan's political paralysis and entrenched LDP factions", "/blog/japans-political-paralysis-entrenched-ldp-factions/"),
    ],
    "japan-agetech-strategy-fails-human-care": [
        ("Japan's systemic labor shortfall: the 2040 collapse", "/blog/japan-systemic-labor-shortfall-collapse/"),
        ("technology adoption in Japan fails at procurement", "/blog/technology-adoption-japan-systems-procurement/"),
        ("Infrastructure Build: sustainable operations over tech shortcuts", "/services/infrastructure-build/"),
    ],
    "japan-business-execution-2026": [
        ("future of Japan: why 2026 makes change visible", "/blog/future-of-japan-2026-visible-shift/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
        ("Ongoing Management: operational execution for Japan SMEs", "/services/ongoing-management/"),
    ],
    "japan-departure-tax-travel-policy-impact": [
        ("Japan dual pricing and the case for resident discounts", "/blog/japan-dual-pricing-resident-discounts/"),
        ("tourist behavior and Japan's cultural code", "/blog/tourist-behavior-japan-travel-kyoto/"),
        ("Japan Money Tracker: track expenses across currencies", "/tools/japan-money-tracker/"),
    ],
    "japan-dual-pricing-resident-discounts": [
        ("Japan departure tax and travel policy impact", "/blog/japan-departure-tax-travel-policy-impact/"),
        ("premium pricing in Japan: overcoming deflation", "/blog/premium-pricing-japan-overcoming-deflation-tourism/"),
        ("Japan Money Tracker: multi-currency expense tracking", "/tools/japan-money-tracker/"),
    ],
    "japan-economic-stagnation-toxic-culture-sanseito": [
        ("fall of corporate Japan and Osaka Expo 2025", "/blog/fall-corporate-japan-osaka-expo-2025/"),
        ("zombie companies and stifled entrepreneurship in Japan", "/blog/zombie-companies-japan-stifled-entrepreneurship/"),
    ],
    "japan-entrepreneurship-rural-revitalization-akiya": [
        ("Aizu strategy: 5 steps to awesome cultural assets", "/blog/aizu-strategy-rural-japan-blueprint/"),
        ("rural revitalization Japan and SoftBank investment", "/blog/rural-revitalization-japan-softbank-investment/"),
        ("Stack Audit: build a foundation for your Japan venture", "/services/stack-audit/"),
    ],
    "japan-market-untapped-value-investment": [
        ("hidden markets and Japan's investor alpha", "/blog/hidden-markets-japan-investor-insight-alpha/"),
        ("blue ocean market creation strategy", "/blog/blue-ocean-market-creation-strategy/"),
        ("Stack Audit: understand the operational landscape before investing", "/services/stack-audit/"),
    ],
    "japan-national-brand-paradox-cool-japan-inc": [
        ("the digital facade: Japan Inc. is a dangerous mirage", "/blog/digital-facade-japan-inc-mirage/"),
        ("systemic failure in Japan: need for a global mindset", "/blog/systemic-failure-japan-global-mindset-modernity/"),
        ("Japan business execution 2026", "/blog/japan-business-execution-2026/"),
    ],
    "japan-post-scandal-logistics-safety-accountability": [
        ("shared systems and why Japan's business model is failing", "/blog/shared-systems-japan-business-failure/"),
        ("technology adoption in Japan fails at procurement", "/blog/technology-adoption-japan-systems-procurement/"),
        ("Infrastructure Build: replace broken systems with accountable ones", "/services/infrastructure-build/"),
    ],
    "japan-sme-tech-stack-2026": [
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
        ("Stack Audit: get a comprehensive picture of your stack", "/services/stack-audit/"),
    ],
    "japan-systemic-labor-shortfall-collapse": [
        ("hollow empire and Japan Inc.'s visa barrier", "/blog/hollow-empire-japan-inc-visa-barrier/"),
        ("Japan agetech strategy fails human care", "/blog/japan-agetech-strategy-fails-human-care/"),
        ("Infrastructure Build: build with what you actually have", "/services/infrastructure-build/"),
    ],
    "japan-technology-ai-copyright-innovation": [
        ("AI hype cycle and Japanese tech startups", "/blog/ai-hype-cycle-japanese-tech-startups-innovation/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "japan-third-cities-frontier-escape-tokyo": [
        ("Aizu strategy: 5 steps to awesome cultural assets", "/blog/aizu-strategy-rural-japan-blueprint/"),
        ("Japan entrepreneurship and akiya success", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("Stack Audit: right-size your operations for a regional base", "/services/stack-audit/"),
    ],
    "japanese-business-culture-disorganized-approach": [
        ("Japanese leadership culture and the concept of Wa", "/blog/japanese-leadership-culture-wa/"),
        ("digital literacy crisis in Japan business", "/blog/digital-literacy-crisis-japan-business/"),
        ("Ongoing Management: bring operational discipline to your team", "/services/ongoing-management/"),
    ],
    "japanese-event-promotion-event-seo-strategy": [
        ("modern event management vs outdated logistics", "/blog/modern-event-management-outdated-event-logistics/"),
        ("fragmented communication and tool overload in Japan", "/blog/fragmented-communication-tool-overload-etiquette/"),
        ("RedditReach: organic audience growth for Japan events", "/tools/redditreach/"),
    ],
    "japanese-jesus-shingo-legend-folklore-disruption": [
        ("Aizu strategy: 5 steps to awesome cultural assets", "/blog/aizu-strategy-rural-japan-blueprint/"),
        ("Japan entrepreneurship and rural revitalization", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("rural revitalization Japan and SoftBank investment", "/blog/rural-revitalization-japan-softbank-investment/"),
    ],
    "japanese-kawaii-culture-reclaiming-lost-childhood": [
        ("Japan national brand paradox", "/blog/japan-national-brand-paradox-cool-japan-inc/"),
        ("visual brand strategy: psychedelic branding", "/blog/visual-brand-strategy-psychedelic-fashion-branding/"),
    ],
    "japanese-leadership-culture-wa": [
        ("corporate training programs for Japanese leadership", "/blog/corporate-training-programs-japanese-leadership/"),
        ("Japanese business culture's disorganized approach", "/blog/japanese-business-culture-disorganized-approach/"),
        ("Ongoing Management: operational structure for Japan teams", "/services/ongoing-management/"),
    ],
    "japanese-society-foreign-workers-consensus": [
        ("foreign labor data: 60% oppose active entry", "/blog/foreign-labor-public-order-data-shift/"),
        ("Japan's systemic labor shortfall: the 2040 collapse", "/blog/japan-systemic-labor-shortfall-collapse/"),
        ("hollow empire and Japan Inc.'s visa barrier", "/blog/hollow-empire-japan-inc-visa-barrier/"),
    ],
    "japanese-tech-accelerators-digital-infra-audits": [
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
        ("Stack Audit: what a real infrastructure audit looks like", "/services/stack-audit/"),
    ],
    "japans-political-paralysis-entrenched-ldp-factions": [
        ("Japan's political paralysis: a call for national vision", "/blog/japans-political-paralysis/"),
        ("hollow empire and Japan Inc.'s visa barrier", "/blog/hollow-empire-japan-inc-visa-barrier/"),
    ],
    "japans-political-paralysis": [
        ("Japan's political paralysis: entrenched LDP factions", "/blog/japans-political-paralysis-entrenched-ldp-factions/"),
        ("Japan economic stagnation and toxic culture", "/blog/japan-economic-stagnation-toxic-culture-sanseito/"),
        ("zombie companies and stifled entrepreneurship in Japan", "/blog/zombie-companies-japan-stifled-entrepreneurship/"),
    ],
    "kill-the-fax-japan-business-migration": [
        ("digital paradox in Japan: 6 ways to smash analog systems", "/blog/digital-paradox-analog-transformation/"),
        ("technology adoption in Japan fails at procurement", "/blog/technology-adoption-japan-systems-procurement/"),
        ("Infrastructure Build: replace paper workflows with digital ones", "/services/infrastructure-build/"),
    ],
    "local-business-strategy-japan-execution-shonan": [
        ("Japan third cities and the frontier beyond Tokyo", "/blog/japan-third-cities-frontier-escape-tokyo/"),
        ("Japan entrepreneurship and rural revitalization", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("Stack Audit: build the right foundation for local operations", "/services/stack-audit/"),
    ],
    "modern-disaster-dated-practice-karoshi-japan": [
        ("Japanese leadership culture and the concept of Wa", "/blog/japanese-leadership-culture-wa/"),
        ("Japanese business culture's disorganized approach", "/blog/japanese-business-culture-disorganized-approach/"),
        ("Ongoing Management: sustainable operations without burnout", "/services/ongoing-management/"),
    ],
    "modern-event-management-outdated-event-logistics": [
        ("Japanese event promotion and SEO strategy", "/blog/japanese-event-promotion-event-seo-strategy/"),
        ("fragmented communication and tool overload in Japan", "/blog/fragmented-communication-tool-overload-etiquette/"),
        ("Infrastructure Build: replace outdated event logistics with modern systems", "/services/infrastructure-build/"),
    ],
    "notion-vs-backlog-vs-linear-japan-teams": [
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("Stack Audit: pick tools that actually fit your team", "/services/stack-audit/"),
    ],
    "openai-ecosystem-chatgpt-integration-japan": [
        ("ChatGPT 5 review from the trenches", "/blog/chatgpt5-review-from-the-trenches/"),
        ("AI hype cycle and Japanese tech startups", "/blog/ai-hype-cycle-japanese-tech-startups-innovation/"),
        ("TetsuClaw: AI work OS for operators in Japan", "/tools/tetsuno-claw/"),
    ],
    "osaka-expo-2025-japan-economic-stagnation": [
        ("fall of corporate Japan and Osaka Expo 2025 innovation", "/blog/fall-corporate-japan-osaka-expo-2025/"),
        ("Japan economic stagnation and toxic culture", "/blog/japan-economic-stagnation-toxic-culture-sanseito/"),
        ("Japan business execution 2026", "/blog/japan-business-execution-2026/"),
    ],
    "overcome-sunk-cost-fallacy-business-focus": [
        ("blue ocean market creation strategy", "/blog/blue-ocean-market-creation-strategy/"),
        ("when to stop DIY-ing your infrastructure: a Japan SME checklist", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
        ("Stack Audit: cut what's not working", "/services/stack-audit/"),
    ],
    "premium-pricing-japan-overcoming-deflation-tourism": [
        ("Japan dual pricing and the case for resident discounts", "/blog/japan-dual-pricing-resident-discounts/"),
        ("service pricing: 3 ways to build client trust", "/blog/service-pricing-client-trust-confidence/"),
        ("Stack Audit: build operations that support premium positioning", "/services/stack-audit/"),
    ],
    "prime-minister-sanae-takaichi-heavy-metal-japan": [
        ("Japan's political paralysis: entrenched LDP factions", "/blog/japans-political-paralysis-entrenched-ldp-factions/"),
        ("Japan economic stagnation and toxic culture", "/blog/japan-economic-stagnation-toxic-culture-sanseito/"),
        ("Japan national brand paradox", "/blog/japan-national-brand-paradox-cool-japan-inc/"),
    ],
    "professional-communication-breakdown-effective-workflow": [
        ("fragmented communication and tool overload in Japan", "/blog/fragmented-communication-tool-overload-etiquette/"),
        ("scheduling emails and workplace boundaries", "/blog/scheduling-emails-workplace-boundaries-communication/"),
        ("Ongoing Management: operational communication structure", "/services/ongoing-management/"),
    ],
    "regional-revitalization-japan": [
        ("Aizu strategy: 5 steps to awesome cultural assets", "/blog/aizu-strategy-rural-japan-blueprint/"),
        ("Japan entrepreneurship and akiya success", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("Stack Audit: infrastructure for regional operators", "/services/stack-audit/"),
    ],
    "revolutionary-toto-washlet-strategy-japanese-purity": [
        ("Japan national brand paradox", "/blog/japan-national-brand-paradox-cool-japan-inc/"),
        ("Japanese kawaii culture: reclaiming lost childhood", "/blog/japanese-kawaii-culture-reclaiming-lost-childhood/"),
        ("visual brand strategy: psychedelic branding", "/blog/visual-brand-strategy-psychedelic-fashion-branding/"),
    ],
    "rural-revitalization-japan-softbank-investment": [
        ("Aizu strategy: 5 steps to awesome cultural assets", "/blog/aizu-strategy-rural-japan-blueprint/"),
        ("Japan entrepreneurship and akiya success", "/blog/japan-entrepreneurship-rural-revitalization-akiya/"),
        ("Infrastructure Build: infrastructure for rural ventures", "/services/infrastructure-build/"),
    ],
    "saas-sprawl-japan-sme-overpaying": [
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
    ],
    "salary-transparency-hiring-process-recruitment": [
        ("Japanese business culture's disorganized approach", "/blog/japanese-business-culture-disorganized-approach/"),
        ("Ongoing Management: operational HR support for Japan SMEs", "/services/ongoing-management/"),
    ],
    "scheduling-emails-workplace-boundaries-communication": [
        ("fragmented communication and tool overload in Japan", "/blog/fragmented-communication-tool-overload-etiquette/"),
        ("professional communication breakdown: 5 tips", "/blog/professional-communication-breakdown-effective-workflow/"),
        ("Ongoing Management: build a communication structure that works", "/services/ongoing-management/"),
    ],
    "service-pricing-client-trust-confidence": [
        ("salary transparency and a powerful hiring process", "/blog/salary-transparency-hiring-process-recruitment/"),
        ("when to stop DIY-ing your infrastructure", "/blog/stop-diying-infrastructure-japan-sme-checklist/"),
        ("Stack Audit: understand the value before you price it", "/services/stack-audit/"),
    ],
    "shared-systems-japan-business-failure": [
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("Infrastructure Build: replace fragmented infrastructure with shared systems", "/services/infrastructure-build/"),
    ],
    "stop-diying-infrastructure-japan-sme-checklist": [
        ("what fractional IT management means for a 10-person business", "/blog/fractional-it-management-japan-sme/"),
        ("the hidden cost of SaaS sprawl for Japan SMEs", "/blog/saas-sprawl-japan-sme-overpaying/"),
        ("Stack Audit: the right first step for most businesses", "/services/stack-audit/"),
    ],
    "systemic-failure-japan-global-mindset-modernity": [
        ("Japan national brand paradox", "/blog/japan-national-brand-paradox-cool-japan-inc/"),
        ("hollow empire and Japan Inc.'s visa barrier", "/blog/hollow-empire-japan-inc-visa-barrier/"),
        ("Japan business execution 2026: operators destroy competition", "/blog/japan-business-execution-2026/"),
    ],
    "technology-adoption-japan-systems-procurement": [
        ("what a healthy Japan SME tech stack looks like", "/blog/japan-sme-tech-stack-2026/"),
        ("digital literacy crisis in Japan business", "/blog/digital-literacy-crisis-japan-business/"),
        ("Stack Audit: assess your technology adoption reality", "/services/stack-audit/"),
    ],
    "tokyo-business-curation-startup-lady": [
        ("Tokyo business mindset and strategic agility", "/blog/tokyo-business-mindset-strategic-agility-leadership/"),
        ("Japan business execution 2026", "/blog/japan-business-execution-2026/"),
        ("Stack Audit: build operations that support a curated approach", "/services/stack-audit/"),
    ],
    "tokyo-business-mindset-strategic-agility-leadership": [
        ("Japan business execution 2026: operators destroy competition", "/blog/japan-business-execution-2026/"),
        ("Tokyo business curation and the startup lady effect", "/blog/tokyo-business-curation-startup-lady/"),
        ("Ongoing Management: strategic operations for Tokyo-based operators", "/services/ongoing-management/"),
    ],
    "tourist-behavior-japan-travel-kyoto": [
        ("Japan dual pricing and the case for resident discounts", "/blog/japan-dual-pricing-resident-discounts/"),
        ("Japan departure tax and travel policy", "/blog/japan-departure-tax-travel-policy-impact/"),
        ("Japan Money Tracker: multi-currency expense tracking for Japan", "/tools/japan-money-tracker/"),
    ],
    "us-tariff-exemption-japan-shipping-opportunity": [
        ("Japan market and untapped investment value", "/blog/japan-market-untapped-value-investment/"),
        ("Japan business execution 2026: operators destroy competition", "/blog/japan-business-execution-2026/"),
        ("Stack Audit: operational readiness for new market conditions", "/services/stack-audit/"),
    ],
    "visceral-experience-winter-nights-december-21st": [
        ("Chigasaki beach event: fire and fermentation", "/blog/chigasaki-beach-event-wild-food-experience/"),
        ("RedditReach: organic growth for event communities", "/tools/redditreach/"),
    ],
    "visual-brand-strategy-psychedelic-fashion-branding": [
        ("visual identity strategy and branding in Japan", "/blog/visual-identity-strategy-branding-japan/"),
        ("creative collaboration in product design and illustration", "/blog/creative-collaboration-product-design-illustration/"),
        ("Stack Audit: build brand operations that compound", "/services/stack-audit/"),
    ],
    "visual-identity-strategy-branding-japan": [
        ("visual brand strategy: psychedelic branding", "/blog/visual-brand-strategy-psychedelic-fashion-branding/"),
        ("creative collaboration in product design and illustration", "/blog/creative-collaboration-product-design-illustration/"),
        ("Ongoing Management: brand operations that run themselves", "/services/ongoing-management/"),
    ],
    "zombie-companies-japan-stifled-entrepreneurship": [
        ("hollow empire and Japan Inc.'s visa barrier", "/blog/hollow-empire-japan-inc-visa-barrier/"),
        ("Japan economic stagnation and toxic culture", "/blog/japan-economic-stagnation-toxic-culture-sanseito/"),
        ("Stack Audit: build operations that outlast the zombie cohort", "/services/stack-audit/"),
    ],
}


def count_internal_links(content: str) -> int:
    # Count links pointing to mkultraman.com paths (absolute or root-relative)
    absolute = len(re.findall(r'https?://(?:www\.)?mkultraman\.com/', content))
    # Root-relative links like (/blog/, /services/, /tools/, /contact, /about)
    root_relative = len(re.findall(r'\]\(/(blog|services|tools|contact|about|guides|compare)[^)]*\)', content))
    return absolute + root_relative


def build_footer(links: list) -> str:
    link_parts = " · ".join(f"[{anchor}]({url})" for anchor, url in links)
    return f"\n---\n\n*Further reading: {link_parts}*\n"


def process_post(path: Path, links_to_add: list) -> bool:
    content = path.read_text(encoding="utf-8")
    existing = count_internal_links(content)

    if existing >= 3:
        print(f"  SKIP {path.name} ({existing} links already)")
        return False

    # Determine how many links we actually need to hit 3 total
    needed = max(0, 3 - existing)
    links = links_to_add[:needed]

    if not links:
        return False

    # Check if this post already has a footer we added (idempotency)
    if "Further reading:" in content:
        print(f"  SKIP {path.name} (footer already present)")
        return False

    footer = build_footer(links)
    # Strip any trailing whitespace before appending
    new_content = content.rstrip() + "\n" + footer
    path.write_text(new_content, encoding="utf-8")
    print(f"  ADDED {path.name} (+{len(links)} links, was {existing})")
    return True


def main():
    changed = 0
    skipped = 0
    missing = 0

    for slug, links in LINK_MAP.items():
        path = BLOG_DIR / f"{slug}.md"
        if not path.exists():
            print(f"  MISSING {slug}.md")
            missing += 1
            continue
        if process_post(path, links):
            changed += 1
        else:
            skipped += 1

    # Report on any posts not in the map
    all_posts = set(p.stem for p in BLOG_DIR.glob("*.md"))
    mapped_posts = set(LINK_MAP.keys())
    unmapped = all_posts - mapped_posts
    if unmapped:
        print(f"\nUnmapped posts ({len(unmapped)}):")
        for s in sorted(unmapped):
            print(f"  {s}")

    print(f"\nDone: {changed} updated, {skipped} skipped, {missing} missing")


if __name__ == "__main__":
    main()
