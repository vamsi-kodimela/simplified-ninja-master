import { Hero, CategoriesSection, PostsSection } from "@/globals/components";
import type { CategoryType, Post } from "@/globals/components";
import { getArticles } from "@/services/articles";
import { getCategories } from "@/services/categories";
import { mapArticleToPost } from "@/mappers/article.mapper";
import { mapCategoryToType } from "@/mappers/category.mapper";
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
  const [articlesData, categoriesData] = await Promise.all([
    getArticles({ depth: 1, revalidate: 3600 }),
    getCategories({ depth: 1, revalidate: 3600 }),
  ]);

  const posts: Post[] = articlesData.map(mapArticleToPost).slice(0, 3);
  const categories: CategoryType[] = categoriesData.map((c, i) =>
    mapCategoryToType(c, i),
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
