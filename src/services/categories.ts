import { API_URL } from "@/config/api.config";
import { ICategory } from "@/models";
import { fetchJson } from "@/lib/fetcher";

interface CategoriesResponse {
  docs: ICategory[];
}

export async function getCategories(options?: {
  depth?: number;
  revalidate?: number;
}): Promise<ICategory[]> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/category${depth ? `?depth=${depth}` : ""}`;
  const data = await fetchJson<CategoriesResponse>(url, { revalidate });
  return data?.docs ?? [];
}

export async function getCategoryBySlug(
  slug: string,
  options?: { depth?: number; revalidate?: number },
): Promise<ICategory | null> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/category?where[slug][equals]=${encodeURIComponent(slug)}${depth ? `&depth=${depth}` : ""}`;
  const data = await fetchJson<CategoriesResponse>(url, { revalidate });
  return data?.docs?.[0] ?? null;
}
