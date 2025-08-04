"use client";

import React, { useState } from "react";
import { PostCardProps } from "./post-card.types";

/* ================================
   POST CARD COMPONENT
   Individual post card with image, category, title, description, and meta
   ================================ */

const PostCard: React.FC<PostCardProps> = ({
  post,
  size = "md",
  variant = "default",
  showCategory = true,
  showAuthor = false,
  showReadTime = true,
  className = "",
  style,
}) => {
  const [imageError, setImageError] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);

  const handleImageError = () => {
    setImageError(true);
    setImageLoading(false);
  };

  const handleImageLoad = () => {
    setImageLoading(false);
  };

  const handlePostClick = () => {
    if (post.href) {
      window.location.href = post.href;
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handlePostClick();
    }
  };

  const formatReadCount = (count: number): string => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

  const formatDate = (date: Date): string => {
    const now = new Date();
    const diffInHours = Math.floor(
      (now.getTime() - date.getTime()) / (1000 * 60 * 60),
    );

    if (diffInHours < 1) return "Just now";
    if (diffInHours < 24) return `${diffInHours}h`;
    if (diffInHours < 48) return "1d";
    if (diffInHours < 168) return `${Math.floor(diffInHours / 24)}d`;
    if (diffInHours < 720) return `${Math.floor(diffInHours / 168)}w`;
    return `${Math.floor(diffInHours / 720)}m`;
  };

  const getCategoryColor = (category: string): string => {
    const colors = {
      technology: "#007aff",
      design: "#af52de",
      business: "#ff9500",
      tutorial: "#34c759",
      news: "#ff3b30",
      guide: "#5856d6",
    };
    return colors[category.toLowerCase() as keyof typeof colors] || "#007aff";
  };

  const cardClasses = [
    "post-card",
    `post-card-${size}`,
    `post-card-${variant}`,
    post.featured ? "post-card-featured" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <article
      className={cardClasses}
      onClick={handlePostClick}
      onKeyDown={handleKeyDown}
      tabIndex={0}
      role="button"
      aria-label={`Read article: ${post.title}`}
      style={style}
    >
      {/* Image Container */}
      <div className="post-card-image-container">
        {!imageError && post.imageUrl ? (
          <>
            {imageLoading && (
              <div className="post-card-image-skeleton">
                <div className="post-card-gradient-placeholder">
                  <span className="post-card-placeholder-icon">📄</span>
                </div>
              </div>
            )}
            <img
              src={post.imageUrl}
              alt={post.title}
              className={`post-card-image ${imageLoading ? "loading" : ""}`}
              onError={handleImageError}
              onLoad={handleImageLoad}
              loading="lazy"
            />
          </>
        ) : (
          <div className="post-card-gradient-placeholder">
            <span className="post-card-placeholder-icon">📄</span>
            <div className="post-card-placeholder-pattern"></div>
          </div>
        )}

        {/* Image overlay */}
        <div className="post-card-image-overlay"></div>

        {/* Featured badge */}
        {post.featured && (
          <div className="post-card-featured-badge">
            <StarIcon />
            Featured
          </div>
        )}

        {/* Hover effect */}
        <div className="post-card-hover-effect">
          <ReadIcon />
        </div>
      </div>

      {/* Content */}
      <div className="post-card-content">
        {/* Category */}
        {showCategory && (
          <div className="post-card-category">
            <span
              className="post-card-category-pill"
              style={{
                background: `${getCategoryColor(post.category.name)}15`,
                color: getCategoryColor(post.category.name),
                borderColor: `${getCategoryColor(post.category.name)}30`,
              }}
            >
              {post.category.name}
            </span>
          </div>
        )}

        {/* Title */}
        <h3 className="post-card-title">{post.title}</h3>

        {/* Description */}
        <p className="post-card-description">{post.description}</p>

        {/* Author (if enabled) */}
        {showAuthor && post.author && (
          <div className="post-card-author">
            {post.author.avatar ? (
              <img
                src={post.author.avatar}
                alt={post.author.name}
                className="post-card-author-avatar"
              />
            ) : (
              <div className="post-card-author-avatar post-card-author-avatar-fallback">
                {post.author.name.charAt(0).toUpperCase()}
              </div>
            )}
            <span className="post-card-author-name">{post.author.name}</span>
          </div>
        )}

        {/* Footer Meta */}
        <div className="post-card-footer">
          <div className="post-card-meta">
            <span className="post-card-read-count">
              <EyeIcon />
              {formatReadCount(post.readCount)}
            </span>

            {showReadTime && post.readTime && (
              <span className="post-card-read-time">
                <ClockIcon />
                {post.readTime} min
              </span>
            )}

            <span className="post-card-date">
              <CalendarIcon />
              {formatDate(post.publishedAt)}
            </span>
          </div>

          <div className="post-card-arrow">
            <ArrowRightIcon />
          </div>
        </div>
      </div>

      {/* Card glow effect */}
      <div className="post-card-glow"></div>
    </article>
  );
};

/* ================================
   ICON COMPONENTS
   ================================ */

const StarIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="12"
    height="12"
    viewBox="0 0 24 24"
    fill="currentColor"
  >
    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
  </svg>
);

const ReadIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="22"
    height="22"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
  >
    <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z" />
    <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z" />
  </svg>
);

const EyeIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
    <circle cx="12" cy="12" r="3" />
  </svg>
);

const ClockIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <circle cx="12" cy="12" r="10" />
    <polyline points="12,6 12,12 16,14" />
  </svg>
);

const CalendarIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
);

const ArrowRightIcon = ({ className = "" }: { className?: string }) => (
  <svg
    className={className}
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
  >
    <line x1="5" y1="12" x2="19" y2="12" />
    <polyline points="12,5 19,12 12,19" />
  </svg>
);

export default PostCard;
