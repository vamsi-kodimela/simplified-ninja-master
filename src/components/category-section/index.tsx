"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Category } from "../category";
import { ICategory } from "../../models";
import { API_URL } from "../../config/api.config";
import styles from "./category-section.module.css";

interface CategorySectionProps {
  categories?: ICategory[];
  maxCategories?: number;
  onCategoryClick?: (category: ICategory) => void;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  categories,
  maxCategories = 6 /* Reduced from 8 to 6 for cleaner loading state */,
  onCategoryClick,
}) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCategories, setDisplayCategories] = useState<ICategory[]>([]);
  const router = useRouter();

  const fetchCategories = async (): Promise<ICategory[]> => {
    try {
      const response = await fetch(`${API_URL}/category`);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("API did not return JSON data");
      }

      const data = await response.json();
      console.log("Categories API Response:", data); // Debug log

      // Handle different possible response structures
      let categoriesData: ICategory[] = [];

      if (Array.isArray(data)) {
        categoriesData = data;
      } else if (Array.isArray(data.docs)) {
        categoriesData = data.docs;
      } else if (Array.isArray(data.data)) {
        categoriesData = data.data;
      } else if (Array.isArray(data.categories)) {
        categoriesData = data.categories;
      } else {
        console.warn("Unexpected API response structure:", data);
        categoriesData = [];
      }

      console.log("Processed categories:", categoriesData); // Debug log
      return categoriesData;
    } catch (err) {
      console.error("Error fetching categories:", err);
      throw err;
    }
  };

  useEffect(() => {
    const loadCategories = async () => {
      try {
        setLoading(true);
        setError(null);

        let categoriesToDisplay: ICategory[] = [];

        if (categories && categories.length > 0) {
          // Use provided categories if available
          categoriesToDisplay = categories;
        } else {
          // Fetch categories from API
          categoriesToDisplay = await fetchCategories();
        }

        // Apply maxCategories limit
        const limitedCategories = categoriesToDisplay.slice(0, maxCategories);
        setDisplayCategories(limitedCategories);
      } catch (err) {
        setError("Failed to load categories. Please try again.");
        console.error("Error loading categories:", err);
        setDisplayCategories([]);
      } finally {
        setLoading(false);
      }
    };

    loadCategories();
  }, [categories, maxCategories]);

  const handleCategoryClick = (category: ICategory) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    } else {
      // Default behavior - navigate to category page
      const categorySlug = category.slug || category.id;
      router.push(`/category/${categorySlug}`);
    }
  };

  const handleRetry = async () => {
    setError(null);
    setLoading(true);

    try {
      let categoriesToDisplay: ICategory[] = [];

      if (categories && categories.length > 0) {
        categoriesToDisplay = categories;
      } else {
        categoriesToDisplay = await fetchCategories();
      }

      const limitedCategories = categoriesToDisplay.slice(0, maxCategories);
      setDisplayCategories(limitedCategories);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error loading categories:", err);
      setDisplayCategories([]);
    } finally {
      setLoading(false);
    }
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
