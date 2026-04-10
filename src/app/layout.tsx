import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Satis Aero",
  description: "Satis Aero – Next.js website hosted on Vercel",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="de" className="h-full antialiased">
      <body className="flex min-h-full flex-col font-sans">{children}</body>
    </html>
  );
}
