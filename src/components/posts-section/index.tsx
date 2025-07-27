"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useGlobalStore, LayoutType } from "@/store/global-store";
import { PostsFilters } from "../posts-filters";
import { PostVariant } from "../post-variants";
import styles from "./posts-section.module.css";

interface PostsSectionProps {
  showFilters?: boolean;
  maxPosts?: number;
  className?: string;
  isLoading?: boolean;
  onViewAll?: () => void;
}

// Loading skeleton component
const LoadingSkeleton = ({
  count = 6,
  layout = "grid",
}: {
  count?: number;
  layout?: LayoutType;
}) => {
  const getLoadingClass = () => {
    switch (layout) {
      case "list":
        return styles.listLayout;
      case "compact":
        return styles.compactLayout;
      default:
        return styles.loadingGrid;
    }
  };

  return (
    <div className={`${styles.loadingContainer} ${getLoadingClass()}`}>
      {Array.from({ length: count }).map((_, index) => (
        <div key={index} className={styles.loadingCard}>
          <div className={styles.loadingImage} />
          <div className={styles.loadingContent}>
            <div className={`${styles.loadingLine} ${styles.title}`} />
            <div className={`${styles.loadingLine} ${styles.subtitle}`} />
            <div className={`${styles.loadingLine} ${styles.text}`} />
            <div className={`${styles.loadingLine} ${styles.short}`} />
          </div>
        </div>
      ))}
    </div>
  );
};

// Enhanced empty state component
const EmptyState = ({
  hasActiveFilters,
  onClearFilters,
  onViewAll,
}: {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onViewAll?: () => void;
}) => {
  return (
    <div className={styles.noResults}>
      <div className={styles.noResultsIcon}>
        {hasActiveFilters ? (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <circle cx="11" cy="11" r="8" />
            <path d="m21 21-4.35-4.35" />
          </svg>
        ) : (
          <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
            <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
            <line x1="16" y1="2" x2="16" y2="6" />
            <line x1="8" y1="2" x2="8" y2="6" />
            <line x1="3" y1="10" x2="21" y2="10" />
          </svg>
        )}
      </div>

      <h3 className={styles.noResultsTitle}>
        {hasActiveFilters ? "No posts found" : "No posts available"}
      </h3>

      <p className={styles.noResultsDescription}>
        {hasActiveFilters
          ? "We couldn't find any posts matching your current filters. Try adjusting your search terms or removing some filters."
          : "There are no posts to display at the moment. Check back later for new content!"}
      </p>

      <div className={styles.noResultsActions}>
        {hasActiveFilters && (
          <button onClick={onClearFilters} className={styles.noResultsButton}>
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="m3 16 4 4 4-4" />
              <path d="M7 20V4" />
              <path d="M17 10l4 4-4 4" />
              <path d="M21 14H9" />
            </svg>
            Clear All Filters
          </button>
        )}

        {onViewAll && (
          <button
            onClick={onViewAll}
            className={`${styles.noResultsButton} ${styles.secondary}`}
          >
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path d="M3 7V5c0-1.1.9-2 2-2h2" />
              <path d="M17 3h2c1.1 0 2 .9 2 2v2" />
              <path d="M21 17v2c0 1.1-.9 2-2 2h-2" />
              <path d="M7 21H5c-1.1 0-2-.9-2-2v-2" />
            </svg>
            Browse All Posts
          </button>
        )}
      </div>
    </div>
  );
};

