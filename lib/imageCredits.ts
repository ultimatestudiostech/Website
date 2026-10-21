/**
 * Image credit helpers for blog covers and inline images.
 * Credit data comes from Sanity image fields (credit, sourceUrl, license, imageType).
 */

export type ImageCredit = {
  credit?: string;
  sourceUrl?: string;
  license?: string;
  /** still | poster | press | stock | own | other */
  imageType?: string;
};

export type ResolvedCredit = {
  text: string;
  href?: string;
  /** true when derived from the studio fallback, not an explicit credit */
  derived: boolean;
};

/**
 * Studio / distributor per post, used ONLY for the "used for review/commentary" fallback.
 * Keep to high-confidence entries; unknown films stay out (and show no credit).
 * A post-level `studio` field in Sanity overrides this map.
 */
export const POST_STUDIOS: Record<string, string> = {
  "project-hail-mary-2026-review-a-journey-beyond-the-stars": "Amazon MGM Studios",
  "toy-story-5-2026-movie-review": "Disney/Pixar",
  "backrooms-2026-movie-review": "A24",
  "the-odyssey-2026-movie-review": "Universal Pictures",
  "mickey-17-2025-movie-review": "Warner Bros. Pictures",
  "frankenstein-2025-review": "Netflix",
  "people-we-meet-on-vacation-2026-review-love-and-friendship": "Netflix"
};

const FILM_IMAGE_TYPES = new Set(["still", "poster"]);

export function safeHttpUrl(url?: string): string | undefined {
  if (!url) return undefined;
  try {
    const u = new URL(url);
    return u.protocol === "https:" || u.protocol === "http:" ? u.toString() : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Explicit credit wins. Otherwise, for film stills/posters (or an untyped cover),
 * fall back to "Image: © Studio, used for review/commentary" when the studio is known.
 * Returns null when nothing reliable can be shown.
 */
export function resolveCredit(
  img: ImageCredit | undefined,
  opts: { studio?: string; isCover?: boolean }
): ResolvedCredit | null {
  const href = safeHttpUrl(img?.sourceUrl);
  const credit = img?.credit?.trim();
  if (credit) {
    const text = /^(image|photo|credit|©)/i.test(credit) ? credit : `Image: ${credit}`;
    return { text: img?.license ? `${text} (${img.license})` : text, href, derived: false };
  }
  const type = img?.imageType;
  const isFilmImage = type ? FILM_IMAGE_TYPES.has(type) : Boolean(opts.isCover);
  if (isFilmImage && opts.studio) {
    return { text: `Image: © ${opts.studio}, used for review/commentary`, href, derived: true };
  }
  return null;
}
