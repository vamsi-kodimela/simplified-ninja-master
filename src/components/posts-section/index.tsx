"use client";
import React, { useEffect } from "react";
import { useGlobalStore } from "@/store/global-store";
import { PostsFilters } from "../posts-filters";
import { PostVariant } from "../post-variants";
import styles from "./posts-section.module.css";

interface PostsSectionProps {
  showFilters?: boolean;
  maxPosts?: number;
  className?: string;
}

const PostsSection = ({
  showFilters = true,
  maxPosts,
  className = "",
}: PostsSectionProps) => {
  const {
    filteredArticles,
    layoutType,
    searchQuery,
    selectedCategories,
    sortBy,
  } = useGlobalStore();

  // Apply maxPosts limit if specified
  const displayedPosts = maxPosts
    ? filteredArticles.slice(0, maxPosts)
    : filteredArticles;

  const hasActiveFilters =
    searchQuery.trim() || selectedCategories.length > 0 || sortBy !== "newest";

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

  return (
    <div className={`${styles.container} ${className}`}>
      {showFilters && <PostsFilters />}

      <div className={styles.content}>
        {/* No results state */}
        {displayedPosts.length === 0 && (
          <div className={styles.noResults}>
            <div className={styles.noResultsIcon}>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <circle cx="11" cy="11" r="8" />
                <path d="m21 21-4.35-4.35" />
              </svg>
            </div>
            <h3 className={styles.noResultsTitle}>
              {hasActiveFilters ? "No posts found" : "No posts available"}
            </h3>
            <p className={styles.noResultsDescription}>
              {hasActiveFilters
                ? "Try adjusting your filters or search terms to find posts."
                : "There are no posts to display at the moment."}
            </p>
          </div>
        )}

        {/* Posts grid */}
        {displayedPosts.length > 0 && (
          <>
            <div className={`${styles.postsGrid} ${getGridClass()}`}>
              {displayedPosts.map((post) => (
                <PostVariant key={post.id} post={post} layout={layoutType} />
              ))}
            </div>

            {/* Show "showing X of Y" if maxPosts is applied */}
            {maxPosts && filteredArticles.length > maxPosts && (
              <div className={styles.showingInfo}>
                <p className={styles.showingText}>
                  Showing {displayedPosts.length} of {filteredArticles.length}{" "}
                  posts
                </p>
                <button
                  className={styles.viewAllButton}
                  onClick={() => {
                    // This could navigate to a full posts page
                    console.log("Navigate to all posts");
                  }}
                >
                  View all posts
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

// Convenience components for specific use cases
const PostsGrid = (props: Omit<PostsSectionProps, "showFilters">) => (
  <PostsSection {...props} showFilters={false} />
);

const PostsWithFilters = (props: PostsSectionProps) => (
  <PostsSection {...props} showFilters={true} />
);

export { PostsSection, PostsGrid, PostsWithFilters };
