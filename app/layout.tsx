import type { Metadata } from "next";
import "./globals.css";

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
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
