import useCategories from "@/hooks/use-category-provide";
import { BlogPost } from "@/lib/types/types";
import { db, formatTimestamp } from "@/lib/utils";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import { ZapIcon } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import BlogLoadingComponents from "./blog-loading-animation.component";

const SameTypeBlogs = ({ categoryId }: { categoryId: string }) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);
  const [loading, setLoading] = useState(true);
  const { categories } = useCategories();
  useEffect(() => {
    async function fetchBlogs() {
      setLoading(true);
      try {
        const q = query(
          collection(db, "blogs"),
          where("category", "==", categoryId),
          limit(4)
        );
        const querySnapshot = await getDocs(q);
        const blogsData = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        })) as BlogPost[];
        setBlogs(blogsData);
      } catch (error) {
        console.error("Error fetching blogs: ", error);
      } finally {
        setLoading(false);
      }
    }

    if (categoryId) {
      fetchBlogs();
    }
  }, [categoryId]);
  const getCategoryName = (id: string) => {
    return categories?.map((i) => (i.id === id ? i.title : ""));
  };
  return (
    <>
      <h1 className="text-2xl font-bold">Similar Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2  gap-4 mt-2 mb-5">
        {loading &&
          Array.from({ length: 4 }).map((_, index) => (
            <BlogLoadingComponents key={index} />
          ))}
        {blogs?.map((post, index) => (
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
              <ZapIcon className="text-red-500 w-6 h-6" />
            </div>
            <div className="absolute bottom-4 left-4 right-4 text-white">
              <div className="flex items-center gap-2 text-sm mb-2">
                <span>•</span>
                <span>{formatTimestamp(post?.createdAt)}</span>
              </div>
              <h2 className="text-sm font-bold mb-2 line-clamp-2">
                {post.title}
              </h2>
              <p className="line-clamp-2">{post?.shortDescription}</p>
            </div>
          </Link>
        ))}
      </div>
    </>
  );
};

export default SameTypeBlogs;
