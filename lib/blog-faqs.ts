/**
 * Visible FAQs for the /blog index, one set per season.
 *
 * Single source of truth: the same copy is rendered on the page
 * (BlogIndex) and emitted as FAQPage JSON-LD (app/blog/page.tsx),
 * so the structured data always matches visible content. The active
 * set follows the season (lib/season.ts) — see getBlogFaqs below.
 */
import type { SeasonKey } from "@/lib/cms/store";

export type BlogFaqItem = { question: string; answer: string };

export const BLOG_FAQS: BlogFaqItem[] = [
  {
    question: "When is Thanksgiving 2026?",
    answer:
      "Thanksgiving in the United States falls on Thursday, November 26, 2026 — the fourth Thursday of November. That makes Thanksgiving weekend 2026 run from Thursday, November 26 through Sunday, November 29, the perfect window for a family movie marathon."
  },
  {
    question: "What are the best movies to watch on Thanksgiving?",
    answer:
      "The most-loved Thanksgiving movies mix family, food and a little chaos: Planes, Trains and Automobiles, Pieces of April, The Holdovers, Knives Out, Fantastic Mr. Fox and A Charlie Brown Thanksgiving. Our Thanksgiving guides on this blog break each pick down by mood, runtime and who should be in the room."
  },
  {
    question: "What is a good family movie for Thanksgiving Day?",
    answer:
      "For all ages around one screen, start with A Charlie Brown Thanksgiving, Fantastic Mr. Fox, Paddington 2 or Free Birds for younger kids, then move to The Holdovers or Little Women once the table clears. Every family guide here flags age fit, runtime and where the film is streaming."
  },
  {
    question: "What should we watch on Thanksgiving weekend?",
    answer:
      "Program the weekend like a menu: a parade-morning classic, a food film while dinner cooks (Ratatouille, The Hundred-Foot Journey or Julie & Julia), a big-hearted comedy after the feast, and one prestige new release for Friday night. The blog's Thanksgiving weekend watchlist is ordered exactly that way."
  },
  {
    question: "Are there movies actually set on Thanksgiving?",
    answer:
      "Yes — Pieces of April, The House of Yes, What's Cooking?, Home for the Holidays, Dutch and the Thanksgiving episodes woven into films like You've Got Mail all unfold over the holiday itself. They are rarer than Christmas films, which is exactly why we collect them in one place."
  },
  {
    question: "Where can I stream Thanksgiving movies?",
    answer:
      "Availability rotates every November across Netflix, Max, Disney+, Hulu, Peacock, Paramount+ and Prime Video. Each streaming guide on this blog is checked for the current season and links the film to the service carrying it, with a free or rental fallback where one exists."
  }
];

export const CHRISTMAS_FAQS: BlogFaqItem[] = [
  {
    question: "What are the best Christmas movies to watch?",
    answer:
      "The most-loved Christmas movies mix heart, humour and a little chaos: Home Alone, Elf, It's a Wonderful Life, Die Hard, The Holiday and Klaus. Our ranked guide to the best Christmas movies (/blog/best-christmas-movies) breaks each pick down by mood, runtime and who should be in the room."
  },
  {
    question: "What is a good family Christmas movie for kids?",
    answer:
      "For all ages around one screen, start with Klaus, The Polar Express, Arthur Christmas or The Muppet Christmas Carol for younger kids, then move to Home Alone or Elf once the wrapping paper settles. Every family guide here flags age fit, runtime and where the film is streaming."
  },
  {
    question: "Where can I stream Christmas movies?",
    answer:
      "Availability rotates every December across Netflix, Disney+, Hulu, Prime Video, Max and Peacock. Our Christmas movies streaming guide (/blog/christmas-movies-streaming) is checked for the current season and links each film to the service carrying it, with a free or rental fallback where one exists."
  },
  {
    question: "Are there Christmas horror movies?",
    answer:
      "Yes — Black Christmas (1974), Gremlins, Krampus, Anna and the Apocalypse and Terrifier 3 all set their scares over the holiday itself. Our Christmas horror coverage ranks them from playful to genuinely nasty, so you can pick your comfort level before you press play."
  },
  {
    question: "What new Christmas movies are coming in 2026?",
    answer:
      "The 2026 holiday slate mixes streaming originals with a handful of theatrical releases, and most titles are announced in the autumn. Our December release coverage tracks every confirmed date and service as the announcements land, so check back through November for the full list."
  },
  {
    question: "What should we watch on Christmas Eve and Christmas Day?",
    answer:
      "Program it like a menu: a family classic while the tree lights go on on Christmas Eve (The Muppet Christmas Carol or Klaus), one grown-up comedy after dinner (The Holiday or National Lampoon's Christmas Vacation), and the big comfort re-watch — It's a Wonderful Life or Home Alone — on Christmas Day itself, Friday, December 25, 2026."
  }
];

/** FAQ set for the active season — Christmas gets its own, everything else keeps the Thanksgiving set. */
export function getBlogFaqs(season: SeasonKey): BlogFaqItem[] {
  return season === "christmas" ? CHRISTMAS_FAQS : BLOG_FAQS;
}
