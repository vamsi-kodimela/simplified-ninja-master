/* ================================
   NAVBAR TYPE DEFINITIONS
   TypeScript interfaces for navbar component
   ================================ */

export interface NavLink {
  id: string;
  label: string;
  href: string;
  isActive?: boolean;
  children?: NavLink[];
}

export interface CTAButton {
  id: string;
  label: string;
  href?: string;
  onClick?: () => void;
  variant: "primary" | "secondary" | "ghost";
  size?: "sm" | "md" | "lg";
}

export interface LogoConfig {
  text: string;
  imageUrl?: string;
  href?: string;
  onClick?: () => void;
}

export interface SearchConfig {
  isEnabled: boolean;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
}

export interface NavbarProps {
  logo: LogoConfig;
  navLinks: NavLink[];
  search?: SearchConfig;
  ctaButtons: CTAButton[];
  className?: string;
}
