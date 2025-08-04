import { API_URL, SERVER_URL } from "@/config/api.config";
import { ICategory } from "@/models";
import { CategoriesSection } from "@/globals/components";
import { CategoryType } from "@/globals/components";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Categories | Simplified Ninja",
  description: "Browse all categories on Simplified Ninja",
};

export default async function CategoriesPage() {
  const fetchCategories = async (): Promise<ICategory[]> => {
    try {
      const response = await fetch(`${API_URL}/category`, {
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
  const transformCategoryToType = (
    category: ICategory,
    index: number,
  ): CategoryType => ({
    id: category.id,
    title: category.name,
    description: category.description || `Explore ${category.name} content`,
    imageUrl: category.icon ? `${SERVER_URL}${category.icon}` : undefined,
    href: `/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
    count: Math.floor(Math.random() * 50) + 5,
    isNew: index < 2,
    isFeatured: index % 3 === 0,
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
