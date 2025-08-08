"use client";

import React from "react";
import { ExternalLink } from "lucide-react";
import Category from "./category";
import { CategoriesSectionProps } from "./category.types";

/* ================================
   CATEGORIES SECTION COMPONENT
   Main section containing category pills
   ================================ */

const CategoriesSection: React.FC<CategoriesSectionProps> = ({
  title = "Explore Categories",
  subtitle = "Discover content organized by topics that matter to you",
  categories,
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
                <ExternalLink size={16} />
              </button>
            )}
          </div>

          {/* Decorative elements */}
          <div className="categories-decoration">
            <div className="categories-decoration-orb categories-decoration-orb-1"></div>
            <div className="categories-decoration-orb categories-decoration-orb-2"></div>
          </div>
        </div>

        {/* Categories Pills */}
        <div className="categories-pills-container">
          {categories.map((category, index) => (
            <Category
              key={category.id}
              category={category}
              size="md"
              variant={category.isFeatured ? "featured" : "default"}
              className="categories-pill-item"
              style={{
                animationDelay: `${index * 0.05}s`,
              }}
            />
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
              <ExternalLink size={16} />
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

export default CategoriesSection;
