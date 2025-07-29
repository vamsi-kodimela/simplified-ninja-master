import { Post } from "@/components/post";
import CategorySection from "@/components/category-section";
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
    try {
      const response = await fetch(`${API_URL}/article`);

      if (!response.ok) {
        console.error(
          `Failed to fetch articles: ${response.status} ${response.statusText}`,
        );
        return [];
      }

      const contentType = response.headers.get("content-type");
      if (!contentType || !contentType.includes("application/json")) {
        console.error("API did not return JSON data");
        return [];
      }

      const data = await response.json();
      console.log(data);
      console.log("Data Received!");
      return data.docs || [];
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  };

  const articles = await fetchArticles();

  return (
    <div className={`bg-primary-light ${styles.container}`}>
      <CategorySection />

      <div className={styles["posts-grid"]}>
        {articles &&
          articles.map((article) => <Post post={article} key={article.id} />)}
      </div>
    </div>
  );
}
