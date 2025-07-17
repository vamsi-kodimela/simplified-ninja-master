import { IPost } from "@/models";
import React from "react";
import styles from "./post.module.css";

interface IPostProps {
  post: IPost;
}

const Post = ({ post }: IPostProps) => {
  return (
    <div className={styles.post}>
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
