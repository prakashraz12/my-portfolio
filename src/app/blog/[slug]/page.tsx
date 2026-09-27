import React from "react";
import { getBlogPostBySlug } from "@/lib/utils";
import { BlogPost } from "@/lib/types/types";
import BlogPostDetail from "@/components/blog/blog-view.componsnt";
import { SITE_URL } from "../../../../constant";

const imageFor = (post: BlogPost) =>
  post.bannerImageUrl || "/open-graph-image.png";

const published = (post: BlogPost) =>
  post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toISOString()
    : undefined;

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = (await getBlogPostBySlug(slug)) as BlogPost;

  if (!post) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const url = `/blog/${slug}`;
  const image = imageFor(post);

  return {
    title: post.title,
    description: post.shortDescription,
    keywords: post.tags,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.shortDescription,
      url,
      publishedTime: published(post),
      authors: ["Prakash Raz Shrestha"],
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.shortDescription,
      images: [image],
    },
  };
}
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = (await getBlogPostBySlug(slug)) as BlogPost;

  if (!post) {
    return <div>Post not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: post.title,
    description: post.shortDescription,
    image: imageFor(post),
    datePublished: published(post),
    author: {
      "@type": "Person",
      name: "Prakash Raz Shrestha",
      url: SITE_URL,
    },
    mainEntityOfPage: `${SITE_URL}/blog/${slug}`,
    keywords: post.tags?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <BlogPostDetail blogPost={post} />
    </>
  );
};

export default BlogPostPage;
