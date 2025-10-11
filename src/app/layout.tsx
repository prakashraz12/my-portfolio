import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Overpass } from "next/font/google";
import AdSense from "@/components/ads-component/adsSense";
import { Navbar } from "@/components/new/navbar";
import Footer from "@/components/footer/footer.component";

const Source_Sans = Overpass({
  subsets: ["latin"],
  weight: ["400"],
});

export const metadata: Metadata = {
  title: "Prakash Raz Shrestha | Full Stack Developer",
  description:
    "Portfolio of Prakash Raz Shrestha - Full Stack Developer specializing in modern web technologies. Explore my projects, skills, and professional experience.",
  keywords: [
    "Prakash Raz Shrestha",
    "Full Stack Developer",
    "Web Developer",
    "Software Engineer",
    "React Developer",
    "Next.js Developer",
    "Portfolio",
  ],
  authors: [{ name: "Prakash Raz Shrestha" }],
  creator: "Prakash Raz Shrestha",
  publisher: "Prakash Raz Shrestha",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://proakashraz.com",
    title: "Prakash Raz Shrestha | Full Stack Developer",
    description:
      "Portfolio of Prakash Raz Shrestha - Full Stack Developer specializing in modern web technologies. Explore my projects, skills, and professional experience.",
    siteName: "Prakash Raz Shrestha Portfolio",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Prakash Raz Shrestha - Full Stack Developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakash Raz Shrestha | Full Stack Developer",
    description:
      "Portfolio of Prakash Raz Shrestha - Full Stack Developer specializing in modern web technologies.",
    images: ["/og-image.png"],
    creator: "@your_twitter_handle",
  },
  metadataBase: new URL("https://proakashraz.com"),
  verification: {
    google: "C3HaJpUB84MMP59f0UP6wN2AkuCS1VkiU0WIvvAxCG4",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <meta
        name="google-site-verification"
        content="C3HaJpUB84MMP59f0UP6wN2AkuCS1VkiU0WIvvAxCG4"
      />
      <meta
        name="google-adsense-account"
        content="ca-pub-1668025130247244"
      ></meta>
      <head>
        <AdSense pId="ca-pub-1668025130247244" />
      </head>
      <body className={` ${Source_Sans.className} antialiased`}>
        <Toaster />
        <Navbar/>
        {children}
        <Footer/>
      </body>
    </html>
  );
}
