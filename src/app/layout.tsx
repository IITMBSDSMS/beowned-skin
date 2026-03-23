import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Be-Owned Skin | Science-Based Skincare",
  description:
    "Premium skincare powered by science. Niacinamide serum for oil control, glowing skin, and barrier repair.",
  keywords: [
    "skincare",
    "niacinamide serum",
    "glowing skin",
    "oil control serum",
    "beowned skin",
  ],
  authors: [{ name: "Be-Owned Skin" }],
  creator: "Be-Owned Skin",
  metadataBase: new URL("https://beownedskin.com"),

  openGraph: {
    title: "Be-Owned Skin",
    description: "Science-backed skincare for balanced, glowing skin.",
    url: "https://beownedskin.com",
    siteName: "Be-Owned Skin",
    images: [
      {
        url: "/images/product.png",
        width: 1200,
        height: 630,
      },
    ],
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Be-Owned Skin",
    description: "Science-backed skincare for balanced skin",
    images: ["/images/product.png"],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        {children}
        <Script
          src="https://checkout.razorpay.com/v1/checkout.js"
          strategy="afterInteractive"
        />
      </body>
    </html>
  );
}
