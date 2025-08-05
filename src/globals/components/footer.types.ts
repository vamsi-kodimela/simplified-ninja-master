/* ================================
   FOOTER TYPE DEFINITIONS
   TypeScript interfaces for footer component
   ================================ */

import React from "react";

export interface FooterLink {
  id: string;
  label: string;
  href: string;
}

export interface FooterSection {
  id: string;
  title: string;
  links: FooterLink[];
}

export interface SocialLink {
  id: string;
  platform: string;
  href: string;
  icon: React.ReactNode;
  label?: string;
}

export interface NewsletterConfig {
  title: string;
  description: string;
  placeholder: string;
  buttonText: string;
  onSubmit: (email: string) => void;
}

export interface BrandingConfig {
  name: string;
  description: string;
  logo?: string;
}

export interface FooterProps {
  sections: FooterSection[];
  socialLinks: SocialLink[];
  newsletter: NewsletterConfig;
  branding: BrandingConfig;
  copyright: string;
  className?: string;
}
