import { API_URL, SERVER_URL } from "@/config/api.config";
import { ICategory } from "@/models";
import { CategoriesSection } from "@/globals/components";
import { CategoryType } from "@/globals/components";
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
  const fetchCategories = async (): Promise<ICategory[]> => {
    try {
      const response = await fetch(`${API_URL}/category?depth=2`, {
        next: { revalidate: 3600 },
      });

      if (!response.ok) {
        console.error(
          `Failed to fetch categories: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const data = await response.json();
      return data.docs || [];
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  // Transform category data to match CategoryType interface
  const transformCategoryToType = (category: ICategory): CategoryType => ({
    id: category.id,
    title: category.name,
    description: category.description || `Explore ${category.name} content`,
    imageUrl: category.icon ? `${SERVER_URL}${category.icon}` : undefined,
    href: `/category/${category.slug}`,
    count: category.articles?.length || 0,
    isNew: category.isNew,
    isFeatured: category.isFeatured,
    articles: category.articles,
  });

  const categoriesData = await fetchCategories();
  const categories: CategoryType[] = categoriesData.map(
    transformCategoryToType,
  );

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
