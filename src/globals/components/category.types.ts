/* ================================
   CATEGORY COMPONENT TYPES
   Type definitions for category and categories section
   ================================ */

export interface Category {
  id: string;
  title: string;
  description?: string;
  imageUrl?: string;
  href?: string;
  count?: number;
  isNew?: boolean;
  isFeatured?: boolean;
  onClick?: () => void;
}

export interface CategoryProps {
  category: Category;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "featured" | "compact";
  className?: string;
}

export interface CategoriesSectionProps {
  title?: string;
  subtitle?: string;
  categories: Category[];
  columns?: 2 | 3 | 4 | 6;
  showViewAll?: boolean;
  viewAllHref?: string;
  onViewAll?: () => void;
  className?: string;
}
