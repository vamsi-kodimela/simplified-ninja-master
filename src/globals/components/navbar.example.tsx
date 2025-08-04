"use client";

import React from "react";
import Navbar from "./navbar";
import { NavbarProps, NavItem, CTAButton } from "./navbar.types";

/* ================================
   NAVBAR USAGE EXAMPLES
   Different configurations and use cases
   ================================ */

// Example navigation structure
const exampleNavigation: NavItem[] = [
  {
    id: "home",
    label: "Home",
    href: "/",
    icon: "🏠",
    isActive: true,
  },
  {
    id: "about",
    label: "About",
    href: "/about",
    icon: "📋",
  },
  {
    id: "services",
    label: "Services",
    icon: "⚙️",
    children: [
      {
        id: "web-dev",
        label: "Web Development",
        href: "/services/web-development",
        icon: "🌐",
      },
      {
        id: "mobile-dev",
        label: "Mobile Apps",
        href: "/services/mobile-apps",
        icon: "📱",
      },
      {
        id: "cloud",
        label: "Cloud Solutions",
        icon: "☁️",
        children: [
          {
            id: "aws",
            label: "AWS Services",
            href: "/services/aws",
          },
          {
            id: "azure",
            label: "Azure Solutions",
            href: "/services/azure",
          },
          {
            id: "gcp",
            label: "Google Cloud",
            href: "/services/gcp",
          },
        ],
      },
      {
        id: "consulting",
        label: "Consulting",
        href: "/services/consulting",
        icon: "💼",
      },
    ],
  },
  {
    id: "portfolio",
    label: "Portfolio",
    href: "/portfolio",
    icon: "📊",
  },
  {
    id: "team",
    label: "Team",
    href: "/team",
    icon: "👥",
  },
  {
    id: "contact",
    label: "Contact",
    href: "/contact",
    icon: "📞",
    badge: "New",
  },
];

// Example CTA buttons
const exampleCTA: CTAButton[] = [
  {
    id: "get-started",
    label: "Get Started",
    variant: "primary",
    href: "/get-started",
    icon: "🚀",
  },
  {
    id: "contact-us",
    label: "Contact Us",
    variant: "secondary",
    href: "/contact",
    icon: "💬",
  },
];

/* ================================
   BASIC NAVBAR EXAMPLE
   ================================ */

export const BasicNavbar: React.FC = () => (
  <Navbar
    logo={{
      type: "icon",
      text: "SimplifiedNinja",
      icon: "SN",
      href: "/",
    }}
    navigation={exampleNavigation}
    search={{
      isEnabled: true,
      placeholder: "Search our services...",
      onSearch: (query) => console.log("Search:", query),
      onClear: () => console.log("Search cleared"),
    }}
    cta={exampleCTA}
    theme="dark"
  />
);

/* ================================
   MINIMAL NAVBAR EXAMPLE
   ================================ */

export const MinimalNavbar: React.FC = () => (
  <Navbar
    logo={{
      type: "text",
      text: "Brand",
      href: "/",
    }}
    navigation={[
      { id: "home", label: "Home", href: "/", isActive: true },
      { id: "about", label: "About", href: "/about" },
      { id: "contact", label: "Contact", href: "/contact" },
    ]}
    cta={[
      {
        id: "cta",
        label: "Get Started",
        variant: "primary",
        href: "/signup",
      },
    ]}
  />
);

/* ================================
   FEATURE-RICH NAVBAR EXAMPLE
   ================================ */

