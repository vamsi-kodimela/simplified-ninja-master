"use client";
import React, { useState, useEffect, useMemo } from "react";
import { useGlobalStore, LayoutType } from "@/store/global-store";
import { PostsFilters } from "../posts-filters";
import { PostVariant } from "../post-variants";
import styles from "./posts-section.module.css";

interface PostsSectionProps {
  // Display options
  showFilters?: boolean;
  showHeader?: boolean;
  title?: string;
  subtitle?: string;
  description?: string;

  // Layout and limits
  maxPosts?: number;
  defaultLayout?: LayoutType;
  allowLayoutSwitch?: boolean;

  // Styling
  className?: string;
  headerClassName?: string;

  // State
  isLoading?: boolean;

  // Actions
  onViewAll?: () => void;
  onRefresh?: () => void;

  // Customization
  showStats?: boolean;
  showViewAllButton?: boolean;
  emptyStateMessage?: string;
  emptyStateAction?: {
    label: string;
    onClick: () => void;
  };
}

// Enhanced header component
const PostsSectionHeader = ({
  title,
  subtitle,
  description,
  showStats,
  onRefresh,
  isLoading,
  className = "",
  filteredCount,
  totalCount,
}: {
  title?: string;
  subtitle?: string;
  description?: string;
  showStats?: boolean;
  onRefresh?: () => void;
  isLoading?: boolean;
  className?: string;
  filteredCount: number;
  totalCount: number;
}) => {
  if (!title && !subtitle && !description && !showStats && !onRefresh) {
    return null;
  }

  return (
    <div className={`${styles.sectionHeader} ${className}`}>
      <div className={styles.headerContent}>
        <div className={styles.headerText}>
          {title && <h2 className={styles.sectionTitle}>{title}</h2>}
          {subtitle && <h3 className={styles.sectionSubtitle}>{subtitle}</h3>}
          {description && (
            <p className={styles.sectionDescription}>{description}</p>
          )}
        </div>

        <div className={styles.headerActions}>
          {showStats && (
            <div className={styles.statsContainer}>
              <div className={styles.statItem}>
                <span className={styles.statValue}>{filteredCount}</span>
                <span className={styles.statLabel}>
                  {filteredCount === 1 ? "Post" : "Posts"}
                </span>
              </div>
              {filteredCount !== totalCount && (
                <div className={styles.statItem}>
                  <span className={styles.statValue}>{totalCount}</span>
                  <span className={styles.statLabel}>Total</span>
                </div>
              )}
            </div>
          )}

          {onRefresh && (
            <button
              onClick={onRefresh}
              disabled={isLoading}
              className={`${styles.refreshButton} ${isLoading ? styles.loading : ""}`}
              aria-label="Refresh posts"
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                className={styles.refreshIcon}
              >
                <path d="M3 12a9 9 0 0 1 9-9 9.75 9.75 0 0 1 6.74 2.74L21 8" />
                <path d="M21 3v5h-5" />
                <path d="M21 12a9 9 0 0 1-9 9 9.75 9.75 0 0 1-6.74-2.74L3 16" />
                <path d="M3 21v-5h5" />
              </svg>
              {isLoading ? "Refreshing..." : "Refresh"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

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
  customMessage,
  customAction,
}: {
  hasActiveFilters: boolean;
  onClearFilters: () => void;
  onViewAll?: () => void;
  customMessage?: string;
  customAction?: {
    label: string;
    onClick: () => void;
  };
}) => {
  const getEmptyMessage = () => {
    if (customMessage) return customMessage;

    if (hasActiveFilters) {
      return "We couldn't find any posts matching your current filters. Try adjusting your search terms or removing some filters.";
    }

    return "There are no posts to display at the moment. Check back later for new content!";
  };

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

      <p className={styles.noResultsDescription}>{getEmptyMessage()}</p>

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

        {customAction && (
          <button
            onClick={customAction.onClick}
            className={`${styles.noResultsButton} ${styles.secondary}`}
          >
            {customAction.label}
          </button>
        )}

        {onViewAll && !customAction && (
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
  // Display options
  showFilters = true,
  showHeader = false,
  title,
  subtitle,
  description,

  // Layout and limits
  maxPosts,
  defaultLayout,
  allowLayoutSwitch = true,

  // Styling
  className = "",
  headerClassName = "",

  // State
  isLoading = false,

  // Actions
  onViewAll,
  onRefresh,

  // Customization
  showStats = false,
  showViewAllButton = true,
  emptyStateMessage,
  emptyStateAction,
}: PostsSectionProps) => {
  const {
    filteredArticles,
    articles,
    layoutType,
    searchQuery,
    selectedCategories,
    sortBy,
    clearFilters,
    setLayoutType,
  } = useGlobalStore();

  const [localLoading, setLocalLoading] = useState(false);
  const [animationKey, setAnimationKey] = useState(0);

  // Set default layout if provided
  useEffect(() => {
    if (defaultLayout && defaultLayout !== layoutType) {
      setLayoutType(defaultLayout);
    }
  }, [defaultLayout, layoutType, setLayoutType]);

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

  const showPagination =
    showViewAllButton && maxPosts && filteredArticles.length > maxPosts;

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

  // Handle refresh
  const handleRefresh = () => {
    if (onRefresh) {
      onRefresh();
    } else {
      setLocalLoading(true);
      // Default refresh simulation
      setTimeout(() => {
        setLocalLoading(false);
      }, 1500);
    }
  };

  const isLoadingState = isLoading || localLoading;

  return (
    <section
      className={`${styles.container} ${className}`}
      role="region"
      aria-label={showFilters ? "Posts with filters" : "Posts"}
    >
      {/* Custom Header */}
      {showHeader && (
        <PostsSectionHeader
          title={title}
          subtitle={subtitle}
          description={description}
          showStats={showStats}
          onRefresh={onRefresh ? handleRefresh : undefined}
          isLoading={isLoadingState}
          className={headerClassName}
          filteredCount={filteredArticles.length}
          totalCount={articles.length}
        />
      )}

      {/* Filters */}
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
                customMessage={emptyStateMessage}
                customAction={emptyStateAction}
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
  <PostsSection {...props} showFilters={false} defaultLayout="grid" />
);

const PostsList = (props: Omit<PostsSectionProps, "showFilters">) => (
  <PostsSection {...props} showFilters={false} defaultLayout="list" />
);

const PostsWithFilters = (props: PostsSectionProps) => (
  <PostsSection {...props} showFilters={true} />
);

// Featured posts section with custom styling
const FeaturedPosts = (
  props: Omit<PostsSectionProps, "title" | "showHeader">,
) => (
  <PostsSection
    {...props}
    showHeader={true}
    title="Featured Posts"
    subtitle="Our top picks for you"
    showStats={true}
    maxPosts={6}
    defaultLayout="grid"
  />
);

// Latest posts section
const LatestPosts = (
  props: Omit<PostsSectionProps, "title" | "showHeader">,
) => (
  <PostsSection
    {...props}
    showHeader={true}
    title="Latest Posts"
    description="Stay up to date with our newest content"
    showStats={true}
    defaultLayout="list"
  />
);

// Compact posts section for sidebars
const CompactPosts = (props: Omit<PostsSectionProps, "showFilters">) => (
  <PostsSection
    {...props}
    showFilters={false}
    defaultLayout="compact"
    maxPosts={5}
    showViewAllButton={true}
  />
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
    <PostsSection
      {...props}
      isLoading={isLoading}
      onRefresh={handleRefresh}
      showHeader={true}
      title={props.title || "Latest Posts"}
      showStats={true}
    />
  );
};

export {
  PostsSection,
  PostsGrid,
  PostsList,
  PostsWithFilters,
  FeaturedPosts,
  LatestPosts,
  CompactPosts,
  AdvancedPostsSection,
  LoadingSkeleton,
};
