import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle, ICategory } from "@/models";
import { Hero, CategoriesSection, PostsSection } from "@/globals/components";
import { CategoryType, Post } from "@/globals/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simplified Ninja | Your Simplified Guide to Code",
  description:
    "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more. Master programming with simplified tutorials and real-world examples.",
  keywords: [
    "programming tutorials",
    "learn to code",
    "web development",
    "coding bootcamp",
    "programming projects",
    "software engineering",
    "full stack development",
  ],
  openGraph: {
    title: "Simplified Ninja | Your Simplified Guide to Code",
    description:
      "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
    url: "https://simplified.ninja",
    siteName: "Simplified Ninja",
    images: [
      {
        url: "/simplified-ninja.png",
        width: 1200,
        height: 630,
        alt: "Simplified Ninja - Learn Programming Through Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplified Ninja | Your Simplified Guide to Code",
    description:
      "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
    images: ["/simplified-ninja.png"],
  },
  alternates: {
    canonical: "https://simplified.ninja",
  },
};

export default async function Home() {
  const fetchArticles = async (): Promise<IArticle[]> => {
    try {
      const response = await fetch(`${API_URL}/article?depth=1`, {
        next: { revalidate: 3600 }, // Revalidate every hour
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch articles: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("API did not return JSON data");
        return [];
      }

      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  };

  const fetchCategories = async (): Promise<ICategory[]> => {
    try {
      const response = await fetch(`${API_URL}/category`, {
        next: { revalidate: 3600 }, // Revalidate every hour
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch categories: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("API did not return JSON data");
        return [];
      }

      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
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
      name: article.category[0]?.name,
      slug: article.category[0]?.slug,
    },
    readCount: Math.floor((parseInt(article.id, 36) % 1900) + 100), // Deterministic based on ID
    publishedAt: new Date(article.createdAt),
    href: `/article/${article.slug}`,
    readTime: Math.ceil(article.description.length / 200), // Estimate based on description length
    featured: parseInt(article.id, 36) % 5 === 0, // Deterministic featured status
  });

  // Transform category data to match CategoryType interface
  const transformCategoryToType = (
    category: ICategory,
    index: number,
  ): CategoryType => ({
    id: category.id,
    title: category.name,
    description: category.description || `Explore ${category.name} content`,
    imageUrl: category.icon ? `${SERVER_URL}${category.icon}` : undefined,
    href: `/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
    count: Math.floor((parseInt(category.id, 36) % 45) + 5), // Deterministic based on ID
    isNew: index < 2, // Mark first 2 as new
    isFeatured: index % 3 === 0, // Mark every 3rd as featured
  });

  // Fetch data from APIs
  const [articlesData, categoriesData] = await Promise.all([
    fetchArticles(),
    fetchCategories(),
  ]);

  // Transform data to match component interfaces
  const posts: Post[] = articlesData.map(transformArticleToPost);
  const categories: CategoryType[] = categoriesData.map(
    transformCategoryToType,
  );

  return (
    <div>
      <Hero />

      <PostsSection
        title="Recent Posts"
        subtitle="Stay updated with our latest insights and articles"
        posts={posts}
        columns={3}
        showViewAll={true}
        viewAllHref="/article"
      />

      <CategoriesSection
        title="Explore Categories"
        subtitle="Discover content organized by topics that matter to you"
        categories={categories}
        showViewAll={true}
        viewAllHref="/category"
      />
    </div>
  );
}
