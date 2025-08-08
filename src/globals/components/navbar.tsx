"use client";

import React, { useState, useEffect, useRef } from "react";
import { Search, X, ChevronDown, Menu } from "lucide-react";
import { NavbarProps } from "./navbar.types";
import Image from "next/image";

/* ================================
   MODERN NAVBAR COMPONENT
   Glass morphism navbar with dashboard aesthetic
   ================================ */

const Navbar: React.FC<NavbarProps> = ({
  logo,
  navLinks,
  search,
  ctaButtons,
  socialLinks = [],
  className = "",
}) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (navRef.current && !navRef.current.contains(event.target as Node)) {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search?.onSearch && searchQuery.trim()) {
      search.onSearch(searchQuery.trim());
    }
  };

  const handleClearSearch = () => {
    setSearchQuery("");
    search?.onClear?.();
  };

  const toggleDropdown = (linkId: string) => {
    setActiveDropdown(activeDropdown === linkId ? null : linkId);
  };

  const renderLogo = () => (
    <div className="navbar-logo">
      {logo.imageUrl ? (
        <Image
          src={logo.imageUrl}
          alt={logo.text}
          className="navbar-logo-image"
          width={32}
          height={32}
        />
      ) : (
        <div className="navbar-logo-icon">{logo.text.charAt(0)}</div>
      )}
      <span className="navbar-logo-text">{logo.text}</span>
    </div>
  );

  const renderSearchBar = () => {
    if (!search?.isEnabled) return null;

    return (
      <div className="navbar-search">
        <form onSubmit={handleSearch} className="navbar-search-form">
          <Search className="navbar-search-icon" size={18} />
          <input
            type="text"
            placeholder={search.placeholder || "Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleClearSearch}
              className="navbar-search-clear"
            >
              <X size={16} />
            </button>
          )}
        </form>
      </div>
    );
  };

  const renderNavLinks = () => (
    <nav className="navbar-nav">
      {navLinks.map((link) => (
        <div key={link.id} className="navbar-nav-item">
          <a
            href={link.children ? undefined : link.href}
            className={`navbar-nav-link ${link.isActive ? "active" : ""} ${link.children ? "has-dropdown" : ""}`}
            onClick={(e) => {
              if (link.children) {
                e.preventDefault();
                toggleDropdown(link.id);
              }
            }}
          >
            {link.label}
            {link.children && (
              <ChevronDown
                className={`navbar-dropdown-icon ${activeDropdown === link.id ? "open" : ""}`}
                size={14}
              />
            )}
          </a>

          {link.children && (
            <div
              className={`navbar-dropdown ${activeDropdown === link.id ? "open" : ""}`}
            >
              {link.children.map((subLink) => (
                <a
                  key={subLink.id}
                  href={subLink.href}
                  className="navbar-dropdown-link"
                >
                  {subLink.label}
                </a>
              ))}
            </div>
          )}
        </div>
      ))}
    </nav>
  );

  const renderSocialLinks = () => {
    if (!socialLinks || socialLinks.length === 0) return null;

    return (
      <div className="navbar-social">
        {socialLinks.map((social) => (
          <a
            key={social.id}
            href={social.href}
            className="navbar-social-link"
            target="_blank"
            rel="noopener noreferrer"
            aria-label={social.label || `Visit our ${social.platform}`}
          >
            {social.icon}
          </a>
        ))}
      </div>
    );
  };

  const renderCTAButtons = () => {
    if (ctaButtons.length === 0) return null;

    return (
      <div className="navbar-cta">
        {ctaButtons.map((button) => {
          const Element = button.href ? "a" : "button";
          return (
            <Element
              key={button.id}
              href={button.href}
              onClick={button.onClick}
              className={`navbar-cta-button navbar-cta-${button.variant} ${button.size ? `navbar-cta-${button.size}` : ""}`}
            >
              {button.label}
            </Element>
          );
        })}
      </div>
    );
  };

  const renderMobileMenu = () => (
    <div className={`navbar-mobile ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="navbar-mobile-content">
        {/* Mobile Navigation */}
        <div className="navbar-mobile-nav">
          {navLinks.map((link) => (
            <div key={link.id} className="navbar-mobile-item">
              <a
                href={link.href}
                className="navbar-mobile-link"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {link.label}
              </a>
              {link.children && (
                <div className="navbar-mobile-dropdown">
                  {link.children.map((subLink) => (
                    <a
                      key={subLink.id}
                      href={subLink.href}
                      className="navbar-mobile-sublink"
                      onClick={() => setIsMobileMenuOpen(false)}
                    >
                      {subLink.label}
                    </a>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Mobile Social Links */}
        {socialLinks && socialLinks.length > 0 && (
          <div className="navbar-mobile-social">
            <div className="navbar-mobile-social-title">Follow Us</div>
            <div className="navbar-mobile-social-links">
              {socialLinks.map((social) => (
                <a
                  key={social.id}
                  href={social.href}
                  className="navbar-mobile-social-link"
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => setIsMobileMenuOpen(false)}
                  aria-label={social.label || `Visit our ${social.platform}`}
                >
                  {social.icon}
                  <span>{social.platform}</span>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Mobile CTAs */}
        {ctaButtons.length > 0 && (
          <div className="navbar-mobile-cta">
            {ctaButtons.map((button) => (
              <a
                key={button.id}
                href={button.href}
                className={`navbar-mobile-button navbar-mobile-${button.variant}`}
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {button.label}
              </a>
            ))}
          </div>
        )}
      </div>
    </div>
  );

  return (
    <header
      ref={navRef}
      className={`navbar ${isScrolled ? "scrolled" : ""} ${className}`}
    >
      <div className="navbar-container">
        {/* Logo */}
        {logo.href ? (
          <a
            href={logo.href}
            className="navbar-logo-link"
            onClick={logo.onClick}
          >
            {renderLogo()}
          </a>
        ) : (
          <button onClick={logo.onClick} className="navbar-logo-button">
            {renderLogo()}
          </button>
        )}

        {/* Search Bar */}
        {renderSearchBar()}

        {/* Desktop Navigation */}
        <div className="navbar-desktop">
          {renderNavLinks()}
          {renderSocialLinks()}
          {renderCTAButtons()}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <Menu size={24} />
        </button>
      </div>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </header>
  );
};

/* ================================
   SOCIAL MEDIA ICONS (kept as they are brand-specific)
   ================================ */

export const TwitterIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

export const LinkedInIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
  </svg>
);

export const GitHubIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
  </svg>
);

export const YouTubeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
  </svg>
);

export default Navbar;
