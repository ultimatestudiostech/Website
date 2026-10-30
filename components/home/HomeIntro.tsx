import Link from "next/link";
import styles from "./HomeIntro.module.css";

/** Visible keyword intro (replaces the former sr-only block). Server component. */
export function HomeIntro() {
  return (
    <section className={styles.intro} aria-labelledby="home-intro-heading">
      <div className={styles.inner}>
        <p className={styles.kicker}>Ultimate Cineverse</p>
        <h1 id="home-intro-heading" className={styles.title}>
          Film Reviews, Horror Picks &amp; Streaming Guides
        </h1>
        <p className={styles.copy}>
          Ultimate Cineverse is an independent entertainment newsroom. We publish honest film reviews of
          new theatrical releases and streaming debuts, ending-explained breakdowns for the movies people
          argue about, and ranked lists of the best horror movies — from psychological horror and
          found-footage scares to classic slashers and A24 favourites.
        </p>
        <p className={styles.copy}>
          Not sure what to watch tonight? Start with the 
          <Link href="/blog/best-horror-movies-on-netflix">best horror movies on Netflix</Link>, our 
          <Link href="/blog/hulu-horror-movies">Hulu horror guide</Link> or the 
          <Link href="/blog/prime-video-horror-movies">Prime Video horror picks</Link>, all refreshed every month.
          Want something newer? Our <Link href="/blog/category/movie-reviews">latest movie reviews</Link> cover films
          like <Link href="/blog/project-hail-mary-2026-review-a-journey-beyond-the-stars">Project Hail Mary</Link> 
          and <Link href="/blog/frankenstein-2025-review">Guillermo del Toro&apos;s Frankenstein</Link>.
        </p>
        <p className={styles.copy}>
          Every review links its sources. We cross-check credits on 
          <a href="https://www.imdb.com/" target="_blank" rel="noopener">IMDb</a>, critic consensus on 
          <a href="https://www.rottentomatoes.com/" target="_blank" rel="noopener">Rotten Tomatoes</a> and grosses on 
          <a href="https://www.boxofficemojo.com/" target="_blank" rel="noopener">Box Office Mojo</a>. Alongside the newsroom, our 
          <Link href="/studio-services">studio team</Link> offers video production, motion design and audio
          post-production.
        </p>
        <ul className={styles.links}>
          <li>
            <Link href="/blog">Read the latest reviews &amp; guides</Link>
          </li>
          <li>
            <Link href="/studio-services">Video production &amp; motion design studio</Link>
          </li>
          <li>
            <Link href="/about">How we review films</Link>
          </li>
        </ul>
      </div>
    </section>
  );
}
