import type { BlogPost } from "@/lib/blog";

export type Category = {
  slug: string;
  /** Short pill / breadcrumb label */
  name: string;
  /** H1 on the category page */
  h1: string;
  /** SEO <title> */
  title: string;
  description: string;
  intro: string;
};

export const CATEGORIES: Category[] = [
  {
    slug: "movie-reviews",
    name: "Movie Reviews",
    h1: "Movie Reviews",
    title: "Movie Reviews 2026: New Films Rated & Explained",
    description:
      "Honest, spoiler-light reviews of new movies in 2026, from Project Hail Mary and The Odyssey to Toy Story 5, with cast, story, themes and a clear verdict.",
    intro: "Full-length reviews of new releases outside horror: sci-fi, family, romance, thrillers and big studio epics."
  },
  {
    slug: "horror-movie-reviews",
    name: "Horror Reviews",
    h1: "New Horror Movie Reviews",
    title: "New Horror Movie Reviews (2025–2026): Verdicts & Endings",
    description:
      "Reviews of the newest horror movies of 2025 and 2026, including Backrooms, Obsession, Hokum, Resident Evil and The Mummy, with endings explained.",
    intro: "Reviews of recent horror releases, from studio franchise films to A24 and Shudder originals."
  },
  {
    slug: "horror-classics",
    name: "Classics & Endings",
    h1: "Horror Classics & Endings Explained",
    title: "Classic Horror Movie Reviews & Endings Explained",
    description:
      "Classic horror movie reviews and endings explained: The Exorcist, The Conjuring, Hereditary and Shutter Island, with cast, true stories and where to watch.",
    intro: "Deep dives on the modern and older classics, with endings and true stories explained."
  },
  {
    slug: "horror-movie-lists",
    name: "Horror Movie Lists",
    h1: "Best Horror Movie Lists",
    title: "Best Horror Movies Lists: Scariest, A24, Vampire & More",
    description:
      "Ranked horror movie lists: the scariest movies of all time, the best A24 horror, vampire movies, psychological horror, found footage and The Conjuring in order.",
    intro: "Ranked, fact-checked horror lists by subgenre, studio and franchise."
  },
  {
    slug: "where-to-stream",
    name: "Where to Stream",
    h1: "Where to Stream Horror Movies",
    title: "Where to Stream Horror Movies: Netflix, Hulu, Prime & More",
    description:
      "Where to stream horror movies right now: the best horror on Netflix, Hulu and Prime Video, new horror on streaming and Halloween movies, checked monthly.",
    intro: "Service-by-service streaming guides, each dated so you know when it was last checked."
  },
  {
    slug: "holiday-movies",
    name: "Holiday Movies",
    h1: "Holiday Movies: Halloween, Thanksgiving & Christmas",
    title: "Holiday Movies: Best Halloween, Thanksgiving & Christmas Films",
    description:
      "The best holiday movies by season: Halloween classics, Thanksgiving comedies and horror, and Christmas horror movies, with where to stream each one.",
    intro: "Seasonal watchlists for Halloween, Thanksgiving and Christmas."
  }
];

/**
 * Default primary/secondary categories by slug. A Sanity `primaryCategory` /
 * `secondaryCategories` value on the post overrides this map.
 */
