import { API_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { Hero, CategoriesSection, PostsSection } from "@/globals/components";
import { CategoryType, Post } from "@/globals/components";
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

  // Sample categories data
  const categories: CategoryType[] = [
    {
      id: "web-development",
      title: "Web Development",
      description: "Modern web technologies, frameworks, and best practices",
      imageUrl:
        "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop",
      href: "/categories/web-development",
      count: 24,
      isFeatured: true,
    },
    {
      id: "mobile-development",
      title: "Mobile Development",
      description: "iOS, Android, and cross-platform mobile app development",
      // No image - will show "M" letter avatar
      href: "/categories/mobile-development",
      count: 18,
      isNew: true,
    },
    {
      id: "data-science",
      title: "Data Science",
      description: "Machine learning, AI, and data analysis techniques",
      imageUrl:
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
      href: "/categories/data-science",
      count: 31,
    },
    {
      id: "cloud-computing",
      title: "Cloud Computing",
      description: "AWS, Azure, GCP, and cloud architecture patterns",
      // No image - will show "C" letter avatar
      href: "/categories/cloud-computing",
      count: 15,
    },
    {
      id: "devops",
      title: "DevOps & Infrastructure",
      description: "CI/CD, containerization, and deployment strategies",
      imageUrl:
        "https://images.unsplash.com/photo-1518432031352-d6fc5c10da5a?w=400&h=300&fit=crop",
      href: "/categories/devops",
      count: 22,
    },
    {
      id: "ui-ux-design",
      title: "UI/UX Design",
      description: "User interface design, user experience, and design systems",
      // No image - will show "U" letter avatar
      href: "/categories/ui-ux-design",
      count: 19,
      isFeatured: true,
    },
  ];

  // Sample posts data
  const posts: Post[] = [
    {
      id: "1",
      title: "Building Modern Web Applications with Next.js 15",
      description:
        "Learn how to leverage the latest features in Next.js 15 to create fast, scalable web applications with improved performance and developer experience.",
      imageUrl:
        "https://images.unsplash.com/photo-1627398242454-45a1465c2479?w=600",
      category: { name: "Technology", slug: "technology" },
      readCount: 1247,
      publishedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000), // 2 days ago
      href: "/posts/nextjs-15-guide",
      readTime: 8,
      featured: true,
    },
    {
      id: "2",
      title: "The Future of UI Design: Trends for 2024",
      description:
        "Explore the emerging design trends that will shape user interfaces in 2024, from glass morphism to micro-interactions.",
      imageUrl:
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?w=600",
      category: { name: "Design", slug: "design" },
      readCount: 856,
      publishedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 1 week ago
      href: "/posts/ui-trends-2024",
      readTime: 6,
    },
    {
      id: "3",
      title: "Startup Success: From Idea to IPO",
      description:
        "A comprehensive guide to building a successful startup, covering everything from initial concept validation to going public.",
      category: { name: "Business", slug: "business" },
      readCount: 2103,
      publishedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000), // 3 days ago
      href: "/posts/startup-success-guide",
      readTime: 12,
    },
    {
      id: "4",
      title: "Mastering TypeScript: Advanced Patterns",
      description:
        "Deep dive into advanced TypeScript patterns and techniques that will make your code more robust and maintainable.",
      imageUrl:
        "https://images.unsplash.com/photo-1516259762381-22954d7d3ad2?w=600",
      category: { name: "Tutorial", slug: "tutorial" },
      readCount: 543,
      publishedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000), // 5 days ago
      href: "/posts/typescript-advanced",
      readTime: 15,
    },
    {
      id: "5",
      title: "AI Revolution: Latest Breakthroughs in 2024",
      description:
        "Stay updated with the most significant AI breakthroughs and innovations that are reshaping industries worldwide.",
      imageUrl:
        "https://images.unsplash.com/photo-1677442136019-21780ecad995?w=600",
      category: { name: "News", slug: "news" },
      readCount: 1876,
      publishedAt: new Date(Date.now() - 12 * 60 * 60 * 1000), // 12 hours ago
      href: "/posts/ai-breakthroughs-2024",
      readTime: 7,
    },
    {
      id: "6",
      title: "Complete Guide to Cloud Architecture",
      description:
        "Everything you need to know about designing scalable, secure, and cost-effective cloud architectures for modern applications.",
      category: { name: "Guide", slug: "guide" },
      readCount: 987,
      publishedAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000), // 6 days ago
      href: "/posts/cloud-architecture-guide",
      readTime: 20,
    },
  ];

  // const articles = await fetchArticles();

  return (
    <div>
      <Hero />

      <CategoriesSection
        title="Explore Categories"
        subtitle="Discover content organized by topics that matter to you"
        categories={categories}
        showViewAll={true}
        viewAllHref="/categories"
      />

      <PostsSection
        title="Recent Posts"
        subtitle="Stay updated with our latest insights and articles"
        posts={posts}
        columns={3}
        showViewAll={true}
        viewAllHref="/posts"
      />

      {/* Future content sections */}
      {/* <div className={styles["posts-grid"]}>
        {articles &&
          articles.map((article) => <Post post={article} key={article.id} />)}
      </div> */}
    </div>
  );
}
