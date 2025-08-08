import { API_URL } from "@/config/api.config";
import { IArticle, ICategory } from "@/models";

export async function GET() {
  const baseUrl = "https://simplified.ninja";

  try {
    // Fetch articles and categories for dynamic sitemap
    const [articlesResponse, categoriesResponse] = await Promise.all([
      fetch(`${API_URL}/article`, {
        next: { revalidate: 3600 },
      }),
      fetch(`${API_URL}/category`, {
        next: { revalidate: 3600 },
      }),
    ]);

    const articlesData = articlesResponse.ok
      ? await articlesResponse.json()
      : { docs: [] };
    const categoriesData = categoriesResponse.ok
      ? await categoriesResponse.json()
      : { docs: [] };

    const articles = articlesData.docs || [];
    const categories = categoriesData.docs || [];

    // Static pages
    const staticPages = [
      {
        url: baseUrl,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 1.0,
      },
      {
        url: `${baseUrl}/article`,
        lastModified: new Date(),
        changeFrequency: "daily" as const,
        priority: 0.9,
      },
      {
        url: `${baseUrl}/category`,
        lastModified: new Date(),
        changeFrequency: "weekly" as const,
        priority: 0.8,
      },
    ];

    // Dynamic article pages
    const articlePages = articles
      .filter((article: IArticle) => article.slug)
      .map((article: IArticle) => ({
        url: `${baseUrl}/article/${article.slug}`,
        lastModified: new Date(
          article.updatedAt || article.createdAt || new Date(),
        ),
        changeFrequency: "weekly" as const,
        priority: 0.7,
      }));

    // Dynamic category pages
    const categoryPages = categories.map((category: ICategory) => ({
      url: `${baseUrl}/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
      lastModified: new Date(
        category.updatedAt || category.createdAt || new Date(),
      ),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    }));

    const allPages = [...staticPages, ...articlePages, ...categoryPages];

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${allPages
  .map(
    (page) => `
  <url>
    <loc>${page.url}</loc>
    <lastmod>${page.lastModified.toISOString()}</lastmod>
    <changefreq>${page.changeFrequency}</changefreq>
    <priority>${page.priority}</priority>
  </url>`,
  )
  .join("")}
</urlset>`;

    return new Response(sitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  } catch (error) {
    console.error("Error generating sitemap:", error);

    // Fallback sitemap with just static pages
    const fallbackSitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/article</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>0.9</priority>
  </url>
  <url>
    <loc>${baseUrl}/category</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
</urlset>`;

    return new Response(fallbackSitemap, {
      status: 200,
      headers: {
        "Content-Type": "application/xml",
        "Cache-Control": "public, max-age=3600, s-maxage=3600",
      },
    });
  }
}
