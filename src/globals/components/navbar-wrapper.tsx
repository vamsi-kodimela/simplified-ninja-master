"use client";

import React from "react";
import Navbar from "./navbar";

/* ================================
   NAVBAR WRAPPER COMPONENT
   Client component wrapper for navbar in layout
   ================================ */

const NavbarWrapper: React.FC = () => {
  // Navigation configuration
  const navigationItems = [
    {
      id: "home",
      label: "Home",
      href: "/",
    },
    {
      id: "about",
      label: "About",
      href: "/about",
    },
    {
      id: "services",
      label: "Services",
      children: [
        {
          id: "web-dev",
          label: "Web Development",
          href: "/services/web-development",
        },
        {
          id: "mobile-dev",
          label: "Mobile Apps",
          href: "/services/mobile-apps",
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

  const ctaButtons = [
    {
      id: "get-quote",
      label: "Get Quote",
      variant: "secondary" as const,
      href: "/quote",
    },
    {
      id: "get-started",
      label: "Get Started",
      variant: "primary" as const,
      href: "/get-started",
    },
  ];

  // Event handlers (can be defined in client component)
  const handleSearch = (query: string) => {
    // You can implement search functionality here
    console.log("Search query:", query);

    // Example: redirect to search page
    if (typeof window !== "undefined") {
      window.location.href = `/search?q=${encodeURIComponent(query)}`;
    }
  };

  const handleSearchClear = () => {
    console.log("Search cleared");
  };

  return (
    <Navbar
      logo={{
        type: "image",
        imageUrl: "/simplified-ninja-icon.png",
        text: "SimplifiedNinja",
        href: "/",
      }}
      navigation={navigationItems}
      search={{
        isEnabled: true,
        placeholder: "Search services, projects...",
        onSearch: handleSearch,
        onClear: handleSearchClear,
      }}
      cta={ctaButtons}
      theme="dark"
    />
  );
};

export default NavbarWrapper;
