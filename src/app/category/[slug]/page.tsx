import { Metadata } from "next";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui";
import { Post } from "@/components/post";
import { IArticle, ICategory } from "@/models";
import { API_URL } from "@/config/api.config";

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({
  params,
}: CategoryPageProps): Promise<Metadata> {
  const { slug } = await params;
  const category = await fetchCategory(slug);

  if (!category) {
    return {
      title: "Category Not Found | Simplified Ninja",
      description: "The requested category could not be found.",
    };
  }

  return {
    title: `${category.name} | Simplified Ninja`,
    description:
      category.description ||
      `Explore all ${category.name} tutorials and guides on Simplified Ninja.`,
  };
}

async function fetchCategory(slug: string): Promise<ICategory | null> {
  try {
    const response = await fetch(`${API_URL}/category`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch categories: ${response.status} ${response.statusText}`,
      );
      return null;
    }

    const data = await response.json();
    let categoriesData: ICategory[] = [];

    if (Array.isArray(data)) {
      categoriesData = data;
    } else if (Array.isArray(data.docs)) {
      categoriesData = data.docs;
    } else if (Array.isArray(data.data)) {
      categoriesData = data.data;
    } else if (Array.isArray(data.categories)) {
      categoriesData = data.categories;
    }

    // Find category by slug or id
    const category = categoriesData.find(
      (cat) => cat.slug === slug || cat.id === slug,
    );
    return category || null;
  } catch (error) {
    console.error("Error fetching category:", error);
    return null;
  }
}

async function fetchArticlesByCategory(
  categoryId: string,
): Promise<IArticle[]> {
  try {
    // Try to fetch articles filtered by category
    const response = await fetch(`${API_URL}/article?category=${categoryId}`, {
      cache: "no-store",
    });

    if (!response.ok) {
      console.error(
        `Failed to fetch articles: ${response.status} ${response.statusText}`,
      );
      return [];
    }

    const data = await response.json();
    return data.docs || data.data || data.articles || [];
  } catch (error) {
    console.error("Error fetching articles:", error);
    return [];
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params;
  const category = await fetchCategory(slug);

  if (!category) {
    notFound();
  }

  const articles = await fetchArticlesByCategory(category.id);

  return (
    <Container>
      <div
        style={{
          paddingTop: "var(--component-gap)",
          paddingBottom: "var(--component-gap)",
        }}
      >
        {/* Category Header */}
        <header
          style={{
            marginBottom: "var(--content-gap-lg)",
            textAlign: "center",
            paddingBottom: "var(--content-gap)",
            borderBottom: "1px solid var(--neutral-200)",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              gap: "var(--spacing-4)",
              marginBottom: "var(--spacing-4)",
            }}
          >
            {/* Category Icon/Letter */}
            <div
              style={{
                width: "64px",
                height: "64px",
                borderRadius: "50%",
                backgroundColor: "var(--accent)",
                color: "var(--primary-light)",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: "var(--text-2xl)",
                fontWeight: "var(--font-weight-bold)",
                fontFamily: "var(--font-heading)",
              }}
            >
              {category.icon ? (
                <img
                  src={category.icon}
                  alt={`${category.name} icon`}
                  style={{ width: "40px", height: "40px", objectFit: "cover" }}
                />
              ) : (
                category.name.charAt(0).toUpperCase()
              )}
            </div>
          </div>

          <h1
            style={{
              fontFamily: "var(--font-heading)",
              fontSize: "var(--text-4xl)",
              fontWeight: "var(--font-weight-bold)",
              color: "var(--primary-dark)",
              margin: "0 0 var(--spacing-4) 0",
              lineHeight: "var(--leading-tight)",
            }}
          >
            {category.name}
          </h1>

          {category.description && (
            <p
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-lg)",
                color: "var(--neutral-600)",
                margin: 0,
                maxWidth: "600px",
                marginLeft: "auto",
                marginRight: "auto",
                lineHeight: "var(--leading-relaxed)",
              }}
            >
              {category.description}
            </p>
          )}
        </header>

        {/* Articles Section */}
        <section>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              marginBottom: "var(--content-gap)",
              paddingBottom: "var(--spacing-3)",
              borderBottom: "1px solid var(--neutral-100)",
            }}
          >
            <h2
              style={{
                fontFamily: "var(--font-heading)",
                fontSize: "var(--text-2xl)",
                fontWeight: "var(--font-weight-semibold)",
                color: "var(--primary-dark)",
                margin: 0,
              }}
            >
              Articles
            </h2>
            <span
              style={{
                fontFamily: "var(--font-body)",
                fontSize: "var(--text-sm)",
                color: "var(--neutral-500)",
                fontWeight: "var(--font-weight-medium)",
              }}
            >
              {articles.length} article{articles.length !== 1 ? "s" : ""}
            </span>
          </div>

          {articles.length > 0 ? (
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))",
                gap: "var(--content-gap)",
                marginTop: "var(--content-gap)",
              }}
            >
              {articles.map((article) => (
                <Post key={article.id} post={article} />
              ))}
            </div>
          ) : (
            <div
              style={{
                textAlign: "center",
                padding: "var(--component-gap) 0",
                color: "var(--neutral-500)",
              }}
            >
              <svg
                style={{
                  width: "48px",
                  height: "48px",
                  margin: "0 auto var(--spacing-4) auto",
                  display: "block",
                }}
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                />
              </svg>
              <h3
                style={{
                  fontFamily: "var(--font-heading)",
                  fontSize: "var(--text-xl)",
                  fontWeight: "var(--font-weight-semibold)",
                  color: "var(--primary-dark)",
                  margin: "0 0 var(--spacing-2) 0",
                }}
              >
                No Articles Yet
              </h3>
              <p
                style={{
                  fontFamily: "var(--font-body)",
                  fontSize: "var(--text-base)",
                  margin: 0,
                  lineHeight: "var(--leading-relaxed)",
                }}
              >
                Articles for this category will appear here when they become
                available.
              </p>
            </div>
          )}
        </section>
      </div>
    </Container>
  );
}
