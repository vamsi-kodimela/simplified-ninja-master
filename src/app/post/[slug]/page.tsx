"use client";
import { useGlobalStore } from "@/store/global-store";
import styles from "./page.module.css";
import Image from "next/image";
import dayjs from "dayjs";
import { API_URL, SERVER_URL } from "@/config/api.config";
import { useEffect, useState } from "react";
import { IArticle } from "@/models";

interface PostPageProps {
  params: Promise<{
    slug: string;
  }>;
}

const PostPage = ({ params }: PostPageProps) => {
  const { articles, setArticles } = useGlobalStore((store) => store);
  const [article, setArticle] = useState<IArticle | null>(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const slug = (await params).slug;
      let post = articles.find((article) => article.slug === slug);
      if (!post) {
        const response = await fetch(`${API_URL}/article`);
        const { docs } = await response.json();
        post = docs?.[0];
        setArticles(docs);
      }
      setArticle(post || null);
    };

    fetchArticles();
  }, [setArticles, params, articles]);

  if (!article) {
    return <div>Post not found</div>;
  }
  return (
    <div className={styles.layout}>
      <Image
        src={`${SERVER_URL}${article.featuredImage.url}`}
        alt={article.title}
        className={styles.featuredImage}
        width={1000}
        height={500}
      />

      <div className={styles.metadata}>
        <div className={styles.category}>{article.category.name}</div>
        <div className={styles.createdAt}>
          {dayjs(article.createdAt).format("DD MMMM YYYY")}
        </div>
      </div>
      <h2 className={styles.title}>{article.title}</h2>
      <p className={styles.description}>{article.description}</p>
      <div
        className={styles.content}
        dangerouslySetInnerHTML={{ __html: article.content }}
      />
    </div>
  );
};

export default PostPage;
