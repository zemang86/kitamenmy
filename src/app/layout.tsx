import type { Metadata } from "next";
import { ibmPlexMono, inter } from "@/lib/fonts";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: "Hazman Hassan — AI Builder & Operator",
    template: "%s | Hazman Hassan",
  },
  description:
    "Hazman Hassan: AI-first builder and operator. Co-founder Special Ops Sdn Bhd. Leading KITAMEN (esports), 1MiLabs (AI learning), Edventure.plus (edtech).",
  metadataBase: new URL("https://zemang.my"),
  openGraph: {
    title: "Hazman Hassan — AI Builder & Operator",
    description:
      "Building AI-powered products and cultural infrastructure at the intersection of technology and human experience.",
    url: "https://zemang.my",
    siteName: "Hazman Hassan",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Hazman Hassan — AI Builder & Operator",
    description:
      "Building AI-powered products and cultural infrastructure at the intersection of technology and human experience.",
    images: ["/og-image.jpg"],
  },
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
    ],
    apple: [{ url: "/apple-touch-icon.png", sizes: "180x180" }],
  },
  manifest: "/site.webmanifest",
  authors: [{ name: "Hazman Hassan" }],
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Person",
  name: "Hazman Hassan",
  url: "https://zemang.my",
  image:
    "https://framerusercontent.com/images/HtJJ5OHCEucfc6kNrJBGr7vK08.png?scale-down-to=1024",
  jobTitle: "AI Builder & Operator",
  description:
    "AI-first builder and operator. Co-founder Special Ops Sdn Bhd. Leading KITAMEN (esports), 1MiLabs (AI learning), Edventure.plus (edtech).",
  sameAs: [
    "https://linkedin.com/in/hazmanhassan",
    "https://www.instagram.com/zemang86",
  ],
  worksFor: {
    "@type": "Organization",
    name: "Special Ops Sdn Bhd",
  },
  knowsAbout: [
    "Artificial Intelligence",
    "Esports",
    "Education Technology",
    "Product Strategy",
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${ibmPlexMono.variable} ${inter.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="bg-bg-primary text-text-primary antialiased">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[9999] focus:bg-accent-primary focus:text-bg-primary focus:px-4 focus:py-2 focus:rounded-lg focus:font-semibold focus:text-sm"
        >
          Skip to main content
        </a>
        {children}
      </body>
    </html>
  );
}
