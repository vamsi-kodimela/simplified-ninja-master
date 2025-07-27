"use client";
import React, { useEffect } from "react";
import { useGlobalStore } from "@/store/global-store";
import { PostsSection } from "../posts-section";
import { IArticle, ICategory } from "@/models";
import { SerializedEditorState } from "@payloadcms/richtext-lexical/lexical";

// Mock empty editor state
const mockContent: SerializedEditorState = {
  root: {
    children: [],
    direction: null,
    format: "",
    indent: 0,
    type: "root",
    version: 1,
  },
};

// Mock data for demonstration
const mockCategories: ICategory[] = [
  { id: "1", name: "Technology", icon: "🔧" },
  { id: "2", name: "Design", icon: "🎨" },
  { id: "3", name: "Business", icon: "💼" },
  { id: "4", name: "Science", icon: "🔬" },
  { id: "5", name: "Health", icon: "⚕️" },
];

const mockArticles: IArticle[] = [
  {
    id: "1",
    slug: "react-best-practices",
    title: "React Best Practices for Modern Development",
    description:
      "Learn the latest React patterns and practices that will make your code more maintainable and performant.",
    content: mockContent,
    category: mockCategories[0],
    featuredImage: { url: "/simplified-ninja.png" },
    createdAt: "2024-01-15T10:30:00Z",
    updatedAt: "2024-01-15T10:30:00Z",
  },
  {
    id: "2",
    slug: "ui-design-principles",
    title: "Essential UI Design Principles Every Developer Should Know",
    description:
      "Understand the fundamental principles of user interface design that create intuitive and beautiful applications.",
    content: mockContent,
    category: mockCategories[1],
    featuredImage: { url: "/simplified-ninja.png" },
    createdAt: "2024-01-14T14:20:00Z",
    updatedAt: "2024-01-14T14:20:00Z",
  },
  {
    id: "3",
    slug: "startup-growth-strategies",
    title: "Proven Startup Growth Strategies That Actually Work",
    description:
      "Discover the growth hacking techniques and strategies that successful startups use to scale rapidly.",
    content: mockContent,
    category: mockCategories[2],
    featuredImage: { url: "/simplified-ninja.png" },
    createdAt: "2024-01-13T09:15:00Z",
    updatedAt: "2024-01-13T09:15:00Z",
  },
  {
    id: "4",
    slug: "machine-learning-basics",
    title: "Machine Learning Fundamentals for Beginners",
    description:
      "A comprehensive introduction to machine learning concepts, algorithms, and practical applications.",
    content: mockContent,
    category: mockCategories[3],
    featuredImage: { url: "/simplified-ninja.png" },
    createdAt: "2024-01-12T16:45:00Z",
    updatedAt: "2024-01-12T16:45:00Z",
  },
  {
    id: "5",
    slug: "developer-wellness",
    title: "Maintaining Mental Health as a Software Developer",
    description:
      "Tips and strategies for maintaining work-life balance and mental wellness in the demanding tech industry.",
    content: mockContent,
    category: mockCategories[4],
    featuredImage: { url: "/simplified-ninja.png" },
    createdAt: "2024-01-11T11:00:00Z",
    updatedAt: "2024-01-11T11:00:00Z",
  },
];

export const PostsDemo = () => {
  const { setArticles, setCategories } = useGlobalStore();

  // Load mock data on component mount
  useEffect(() => {
    setCategories(mockCategories);
    setArticles(mockArticles);
  }, [setArticles, setCategories]);

  return (
    <div style={{ padding: "2rem 0" }}>
      <div style={{ marginBottom: "3rem" }}>
        <h1
          style={{
            textAlign: "center",
            marginBottom: "1rem",
            fontFamily: "var(--font-heading)",
            fontSize: "2.5rem",
            color: "var(--primary-dark)",
          }}
        >
          Posts Section Demo
        </h1>
        <p
          style={{
            textAlign: "center",
            color: "var(--secondary-medium)",
            fontSize: "1.125rem",
            maxWidth: "600px",
            margin: "0 auto",
          }}
        >
          Explore our comprehensive posts section with advanced filtering,
          multiple layout options, and responsive design.
        </p>
      </div>

      {/* Full posts section with filters */}
      <section style={{ marginBottom: "4rem" }}>
        <h2
          style={{
            marginBottom: "2rem",
            fontFamily: "var(--font-heading)",
            fontSize: "1.75rem",
            color: "var(--primary-dark)",
          }}
        >
          Posts with Filters
        </h2>
        <PostsSection title="Latest Posts" showFilters={true} maxPosts={6} />
      </section>

      {/* Posts grid without filters (for homepage preview) */}
      <section>
        <h2
          style={{
            marginBottom: "2rem",
            fontFamily: "var(--font-heading)",
            fontSize: "1.75rem",
            color: "var(--primary-dark)",
          }}
        >
          Recent Posts (Preview)
        </h2>
        <PostsSection title="Recent Posts" showFilters={false} maxPosts={3} />
      </section>
    </div>
  );
};
