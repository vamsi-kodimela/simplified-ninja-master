"use client";

import React, { useState } from "react";
import { Star } from "lucide-react";
import { CategoryProps } from "./category.types";
import Image from "next/image";

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
          <Image
            src={category.imageUrl}
            alt=""
            className="category-pill-image"
            onError={handleImageError}
            loading="lazy"
            width={24}
            height={24}
          />
        ) : (
          <span className="category-pill-letter">
            {getFirstLetter(category.title)}
          </span>
        )}
      </div>

      {/* Title */}
      <span className="category-pill-title">{category.title}</span>

      {/* Badges */}
      {category.isNew && <span className="category-pill-badge">New</span>}
      {category.isFeatured && <Star className="category-pill-star" size={12} />}
    </button>
  );
};

export default Category;
