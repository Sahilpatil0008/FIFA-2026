import type { Metadata } from "next";
import "./globals.css";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { GoogleAnalytics } from "@next/third-parties/google";

export const metadata: Metadata = {
  metadataBase: new URL("https://fabulous-daffodil-94aabb.netlify.app"),
  title: "FIFA World Cup 2026 - Live Scores, Schedule, Teams & Stats",
  description:
    "Live scores, match schedule, group standings, all 48 teams and 1250+ players for FIFA World Cup 2026 in USA, Canada & Mexico.",
  keywords:
    "FIFA World Cup 2026, World Cup schedule, live scores, World Cup teams, World Cup groups, World Cup players",
  openGraph: {
    title: "FIFA World Cup 2026",
    description: "Live scores, schedule, teams and stats",
    url: "https://fabulous-daffodil-94aabb.netlify.app",
    siteName: "FIFA World Cup 2026",
    images: [{ url: "/og-image.jpg", width: 1200, height: 630 }],
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "FIFA World Cup 2026",
    description: "Live scores, schedule, teams and stats",
  },
  verification: {
    google: "FLrtpSogYFA8oDMbkiNkCqhXYNBsFDB5RasXva4g1F8",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "SportsEvent",
  name: "FIFA World Cup 2026",
  startDate: "2026-06-11",
  endDate: "2026-07-19",
  location: {
    "@type": "Place",
    name: "USA, Canada, Mexico",
  },
  url: "https://fabulous-daffodil-94aabb.netlify.app",
  description: "FIFA World Cup 2026 live scores, schedule, teams",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased" suppressHydrationWarning>
      <head>
        {/* No-FOUC theme init: applies the saved/system theme before paint. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');if(t!=='light'&&t!=='dark'){t=window.matchMedia('(prefers-color-scheme: dark)').matches?'dark':'light';}document.documentElement.setAttribute('data-theme',t);}catch(e){document.documentElement.setAttribute('data-theme','light');}})();`,
          }}
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700;800;900&family=Inter:wght@400;500;600;700&family=JetBrains+Mono:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="min-h-full flex flex-col">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <Navigation />
        <main className="flex-1">
          {children}
        </main>
        <Footer />
        <GoogleAnalytics gaId="G-3HYYW9C43Y" />
      </body>
    </html>
  );
}
