"use client";

import React, { useState, useEffect, useRef } from "react";
import { NavbarProps, NavLink, CTAButton } from "./navbar.types";

/* ================================
   MODERN NAVBAR COMPONENT
   Glass morphism navbar with dashboard aesthetic
   ================================ */

const Navbar: React.FC<NavbarProps> = ({
  logo,
  navLinks,
  search,
  ctaButtons,
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
        <img
          src={logo.imageUrl}
          alt={logo.text}
          className="navbar-logo-image"
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
          <SearchIcon className="navbar-search-icon" />
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
              <CloseIcon />
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
              <ChevronDownIcon
                className={`navbar-dropdown-icon ${activeDropdown === link.id ? "open" : ""}`}
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

  const renderCTAButtons = () => (
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

        {/* Mobile CTAs */}
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
          {renderCTAButtons()}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="navbar-mobile-toggle"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
        >
          <HamburgerIcon />
        </button>
      </div>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </header>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="18"
    height="18"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="11" cy="11" r="8" />
    <path d="m21 21-4.35-4.35" />
  </svg>
);

const CloseIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="18" y1="6" x2="6" y2="18" />
    <line x1="6" y1="6" x2="18" y2="18" />
  </svg>
);

const ChevronDownIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="6,9 12,15 18,9" />
  </svg>
);

const HamburgerIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="3" y1="6" x2="21" y2="6" />
    <line x1="3" y1="12" x2="21" y2="12" />
    <line x1="3" y1="18" x2="21" y2="18" />
  </svg>
);

export default Navbar;
