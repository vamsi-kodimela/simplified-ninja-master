import Link from "next/link";
import { Container } from "@/components/ui";

export default function CategoryNotFound() {
  return (
    <Container>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          padding: "var(--component-gap) 0",
          minHeight: "50vh",
        }}
      >
        <svg
          style={{
            width: "64px",
            height: "64px",
            color: "var(--neutral-400)",
            marginBottom: "var(--spacing-6)",
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
            d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
          />
        </svg>

        <h1
          style={{
            fontFamily: "var(--font-heading)",
            fontSize: "var(--text-3xl)",
            fontWeight: "var(--font-weight-bold)",
            color: "var(--primary-dark)",
            margin: "0 0 var(--spacing-4) 0",
          }}
        >
          Category Not Found
        </h1>

        <p
          style={{
            fontFamily: "var(--font-body)",
            fontSize: "var(--text-lg)",
            color: "var(--neutral-600)",
            margin: "0 0 var(--spacing-8) 0",
            maxWidth: "500px",
            lineHeight: "var(--leading-relaxed)",
          }}
        >
          The category you&apos;re looking for doesn&apos;t exist or may have
          been moved.
        </p>

        <div
          style={{
            display: "flex",
            gap: "var(--spacing-4)",
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          <Link
            href="/categories"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              padding: "var(--spacing-3) var(--spacing-5)",
              backgroundColor: "var(--accent)",
              color: "var(--primary-light)",
              textDecoration: "none",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
              transition: "var(--transition-colors)",
            }}
          >
            Browse All Categories
          </Link>

          <Link
            href="/"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: "var(--spacing-2)",
              padding: "var(--spacing-3) var(--spacing-5)",
              backgroundColor: "var(--neutral-100)",
              color: "var(--primary-dark)",
              textDecoration: "none",
              borderRadius: "var(--radius-md)",
              fontFamily: "var(--font-body)",
              fontSize: "var(--text-base)",
              fontWeight: "var(--font-weight-medium)",
              transition: "var(--transition-colors)",
            }}
          >
            Back to Home
          </Link>
        </div>
      </div>
    </Container>
  );
}
