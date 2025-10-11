"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  CalendarIcon,
  TwitterIcon,
  FacebookIcon,
  LinkedinIcon,
} from "lucide-react";
import { ProjectPost } from "@/lib/types/types";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";

import { Badge } from "../ui/badge";
import CommentView from "../blog/comment-view.component";
import CommentForm from "../blog/comment-form.component";
import ClapAnimation from "../ui/clap-animation";

export default function ProjectDetails({
  projectPost,
}: {
  projectPost: ProjectPost;
}) {
  const [claps, setClaps] = useState(projectPost?.claps || 0);

  return (
    <article className="container mx-auto px-4 py-12 max-w-5xl mt-20">
      <header className="mb-12">
        <div className="relative w-full aspect-video mb-10">
          <Image
            src={projectPost.bannerImageUrl}
            alt={`blog-image/${projectPost?.title}`}
            fill
            className="object-cover rounded-lg mb-8"
          />
        </div>
        <h1 className="lg:text-4xl text-xl md:text-2xl font-bold mb-4">
          {projectPost.title}
        </h1>
        <p className="lg:text-xl text-md text-muted-foreground mb-6">
          {projectPost.shortDescription}
        </p>
        <div className="flex items-center space-x-4">
          <div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{formatTimestamp(projectPost?.createdAt)}</span>
            </div>
          </div>
        </div>
      </header>

      <main
        className="prose prose-lg max-w-none mb-12"
        dangerouslySetInnerHTML={{ __html: projectPost?.content }}
      />

      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <ClapAnimation
            postId={projectPost?.id}
            collectionName="project"
            claps={claps}
            setClaps={setClaps}
          />
          <div className="flex space-x-4">
            <Button variant="ghost" size="sm">
              <TwitterIcon className="h-5 w-5" />
              <span className="sr-only">Share on Twitter</span>
            </Button>
            <Button variant="ghost" size="sm">
              <FacebookIcon className="h-5 w-5" />
              <span className="sr-only">Share on Facebook</span>
            </Button>
            <Button variant="ghost" size="sm">
              <LinkedinIcon className="h-5 w-5" />
              <span className="sr-only">Share on LinkedIn</span>
            </Button>
          </div>
        </div>
        <div className="flex gap-2 mb-3">
          {projectPost?.tech_stacks?.map((item, index) => (
            <Badge variant={"outline"} key={index} className="p-3">
              {item}
            </Badge>
          ))}
        </div>
        <Separator />
      </section>
      <section className="mb-12">
        <CommentView postId={projectPost?.id} collectionName="project" />
      </section>
      <CommentForm postId={projectPost?.id} collectionName="project" />
    </article>
  );
}
