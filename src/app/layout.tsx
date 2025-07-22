import "@/styles/globals.css";
import { Navbar } from "@/components/navbar";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/simplified-ninja-icon.png" />
      </head>
      <body>
        <Navbar />
        {children}
      </body>
    </html>
  );
}
