import type { Metadata } from "next";
import BlogPage from "@/components/blog/blog";

const description =
  "Writing by Prakash Raz Shrestha on frontend development, product, and building for the web.";

export const metadata: Metadata = {
  title: "Blog",
  description,
  alternates: { canonical: "/blog" },
  openGraph: {
    title: "Blog",
    description,
    url: "/blog",
  },
};

const Page = () => {
  return <BlogPage />;
};

export default Page;
