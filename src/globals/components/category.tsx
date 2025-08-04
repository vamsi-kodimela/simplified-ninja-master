"use client";

import React, { useState } from "react";
import { CategoryProps } from "./category.types";

/* ================================
   CATEGORY COMPONENT
   Individual category card with image/letter fallback
   ================================ */

const Category: React.FC<CategoryProps> = ({
  category,
  size = "md",
  variant = "default",
  className = "",
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const getFirstLetter = (title: string): string => {
    return title.charAt(0).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handleCategoryClick = () => {
    if (category.onClick) {
      category.onClick();
    } else if (category.href) {
      window.location.href = category.href;
    }
  };

  const cardClasses = [
    "category-card",
    `category-card-${size}`,
    `category-card-${variant}`,
    category.isFeatured ? "category-card-featured" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <div className={cardClasses} onClick={handleCategoryClick}>
      {/* Badge indicators */}
      {(category.isNew || category.isFeatured) && (
        <div className="category-badges">
          {category.isNew && (
            <span className="category-badge category-badge-new">New</span>
          )}
          {category.isFeatured && (
            <span className="category-badge category-badge-featured">
              <StarIcon />
              Featured
            </span>
          )}
        </div>
      )}

      {/* Image or Letter Avatar */}
      <div className="category-image-container">
        {!imageError && category.imageUrl ? (
          <>
            {imageLoading && (
              <div className="category-image-skeleton">
                <div className="category-letter-avatar">
                  {getFirstLetter(category.title)}
                </div>
              </div>
            )}
            <img
              src={category.imageUrl}
              alt={category.title}
              className={`category-image ${imageLoading ? "loading" : ""}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <div className="category-letter-avatar">
            <span className="category-letter">
              {getFirstLetter(category.title)}
            </span>
          </div>
        )}

        {/* Overlay gradient */}
        <div className="category-image-overlay"></div>

        {/* Hover effect */}
        <div className="category-hover-effect">
          <ArrowRightIcon />
        </div>
      </div>

      {/* Content */}
      <div className="category-content">
        <h3 className="category-title">{category.title}</h3>

        {category.description && (
          <p className="category-description">{category.description}</p>
        )}

        {/* Footer with count */}
        <div className="category-footer">
          {category.count !== undefined && (
            <span className="category-count">
              {category.count} item{category.count !== 1 ? "s" : ""}
            </span>
          )}

          <div className="category-arrow">
            <ChevronRightIcon />
          </div>
        </div>
      </div>

      {/* Card glow effect */}
      <div className="category-glow"></div>
    </div>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

const ChevronRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <polyline points="9,18 15,12 9,6" />
  </svg>
);

export default Category;
