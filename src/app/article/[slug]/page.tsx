import styles from "./page.module.css";
import Image from "next/image";
import dayjs from "dayjs";
import { SERVER_URL } from "@/config/api.config";
import { RichText as RichTextConverter } from "@payloadcms/richtext-lexical/react";
import { jsxConverter } from "@/utils/jsx-converter.util";
import { Metadata } from "next";
import { Category, Post } from "@/globals/components";
import { getArticles, getArticleBySlug } from "@/services/articles";

interface PostPageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const articles = await getArticles({ depth: 0, revalidate: 3600 });
  return articles
    .filter((article: Post) => article.slug)
    .map((article: Post) => ({ slug: article.slug }));
}

export async function generateMetadata({
  params,
}: PostPageProps): Promise<Metadata> {
  try {
    const { slug } = await params;
    const article = await getArticleBySlug(slug, {
      depth: 1,
      revalidate: 3600,
    });

    if (!article) {
      return {
        title: "Article Not Found | Simplified Ninja",
        description: "The requested article could not be found.",
      };
    }

    const publishedDate = new Date(article.publishedAt).toISOString();
    const updatedDate = new Date(article.publishedAt).toISOString();
    const imageUrl = article.imageUrl
      ? `${SERVER_URL}${article.imageUrl}`
      : "/simplified-ninja.png";

    return {
      title: `${article.title} | Simplified Ninja`,
      description:
        article.description ||
        `Learn about ${article.title} in this comprehensive programming tutorial.`,
      keywords: [
        article.category.name.toLowerCase(),
        "programming tutorial",
        "coding guide",
        "software development",
        ...article.title
          .toLowerCase()
          .split(" ")
          .filter((word) => word.length > 2),
      ],
      authors: [{ name: "Simplified Ninja" }],
      openGraph: {
        title: article.title,
        description:
          article.description ||
          `Learn about ${article.title} in this comprehensive programming tutorial.`,
        url: `https://simplified.ninja/article/${article.slug}`,
        siteName: "Simplified Ninja",
        images: [
          {
            url: imageUrl,
            width: 1200,
            height: 630,
            alt: article.title,
          },
        ],
        locale: "en_US",
        type: "article",
        publishedTime: publishedDate,
        modifiedTime: updatedDate,
        section: article.category.name,
        tags: [article.category.name, "programming", "tutorial"],
      },
      twitter: {
        card: "summary_large_image",
        title: article.title,
        description:
          article.description ||
          `Learn about ${article.title} in this comprehensive programming tutorial.`,
        images: [imageUrl],
      },
      alternates: {
        canonical: `https://simplified.ninja/article/${article.slug}`,
      },
      other: {
        "article:author": "Simplified Ninja",
        "article:section": article.category.name,
        "article:published_time": publishedDate,
        "article:modified_time": updatedDate,
      },
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    return {
      title: "Article | Simplified Ninja",
      description: "A programming tutorial from Simplified Ninja.",
    };
  }
}

const PostPage = async ({ params }: PostPageProps) => {
  const { slug } = await params;
  const article = await getArticleBySlug(slug, { depth: 1, revalidate: 3600 });

  if (!article) {
    return <div>Post not found</div>;
  }

  // Create structured data for the article
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: article.title,
    description: article.description,
    image: article.imageUrl
      ? `${SERVER_URL}${article.imageUrl}`
      : `${SERVER_URL}/simplified-ninja.png`,
    author: {
      "@type": "Person",
      name: "Simplified Ninja",
      url: "https://simplified.ninja",
    },
    publisher: {
      "@type": "Organization",
      name: "Simplified Ninja",
      logo: {
        "@type": "ImageObject",
        url: "https://simplified.ninja/simplified-ninja.png",
      },
    },
    datePublished: new Date(article.publishedAt).toISOString(),
    dateModified: new Date(article.publishedAt).toISOString(),
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://simplified.ninja/article/${article.slug}`,
    },
    articleSection: article.category.name,
    keywords: [
      article.category.name,
      "programming",
      "tutorial",
      "coding",
      "software development",
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData),
        }}
      />
      <div className={styles.layout}>
        <header className={styles.header}>
          <h1 className={styles.title}>{article.title}</h1>
          <div className={styles.metadata}>
            {article.category && (
              <Category
                category={{
                  id: article.category.id,
                  title: article.category.name,
                  href: `/category/${article.category.slug}`,
                  slug: article.category.slug,
                }}
                size="sm"
                variant="default"
              />
            )}
            <div className={styles.createdAt}>
              {dayjs(article.publishedAt).format("DD MMMM YYYY")}
            </div>
          </div>
        </header>

        <div className={styles.imageContainer}>
          <Image
            src={article.imageUrl ?? "/simplified-ninja.png"}
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
    </>
  );
};

export default PostPage;
