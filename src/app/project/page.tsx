import ProjectPage from "@/components/projects/project";
import React from "react";

export async function generateMetadata() {
  return {
    title: "Project - Prakash Raz",
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
  };
}
const Page = () => {
  return <ProjectPage />;
};

export default Page;
