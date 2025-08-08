import { API_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { fetchJson } from "@/lib/fetcher";

interface ArticlesResponse {
  docs: IArticle[];
}

export async function getArticles(options?: {
  depth?: number;
  revalidate?: number;
}): Promise<IArticle[]> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/article${depth ? `?depth=${depth}` : ""}`;
  const data = await fetchJson<ArticlesResponse>(url, { revalidate });
  return data?.docs ?? [];
}

export async function getArticleBySlug(
  slug: string,
  options?: { depth?: number; revalidate?: number },
): Promise<IArticle | null> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/article?where[slug][equals]=${encodeURIComponent(slug)}${depth ? `&depth=${depth}` : ""}`;
  const data = await fetchJson<ArticlesResponse>(url, { revalidate });
  return data?.docs?.[0] ?? null;
}
