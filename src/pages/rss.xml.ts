import type { APIContext } from 'astro';
import { getCollection } from 'astro:content';

const SITE = 'https://www.mkultraman.com';
const TITLE = 'MKUltraman — Japan SME Digital Infrastructure';
const DESCRIPTION =
  'Field notes on digital infrastructure, business strategy, and market dynamics in Japan. Written by Matt Ketchum from Tokyo.';

function escapeXml(s: string): string {
  return s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&apos;');
}

export async function GET(_context: APIContext): Promise<Response> {
  const posts = await getCollection('blog');
  const sorted = posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
    .slice(0, 50);

  const lastBuildDate = sorted[0]?.data.pubDate?.toUTCString() ?? new Date().toUTCString();

  const items = sorted
    .map((post) => {
      const url = `${SITE}/blog/${post.id}/`;
      const pubDate = post.data.pubDate.toUTCString();
      const title = escapeXml(post.data.title);
      const description = escapeXml(post.data.description);
      const categories = (post.data.tags ?? [])
        .map((t: string) => `    <category>${escapeXml(t)}</category>`)
        .join('\n');

      return `  <item>
    <title>${title}</title>
    <link>${url}</link>
    <guid isPermaLink="true">${url}</guid>
    <description>${description}</description>
    <pubDate>${pubDate}</pubDate>
    <author>hello@mkultraman.com (Matt Ketchum)</author>
${categories}
  </item>`;
    })
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
<channel>
  <title>${escapeXml(TITLE)}</title>
  <link>${SITE}/</link>
  <description>${escapeXml(DESCRIPTION)}</description>
  <language>en</language>
  <copyright>Matt Ketchum (MKUltraman). All rights reserved.</copyright>
  <lastBuildDate>${lastBuildDate}</lastBuildDate>
  <atom:link href="${SITE}/rss.xml" rel="self" type="application/rss+xml" />
${items}
</channel>
</rss>`;

  return new Response(xml, {
    status: 200,
    headers: {
      'Content-Type': 'application/rss+xml; charset=utf-8',
      'Cache-Control': 'public, max-age=3600, s-maxage=3600',
    },
  });
}
