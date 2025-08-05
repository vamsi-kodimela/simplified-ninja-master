export function GET() {
  const robots = `User-agent: *
Allow: /

# Optimize crawl budget - allow all important pages
Allow: /article
Allow: /category
Allow: /article/*

# Block unnecessary crawling
Disallow: /api/
Disallow: /_next/
Disallow: /admin
Disallow: /search?*

# Sitemap location
Sitemap: https://simplified-ninja.com/sitemap.xml

# Crawl delay for better server performance
Crawl-delay: 1
`;

  return new Response(robots, {
    status: 200,
    headers: {
      "Content-Type": "text/plain",
      "Cache-Control": "public, max-age=86400, s-maxage=86400",
    },
  });
}
