import type { Metadata } from "next";
import { Manrope, Young_Serif } from "next/font/google";
import "@/app/globals.css";
import "./embed.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
});

const youngSerif = Young_Serif({
  subsets: ["latin"],
  weight: ["400"],
  display: "swap",
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
    <html lang="en" className={youngSerif.variable} style={{ fontFamily: manrope.style.fontFamily }}>
      <body className="antialiased">{children}</body>
    </html>
  );
}
