import type { Metadata } from "next";
import EnhancedAboutPage from "@/components/about/about-page.component";
import { HERO_IMg } from "../../../constant";

const description =
  "About Prakash Raz Shrestha, a frontend developer in Nepal. Background, education, and how art and software fit together.";

export const metadata: Metadata = {
  title: "About",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: "About",
    description,
    url: "/about",
    images: [{ url: HERO_IMg, alt: "Prakash Raz Shrestha" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About",
    description,
    images: [HERO_IMg],
  },
};

const About = () => {
  return <EnhancedAboutPage />;
};

export default About;
