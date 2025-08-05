import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { PostsSection } from "@/globals/components";
import { Post } from "@/globals/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles | Simplified Ninja",
  description:
    "Browse all programming articles and tutorials on Simplified Ninja. Learn coding through in-depth tutorials, case studies, and practical examples covering web development, software engineering, and more.",
  keywords: [
    "programming articles",
    "coding tutorials",
    "web development guides",
    "software engineering articles",
    "programming blog",
    "learn programming",
    "tech tutorials",
  ],
  openGraph: {
    title: "All Articles | Simplified Ninja",
    description:
      "Browse all programming articles and tutorials on Simplified Ninja. Learn coding through in-depth tutorials and practical examples.",
    url: "https://simplified-ninja.com/article",
    siteName: "Simplified Ninja",
    images: [
      {
        url: "/simplified-ninja.png",
        width: 1200,
        height: 630,
        alt: "Simplified Ninja Articles - Programming Tutorials and Guides",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Articles | Simplified Ninja",
    description:
      "Browse all programming articles and tutorials on Simplified Ninja.",
    images: ["/simplified-ninja.png"],
  },
  alternates: {
    canonical: "https://simplified-ninja.com/article",
  },
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