const PostsSection = ({
  showFilters = true,
  maxPosts,
  className = "",
  isLoading = false,
  onViewAll,
}: PostsSectionProps) => {
  const {
    filteredArticles,
    layoutType,
    searchQuery,
    selectedCategories,
    sortBy,
    clearFilters,
  } = useGlobalStore();

  const [localLoading, setLocalLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Trigger animation when filters change
  useEffect(() => {
    setAnimationKey((prev) => prev + 1);
  }, [searchQuery, selectedCategories, sortBy, layoutType]);

  // Apply maxPosts limit if specified
  const displayedPosts = useMemo(() => {
    return maxPosts ? filteredArticles.slice(0, maxPosts) : filteredArticles;
  }, [filteredArticles, maxPosts]);

  const hasActiveFilters = useMemo(() => {
    return Boolean(
      searchQuery.trim() ||
        selectedCategories.length > 0 ||
        sortBy !== "newest",
    );
  }, [searchQuery, selectedCategories, sortBy]);

  const showPagination = maxPosts && filteredArticles.length > maxPosts;

  // Generate grid columns based on layout
  const getGridClass = () => {
    switch (layoutType) {
      case "grid":
        return styles.gridLayout;
      case "list":
        return styles.listLayout;
      case "compact":
        return styles.compactLayout;
      default:
        return styles.gridLayout;
    }
  };

  // Handle view all button click
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else {
      // Default behavior - could navigate to full posts page
      console.log("Navigate to all posts");
    }
  };

  // Handle clear filters
  const handleClearFilters = () => {
    setLocalLoading(true);
    clearFilters();

    // Simulate brief loading for better UX
    setTimeout(() => {
      setLocalLoading(false);
    }, 300);
  };

  const isLoadingState = isLoading || localLoading;

  return (
    <section
      className={`${styles.container} ${className}`}
      role="region"
      aria-label={showFilters ? "Posts with filters" : "Posts"}
    >
      {showFilters && <PostsFilters />}

      <div className={styles.content}>
        {/* Loading state */}
        {isLoadingState && (
          <LoadingSkeleton count={maxPosts || 6} layout={layoutType} />
        )}

        {/* Content when not loading */}
        {!isLoadingState && (
          <>
            {/* No results state */}
            {displayedPosts.length === 0 && (
              <EmptyState
                hasActiveFilters={hasActiveFilters}
                onClearFilters={handleClearFilters}
                onViewAll={onViewAll}
              />
            )}

            {/* Posts grid */}
            {displayedPosts.length > 0 && (
              <>
                <div
                  key={animationKey}
                  className={`${styles.postsGrid} ${getGridClass()}`}
                  role="grid"
                  aria-label={`${displayedPosts.length} posts in ${layoutType} layout`}
                >
                  {displayedPosts.map((post, index) => (
                    <div
                      key={post.id}
                      role="gridcell"
                      aria-label={`Post ${index + 1} of ${displayedPosts.length}`}
                    >
                      <PostVariant post={post} layout={layoutType} />
                    </div>
                  ))}
                </div>

                {/* Pagination info */}
                {showPagination && (
                  <div
                    className={styles.showingInfo}
                    role="status"
                    aria-live="polite"
                  >
                    <p className={styles.showingText}>
                      Showing {displayedPosts.length} of{" "}
                      {filteredArticles.length} posts
                    </p>
                    <button
                      className={styles.viewAllButton}
                      onClick={handleViewAll}
                      aria-describedby="view-all-description"
                    >
                      View all posts
                    </button>
                    <span id="view-all-description" className="sr-only">
                      View all {filteredArticles.length} posts
                    </span>
                  </div>
                )}
              </>
            )}
          </>
        )}
      </div>
    </section>
  );
};

// Convenience components for specific use cases
const PostsGrid = (props: Omit<PostsSectionProps, "showFilters">) => (
  <PostsSection {...props} showFilters={false} />
);

const PostsWithFilters = (props: PostsSectionProps) => (
  <PostsSection {...props} showFilters={true} />
);

// Enhanced posts section with advanced features
const AdvancedPostsSection = (props: PostsSectionProps) => {
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    // Simulate data refresh
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };

  return (
    <div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "var(--spacing-lg)",
        }}
      >
        <h2
          style={{
            margin: 0,
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-2xl)",
            fontWeight: "700",
            color: "var(--primary-dark)",
          }}
        >
          Latest Posts
        </h2>
        <button
          onClick={handleRefresh}
          disabled={isLoading}
          style={{
            padding: "var(--spacing-sm) var(--spacing-md)",
            background: "var(--accent-blue)",
            color: "var(--primary-light)",
            border: "none",
            borderRadius: "var(--radius-md)",
            cursor: isLoading ? "not-allowed" : "pointer",
            opacity: isLoading ? 0.6 : 1,
            transition: "all 0.2s ease",
          }}
        >
          {isLoading ? "Refreshing..." : "Refresh"}
        </button>
      </div>
      <PostsSection {...props} isLoading={isLoading} />
    </div>
  );
};

export {
  PostsSection,
  PostsGrid,
  PostsWithFilters,
  AdvancedPostsSection,
  LoadingSkeleton,
};
