"use client";
import React, { useState, useMemo } from "react";
import styles from "./posts-section.module.css";
import { Post } from "../post";
import { PostsFilters } from "../posts-filters";
import { IArticle } from "../../models";

// Props for the Posts Section
interface PostsSectionProps {
  title?: string;
  posts?: IArticle[];
  maxPosts?: number;
  showFilters?: boolean;
  isLoading?: boolean;
}

// Props for Posts Section Header
interface PostsSectionHeaderProps {
  title: string;
  showFilters: boolean;
  onToggleFilters: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

// Header component
const PostsSectionHeader: React.FC<PostsSectionHeaderProps> = ({
  title,
  showFilters,
  onToggleFilters,
  onRefresh,
  isLoading = false,
}) => {
  return (
    <div className={styles.header}>
      <h2 className={styles.title}>{title}</h2>
      <div className={styles.controls}>
        <button
          onClick={onRefresh}
          disabled={isLoading}
          className={`${styles.refreshButton} ${isLoading ? styles.loading : ""}`}
        >
          <svg
            className={styles.refreshIcon}
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"
            />
          </svg>
          Refresh
        </button>
        {showFilters && (
          <button onClick={onToggleFilters} className={styles.filtersToggle}>
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
                d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.293A1 1 0 013 6.586V4z"
              />
            </svg>
            Filters
          </button>
        )}
      </div>
    </div>
  );
};

// Grid shimmer skeleton component
const ShimmerSkeleton = ({ count = 6 }: { count: number }) => {
  return (
    <div className={styles.shimmerContainer}>
      <div className={styles.shimmerGrid}>
        {Array.from({ length: count }).map((_, index) => (
          <div key={index} className={styles.shimmerCard}>
            <div className={styles.shimmerImage} />
            <div className={styles.shimmerContent}>
              <div className={`${styles.shimmerLine} ${styles.title}`} />
              <div className={`${styles.shimmerLine} ${styles.subtitle}`} />
              <div className={`${styles.shimmerLine} ${styles.text}`} />
              <div className={`${styles.shimmerLine} ${styles.short}`} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Main Posts Section Component
export const PostsSection: React.FC<PostsSectionProps> = ({
  title = "Latest Posts",
  posts = [],
  maxPosts = 6,
  showFilters = true,
  isLoading = false,
}) => {
  // State management
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [selectedCategories] = useState<string[]>([]);
  const [sortBy] = useState<"date" | "popularity">("date");
  const [localLoading, setLocalLoading] = useState(false);

  // Handle toggle filters
  const handleToggleFilters = () => {
    setShowFiltersPanel(!showFiltersPanel);
  };

  // Handle refresh
  const handleRefresh = () => {
    setLocalLoading(true);
    setTimeout(() => {
      setLocalLoading(false);
    }, 1000);
  };

  // Handle category filter
  // const handleCategoryFilter = (categories: string[]) => {
  //   setSelectedCategories(categories);
  // };

  // Check if in loading state
  const isLoadingState = isLoading || localLoading;

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        selectedCategories.some((categoryName) =>
          post.category?.name
            ?.toLowerCase()
            .includes(categoryName.toLowerCase()),
        ),
      );
    }

    // Sort posts
    const sorted = [...filtered].sort((a, b) => {
      if (sortBy === "date") {
        const dateA = new Date(a.createdAt || "");
        const dateB = new Date(b.createdAt || "");
        return dateB.getTime() - dateA.getTime();
      }
      // Add popularity sorting logic here if needed
      return 0;
    });

    // Apply max posts limit
    return sorted.slice(0, maxPosts);
  }, [posts, selectedCategories, sortBy, maxPosts]);

  // Render posts in grid layout
  const renderPosts = () => {
    return (
      <div className={styles.postsGrid}>
        {filteredAndSortedPosts.map((post) => (
          <Post key={post.id} post={post} />
        ))}
      </div>
    );
  };

  return (
    <section className={styles.postsSection}>
      <PostsSectionHeader
        title={title}
        showFilters={showFilters}
        onToggleFilters={handleToggleFilters}
        onRefresh={handleRefresh}
        isLoading={isLoadingState}
      />

      {showFiltersPanel && <PostsFilters />}

      <div className={styles.content}>
        {/* Shimmer loading state */}
        {isLoadingState && <ShimmerSkeleton count={maxPosts || 6} />}

        {/* Content when not loading */}
        {!isLoadingState && (
          <>
            {filteredAndSortedPosts.length === 0 ? (
              <div className={styles.emptyState}>
                <p>No posts found matching your criteria.</p>
              </div>
            ) : (
              renderPosts()
            )}
          </>
        )}
      </div>
    </section>
  );
};

// Demo component for standalone usage
export const PostsSectionDemo: React.FC = () => {
  const [isLoading] = useState(false);

  // const handleRefresh = () => {
  //   setIsLoading(true);
  //   setTimeout(() => {
  //     setIsLoading(false);
  //   }, 1000);
  // };

  return (
    <PostsSection
      title="Featured Posts"
      posts={[]} // No demo data - will show empty state
      maxPosts={6}
      showFilters={true}
      isLoading={isLoading}
    />
  );
};

// Export components
export { ShimmerSkeleton };
