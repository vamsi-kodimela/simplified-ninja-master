import { Post } from "@/components/post";
import styles from "./page.module.css";
import { API_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Simplfiied Ninja | Your Simplified Guide to Code",
  description:
    "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
};

export default async function Home() {
  const fetchArticles = async (): Promise<IArticle[]> => {
    const response = await fetch(`${API_URL}/article`);
    const { docs } = await response.json();
    return docs;
  };
  const articles = await fetchArticles();

  return (
    <div className={styles["posts-grid"]}>
      {articles &&
        articles.map((article) => <Post post={article} key={article.id} />)}
    </div>
  );
}
