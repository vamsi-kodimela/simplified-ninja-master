import { Metadata } from "next";

export const homeMetadata: Metadata = {
  title: "Simplified Ninja | Your Simplified Guide to Code",
  description:
    "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more. Master programming with simplified tutorials and real-world examples.",
  keywords: [
    "programming tutorials",
    "learn to code",
    "web development",
    "coding bootcamp",
    "programming projects",
    "software engineering",
    "full stack development",
  ],
  openGraph: {
    title: "Simplified Ninja | Your Simplified Guide to Code",
    description:
      "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
    url: "https://simplified.ninja",
    siteName: "Simplified Ninja",
    images: [
      {
        url: "/simplified-ninja.png",
        width: 1200,
        height: 630,
        alt: "Simplified Ninja - Learn Programming Through Projects",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplified Ninja | Your Simplified Guide to Code",
    description:
      "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
    images: ["/simplified-ninja.png"],
  },
  alternates: {
    canonical: "https://simplified.ninja",
  },
};
