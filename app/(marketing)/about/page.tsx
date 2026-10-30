import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getSite, getSiteUrl } from "@/lib/cms/store";

export async function generateMetadata() {
  return buildMetadata({
    title: "About Us: Independent Film Reviews & Guides",
    description:
      "Meet Ultimate Cineverse, an independent newsroom for film reviews, movies explained, horror picks and streaming guides — plus our studio production arm.",
    pathname: "/about"
  });
}

const h2 = "mt-10 text-xl font-semibold text-uc-fg";
const p = "mt-4 text-uc-muted leading-relaxed";

export default async function AboutPage() {
  const site = await getSite();
  const siteUrl = getSiteUrl();

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "AboutPage",
      name: site.about.title,
      url: `${siteUrl}/about`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "About", item: `${siteUrl}/about` }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="uc-page mx-auto w-full max-w-3xl px-4 py-12 pb-24">
        <h1 className="text-3xl font-bold text-uc-fg">{site.about.title}</h1>
        {site.about.paragraphs.map((para) => (
          <p key={para.slice(0, 24)} className={p}>
            {para}
          </p>
        ))}

        <h2 className={h2}>What we cover</h2>
        <ul className="mt-4 list-disc space-y-2 pl-5 text-uc-muted leading-relaxed">
          <li>
            <strong className="text-uc-fg">Film reviews</strong> — theatrical releases and streaming debuts,
            with plot, cast and a clear verdict on whether a movie is worth your time.
          </li>
          <li>
            <strong className="text-uc-fg">Movies explained</strong> — ending-explained breakdowns, timelines
            and theories for films that leave audiences debating.
          </li>
          <li>
            <strong className="text-uc-fg">Horror picks</strong> — ranked lists of psychological horror,
            found-footage, slasher and classic horror movies, plus seasonal Halloween guides.
          </li>
          <li>
            <strong className="text-uc-fg">Streaming guides</strong> — what to watch on Netflix, Prime Video
            and Hulu, refreshed as catalogues change.
          </li>
        </ul>

        <h2 className={h2}>How we review films</h2>
        <p className={p}>
          Each review looks at the craft behind a film — directing, performances, writing, cinematography
          and sound — and then translates that into practical viewer takeaways: who the movie is for, what
          to expect, and where it sits next to similar titles. Spoilers are clearly flagged, and explainers
          are kept separate from spoiler-light reviews so you can choose how much you want to know.
        </p>
        <p className={p}>
          Streaming guides and ranked lists are dated and updated when availability changes. If you spot an
          error or an out-of-date listing, tell us through the{" "}
          <Link className="uc-link" href="/contact">
            contact page
          </Link>{" "}
          and we will correct it.
        </p>

        <h2 className={h2}>Our studio</h2>
        <p className={p}>
          The same team that writes about film also makes it. Our studio arm handles video production,
          motion design and audio post-production for creators and brands. See{" "}
          <Link className="uc-link" href="/studio-services">
            studio services
          </Link>{" "}
          for details.
        </p>

        <h2 className={h2}>Start reading</h2>
        <p className={p}>
          Browse the latest{" "}
          <Link className="uc-link" href="/blog">
            film reviews and streaming guides
          </Link>
          {site.socials.length ? (
            <>
              , or watch our videos on{" "}
              {site.socials.map((s, i) => (
                <span key={s.id}>
                  {i > 0 ? ", " : ""}
                  <a className="uc-link" href={s.href} target="_blank" rel="noopener noreferrer">
                    {s.label}
                  </a>
                </span>
              ))}
            </>
          ) : null}
          .
        </p>
        <h2 className={h2}>Where to start</h2>
        <p className={p}>
          New here? Our <Link className="uc-link" href="/blog/category/movie-reviews">movie reviews</Link> cover new theatrical and
          streaming releases, the <Link className="uc-link" href="/blog/category/horror-movie-lists">horror hub</Link> collects every
          scary-movie list we publish, and the <Link className="uc-link" href="/blog/category/where-to-stream">streaming guides</Link> 
          track what is worth watching on each service. A good first read is our 
          <Link className="uc-link" href="/blog/best-psychological-horror-movies">best psychological horror movies</Link> list.
        </p>
        <p className={p}>
          We check cast, crew and release details against 
          <a className="uc-link" href="https://www.imdb.com/" target="_blank" rel="noopener">IMDb</a>, box-office figures against 
          <a className="uc-link" href="https://www.boxofficemojo.com/" target="_blank" rel="noopener">Box Office Mojo</a>, and age ratings against the 
          <a className="uc-link" href="https://www.filmratings.com/" target="_blank" rel="noopener">MPA film ratings</a> database, then link the specific
          sources inside each article.
        </p>
      </main>
    </>
  );
}
