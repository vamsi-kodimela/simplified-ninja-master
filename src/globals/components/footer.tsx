"use client";

import React, { useState } from "react";
import { FooterProps } from "./footer.types";
import Image from "next/image";

/* ================================
   MODERN FOOTER COMPONENT
   Comprehensive footer with all sections
   ================================ */

const Footer: React.FC<FooterProps> = ({
  sections,
  socialLinks,
  newsletter,
  branding,
  copyright,
  className = "",
}) => {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    setIsSubmitting(true);
    try {
      await newsletter.onSubmit(email.trim());
      setEmail("");
    } catch (error) {
      console.error("Newsletter subscription error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <footer className={`footer ${className}`}>
      <div className="footer-container">
        {/* Main Footer Content */}
        <div className="footer-main">
          {/* Branding Section */}
          <div className="footer-branding">
            <div className="footer-brand">
              {branding.logo ? (
                <Image
                  src={branding.logo}
                  alt={branding.name}
                  className="footer-logo"
                  width={40}
                  height={40}
                />
              ) : (
                <div className="footer-logo-text">
                  {branding.name.charAt(0)}
                </div>
              )}
              <span className="footer-brand-name">{branding.name}</span>
            </div>
            <p className="footer-brand-description">{branding.description}</p>

            {/* Social Links */}
            <div className="footer-social">
              <h4 className="footer-social-title">Follow Us</h4>
              <div className="footer-social-links">
                {socialLinks.map((social) => (
                  <a
                    key={social.id}
                    href={social.href}
                    className="footer-social-link"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      social.label || `Follow us on ${social.platform}`
                    }
                  >
                    {social.icon}
                  </a>
                ))}
              </div>
            </div>
          </div>

          {/* Quick Links Sections */}
          <div className="footer-sections">
            {sections.map((section) => (
              <div key={section.id} className="footer-section">
                <h4 className="footer-section-title">{section.title}</h4>
                <ul className="footer-section-links">
                  {section.links.map((link) => (
                    <li key={link.id}>
                      <a href={link.href} className="footer-section-link">
                        {link.label}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Newsletter Section */}
          <div className="footer-newsletter">
            <h4 className="footer-newsletter-title">{newsletter.title}</h4>
            <p className="footer-newsletter-description">
              {newsletter.description}
            </p>
            <form
              onSubmit={handleNewsletterSubmit}
              className="footer-newsletter-form"
            >
              <div className="footer-newsletter-input-group">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder={newsletter.placeholder}
                  className="footer-newsletter-input"
                  required
                />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="footer-newsletter-button"
                >
                  {isSubmitting ? "Subscribing..." : newsletter.buttonText}
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>{copyright}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

/* ================================
   SOCIAL MEDIA ICONS
   Reusing from navbar for consistency
   ================================ */

export const TwitterIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedInIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const GitHubIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const YouTubeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default Footer;
