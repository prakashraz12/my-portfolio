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
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
      {!isLoading && (
        <div className="mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
            Work
          </p>
          <h1 className="mt-3 max-w-xl text-[15px] leading-7 text-neutral-800 dark:text-neutral-200">
            Client and personal projects.
          </h1>
        </div>
      )}
      {isLoading && (
        <div className="flex justify-center">
          <LoaderCircle className="animate-spin" size={"10rem"} />
        </div>
      )}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 gap-6 mt-2">
        {projectPosts?.map((project, index) => (
          <article key={project.slug || index} className="border">
            <Link href={`/project/${project?.slug}`}>
              <div className="group relative aspect-video overflow-hidden border-b">
                <Image
                  src={project?.bannerImageUrl}
                  alt={project.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>
            </Link>
            <div className="mt-4 p-4">
              <Link href={`/project/${project?.slug}`}>
                <h2 className="mt-1 text-xl font-semibold hover:underline line-clamp-2">
                  {project.title}
                </h2>
              </Link>
              {project?.project_link ? (
                <a
                  href={project.project_link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="underline mt-3 mb-2 flex items-center gap-2"
                >
                  Watch Live <ExternalLink size={"17px"} />
                </a>
              ) : null}
              <p className="line-clamp-3">{project.shortDescription}</p>
              <div className="flex gap-3 flex-wrap mt-2">
                {project?.tech_stacks?.map((item, stackIndex) => (
                  <Badge key={stackIndex}>{item}</Badge>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default ProjectPage;
