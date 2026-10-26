import Link from "next/link";
import { notFound } from "next/navigation";
import { BlogIndex } from "@/components/blog/BlogIndex";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { CATEGORIES, getCategory } from "@/lib/categories";
import { getPostsNewestFirst } from "@/lib/blog-data";
import { getSiteUrl } from "@/lib/cms/store";

export const revalidate = 3600;

export function generateStaticParams() {
  return CATEGORIES.map((c) => ({ category: c.slug }));
}

type Props = { params: Promise<{ category: string }> };

export async function generateMetadata({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) return {};
  return buildMetadata({
    title: cat.title,
    description: cat.description,
    pathname: `/blog/category/${cat.slug}`
  });
}

export default async function CategoryPage({ params }: Props) {
  const { category } = await params;
  const cat = getCategory(category);
  if (!cat) notFound();
  const siteUrl = getSiteUrl();
  const posts = (await getPostsNewestFirst()).filter(cat.match);
  const url = `${siteUrl}/blog/category/${cat.slug}`;

  const ld = [
    {
      "@context": "https://schema.org",
      "@type": "CollectionPage",
      name: cat.title,
      description: cat.description,
      url,
      isPartOf: { "@type": "WebSite", "@id": `${siteUrl}/#website`, url: siteUrl },
      mainEntity: {
        "@type": "ItemList",
        itemListElement: posts.map((p, i) => ({
          "@type": "ListItem",
          position: i + 1,
          url: `${siteUrl}/blog/${p.slug}`,
          name: p.title
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Blog", item: `${siteUrl}/blog` },
        { "@type": "ListItem", position: 3, name: cat.name, item: url }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={ld} />
      <BlogIndex posts={posts} initialQuery="" heading={cat.title} />
      <nav aria-label="Other sections" style={{ maxWidth: 1100, margin: "0 auto", padding: "0 1.25rem 3rem" }}>
        <p>{cat.intro}</p>
        <p>
          More sections:{" "}
          {CATEGORIES.filter((c) => c.slug !== cat.slug).map((c, i) => (
            <span key={c.slug}>
              {i > 0 ? " · " : ""}
              <Link href={`/blog/category/${c.slug}`}>{c.name}</Link>
            </span>
          ))}
          {" · "}
          <Link href="/blog">All posts</Link>
        </p>
      </nav>
    </>
  );
}
