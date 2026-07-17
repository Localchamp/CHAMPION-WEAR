import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://championwear.com';

  const urls = [
    { loc: baseUrl, changefreq: 'daily', priority: '1.0' },
    { loc: `${baseUrl}/shop`, changefreq: 'daily', priority: '0.9' },
    { loc: `${baseUrl}/shop?category=men`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/shop?category=women`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/shop?category=shoes`, changefreq: 'weekly', priority: '0.8' },
    { loc: `${baseUrl}/shop?category=accessories`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/shop?category=sportswear`, changefreq: 'weekly', priority: '0.7' },
    { loc: `${baseUrl}/about`, changefreq: 'monthly', priority: '0.5' },
    { loc: `${baseUrl}/contact`, changefreq: 'monthly', priority: '0.5' },
  ];

  const lastmod = new Date().toISOString();
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls.map(u => `  <url>
    <loc>${u.loc}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${u.changefreq}</changefreq>
    <priority>${u.priority}</priority>
  </url>`).join('\n')}
</urlset>`;

  return new NextResponse(xml, {
    headers: { 'Content-Type': 'application/xml' },
  });
}
