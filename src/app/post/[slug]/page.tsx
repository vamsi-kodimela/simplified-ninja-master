import styles from "./page.module.css";
import Image from "next/image";
import dayjs from "dayjs";
import { API_URL, SERVER_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { jsxConverter } from "@/utils/jsx-converter.util";
import { Metadata } from "next";

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
  const { docs } = await fetch(`${API_URL}/article`).then((res) => res.json());
  const slug = (await params).slug;
  const article = docs?.find((article: IArticle) => article.slug === slug);

  if (!article) {
    return <div>Post not found</div>;
  }

  metadata.title = `${article.title} | Simplfiied Ninja`;

  metadata.description = article.description;

  return (
    <div className={styles.layout}>
      <h1 className={styles.title}>{article.title}</h1>
      <div className={styles.metadata}>
        <div className={styles.category}>{article.category.name}</div>
        <div className={styles.createdAt}>
          {dayjs(article.createdAt).format("DD MMMM YYYY")}
        </div>
      </div>
      <Image
        src={`${SERVER_URL}${article.featuredImage.url}`}
        alt={article.title}
        className={styles.featuredImage}
        width={1000}
        height={640}
      />

      <div>
        <RichTextConverter
          className={styles.content}
          data={article.content}
          converters={jsxConverter}
        />
      </div>
    </div>
  );
};

export default PostPage;
