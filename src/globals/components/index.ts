/* ================================
   COMPONENTS INDEX
   Export all components from this module
   ================================ */

// Navbar components
export { default as Navbar } from "./navbar";
export { default as NavbarWrapper } from "./navbar-wrapper";

// Footer component
export { default as Footer } from "./footer";
export { default as FooterWrapper } from "./footer-wrapper";

// Hero component
export { default as Hero } from "./hero";

// Category components
export { default as Category } from "./category";
export { default as CategoriesSection } from "./categories-section";

// Post components
export { default as PostCard } from "./post-card";
export { default as PostsSection } from "./posts-section";

// Types
export type {
  NavLink,
  CTAButton,
  LogoConfig,
  SearchConfig,
  NavbarProps,
} from "./navbar.types";

export type {
  Category as CategoryType,
  CategoryProps,
  CategoriesSectionProps,
} from "./category.types";

export type { Post, PostCardProps, PostsSectionProps } from "./post-card.types";

// Clean exports for navigation-free components
