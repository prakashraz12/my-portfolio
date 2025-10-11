"use client";

import { useCallback, useEffect, useState } from "react";
import { CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { ProjectPost } from "@/lib/types/types";
import { fetchProjects } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { cn } from "@/lib/utils";
import { ExternalLink, LoaderCircle } from "lucide-react";

export default function ProjectsSection() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [api, setApi] = useState<any>();
  const [current, setCurrent] = useState(0);
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

  useEffect(() => {
    if (!api) {
      return;
    }

    setCurrent(api.selectedScrollSnap());
    api.on("select", () => {
      setCurrent(api.selectedScrollSnap());
    });
  }, [api]);

  return (
    <div>
      <section className="w-full py-5 md:py-8 lg:py-10  container mx-auto">
        <div className="container px-4 md:px-6">
          <div className="flex flex-col items-start gap-4">
            <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
              Look at my
              <br />
              recent projects
              <span className="inline-block w-24 h-[2px] bg-black ml-4 align-middle" />
            </h2>
            <div className="w-full mt-8">
              <Carousel
                setApi={setApi}
                className="w-full"
                opts={{
                  align: "start",
                  loop: true,
                }}
              >
                <CarouselContent>
                  {projectPosts?.map((project, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-5 md:pl-4 md:basis-1/2 lg:basis-1/4"
                    >
                      <Link href={`/project/${project?.slug}`}>
                        <div className="border-0 bg-transparent">
                          <CardContent className="p-0">
                            <div className="group relative aspect-video overflow-hidden  border">
                              <Image
                                src={project?.bannerImageUrl}
                                alt={project.title}
                                fill
                                className="object-cover transition-transform duration-300 group-hover:scale-105"
                              />
                            </div>
                            <div className="mt-4">
                              <h3 className="mt-1 text-xl font-semibold hover:underline line-clamp-2">
                                {project.title}
                              </h3>
                              <p className="line-clamp-3">
                                {project.shortDescription}
                              </p>
                              <div className="flex gap-3 flex-wrap mt-2">
                                {project?.tech_stacks?.map((item, index) => (
                                  <Badge key={index}>{item}</Badge>
                                ))}
                              </div>
                              <div className="mt-3 flex justify-end">
                                <Link
                                  href={project?.project_link}
                                  className="underline flex items-center gap-2"
                                >
                                  Watch Live <ExternalLink size={"17px"} />
                                </Link>
                              </div>
                            </div>
                          </CardContent>
                        </div>
                      </Link>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious className="w-10 h-10 hidden md:flex" />
                <CarouselNext className="w-10 h-10 hidden md:flex" />
              </Carousel>
              <div className="mt-4 flex justify-center gap-2">
                {projectPosts?.map((_, index) => (
                  <button
                    key={index}
                    className={cn(
                      "h-2 w-2 rounded-full transition-all",
                      index === current ? "bg-black w-4" : "bg-black/20"
                    )}
                    onClick={() => api?.scrollTo(index)}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="flex justify-center">
          {isLoading && (
            <LoaderCircle size={"10rem"} className="animate-spin" />
          )}
        </div>
      </section>
    </div>
  );
}
