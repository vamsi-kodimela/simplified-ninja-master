"use client";

import React from "react";
import Navbar from "./navbar";
import { NavLink, CTAButton } from "./navbar.types";

/* ================================
   NAVBAR WRAPPER COMPONENT
   Configured navbar for the application
   ================================ */

const NavbarWrapper: React.FC = () => {
  // Navigation links configuration
  const navLinks: NavLink[] = [
    {
      id: "home",
      label: "Home",
      href: "/",
      isActive: true,
    },
    {
      id: "articles",
      label: "Articles",
      href: "/article",
    },
    {
      id: "categories",
      label: "Categories",
      href: "/category",
    },
    {
      id: "about",
      label: "About",
      href: "/about",
    },
    {
      id: "contact",
      label: "Contact",
      href: "/contact",
    },
  ];

  // CTA buttons configuration
  const ctaButtons: CTAButton[] = [
    {
      id: "all-articles",
      label: "All Articles",
      href: "/article",
      variant: "secondary",
    },
    {
      id: "subscribe",
      label: "Subscribe",
      href: "#subscribe",
      variant: "primary",
    },
  ];

  // Search configuration
  const searchConfig = {
    isEnabled: true,
    placeholder: "Search articles, categories...",
    onSearch: (query: string) => {
      console.log("Search query:", query);
      // Implement search functionality
      if (typeof window !== "undefined") {
        window.location.href = `/search?q=${encodeURIComponent(query)}`;
      }
    },
    onClear: () => {
      console.log("Search cleared");
    },
  };

  // Logo configuration
  const logoConfig = {
    text: "SimplifiedNinja",
    imageUrl: "/simplified-ninja-icon.png",
    href: "/",
  };

  return (
    <Navbar
      logo={logoConfig}
      navLinks={navLinks}
      search={searchConfig}
      ctaButtons={ctaButtons}
    />
  );
};

export default NavbarWrapper;
