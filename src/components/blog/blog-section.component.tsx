"use client";

import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowUpRight, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState, useRef } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchBlogPosts, formatTimestamp } from "@/lib/utils";
import { BlogPost } from "@/lib/types/types";
import Image from "next/image";
import { motion } from "framer-motion";

export default function BlogSection() {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  const pageSize = 4;

  const loadBlogPosts = useCallback(async () => {
    if (hasLoaded) return;
    setIsLoading(true);
    const { blogPosts: newPosts, lastVisibleDoc } = await fetchBlogPosts(
      pageSize,
      lastDoc
    );
    setBlogPosts(newPosts);
    setLastDoc(lastVisibleDoc);
    setHasLoaded(true);
    setIsLoading(false);
  }, [hasLoaded, lastDoc, pageSize]);

  useEffect(() => {
    if (blogPosts.length === 0) {
      loadBlogPosts();
    }
  }, [blogPosts, loadBlogPosts]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadBlogPosts();
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, [loadBlogPosts]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
    },
  };

  return (
    <section
      ref={sectionRef}
      className="w-full py-12 md:py-24 lg:py-32 bg-background container mx-auto"
    >
      <div className="container px-4 md:px-6">
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-12 lg:mb-16">
          From my
          <br />
          blog post
          <span className="inline-block w-24 h-[2px] bg-primary ml-4 align-middle" />
        </h2>
        <motion.div
          className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {blogPosts?.map((post) => (
            <motion.div key={post.slug} variants={itemVariants}>
              <Card className="group overflow-hidden  bg-white rounded-none transition-colors hover:bg-muted outline-none border-none">
                <CardContent className="p-4">
                  <div className="flex flex-col md:flex-row gap-3 justify-between">
                    <div className="flex-1">
                      <div className="flex items-center gap-x-4 text-sm text-muted-foreground">
                        <span className="font-medium text-primary">
                          {"Prakash Raz"}
                        </span>
                        <span>•</span>
                        <p>{formatTimestamp(post?.createdAt)}</p>
                      </div>
                      <h3 className="text-xl font-bold leading-tight tracking-tight mt-2 line-clamp-1">
                        {post.title}
                      </h3>
                      <p className="line-clamp-3 leading-tight tracking-tight mt-2">
                        {post?.shortDescription}
                      </p>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-4"
                      >
                        Read More
                        <ArrowUpRight className="ml-1 h-4 w-4" />
                      </Link>
                    </div>
                    <div className="aspect-[4/3] overflow-hidden  md:w-1/3">
                      <Image
                        src={post.bannerImageUrl}
                        alt={post.title}
                        width={300}
                        height={200}
                        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </motion.div>
      </div>
      {isLoading && (
        <div className="flex justify-center">
          <LoaderCircle className="animate-spin" size={"10rem"} />
        </div>
      )}
    </section>
  );
}
