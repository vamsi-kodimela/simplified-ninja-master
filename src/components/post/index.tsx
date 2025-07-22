"use client";
import { IArticle } from "@/models";
import React from "react";
import styles from "./post.module.css";
import { useRouter } from "next/navigation";
import Image from "next/image";
import dayjs from "dayjs";
import { API_URL, SERVER_URL } from "@/config/api.config";

interface IPostProps {
  post: IArticle;
}

const Post = ({ post }: IPostProps) => {
  const router = useRouter();
  const handleClick = () => {
    router.push(`/post/${post.slug}`);
  };
  return (
    <div className={styles.post} onClick={handleClick}>
      <Image
        src={`${SERVER_URL}${post.featuredImage.url}`}
        alt={post.title}
        className={styles.image}
        width={300}
        height={200}
      />
      <div className={styles.content}>
        <div className={styles.category}>{post.category.name}</div>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.description}>{post.description}</p>
        <div className={styles.divider}></div>
        <div className={styles.createdAt}>
          {dayjs(post.createdAt).format("DD MMMM YYYY")}
        </div>
      </div>
    </div>
  );
};

export { Post };
