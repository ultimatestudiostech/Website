import { HomeExperience } from "@/components/home/HomeExperience";
import { HomeIntro } from "@/components/home/HomeIntro";
import { JsonLd } from "@/components/seo/JsonLd";
import { getCardPostsNewestFirst } from "@/lib/blog-data";
import { getSite, getSiteUrl } from "@/lib/cms/store";
import { buildMetadata } from "@/lib/seo";

export async function generateMetadata() {
  const site = await getSite();
  return buildMetadata({
    title: `${site.brandName}: Film Reviews, Horror & Streaming Guides`,
    absoluteTitle: true,
    description: site.seo.homeDescription ?? site.seo.defaultDescription,
    pathname: "/"
  });
}

export default async function HomePage() {
  const site = await getSite();
  const siteUrl = getSiteUrl();
  // Card-weight posts only: the slider renders slug/title/tags/dates/
  // readingMinutes/ogImage — full bodies would inline ~350 KB of RSC payload.
  const posts = (await getCardPostsNewestFirst()).slice(0, 12);

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: site.brandName,
      url: siteUrl,
      logo: `${siteUrl}/logo.png`,
      image: `${siteUrl}${site.seo.ogImagePath}`,
      ...(site.contact.email ? { email: site.contact.email } : {}),
      ...(site.contact.phone ? { telephone: site.contact.phone } : {}),
      ...(site.socials.length ? { sameAs: site.socials.map((s) => s.href) } : {})
    },
    {
      "@context": "https://schema.org",
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      name: site.brandName,
      url: siteUrl,
      description: site.seo.homeDescription ?? site.seo.defaultDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      potentialAction: {
        "@type": "SearchAction",
        target: `${siteUrl}/blog?q={search_term_string}`,
        "query-input": "required name=search_term_string"
      }
    }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <HomeExperience
        posts={posts}
        contact={site.contact}
        socials={site.socials}
        intro={<HomeIntro />}
      />
    </>
  );
}
