import { Metadata } from "next";
import CategorySection from "@/components/category-section";
import { Container } from "@/components/ui";
import { ICategory } from "@/models";
import { API_URL } from "@/config/api.config";

export const metadata: Metadata = {
  title: "Categories | Simplified Ninja",
  description:
    "Browse all categories to find coding tutorials and guides that interest you most.",
};

export default async function CategoriesPage() {
  const fetchCategories = async (): Promise<ICategory[]> => {
    try {
      const response = await fetch(`${API_URL}/category`, {
        cache: "no-store", // Ensure fresh data for categories page
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
      console.log("Categories API Response:", data); // Debug log

      // Handle different possible response structures
      let categoriesData: ICategory[] = [];

      if (Array.isArray(data)) {
        categoriesData = data;
      } else if (Array.isArray(data.docs)) {
        categoriesData = data.docs;
      } else if (Array.isArray(data.data)) {
        categoriesData = data.data;
      } else if (Array.isArray(data.categories)) {
        categoriesData = data.categories;
      } else {
        console.warn("Unexpected API response structure:", data);
        categoriesData = [];
      }

      return categoriesData;
    } catch (error) {
      console.error("Error fetching categories:", error);
      return [];
    }
  };

  const categories = await fetchCategories();

  return (
    <Container>
      <div
        style={{
          paddingTop: "var(--component-gap)",
          paddingBottom: "var(--component-gap)",
        }}
      >
        <header
          style={{ marginBottom: "var(--content-gap-lg)", textAlign: "center" }}
        >
          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-4xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--primary-dark)",
              margin: "0 0 var(--spacing-4) 0",
              lineHeight: "var(--leading-tight)",
            }}
          >
            All Categories
          </h1>
          <p
            style={{
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-lg)",
              color: "var(--neutral-600)",
              margin: 0,
              maxWidth: "600px",
              marginLeft: "auto",
              marginRight: "auto",
              lineHeight: "var(--leading-relaxed)",
            }}
          >
            Explore our diverse collection of coding topics and find the perfect
            tutorials for your learning journey.
          </p>
        </header>

        <CategorySection
          categories={categories}
          maxCategories={undefined} // Show all categories
        />
      </div>
    </Container>
  );
}
