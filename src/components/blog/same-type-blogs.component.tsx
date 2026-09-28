import { BlogPost } from "@/lib/types/types";
import { db } from "@/lib/utils";
import { collection, getDocs, limit, query, where } from "firebase/firestore";
import Link from "next/link";
import { useEffect, useState } from "react";

const formatDate = (createdAt?: { seconds?: number }) => {
  if (!createdAt?.seconds) return "";
  return new Date(createdAt.seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const SameTypeBlogs = ({
  categoryId,
  excludeSlug,
}: {
  categoryId: string;
  excludeSlug?: string;
}) => {
  const [blogs, setBlogs] = useState<BlogPost[]>([]);

  useEffect(() => {
    if (!categoryId) return;
    let cancelled = false;

    (async () => {
      try {
        const snap = await getDocs(
          query(
            collection(db, "blogs"),
            where("category", "==", categoryId),
            limit(5)
          )
        );
        if (cancelled) return;
        setBlogs(
          snap.docs
            .map((doc) => ({ id: doc.id, ...doc.data() }) as BlogPost)
            .filter((post) => post.slug && post.slug !== excludeSlug)
            .slice(0, 4)
        );
      } catch {
        if (!cancelled) setBlogs([]);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [categoryId, excludeSlug]);

  if (blogs.length === 0) return null;

  return (
    <section className="mt-14">
      <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500">
        More writing
      </p>
      <div className="mt-3">
        {blogs.map((post) => (
          <Link
            key={post.slug}
            href={`/blog/${post.slug}`}
            className="flex items-baseline justify-between gap-4 border-t border-neutral-200 py-3 first:border-t-0 dark:border-white/10"
          >
            <span className="min-w-0 text-[15px] font-medium">{post.title}</span>
            <span className="shrink-0 text-[11px] uppercase tracking-[0.06em] text-neutral-400">
              {formatDate(post.createdAt)}
            </span>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default SameTypeBlogs;
