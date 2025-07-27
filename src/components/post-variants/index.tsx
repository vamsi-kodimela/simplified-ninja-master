"use client";
import { IArticle } from "@/models";
import React from "react";
import styles from "./post-variants.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { API_URL, SERVER_URL } from "@/config/api.config";
import { Category } from "../category";

interface IPostProps {
  post: IArticle;
  layout?: "grid" | "list" | "compact";
}

// Original grid layout (unchanged, but moved here)
const PostGrid = ({ post }: { post: IArticle }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${post.slug}`);
  };

  return (
    <div className={styles.postGrid} onClick={handleClick}>
      <Image
        src={`${SERVER_URL}${post.featuredImage.url}`}
        alt={post.title}
        className={styles.gridImage}
        width={300}
        height={200}
      />
      <div className={styles.gridContent}>
        <Category
          name={post.category.name}
          onClick={() => {
            // Prevent navigation to category - could add category filtering here
          }}
        />
        <h2 className={styles.gridTitle} title={post.title}>
          {post.title}
        </h2>
        <p className={styles.gridDescription} title={post.description}>
          {post.description}
        </p>
        <div className={styles.gridDivider}></div>
        <div className={styles.gridDate}>
          {dayjs(post.createdAt).format("DD MMMM YYYY")}
        </div>
      </div>
    </div>
  );
};

// List layout - horizontal layout with larger content area
const PostList = ({ post }: { post: IArticle }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${post.slug}`);
  };

  return (
    <div className={styles.postList} onClick={handleClick}>
      <div className={styles.listImageContainer}>
        <Image
          src={`${SERVER_URL}${post.featuredImage.url}`}
          alt={post.title}
          className={styles.listImage}
          width={200}
          height={150}
        />
      </div>
      <div className={styles.listContent}>
        <div className={styles.listHeader}>
          <Category
            name={post.category.name}
            onClick={() => {
              // Prevent navigation to category - could add category filtering here
            }}
          />
          <span className={styles.listDate}>
            {dayjs(post.createdAt).format("DD MMM YYYY")}
          </span>
        </div>
        <h2 className={styles.listTitle} title={post.title}>
          {post.title}
        </h2>
        <p className={styles.listDescription} title={post.description}>
          {post.description}
        </p>
        <div className={styles.listFooter}>
          <span className={styles.readMore}>Read more →</span>
        </div>
      </div>
    </div>
  );
};

// Compact layout - minimal information, text-focused
const PostCompact = ({ post }: { post: IArticle }) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${post.slug}`);
  };

  return (
    <div className={styles.postCompact} onClick={handleClick}>
      <div className={styles.compactContent}>
        <div className={styles.compactHeader}>
          <Category
            name={post.category.name}
            onClick={() => {
              // Prevent navigation to category - could add category filtering here
            }}
          />
          <span className={styles.compactDate}>
            {dayjs(post.createdAt).format("DD/MM/YY")}
          </span>
        </div>
        <h3 className={styles.compactTitle} title={post.title}>
          {post.title}
        </h3>
        <p className={styles.compactDescription} title={post.description}>
          {post.description}
        </p>
      </div>
      <div className={styles.compactImageContainer}>
        <Image
          src={`${SERVER_URL}${post.featuredImage.url}`}
          alt={post.title}
          className={styles.compactImage}
          width={80}
          height={60}
        />
      </div>
    </div>
  );
};

// Main component that switches between layouts
const PostVariant = ({ post, layout = "grid" }: IPostProps) => {
  switch (layout) {
    case "list":
      return <PostList post={post} />;
    case "compact":
      return <PostCompact post={post} />;
    case "grid":
    default:
      return <PostGrid post={post} />;
  }
};

export { PostVariant, PostGrid, PostList, PostCompact };
