import siteJson from "@/content/site.json";

export type SocialLink = {
  id: string;
  label: string;
  href: string;
};

export type BlogHubCopy = {
  title: string;
  heading: string;
  description: string;
  about: string[];
  ogImagePath?: string;
  ogImageWidth?: number;
  ogImageHeight?: number;
  ogImageAlt?: string;
};

/** Seasonal theme key for the blog hub — see lib/season.ts. */
export type SeasonKey = "halloween" | "thanksgiving" | "christmas" | "evergreen";

export type SiteContent = {
  brandName: string;
  tagline: string;
  seo: {
    defaultTitle: string;
    titleTemplate: string;
    defaultDescription: string;
    ogImagePath: string;
    homeDescription?: string;
  };
  contact: {
    phone: string;
    email: string;
    addressLines: string[];
  };
  socials: SocialLink[];
  blogHub: {
    evergreen: BlogHubCopy;
    seasonal?: Array<BlogHubCopy & { from: string; until: string; season?: SeasonKey }>;
  };
  about: {
    title: string;
    paragraphs: string[];
  };
  youtubeChannelId: string;
};

/** Bundled at build time — no runtime fs (Workers have no disk). */
export async function getSite(): Promise<SiteContent> {
  return siteJson as SiteContent;
}

/** Canonical origin. Empty env vars must not reach `new URL("")` (Vercel often sets blank). */
export function getSiteUrl() {
  const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim();
  if (fromEnv) return fromEnv.replace(/\/$/, "");

  const vercelHost =
    process.env.VERCEL_PROJECT_PRODUCTION_URL?.trim() || process.env.VERCEL_URL?.trim();
  if (vercelHost) {
    const host = vercelHost.replace(/\/$/, "");
    return host.startsWith("http") ? host : `https://${host}`;
  }

  return "https://ultimatecineverse.com";
}

const SEASON_KEYS: readonly SeasonKey[] = ["halloween", "thanksgiving", "christmas", "evergreen"];

/**
 * SEASON_OVERRIDE (server-only env, never NEXT_PUBLIC) forces a season so a
 * future season's hub can be previewed and smoke-tested out of season —
 * e.g. SEASON_OVERRIDE=christmas in November. Leave it unset in production.
 */
export function getSeasonOverride(): SeasonKey | null {
  const raw = process.env.SEASON_OVERRIDE?.trim().toLowerCase();
  return SEASON_KEYS.includes(raw as SeasonKey) ? (raw as SeasonKey) : null;
}

/** MM-DD window match, `until` exclusive; `from` after `until` wraps the year end (12-01 → 01-01). */
function inSeasonWindow(md: string, from: string, until: string) {
  return from <= until ? md >= from && md < until : md >= from || md < until;
}

/**
 * Blog hub copy + the active season key: a seasonal window wins, else
 * evergreen. The season key comes from the same windows, so copy, theme,
 * countdown and FAQs can never disagree (see lib/season.ts).
 */
export function getBlogHubCopy(
  site: SiteContent,
  now = new Date()
): BlogHubCopy & { seasonal: boolean; season: SeasonKey } {
  const override = getSeasonOverride();
  if (override === "evergreen") return { ...site.blogHub.evergreen, seasonal: false, season: "evergreen" };
  if (override) {
    const forced = site.blogHub.seasonal?.find((s) => s.season === override);
    if (forced) return { ...forced, seasonal: true, season: override };
  }
  const md = now.toISOString().slice(5, 10);
  const hit = site.blogHub.seasonal?.find((s) => inSeasonWindow(md, s.from, s.until));
  return hit
    ? { ...hit, seasonal: true, season: hit.season ?? "evergreen" }
    : { ...site.blogHub.evergreen, seasonal: false, season: "evergreen" };
}
