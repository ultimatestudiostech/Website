"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Cobweb, HalloweenFlight, PumpkinAccent } from "@/components/blog/HalloweenDetails";
import { AdUnit } from "@/components/ads/AdUnit";
import { getReadingMinutes, type BlogPost } from "@/lib/blog";
import styles from "./blog.module.css";

const FILTER_ALL = "All";

function yearOf(iso: string) {
  const y = new Date(iso).getFullYear();
  return Number.isNaN(y) ? "" : String(y);
}

function posterTone(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % 360;
  // Halloween palette: pumpkin, amber, ember, blood orange, charcoal ember
  const hue = [18, 28, 32, 12, 8, 24, 15][h % 7];
  return `linear-gradient(145deg, hsl(${hue} 62% 28%) 0%, hsl(${hue} 40% 10%) 55%, #07060a 100%)`;
}

function uniqueTags(posts: BlogPost[]) {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const p of posts) {
    for (const t of p.tags) {
      const key = t.trim();
      if (!key || seen.has(key.toLowerCase())) continue;
      seen.add(key.toLowerCase());
      out.push(key);
    }
  }
  return out.slice(0, 10);
}

function FeaturedCard({ post, accent }: { post: BlogPost; accent?: boolean }) {
  const minutes = getReadingMinutes(post.content);
  const imageSrc = post.coverImage || post.ogImage;
  return (
    <Link
      href={`/blog/${post.slug}`}
      className={`${styles.featureCard} ${accent ? styles.featureCardAlt : ""}`}
    >
      <div className={styles.featureMedia} aria-hidden="true">
        {imageSrc ? (
          <Image
            src={imageSrc}
            alt=""
            fill
            sizes="(max-width: 900px) 100vw, 50vw"
            className={styles.featureImg}
          />
        ) : (
          <div className={styles.featureFallback} style={{ background: posterTone(post.slug) }} />
        )}
        <div className={styles.featureScrim} />
        <Cobweb className={styles.cardWeb} />
      </div>
      <div className={styles.featureCopy}>
        <p className={styles.featureEyebrow}>
          {post.tags[0] || "Halloween"} · {minutes} min
        </p>
        <h2 className={styles.featureTitle}>{post.title}</h2>
        <p className={styles.featureDesc}>{post.description}</p>
        <span className={styles.playBtn}>
          <span className={styles.playIcon} aria-hidden="true">
            ↗
          </span>
          Read story
        </span>
      </div>
    </Link>
  );
}

function PosterCard({ post }: { post: BlogPost }) {
  const minutes = getReadingMinutes(post.content);
  const year = yearOf(post.datePublished);
  const imageSrc = post.coverImage || post.ogImage;

  return (
    <Link href={`/blog/${post.slug}`} className={styles.poster}>
      <div className={styles.posterArt} aria-hidden="true">
        {imageSrc ? (
          <>
            <Image
              src={imageSrc}
              alt=""
              fill
              aria-hidden="true"
              sizes="(max-width: 640px) 45vw, (max-width: 1100px) 30vw, 220px"
              className={styles.posterImgBackdrop}
            />
            <Image
              src={imageSrc}
              alt=""
              fill
              sizes="(max-width: 640px) 45vw, (max-width: 1100px) 30vw, 220px"
              className={styles.posterImg}
            />
          </>
        ) : (
          <div className={styles.posterFallback} style={{ background: posterTone(post.slug) }}>
            <Image
              src="/logo.png"
              alt=""
              width={48}
              height={48}
              className={styles.posterLogo}
            />
          </div>
        )}
      </div>
      <h3 className={styles.posterTitle}>{post.title}</h3>
      <p className={styles.posterMeta}>
        <span className={styles.posterStat} aria-label={`${minutes} minute read`}>
          ★ {minutes} min
        </span>
        {year ? <span className={styles.posterYear}>{year}</span> : null}
      </p>
    </Link>
  );
}

