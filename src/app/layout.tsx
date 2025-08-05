import "@/styles/globals.css";
import { Montserrat, Open_Sans } from "next/font/google";
import NavbarWrapper from "@/globals/components/navbar-wrapper";
import { Metadata } from "next";

const openSans = Open_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  metadataBase: new URL("https://simplified-ninja.com"),
  title: {
    default: "Simplified Ninja | Your Simplified Guide to Code",
    template: "%s | Simplified Ninja",
  },
  description:
    "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more. Master programming with simplified tutorials and real-world examples.",
  keywords: [
    "programming",
    "coding",
    "tutorials",
    "web development",
    "software engineering",
    "learn to code",
    "programming tutorials",
    "case studies",
  ],
  authors: [{ name: "Simplified Ninja" }],
  creator: "Simplified Ninja",
  publisher: "Simplified Ninja",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://simplified-ninja.com",
    siteName: "Simplified Ninja",
    title: "Simplified Ninja | Your Simplified Guide to Code",
    description:
      "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
    images: [
      {
        url: "/simplified-ninja.png",
        width: 1200,
        height: 630,
        alt: "Simplified Ninja - Your Simplified Guide to Code",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Simplified Ninja | Your Simplified Guide to Code",
    description:
      "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
    images: ["/simplified-ninja.png"],
    creator: "@simplified_ninja",
  },
  verification: {
    google: "google-site-verification-token",
    yandex: "yandex-verification-token",
  },
  alternates: {
    canonical: "https://simplified-ninja.com",
    languages: {
      "en-US": "https://simplified-ninja.com",
    },
  },
  category: "technology",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${openSans.className} ${montserrat.className}`}>
      <head>
        <link rel="icon" href="/simplified-ninja-icon.png" />
        <link rel="apple-touch-icon" href="/simplified-ninja-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#007aff" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, maximum-scale=5"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebSite",
              name: "Simplified Ninja",
              description:
                "Learn to code by building projects. Get deeper understanding through case studies, discussions, and more.",
              url: "https://simplified-ninja.com",
              potentialAction: {
                "@type": "SearchAction",
                target: {
                  "@type": "EntryPoint",
                  urlTemplate:
                    "https://simplified-ninja.com/search?q={search_term_string}",
                },
                "query-input": "required name=search_term_string",
              },
              publisher: {
                "@type": "Organization",
                name: "Simplified Ninja",
                logo: {
                  "@type": "ImageObject",
                  url: "https://simplified-ninja.com/simplified-ninja.png",
                },
              },
            }),
          }}
        />
      </head>
      <body>
        <NavbarWrapper />
        {children}
      </body>
    </html>
  );
}
