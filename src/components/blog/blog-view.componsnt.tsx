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
import { BlogPost } from "@/lib/types/types";
import { formatTimestamp } from "@/lib/utils";
import Image from "next/image";
import CommentForm from "./comment-form.component";
import CommentView from "./comment-view.component";
import { Badge } from "../ui/badge";
import ClapAnimation from "../ui/clap-animation";
import SameTypeBlogs from "./same-type-blogs.component";
import AdBanner from "../ads-component/ads-banner.component";

export default function BlogPostDetail({ blogPost }: { blogPost: BlogPost }) {
  const [claps, setClaps] = useState(blogPost?.claps || 0);
  return (
    <article className="max-w-2xl mx-auto px-4 py-12 mt-10">
      <header className="mb-12">
        <div className="relative w-full aspect-video mb-10">
          <Image
            src={blogPost.bannerImageUrl}
            alt={`blog-image/${blogPost?.title}`}
            fill
            className="object-cover rounded-lg mb-8"
          />
        </div>
        <h1 className="lg:text-4xl text-xl md:text-2xl font-bold mb-4">
          {blogPost.title}
        </h1>
        <p className="lg:text-xl text-md text-muted-foreground mb-6">
          {blogPost.shortDescription}
        </p>
        <div className="flex items-center space-x-4">
          <div>
            <div className="flex items-center text-sm text-muted-foreground">
              <CalendarIcon className="mr-2 h-4 w-4" />
              <span>{formatTimestamp(blogPost?.createdAt)}</span>
            </div>
          </div>
        </div>
      </header>
      <main
        className="prose prose-lg max-w-none mb-12 text-xl"
        dangerouslySetInnerHTML={{ __html: blogPost?.content }}
      />
      <section className="mb-12">
        <div className="flex items-center justify-between mb-6">
          <ClapAnimation
            claps={claps}
            setClaps={setClaps}
            postId={blogPost?.id}
            collectionName="blogs"
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
          {blogPost?.tags?.map((item, index) => (
            <Badge variant={"outline"} key={index} className="p-3">
              {item}
            </Badge>
          ))}
        </div>
        <Separator />
      </section>
      <section>
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="6809475648"
        />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="6809475648"
        />
        <AdBanner
          dataAdFormat="auto"
          dataFullWidthResponsive={true}
          dataAdSlot="1377315440"
        />
      </section>
      <section>
        <SameTypeBlogs categoryId={blogPost?.category} />
      </section>
      <section className="mb-12">
        <CommentView postId={blogPost?.id} collectionName="blogs" />
      </section>
      <section>
        <CommentForm postId={blogPost?.id} collectionName="blogs" />
      </section>
    </article>
  );
}
