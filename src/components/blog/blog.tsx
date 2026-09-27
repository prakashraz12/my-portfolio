"use client";
import Image from "next/image";
import Link from "next/link";
import { LoaderCircle } from "lucide-react";
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
    <div className="mx-auto w-full max-w-5xl px-6 pb-16 pt-12">
      <div className="flex justify-center items-center">
        {isLoading && <LoaderCircle size={"12rem"} className="animate-spin" />}
      </div>
      {!isLoading && (
        <div className="mb-10">
          <p className="text-[11px] font-medium uppercase tracking-[0.16em] text-neutral-400">
            Writing
          </p>
          <h1 className="mt-3 text-base font-semibold">Notes from the work</h1>
        </div>
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
      {!isLoading && blogPosts.length > 0 && (
        <div className="border-b border-[#1c1915]/15 dark:border-white/10">
          {blogPosts.map((post, index) => (
            <Link
              key={post.slug}
              href={`/blog/${post.slug}`}
              className="group grid gap-4 border-t border-[#1c1915]/15 py-7 dark:border-white/10 md:grid-cols-12 md:items-center"
            >
              <span className="text-xl text-[#8a8178] dark:text-neutral-500 md:col-span-1">
                {String(index + 1).padStart(2, "0")}
              </span>
              <div className="relative hidden aspect-[16/10] overflow-hidden bg-[#efeae1] dark:bg-white/5 md:col-span-3 md:block">
                {post.bannerImageUrl && (
                  <Image
                    src={post.bannerImageUrl}
                    alt=""
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                )}
              </div>
              <div className="md:col-span-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#8a8178] dark:text-neutral-500">
                  {post.category ? getCategoryName(post.category) : "Note"}
                  {post.createdAt ? ` · ${formatTimestamp(post.createdAt)}` : ""}
                </p>
                <h2 className="mt-2 text-2xl font-medium tracking-tight transition-colors group-hover:text-[#b4532a] md:text-3xl">
                  {post.title}
                </h2>
                {post.shortDescription && (
                  <p className="mt-2 line-clamp-2 max-w-2xl text-sm leading-relaxed text-[#6f675f] dark:text-neutral-400">
                    {post.shortDescription}
                  </p>
                )}
              </div>
            </Link>
          ))}
        </div>
      )}
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
