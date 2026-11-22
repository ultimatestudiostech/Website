import { HubIntro } from "@/components/blog/HubIntro";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getCardPostsNewestFirst } from "@/lib/blog-data";
import { getSite, getSiteUrl } from "@/lib/cms/store";
import { getActiveSeason } from "@/lib/season";
import type { BlogPost } from "@/lib/blog";

export const revalidate = 3600;

const slugify = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

async function getAuthor(slug: string) {
  const posts = (await getCardPostsNewestFirst()).filter((p: BlogPost) => p.authorRole && slugify(p.author) === slug);
  if (!posts.length) return null;
  const first = posts[0];
  return { name: first.author, role: first.authorRole || "", bio: posts.find((p) => p.authorBio)?.authorBio?.trim() || "", posts };
}

type Props = { params: Promise<{ author: string }> };

export async function generateStaticParams() {
  const posts = await getCardPostsNewestFirst();
  return Array.from(new Set(posts.filter((p) => p.authorRole).map((p) => slugify(p.author)))).map((author) => ({ author }));
}

/** Normalise whitespace (incl. stray spaces before commas) from CMS text. */
const cleanText = (s: string) => s.replace(/\s+/g, " ").replace(/\s+,/g, ",").trim();

/** Trim to at most `max` chars at a word boundary, with an ellipsis. */
function trimTo(max: number, s: string) {
  if (s.length <= max) return s;
  return `${s.slice(0, max - 1).replace(/\s+\S*$/, "")}…`;
}

export async function generateMetadata({ params }: Props) {
  const { author } = await params;
  const a = await getAuthor(author);
  if (!a) return {};
  const role = cleanText(a.role);
  const bio = cleanText(a.bio);
  // Sanity's authorRole can hold a whole bio sentence; only a short role
  // belongs in the title — otherwise the name alone carries it (buildMetadata
  // adds the brand suffix) and the sentence moves to the description.
  const shortRole = role.length <= 40 ? role : "";
  const title = shortRole ? `${a.name}, ${shortRole}` : a.name;
  const description = trimTo(
    155,
    bio ||
      `Movie reviews, horror guides and streaming picks by ${a.name}${shortRole ? `, ${shortRole}` : ""} at Ultimate Cineverse.`
  );
  return buildMetadata({
    title,
    description,
    pathname: `/blog/author/${author}`
  });
}

export default async function AuthorPage({ params }: Props) {
  const { author } = await params;
  const a = await getAuthor(author);
  if (!a) notFound();
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/blog/author/${author}`;
  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "ProfilePage",
      url,
      mainEntity: {
        "@type": "Person",
        name: a.name,
        jobTitle: a.role.trim(),
        ...(a.bio ? { description: a.bio } : {}),
        url,
        worksFor: { "@type": "Organization", name: "Ultimate Cineverse", url: siteUrl }
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: a.name, item: url }
      ]
    }
  ];
  return (
    <>
      <JsonLd data={ld} />
      <section style={{ maxWidth: 1100, margin: "0 auto", padding: "2.5rem 1.25rem 0" }}>
        <p>{a.role.trim()}</p>
        {a.bio ? <p>{a.bio}</p> : null}
        <p>{a.posts.length} articles published.</p>
      </section>
      <BlogIndex posts={a.posts} initialQuery="" heading={`Articles by ${a.name}`} season={getActiveSeason(await getSite())} intro={<HubIntro variant="author" />} />
    </>
  );
}
