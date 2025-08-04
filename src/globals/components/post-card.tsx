"use client";

import React, { useState } from "react";
import { PostCardProps } from "./post-card.types";

const PostCard: React.FC<PostCardProps> = ({ post, className = "", style }) => {
  const [imageError, setImageError] = useState(false);

  const cardClasses = [
    "post-card",
    post.featured ? "post-card-featured" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

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

  const handleImageError = () => {
    setImageError(true);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(date);
  };

  const formatReadCount = (count: number) => {
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count.toString();
  };

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
          <img
            src={post.imageUrl}
            alt={post.title}
            className="post-card-image"
            onError={handleImageError}
            loading="lazy"
          />
        ) : (
          <div className="post-card-gradient-placeholder">
            <div className="post-card-placeholder-pattern"></div>
            <span className="post-card-placeholder-icon">📄</span>
          </div>
        )}

        {/* Featured Badge */}
        {post.featured && (
          <div className="post-card-featured-badge">
            <span>⭐</span>
            <span>Featured</span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="post-card-content">
        {/* Category */}
        <div className="post-card-category">
          <span className="post-card-category-pill">{post.category.name}</span>
        </div>

        {/* Main Content */}
        <div className="post-card-main-content">
          <h3 className="post-card-title">{post.title}</h3>
          <p className="post-card-description">{post.description}</p>
        </div>

        {/* Meta Information */}
        <div className="post-card-meta">
          <div className="post-card-meta-left">
            <div className="post-card-meta-item">
              <span>👁️</span>
              <span>{formatReadCount(post.readCount)} reads</span>
            </div>
            <div className="post-card-meta-item">
              <span>📅</span>
              <span>{formatDate(post.publishedAt)}</span>
            </div>
            {post.readTime && (
              <div className="post-card-meta-item">
                <span>⏱️</span>
                <span>{post.readTime} min read</span>
              </div>
            )}
          </div>
          <div className="post-card-arrow">→</div>
        </div>
      </div>
    </article>
  );
};

export default PostCard;
