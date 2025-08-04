import styles from "./page.module.css";
import { API_URL } from "@/config/api.config";
import { IArticle } from "@/models";
import { Hero, CategoriesSection } from "@/globals/components";
import { CategoryType } from "@/globals/components";
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

  const articles = await fetchArticles();

  return (
    <div>
      <Hero />

      <CategoriesSection
        title="Explore Categories"
        subtitle="Discover content organized by topics that matter to you"
        categories={categories}
        columns={3}
        showViewAll={true}
        viewAllHref="/categories"
      />

      {/* Future content sections */}
      {/* <div className={styles["posts-grid"]}>
        {articles &&
          articles.map((article) => <Post post={article} key={article.id} />)}
      </div> */}
    </div>
  );
}
