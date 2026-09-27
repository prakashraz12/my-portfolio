import type { Metadata } from "next";
import { BackgroundBeamsDemo } from "@/components/new/hero-section";
import Experience from "@/components/new/experince";
import HandsDirty from "@/components/new/hands-dirty";
import MyBlogs from "@/components/new/blogs";
import Personal from "@/components/new/personal";

export const metadata: Metadata = {
  alternates: { canonical: "/" },
  openGraph: { url: "/" },
};

export default function Home() {
  return (
    <div className="page-in">
      <BackgroundBeamsDemo />
      <HandsDirty />
      <Experience />
      <Personal />
      <MyBlogs />
    </div>
  );
}
