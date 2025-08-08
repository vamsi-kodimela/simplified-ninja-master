import { IArticle } from "@/models";
import { SERVER_URL } from "@/config/api.config";
import type { Post } from "@/globals/components";

export function mapArticleToPost(article: IArticle): Post {
  return {
    id: article.id,
    title: article.title,
    description: article.description,
    imageUrl: article.featuredImage?.url
      ? `${SERVER_URL}${article.featuredImage.url}`
      : undefined,
    category: {
      name: article.category[0]?.name,
      slug: article.category[0]?.slug,
    },
    readCount: Math.floor((parseInt(article.id, 36) % 1900) + 100),
    publishedAt: new Date(article.createdAt),
    href: `/article/${article.slug}`,
    readTime: Math.ceil(article.description.length / 200),
    featured:
      (article.isFeatured as boolean | undefined) ??
      parseInt(article.id, 36) % 5 === 0,
  };
}
