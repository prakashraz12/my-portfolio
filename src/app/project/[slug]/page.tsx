
import ProjectDetails from "@/components/projects/project-details.component";
import { ProjectPost } from "@/lib/types/types";
import { getProjectPostBySlug } from "@/lib/utils";
import React from "react";

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getProjectPostBySlug(slug) as ProjectPost;

  if (!post) {
    return {
      title: "Post Not Found - Prakash Raz Blog",
      description: "This post could not be found on Prakash Raz Blog.",
    };
  }

  return {
    title: `${post.title} -  Prakash Raz Blog`,
    description: post.shortDescription,
    keywords: post.tech_stacks,
    openGraph: {
      title: `${post.title} - Prakash Raz Blog`,
      description: post.shortDescription,
      url: `https://prakashraz.com/project/${slug}`,
      images: [
        {
          url: post.bannerImageUrl || "https://prakashraz.com/static/default-thumbnail.png",
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.shortDescription,
      images: [post.bannerImageUrl || "https://prakashraz.com/static/default-thumbnail.png"],
    },
  };
}
const ProjectPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = (await getProjectPostBySlug(slug)) as ProjectPost;

  if (!post) {
    return <div className="mt-[100px] text-center">Post not found</div>;
  }

  return <ProjectDetails projectPost={post}/>;
};

export default ProjectPostPage;
