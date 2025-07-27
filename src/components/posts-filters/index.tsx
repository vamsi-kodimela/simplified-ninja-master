"use client";
import React from "react";
import { useGlobalStore, LayoutType, SortType } from "@/store/global-store";
import { Category } from "../category";
import styles from "./posts-filters.module.css";

const PostsFilters = () => {
  const {
    searchQuery,
    selectedCategories,
    sortBy,
    layoutType,
    categories,
    filteredArticles,
    setSearchQuery,
    toggleCategory,
    setSortBy,
    setLayoutType,
    clearFilters,
  } = useGlobalStore();

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSortBy(e.target.value as SortType);
  };

  const handleLayoutChange = (layout: LayoutType) => {
    setLayoutType(layout);
  };

  const hasActiveFilters =
    searchQuery.trim() || selectedCategories.length > 0 || sortBy !== "newest";

  return (
    <div className={`card ${styles.container}`}>
      {/* Top Row - Search and Results Count */}
      <div className={styles.topRow}>
        <div className={styles.searchContainer}>
          <div className={styles.searchWrapper}>
            <svg
              className={styles.searchIcon}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.35-4.35" />
            </svg>
            <input
              type="text"
              placeholder="Search posts..."
              value={searchQuery}
              onChange={handleSearchChange}
              className={`form-input ${styles.searchInput}`}
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery("")}
                className={styles.clearSearch}
                aria-label="Clear search"
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            )}
          </div>
        </div>

        <div className={styles.resultsInfo}>
          <span className={styles.resultsCount}>
            {filteredArticles.length}{" "}
            {filteredArticles.length === 1 ? "post" : "posts"}
          </span>
        </div>
      </div>

      {/* Second Row - Categories */}
      <div className={styles.categoriesRow}>
        <div className={styles.categoriesContainer}>
          <span className={styles.filterLabel}>Categories:</span>
          <div className={styles.categoriesWrapper}>
            {categories.map((category) => (
              <div
                key={category.id}
                className={`${styles.categoryItem} ${
                  selectedCategories.includes(category.id) ? styles.active : ""
                }`}
                onClick={() => toggleCategory(category.id)}
              >
                <Category name={category.name} icon={category.icon} />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Third Row - Sort, Layout, and Clear Filters */}
      <div className={styles.bottomRow}>
        <div className={styles.leftControls}>
          <div className={styles.sortContainer}>
            <label htmlFor="sort-select" className={styles.sortLabel}>
              Sort by:
            </label>
            <select
              id="sort-select"
              value={sortBy}
              onChange={handleSortChange}
              className={`form-input ${styles.sortSelect}`}
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="title-asc">Title A-Z</option>
              <option value="title-desc">Title Z-A</option>
            </select>
          </div>

          {hasActiveFilters && (
            <button
              onClick={clearFilters}
              className={`btn btn-secondary ${styles.clearFilters}`}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="18" y1="6" x2="6" y2="18" />
                <line x1="6" y1="6" x2="18" y2="18" />
              </svg>
              Clear Filters
            </button>
          )}
        </div>

        <div className={styles.layoutControls}>
          <span className={styles.layoutLabel}>Layout:</span>
          <div className={styles.layoutButtons}>
            <button
              onClick={() => handleLayoutChange("grid")}
              className={`${styles.layoutButton} ${layoutType === "grid" ? styles.active : ""}`}
              aria-label="Grid layout"
              title="Grid layout"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="3" y="3" width="7" height="7" />
                <rect x="14" y="3" width="7" height="7" />
                <rect x="14" y="14" width="7" height="7" />
                <rect x="3" y="14" width="7" height="7" />
              </svg>
            </button>
            <button
              onClick={() => handleLayoutChange("compact")}
              className={`${styles.layoutButton} ${layoutType === "compact" ? styles.active : ""}`}
              aria-label="Compact layout"
              title="Compact layout"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export { PostsFilters };
