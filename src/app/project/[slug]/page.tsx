
import ProjectDetails from "@/components/projects/project-details.component";
import { ProjectPost } from "@/lib/types/types";
import { getProjectPostBySlug } from "@/lib/utils";
import React from "react";
import { SITE_URL } from "../../../../constant";

const imageFor = (post: ProjectPost) =>
  post.bannerImageUrl || "/open-graph-image.png";

const published = (post: ProjectPost) =>
  post.createdAt?.seconds
    ? new Date(post.createdAt.seconds * 1000).toISOString()
    : undefined;

export async function generateMetadata({ params }: { params: { slug: string } }) {
  const { slug } = params;
  const post = await getProjectPostBySlug(slug) as ProjectPost;

  if (!post) {
    return {
      title: "Project not found",
      description: "This project could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const url = `/project/${slug}`;
  const image = imageFor(post);

  return {
    title: post.title,
    description: post.shortDescription,
    keywords: post.tech_stacks,
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.shortDescription,
      url,
      publishedTime: published(post),
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
const ProjectPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = (await getProjectPostBySlug(slug)) as ProjectPost;

  if (!post) {
    return <div className="mt-[100px] text-center">Post not found</div>;
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: post.title,
    description: post.shortDescription,
    image: imageFor(post),
    datePublished: published(post),
    url: `${SITE_URL}/project/${slug}`,
    author: {
      "@type": "Person",
      name: "Prakash Raz Shrestha",
      url: SITE_URL,
    },
    keywords: post.tech_stacks?.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c"),
        }}
      />
      <ProjectDetails projectPost={post} />
    </>
  );
};

export default ProjectPostPage;
