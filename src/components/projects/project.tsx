"use client";
import { ProjectPost } from "@/lib/types/types";
import { fetchProjects } from "@/lib/utils";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import Image from "next/image";
import Link from "next/link";
import React, { useCallback, useEffect, useState } from "react";
import { Badge } from "../ui/badge";
import { ExternalLink, LoaderCircle } from "lucide-react";

const ProjectPage = () => {
  const [projectPosts, setprojectPosts] = useState<ProjectPost[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const pageSize = 10;

  const loadProjectPosts = useCallback(async () => {
    if (hasLoaded) return;
    setIsLoading(true);
    const { projectPost: newPosts, lastVisibleDoc } = await fetchProjects(
      pageSize,
      lastDoc
    );
    setprojectPosts(newPosts);
    setLastDoc(lastVisibleDoc);
    setHasLoaded(true);
    setIsLoading(false);
  }, [hasLoaded, lastDoc, pageSize]);

  useEffect(() => {
    if (projectPosts.length === 0) {
      loadProjectPosts();
    }
  }, [projectPosts, loadProjectPosts]);

  return (
    <div className="max-w-2xl mx-auto mt-32 px-4">
      {!isLoading && (
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-5 ml-4 md:ml-0">
          Projects
          <span className="inline-block w-24 h-[2px] bg-black ml-4 align-middle" />
        </h2>
      )}
      {isLoading && (
        <div className="flex justify-center">
          <LoaderCircle className="animate-spin" size={"10rem"} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-2">
        {projectPosts?.map((project, index) => (
          <Link key={index} href={`/project/${project?.slug}`} className="border">
            <>
              <div className="group relative aspect-video overflow-hidden border-b">
                <Image
                  src={project?.bannerImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
              <div className="mt-4 p-4">
                <h3 className="mt-1 text-xl font-semibold hover:underline line-clamp-2">
                  {project.title}
                </h3>
                <div className="mt-3 flex mb-2">
                  <Link
                    href={project?.project_link}
                    className="underline flex items-center gap-2"
                  >
                    Watch Live <ExternalLink size={"17px"} />
                  </Link>
                </div>
                <p className="line-clamp-3">{project.shortDescription}</p>
                <div className="flex gap-3 flex-wrap mt-2">
                  {project?.tech_stacks?.map((item, index) => (
                    <Badge key={index}>{item}</Badge>
                  ))}
                </div>
              </div>
            </>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
