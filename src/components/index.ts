// ===========================
// LEGACY COMPONENTS
// ===========================
export { Category } from "./category";
export { Post } from "./post";

// ===========================
// POSTS COMPONENTS
// ===========================
export { PostsFilters } from "./posts-filters";
export { PostVariant, PostGrid, PostCompact } from "./post-variants";
export {
  PostsSection,
  PostsSectionDemo,
  ShimmerSkeleton,
} from "./posts-section";

// ===========================
// COMMON UI COMPONENTS
// ===========================
export { Button, Input, Container, Stack, Card } from "./ui";

// ===========================
// TYPE EXPORTS
// ===========================
export type { LayoutType, SortType } from "../store/global-store";
export type {
  ButtonProps,
  InputProps,
  ContainerProps,
  StackProps,
  CardProps,
} from "./ui";