export function BlogIndex({
  posts,
  initialQuery = ""
}: {
  posts: BlogPost[];
  initialQuery?: string;
}) {
  const tags = useMemo(() => uniqueTags(posts).filter((tag) => tag.toLowerCase() !== FILTER_ALL.toLowerCase()), [posts]);
  const [filter, setFilter] = useState(FILTER_ALL);
  const [query, setQuery] = useState(initialQuery);

  const filtered = useMemo(() => {
    const tagNeedle = filter === FILTER_ALL ? "" : filter.toLowerCase();
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (tagNeedle && !p.tags.some((t) => t.toLowerCase() === tagNeedle)) return false;
      if (!q) return true;
      const hay = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, filter, query]);

  const featured = filtered.length > 2 ? filtered.slice(0, 2) : [];
  const gridPosts = filtered.slice(featured.length);
  const blogLabel = posts.length === 1 ? "story to explore" : "stories to explore";

  return (
    <div className={styles.page}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <main className={styles.shell}>
        <header className={styles.seasonHero}>
          <Image
            src="/images/blog/halloween-after-dark.webp"
            alt=""
            fill
            priority
            sizes="(max-width: 1280px) 100vw, 1240px"
            className={styles.seasonArt}
          />
          <div className={styles.seasonVeil} aria-hidden="true" />
          <HalloweenFlight />
          <Cobweb className={styles.heroWeb} />
          <div className={styles.seasonMasthead}>
            <p className={styles.brandKicker}>Ultimate Cineverse / The Halloween edit</p>
            <span className={styles.seasonIssue} aria-hidden="true">Oct. 31</span>
          </div>
          <div className={styles.seasonIntro}>
            <p className={styles.seasonOverline}><span aria-hidden="true">✦</span> For the love of a good scare</p>
            <h1 className={styles.seasonTitle}>Halloween<br /><span>After dark.</span></h1>
            <p className={styles.seasonDescription}>
              Films that haunt you. Stories that stay with you. Explore horror movie guides,
              streaming picks, and the craft behind the chills.
            </p>
            <a href="#library" className={styles.seasonCta}>
              Find your next read <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className={styles.seasonFoot}>
            <span>Horror. Cinema. A little darkness.</span>
            <span>{posts.length} {blogLabel}</span>
          </div>
        </header>

        <div className={styles.browseBar}>
          <div>
            <p className={styles.brandKicker}>The reading room</p>
            <h2 className={styles.browseTitle}>Good stories. Dark corners.</h2>
          </div>
          <label className={styles.blogSearch}>
            <span>Search the stories</span>
            <input
              type="search"
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="A film, a mood, a story…"
              aria-controls="library"
            />
          </label>
        </div>

        <div id="topics" className={styles.filterRow} role="group" aria-label="Filter stories by topic">
          {[FILTER_ALL, ...tags].map((tag) => (
            <button
              key={tag}
              type="button"
              aria-pressed={filter === tag}
              aria-controls="library"
              className={`${styles.filterPill} ${filter === tag ? styles.filterPillActive : ""}`}
              onClick={() => setFilter(tag)}
            >
              {tag === FILTER_ALL ? "All stories" : tag}
            </button>
          ))}
        </div>

        {query ? (
          <p className={styles.searchNote} role="status">
            Showing results for <strong>“{query}”</strong>
            {" · "}
            <button type="button" className={styles.clearSearch} onClick={() => setQuery("")}>
              Clear
            </button>
          </p>
        ) : null}

        <div id="library" className={styles.storyResults}>
          {posts.length === 0 ? (
            <div className={styles.empty} role="status">
              <h2>The next story is in the shadows</h2>
              <p>Check back for new film stories and Halloween reads.</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty} role="status">
              <h2>No matches</h2>
              <p>Try another search or clear the filter.</p>
              <button
                type="button"
                className={styles.resetSearch}
                onClick={() => {
                  setQuery("");
                  setFilter(FILTER_ALL);
                }}
              >
                Show all stories
              </button>
            </div>
          ) : (
            <>
              {featured.length > 0 ? (
                <section id="featured" className={styles.featured} aria-label="Featured Halloween reads">
                  {featured.map((post, i) => (
                    <FeaturedCard key={post.slug} post={post} accent={i === 1} />
                  ))}
                </section>
              ) : null}

              <section className={styles.library} aria-labelledby="library-heading">
                <div className={styles.libraryHead}>
                  <h2 id="library-heading" className={styles.libraryTitle}>
                    {filter === FILTER_ALL ? "Latest Halloween reads" : `Halloween · ${filter}`}
                  </h2>
                  <p className={styles.libraryCount} role="status">
                    {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                  </p>
                </div>

                <ul className={styles.posterGrid}>
                  {gridPosts.map((post, idx) => {
                    const shouldInsertAd = (idx + 1) % 6 === 0;
                    return (
                      <li key={post.slug} className={styles.posterCell}>
                        <PosterCard post={post} />
                        {shouldInsertAd ? (
                          <div className={styles.adSlot}>
                            <p className={styles.adLabel}>Sponsor</p>
                            <AdUnit slot="1234567890" minHeight={220} />
                          </div>
                        ) : null}
                      </li>
                    );
                  })}
                </ul>
              </section>
            </>
          )}
        </div>
        <footer className={styles.journalFooter}>
          <PumpkinAccent />
          <p>Keep the lights low. <span>Keep the curiosity alive.</span></p>
          <Link href="/">Back to Ultimate Cineverse <span aria-hidden="true">↗</span></Link>
        </footer>
      </main>
    </div>
  );
}
