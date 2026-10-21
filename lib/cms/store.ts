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
    seasonal?: Array<BlogHubCopy & { from: string; until: string }>;
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

/** Blog hub copy: a seasonal window (MM-DD, `until` exclusive) wins, else evergreen. */
export function getBlogHubCopy(site: SiteContent, now = new Date()): BlogHubCopy & { seasonal: boolean } {
  const md = now.toISOString().slice(5, 10);
  const hit = site.blogHub.seasonal?.find((s) => md >= s.from && md < s.until);
  return hit ? { ...hit, seasonal: true } : { ...site.blogHub.evergreen, seasonal: false };
}
