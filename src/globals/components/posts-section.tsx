"use client";

import React from "react";
import PostCard from "./post-card";
import { PostsSectionProps } from "./post-card.types";

/* ================================
   POSTS SECTION COMPONENT
   Main section containing post cards grid
   ================================ */

const PostsSection: React.FC<PostsSectionProps> = ({
  title = "Recent Posts",
  subtitle = "Stay updated with our latest insights and articles",
  posts,
  columns = 3,
  showViewAll = true,
  viewAllHref = "/posts",
  onViewAll,
  showLoadMore = false,
  onLoadMore,
  loading = false,
  className = "",
}) => {
  const handleViewAll = () => {
    if (onViewAll) {
      onViewAll();
    } else if (viewAllHref) {
      window.location.href = viewAllHref;
    }
  };

  const handleLoadMore = () => {
    if (onLoadMore) {
      onLoadMore();
    }
  };

  const gridClasses = ["posts-grid", `posts-grid-${columns}`].join(" ");

  return (
    <section className={`posts-section ${className}`}>
      <div className="posts-container">
        {/* Section Header */}
        <div className="posts-header">
          <div className="posts-header-content">
            <div className="posts-title-group">
              <h2 className="posts-title">{title}</h2>
              {subtitle && <p className="posts-subtitle">{subtitle}</p>}
            </div>

            {showViewAll && (
              <button className="posts-view-all" onClick={handleViewAll}>
                <span>View All</span>
                <ViewAllIcon />
              </button>
            )}
          </div>

          {/* Decorative elements */}
          <div className="posts-decoration">
            <div className="posts-decoration-orb posts-decoration-orb-1"></div>
            <div className="posts-decoration-orb posts-decoration-orb-2"></div>
          </div>
        </div>

        {/* Posts Grid */}
        <div className={gridClasses}>
          {posts.map((post, index) => (
            <div
              key={post.id}
              className="posts-grid-item"
              style={{
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <PostCard
                post={post}
                size="md"
                variant={post.featured ? "featured" : "default"}
                showCategory={true}
                showReadTime={true}
              />
            </div>
          ))}
        </div>

        {/* Load More / View All Actions */}
        <div className="posts-actions">
          {showLoadMore && (
            <button
              className={`posts-load-more ${loading ? "loading" : ""}`}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <LoadingIcon className="posts-loading-icon" />
                  Loading...
                </>
              ) : (
                <>
                  <span>Load More Posts</span>
                  <MoreIcon />
                </>
              )}
            </button>
          )}

          {/* Mobile View All */}
          {showViewAll && (
            <div className="posts-mobile-cta">
              <button className="posts-mobile-view-all" onClick={handleViewAll}>
                <span>View All Posts</span>
                <ViewAllIcon />
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Background Effects */}
      <div className="posts-background">
        <div className="posts-gradient-orb posts-gradient-orb-1"></div>
        <div className="posts-gradient-orb posts-gradient-orb-2"></div>
        <div className="posts-gradient-orb posts-gradient-orb-3"></div>
      </div>
    </section>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const ViewAllIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="7" y1="17" x2="17" y2="7" />
    <polyline points="7,7 17,7 17,17" />
  </svg>
);

const MoreIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="1" />
    <circle cx="19" cy="12" r="1" />
    <circle cx="5" cy="12" r="1" />
  </svg>
);

const LoadingIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="12" y1="2" x2="12" y2="6" />
    <line x1="12" y1="18" x2="12" y2="22" />
    <line x1="4.93" y1="4.93" x2="7.76" y2="7.76" />
    <line x1="16.24" y1="16.24" x2="19.07" y2="19.07" />
    <line x1="2" y1="12" x2="6" y2="12" />
    <line x1="18" y1="12" x2="22" y2="12" />
    <line x1="4.93" y1="19.07" x2="7.76" y2="16.24" />
    <line x1="16.24" y1="7.76" x2="19.07" y2="4.93" />
  </svg>
);

export default PostsSection;
