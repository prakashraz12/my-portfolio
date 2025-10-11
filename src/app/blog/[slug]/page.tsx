import React from "react";
import { getBlogPostBySlug } from "@/lib/utils";
import { BlogPost } from "@/lib/types/types";
import BlogPostDetail from "@/components/blog/blog-view.componsnt";

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}) {
  const { slug } = params;
  const post = (await getBlogPostBySlug(slug)) as BlogPost;

  if (!post) {
    return {
      title: "Post Not Found - Prakash Raz Blog",
      description: "This post could not be found on eDigital Blog.",
    };
  }

  return {
    title: `${post.title} -Prakash Raz Blog`,
    description: post.shortDescription,
    keywords: post.tags,
    openGraph: {
      title: `${post.title} - Prakash Raz Blog`,
      description: post.shortDescription,
      url: `https://prakashraz.com/blog/${slug}`,
      images: [
        {
          url:
            post.bannerImageUrl ||
            "https://prakashraz.com/static/default-thumbnail.png",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.shortDescription,
      images: [
        post.bannerImageUrl ||
          "https://prakashraz.com/static/default-thumbnail.png",
      ],
    },
  };
}
const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = (await getBlogPostBySlug(slug)) as BlogPost;

  if (!post) {
    return <div>Post not found</div>;
  }

  return <BlogPostDetail blogPost={post} />;
};

export default BlogPostPage;
