export type ToolCategory =
  | 'Productivity'
  | 'AI & LLMs'
  | 'AI Creative'
  | 'Dev & Infra'
  | 'Web & Publishing'
  | 'Communication'
  | 'Design & Assets'
  | 'Finance & Payments'
  | 'Social & Content'
  | 'Browser & Privacy'
  | 'Events & Marketing'
  | 'Music & Audio'
  | 'Video'
  | 'Crypto'
  | 'Other';

export interface OperatorPick {
  name: string;
  category: ToolCategory;
  url: string;
  operatorTake: string;
  /** true = has a public referral or affiliate program */
  hasReferral: boolean;
  /** Your personal referral URL : fill in from your account dashboard */
  referralUrl: string | null;
  /** Where to generate your referral link */
  referralSignupUrl: string | null;
}

export const operatorPicks: OperatorPick[] = [

  // ─── Productivity ───────────────────────────────────────────────────────────
  {
    name: 'Calendly',
    category: 'Productivity',
    url: 'https://calendly.com',
    operatorTake: 'The booking link that kills 80% of back-and-forth scheduling. I run every inbound call through it. Non-negotiable for any service business.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://calendly.com/referral',
  },
  {
    name: 'Google Workspace',
    category: 'Productivity',
    url: 'https://workspace.google.com',
    operatorTake: 'The default infrastructure layer : email, docs, Drive, Meet. Not exciting, but the switching cost away from it is real. Worth paying for.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://workspace.google.com/referral',
  },
  {
    name: 'Notion',
    category: 'Productivity',
    url: 'https://notion.so',
    operatorTake: 'My operating system for client work, SOPs, notes, and project tracking. The all-in-one pitch is real for solo operators. Gets messy at team scale.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://www.notion.so/referral',
  },
  {
    name: 'Airtable',
    category: 'Productivity',
    url: 'https://airtable.com',
    operatorTake: 'When Notion\'s database hits its limits : relational data, linked records, serious filtering. I use it for anything that starts feeling like a real database.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://airtable.com/affiliate',
  },
  {
    name: 'Dropbox',
    category: 'Productivity',
    url: 'https://dropbox.com',
    operatorTake: 'Still the most reliable file sync across devices, especially on Mac. Google Drive is fine but Dropbox\'s desktop integration is cleaner.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://www.dropbox.com/referrals',
  },
  {
    name: 'Spark Email',
    category: 'Productivity',
    url: 'https://sparkmailapp.com',
    operatorTake: 'Best email client on Mac/iOS for prioritized inbox management. The AI triage and snooze functions actually change how you handle email volume.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── AI & LLMs ──────────────────────────────────────────────────────────────
  {
    name: 'Claude (Anthropic)',
    category: 'AI & LLMs',
    url: 'https://claude.ai',
    operatorTake: 'My primary AI for writing, reasoning, and code. Better than GPT for long documents and nuanced editorial judgment. This site was built largely with it.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'ChatGPT (OpenAI)',
    category: 'AI & LLMs',
    url: 'https://chatgpt.com',
    operatorTake: 'Still essential for its breadth of integrations and plugins. GPT-4o is a strong generalist. I use it when I need image analysis or voice mode.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Gemini (Google)',
    category: 'AI & LLMs',
    url: 'https://gemini.google.com',
    operatorTake: 'Best for anything that lives in the Google ecosystem : summarizing Drive docs, Gmail triage, YouTube transcripts. Context window is a genuine edge.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Perplexity',
    category: 'AI & LLMs',
    url: 'https://perplexity.ai',
    operatorTake: 'The AI search engine that replaced my default Google searches. Cited sources, real-time data, no SEO slop. Pro tier is worth it for research-heavy work.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://perplexity.ai/settings/referrals',
  },
  {
    name: 'Locally AI',
    category: 'AI & LLMs',
    url: 'https://localai.io',
    operatorTake: 'For running local LLMs on-device : anything sensitive that shouldn\'t touch a cloud API. Slower, but private by definition.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Codex (OpenAI)',
    category: 'AI & LLMs',
    url: 'https://openai.com/codex',
    operatorTake: 'AI coding agent that handles multi-step tasks in a sandboxed environment. Useful when I want to run parallel tasks without context-switching.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── AI Creative ────────────────────────────────────────────────────────────
  {
    name: 'Canva',
    category: 'AI Creative',
    url: 'https://canva.com',
    operatorTake: 'The default for fast client-facing design : presentations, social assets, PDFs. AI background removal and Magic Studio are genuinely time-saving. Pro is essential.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://www.canva.com/affiliates',
  },
  {
    name: 'Runway ML',
    category: 'AI Creative',
    url: 'https://runwayml.com',
    operatorTake: 'AI video generation and editing. Best-in-class for motion content, background replacement, and generating b-roll. The gap between this and traditional video tools is closing fast.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'CapCut',
    category: 'AI Creative',
    url: 'https://capcut.com',
    operatorTake: 'Fast, free video editor with solid AI auto-caption and subtitle tools. The Japanese auto-caption quality is surprisingly good. Mobile-first but desktop works too.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'iMovie',
    category: 'AI Creative',
    url: 'https://apple.com/imovie',
    operatorTake: 'Still the fastest path from raw footage to a polished cut on Mac. No learning curve, no subscription. Underrated for simple talking-head content.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Scaniverse',
    category: 'AI Creative',
    url: 'https://scaniverse.com',
    operatorTake: '3D scanning on iPhone : useful for spatial documentation, product mockups, and anything where a photo doesn\'t capture the full object. Free and surprisingly accurate.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Dev & Infra ────────────────────────────────────────────────────────────
  {
    name: 'VS Code',
    category: 'Dev & Infra',
    url: 'https://code.visualstudio.com',
    operatorTake: 'The editor. Doesn\'t need a pitch. Free, fast, and every AI coding tool integrates with it first.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'GitHub',
    category: 'Dev & Infra',
    url: 'https://github.com',
    operatorTake: 'Where all code lives. Actions for CI/CD, Copilot for in-editor completion, and the default assumption for any open-source project.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'GitLab',
    category: 'Dev & Infra',
    url: 'https://gitlab.com',
    operatorTake: 'For clients who need self-hosted or prefer the all-in-one CI/CD pipeline model. More opinionated than GitHub but complete.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Docker',
    category: 'Dev & Infra',
    url: 'https://docker.com',
    operatorTake: 'The container layer that makes local dev match production. Painful to set up the first time, essential every time after. Desktop app makes it accessible.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Vercel',
    category: 'Dev & Infra',
    url: 'https://vercel.com',
    operatorTake: 'Where this site lives. Zero-config deploys from GitHub, edge CDN, instant preview URLs per branch. The best developer experience in frontend hosting.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Supabase',
    category: 'Dev & Infra',
    url: 'https://supabase.com',
    operatorTake: 'Postgres with a REST API, auth, storage, and realtime baked in. The open-source Firebase alternative that actually lets you own your data. My default backend for new projects.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Resend',
    category: 'Dev & Infra',
    url: 'https://resend.com',
    operatorTake: 'Transactional email API with a developer-first DX. Cleaner than SendGrid, cheaper than Postmark at low volume. The React Email integration is excellent.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Web & Publishing ───────────────────────────────────────────────────────
  {
    name: 'Substack',
    category: 'Web & Publishing',
    url: 'https://substack.com',
    operatorTake: 'For email-first publishing with a built-in distribution network. The discovery engine is real. Better than a self-hosted newsletter for early-stage audience building.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'WordPress',
    category: 'Web & Publishing',
    url: 'https://wordpress.org',
    operatorTake: 'Still powers most of the web for a reason. For clients with content-heavy sites, plugin ecosystems, or long-term ownership requirements, WP + managed hosting is the safest long-term bet.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Webflow',
    category: 'Web & Publishing',
    url: 'https://webflow.com',
    operatorTake: 'The best no-code CMS for design-forward sites that need real customization. Faster than WP for visual work, more control than Squarespace. CMS Collections are underrated.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://webflow.com/affiliates',
  },
  {
    name: 'Squarespace',
    category: 'Web & Publishing',
    url: 'https://squarespace.com',
    operatorTake: 'The honest recommendation for non-technical clients who need to self-manage a presentable site. Not for developers, but that\'s the point. Templates are genuinely good.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://www.squarespace.com/affiliates',
  },
  {
    name: 'Framer',
    category: 'Web & Publishing',
    url: 'https://framer.com',
    operatorTake: 'The fastest path from design to live site for landing pages. Component-based, responsive by default, and the AI-generated page drafts are a real accelerator.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://www.framer.com/affiliates',
  },
  {
    name: 'Namecheap',
    category: 'Web & Publishing',
    url: 'https://namecheap.com',
    operatorTake: 'Where I register all domains. Cheaper than GoDaddy, cleaner interface, no dark-pattern upsells. Free WHOIS privacy on every domain.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://www.namecheap.com/affiliates',
  },

  // ─── Communication ──────────────────────────────────────────────────────────
  {
    name: 'Slack',
    category: 'Communication',
    url: 'https://slack.com',
    operatorTake: 'The default for English-speaking distributed teams. Still the best-in-class async chat experience despite the bloat. Channels + threads model works.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Discord',
    category: 'Communication',
    url: 'https://discord.com',
    operatorTake: 'For communities, not companies. I use it for builder communities, interest groups, and anything that benefits from an always-on voice channel culture.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Signal',
    category: 'Communication',
    url: 'https://signal.org',
    operatorTake: 'The gold standard for private messaging. E2E encrypted by default, open source, no ads. Recommend to any client handling sensitive business communication.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'WhatsApp',
    category: 'Communication',
    url: 'https://whatsapp.com',
    operatorTake: 'Still the dominant messaging layer for international business outside Japan. If you\'re dealing with Southeast Asia, Middle East, or Europe, this is where they are.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Telegram',
    category: 'Communication',
    url: 'https://telegram.org',
    operatorTake: 'For broadcast channels, crypto-adjacent communities, and anyone who ran away from WhatsApp. Good bots, huge file size limits, fast.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Matrix',
    category: 'Communication',
    url: 'https://matrix.org',
    operatorTake: 'Federated, open-source, self-hostable messaging. The technical ceiling to Slack/Discord. Not for everyone, but the right answer when you need infrastructure you own.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Rebtel',
    category: 'Communication',
    url: 'https://rebtel.com',
    operatorTake: 'International calling without the roaming bills. Useful when calling Japanese landlines and mobiles from overseas : and for clients who still get faxes.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Design & Assets ────────────────────────────────────────────────────────
  {
    name: 'Unsplash',
    category: 'Design & Assets',
    url: 'https://unsplash.com',
    operatorTake: 'Free, high-quality photography with a permissive license. My first stop for blog cover images and presentation assets before considering paid stock.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Coolors',
    category: 'Design & Assets',
    url: 'https://coolors.co',
    operatorTake: 'The fastest palette generator when you need a color system quickly. Lock a brand color, generate the rest. Free tier is sufficient for most work.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Finance & Payments ─────────────────────────────────────────────────────
  {
    name: 'Stripe',
    category: 'Finance & Payments',
    url: 'https://stripe.com',
    operatorTake: 'The payment layer for every digital product and service I run. The best developer experience in payments, full stop. If you\'re building anything that takes money, start here.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Wise',
    category: 'Finance & Payments',
    url: 'https://wise.com',
    operatorTake: 'International transfers at mid-market exchange rate with transparent fees. Essential for foreign founders in Japan moving money between JPY and USD/EUR. Killed my SWIFT wire habit.',
    hasReferral: true,
    referralUrl: 'https://wise.com/invite/dic/matthewk1771',
    referralSignupUrl: 'https://wise.com/invite',
  },
  {
    name: 'Moneytree',
    category: 'Finance & Payments',
    url: 'https://moneytree.jp',
    operatorTake: 'The cleanest Japanese bank aggregation app : syncs all your Japanese accounts, credit cards, and securities in one place. Better Japanese institution coverage than any foreign alternative.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Ledger',
    category: 'Finance & Payments',
    url: 'https://ledger.com',
    operatorTake: 'Hardware wallet for cold crypto storage. If you hold meaningful crypto, software wallets are not sufficient. The Nano X has been reliable for years.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://shop.ledger.com/affiliates',
  },
  {
    name: 'MetaMask',
    category: 'Finance & Payments',
    url: 'https://metamask.io',
    operatorTake: 'The standard browser wallet for Ethereum and EVM chains. Use for web3 app interactions : not for long-term storage. Keep the bulk on Ledger.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Social & Content ───────────────────────────────────────────────────────
  {
    name: 'Instagram',
    category: 'Social & Content',
    url: 'https://instagram.com',
    operatorTake: 'Still the primary visual platform for Japan lifestyle and event content. Reels have real organic reach; Stories are for retention. Worth the algorithm game.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'LinkedIn',
    category: 'Social & Content',
    url: 'https://linkedin.com',
    operatorTake: 'The B2B distribution channel that punches above its weight in Japan. Organic reach on long-form posts is better than almost any other platform right now.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Reddit',
    category: 'Social & Content',
    url: 'https://reddit.com',
    operatorTake: 'The highest-trust research and community platform for English-speaking expats in Japan. r/japanlife, r/movingtojapan, r/JapanFinance are essential listening posts.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'YouTube',
    category: 'Social & Content',
    url: 'https://youtube.com',
    operatorTake: 'The second largest search engine and the most powerful long-form trust-builder. Japan-market content in English is underserved. High ROI for anyone willing to publish consistently.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Facebook',
    category: 'Social & Content',
    url: 'https://facebook.com',
    operatorTake: 'Still dominant for expat community groups and event promotion in Japan. The organic reach is terrible on pages, but expat groups remain highly active.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Browser & Privacy ──────────────────────────────────────────────────────
  {
    name: 'Brave Browser',
    category: 'Browser & Privacy',
    url: 'https://brave.com',
    operatorTake: 'My daily driver. Chromium-based (all extensions work), built-in ad blocking, and no Google telemetry. The BAT rewards program is a bonus. Faster than Chrome on any hardware.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://brave.com/refer',
  },
  {
    name: 'Tor Browser',
    category: 'Browser & Privacy',
    url: 'https://torproject.org',
    operatorTake: 'For research that needs genuine anonymity : checking how Japanese geo-restricted content appears, researching competitors without leaving traces, or high-sensitivity work.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Events & Marketing ─────────────────────────────────────────────────────
  {
    name: 'Luma',
    category: 'Events & Marketing',
    url: 'https://lu.ma',
    operatorTake: 'The cleanest event management tool I\'ve used : beautiful event pages, email reminders, waitlists, and calendar integrations. Replaced Eventbrite entirely for my events. Free tier is generous.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://lu.ma/referral',
  },
  {
    name: 'Mailchimp',
    category: 'Events & Marketing',
    url: 'https://mailchimp.com',
    operatorTake: 'For list-based email marketing to larger audiences. The free tier at 500 contacts is enough to start. Automation workflows and segmentation work well. Gets expensive fast at scale.',
    hasReferral: true,
    referralUrl: null,
    referralSignupUrl: 'https://mailchimp.com/affiliates',
  },

  // ─── Music & Audio ──────────────────────────────────────────────────────────
  {
    name: 'Spotify',
    category: 'Music & Audio',
    url: 'https://spotify.com',
    operatorTake: 'Default music and podcast layer. The algorithm for discovery is still the best. Japanese-market catalog has improved significantly. Podcast distribution is worth using.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'SoundCloud',
    category: 'Music & Audio',
    url: 'https://soundcloud.com',
    operatorTake: 'For independent music distribution and discovery outside the major platforms. Still the best for electronic music communities and direct artist-fan connection without gatekeeping.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
  {
    name: 'Bandcamp',
    category: 'Music & Audio',
    url: 'https://bandcamp.com',
    operatorTake: 'The artist-first music platform : fans pay what they want, artists keep the majority. Essential for independent releases where direct ownership matters more than stream counts.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },

  // ─── Other ──────────────────────────────────────────────────────────────────
  {
    name: 'TestFlight',
    category: 'Other',
    url: 'https://developer.apple.com/testflight',
    operatorTake: 'Apple\'s beta distribution platform. Mandatory for iOS app testing. No friction for beta users : invite by email, install directly. The closest thing to effortless mobile QA.',
    hasReferral: false,
    referralUrl: null,
    referralSignupUrl: null,
  },
];

/** All tools that have a referral program set up */
export const toolsWithReferrals = operatorPicks.filter(t => t.hasReferral);

/** Tools grouped by category */
export const picksByCategory = operatorPicks.reduce<Record<ToolCategory, OperatorPick[]>>(
  (acc, pick) => {
    if (!acc[pick.category]) acc[pick.category] = [];
    acc[pick.category].push(pick);
    return acc;
  },
  {} as Record<ToolCategory, OperatorPick[]>
);
