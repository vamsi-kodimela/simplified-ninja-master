import { IArticle } from "./article.interface";

interface ICategory {
  id: string;
  name: string;
  icon?: string;
  description?: string;
  slug: string;
  createdAt?: string;
  updatedAt?: string;
  articles?: IArticle[];
  isNew?: boolean;
  isFeatured?: boolean;
}

export type { ICategory };
