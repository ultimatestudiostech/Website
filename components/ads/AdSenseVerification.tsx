import { getAdSenseClientId } from "@/lib/ads";

/**
 * AdSense ownership-verification snippet, rendered in the root <head> so
 * Google can verify the site. The loader script by itself displays no ads:
 * ad units exist only on /blog and stay gated behind ADS_ENABLED + consent.
 */
export function AdSenseVerification() {
  const client = getAdSenseClientId();
  if (!client) return null;
  return (
    <script
      async
      src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${client}`}
      crossOrigin="anonymous"
    />
  );
}
