import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getPostsNewestFirst } from "@/lib/blog-data";
import { getSite, getSiteUrl } from "@/lib/cms/store";

const BLOG_TITLE = "Halloween Blog: Horror Movies & Spooky Guides";
const BLOG_DESCRIPTION =
  "Halloween movie guides, horror streaming picks, spooky-season reviews, and entertainment deep-dives. Fresh October reads from Ultimate Cineverse.";

export async function generateMetadata() {
  const meta = await buildMetadata({
    title: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    pathname: "/blog"
  });
  return {
    ...meta,
    keywords: [
      "Halloween blog",
      "Halloween movies",
      "horror movie reviews",
      "Halloween streaming guides",
      "spooky season entertainment",
      "what to watch Halloween",
      "horror film guides",
      "Ultimate Cineverse blog"
    ]
  };
}

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const [posts, site] = await Promise.all([getPostsNewestFirst(), getSite()]);
  const siteUrl = getSiteUrl();

  const collectionLd = {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    name: BLOG_TITLE,
    description: BLOG_DESCRIPTION,
    url: `${siteUrl}/blog`,
    isPartOf: {
      "@type": "WebSite",
      name: site.brandName,
      url: siteUrl
    },
    about: ["Halloween", "Horror films", "Entertainment", "Streaming guides"],
    mainEntity: {
      "@type": "ItemList",
      itemListElement: posts.slice(0, 20).map((post, index) => ({
        "@type": "ListItem",
        position: index + 1,
        url: `${siteUrl}/blog/${post.slug}`,
        name: post.title
      }))
    }
  };

  return (
    <>
      <JsonLd data={collectionLd} />
      <BlogIndex posts={posts} initialQuery={q?.trim() ?? ""} />
    </>
  );
}
