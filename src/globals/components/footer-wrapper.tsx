"use client";

import React from "react";
import Footer, {
  TwitterIcon,
  LinkedInIcon,
  GitHubIcon,
  YouTubeIcon,
} from "./footer";
import {
  FooterSection,
  SocialLink,
  NewsletterConfig,
  BrandingConfig,
} from "./footer.types";
import { subscribeEmail } from "@/utils/subscription.util";

/* ================================
   FOOTER WRAPPER COMPONENT
   Configured footer for the application
   ================================ */

const FooterWrapper: React.FC = () => {
  // Quick Links Sections
  const footerSections: FooterSection[] = [
    {
      id: "content",
      title: "Content",
      links: [
        { id: "articles", label: "All Articles", href: "/article" },
        { id: "categories", label: "Categories", href: "/category" },
        { id: "frontend", label: "Frontend", href: "/category/frontend" },
        { id: "backend", label: "Backend", href: "/category/backend" },
      ],
    },
    {
      id: "company",
      title: "Company",
      links: [
        { id: "about", label: "About Us", href: "/about" },
        { id: "contact", label: "Contact", href: "/contact" },
        { id: "careers", label: "Careers", href: "/careers" },
        { id: "blog", label: "Blog", href: "/article" },
      ],
    },
    {
      id: "resources",
      title: "Resources",
      links: [
        { id: "guides", label: "Programming Guides", href: "/guides" },
        { id: "tutorials", label: "Tutorials", href: "/tutorials" },
        { id: "tools", label: "Developer Tools", href: "/tools" },
        { id: "faq", label: "FAQ", href: "/faq" },
      ],
    },
    {
      id: "legal",
      title: "Legal",
      links: [
        { id: "privacy", label: "Privacy Policy", href: "/privacy" },
        { id: "terms", label: "Terms of Service", href: "/terms" },
        { id: "cookies", label: "Cookie Policy", href: "/cookies" },
        { id: "disclaimer", label: "Disclaimer", href: "/disclaimer" },
      ],
    },
  ];

  // Social Links
  const socialLinks: SocialLink[] = [
    {
      id: "twitter",
      platform: "Twitter",
      href: "https://twitter.com/SimplifiedNinja",
      icon: <TwitterIcon />,
      label: "Follow us on Twitter for updates and tips",
    },
    {
      id: "linkedin",
      platform: "LinkedIn",
      href: "https://linkedin.com/company/simplified-ninja",
      icon: <LinkedInIcon />,
      label: "Connect with us on LinkedIn",
    },
    {
      id: "github",
      platform: "GitHub",
      href: "https://github.com/vamsi-kodimela",
      icon: <GitHubIcon />,
      label: "Check out our open source projects",
    },
    {
      id: "youtube",
      platform: "YouTube",
      href: "https://youtube.com/@SimplifiedNinja",
      icon: <YouTubeIcon />,
      label: "Subscribe for video tutorials",
    },
  ];

  // Newsletter Configuration
  const newsletterConfig: NewsletterConfig = {
    title: "Stay Updated",
    description:
      "Get the latest programming tutorials and insights delivered to your inbox. No spam, unsubscribe anytime.",
    placeholder: "Enter your email address",
    buttonText: "Subscribe",
    onSubmit: async (email: string) => {
      try {
        const result = await subscribeEmail(email);

        if (typeof window !== "undefined") {
          if (result.success) {
            alert(result.message);
          } else {
            alert(result.message);
          }
        }
      } catch (error) {
        console.error("Newsletter subscription error:", error);
        if (typeof window !== "undefined") {
          alert(
            "Sorry, there was an unexpected error. Please try again later.",
          );
        }
      }
    },
  };

  // Branding Configuration
  const brandingConfig: BrandingConfig = {
    name: "Simplified Ninja",
    description:
      "Your simplified guide to code. Learn programming through practical tutorials, case studies, and real-world examples. Master web development, software engineering, and more.",
    logo: "/simplified-ninja-icon.png",
  };

  // Copyright
  const currentYear = new Date().getFullYear();
  const copyright = `© ${currentYear} Simplified Ninja. All rights reserved.`;

  return (
    <Footer
      sections={footerSections}
      socialLinks={socialLinks}
      newsletter={newsletterConfig}
      branding={brandingConfig}
      copyright={copyright}
    />
  );
};

export default FooterWrapper;
