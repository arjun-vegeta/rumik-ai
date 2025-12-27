import type { Metadata } from "next";
import { Manrope, Young_Serif } from "next/font/google";
import "@/app/globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
  variable: '--font-manrope',
});

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
  preload: true,
  variable: '--font-young-serif',
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
    <html lang="en" className={`${manrope.variable} ${youngSerif.variable}`}>
      <body className={`${manrope.className} antialiased`}>{children}</body>
    </html>
  );
}
