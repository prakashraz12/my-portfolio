import type { Metadata } from "next";
import ProjectPage from "@/components/projects/project";

const description =
  "Projects by Prakash Raz Shrestha, including product work and personal builds.";

export const metadata: Metadata = {
  title: "Projects",
  description,
  alternates: { canonical: "/project" },
  openGraph: {
    title: "Projects",
    description,
    url: "/project",
  },
};

const Page = () => {
  return <ProjectPage />;
};

export default Page;