const DEFAULTS: Record<string, [string, ...string[]]> = {
  "the-odyssey-2026-movie-review": ["movie-reviews"],
  "project-hail-mary-2026-review-a-journey-beyond-the-stars": ["movie-reviews"],
  "toy-story-5-2026-movie-review": ["movie-reviews"],
  "mickey-17-2025-movie-review": ["movie-reviews"],
  "the-breadwinner-2026-review": ["movie-reviews"],
  "the-sheep-detectives-review": ["movie-reviews"],
  "people-we-meet-on-vacation-2026-review-love-and-friendship": ["movie-reviews"],
  "voicemails-for-isabelle-review": ["movie-reviews"],
  "the-last-house-2026-review-trapped-isolated-and-surviving": ["movie-reviews"],
  "backrooms-2026-movie-review": ["horror-movie-reviews", "movie-reviews"],
  "buddy-2026-movie-review": ["horror-movie-reviews", "movie-reviews"],
  "frankenstein-2025-review": ["horror-movie-reviews", "movie-reviews"],
  "hokum-2026-review": ["horror-movie-reviews", "movie-reviews"],
  "lee-cronins-the-mummy-2026-review": ["horror-movie-reviews", "movie-reviews"],
  "obsession-2026-review-fulfill-your-wishes-but-at-what-cost": ["horror-movie-reviews", "movie-reviews"],
  "resident-evil-2026-review": ["horror-movie-reviews", "movie-reviews"],
  "the-exorcist-1973-review": ["horror-classics", "movie-reviews"],
  "the-conjuring-2013-review": ["horror-classics", "movie-reviews"],
  "hereditary-2018-review": ["horror-classics", "movie-reviews"],
  "shutter-island-ending-explained": ["horror-classics"],
  "scariest-movies-of-all-time": ["horror-movie-lists", "where-to-stream"],
  "a24-horror-movies": ["horror-movie-lists", "where-to-stream"],
  "best-psychological-horror-movies": ["horror-movie-lists", "where-to-stream"],
  "best-vampire-movies": ["horror-movie-lists"],
  "found-footage-horror-movies": ["horror-movie-lists", "where-to-stream"],
  "conjuring-movies-in-order": ["horror-movie-lists", "where-to-stream"],
  "best-horror-movies-on-netflix": ["where-to-stream", "horror-movie-lists"],
  "hulu-horror-movies": ["where-to-stream", "horror-movie-lists"],
  "prime-video-horror-movies": ["where-to-stream", "horror-movie-lists"],
  "new-horror-movies-streaming": ["where-to-stream"],
  "halloween-movies-streaming": ["where-to-stream", "holiday-movies"],
  "best-halloween-movies": ["holiday-movies", "horror-movie-lists"],
  "best-thanksgiving-movies": ["holiday-movies", "where-to-stream"],
  "thanksgiving-horror-movies": ["holiday-movies", "horror-movie-lists"],
  "christmas-horror-movies": ["holiday-movies", "horror-movie-lists"]
};

/** Old category URLs → new slugs (301s live in next.config.js). */
export const CATEGORY_REDIRECTS: Record<string, string> = {
  horror: "horror-movie-lists",
  reviews: "movie-reviews",
  "streaming-guides": "where-to-stream"
};

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

function guess(post: BlogPost): string {
  const t = `${post.slug} ${post.tags.join(" ")}`.toLowerCase();
  const horror = /horror|scary|haunt/.test(t);
  if (/halloween|thanksgiving|christmas/.test(t)) return "holiday-movies";
  if (/ending-explained/.test(post.slug)) return "horror-classics";
  if (/review/.test(t)) return horror ? "horror-movie-reviews" : "movie-reviews";
  if (/streaming|netflix|hulu|prime/.test(t)) return "where-to-stream";
  return horror ? "horror-movie-lists" : "movie-reviews";
}

/** Ordered category slugs for a post: primary first. Every post gets one. */
export function categorySlugsFor(post: BlogPost): string[] {
  const valid = (s?: string) => Boolean(s && getCategory(s));
  const primary = valid(post.primaryCategory) ? post.primaryCategory! : DEFAULTS[post.slug]?.[0] ?? guess(post);
  const secondary = (post.secondaryCategories?.length ? post.secondaryCategories : DEFAULTS[post.slug]?.slice(1)) ?? [];
  return [primary, ...secondary.filter((s) => valid(s) && s !== primary)];
}

export function categoriesFor(post: BlogPost): Category[] {
  return categorySlugsFor(post).map((s) => getCategory(s)!);
}

export function primaryCategoryFor(post: BlogPost): Category {
  return categoriesFor(post)[0];
}

/** Posts in a category: primary members first, then secondary. */
export function postsInCategory(posts: BlogPost[], slug: string): BlogPost[] {
  const primary = posts.filter((p) => categorySlugsFor(p)[0] === slug);
  const secondary = posts.filter((p) => categorySlugsFor(p).slice(1).includes(slug));
  return [...primary, ...secondary];
}
