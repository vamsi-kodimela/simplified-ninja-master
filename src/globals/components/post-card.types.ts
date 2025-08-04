/* ================================
   POST CARD TYPE DEFINITIONS
   TypeScript interfaces for post cards and posts section
   ================================ */

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: {
    name: string;
    slug: string;
    color?: string;
  };
  readCount: number;
  publishedAt: Date;
  href: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readTime?: number; // in minutes
  featured?: boolean;
}

export interface PostCardProps {
  post: Post;
  size?: "sm" | "md" | "lg";
  variant?: "default" | "featured" | "compact";
  showCategory?: boolean;
  showAuthor?: boolean;
  showReadTime?: boolean;
  className?: string;
  style?: React.CSSProperties;
}

export interface PostsSectionProps {
  title?: string;
  subtitle?: string;
  posts: Post[];
  columns?: 2 | 3 | 4;
  showViewAll?: boolean;
  viewAllHref?: string;
  onViewAll?: () => void;
  showLoadMore?: boolean;
  onLoadMore?: () => void;
  loading?: boolean;
  className?: string;
}

export type PostGridColumns = 2 | 3 | 4;
