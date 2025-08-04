import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { PostsSection } from "@/globals/components";
import { Post } from "@/globals/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles | Simplified Ninja",
  description: "Browse all articles and tutorials on Simplified Ninja",
};

export default async function ArticlesPage() {
  const fetchArticles = async (): Promise<IArticle[]> => {
    try {
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
      return data.docs || [];
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
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

  const articlesData = await fetchArticles();
  const posts: Post[] = articlesData.map(transformArticleToPost);

  return (
    <div style={{ paddingTop: "2rem" }}>
      <PostsSection
        title="All Articles"
        subtitle="Explore our complete collection of articles and tutorials"
        posts={posts}
        columns={3}
        showViewAll={false}
      />
    </div>
  );
}
