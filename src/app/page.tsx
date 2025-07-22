"use client";

import { Post } from "@/components/post";
import { useGlobalStore } from "@/store/global-store";
import styles from "./page.module.css";

export default function Home() {
  const articles = useGlobalStore((state) => state.articles);
  return (
    <div className={styles["posts-grid"]}>
      {articles.map((article) => (
        <Post post={article} key={article.id} />
      ))}
    </div>
  );
}
