import Link from "next/link";
import { getBlogPostBySlug } from "@/lib/utils";
import { BlogPost } from "@/lib/types/types";
import BlogPostDetail from "@/components/blog/blog-view.componsnt";
import { SITE_URL } from "../../../../constant";

const absolute = (path?: string) => {
  if (!path) return `${SITE_URL}/open-graph-image.png`;
  if (path.startsWith("http")) return path;
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
};

const plain = (html?: string) =>
  (html || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&nbsp;/gi, " ")
    .replace(/\s+/g, " ")
    .trim();

const summary = (post: BlogPost) => {
  const text = plain(post.shortDescription) || plain(post.content);
  if (text.length <= 158) return text;
  return `${text.slice(0, 155).trimEnd()}...`;
};

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
  const post = (await getBlogPostBySlug(slug)) as BlogPost | null;

  if (!post) {
    return {
      title: "Post not found",
      description: "This post could not be found.",
      robots: { index: false, follow: false },
    };
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const description = summary(post);
  const image = absolute(post.bannerImageUrl);

  return {
    title: post.title,
    description,
    keywords: post.tags,
    authors: [{ name: "Prakash Raz Shrestha", url: SITE_URL }],
    alternates: { canonical: url },
    openGraph: {
      type: "article",
      siteName: "Prakash Raz Shrestha",
      locale: "en_US",
      title: post.title,
      description,
      url,
      publishedTime: published(post),
      authors: ["Prakash Raz Shrestha"],
      tags: post.tags,
      images: [{ url: image, alt: post.title }],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description,
      images: [image],
      creator: "@prakashraz",
    },
  };
}

const BlogPostPage = async ({ params }: { params: { slug: string } }) => {
  const { slug } = params;
  const post = (await getBlogPostBySlug(slug)) as BlogPost | null;

  if (!post) {
    return (
      <div className="mx-auto w-full max-w-xl px-6 py-24">
        <p className="text-sm text-neutral-500">This post is gone.</p>
        <Link href="/blog" className="mt-3 inline-block text-sm underline">
          Back to writing
        </Link>
      </div>
    );
  }

  const url = `${SITE_URL}/blog/${slug}`;
  const description = summary(post);
  const date = published(post);
  const words = plain(post.content).split(" ").filter(Boolean).length;

  const jsonLd = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": "BlogPosting",
        "@id": `${url}#article`,
        headline: post.title,
        description,
        image: absolute(post.bannerImageUrl),
        datePublished: date,
        inLanguage: "en",
        wordCount: words || undefined,
        keywords: post.tags?.join(", "),
        url,
        author: { "@id": `${SITE_URL}/#person` },
        publisher: { "@id": `${SITE_URL}/#person` },
        isPartOf: { "@id": `${SITE_URL}/#website` },
        mainEntityOfPage: { "@type": "WebPage", "@id": url },
      },
      {
        "@type": "BreadcrumbList",
        itemListElement: [
          { "@type": "ListItem", position: 1, name: "Home", item: SITE_URL },
          {
            "@type": "ListItem",
            position: 2,
            name: "Writing",
            item: `${SITE_URL}/blog`,
          },
          { "@type": "ListItem", position: 3, name: post.title, item: url },
        ],
      },
    ],
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
