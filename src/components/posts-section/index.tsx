"use client";
import React, { useState, useEffect, useMemo } from "react";
import styles from "./posts-section.module.css";
import { Post } from "../post";
import { PostVariant } from "../post-variants";
import { PostsFilters } from "../posts-filters";
import { IArticle } from "../../models";

// Define layout types
export type LayoutType = "grid" | "list" | "compact";

// Props for the Posts Section
interface PostsSectionProps {
  title?: string;
  posts?: IArticle[];
  maxPosts?: number;
  showFilters?: boolean;
  defaultLayout?: LayoutType;
  isLoading?: boolean;
}

// Props for individual Posts Section components
interface PostsSectionHeaderProps {
  title: string;
  showFilters: boolean;
  layoutType: LayoutType;
  onLayoutChange: (layout: LayoutType) => void;
  onToggleFilters: () => void;
  onRefresh: () => void;
  isLoading: boolean;
}

// Header component with controls
const PostsSectionHeader: React.FC<PostsSectionHeaderProps> = ({
  title,
  showFilters,
  layoutType,
  onLayoutChange,
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
          {isLoading ? "Refreshing..." : "Refresh"}
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

// Shimmer skeleton component
const ShimmerSkeleton = ({
  count = 6,
  layout = "grid",
}: {
  count: number;
  layout: LayoutType;
}) => {
  const getShimmerClass = () => {
    switch (layout) {
      case "list":
        return styles.shimmerList;
      case "compact":
        return styles.shimmerCompact;
      default:
        return styles.shimmerGrid;
    }
  };

  return (
    <div className={`${styles.shimmerContainer} ${getShimmerClass()}`}>
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
  );
};

// Main Posts Section Component
export const PostsSection: React.FC<PostsSectionProps> = ({
  title = "Latest Posts",
  posts = [],
  maxPosts = 6,
  showFilters = true,
  defaultLayout = "grid",
  isLoading = false,
}) => {
  // State management
  const [layoutType, setLayoutType] = useState<LayoutType>(defaultLayout);
  const [showFiltersPanel, setShowFiltersPanel] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [sortBy, setSortBy] = useState<"date" | "popularity">("date");
  const [localLoading, setLocalLoading] = useState(false);

  // Handle layout change
  const handleLayoutChange = (layout: LayoutType) => {
    setLayoutType(layout);
  };

  // Handle toggle filters
  const handleToggleFilters = () => {
    setShowFiltersPanel((prev) => !prev);
  };

  // Handle refresh
  const handleRefresh = async () => {
    setLocalLoading(true);
    // Simulate refresh delay
    setTimeout(() => {
      setLocalLoading(false);
    }, 800);
  };

  // Handle category filter
  const handleCategoryFilter = (categories: string[]) => {
    setLocalLoading(true);
    setSelectedCategories(categories);
    // Simulate filter delay
    setTimeout(() => {
      setLocalLoading(false);
    }, 500);
  };

  const isLoadingState = isLoading || localLoading;

  // Filter and sort posts
  const filteredAndSortedPosts = useMemo(() => {
    let filtered = posts;

    // Filter by categories
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((post) =>
        selectedCategories.some((category) =>
          post.categories?.some((cat) => cat.name === category),
        ),
      );
    }

    // Sort posts
    filtered.sort((a, b) => {
      if (sortBy === "date") {
        return (
          new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime()
        );
      }
      // For popularity, you might want to use view count, likes, etc.
      return 0;
    });

    return filtered.slice(0, maxPosts);
  }, [posts, selectedCategories, sortBy, maxPosts]);

  // Render posts based on layout
  const renderPosts = () => {
    const containerClass = `styles.posts${layoutType.charAt(0).toUpperCase() + layoutType.slice(1)}`;

    return (
      <div
        className={
          styles[
            `posts${layoutType.charAt(0).toUpperCase() + layoutType.slice(1)}`
          ]
        }
      >
        {filteredAndSortedPosts.map((post) => {
          switch (layoutType) {
            case "list":
              return <PostVariant key={post.id} post={post} variant="list" />;
            case "compact":
              return (
                <PostVariant key={post.id} post={post} variant="compact" />
              );
            default:
              return <Post key={post.id} {...post} />;
          }
        })}
      </div>
    );
  };

  return (
    <section className={styles.postsSection}>
      <PostsSectionHeader
        title={title}
        showFilters={showFilters}
        layoutType={layoutType}
        onLayoutChange={handleLayoutChange}
        onToggleFilters={handleToggleFilters}
        onRefresh={handleRefresh}
        isLoading={isLoadingState}
      />

      {showFiltersPanel && (
        <PostsFilters
          onCategoryFilter={handleCategoryFilter}
          onSortChange={setSortBy}
          onLayoutChange={handleLayoutChange}
          currentLayout={layoutType}
          currentSort={sortBy}
          selectedCategories={selectedCategories}
        />
      )}

      <div className={styles.content}>
        {/* Shimmer loading state */}
        {isLoadingState && (
          <ShimmerSkeleton count={maxPosts || 6} layout={layoutType} />
        )}

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
  const [isLoading, setIsLoading] = useState(false);

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 1000);
  };

  return (
    <PostsSection
      title="Featured Posts"
      posts={[]} // No demo data - will show empty state
      maxPosts={6}
      showFilters={true}
      defaultLayout="grid"
      isLoading={isLoading}
    />
  );
};

// Export both components
export { ShimmerSkeleton };
