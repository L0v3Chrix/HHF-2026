import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  style: ["normal", "italic"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Heart Forward Foundation | Recovery Living Scholarships & Harm Reduction Resources",
    template: "%s | Heart Forward Foundation",
  },
  description:
    "Recovery living scholarships for early recovery, harm reduction resources, and community education. Choose support or get involved—at your pace.",
  keywords: [
    "recovery living",
    "scholarships",
    "harm reduction",
    "early recovery",
    "community support",
    "recovery homes",
    "Austin",
    "Texas",
  ],
  authors: [{ name: "Heart Forward Foundation" }],
  creator: "Heart Forward Foundation",
  publisher: "Heart Forward Foundation",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://heartforwardfoundation.org"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Heart Forward Foundation",
    title: "Heart Forward Foundation | Recovery Living Scholarships",
    description:
      "Recovery living scholarships for early recovery, harm reduction resources, and community education.",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "Heart Forward Foundation",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Heart Forward Foundation | Recovery Living Scholarships",
    description:
      "Recovery living scholarships for early recovery, harm reduction resources, and community education.",
    images: ["/og-image.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`}>
      <body className="min-h-screen antialiased">
        {children}
      </body>
    </html>
  );
}
