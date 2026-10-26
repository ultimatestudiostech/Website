/**
 * Code-side SEO title/description overrides for blog posts, keyed by slug.
 * Driven by Google Search Console data (pages with impressions but 0 clicks).
 * Takes precedence over Sanity `seoTitle` / `description` without editing CMS content.
 */
export const postSeoOverrides: Record<string, { title?: string; description?: string }> = {
  // 26 Oct 2026: previous overrides moved into Sanity seoTitle/description (see /workspace/seo/patch_seo_1026.py).
};
