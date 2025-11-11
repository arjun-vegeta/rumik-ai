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
  title: "Careers @rumik.ai",
  description: "Explore career opportunities and join our team",
  icons: {
    icon: '/3d_logo.webp',
    shortcut: '/3d_logo.webp',
    apple: '/3d_logo.webp',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={manrope.className}>
      <head>
        <link rel="icon" href="/3d_logo.webp" type="image/webp" />
        <link rel="shortcut icon" href="/3d_logo.webp" type="image/webp" />
        <link rel="apple-touch-icon" href="/3d_logo.webp" />
      </head>
      <body className="antialiased">
        <NavigationProgress />
        {children}
      </body>
    </html>
  );
}