export const FeatureRichNavbar: React.FC = () => {
  const [searchResults, setSearchResults] = React.useState<string[]>([]);
  const [isSearchLoading, setIsSearchLoading] = React.useState(false);

  const handleSearch = async (query: string) => {
    setIsSearchLoading(true);
    // Simulate search API call
    setTimeout(() => {
      setSearchResults([
        `Result 1 for "${query}"`,
        `Result 2 for "${query}"`,
        `Result 3 for "${query}"`,
      ]);
      setIsSearchLoading(false);
    }, 1000);
  };

  const handleCTAClick = (buttonId: string) => {
    console.log(`CTA clicked: ${buttonId}`);
    // Add analytics tracking, navigation, etc.
  };

  return (
    <Navbar
      logo={{
        type: "image",
        imageUrl: "/simplified-ninja-icon.png",
        text: "SimplifiedNinja",
        href: "/",
        onClick: () => console.log("Logo clicked"),
      }}
      navigation={exampleNavigation}
      search={{
        isEnabled: true,
        placeholder: "Search projects, services, or documentation...",
        onSearch: handleSearch,
        onClear: () => setSearchResults([]),
        suggestions: searchResults,
        isLoading: isSearchLoading,
      }}
      cta={[
        {
          id: "demo",
          label: "Free Demo",
          variant: "ghost",
          onClick: () => handleCTAClick("demo"),
        },
        {
          id: "signup",
          label: "Start Project",
          variant: "primary",
          icon: "✨",
          onClick: () => handleCTAClick("signup"),
        },
      ]}
      theme="dark"
      className="custom-navbar"
    />
  );
};

/* ================================
   LIGHT THEME NAVBAR EXAMPLE
   ================================ */

export const LightNavbar: React.FC = () => (
  <Navbar
    logo={{
      type: "icon",
      text: "SimplifiedNinja",
      icon: "SN",
      href: "/",
    }}
    navigation={exampleNavigation.slice(0, 4)} // Fewer items for light theme demo
    search={{
      isEnabled: true,
      placeholder: "Search...",
    }}
    cta={[
      {
        id: "login",
        label: "Login",
        variant: "ghost",
        href: "/login",
      },
      {
        id: "signup",
        label: "Sign Up",
        variant: "primary",
        href: "/signup",
      },
    ]}
    theme="light"
  />
);

/* ================================
   E-COMMERCE NAVBAR EXAMPLE
   ================================ */

export const EcommerceNavbar: React.FC = () => (
  <Navbar
    logo={{
      type: "text",
      text: "ShopNinja",
      href: "/",
    }}
    navigation={[
      { id: "shop", label: "Shop", href: "/shop", isActive: true },
      {
        id: "categories",
        label: "Categories",
        children: [
          {
            id: "electronics",
            label: "Electronics",
            href: "/categories/electronics",
            icon: "📱",
          },
          {
            id: "clothing",
            label: "Clothing",
            href: "/categories/clothing",
            icon: "👕",
          },
          {
            id: "home",
            label: "Home & Garden",
            href: "/categories/home",
            icon: "🏡",
          },
          {
            id: "sports",
            label: "Sports",
            href: "/categories/sports",
            icon: "⚽",
          },
        ],
      },
      { id: "deals", label: "Deals", href: "/deals", badge: "Hot", icon: "🔥" },
      { id: "support", label: "Support", href: "/support" },
    ]}
    search={{
      isEnabled: true,
      placeholder: "Search products...",
      onSearch: (query) => console.log("Product search:", query),
    }}
    cta={[
      {
        id: "cart",
        label: "Cart",
        variant: "ghost",
        icon: "🛒",
        href: "/cart",
      },
      {
        id: "account",
        label: "Account",
        variant: "secondary",
        icon: "👤",
        href: "/account",
      },
    ]}
  />
);

/* ================================
   LOADING STATE EXAMPLE
   ================================ */

export const LoadingNavbar: React.FC = () => (
  <Navbar
    logo={{
      type: "text",
      text: "LoadingApp",
      href: "/",
    }}
    navigation={[
      { id: "home", label: "Home", href: "/" },
      {
        id: "dashboard",
        label: "Dashboard",
        href: "/dashboard",
        isDisabled: true,
      },
      { id: "settings", label: "Settings", href: "/settings" },
    ]}
    search={{
      isEnabled: true,
      placeholder: "Searching...",
      isLoading: true,
    }}
    cta={[
      {
        id: "save",
        label: "Saving...",
        variant: "primary",
        isLoading: true,
        isDisabled: true,
      },
    ]}
  />
);

// Default export for easy importing
export default BasicNavbar;
