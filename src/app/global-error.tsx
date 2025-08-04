"use client";

import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for debugging
    console.error("Global error:", error);

    // You can add error reporting service here later
    // Example: Sentry.captureException(error);
  }, [error]);

  return (
    <html>
      <body
        style={{
          margin: 0,
          padding: "2rem",
          fontFamily: "system-ui, sans-serif",
          backgroundColor: "#1a1a1a",
          color: "#ffffff",
          minHeight: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <div
          style={{
            textAlign: "center",
            maxWidth: "600px",
            padding: "2rem",
            backgroundColor: "#2d2d30",
            borderRadius: "12px",
            border: "1px solid #404042",
          }}
        >
          <h1
            style={{
              fontSize: "2rem",
              marginBottom: "1rem",
              color: "#007aff",
            }}
          >
            Something went wrong!
          </h1>

          <p
            style={{
              marginBottom: "2rem",
              color: "#b3b3b3",
              lineHeight: "1.5",
            }}
          >
            We&apos;re sorry, but something unexpected happened. Please try
            refreshing the page.
          </p>

          <div
            style={{ display: "flex", gap: "1rem", justifyContent: "center" }}
          >
            <button
              onClick={reset}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "#007aff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "600",
              }}
            >
              Try Again
            </button>

            <button
              onClick={() => (window.location.href = "/")}
              style={{
                padding: "0.75rem 1.5rem",
                backgroundColor: "transparent",
                color: "#b3b3b3",
                border: "1px solid #404042",
                borderRadius: "8px",
                cursor: "pointer",
                fontSize: "1rem",
                fontWeight: "500",
              }}
            >
              Go Home
            </button>
          </div>

          {process.env.NODE_ENV === "development" && (
            <details
              style={{
                marginTop: "2rem",
                textAlign: "left",
                fontSize: "0.875rem",
                color: "#8e8e93",
              }}
            >
              <summary style={{ cursor: "pointer", marginBottom: "0.5rem" }}>
                Error Details (Development)
              </summary>
              <pre
                style={{
                  backgroundColor: "#1a1a1a",
                  padding: "1rem",
                  borderRadius: "6px",
                  overflow: "auto",
                  fontSize: "0.75rem",
                }}
              >
                {error.message}
                {error.stack && "\n\n" + error.stack}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}
