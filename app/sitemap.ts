import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-data";
import { getSiteUrl } from "@/lib/cms/store";

/** Update when the page content meaningfully changes (avoid `new Date()` on every request). */
const STATIC_ROUTES: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: "2026-10-21" },
  { path: "/blog", lastModified: "2026-10-21" },
  { path: "/studio-services", lastModified: "2026-10-21" },
  { path: "/about", lastModified: "2026-10-21" },
  { path: "/contact", lastModified: "2026-10-21" },
  { path: "/privacy", lastModified: "2026-09-16" },
  { path: "/cookies", lastModified: "2026-09-16" },
  { path: "/terms", lastModified: "2026-09-16" }
];

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const posts = await getBlogPosts(false);

  const staticRoutes = STATIC_ROUTES.map((r) => ({
    url: `${siteUrl}${r.path === "/" ? "/" : r.path}`,
    lastModified: r.lastModified
  }));

  const blogRoutes = posts
    .filter((post) => !post.noIndex)
    .map((post) => {
      const image = post.ogImage || post.coverImage;
      return {
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.dateModified,
        ...(image ? { images: [image.startsWith("http") ? image : `${siteUrl}${image}`] } : {})
      };
    });

  return [...staticRoutes, ...blogRoutes];
}
