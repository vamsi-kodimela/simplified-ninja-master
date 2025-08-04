"use client";

import React, { useState, useEffect, useRef } from "react";
import { NavbarProps, NavItem, CTAButton } from "./navbar.types";

/* ================================
   NAVBAR COMPONENT
   Configurable navigation bar with search, dropdowns, and mobile support
   ================================ */

const Navbar: React.FC<NavbarProps> = ({
  logo = {
    type: "text",
    text: "SimplifiedNinja",
    href: "/",
  },
  navigation = [],
  search,
  cta = [],
  theme = "dark",
  className = "",
  children,
}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const navRef = useRef<HTMLElement>(null);

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Handle click outside to close dropdowns
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

  // Handle escape key
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setActiveDropdown(null);
        setIsMobileMenuOpen(false);
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, []);

  const handleMobileMenuToggle = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setActiveDropdown(null);
  };

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (search?.onSearch && searchQuery.trim()) {
      search.onSearch(searchQuery.trim());
    }
  };

  const handleSearchClear = () => {
    setSearchQuery("");
    if (search?.onClear) {
      search.onClear();
    }
  };

  const renderLogo = () => {
    const LogoContent = () => (
      <div className="navbar-logo">
        {logo.type === "icon" && (
          <div className="navbar-logo-icon">{logo.icon || "SN"}</div>
        )}
        {logo.type === "image" && logo.imageUrl && (
          <img
            src={logo.imageUrl}
            alt={logo.text || "Logo"}
            className="navbar-logo-image"
            width={32}
            height={32}
          />
        )}
        {(logo.type === "text" || logo.type === "icon") && logo.text && (
          <span className="navbar-logo-text">{logo.text}</span>
        )}
      </div>
    );

    if (logo.href) {
      return (
        <a href={logo.href} className="navbar-logo-link" onClick={logo.onClick}>
          <LogoContent />
        </a>
      );
    }

    return (
      <button
        className="navbar-logo-button"
        onClick={logo.onClick}
        type="button"
      >
        <LogoContent />
      </button>
    );
  };

  const renderSearchBar = () => {
    if (!search?.isEnabled) return null;

    return (
      <div className="navbar-search">
        <form onSubmit={handleSearchSubmit} className="navbar-search-container">
          <SearchIcon className="navbar-search-icon" />
          <input
            type="text"
            placeholder={search.placeholder || "Search..."}
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="navbar-search-input"
            disabled={search.isLoading}
          />
          {searchQuery && (
            <button
              type="button"
              onClick={handleSearchClear}
              className="navbar-search-clear"
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
          {search.isLoading && (
            <div className="navbar-search-loading">
              <LoadingSpinner />
            </div>
          )}
        </form>
      </div>
    );
  };

  const renderNavItem = (item: NavItem) => {
    const hasDropdown = item.children && item.children.length > 0;
    const isDropdownOpen = activeDropdown === item.id;

    const handleItemClick = (e: React.MouseEvent) => {
      if (hasDropdown) {
        e.preventDefault();
        setActiveDropdown(isDropdownOpen ? null : item.id);
      } else if (item.onClick) {
        item.onClick();
      }
    };

    const handleKeyDown = (e: React.KeyboardEvent) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        handleItemClick(e as any);
      }
    };

    return (
      <li key={item.id} className="navbar-nav-item">
        <a
          href={!hasDropdown ? item.href : undefined}
          className={`navbar-nav-link ${item.isActive ? "active" : ""} ${item.isDisabled ? "disabled" : ""}`}
          onClick={handleItemClick}
          onKeyDown={handleKeyDown}
          role={hasDropdown ? "button" : undefined}
          aria-expanded={hasDropdown ? isDropdownOpen : undefined}
          aria-haspopup={hasDropdown ? "menu" : undefined}
          tabIndex={item.isDisabled ? -1 : 0}
        >
          {item.icon && <span className="navbar-nav-icon">{item.icon}</span>}
          <span>{item.label}</span>
          {item.badge && <span className="navbar-badge">{item.badge}</span>}
          {hasDropdown && (
            <ChevronDownIcon className="navbar-nav-dropdown-icon" />
          )}
        </a>

        {hasDropdown && (
          <div className={`navbar-dropdown ${isDropdownOpen ? "open" : ""}`}>
            {item.children?.map((subItem) => (
              <a
                key={subItem.id}
                href={subItem.href}
                className={`navbar-dropdown-item ${subItem.isActive ? "active" : ""} ${subItem.children ? "has-submenu" : ""}`}
                onClick={subItem.onClick}
              >
                {subItem.icon && (
                  <span className="navbar-dropdown-item-icon">
                    {subItem.icon}
                  </span>
                )}
                <div>
                  <div>{subItem.label}</div>
                  {subItem.badge && (
                    <span className="navbar-badge">{subItem.badge}</span>
                  )}
                </div>
              </a>
            ))}
          </div>
        )}
      </li>
    );
  };

  const renderCTAButton = (button: CTAButton) => {
    const buttonClass = `navbar-btn navbar-btn-${button.variant} ${button.size ? `navbar-btn-${button.size}` : ""}`;

    const ButtonContent = () => (
      <>
        {button.isLoading ? (
          <LoadingSpinner />
        ) : (
          button.icon && <span className="navbar-btn-icon">{button.icon}</span>
        )}
        <span>{button.label}</span>
      </>
    );

    if (button.href) {
      return (
        <a
          key={button.id}
          href={button.href}
          className={buttonClass}
          onClick={button.onClick}
        >
          <ButtonContent />
        </a>
      );
    }

    return (
      <button
        key={button.id}
        type="button"
        className={buttonClass}
        onClick={button.onClick}
        disabled={button.isDisabled || button.isLoading}
      >
        <ButtonContent />
      </button>
    );
  };

  const renderMobileMenu = () => (
    <div className={`navbar-mobile-menu ${isMobileMenuOpen ? "open" : ""}`}>
      <div className="navbar-mobile-content">
        <div className="navbar-mobile-header">
          {renderLogo()}
          <button
            type="button"
            className="navbar-mobile-close"
            onClick={() => setIsMobileMenuOpen(false)}
            aria-label="Close menu"
          >
            <CloseIcon />
          </button>
        </div>

        {search?.isEnabled && (
          <div className="navbar-mobile-search">{renderSearchBar()}</div>
        )}

        <nav className="navbar-mobile-nav">
          <ul className="navbar-mobile-nav-list">
            {navigation.map((item) => (
              <MobileNavItem key={item.id} item={item} />
            ))}
          </ul>
        </nav>

        {cta.length > 0 && (
          <div className="navbar-mobile-cta">{cta.map(renderCTAButton)}</div>
        )}
      </div>
    </div>
  );

  return (
    <>
      <nav
        ref={navRef}
        className={`navbar ${isScrolled ? "scrolled" : ""} ${className}`}
        data-theme={theme}
      >
        <div className="navbar-container">
          {/* Logo */}
          {renderLogo()}

          {/* Search Bar */}
          {renderSearchBar()}

          {/* Desktop Navigation */}
          <ul className="navbar-nav">{navigation.map(renderNavItem)}</ul>

          {/* CTA Buttons */}
          <div className="navbar-cta">{cta.map(renderCTAButton)}</div>

          {/* Mobile Menu Toggle */}
          <button
            type="button"
            className="navbar-mobile-toggle"
            onClick={handleMobileMenuToggle}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            <HamburgerIcon />
          </button>
        </div>

        {children}
      </nav>

      {/* Mobile Menu */}
      {renderMobileMenu()}
    </>
  );
};

