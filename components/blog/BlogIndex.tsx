"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useState, type ReactNode } from "react";
import { FallingLeaves, LeafSprig, WheatAccent } from "@/components/blog/ThanksgivingDetails";
import { ThanksgivingCountdown } from "@/components/blog/ThanksgivingCountdown";
import { HollyAccent, PineSprig, Snowfall } from "@/components/blog/ChristmasDetails";
import { ChristmasCountdown } from "@/components/blog/ChristmasCountdown";
import { HeroArtwork } from "@/components/blog/HeroArtwork";
import { GratitudeWall } from "@/components/blog/GratitudeWall";
import { AdUnit } from "@/components/ads/AdUnit";
import { ADS_ENABLED } from "@/lib/ads";
import { BLOG_FAQS, type BlogFaqItem } from "@/lib/blog-faqs";
import type { SeasonKey } from "@/lib/season";
import { getReadingMinutes, type BlogPost } from "@/lib/blog";
import { CATEGORIES, getCategory, primaryCategoryFor } from "@/lib/categories";
import styles from "./blog.module.css";


function yearOf(iso: string) {
  const y = new Date(iso).getFullYear();
  return Number.isNaN(y) ? "" : String(y);
}

function posterTone(slug: string) {
  let h = 0;
  for (let i = 0; i < slug.length; i++) h = (h + slug.charCodeAt(i) * (i + 1)) % 360;
  // Harvest palette: pumpkin, cranberry, gold, sage, warm bark
  const hue = [26, 12, 38, 74, 18, 32, 8][h % 7];
  return `linear-gradient(145deg, hsl(${hue} 52% 30%) 0%, hsl(${hue} 42% 13%) 55%, #17100b 100%)`;
}

