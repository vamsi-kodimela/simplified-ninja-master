"use client";
import { IArticle } from "@/models";
import React from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { API_URL, SERVER_URL } from "@/config/api.config";
import { Category } from "../category";

interface IPostProps {
  post: IArticle;
}

const Post = ({ post }: IPostProps) => {
  const router = useRouter();

  const handleClick = () => {
    router.push(`/post/${post.slug}`);
  };

  const handleCategoryClick = (e?: React.MouseEvent) => {
    if (e) {
      e.stopPropagation(); // Prevent post navigation
    }
    // You can add category navigation logic here
    console.log(`Navigate to category: ${post.category.name}`);
  };

  return (
    <article
      className={styles.post}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          handleClick();
        }
      }}
      aria-label={`Read article: ${post.title}`}
    >
      <div className={styles.imageContainer}>
        <Image
          src={`${SERVER_URL}${post.featuredImage.url}`}
          alt={post.title}
          className={styles.image}
          width={320}
          height={200}
          priority={false}
          loading="lazy"
          placeholder="blur"
          blurDataURL="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wBDAAYEBQYFBAYGBQYHBwYIChAKCgkJChQODwwQFxQYGBcUFhYaHSUfGhsjHBYWICwgIyYnKSopGR8tMC0oMCUoKSj/2wBDAQcHBwoIChMKChMoGhYaKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCgoKCj/wAARCAAIAAoDASIAAhEBAxEB/8QAFQABAQAAAAAAAAAAAAAAAAAAAAv/xAAhEAACAQMDBQAAAAAAAAAAAAABAgMABAUGIWGRkqGx0f/EABUBAQEAAAAAAAAAAAAAAAAAAAMF/8QAGhEAAgIDAAAAAAAAAAAAAAAAAAECEgMRkf/aAAwDAQACEQMRAD8AltJagyeH0AthI5xdrLcNM91BF5pX2HaH9bcfaSXWGaRmknyJckliyjqTzSlT54b6bk+h0R//2Q=="
        />
      </div>

      <div className={styles.content}>
        <div className={styles.categoryWrapper}>
          <Category name={post.category.name} onClick={handleCategoryClick} />
        </div>

        <h2 className={styles.title} title={post.title}>
          {post.title}
        </h2>

        <p className={styles.description} title={post.description}>
          {post.description}
        </p>

        <footer className={styles.footer}>
          <time
            className={styles.createdAt}
            dateTime={post.createdAt}
            title={`Published on ${dayjs(post.createdAt).format("MMMM DD, YYYY")}`}
          >
            {dayjs(post.createdAt).format("DD MMMM YYYY")}
          </time>

          <span className={styles.readMore} aria-hidden="true">
            Read more
          </span>
        </footer>
      </div>
    </article>
  );
};

export { Post };
