"use client";

import React from "react";
import Category from "./category";
import { CategoriesSectionProps } from "./category.types";

/* ================================
   CATEGORIES SECTION COMPONENT
   Main section containing category grid
   ================================ */

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  title = "Explore Categories",
  subtitle = "Discover content organized by topics that matter to you",
  categories,
  columns = 3,
  showViewAll = true,
  viewAllHref = "/categories",
  onViewAll,
  className = "",
}) => {
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else if (viewAllHref) {
      window.location.href = viewAllHref;
    }
  };

  const gridClasses = ["categories-grid", `categories-grid-${columns}`].join(
    " ",
  );

  return (
    <section className={`categories-section ${className}`}>
      <div className="categories-container">
        {/* Section Header */}
        <div className="categories-header">
          <div className="categories-header-content">
            <div className="categories-title-group">
              <h2 className="categories-title">{title}</h2>
              {subtitle && <p className="categories-subtitle">{subtitle}</p>}
            </div>

            {showViewAll && (
              <button className="categories-view-all" onClick={handleViewAll}>
                <span>View All</span>
                <ViewAllIcon />
              </button>
            )}
          </div>

          {/* Decorative elements */}
          <div className="categories-decoration">
            <div className="categories-decoration-orb categories-decoration-orb-1"></div>
            <div className="categories-decoration-orb categories-decoration-orb-2"></div>
          </div>
        </div>

        {/* Categories Grid */}
        <div className={gridClasses}>
          {categories.map((category, index) => (
            <div
              key={category.id}
              className="categories-grid-item"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <Category
                category={category}
                size="md"
                variant={category.isFeatured ? "featured" : "default"}
              />
            </div>
          ))}
        </div>

        {/* Bottom CTA for mobile */}
        {showViewAll && (
          <div className="categories-mobile-cta">
            <button
              className="categories-mobile-view-all"
              onClick={handleViewAll}
            >
              <span>View All Categories</span>
              <ViewAllIcon />
            </button>
          </div>
        )}
      </div>

      {/* Background Effects */}
      <div className="categories-background">
        <div className="categories-gradient-orb categories-gradient-orb-1"></div>
        <div className="categories-gradient-orb categories-gradient-orb-2"></div>
        <div className="categories-gradient-orb categories-gradient-orb-3"></div>
      </div>
    </section>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const ViewAllIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

export default CategoriesSection;
