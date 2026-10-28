import { HubIntro } from "@/components/blog/HubIntro";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getPostsNewestFirst } from "@/lib/blog-data";
import { getBlogHubCopy, getSite, getSiteUrl } from "@/lib/cms/store";

export async function generateMetadata() {
  const site = await getSite();
  const hub = getBlogHubCopy(site);
  const siteUrl = getSiteUrl();
  const meta = await buildMetadata({
    title: hub.title,
    description: hub.description,
    pathname: "/blog",
    openGraphImageUrl: hub.ogImagePath ? `${siteUrl}${hub.ogImagePath}` : undefined
  });
  if (!hub.ogImagePath) return meta;
  return {
    ...meta,
    openGraph: {
      ...meta.openGraph,
      images: [
        {
          url: `${siteUrl}${hub.ogImagePath}`,
          width: hub.ogImageWidth ?? 1200,
          height: hub.ogImageHeight ?? 630,
          alt: hub.ogImageAlt ?? hub.title
        }
      ]
    }
  };
}

/** Re-evaluate the seasonal hub copy daily. */
export const revalidate = 86400;

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export default async function BlogIndexPage({ searchParams }: Props) {
  const { q } = await searchParams;
  const [posts, site] = await Promise.all([getPostsNewestFirst(), getSite()]);
  const siteUrl = getSiteUrl();
  const hub = getBlogHubCopy(site);

  const collectionLd = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: hub.title,
      description: hub.description,
      url: `${siteUrl}/blog`,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, name: site.brandName, url: siteUrl },
      about: hub.about,
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.slice(0, 20).map((post, index) => ({
          "@type": "ListItem",
          position: index + 1,
          url: `${siteUrl}/blog/${post.slug}`,
          name: post.title
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={collectionLd} />
      <BlogIndex posts={posts} initialQuery={q?.trim() ?? ""} heading={hub.heading} intro={<HubIntro variant="blog" />} />
    </>
  );
}
