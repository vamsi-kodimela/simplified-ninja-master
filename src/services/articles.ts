import { API_URL } from "@/config/api.config";
import { fetchJson } from "@/lib/fetcher";
import { mapArticleToPost } from "@/mappers/article.mapper";
import { Post } from "@/globals/components";
import { IArticle } from "@/models";

interface ArticlesResponse {
  docs: IArticle[];
}

export async function getArticles(options?: {
  depth?: number;
  revalidate?: number;
}): Promise<Post[]> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/article${depth ? `?depth=${depth}` : ""}`;
  const data = await fetchJson<ArticlesResponse>(url, { revalidate });
  const articles = data?.docs ?? [];
  return articles.map((article) => mapArticleToPost(article));
}

export async function getArticleBySlug(
  slug: string,
  options?: { depth?: number; revalidate?: number },
): Promise<Post | null> {
  const depth = options?.depth ?? 1;
  const revalidate = options?.revalidate ?? 3600;
  const url = `${API_URL}/article?where[slug][equals]=${slug}${depth ? `&depth=${depth}` : ""}`;
  const data = await fetchJson<ArticlesResponse>(url, { revalidate });
  const article = data?.docs?.[0] ?? null;
  return article ? mapArticleToPost(article) : null;
}
