import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-data";
import { getSiteUrl } from "@/lib/cms/store";
import { CATEGORIES } from "@/lib/categories";

/** Update when the page content meaningfully changes (avoid `new Date()` on every request). */
const STATIC_ROUTES: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: "2026-10-28" },
  { path: "/blog", lastModified: "2026-10-28" },
  { path: "/studio-services", lastModified: "2026-10-28" },
  { path: "/about", lastModified: "2026-10-28" },
  { path: "/contact", lastModified: "2026-10-28" },
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
      const inline = (post.body || [])
        .filter((b) => b._type === "image" && (b as unknown as { asset?: { _ref?: string } }).asset?._ref)
        .map((b) => {
          const ref = (b as unknown as { asset: { _ref: string } }).asset._ref;
          const m = ref.match(/^image-([a-zA-Z0-9]+)-(\d+x\d+)-(\w+)$/);
          return m ? `https://cdn.sanity.io/images/pbq9a26l/production/${m[1]}-${m[2]}.${m[3]}` : null;
        })
        .filter((u): u is string => Boolean(u));
      return {
        url: `${siteUrl}/blog/${post.slug}`,
        lastModified: post.dateModified,
        images: [
          ...(image ? [(image.startsWith("http") ? image : `${siteUrl}${image}`).split("?")[0]] : []),
          ...inline
        ].map((u) => u.replace(/&/g, "&amp;"))
      };
    });

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${siteUrl}/blog/category/${c.slug}`,
    lastModified: "2026-10-28"
  }));

  const authorRoutes = Array.from(
    new Set(posts.filter((p) => p.authorRole && !p.noIndex).map((p) => p.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "")))
  ).map((slug) => ({ url: `${siteUrl}/blog/author/${slug}`, lastModified: "2026-10-28" }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...blogRoutes];
}
