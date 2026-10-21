import type { Metadata } from "next";
import { getSite, getSiteUrl } from "@/lib/cms/store";

type SeoArgs = {
  title: string;
  /** Use the title verbatim (no brand suffix). */
  absoluteTitle?: boolean;
  description: string;
  pathname?: string;
  canonicalQuery?: string;
  openGraphImageUrl?: string;
  type?: "website" | "article";
  publishedTime?: string;
  modifiedTime?: string;
  noIndex?: boolean;
};

export const MAX_TITLE_LENGTH = 60;
const BRAND_SUFFIX = " | Ultimate Cineverse";

/**
 * Final <title>: appends the brand suffix only when the result stays within
 * 60 characters and the title doesn't already contain the brand.
 */
export function resolveTitle(title: string, absolute = false): string {
  const clean = title.trim();
  if (absolute || /ultimate cineverse/i.test(clean)) return clean;
  const withBrand = `${clean}${BRAND_SUFFIX}`;
  return withBrand.length <= MAX_TITLE_LENGTH ? withBrand : clean;
}

export function getSiteUrlSync() {
  return getSiteUrl();
}

export async function buildMetadata(args: SeoArgs): Promise<Metadata> {
  const site = await getSite().catch(() => null);
  const siteUrl = getSiteUrl();
  const base = new URL(siteUrl);
  const canonical = args.pathname
    ? new URL(args.pathname + (args.canonicalQuery ?? ""), base)
    : base;

  const ogImage =
    args.openGraphImageUrl ||
    (site?.seo.ogImagePath ? new URL(site.seo.ogImagePath, base).toString() : undefined);

  const title = resolveTitle(args.title, args.absoluteTitle);

  const metadata: Metadata = {
    title: { absolute: title },
    description: args.description,
    alternates: {
      canonical: canonical.toString()
    },
    openGraph: {
      title,
      description: args.description,
      url: canonical.toString(),
      siteName: site?.brandName ?? "Ultimate Cineverse",
      type: args.type ?? "website",
      locale: "en_US",
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630, alt: title }] : undefined,
      ...(args.type === "article"
        ? {
            publishedTime: args.publishedTime,
            modifiedTime: args.modifiedTime
          }
        : {})
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: args.description,
      images: ogImage ? [ogImage] : undefined
    },
    robots: args.noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true }
  };

  return metadata;
}