/* ================================
   MOBILE NAV ITEM COMPONENT
   ================================ */

const MobileNavItem: React.FC<{ item: NavItem }> = ({ item }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const hasChildren = item.children && item.children.length > 0;

  const handleToggle = () => {
    if (hasChildren) {
      setIsExpanded(!isExpanded);
    } else if (item.onClick) {
      item.onClick();
    }
  };

  return (
    <li className="navbar-mobile-nav-item">
      <a
        href={!hasChildren ? item.href : undefined}
        className={`navbar-mobile-nav-link ${item.isActive ? "active" : ""}`}
        onClick={
          hasChildren
            ? (e) => {
                e.preventDefault();
                handleToggle();
              }
            : item.onClick
        }
      >
        {item.icon && (
          <span className="navbar-mobile-nav-icon">{item.icon}</span>
        )}
        <span>{item.label}</span>
        {item.badge && <span className="navbar-badge">{item.badge}</span>}
        {hasChildren && (
          <button
            type="button"
            className="navbar-mobile-dropdown-toggle"
            onClick={(e) => {
              e.stopPropagation();
              e.preventDefault();
              handleToggle();
            }}
            aria-expanded={isExpanded}
          >
            {isExpanded ? "−" : "+"}
          </button>
        )}
      </a>

      {hasChildren && (
        <div className={`navbar-mobile-dropdown ${isExpanded ? "open" : ""}`}>
          {item.children?.map((subItem) => (
            <a
              key={subItem.id}
              href={subItem.href}
              className="navbar-mobile-dropdown-item"
              onClick={subItem.onClick}
            >
              {subItem.icon && (
                <span className="navbar-mobile-dropdown-icon">
                  {subItem.icon}
                </span>
              )}
              <span>{subItem.label}</span>
              {subItem.badge && (
                <span className="navbar-badge">{subItem.badge}</span>
              )}
            </a>
          ))}
        </div>
      )}
    </li>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const SearchIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
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
    width="12"
    height="12"
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
    width="20"
    height="20"
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

const LoadingSpinner = ({ className = "" }: { className?: string }) => (
  <svg
    className={`loading-spinner ${className}`}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
  >
    <circle
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
      strokeDasharray="32"
      strokeDashoffset="32"
    >
      <animate
        attributeName="stroke-dasharray"
        dur="2s"
        values="0 32;16 16;0 32;0 32"
        repeatCount="indefinite"
      />
      <animate
        attributeName="stroke-dashoffset"
        dur="2s"
        values="0;-16;-32;-32"
        repeatCount="indefinite"
      />
    </circle>
  </svg>
);

export default Navbar;
