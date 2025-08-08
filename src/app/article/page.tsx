import { PostsSection } from "@/globals/components";
import type { Post } from "@/globals/components";
import { getArticles } from "@/services/articles";
import { mapArticleToPost } from "@/mappers/article.mapper";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Articles | Simplified Ninja",
  description:
    "Browse all programming articles and tutorials on Simplified Ninja. Learn coding through in-depth tutorials, case studies, and practical examples covering web development, software engineering, and more.",
  keywords: [
    "programming articles",
    "coding tutorials",
    "web development guides",
    "software engineering articles",
    "programming blog",
    "learn programming",
    "tech tutorials",
  ],
  openGraph: {
    title: "All Articles | Simplified Ninja",
    description:
      "Browse all programming articles and tutorials on Simplified Ninja. Learn coding through in-depth tutorials and practical examples.",
    url: "https://simplified.ninja/article",
    siteName: "Simplified Ninja",
    images: [
      {
        url: "/simplified-ninja.png",
        width: 1200,
        height: 630,
        alt: "Simplified Ninja Articles - Programming Tutorials and Guides",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "All Articles | Simplified Ninja",
    description:
      "Browse all programming articles and tutorials on Simplified Ninja.",
    images: ["/simplified-ninja.png"],
  },
  alternates: {
    canonical: "https://simplified.ninja/article",
  },
};

export default async function ArticlesPage() {
  const articlesData = await getArticles({ depth: 1, revalidate: 3600 });
  const posts: Post[] = articlesData.map(mapArticleToPost);

  return (
    <div style={{ paddingTop: "2rem" }}>
      <PostsSection
        title="All Articles"
        subtitle="Explore our complete collection of articles and tutorials"
        posts={posts}
        columns={3}
        showViewAll={false}
      />
    </div>
  );
}
