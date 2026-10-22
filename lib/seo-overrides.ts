/**
 * Code-side SEO title/description overrides for blog posts, keyed by slug.
 * Driven by Google Search Console data (pages with impressions but 0 clicks).
 * Takes precedence over Sanity `seoTitle` / `description` without editing CMS content.
 */
export const postSeoOverrides: Record<string, { title?: string; description?: string }> = {
  // GSC: 57 impressions, avg pos 7.9, 0 clicks (Sep–Oct 2026). Query seen: "the breadwinner 2026 cast".
  "the-breadwinner-2026-review": {
    title: "The Breadwinner (2026) Review: Cast, Where to Watch & Verdict",
    description:
      "The Breadwinner (2026) review: Nate Bargatze's family comedy, the full cast, where to watch it, what works, what doesn't, and whether it's worth your time."
  },
  // GSC: 6 impressions, avg pos 9.5, 0 clicks. Query seen: "monster frankenstein 2025".
  "frankenstein-2025-review": {
    title: "Frankenstein (2025) Review: Del Toro's Monster, Cast & Verdict",
    description:
      "Guillermo del Toro's Frankenstein (2025) review: Oscar Isaac's Victor, Jacob Elordi's creature, what works, what doesn't, and if the Netflix film is worth it."
  },
  // GSC: 4 impressions, avg pos 18.5, 0 clicks.
  "voicemails-for-isabelle-review": {
    title: "Voicemails for Isabelle (2026) Review: Cast & Verdict"
  },
  // GSC query seen: "the people we meet on vacation common sense media" (pos 11).
  "people-we-meet-on-vacation-2026-review-love-and-friendship": {
    title: "People We Meet on Vacation (2026) Review: Cast & Verdict",
    description:
      "People We Meet on Vacation (2026) review: Emily Bader and Tom Blyth's chemistry, the friends-to-lovers story, main cast, Netflix release, rating and verdict."
  }
};
