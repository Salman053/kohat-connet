import type { Metadata } from "next";
import { Geist, Geist_Mono, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { keywords } from "@/lib/keywords";
import ScrollToTopButton from "@/components/shared/scroll-to-top-button";
import Oneko from "@/components/shared/oneko";
import Header from "@/components/shared/header";
import Footer from "@/components/shared/footer";

const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], variable: '--font-mono' });

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: site.name,
  description: site.description,
  authors: [
    {
      name: site.owner,
      url: site.url
    }
  ],
  keywords: keywords,
  creator: site.owner,
  publisher: site.owner,
  openGraph: {
    title: site.name,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",

    // images: [
    //   {
    //     url: `${site.url}/ogp.png`,
    //     width: 1200,
    //     height: 630,
    //     alt: site.name,
    //   },
    // ],
    // locale: "en_US",
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
      className={cn("h-full", "antialiased", geistSans.variable, geistMono.variable, "font-mono", jetbrainsMono.variable)}
    >
      <body className="min-h-full flex flex-col ">
        <Header />


        <Oneko />
        {children}

        <ScrollToTopButton />
        <Footer />

      </body>
    </html>
  );
}
