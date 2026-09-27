import type { Metadata } from "next";
import "./globals.css";
import { Toaster } from "@/components/ui/toaster";
import { Space_Grotesk } from "next/font/google";
import { Navbar } from "@/components/new/navbar";
import Footer from "@/components/footer/footer.component";
import {
  EMAIL,
  GITHUB_ACCOUNT,
  HERO_IMg,
  INSTAGRAM,
  LINKED_IN,
  SITE_URL,
} from "../../constant";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-sans",
  display: "swap",
});

const description =
  "Prakash Raz Shrestha is a frontend developer in Nepal. He builds product interfaces at Black Tech and ships Cuepos and Viewb.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: "Prakash Raz Shrestha | Frontend Developer",
    template: "%s | Prakash Raz Shrestha",
  },
  description,
  keywords: [
    "Prakash Raz Shrestha",
    "frontend developer Nepal",
    "web developer in Nepal",
    "React developer",
    "Next.js developer",
  ],
  authors: [{ name: "Prakash Raz Shrestha", url: SITE_URL }],
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
      "max-video-preview": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: SITE_URL,
    title: "Prakash Raz Shrestha | Frontend Developer",
    description,
    siteName: "Prakash Raz Shrestha",
    images: [
      {
        url: "/open-graph-image.png",
        width: 1200,
        height: 630,
        alt: "Prakash Raz Shrestha, frontend developer",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Prakash Raz Shrestha | Frontend Developer",
    description,
    images: ["/open-graph-image.png"],
    creator: "@prakashraz",
  },
  verification: {
    google: "C3HaJpUB84MMP59f0UP6wN2AkuCS1VkiU0WIvvAxCG4",
  },
  other: {
    "google-adsense-account": "ca-pub-1668025130247244",
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": `${SITE_URL}/#person`,
      name: "Prakash Raz Shrestha",
      url: SITE_URL,
      image: HERO_IMg,
      email: EMAIL,
      jobTitle: "Frontend Developer",
      address: { "@type": "PostalAddress", addressCountry: "NP" },
      worksFor: {
        "@type": "Organization",
        name: "Black Tech",
        url: "https://www.blacktech.com.np/",
      },
      sameAs: [
        GITHUB_ACCOUNT,
        LINKED_IN,
        INSTAGRAM,
        "https://viewb.io/prakashraz",
      ],
    },
    {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: SITE_URL,
      name: "Prakash Raz Shrestha",
      description,
      publisher: { "@id": `${SITE_URL}/#person` },
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${spaceGrotesk.variable} bg-white font-sans text-[#171717] antialiased dark:bg-[#111111] dark:text-[#f3f3f3]`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
          }}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{if(localStorage.getItem("theme")==="dark"){document.documentElement.classList.add("dark")}}catch(e){}})();`,
          }}
        />
        <Toaster />
        <Navbar />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
