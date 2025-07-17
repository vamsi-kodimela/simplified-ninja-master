"use client";

import { Post } from "@/components/post";
import { POSTS } from "@/data";
import { IPost } from "@/models";
import { useEffect, useState } from "react";
import styles from "./page.module.css";

export default function Home() {
  const [posts, setPosts] = useState<IPost[]>([]);
  useEffect(() => {
    setPosts(POSTS);
  }, []);
  return (
    <div className={styles["posts-grid"]}>
      {posts.map((post) => (
        <Post post={post} key={post.id} />
      ))}
    </div>
  );
}
