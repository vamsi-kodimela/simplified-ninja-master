"use client";
import { IPost } from "@/models";
import React from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";

interface IPostProps {
  post: IPost;
}

const Post = ({ post }: IPostProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${post.id}`);
  };
  return (
    <div className={styles.post} onClick={handleClick}>
      <img src={post.featuredImage} alt={post.title} className={styles.image} />
      <div className={styles.content}>
        <div className={styles.category}>{post.category}</div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.createdAt}>
          {post.createdAt.toLocaleDateString()}
        </div>
      </div>
    </div>
  );
};

export { Post };
