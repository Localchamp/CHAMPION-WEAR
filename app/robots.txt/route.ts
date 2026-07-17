import { NextResponse } from 'next/server';

export async function GET() {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL ?? 'https://championwear.com';
  const body = `User-agent: *
Allow: /
Disallow: /admin/
Disallow: /api/
Disallow: /profile/
Disallow: /orders/
Disallow: /checkout/

Sitemap: ${baseUrl}/sitemap.xml`;

  return new NextResponse(body, {
    headers: { 'Content-Type': 'text/plain' },
  });
}
