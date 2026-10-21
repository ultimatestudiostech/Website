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
          Not sure what to watch tonight? Our streaming guides track the best new movies on Netflix, Prime
          Video and Hulu, and they are refreshed every month. Alongside the newsroom, our studio team
          offers video production, motion design and audio post-production.
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
