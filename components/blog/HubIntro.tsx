import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./HubIntro.module.css";

const ext = { target: "_blank", rel: "noopener" } as const;

/** Server-rendered contextual intro copy (in-body internal + citation links) for blog hubs. */
export function HubIntro({ variant }: { variant: string }) {
  let body: ReactNode;
  switch (variant) {
    case "horror":
      body = (
        <>
          <p>
            This is the home of every horror piece we publish. If you want a ranked starting point, try the{" "}
            <Link href="/blog/best-psychological-horror-movies">best psychological horror movies</Link> or our{" "}
            <Link href="/blog/found-footage-horror-movies">found footage horror list</Link>. For a classic, read
            our <Link href="/blog/the-exorcist-1973-review">The Exorcist (1973) review</Link>, and for something
            new, the <Link href="/blog/lee-cronins-the-mummy-2026-review">Lee Cronin&apos;s The Mummy review</Link>.
          </p>
          <p>
            Want to know how the genre grew from silent cinema to A24? The{" "}
            <a href="https://en.wikipedia.org/wiki/Horror_film" {...ext}>history of horror film on Wikipedia</a> is a
            good primer, and the <a href="https://www.afi.com/afis-100-years-100-thrills/" {...ext}>AFI&apos;s 100
            Years…100 Thrills</a> list shows how many scary films critics rank among the greats.
          </p>
        </>
      );
      break;
    case "streaming-guides":
      body = (
        <>
          <p>
            Our streaming guides are organised by service: the{" "}
            <Link href="/blog/best-horror-movies-on-netflix">best horror movies on Netflix</Link>,{" "}
            <Link href="/blog/hulu-horror-movies">horror movies on Hulu</Link> and{" "}
            <Link href="/blog/prime-video-horror-movies">Prime Video horror picks</Link>. Looking for October
            viewing? See <Link href="/blog/halloween-movies-streaming">where to stream Halloween movies</Link>.
          </p>
          <p>
            Catalogues change monthly, so we confirm availability against each service&apos;s own listings, such as{" "}
            <a href="https://www.netflix.com/browse/genre/8711" {...ext}>Netflix&apos;s horror category</a> and{" "}
            <a href="https://www.hulu.com/hub/horror" {...ext}>Hulu&apos;s horror hub</a>, before every update.
          </p>
        </>
      );
      break;
    case "reviews":
      body = (
        <>
          <p>
            Recent highlights include our{" "}
            <Link href="/blog/project-hail-mary-2026-review-a-journey-beyond-the-stars">Project Hail Mary review</Link>,
            the <Link href="/blog/the-odyssey-2026-movie-review">The Odyssey (2026) review</Link>,{" "}
            <Link href="/blog/toy-story-5-2026-movie-review">Toy Story 5</Link> and{" "}
            <Link href="/blog/frankenstein-2025-review">Guillermo del Toro&apos;s Frankenstein</Link>. Horror fans
            can jump straight to the <Link href="/blog/category/horror">horror hub</Link>.
          </p>
          <p>
            Our verdicts are our own, but we cite credits from{" "}
            <a href="https://www.imdb.com/" {...ext}>IMDb</a> and compare our take with critic consensus on{" "}
            <a href="https://www.rottentomatoes.com/" {...ext}>Rotten Tomatoes</a> and{" "}
            <a href="https://www.metacritic.com/" {...ext}>Metacritic</a>.
          </p>
        </>
      );
      break;
    case "author":
      body = (
        <>
          <p>
            Maryam writes most of our <Link href="/blog/category/reviews">movie reviews</Link> and{" "}
            <Link href="/blog/category/horror">horror lists</Link>, including the{" "}
            <Link href="/blog/best-halloween-movies">best Halloween movies</Link> guide and our{" "}
            <Link href="/blog/mickey-17-2025-movie-review">Mickey 17 review</Link>. Read more about{" "}
            <Link href="/about">how Ultimate Cineverse reviews films</Link>.
          </p>
          <p>
            Each article links its sources, typically{" "}
            <a href="https://www.imdb.com/" {...ext}>IMDb</a> for credits,{" "}
            <a href="https://www.boxofficemojo.com/" {...ext}>Box Office Mojo</a> for grosses and official studio
            or streamer pages for release dates.
          </p>
        </>
      );
      break;
    default:
      body = (
        <>
          <p>
            The Ultimate Cineverse blog mixes <Link href="/blog/category/reviews">new movie reviews</Link>,{" "}
            <Link href="/blog/category/horror">horror rankings</Link> and{" "}
            <Link href="/blog/category/streaming-guides">streaming guides</Link>. Popular right now: the{" "}
            <Link href="/blog/best-halloween-movies">best Halloween movies</Link>,{" "}
            <Link href="/blog/new-horror-movies-streaming">new horror movies streaming</Link> and our{" "}
            <Link href="/blog/frankenstein-2025-review">Frankenstein (2025) review</Link>.
          </p>
          <p>
            We check facts against primary sources: credits on <a href="https://www.imdb.com/" {...ext}>IMDb</a>,
            grosses on <a href="https://www.boxofficemojo.com/" {...ext}>Box Office Mojo</a> and critic consensus on{" "}
            <a href="https://www.rottentomatoes.com/" {...ext}>Rotten Tomatoes</a>.
          </p>
        </>
      );
  }
  return (
    <section className={styles.intro} aria-label="About this section">
      {body}
    </section>
  );
}
