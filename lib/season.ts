import { getBlogHubCopy, type SeasonKey, type SiteContent } from "@/lib/cms/store";

export type { SeasonKey };

/**
 * The single source of truth for "which season is the blog in?".
 *
 * The key is derived from the same seasonal windows in content/site.json
 * that drive the hub copy (getBlogHubCopy in lib/cms/store.ts), so the
 * hub title, hero theme, countdown and FAQ set always switch together:
 * halloween (Oct), thanksgiving (Nov), christmas (Dec), else evergreen.
 *
 * Preview override: set the server-only env SEASON_OVERRIDE to one of
 * halloween | thanksgiving | christmas | evergreen to force a season out
 * of season (e.g. smoke-testing the Christmas hub in November). It is read
 * in lib/cms/store.ts; leave it unset in production.
 */
export function getActiveSeason(site: SiteContent, now = new Date()): SeasonKey {
  return getBlogHubCopy(site, now).season;
}
