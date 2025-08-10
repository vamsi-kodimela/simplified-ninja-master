import { ICategory } from "@/models";
import { SERVER_URL } from "@/config/api.config";
import type { CategoryType } from "@/globals/components";

export function mapCategoryToType(
  category: ICategory,
  index?: number,
): CategoryType {
  return {
    id: category.id,
    title: category.name,
    description: category.description || `Explore ${category.name} content`,
    imageUrl: category.icon ? `${SERVER_URL}${category.icon}` : undefined,
    href: `/category/${category.slug || category.name.toLowerCase().replace(/\s+/g, "-")}`,
    slug: category.slug,
    count:
      typeof category.articles?.length === "number"
        ? category.articles.length
        : typeof index === "number"
          ? Math.floor((parseInt(category.id, 36) % 45) + 5)
          : 0,
    isNew:
      typeof category.isNew !== "undefined"
        ? !!category.isNew
        : typeof index === "number"
          ? index < 2
          : false,
    isFeatured:
      typeof category.isFeatured !== "undefined"
        ? !!category.isFeatured
        : typeof index === "number"
          ? index % 3 === 0
          : false,
    articles: category.articles,
  };
}
