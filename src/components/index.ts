// Existing components
export { Category } from "./category";
export { Post } from "./post";

// New posts components
export { PostsFilters } from "./posts-filters";
export { PostVariant, PostGrid, PostList, PostCompact } from "./post-variants";
export {
  PostsSection,
  PostsGrid,
  PostsList,
  PostsWithFilters,
  FeaturedPosts,
  LatestPosts,
  CompactPosts,
  AdvancedPostsSection,
  LoadingSkeleton,
} from "./posts-section";

// Re-export types from store for convenience
export type { LayoutType, SortType } from "../store/global-store";
