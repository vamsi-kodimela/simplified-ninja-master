"use client";
import React, { useState, useEffect } from "react";
import { Category } from "../category";
import styles from "./category-section.module.css";

interface CategoryData {
  id: string;
  name: string;
  icon?: string;
  count?: number;
}

interface CategorySectionProps {
  title?: string;
  subtitle?: string;
  categories?: CategoryData[];
  maxCategories?: number;
  showViewAll?: boolean;
  onCategoryClick?: (category: CategoryData) => void;
  onViewAllClick?: () => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  title = "Explore Categories",
  subtitle = "Discover content across different topics",
  categories,
  maxCategories = 8,
  showViewAll = true,
  onCategoryClick,
  onViewAllClick,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCategories, setDisplayCategories] = useState<CategoryData[]>(
    [],
  );

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        if (categories && categories.length > 0) {
          // Use provided categories
          const limitedCategories = categories.slice(0, maxCategories);
          setDisplayCategories(limitedCategories);
        } else {
          // No categories provided - show empty state or fetch from API
          setDisplayCategories([]);
        }
      } catch (err) {
        setError("Failed to load categories. Please try again.");
        console.error("Error loading categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [categories, maxCategories]);

  const handleCategoryClick = (category: CategoryData) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const handleViewAllClick = () => {
    if (onViewAllClick) {
      onViewAllClick();
    } else {
      // Default behavior when no handler is provided (e.g., from Server Component)
      console.log("View all categories - default behavior");
      // Could navigate to a categories page or trigger other default action
    }
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    // Re-trigger the effect
    setTimeout(() => {
      if (categories && categories.length > 0) {
        setDisplayCategories(categories.slice(0, maxCategories));
      } else {
        setDisplayCategories([]);
      }
      setLoading(false);
    }, 800);
  };

  const renderShimmerState = () => (
    <div className={styles.shimmerContainer}>
      <div className={styles.shimmerGrid}>
        {Array.from({ length: maxCategories }).map((_, index) => (
          <div key={index} className={styles.shimmerCategory}>
            <div className={styles.shimmerIcon} />
            <div className={styles.shimmerText} />
          </div>
        ))}
      </div>
      <p className={styles.shimmerMessage}>Loading categories...</p>
    </div>
  );

  const renderErrorState = () => (
    <div className={styles.errorContainer}>
      <svg
        className={styles.errorIcon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
        />
      </svg>
      <h3 className={styles.errorTitle}>Unable to Load Categories</h3>
      <p className={styles.errorMessage}>
        We&apos;re having trouble loading the categories right now. Please check
        your connection and try again.
      </p>
      <button onClick={handleRetry} className={styles.retryButton}>
        <svg
          width="16"
          height="16"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
          />
        </svg>
        Try Again
      </button>
    </div>
  );

  const renderCategories = () => (
    <div className={styles.categoriesContainer}>
      <div className={styles.categoriesGrid}>
        {displayCategories.map((category) => (
          <Category
            key={category.id}
            name={category.name}
            icon={category.icon}
            onClick={() => handleCategoryClick(category)}
          />
        ))}
      </div>
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.errorContainer}>
      <svg
        className={styles.errorIcon}
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
        />
      </svg>
      <h3 className={styles.errorTitle}>No Categories Available</h3>
      <p className={styles.errorMessage}>
        Categories will appear here when they become available.
      </p>
    </div>
  );

  return (
    <section className={styles.categorySection}>
      <div className={styles.header}>
        <div>
          <h2 className={styles.title}>{title}</h2>
          <p className={styles.subtitle}>{subtitle}</p>
        </div>
        {showViewAll && !loading && !error && displayCategories.length > 0 && (
          <button onClick={handleViewAllClick} className={styles.viewAllButton}>
            View All
            <svg
              className={styles.viewAllIcon}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7-7 7"
              />
            </svg>
          </button>
        )}
      </div>

      {loading && renderShimmerState()}
      {error && !loading && renderErrorState()}
      {!loading &&
        !error &&
        displayCategories.length === 0 &&
        renderEmptyState()}
      {!loading && !error && displayCategories.length > 0 && renderCategories()}
    </section>
  );
};

export default CategorySection;
