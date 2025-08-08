import { SERVER_URL } from "@/config/api.config";
import { IArticle, ICategory } from "@/models";
import { PostsSection } from "@/globals/components";
import type { Post } from "@/globals/components";
import { Metadata } from "next";
import Link from "next/link";
import { getArticles } from "@/services/articles";
import { getCategories, getCategoryBySlug } from "@/services/categories";
import { mapArticleToPost } from "@/mappers/article.mapper";

export async function generateStaticParams() {
  const categories = await getCategories({ depth: 0, revalidate: 3600 });
  return categories.map((category: ICategory) => ({ slug: category.slug }));
}

interface CategoryPageProps {
  params: { slug: string };
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = params;
  try {
    const category = await getCategoryBySlug(slug, {
      depth: 2,
      revalidate: 3600,
    });
    if (category) {
      const categoryDescription =
        category.description ||
        `Explore ${category.name} programming tutorials and articles. Learn through comprehensive guides, practical examples, and in-depth case studies.`;

      const imageUrl = category.icon
        ? `${SERVER_URL}${category.icon}`
        : "/simplified-ninja.png";

      return {
        title: `${category.name} Articles | Simplified Ninja`,
        description: categoryDescription,
        keywords: [
          category.name.toLowerCase(),
          "programming tutorials",
          "coding guides",
          "software development",
          `${category.name.toLowerCase()} programming`,
          `learn ${category.name.toLowerCase()}`,
        ],
        openGraph: {
          title: `${category.name} Articles | Simplified Ninja`,
          description: categoryDescription,
          url: `https://simplified.ninja/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
          siteName: "Simplified Ninja",
          images: [
            {
              url: imageUrl,
              width: 1200,
              height: 630,
              alt: `${category.name} Programming Tutorials - Simplified Ninja`,
            },
          ],
          locale: "en_US",
          type: "website",
        },
        twitter: {
          card: "summary_large_image",
          title: `${category.name} Articles | Simplified Ninja`,
          description: categoryDescription,
          images: [imageUrl],
        },
        alternates: {
          canonical: `https://simplified.ninja/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
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
  const { slug } = params;

  const [allArticles, categoryInfo] = await Promise.all([
    getArticles({ depth: 1, revalidate: 3600 }),
    getCategoryBySlug(slug, { depth: 2, revalidate: 3600 }),
  ]);

  const articlesData = allArticles.filter((article: IArticle) => {
    const categorySlug = article.category[0]?.slug;
    return categorySlug === slug;
  });

  const posts: Post[] = articlesData.map(mapArticleToPost);
  const categoryName = categoryInfo?.name || slug.replace(/-/g, " ");

  if (posts.length === 0) {
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
        posts={posts}
        columns={3}
        showViewAll={false}
      />
    </div>
  );
}
