"use client";

import React, { useState } from "react";
import { CategoryProps } from "./category.types";

/* ================================
   CATEGORY PILL COMPONENT
   Compact pill-shaped category with icon/letter
   ================================ */

const Category: React.FC<CategoryProps> = ({
  category,
  size = "md",
  variant = "default",
  className = "",
  style,
}) => {
  const [imageError, setImageError] = useState(false);

  const getFirstLetter = (title: string): string => {
    return title.charAt(0).toUpperCase();
  };

  const handleImageError = () => {
    setImageError(true);
  };

  const handleCategoryClick = () => {
    if (category.onClick) {
      category.onClick();
    } else if (category.href) {
      window.location.href = category.href;
    }
  };

  const pillClasses = [
    "category-pill",
    `category-pill-${size}`,
    `category-pill-${variant}`,
    category.isFeatured ? "category-pill-featured" : "",
    category.isNew ? "category-pill-new" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <button className={pillClasses} onClick={handleCategoryClick} style={style}>
      {/* Icon or Letter Avatar */}
      <div className="category-pill-icon">
        {!imageError && category.imageUrl ? (
          <img
            src={category.imageUrl}
            alt=""
            className="category-pill-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <span className="category-pill-letter">
            {getFirstLetter(category.title)}
          </span>
        )}
      </div>

      {/* Title */}
      <span className="category-pill-title">{category.title}</span>

      {/* Count */}
      {category.count !== undefined && (
        <span className="category-pill-count">{category.count}</span>
      )}

      {/* Badges */}
      {category.isNew && <span className="category-pill-badge">New</span>}
      {category.isFeatured && <StarIcon className="category-pill-star" />}
    </button>
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

export default Category;
