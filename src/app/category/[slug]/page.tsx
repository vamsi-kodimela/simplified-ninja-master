import { SERVER_URL } from "@/config/api.config";
import { PostsSection } from "@/globals/components";
import { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/services/articles";
import { getCategories, getCategoryBySlug } from "@/services/categories";

export async function generateStaticParams() {
  const categories = await getCategories({ depth: 0, revalidate: 3600 });
  return categories.map((category) => ({ slug: category.slug }));
}

interface CategoryPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  try {
    const category = await getCategoryBySlug(slug, {
      depth: 2,
      revalidate: 3600,
    });
    if (category) {
      const categoryDescription =
        category.description ||
        `Explore ${category.title} programming tutorials and articles. Learn through comprehensive guides, practical examples, and in-depth case studies.`;

      const imageUrl = category.imageUrl
        ? `${SERVER_URL}${category.imageUrl}`
        : "/simplified-ninja.png";

      return {
        title: `${category.title} Articles | Simplified Ninja`,
        description: categoryDescription,
        keywords: [
          category.title.toLowerCase(),
          "programming tutorials",
          "coding guides",
          "software development",
          `${category.title.toLowerCase()} programming`,
          `learn ${category.title.toLowerCase()}`,
        ],
        openGraph: {
          title: `${category.title} Articles | Simplified Ninja`,
          description: categoryDescription,
          url: `https://simplified.ninja/category/${category.slug || category.title.toLowerCase().replace(/\s+/g, "-")}`,
          siteName: "Simplified Ninja",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${category.title} Programming Tutorials - Simplified Ninja`,
            },
          ],
          locale: "en_US",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: `${category.title} Articles | Simplified Ninja`,
          description: categoryDescription,
          images: [imageUrl],
        },
        alternates: {
          canonical: `https://simplified.ninja/category/${category.slug || category.title.toLowerCase().replace(/\s+/g, "-")}`,
        },
      };
    }
  } catch (error) {
    console.error("Error fetching category metadata:", error);
  }

  return {
    title: "Category | Simplified Ninja",
    description:
      "Browse programming articles and tutorials in this category on Simplified Ninja.",
  };
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;

  const [allArticles, categoryInfo] = await Promise.all([
    getArticles({ depth: 1, revalidate: 3600 }),
    getCategoryBySlug(slug, { depth: 2, revalidate: 3600 }),
  ]);

  const articles = allArticles.filter((article) => {
    const categorySlug = article.category.slug;
    return categorySlug === slug;
  });

  const categoryName = categoryInfo?.title || slug.replace(/-/g, " ");

  if (articles.length === 0) {
    return (
      <div className="posts-section">
        <div className="posts-container">
          <div className="empty-state">
            <div className="empty-state-content">
              <div className="empty-state-icon">📝</div>
              <h1 className="empty-state-title">
                No articles found in {categoryName}
              </h1>
              <p className="empty-state-description">
                We don&apos;t have any articles in this category yet. Check back
                later for new content!
              </p>
              <div className="empty-state-actions">
                <Link href="/article" className="btn btn-primary">
                  Browse All Articles
                </Link>
                <Link href="/category" className="btn btn-secondary">
                  View Categories
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ paddingTop: "2rem" }}>
      <PostsSection
        title={`${categoryName} Articles`}
        subtitle={
          categoryInfo?.description || `Explore articles about ${categoryName}`
        }
        posts={articles}
        columns={3}
        showViewAll={false}
      />
    </div>
  );
}
