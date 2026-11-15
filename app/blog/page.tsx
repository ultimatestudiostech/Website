import { HubIntro } from "@/components/blog/HubIntro";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getBlogFaqs } from "@/lib/blog-faqs";
import { getCardPostsNewestFirst } from "@/lib/blog-data";
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

/**
 * ISR: regenerated at most hourly so Cloudflare can edge-cache the HTML
 * (s-maxage + stale-while-revalidate). Sanity edits and the seasonal hub
 * copy stay fresh within the hour — the window category pages already use.
 * No searchParams here: reading them would force dynamic rendering; the
 * ?q= term is applied client-side by BlogIndex instead.
 */
export const revalidate = 3600;

export default async function BlogIndexPage() {
  const [posts, site] = await Promise.all([getCardPostsNewestFirst(), getSite()]);
  const siteUrl = getSiteUrl();
  const hub = getBlogHubCopy(site);
  const faqs = getBlogFaqs(hub.season);

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
    },
    {
      // Mirrors the visible FAQ section in BlogIndex 1:1 (same source array).
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "@id": `${siteUrl}/blog#faq`,
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.question,
        acceptedAnswer: { "@type": "Answer", text: f.answer }
      }))
    }
  ];

  return (
    <>
      <JsonLd data={collectionLd} />
      <BlogIndex posts={posts} heading={hub.heading} intro={<HubIntro variant="blog" />} hubExtras season={hub.season} faqs={faqs} />
    </>
  );
}
