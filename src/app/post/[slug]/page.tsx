import styles from "./page.module.css";
import Image from "next/image";
import dayjs from "dayjs";
import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { jsxConverter } from "@/utils/jsx-converter.util";
import { Metadata } from "next";
import { Category } from "@/components/category";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export const metadata: Metadata = {
  title: "Simplfiied Ninja | Your Simplified Guide to Code",
  description:
    "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
};

const PostPage = async ({ params }: PostPageProps) => {
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
      return data.docs || [];
    } catch (error) {
      console.error("Error fetching articles:", error);
      return [];
    }
  };

  const docs = await fetchArticles();
  const slug = (await params).slug;
  const article = docs?.find((article: IArticle) => article.slug === slug);

  if (!article) {
    return <div>Post not found</div>;
  }

  metadata.title = `${article.title} | Simplfiied Ninja`;

  metadata.description = article.description;

  return (
    <div className={styles.layout}>
      <header className={styles.header}>
        <h1 className={styles.title}>{article.title}</h1>
        <div className={styles.metadata}>
          <span className={styles.category}>
            <Category name={article.category.name} />
          </span>
          <div className={styles.createdAt}>
            {dayjs(article.createdAt).format("DD MMMM YYYY")}
          </div>
        </div>
      </header>

      <div className={styles.imageContainer}>
        <Image
          src={`${SERVER_URL}${article.featuredImage.url}`}
          alt={article.title}
          className={styles.featuredImage}
          width={1200}
          height={675}
          priority
        />
      </div>

      <div className={styles.articleContent}>
        <article>
          <RichTextConverter
            className={`blog-content ${styles.content}`}
            data={article.content}
            converters={jsxConverter}
          />
        </article>
      </div>
    </div>
  );
};

export default PostPage;
