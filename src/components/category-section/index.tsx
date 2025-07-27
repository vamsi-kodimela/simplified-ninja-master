"use client";
import React, { useState, useEffect } from "react";
import { ICategory } from "@/models";
import { API_URL } from "@/config/api.config";
import { Category } from "../category";
import styles from "./category-section.module.css";

type LayoutType = "list" | "grid";

interface CategorySectionProps {
  layout?: LayoutType;
  title?: string;
  showLayoutToggle?: boolean;
  onCategoryClick?: (category: ICategory) => void;
  className?: string;
}

const CategorySection: React.FC<CategorySectionProps> = ({
  layout = "grid",
  title = "Categories",
  showLayoutToggle = true,
  onCategoryClick,
  className = "",
}) => {
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentLayout, setCurrentLayout] = useState<LayoutType>(layout);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`${API_URL}/category`);

      if (!response.ok) {
        throw new Error(`Failed to fetch categories: ${response.statusText}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Debug log

      // Handle different possible response structures
      let categoriesData: ICategory[] = [];

      if (Array.isArray(data)) {
        categoriesData = data;
      } else if (Array.isArray(data.data)) {
        categoriesData = data.data;
      } else if (Array.isArray(data.docs)) {
        categoriesData = data.docs;
      } else if (Array.isArray(data.categories)) {
        categoriesData = data.categories;
      } else {
        console.warn("Unexpected API response structure:", data);
        categoriesData = [];
      }

      console.log("Processed categories:", categoriesData); // Debug log
      setCategories(categoriesData);
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch categories",
      );
      console.error("Error fetching categories:", err);
      setCategories([]); // Ensure it's always an array on error
    } finally {
      setLoading(false);
    }
  };

  const handleCategoryClick = (category: ICategory) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const handleLayoutChange = (newLayout: LayoutType) => {
    setCurrentLayout(newLayout);
  };

  const renderLayoutToggle = () => {
    if (!showLayoutToggle) return null;

    return (
      <div className={styles.layoutToggle}>
        <button
          className={`${styles.layoutButton} ${currentLayout === "grid" ? styles.active : ""}`}
          onClick={() => handleLayoutChange("grid")}
          aria-label="Grid layout"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path d="M1 2.5A1.5 1.5 0 0 1 2.5 1h3A1.5 1.5 0 0 1 7 2.5v3A1.5 1.5 0 0 1 5.5 7h-3A1.5 1.5 0 0 1 1 5.5v-3zm8 0A1.5 1.5 0 0 1 10.5 1h3A1.5 1.5 0 0 1 15 2.5v3A1.5 1.5 0 0 1 13.5 7h-3A1.5 1.5 0 0 1 9 5.5v-3zm-8 8A1.5 1.5 0 0 1 2.5 9h3A1.5 1.5 0 0 1 7 10.5v3A1.5 1.5 0 0 1 5.5 15h-3A1.5 1.5 0 0 1 1 13.5v-3zm8 0A1.5 1.5 0 0 1 10.5 9h3A1.5 1.5 0 0 1 15 10.5v3A1.5 1.5 0 0 1 13.5 15h-3A1.5 1.5 0 0 1 9 13.5v-3z" />
          </svg>
        </button>
        <button
          className={`${styles.layoutButton} ${currentLayout === "list" ? styles.active : ""}`}
          onClick={() => handleLayoutChange("list")}
          aria-label="List layout"
        >
          <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
            <path
              fillRule="evenodd"
              d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
            />
          </svg>
        </button>
      </div>
    );
  };

  const renderLoadingState = () => (
    <div className={styles.loadingContainer}>
      <div className={styles.loadingSpinner}></div>
      <p className={styles.loadingText}>Loading categories...</p>
    </div>
  );

  const renderErrorState = () => (
    <div className={styles.errorContainer}>
      <div className={styles.errorIcon}>⚠️</div>
      <p className={styles.errorText}>{error}</p>
      <button className={styles.retryButton} onClick={fetchCategories}>
        Try Again
      </button>
    </div>
  );

  const renderEmptyState = () => (
    <div className={styles.emptyContainer}>
      <div className={styles.emptyIcon}>📂</div>
      <p className={styles.emptyText}>No categories found</p>
    </div>
  );

  const renderCategories = () => {
    // Ensure categories is always an array
    const categoriesArray = Array.isArray(categories) ? categories : [];

    if (categoriesArray.length === 0) {
      return renderEmptyState();
    }

    const containerClass =
      currentLayout === "grid"
        ? `${styles.categoriesContainer} ${styles.gridLayout}`
        : `${styles.categoriesContainer} ${styles.listLayout}`;

    return (
      <div className={containerClass}>
        {categoriesArray.map((category: ICategory) => (
          <Category
            key={category.id}
            name={category.name}
            icon={category.icon}
            onClick={() => handleCategoryClick(category)}
            className={currentLayout === "list" ? styles.listItem : ""}
          />
        ))}
      </div>
    );
  };

  return (
    <section className={`${styles.categorySection} ${className}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>{title}</h2>
        {renderLayoutToggle()}
      </div>

      <div className={styles.content}>
        {loading && renderLoadingState()}
        {error && !loading && renderErrorState()}
        {!loading && !error && renderCategories()}
      </div>
    </section>
  );
};

export { CategorySection };
