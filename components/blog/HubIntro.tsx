import Link from "next/link";
import type { ReactNode } from "react";
import styles from "./HubIntro.module.css";

const ext = { target: "_blank", rel: "noopener" } as const;

/** Server-rendered contextual intro copy (in-body internal + citation links) for blog hubs. */
export function HubIntro({ variant }: { variant: string }) {
  let body: ReactNode;
  switch (variant) {
    case "movie-reviews":
      body = (
        <>
          <p>
            Every full-length review we publish lives here, newest first. Each one covers the story without big spoilers, the cast, the themes and a straight verdict you can act on tonight. Recent highlights include our <Link href="/blog/project-hail-mary-2026-review-a-journey-beyond-the-stars">Project Hail Mary review</Link>, Christopher Nolan&apos;s <Link href="/blog/the-odyssey-2026-movie-review">The Odyssey (2026)</Link>, Pixar&apos;s <Link href="/blog/toy-story-5-2026-movie-review">Toy Story 5</Link> and the Netflix romance <Link href="/blog/voicemails-for-isabelle-review">Voicemails for Isabelle</Link>.
          </p>
          <p>
            Horror fans can go straight to our <Link href="/blog/category/horror-movie-reviews">new horror movie reviews</Link> or the <Link href="/blog/category/horror-classics">horror classics</Link>. Our verdicts are our own, but we check credits on <a href="https://www.imdb.com/" {...ext}>IMDb</a> and compare our take with critic consensus on <a href="https://www.rottentomatoes.com/" {...ext}>Rotten Tomatoes</a> and <a href="https://www.metacritic.com/" {...ext}>Metacritic</a>.
          </p>
        </>
      );
      break;
    case "horror-movie-reviews":
      body = (
        <>
          <p>
            Our reviews of the newest horror movies, from wide studio releases to festival and streaming originals. Start with the <Link href="/blog/backrooms-2026-movie-review">Backrooms (2026) review</Link>, which also explains the ending, or the wish-gone-wrong chiller <Link href="/blog/obsession-2026-review-fulfill-your-wishes-but-at-what-cost">Obsession</Link>. For bigger franchise swings, read our takes on <Link href="/blog/resident-evil-2026-review">Resident Evil (2026)</Link>, <Link href="/blog/lee-cronins-the-mummy-2026-review">Lee Cronin&apos;s The Mummy</Link> and Guillermo del Toro&apos;s <Link href="/blog/frankenstein-2025-review">Frankenstein</Link>.
          </p>
          <p>
            Each review says how scary the film actually is, who it suits and where you can watch it. If you want a ranked starting point instead, try our <Link href="/blog/category/horror-movie-lists">horror movie lists</Link>. Release dates and credits are checked against <a href="https://www.imdb.com/" {...ext}>IMDb</a> and <a href="https://www.boxofficemojo.com/" {...ext}>Box Office Mojo</a>.
          </p>
        </>
      );
      break;
    case "horror-classics":
      body = (
        <>
          <p>
            The films people keep arguing about, reviewed in depth. Our <Link href="/blog/the-exorcist-1973-review">The Exorcist (1973) review</Link> covers the film many critics still call the scariest ever made, along with its cast and ending. The <Link href="/blog/the-conjuring-2013-review">Conjuring (2013) review</Link> looks at the true Warren case behind it, and the <Link href="/blog/hereditary-2018-review">Hereditary review</Link> unpacks Ari Aster&apos;s ending. Our <Link href="/blog/shutter-island-ending-explained">Shutter Island ending explained</Link> walks through the lighthouse twist and that final line.
          </p>
          <p>
            Want the whole timeline? Read <Link href="/blog/conjuring-movies-in-order">The Conjuring movies in order</Link> or see where these films land among the <Link href="/blog/scariest-movies-of-all-time">scariest movies of all time</Link>. For background on the genre, the <a href="https://en.wikipedia.org/wiki/Horror_film" {...ext}>history of horror film on Wikipedia</a> and the <a href="https://www.afi.com/afis-100-years-100-thrills/" {...ext}>AFI&apos;s 100 Years…100 Thrills</a> are good places to start.
          </p>
        </>
      );
      break;
    case "horror-movie-lists":
      body = (
        <>
          <p>
            Ranked, fact-checked horror lists, organised by subgenre, studio and franchise. Begin with the <Link href="/blog/scariest-movies-of-all-time">25 scariest movies of all time</Link>, then go deeper with the <Link href="/blog/best-psychological-horror-movies">best psychological horror movies</Link>, the <Link href="/blog/a24-horror-movies">best A24 horror movies</Link>, the <Link href="/blog/best-vampire-movies">best vampire movies</Link> and our <Link href="/blog/found-footage-horror-movies">found footage horror</Link> picks. Franchise fans can watch <Link href="/blog/conjuring-movies-in-order">The Conjuring movies in order</Link>.
          </p>
          <p>
            Every list says where each film streams in the US, checked against <a href="https://www.justwatch.com/us" {...ext}>JustWatch</a>, and gives the director and year so you can find the right version. For service-by-service picks, see our <Link href="/blog/category/where-to-stream">where to stream</Link> guides.
          </p>
        </>
      );
      break;
    case "where-to-stream":
      body = (
        <>
          <p>
            Can&apos;t decide what to put on tonight? These guides are organised by service: the <Link href="/blog/best-horror-movies-on-netflix">best horror movies on Netflix</Link>, the best <Link href="/blog/hulu-horror-movies">horror movies on Hulu</Link> and our <Link href="/blog/prime-video-horror-movies">Prime Video horror picks</Link>. For the latest arrivals, see <Link href="/blog/new-horror-movies-streaming">new horror movies streaming</Link>, and in October use our guide to <Link href="/blog/halloween-movies-streaming">where to stream Halloween movies</Link>.
          </p>
          <p>
            Streaming catalogs change every month, so each guide shows when it was last checked. We confirm availability against <a href="https://www.justwatch.com/us" {...ext}>JustWatch</a> and the services&apos; own pages, such as <a href="https://www.netflix.com/browse/genre/8711" {...ext}>Netflix&apos;s horror category</a>. Want rankings instead? Try the <Link href="/blog/category/horror-movie-lists">horror movie lists</Link>.
          </p>
        </>
      );
      break;
    case "holiday-movies":
      body = (
        <>
          <p>
            Seasonal watchlists for the whole holiday stretch. In October, start with the <Link href="/blog/best-halloween-movies">best Halloween movies</Link> for every age, then see <Link href="/blog/halloween-movies-streaming">where to stream Halloween movies</Link>. For November, we have the <Link href="/blog/best-thanksgiving-movies">best Thanksgiving movies</Link> for the whole family and a darker list of <Link href="/blog/thanksgiving-horror-movies">Thanksgiving horror movies</Link>. December brings our <Link href="/blog/christmas-horror-movies">Christmas horror movies</Link>, from Black Christmas to Krampus.
          </p>
          <p>
            Every pick says where it streams, and the family-friendly titles are marked. For more scares any time of year, browse the <Link href="/blog/category/horror-movie-lists">horror movie lists</Link>. Release years and credits are checked against <a href="https://www.imdb.com/" {...ext}>IMDb</a>.
          </p>
        </>
      );
      break;
    case "author":
      body = (
        <>
          <p>
            Maryam writes most of our <Link href="/blog/category/movie-reviews">movie reviews</Link> and{" "}
            <Link href="/blog/category/horror-movie-lists">horror lists</Link>, including the{" "}
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
            The Ultimate Cineverse blog mixes <Link href="/blog/category/movie-reviews">new movie reviews</Link>,{" "}
            <Link href="/blog/category/horror-movie-lists">horror rankings</Link> and{" "}
            <Link href="/blog/category/where-to-stream">streaming guides</Link>. Popular right now: the{" "}
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
