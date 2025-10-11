"use client";
import withAuth from "@/app/__HOC/withAuth.hoc";
const BlogCreationPage = dynamic(
  () => import("@/components/blog/create-blog.component"),
  {
    ssr: false,
  }
);
const ProjectCreatePage = dynamic(
  () => import("@/components/projects/project-create.component"),
  {
    ssr: false,
  }
);
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import React, { useEffect, useState } from "react";

const Dashboard = () => {
  const [modalType, setModalType] = useState<"blog" | "project">("blog");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  return (
    <>
      {isClient && (
        <div className="mt-40 flex justify-center container mx-auto flex-col">
          <div className="flex gap-3 justify-center">
            <Button
              className="rounded-none"
              variant={modalType === "blog" ? "default" : "outline"}
              onClick={() => setModalType("blog")}
            >
              Create Blog
            </Button>
            <Button
              onClick={() => setModalType("project")}
              className="rounded-none"
              variant={modalType === "project" ? "default" : "outline"}
            >
              Create Project
            </Button>
          </div>
          {modalType === "blog" && <BlogCreationPage />}
          {modalType === "project" && <ProjectCreatePage />}
        </div>
      )}
    </>
  );
};

export default withAuth(Dashboard);
