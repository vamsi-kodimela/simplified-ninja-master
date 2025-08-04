import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle, ICategory } from "@/models";
import { PostsSection } from "@/globals/components";
import { Post } from "@/globals/components";
import { Metadata } from "next";

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
        return {
          title: `${category.name} | Simplified Ninja`,
          description:
            category.description || `Articles about ${category.name}`,
        };
      }
    }
  } catch (error) {
    console.error("Error fetching category metadata:", error);
  }

  return {
    title: "Category | Simplified Ninja",
    description: "Browse articles in this category",
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
      name: article.category.name,
      slug: article.category.name.toLowerCase().replace(/\s+/g, "-"),
    },
    readCount: Math.floor(Math.random() * 2000) + 100,
    publishedAt: new Date(article.createdAt),
    href: `/post/${article.slug}`,
    readTime: Math.ceil(article.description.length / 200),
    featured: Math.random() > 0.7,
  });

  const [articlesData, categoryInfo] = await Promise.all([
    fetchCategoryArticles(),
    fetchCategoryInfo(),
  ]);

  const posts: Post[] = articlesData.map(transformArticleToPost);
  const categoryName = categoryInfo?.name || slug.replace(/-/g, " ");

  if (posts.length === 0) {
    return (
      <div style={{ paddingTop: "2rem", textAlign: "center" }}>
        <h1>No articles found in {categoryName}</h1>
        <p>Check back later for new content!</p>
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
