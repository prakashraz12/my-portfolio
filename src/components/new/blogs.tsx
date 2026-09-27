"use client";

import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { DocumentData, QueryDocumentSnapshot } from "firebase/firestore";
import { BlogPost } from "@/lib/types/types";
import { fetchBlogPosts } from "@/lib/utils";

const formatPostDate = (createdAt?: { seconds?: number }) => {
  if (!createdAt?.seconds) return "";
  const date = new Date(createdAt.seconds * 1000);
  const day = String(date.getDate()).padStart(2, "0");
  const month = date
    .toLocaleString("en-US", { month: "short" })
    .replace(".", "")
    .toUpperCase();
  return `${day}.${month}.${date.getFullYear()}`;
};

const MyBlogs = () => {
  const [blogPosts, setBlogPosts] = useState<BlogPost[]>([]);
  const [lastDoc, setLastDoc] =
    useState<QueryDocumentSnapshot<DocumentData> | null>(null);
  const [hasLoaded, setHasLoaded] = useState(false);
  const [failed, setFailed] = useState(false);

  const pageSize = 5;

  const loadBlogPosts = useCallback(async () => {
    if (hasLoaded) return;
    try {
      const { blogPosts: newPosts, lastVisibleDoc } = await fetchBlogPosts(
        pageSize,
        lastDoc
      );
      setBlogPosts(newPosts);
      setLastDoc(lastVisibleDoc);
    } catch {
      setFailed(true);
    } finally {
      setHasLoaded(true);
    }
  }, [hasLoaded, lastDoc]);

  useEffect(() => {
    loadBlogPosts();
  }, [loadBlogPosts]);

  return (
    <section id="writing" className="mx-auto w-full max-w-5xl px-6 py-8 pb-16">
      <div className="mx-auto max-w-xl">
        <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-600 dark:text-neutral-400">
          Writing
        </p>

        {!hasLoaded && (
          <div className="mt-4 space-y-3">
            {[0, 1, 2].map((item) => (
              <div key={item} className="h-6 animate-pulse rounded-md bg-neutral-200/70 dark:bg-white/10" />
            ))}
          </div>
        )}

        {hasLoaded && failed && (
          <p className="mt-4 text-sm text-neutral-500">
            Writing is unavailable right now.
          </p>
        )}

        {hasLoaded && !failed && blogPosts.length === 0 && (
          <p className="mt-4 text-sm text-neutral-500">New essays will land here.</p>
        )}

        {blogPosts.length > 0 && (
          <div className="mt-4">
            {blogPosts.map((post) => (
              <Link
                key={post.slug}
                href={`/blog/${post.slug}`}
                className="flex items-baseline justify-between gap-4 py-1.5"
              >
                <span className="min-w-0 truncate text-[15px] font-medium">
                  {post.title}
                </span>
                <span className="shrink-0 text-[11px] font-medium uppercase tracking-[0.06em] text-neutral-400">
                  {formatPostDate(post.createdAt)}
                </span>
              </Link>
            ))}
            <Link
              href="/blog"
              className="mt-3 inline-block text-sm text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              View all →
            </Link>
          </div>
        )}
      </div>
    </section>
  );
};

export default MyBlogs;
