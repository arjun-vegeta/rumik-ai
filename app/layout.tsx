import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import NavigationProgress from "@/components/NavigationProgress";
import "./globals.css";

const manrope = Manrope({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800"],
  display: "swap",
  preload: true,
  fallback: ['system-ui', 'arial'],
});

export const metadata: Metadata = {
  title: "Careers - Join Our Team",
  description: "Explore career opportunities and join our team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <body className="antialiased">
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
