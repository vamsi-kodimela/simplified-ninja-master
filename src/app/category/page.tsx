import { CategoriesSection } from "@/globals/components";
import type { CategoryType } from "@/globals/components";
import { getCategories } from "@/services/categories";
import { mapCategoryToType } from "@/mappers/category.mapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories | Simplified Ninja",
  description:
    "Explore programming categories on Simplified Ninja. Find tutorials organized by topics including web development, mobile development, data science, DevOps, and more programming disciplines.",
  keywords: [
    "programming categories",
    "coding topics",
    "web development",
    "mobile development",
    "data science",
    "devops",
    "software engineering topics",
    "programming languages",
  ],
  openGraph: {
    title: "All Categories | Simplified Ninja",
    description:
      "Explore programming categories on Simplified Ninja. Find tutorials organized by topics including web development, mobile development, and more.",
    url: "https://simplified.ninja/category",
    siteName: "Simplified Ninja",
    images: [
      {
        url: "/simplified-ninja.png",
        width: 1200,
        height: 630,
        alt: "Simplified Ninja Categories - Programming Topics and Disciplines",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Categories | Simplified Ninja",
    description: "Explore programming categories on Simplified Ninja.",
    images: ["/simplified-ninja.png"],
  },
  alternates: {
    canonical: "https://simplified.ninja/category",
  },
};

export default async function CategoriesPage() {
  const categoriesData = await getCategories({ depth: 2, revalidate: 3600 });
  const categories: CategoryType[] = categoriesData.map(mapCategoryToType);

  return (
    <div style={{ paddingTop: "2rem" }}>
      <CategoriesSection
        title="All Categories"
        subtitle="Discover content organized by topics that matter to you"
        categories={categories}
        showViewAll={false}
      />
    </div>
  );
}
