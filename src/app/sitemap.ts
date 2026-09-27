import type { MetadataRoute } from "next";
import { collection, getDocs } from "firebase/firestore";
import { SITE_URL } from "../../constant";
import { db } from "@/lib/utils";

export const revalidate = 3600;

async function entries(collectionName: "blogs" | "project", prefix: string) {
  const snap = await getDocs(collection(db, collectionName));
  return snap.docs.flatMap((doc) => {
    const data = doc.data();
    const slug = data.slug as string | undefined;
    if (!slug) return [];
    const seconds = data.createdAt?.seconds as number | undefined;
    return [
      {
        url: `${SITE_URL}${prefix}/${slug}`,
        lastModified: seconds ? new Date(seconds * 1000) : undefined,
        changeFrequency: "monthly" as const,
        priority: 0.6,
      },
    ];
  });
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: SITE_URL, changeFrequency: "weekly", priority: 1 },
    { url: `${SITE_URL}/about`, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/blog`, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/project`, changeFrequency: "monthly", priority: 0.8 },
  ];

  try {
    const [blogs, projects] = await Promise.all([
      entries("blogs", "/blog"),
      entries("project", "/project"),
    ]);
    return [...staticPages, ...blogs, ...projects];
  } catch {
    return staticPages;
  }
}
