"use client";

import React from "react";
import { ExternalLink, MoreHorizontal, Loader2 } from "lucide-react";
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
  viewAllHref = "/article",
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
                <ExternalLink size={16} />
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
              <PostCard post={post} />
            </div>
          ))}
        </div>

        {/* Bottom CTA for mobile */}
        {showViewAll && (
          <div className="posts-mobile-cta">
            <button className="posts-mobile-view-all" onClick={handleViewAll}>
              <span>View All Posts</span>
              <ExternalLink size={16} />
            </button>
          </div>
        )}

        {/* Load More Actions */}
        {showLoadMore && (
          <div className="posts-actions">
            <button
              className={`posts-load-more ${loading ? "loading" : ""}`}
              onClick={handleLoadMore}
              disabled={loading}
            >
              {loading ? (
                <>
                  <Loader2
                    className="posts-loading-icon animate-spin"
                    size={16}
                  />
                  Loading...
                </>
              ) : (
                <>
                  <span>Load More Posts</span>
                  <MoreHorizontal size={16} />
                </>
              )}
            </button>
          </div>
        )}
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

export default PostsSection;
