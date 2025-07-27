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
  return (
    <div className={`card ${styles.post}`} onClick={handleClick}>
      <Image
        src={`${SERVER_URL}${post.featuredImage.url}`}
        alt={post.title}
        className={styles.image}
        width={300}
        height={200}
      />
      <div className={styles.content}>
        <Category
          name={post.category.name}
          onClick={() => {
            // You can add category navigation logic here
            // Note: This prevents the post click due to event bubbling
          }}
        />
        <h2 className={styles.title} title={post.title}>
          {post.title}
        </h2>
        <p className={styles.description} title={post.description}>
          {post.description}
        </p>
        <div className={styles.divider}></div>
        <div className={styles.createdAt}>
          {dayjs(post.createdAt).format("DD MMMM YYYY")}
        </div>
      </div>
    </div>
  );
};

export { Post };
