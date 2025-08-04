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
      id: "about",
      label: "About",
      href: "/about",
    },
    {
      id: "services",
      label: "Services",
      href: "#",
      children: [
        {
          id: "web-dev",
          label: "Web Development",
          href: "/services/web-development",
        },
        {
          id: "mobile-dev",
          label: "Mobile Apps",
          href: "/services/mobile-development",
        },
        {
          id: "ui-design",
          label: "UI/UX Design",
          href: "/services/ui-design",
        },
        {
          id: "consulting",
          label: "Consulting",
          href: "/services/consulting",
        },
      ],
    },
    {
      id: "portfolio",
      label: "Portfolio",
      href: "/portfolio",
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
      id: "get-quote",
      label: "Get Quote",
      href: "/quote",
      variant: "secondary",
    },
    {
      id: "get-started",
      label: "Get Started",
      href: "/get-started",
      variant: "primary",
    },
  ];

  // Search configuration
  const searchConfig = {
    isEnabled: true,
    placeholder: "Search services, projects...",
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
