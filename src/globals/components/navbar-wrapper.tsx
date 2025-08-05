"use client";

import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import Navbar, {
  TwitterIcon,
  LinkedInIcon,
  GitHubIcon,
  YouTubeIcon,
} from "./navbar";
import { NavLink, CTAButton, SocialLink } from "./navbar.types";

/* ================================
   NAVBAR WRAPPER COMPONENT
   Configured navbar for the application
   ================================ */

const NavbarWrapper: React.FC = () => {
  const pathname = usePathname();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Function to determine if a link is active
  const isLinkActive = (href: string): boolean => {
    // HYDRATION FIX: Prevent hydration mismatch by ensuring server and client
    // render the same initial state (no active links), then apply active states
    // after hydration completes via useEffect
    if (typeof window === "undefined" || !hasMounted) {
      return false;
    }

    if (href === "/") {
      return pathname === "/";
    }

    // Special case: /article/[slug] should activate Articles link
    if (href === "/article" && pathname.startsWith("/article/")) {
      return true;
    }

    return pathname.startsWith(href);
  };

  // Navigation links configuration
  const navLinks: NavLink[] = [
    {
      id: "home",
      label: "Home",
      href: "/",
      isActive: isLinkActive("/"),
    },
    {
      id: "articles",
      label: "Articles",
      href: "/article",
      isActive: isLinkActive("/article"),
    },
    {
      id: "categories",
      label: "Categories",
      href: "/category",
      isActive: isLinkActive("/category"),
    },
    // {
    //   id: "about",
    //   label: "About",
    //   href: "/about",
    //   isActive: isLinkActive("/about"),
    // },
    {
      id: "contact",
      label: "Contact",
      href: "mailto:vamsikrishnakdml@gmail.com",
    },
  ];

  // Social links configuration
  const socialLinks: SocialLink[] = [
    {
      id: "twitter",
      platform: "Twitter",
      href: "https://x.com/vamsi_kodimelaa",
      icon: <TwitterIcon />,
      label: "Follow us on Twitter",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      href: "https://www.linkedin.com/in/vamsi-krishna-kodimela/",
      icon: <LinkedInIcon />,
      label: "Connect with us on LinkedIn",
    },
    {
      id: "github",
      platform: "GitHub",
      href: "https://github.com/vamsi-krishna-kodimela  ",
      icon: <GitHubIcon />,
      label: "Check out our GitHub",
    },
    {
      id: "youtube",
      platform: "YouTube",
      href: "https://www.youtube.com/@VAMSIKRISHNAKODIMELA",
      icon: <YouTubeIcon />,
      label: "Subscribe to our YouTube channel",
    },
  ];

  // CTA buttons configuration
  const ctaButtons: CTAButton[] = [
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
      socialLinks={socialLinks}
    />
  );
};

export default NavbarWrapper;
