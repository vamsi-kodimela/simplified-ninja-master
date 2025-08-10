import { API_URL } from "@/config/api.config";
import { ICategory } from "@/models";
import { fetchJson } from "@/lib/fetcher";
import { mapCategoryToType } from "@/mappers/category.mapper";
import { CategoryType } from "@/globals/components";

interface CategoriesResponse {
  docs: ICategory[];
}

export async function getCategories(options?: {
  depth?: number;
  revalidate?: number;
}): Promise<CategoryType[]> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/category${depth ? `?depth=${depth}` : ""}`;
  const data = await fetchJson<CategoriesResponse>(url, { revalidate });
  const categories = data?.docs ?? [];
  return categories.map((category) => mapCategoryToType(category));
}

export async function getCategoryBySlug(
  slug: string,
  options?: { depth?: number; revalidate?: number },
): Promise<CategoryType | null> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/category?where[slug][equals]=${slug}${depth ? `&depth=${depth}` : ""}`;
  const data = await fetchJson<CategoriesResponse>(url, { revalidate });
  const category = data?.docs?.[0] ?? null;
  return category ? mapCategoryToType(category) : null;
}
