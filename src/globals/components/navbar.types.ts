/* ================================
   NAVBAR COMPONENT TYPES
   Type definitions for the navbar system
   ================================ */

export interface NavItem {
  id: string;
  label: string;
  href?: string;
  icon?: string;
  badge?: string | number;
  isActive?: boolean;
  isDisabled?: boolean;
  onClick?: () => void;
  children?: NavItem[];
}

export interface CTAButton {
  id: string;
  label: string;
  variant: "primary" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  href?: string;
  icon?: string;
  onClick?: () => void;
  isLoading?: boolean;
  isDisabled?: boolean;
}

export interface SearchConfig {
  isEnabled: boolean;
  placeholder?: string;
  onSearch?: (query: string) => void;
  onClear?: () => void;
  suggestions?: string[];
  isLoading?: boolean;
}

export interface LogoConfig {
  type: "text" | "image" | "icon";
  text?: string;
  imageUrl?: string;
  icon?: string;
  href?: string;
  onClick?: () => void;
}

export interface NavbarConfig {
  logo: LogoConfig;
  navigation: NavItem[];
  search?: SearchConfig;
  cta: CTAButton[];
  theme?: "light" | "dark" | "auto";
  isScrolled?: boolean;
  isMobileMenuOpen?: boolean;
  onMobileMenuToggle?: () => void;
  className?: string;
}

export interface NavbarProps extends Partial<NavbarConfig> {
  children?: React.ReactNode;
}

export interface DropdownProps {
  items: NavItem[];
  isOpen: boolean;
  onClose: () => void;
  trigger: React.ReactNode;
  className?: string;
}

export interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: NavItem[];
  cta: CTAButton[];
  search?: SearchConfig;
  logo: LogoConfig;
}
