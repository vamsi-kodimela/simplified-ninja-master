import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle, ICategory } from "@/models";
import { PostsSection } from "@/globals/components";
import { Post } from "@/globals/components";
import { Metadata } from "next";
import Link from "next/link";

export async function generateStaticParams() {
  try {
    const response = await fetch(`${API_URL}/category`, {
      next: { revalidate: 3600 },
    });

    if (!response.ok) {
      return [];
    }

    const data = await response.json();
    const categories = data.docs || [];

    return categories.map((category: ICategory) => ({
      slug: category.slug || category.name.toLowerCase().replace(/\s+/g, "-"),
    }));
  } catch (error) {
    console.error("Error generating static params for categories:", error);
    return [];
  }
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;

  // Fetch category info for metadata
  try {
    const response = await fetch(`${API_URL}/category`, {
      next: { revalidate: 3600 },
    });

    if (response.ok) {
      const data = await response.json();
      const categories = data.docs || [];
      const category = categories.find(
        (c: ICategory) =>
          (c.slug || c.name.toLowerCase().replace(/\s+/g, "-")) === slug,
      );

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
            url: `https://simplified-ninja.com/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
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
            canonical: `https://simplified-ninja.com/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
          },
        };
      }
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

  const fetchCategoryArticles = async (): Promise<IArticle[]> => {
    try {
      // Fetch all articles and filter by category
      const response = await fetch(`${API_URL}/article`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch articles: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const data = await response.json();
      const articles = data.docs || [];

      // Filter articles by category slug
      return articles.filter((article: IArticle) => {
        if (!article.category?.name) {
          return false; // Skip articles without a category
        }
        const categorySlug = article.category.name
          .toLowerCase()
          .replace(/\s+/g, "-");
        return categorySlug === slug;
      });
    } catch (error) {
      console.error("Error fetching category articles:", error);
      return [];
    }
  };

  const fetchCategoryInfo = async (): Promise<ICategory | null> => {
    try {
      const response = await fetch(`${API_URL}/category`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      const categories = data.docs || [];

      return (
        categories.find(
          (category: ICategory) =>
            (category.slug ||
              category.name.toLowerCase().replace(/\s+/g, "-")) === slug,
        ) || null
      );
    } catch (error) {
      console.error("Error fetching category info:", error);
      return null;
    }
  };

  // Transform article data to match Post interface
  const transformArticleToPost = (article: IArticle): Post => ({
    id: article.id,
    title: article.title,
    description: article.description,
    imageUrl: article.featuredImage?.url
      ? `${SERVER_URL}${article.featuredImage.url}`
      : undefined,
    category: {
      name: article.category?.name || "Uncategorized",
      slug:
        article.category?.name?.toLowerCase().replace(/\s+/g, "-") ||
        "uncategorized",
    },
    readCount: Math.floor((parseInt(article.id, 36) % 1900) + 100), // Deterministic based on ID
    publishedAt: new Date(article.createdAt),
    href: `/article/${article.slug}`,
    readTime: Math.ceil(article.description.length / 200),
    featured: parseInt(article.id, 36) % 5 === 0, // Deterministic featured status
  });

  const [articlesData, categoryInfo] = await Promise.all([
    fetchCategoryArticles(),
    fetchCategoryInfo(),
  ]);

  const posts: Post[] = articlesData.map(transformArticleToPost);
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
