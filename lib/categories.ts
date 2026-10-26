import type { BlogPost } from "@/lib/blog";

export type Category = {
  slug: string;
  name: string;
  title: string;
  description: string;
  intro: string;
  match: (post: BlogPost) => boolean;
};

const has = (post: BlogPost, re: RegExp) =>
  post.tags.some((t) => re.test(t)) || re.test(post.title);

export const CATEGORIES: Category[] = [
  {
    slug: "horror",
    name: "Horror",
    title: "Horror Movie Reviews, Lists & Where to Stream",
    description:
      "Horror movie reviews, best-of lists and where to stream scary movies on Netflix, Prime Video, Hulu, Shudder and more, from Ultimate Cineverse.",
    intro:
      "Every horror review, ranked list and streaming guide on Ultimate Cineverse in one place, from psychological horror and found footage to new releases.",
    match: (p) => has(p, /horror|halloween|mummy|backrooms|resident evil|frankenstein|scary/i)
  },
  {
    slug: "streaming-guides",
    name: "Streaming Guides",
    title: "Streaming Guides: What to Watch on Netflix, Prime & Hulu",
    description:
      "Streaming guides from Ultimate Cineverse: what to watch on Netflix, Prime Video, Hulu, Max, Peacock and free services, updated as titles come and go.",
    intro:
      "Service-by-service guides to what is worth watching right now. Streaming catalogs change often, so each guide notes when it was last checked.",
    match: (p) => has(p, /streaming|netflix|prime video|hulu|where to (watch|stream)/i)
  },
  {
    slug: "reviews",
    name: "Movie Reviews",
    title: "Movie Reviews: New Films Rated & Explained",
    description:
      "Spoiler-light movie reviews of new releases from Ultimate Cineverse, with cast, story, themes, where to watch and a clear verdict.",
    intro:
      "Our full-length film reviews, newest first. Each one covers the story, cast and themes, and ends with a straight verdict.",
    match: (p) => /review/i.test(p.slug) || has(p, /review/i)
  }
];

export function getCategory(slug: string) {
  return CATEGORIES.find((c) => c.slug === slug);
}

export function categoriesFor(post: BlogPost) {
  return CATEGORIES.filter((c) => c.match(post));
}
