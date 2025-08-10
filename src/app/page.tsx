import { Hero, CategoriesSection, PostsSection } from "@/globals/components";
import { getArticles } from "@/services/articles";
import { getCategories } from "@/services/categories";
import { homeMetadata } from "@/meta-data/home-metadata";
import { Metadata } from "next";

export const metadata: Metadata = homeMetadata;

export default async function Home() {
  const [articles, categories] = await Promise.all([
    getArticles(),
    getCategories(),
  ]);

  return (
    <div>
      <Hero />

      <PostsSection
        title="Recent Posts"
        subtitle="Stay updated with our latest insights and articles"
        posts={articles}
        columns={4}
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
