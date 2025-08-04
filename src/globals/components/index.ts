/* ================================
   COMPONENTS INDEX
   Export all components from this module
   ================================ */

// Main navbar component
export { default as Navbar } from "./navbar";

// Navbar wrapper for layout
export { default as NavbarWrapper } from "./navbar-wrapper";

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

// Re-export for convenience
export type { default as NavbarComponent } from "./navbar";
