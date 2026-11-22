import type { MetadataRoute } from "next";
import { getBlogPosts } from "@/lib/blog-data";
import { getSiteUrl } from "@/lib/cms/store";
import { CATEGORIES, postsInCategory } from "@/lib/categories";

/** Update when the page content meaningfully changes (avoid `new Date()` on every request). */
const STATIC_ROUTES: Array<{ path: string; lastModified: string }> = [
  { path: "/", lastModified: "2026-10-28" },
  { path: "/blog", lastModified: "2026-11-15" },
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

  // Blog-derived routes: lastmod is the newest member post's dateModified,
  // so the sitemap only claims freshness the content actually has.
  const newestModified = (list: typeof posts) =>
    list.reduce<string | undefined>(
      (max, p) => (!max || p.dateModified > max ? p.dateModified : max),
      undefined
    );

  const categoryRoutes = CATEGORIES.map((c) => ({
    url: `${siteUrl}/blog/category/${c.slug}`,
    lastModified:
      newestModified(postsInCategory(posts, c.slug).filter((p) => !p.noIndex)) ?? "2026-10-28"
  }));

  const authorLastModified = new Map<string, string>();
  for (const p of posts) {
    if (!p.authorRole || p.noIndex) continue;
    const slug = p.author.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
    const current = authorLastModified.get(slug);
    if (!current || p.dateModified > current) authorLastModified.set(slug, p.dateModified);
  }
  const authorRoutes = Array.from(authorLastModified.entries()).map(([slug, lastModified]) => ({
    url: `${siteUrl}/blog/author/${slug}`,
    lastModified
  }));

  return [...staticRoutes, ...categoryRoutes, ...authorRoutes, ...blogRoutes];
}
