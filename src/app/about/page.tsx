import EnhancedAboutPage from "@/components/about/about-page.component";
import React from "react";
import { HERO_IMg } from "../../../constant";

export async function generateMetadata() {
  return {
    title: "About -  Prakash Raz Blog",
    description:
      "Prakash Raz Shrestha is a skilled developer with 1.5 years of experience in building web and mobile applications. Specializing in Next.js, React, and TypeScript, he is passionate about creating innovative solutions and enhancing user experiences.",
    keywords: [
      "Prakash Raz Shrestha",
      "Developer",
      "Web Development",
      "Mobile Development",
      "Next.js",
      "React",
      "TypeScript",
      "Software Solutions",
      "Online Learning Platform",
    ],
    openGraph: {
      title: "About -  Prakash Raz Blog",
      description:
        "Prakash Raz Shrestha is a skilled developer with 1.5 years of experience in building web and mobile applications. Specializing in Next.js, React, and TypeScript, he is passionate about creating innovative solutions and enhancing user experiences.",
      url: `https://prakashraz.com/about`,
      images: [
        {
          url: HERO_IMg,
          alt: "Prakash raz's profile image",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "About -  Prakash Raz Blog",
      description:
        "Prakash Raz Shrestha is a skilled developer with 1.5 years of experience in building web and mobile applications. Specializing in Next.js, React, and TypeScript, he is passionate about creating innovative solutions and enhancing user experiences.",
      images: [HERO_IMg],
    },
  };
}
const About = () => {
  return <EnhancedAboutPage />;
};

export default About;
