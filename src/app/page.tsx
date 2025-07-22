"use client";

import { Post } from "@/components/post";
import { useGlobalStore } from "@/store/global-store";
import styles from "./page.module.css";
import { API_URL } from "@/config/api.config";
import { useEffect } from "react";

export default function Home() {
  const { articles, setArticles } = useGlobalStore((state) => state);
  useEffect(() => {
    const fetchArticles = async () => {
      const response = await fetch(`${API_URL}/article`);
      const { docs } = await response.json();
      setArticles(docs);
    };
    fetchArticles();
  }, [setArticles]);

  return (
    <div className={styles["posts-grid"]}>
      {articles &&
        articles.map((article) => <Post post={article} key={article.id} />)}
    </div>
  );
}
