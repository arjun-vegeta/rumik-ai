import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Ira Chat Widget",
  description: "Chat with Ira - AI that understands emotions",
  robots: "noindex, nofollow",
};

export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
