"use client";
import Link from "next/link";
import { useState, useEffect, useRef, useCallback } from "react";
import { BlogPost } from "@/lib/types/types";
import { fetchBlogPosts } from "@/lib/utils";
import { QueryDocumentSnapshot } from "firebase/firestore";
import { DocumentData } from "firebase/firestore";
import { ArrowUpRight } from "lucide-react";
const MyBlogs = ()=>{
     const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
      const [lastDoc, setLastDoc] =
        useState<QueryDocumentSnapshot<DocumentData> | null>(null);
      const [hasLoaded, setHasLoaded] = useState(false);
      const sectionRef = useRef<HTMLElement>(null);
    
      const pageSize = 4;
    
      const loadBlogPosts = useCallback(async () => {
        if (hasLoaded) return;
        const { blogPosts: newPosts, lastVisibleDoc } = await fetchBlogPosts(
          pageSize,
          lastDoc
        );
        setBlogPosts(newPosts);
        setLastDoc(lastVisibleDoc);
        setHasLoaded(true);
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
    return(
        <div className="max-w-2xl mx-auto mt-8 px-4">
            <h1 className="text-2xl md:text-4xl bg-clip-text text-transparent bg-gradient-to-b from-neutral-500 to-neutral-600 font-sans font-bold">
                Time to read! Watch my blogs
            </h1>
            <p className="text-sm text-muted-foreground mt-3">I do not know what i wrote, but iam sure 100% authentic.</p>
            {
                blogPosts.map((post)=>(
                    <div key={post.slug} className="mt-4">
                        
                        <h1 className="text-md font-semibold line-clamp-2">{post.title}</h1>
                        <p className="text-sm text-muted-foreground mt-3 line-clamp-3">{post.shortDescription}</p>
                        <Link href={`/blog/${post.slug}`} className="inline-flex items-center text-sm font-medium text-primary hover:underline mt-4">
                            Read More
                            <ArrowUpRight className="ml-1 h-4 w-4" />
                        </Link>
                    </div>
                ))
            }
        </div>
    )
}
export default MyBlogs;