function FeaturedCard({ post, accent, season }: { post: BlogPost; accent?: boolean; season: SeasonKey }) {
  const minutes = post.readingMinutes ?? getReadingMinutes(post.content);
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
        {season === "thanksgiving" ? (
          <LeafSprig className={styles.cardLeaf} />
        ) : season === "christmas" ? (
          <PineSprig className={styles.cardPine} />
        ) : null}
      </div>
      <div className={styles.featureCopy}>
        <p className={styles.featureEyebrow}>
          {primaryCategoryFor(post).name} · {minutes} min
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
  const minutes = post.readingMinutes ?? getReadingMinutes(post.content);
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

type Mood = { id: string; label: string; query: string; hint: string };

/** Watch moods per season — each one runs a real search over the library. */
const THANKSGIVING_MOODS: Mood[] = [
  { id: "family", label: "Whole family, one screen", query: "family", hint: "All-ages picks everyone can share" },
  { id: "classic", label: "Cozy & classic", query: "classic", hint: "Comfort films and beloved re-watches" },
  { id: "comedy", label: "Make us laugh", query: "comedy", hint: "Big laughs for after the feast" },
  { id: "food", label: "Food, glorious food", query: "food", hint: "Films to cook and feast along with" },
  { id: "drama", label: "A grateful heart", query: "drama", hint: "Warm, moving stories about family" },
  { id: "thanksgiving", label: "Set on Thanksgiving", query: "thanksgiving", hint: "Stories that unfold over the holiday" }
];

const CHRISTMAS_MOODS: Mood[] = [
  { id: "christmas", label: "Pure Christmas", query: "christmas", hint: "Stories set over the holiday itself" },
  { id: "family", label: "Whole family, one screen", query: "family", hint: "All-ages picks everyone can share" },
  { id: "classic", label: "Cozy & classic", query: "classic", hint: "Beloved re-watches and comfort films" },
  { id: "comedy", label: "Make us laugh", query: "comedy", hint: "Big laughs for the sofa" },
  { id: "horror", label: "A darker Christmas", query: "horror", hint: "Christmas horror, from Krampus to Black Christmas" },
  { id: "kids", label: "For the kids", query: "animation", hint: "Animated favourites for little viewers" }
];

const NEUTRAL_MOODS: Mood[] = [
  { id: "family", label: "Whole family, one screen", query: "family", hint: "All-ages picks everyone can share" },
  { id: "classic", label: "Cozy & classic", query: "classic", hint: "Comfort films and beloved re-watches" },
  { id: "comedy", label: "Make us laugh", query: "comedy", hint: "Big laughs for any night" },
  { id: "horror", label: "Something scarier", query: "horror", hint: "Horror picks and modern classics" },
  { id: "drama", label: "A moving story", query: "drama", hint: "Warm, moving stories about family" },
  { id: "reviews", label: "Latest reviews", query: "review", hint: "New verdicts from the review desk" }
];

/** Decorative hero copy per season — the keyword H1 itself comes from content/site.json. */
const HERO_COPY: Record<SeasonKey, { kicker: string; issue: string | null; sloganTop: string; sloganSpan: string; description: string; foot: string }> = {
  thanksgiving: {
    kicker: "The Thanksgiving edit",
    issue: "Thu · Nov 26, 2026",
    sloganTop: "Gather. Watch.",
    sloganSpan: "Give thanks.",
    description:
      "Thanksgiving movie guides, family film picks, and stories worth passing around the table — plus the reviews and streaming guides to plan your whole holiday weekend.",
    foot: "Family. Feasts. Films we return to."
  },
  christmas: {
    kicker: "The Christmas edit",
    issue: "Fri · Dec 25, 2026",
    sloganTop: "Gather. Watch.",
    sloganSpan: "Be merry.",
    description:
      "Christmas movie guides, family classics and holiday horror — plus the reviews and streaming guides to plan your whole festive season, from tree-trimming night to Christmas Day.",
    foot: "Classics. Cocoa. Films we return to."
  },
  halloween: {
    kicker: "The Halloween edit",
    issue: null,
    sloganTop: "Good films.",
    sloganSpan: "Honest guides.",
    description:
      "Film reviews, ending explainers, horror picks and streaming guides for Netflix, Prime Video and Hulu — fresh stories from the Ultimate Cineverse newsroom.",
    foot: "Reviews. Explainers. Films we return to."
  },
  evergreen: {
    kicker: "The blog edit",
    issue: null,
    sloganTop: "Good films.",
    sloganSpan: "Honest guides.",
    description:
      "Film reviews, ending explainers, horror picks and streaming guides for Netflix, Prime Video and Hulu — fresh stories from the Ultimate Cineverse newsroom.",
    foot: "Reviews. Explainers. Films we return to."
  }
};

/** Watch-picker copy per season (halloween/evergreen share the neutral set). */
const PICKER_COPY: Record<SeasonKey, { kicker: string; title: string; copy: string; groupLabel: string; moods: Mood[] }> = {
  thanksgiving: {
    kicker: "The Thanksgiving watch picker",
    title: "Who’s at your table tonight?",
    copy: "Pick a mood — we’ll set the table with matching stories from the library.",
    groupLabel: "Choose a Thanksgiving watch mood",
    moods: THANKSGIVING_MOODS
  },
  christmas: {
    kicker: "The Christmas watch picker",
    title: "Who’s on your sofa tonight?",
    copy: "Pick a mood — we’ll wrap up matching stories from the library.",
    groupLabel: "Choose a Christmas watch mood",
    moods: CHRISTMAS_MOODS
  },
  halloween: {
    kicker: "The watch picker",
    title: "Who’s watching tonight?",
    copy: "Pick a mood — we’ll find matching stories from the library.",
    groupLabel: "Choose a watch mood",
    moods: NEUTRAL_MOODS
  },
  evergreen: {
    kicker: "The watch picker",
    title: "Who’s watching tonight?",
    copy: "Pick a mood — we’ll find matching stories from the library.",
    groupLabel: "Choose a watch mood",
    moods: NEUTRAL_MOODS
  }
};

const CHRISTMAS_SEED_NOTES = [
  "Grateful for the same films, every December.",
  "Thankful for one more movie night with family.",
  "Grateful for warm rooms and cold nights outside."
];

export function BlogIndex({
  posts,
  initialQuery = "",
  heading = "Film reviews & streaming guides",
  intro,
  activeCategory,
  hubExtras = false,
  season = "thanksgiving",
  faqs = BLOG_FAQS
}: {
  /** Category slug when rendered on /blog/category/[slug]. */
  activeCategory?: string;
  intro?: ReactNode;
  posts: BlogPost[];
  initialQuery?: string;
  /** Keyword H1 for the hub (from content/site.json blogHub). */
  heading?: string;
  /** Seasonal hub-only sections (watch picker, gratitude wall, FAQ) — set only on /blog. */
  hubExtras?: boolean;
  /** Active season (lib/season.ts) — drives the hero theme, picker, wall and FAQ copy. */
  season?: SeasonKey;
  /** FAQ set for the active season (lib/blog-faqs.ts) — same array as the page's FAQPage schema. */
  faqs?: BlogFaqItem[];
}) {
  const activeCat = activeCategory ? getCategory(activeCategory) : undefined;
  const [query, setQuery] = useState(initialQuery);
  const [mood, setMood] = useState<Mood | null>(null);

  // Listing pages are statically rendered (ISR), so a ?q= search term is
  // applied client-side on mount instead of via server searchParams.
  useEffect(() => {
    if (initialQuery) return;
    const q = new URLSearchParams(window.location.search).get("q");
    if (q?.trim()) setQuery(q.trim());
  }, [initialQuery]);

  const pickMood = (m: Mood) => {
    setMood(m);
    setQuery(m.query);
    document.getElementById("library")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return posts.filter((p) => {
      if (!q) return true;
      const hay = `${p.title} ${p.description} ${p.tags.join(" ")}`.toLowerCase();
      return hay.includes(q);
    });
  }, [posts, query]);

  const featured = filtered.length > 2 ? filtered.slice(0, 2) : [];
  const gridPosts = filtered.slice(featured.length);
  const blogLabel = posts.length === 1 ? "story to gather around" : "stories to gather around";
  const hero = HERO_COPY[season];
  const pickerCopy = PICKER_COPY[season];

  return (
    <div className={styles.page} data-season={season}>
      <div className={styles.atmosphere} aria-hidden="true" />
      <main className={styles.shell}>
        <header className={styles.seasonHero}>
          <HeroArtwork season={season} />
          <div className={styles.heroScrim} aria-hidden="true" />
          {season === "thanksgiving" ? (
            <FallingLeaves />
          ) : season === "christmas" ? (
            <Snowfall />
          ) : null}
          <div className={styles.seasonMasthead}>
            <p className={styles.brandKicker}>Ultimate Cineverse / {hero.kicker}</p>
            {hero.issue ? (
              <span className={styles.seasonIssue} aria-hidden="true">{hero.issue}</span>
            ) : null}
          </div>
          <div className={styles.seasonIntro}>
            <h1 className={styles.seasonOverline}><span aria-hidden="true">✦</span> {heading}</h1>
            <p className={styles.seasonTitle} aria-hidden="true">{hero.sloganTop}<br /><span>{hero.sloganSpan}</span></p>
            <p className={styles.seasonDescription}>{hero.description}</p>
            <div className={styles.heroActions}>
              <a href={hubExtras ? "#picker" : "#library"} className={styles.seasonCta}>
                Find tonight&rsquo;s film <span aria-hidden="true">↓</span>
              </a>
              {season === "thanksgiving" ? (
                <ThanksgivingCountdown />
              ) : season === "christmas" ? (
                <ChristmasCountdown />
              ) : null}
            </div>
          </div>
          <div className={styles.seasonFoot}>
            <span>{hero.foot}</span>
            <span>{posts.length} {blogLabel}</span>
          </div>
        </header>
        {intro}

        {hubExtras ? (
          <section id="picker" className={styles.picker} aria-labelledby="picker-heading">
            <p className={styles.brandKicker}>{pickerCopy.kicker}</p>
            <h2 id="picker-heading" className={styles.pickerTitle}>{pickerCopy.title}</h2>
            <p className={styles.pickerCopy}>{pickerCopy.copy}</p>
            <div className={styles.pickerGrid} role="group" aria-label={pickerCopy.groupLabel}>
              {pickerCopy.moods.map((m) => (
                <button
                  key={m.id}
                  type="button"
                  className={`${styles.moodCard} ${mood?.id === m.id ? styles.moodCardActive : ""}`}
                  aria-pressed={mood?.id === m.id}
                  onClick={() => pickMood(m)}
                >
                  <span className={styles.moodLabel}>{m.label}</span>
                  <span className={styles.moodHint}>{m.hint}</span>
                </button>
              ))}
            </div>
            {mood ? (
              <p className={styles.pickerNote} role="status">
                Showing <strong>{mood.label.toLowerCase()}</strong> picks below —{" "}
                <button type="button" className={styles.clearSearch} onClick={() => { setMood(null); setQuery(""); }}>
                  clear the picker
                </button>
              </p>
            ) : null}
          </section>
        ) : null}

        <div className={styles.browseBar}>
          <div>
            <p className={styles.brandKicker}>The reading room</p>
            <h2 className={styles.browseTitle}>Stories to pass around.</h2>
          </div>
          <label className={styles.blogSearch}>
            <span>Search the stories</span>
            <input
              type="search"
              value={query}
              onChange={(event) => { setQuery(event.target.value); setMood(null); }}
              placeholder="A film, a mood, a story…"
              aria-controls="library"
            />
          </label>
        </div>

        <nav id="topics" className={styles.filterRow} aria-label="Blog categories">
          <Link
            href="/blog#topics"
            aria-current={activeCat ? undefined : "page"}
            className={`${styles.filterPill} ${activeCat ? "" : styles.filterPillActive}`}
          >
            All stories
          </Link>
          {CATEGORIES.map((c) => (
            <Link
              key={c.slug}
              href={`/blog/category/${c.slug}#topics`}
              aria-current={activeCat?.slug === c.slug ? "page" : undefined}
              className={`${styles.filterPill} ${activeCat?.slug === c.slug ? styles.filterPillActive : ""}`}
            >
              {c.name}
            </Link>
          ))}
        </nav>

        {query ? (
          <p className={styles.searchNote} role="status">
            Showing results for <strong>“{query}”</strong>
            {" · "}
            <button type="button" className={styles.clearSearch} onClick={() => { setQuery(""); setMood(null); }}>
              Clear
            </button>
          </p>
        ) : null}

        <div id="library" className={styles.storyResults}>
          {posts.length === 0 ? (
            <div className={styles.empty} role="status">
              <h2>The next story is on its way home</h2>
              <p>
                {season === "christmas"
                  ? "Check back for new film stories and Christmas reads."
                  : season === "thanksgiving"
                    ? "Check back for new film stories and Thanksgiving reads."
                    : "Check back for new film stories and fresh reads."}
              </p>
            </div>
          ) : filtered.length === 0 ? (
            <div className={styles.empty} role="status">
              <h2>
                {season === "christmas"
                  ? "No matches under this tree"
                  : season === "thanksgiving"
                    ? "No matches at this table"
                    : "No matches in the library"}
              </h2>
              <p>Try another search or clear the filter — there is always room for one more story.</p>
              <button
                type="button"
                className={styles.resetSearch}
                onClick={() => {
                  setQuery("");
                  setMood(null);
                }}
              >
                Show all stories
              </button>
            </div>
          ) : (
            <>
              {featured.length > 0 ? (
                <section
                  id="featured"
                  className={styles.featured}
                  aria-label={
                    season === "christmas"
                      ? "Featured Christmas reads"
                      : season === "thanksgiving"
                        ? "Featured Thanksgiving reads"
                        : "Featured reads"
                  }
                >
                  {featured.map((post, i) => (
                    <FeaturedCard key={post.slug} post={post} accent={i === 1} season={season} />
                  ))}
                </section>
              ) : null}

              <section className={styles.library} aria-labelledby="library-heading">
                <div className={styles.libraryHead}>
                  <h2 id="library-heading" className={styles.libraryTitle}>
                    {activeCat ? activeCat.h1 : "Latest stories"}
                  </h2>
                  <p className={styles.libraryCount} role="status">
                    {filtered.length} {filtered.length === 1 ? "post" : "posts"}
                  </p>
                </div>

                <ul className={styles.posterGrid}>
                  {gridPosts.map((post, idx) => {
                    const shouldInsertAd = ADS_ENABLED && (idx + 1) % 6 === 0;
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

        {hubExtras ? (
          <>
            {season === "christmas" ? (
              <GratitudeWall
                kicker="The Christmas wall"
                title="One good wish, before the film starts."
                label="This Christmas, I am grateful for…"
                placeholder="a film, a person, a quiet night in…"
                savedMessage="Pinned. Merry Christmas."
                storageKey="uc-gratitude-note-christmas"
                seedNotes={CHRISTMAS_SEED_NOTES}
              />
            ) : season === "thanksgiving" ? (
              <GratitudeWall />
            ) : (
              <GratitudeWall savedMessage="Pinned. Thank you." />
            )}

            <section className={styles.faqSection} aria-labelledby="faq-heading">
              <p className={styles.brandKicker}>
                {season === "christmas"
                  ? "Christmas watching, answered"
                  : season === "thanksgiving"
                    ? "Thanksgiving watching, answered"
                    : "Watching, answered"}
              </p>
              <h2 id="faq-heading" className={styles.faqTitle}>
                {season === "christmas"
                  ? "Questions every sofa asks"
                  : season === "thanksgiving"
                    ? "Questions every table asks"
                    : "Questions readers ask"}
              </h2>
              <div className={styles.faqGrid}>
                {faqs.map((faq) => (
                  <details key={faq.question} className={styles.faqCard}>
                    <summary>{faq.question}</summary>
                    <p>{faq.answer}</p>
                  </details>
                ))}
              </div>
              {season === "christmas" ? (
                <p className={styles.faqMore}>
                  Planning the whole season? Start with our{" "}
                  <Link href="/blog/best-christmas-movies">best Christmas movies</Link>, check{" "}
                  <Link href="/blog/christmas-movies-streaming">where they stream</Link>, browse{" "}
                  <Link href="/blog#topics">all topics</Link>, or learn more{" "}
                  <Link href="/about">about Ultimate Cineverse</Link>.
                </p>
              ) : season === "thanksgiving" ? (
                <p className={styles.faqMore}>
                  Planning the whole weekend? Start with our{" "}
                  <Link href="/blog?q=thanksgiving">Thanksgiving stories</Link>, browse{" "}
                  <Link href="/blog#topics">all topics</Link>, or learn more{" "}
                  <Link href="/about">about Ultimate Cineverse</Link>.
                </p>
              ) : (
                <p className={styles.faqMore}>
                  Looking for more? Browse <Link href="/blog#topics">all topics</Link>, search the
                  library above, or learn more <Link href="/about">about Ultimate Cineverse</Link>.
                </p>
              )}
            </section>
          </>
        ) : null}

        <footer className={styles.journalFooter}>
          {season === "christmas" ? (
            <>
              <HollyAccent />
              <p>Come cozy. <span>Leave merry.</span></p>
            </>
          ) : season === "thanksgiving" ? (
            <>
              <WheatAccent />
              <p>Come hungry. <span>Leave grateful.</span></p>
            </>
          ) : (
            <p>Good films. <span>Honest guides.</span></p>
          )}
          <Link href="/">Back to Ultimate Cineverse <span aria-hidden="true">↗</span></Link>
        </footer>
      </main>
    </div>
  );
}
