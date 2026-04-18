import type { Metadata } from "next";
import { Inter, Playfair_Display, Cinzel_Decorative } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter" });
const playfair = Playfair_Display({ subsets: ["latin"], variable: "--font-playfair" });
const cinzel = Cinzel_Decorative({ weight: ["400", "700", "900"], subsets: ["latin"], variable: "--font-cinzel" });

export const metadata: Metadata = {
  title: "Tử Vi Việt AI",
  description: "Tử Vi Việt AI Application",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} ${playfair.variable} ${cinzel.variable}`}>
        {children}
      </body>
    </html>
  );
}
