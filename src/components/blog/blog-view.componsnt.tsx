"use client";
import { useState } from "react";
import { BlogPost } from "@/lib/types/types";
import Image from "next/image";
import Link from "next/link";
import CommentForm from "./comment-form.component";
import CommentView from "./comment-view.component";
import ClapAnimation from "../ui/clap-animation";
import SameTypeBlogs from "./same-type-blogs.component";
import AdBanner from "../ads-component/ads-banner.component";
import { SITE_URL } from "../../../constant";

const words = (html?: string) =>
  (html || "").replace(/<[^>]+>/g, " ").trim().split(/\s+/).filter(Boolean)
    .length;

const formatDate = (createdAt?: { seconds?: number }) => {
  if (!createdAt?.seconds) return "";
  return new Date(createdAt.seconds * 1000).toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
};

const isoDate = (createdAt?: { seconds?: number }) =>
  createdAt?.seconds
    ? new Date(createdAt.seconds * 1000).toISOString()
    : undefined;

const articleHtml = (html?: string) =>
  (html || "")
    .replace(/<p>\s*(<br\s*\/?>\s*)+<\/p>/gi, "")
    .replace(/<p>\s*<(strong|b)>([\s\S]*?)<\/\1>\s*<\/p>/gi, (match, _tag, inner) => {
      const text = inner.replace(/<[^>]+>/g, "").trim();
      if (!text || text.length > 80) return match;
      return `<h2>${inner}</h2>`;
    });

export default function BlogPostDetail({ blogPost }: { blogPost: BlogPost }) {
  const [claps, setClaps] = useState(blogPost?.claps || 0);
  const [copied, setCopied] = useState(false);
  const url = `${SITE_URL}/blog/${blogPost.slug}`;
  const minutes = Math.max(1, Math.round(words(blogPost.content) / 220));
  const date = formatDate(blogPost.createdAt);

  const copyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1400);
    } catch {
      setCopied(false);
    }
  };

  return (
    <article className="mx-auto w-full max-w-5xl px-6 pb-20 pt-8">
      <div className="mx-auto max-w-xl">
        <Link
          href="/blog"
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-neutral-500 hover:text-neutral-900 dark:hover:text-neutral-100"
        >
          Writing
        </Link>

        <header className="mt-6">
          <p className="text-[11px] font-medium uppercase tracking-[0.14em] text-neutral-400">
            {date && <time dateTime={isoDate(blogPost.createdAt)}>{date}</time>}
            {date && " · "}
            {minutes} min read
          </p>
          <h1 className="mt-3 text-balance text-3xl font-semibold tracking-tight md:text-[2.5rem] md:leading-[1.15]">
            {blogPost.title}
          </h1>
          {blogPost.shortDescription && (
            <p className="mt-4 text-lg leading-7 text-neutral-600 dark:text-neutral-300">
              {blogPost.shortDescription}
            </p>
          )}
        </header>

        {blogPost.bannerImageUrl && (
          <div className="relative mt-8 aspect-[16/10] overflow-hidden rounded-xl bg-neutral-100 dark:bg-white/5">
            <Image
              src={blogPost.bannerImageUrl}
              alt={blogPost.title}
              fill
              priority
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 576px"
            />
          </div>
        )}

        <div
          className="post-body mt-10"
          dangerouslySetInnerHTML={{ __html: articleHtml(blogPost.content) }}
        />

        {blogPost.tags?.length > 0 && (
          <p className="mt-10 text-[11px] font-medium uppercase tracking-[0.12em] text-neutral-400">
            {blogPost.tags.join(" · ")}
          </p>
        )}

        <div className="mt-6 flex items-center justify-between border-t border-neutral-200 pt-5 dark:border-white/10">
          <ClapAnimation
            claps={claps}
            setClaps={setClaps}
            postId={blogPost.id}
            collectionName="blogs"
          />
          <div className="flex items-center gap-4 text-sm text-neutral-500">
            <a
              href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(blogPost.title)}&url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              X
            </a>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`}
              target="_blank"
              rel="noreferrer"
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              LinkedIn
            </a>
            <button
              type="button"
              onClick={copyLink}
              className="hover:text-neutral-900 dark:hover:text-neutral-100"
            >
              {copied ? "Copied" : "Copy link"}
            </button>
          </div>
        </div>

        <div className="mt-10">
          <AdBanner
            dataAdFormat="auto"
            dataFullWidthResponsive={true}
            dataAdSlot="6809475648"
          />
        </div>

        <SameTypeBlogs
          categoryId={blogPost.category}
          excludeSlug={blogPost.slug}
        />

        <section className="mt-14">
          <CommentView postId={blogPost.id} collectionName="blogs" />
        </section>
        <section className="mt-8">
          <CommentForm postId={blogPost.id} collectionName="blogs" />
        </section>
      </div>
    </article>
  );
}
