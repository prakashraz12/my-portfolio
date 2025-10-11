"use client";
import Image from "next/image";
import Link from "next/link";
import { Zap, LoaderCircle } from "lucide-react";
import { useCallback, useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { fetchBlogPosts, formatTimestamp } from "@/lib/utils";
import { BlogPost } from "@/lib/types/types";
import useCategories from "@/hooks/use-category-provide";
import AdBanner from "../ads-component/ads-banner.component";

export default function BlogPage() {
  const { categories } = useCategories();
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasLoaded, setHasLoaded] = useState(false);

  const pageSize = 20;

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

  const getCategoryName = (id: string) => {
    return categories?.map((i) => (i.id === id ? i.title : ""));
  };
  return (
    <div className="container mx-auto px-4 py-8 mt-20">
      <div className="flex justify-center items-center">
        {isLoading && <LoaderCircle size={"12rem"} className="animate-spin" />}
      </div>
      {!isLoading && (
        <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl mb-2">
          Blogs
          <span className="inline-block w-24 h-[2px] bg-black ml-4 align-middle" />
        </h2>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-4">
        <div>
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="1525086309"
          />
        </div>
        <div>
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="6226748641"
          />
        </div>
        <div>
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="3309214331"
          />
        </div>
        <div>
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="2798078443"
          />
        </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogPosts?.length > 0 && (
          <Link
            href={`/blog/${blogPosts[0]?.slug}`}
            className="relative group aspect-[4/3] overflow-hidden  col-span-1 md:row-span-2"
          >
            <Image
              src={blogPosts[0].bannerImageUrl}
              alt={blogPosts[0].title}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              <span className="bg-black/80 text-white px-3 py-1 text-sm font-medium rounded">
                {blogPosts[0]?.category &&
                  getCategoryName(blogPosts[0]?.category)}
              </span>
              <Zap className="text-red-500 w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span></span>
                <span>•</span>
                <span>{formatTimestamp(blogPosts[0]?.createdAt)}</span>
              </div>
              <h2 className="text-xl font-bold mb-2 line-clamp-2">
                {blogPosts[0].title}
              </h2>
              <p className="line-clamp-3">{blogPosts[0]?.shortDescription}</p>
            </div>
          </Link>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {blogPosts?.slice(1, 5).map((post, index) => (
            <Link
              key={index}
              href={`/blog/${post?.slug}`}
              className="relative group aspect-[4/3] overflow-hidden "
            >
              <Image
                src={post.bannerImageUrl}
                alt={post.title}
                className="object-cover group-hover:scale-105 transition-transform duration-300"
                fill
              />
              <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
              <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
                {post?.category && (
                  <span className="bg-black/80 text-white px-3 py-1 text-sm font-medium rounded">
                    {getCategoryName(post?.category)}
                  </span>
                )}
                <Zap className="text-red-500 w-6 h-6" />
              </div>
              <div className="absolute bottom-4 left-4 right-4 text-white">
                <div className="flex items-center gap-2 text-sm mb-2">
                  <span>•</span>
                  <span>{formatTimestamp(blogPosts[0]?.createdAt)}</span>
                </div>
                <h2 className="text-sm font-bold mb-2 line-clamp-2">
                  {post.title}
                </h2>
                <p className="line-clamp-2">{blogPosts[0]?.shortDescription}</p>
              </div>
            </Link>
          ))}
        </div>
      </div>
      {!isLoading && <hr className="bg-slate-900 h-2" />}
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
        {blogPosts?.slice(1).map((post, index) => (
          <Link
            key={index}
            href={`/blog/${post?.slug}`}
            className="relative group aspect-[4/3] overflow-hidden "
          >
            <Image
              src={post.bannerImageUrl}
              alt={post.title}
              className="object-cover group-hover:scale-105 transition-transform duration-300"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-b from-black/20 to-black/60" />
            <div className="absolute top-4 left-4 right-4 flex justify-between items-start">
              {post?.category && (
                <span className="bg-black/80 text-white px-3 py-1 text-sm font-medium rounded">
                  {getCategoryName(post?.category)}
                </span>
              )}
              <Zap className="text-red-500 w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span>•</span>
                <span>{formatTimestamp(blogPosts[0]?.createdAt)}</span>
              </div>
              <h2 className="text-sm font-bold mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="line-clamp-2">{blogPosts[0]?.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div> */}
    </div>
  );
}
