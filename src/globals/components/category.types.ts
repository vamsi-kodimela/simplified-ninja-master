/* ================================
   CATEGORY COMPONENT TYPES
   Type definitions for category and categories section
   ================================ */

import { IArticle } from "@/models/article.interface";

export interface Category {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  count?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  articles?: IArticle[];
  onClick?: () => void;
}

export interface CategoryProps {
  category: Category;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "featured" | "compact";
  className?: string;
  style?: React.CSSProperties;
}

export interface CategoriesSectionProps {
  title?: string;
  subtitle?: string;
  categories: Category[];
  showViewAll?: boolean;
  viewAllHref?: string;
  onViewAll?: () => void;
  className?: string;
}
