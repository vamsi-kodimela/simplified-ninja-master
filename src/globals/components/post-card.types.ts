import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

export interface Post {
  id: string;
  title: string;
  description: string;
  imageUrl?: string;
  category: {
    id: string;
    name: string;
    slug: string;
    color?: string;
  };
  readCount: number;
  publishedAt: Date;
  updatedAt: Date;
  href: string;
  slug: string;
  author?: {
    name: string;
    avatar?: string;
  };
  readTime?: number; // in minutes
  featured?: boolean;
  content: SerializedEditorState;
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
