/* ================================
   COMPONENTS INDEX
   Export all components from this module
   ================================ */

// Main navbar component
export { default as Navbar } from "./navbar";

// Navbar wrapper for layout
export { default as NavbarWrapper } from "./navbar-wrapper";

// Hero component
export { default as Hero } from "./hero";

// Category components
export { default as Category } from "./category";
export { default as CategoriesSection } from "./categories-section";

// Example implementations
export {
  BasicNavbar,
  MinimalNavbar,
  FeatureRichNavbar,
  LightNavbar,
  EcommerceNavbar,
  LoadingNavbar,
} from "./navbar.example";

// Types
export type {
  NavItem,
  CTAButton,
  SearchConfig,
  LogoConfig,
  NavbarConfig,
  NavbarProps,
  DropdownProps,
  MobileMenuProps,
} from "./navbar.types";

export type {
  Category as CategoryType,
  CategoryProps,
  CategoriesSectionProps,
} from "./category.types";

// Re-export for convenience
export type { default as NavbarComponent } from "./navbar";
