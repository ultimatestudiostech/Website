# Content briefs — 20 new posts (do not publish without review)

_Source: `/workspace/seo/seo-plan.md` §4 P1 + `keywords.csv` (US volumes, DataForSEO via OpenSEO, 21 Oct 2026). Create these as Sanity `post` documents; `/blog/[slug]` renders them automatically._

## Rules for every post
- `seoTitle` ≤ 60 characters. The site appends “ | Ultimate Cineverse” only when the total stays ≤ 60 (`lib/seo.ts resolveTitle`).
- `description` 140–155 characters, containing the target keyword.
- One H1 (the post title, rendered by the template). Use H2/H3 in the body only — never skip levels.
- Answer-first intro of 40–60 words (AI Overview / People Also Ask).
- Lists: table of picks with year, runtime and where to stream (verify availability on the publish date).
- 3–5 FAQs in the Sanity `faqs` field (they render visibly and emit FAQPage schema).
- `mainImage`/OG image 1200×630 with descriptive alt text.
- At least 3 internal links (suggested below) + link back from the related existing reviews.
- Streaming guides: update monthly and bump `dateModified`; put the month/year in the title.
- Reviews: only set a rating if the review actually scores the film (no rating is emitted otherwise).

## 1. `/blog/best-psychological-horror-movies`
- **Target keyword:** psychological horror movies — 201,000/mo, KD 7
- **SEO title (43 chars):** 30 Best Psychological Horror Movies, Ranked
- **H1:** The Best Psychological Horror Movies of All Time
- **Schema:** Article + ItemList (Movie)
- **Sections:**
  - What is psychological horror? (40–60 word answer)
  - Ranked list (30) with year, runtime, where to stream, 2-line blurb
  - A24 psychological horror picks
  - Where to stream them
  - FAQ
- **FAQ (PAA):**
  - What is the most disturbing psychological horror movie?
  - Is Shutter Island psychological horror?
  - What are good psychological horror movies on Netflix?
- **Internal links:** `/blog/a24-horror-movies-ranked`, `/blog/shutter-island-ending-explained`, `/blog/obsession-2026 review`

## 2. `/blog/best-halloween-movies`
- **Target keyword:** best halloween movies — 40,500/mo, KD 9
- **SEO title (41 chars):** 31 Best Halloween Movies to Watch in 2026
- **H1:** Best Halloween Movies for Every Kind of Viewer
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - Quick picks by mood
  - Classics
  - Family-friendly
  - Slashers
  - New for 2026
  - 31-night marathon plan
  - Where to stream
- **FAQ (PAA):**
  - What is the #1 Halloween movie?
  - What Halloween movies are good for kids?
  - What order should I watch the Halloween movies?
- **Internal links:** `/blog/halloween-movies-streaming-guide`, `/blog/best-slasher-movies`, `/blog/classic-horror-movies`

## 3. `/blog/best-horror-movies-on-netflix`
- **Target keyword:** best horror movies on netflix / scary movies on netflix — 40,500 + 40,500/mo, KD 7 / 9
- **SEO title (50 chars):** Best Horror Movies on Netflix Right Now (Oct 2026)
- **H1:** Best Horror Movies on Netflix Right Now
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - Updated-on date
  - New this month
  - Top picks with scare-level rating
  - Leaving soon
  - FAQ
- **FAQ (PAA):**
  - What is the scariest movie on Netflix right now?
  - Are there good psychological horror movies on Netflix?
  - What horror movies are leaving Netflix?
- **Internal links:** `/blog/new-horror-movies-streaming`, `/blog/best-horror-movies-on-prime-video`, `/blog/best-psychological-horror-movies`

## 4. `/blog/best-horror-movies-on-prime-video`
- **Target keyword:** amazon prime video horror movies — 33,100/mo, KD 0
- **SEO title (44 chars):** Best Horror Movies on Prime Video (Oct 2026)
- **H1:** Best Horror Movies on Prime Video Right Now
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - Free with Prime vs rent/buy
  - Top picks
  - New arrivals
  - FAQ
- **FAQ (PAA):**
  - What horror movies are free on Prime Video?
  - Is there a good scary movie on Prime right now?
  - Does Prime Video have A24 horror?
- **Internal links:** `/blog/best-horror-movies-on-netflix`, `/blog/best-movies-on-hulu`, `/blog/horror-movies-2026`

## 5. `/blog/best-movies-on-hulu`
- **Target keyword:** best movies on hulu — 33,100/mo, KD 1
- **SEO title (40 chars):** Best Movies on Hulu Right Now (Oct 2026)
- **H1:** The Best Movies on Hulu Right Now
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - By genre (horror, drama, comedy, thriller)
  - New arrivals this month
  - Leaving soon
  - FAQ
- **FAQ (PAA):**
  - What is the best movie on Hulu right now?
  - What's new on Hulu this month?
  - Are there good horror movies on Hulu?
- **Internal links:** `/blog/new-movies-streaming`, `/blog/best-horror-movies-on-netflix`, `/blog/halloween-movies-streaming-guide`

## 6. `/blog/halloween-movies-streaming-guide`
- **Target keyword:** halloween movies streaming — 27,100/mo, KD 8
- **SEO title (45 chars):** Where to Stream Halloween Movies (2026 Guide)
- **H1:** Where to Stream Halloween Movies in 2026
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - Table: movie × Netflix/Prime/Hulu/Max/Peacock/Tubi (free)
  - Free options
  - Family picks
  - FAQ
- **FAQ (PAA):**
  - Where can I watch Halloween movies for free?
  - Which streaming service has the most Halloween movies?
  - Where is Hocus Pocus streaming?
- **Internal links:** `/blog/best-halloween-movies`, `/blog/best-horror-movies-on-netflix`, `/blog/classic-horror-movies`

## 7. `/blog/new-horror-movies-streaming`
- **Target keyword:** new horror movies streaming — 18,100/mo, KD 7
- **SEO title (38 chars):** New Horror Movies Streaming This Month
- **H1:** New Horror Movies Streaming This Month
- **Schema:** Article + ItemList
- **Sections:**
  - Updated-on date
  - New by service
  - Our reviews: Obsession, The Last House, Backrooms, Frankenstein
  - Coming next month
- **FAQ (PAA):**
  - What new horror movies are streaming now?
  - What horror movies came out this month?
  - Where can I stream Backrooms?
- **Internal links:** `/blog/backrooms-2026-movie-review`, `/blog/frankenstein-2025-review`, `/blog/horror-movies-2026`

## 8. `/blog/new-movies-streaming`
- **Target keyword:** new movies streaming now / best new movies to stream — 40,500 + 40,500/mo, KD 15 / 19
- **SEO title (47 chars):** New Movies Streaming Now: Best Picks (Oct 2026)
- **H1:** New Movies Streaming Now
- **Schema:** Article + ItemList
- **Sections:**
  - Updated weekly
  - By service: Netflix, Prime, Hulu, Max, Disney+, Apple TV+
  - Our verdicts with links to reviews
  - FAQ
- **FAQ (PAA):**
  - What new movies are streaming this week?
  - What's the best new movie to stream?
  - Which new releases are on Netflix?
- **Internal links:** `/blog/best-movies-on-hulu`, `/blog/best-movies-of-2026`, `/blog/project-hail-mary review`

## 9. `/blog/best-found-footage-horror-movies`
- **Target keyword:** found footage horror movies — 33,100/mo, KD 6
- **SEO title (43 chars):** 25 Best Found Footage Horror Movies, Ranked
- **H1:** The Best Found Footage Horror Movies, Ranked
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - What is found footage?
  - Ranked list (25)
  - Where to stream
  - FAQ
- **FAQ (PAA):**
  - What was the first found footage horror movie?
  - Is Backrooms found footage?
  - What is the scariest found footage movie?
- **Internal links:** `/blog/backrooms-2026-movie-review`, `/blog/best-psychological-horror-movies`, `/blog/a24-horror-movies-ranked`

## 10. `/blog/a24-horror-movies-ranked`
- **Target keyword:** a24 horror movies — 22,200/mo, KD 14
- **SEO title (30 chars):** Every A24 Horror Movie, Ranked
- **H1:** Every A24 Horror Movie, Ranked
- **Schema:** Article + ItemList
- **Sections:**
  - Why A24 horror is different
  - Full ranked list with year/director
  - Where to stream
  - FAQ
- **FAQ (PAA):**
  - What is the scariest A24 movie?
  - How many horror movies has A24 made?
  - Where can I stream A24 horror?
- **Internal links:** `/blog/best-psychological-horror-movies`, `/blog/horror-movies-2026`, `/blog/best-found-footage-horror-movies`

## 11. `/blog/classic-horror-movies`
- **Target keyword:** classic horror movies — 40,500/mo, KD 24
- **SEO title (44 chars):** 40 Classic Horror Movies Everyone Should See
- **H1:** Classic Horror Movies Everyone Should See
- **Schema:** Article + ItemList
- **Sections:**
  - By decade: 1920s–1990s
  - Universal monsters
  - Where to stream
  - FAQ
- **FAQ (PAA):**
  - What is the oldest horror movie?
  - What are the best classic horror movies?
  - Is Frankenstein (1931) still worth watching?
- **Internal links:** `/blog/frankenstein-2025-review`, `/blog/best-halloween-movies`, `/blog/best-slasher-movies`

## 12. `/blog/best-slasher-movies`
- **Target keyword:** best slasher movies — 3,600/mo, KD 16
- **SEO title (39 chars):** Best Slasher Movies of All Time, Ranked
- **H1:** The Best Slasher Movies of All Time
- **Schema:** Article + ItemList
- **Sections:**
  - What makes a slasher
  - Ranked list
  - Franchise watch orders
  - FAQ
- **FAQ (PAA):**
  - What was the first slasher movie?
  - What is the best slasher franchise?
  - Are there new slasher movies in 2026?
- **Internal links:** `/blog/best-halloween-movies`, `/blog/classic-horror-movies`, `/blog/horror-movies-2026`

## 13. `/blog/horror-movies-2026`
- **Target keyword:** horror movies 2026 / best horror movies of 2026 — 90,500/mo, KD 30
- **SEO title (47 chars):** Horror Movies 2026: Release Dates & Best So Far
- **H1:** Horror Movies 2026: Release Calendar & Best So Far
- **Schema:** Article + ItemList + FAQPage
- **Sections:**
  - Release calendar (theatrical + streaming)
  - Best so far, ranked
  - Links to all 2026 horror reviews
  - FAQ
- **FAQ (PAA):**
  - What horror movies come out in 2026?
  - What is the best horror movie of 2026?
  - When does Backrooms release?
- **Internal links:** `/blog/backrooms-2026-movie-review`, `/blog/obsession-2026 review`, `/blog/the-last-house review`

## 14. `/blog/best-movies-of-2026`
- **Target keyword:** best movies of 2026 — 33,100/mo, KD 24
- **SEO title (36 chars):** Best Movies of 2026 (So Far), Ranked
- **H1:** The Best Movies of 2026 So Far
- **Schema:** Article + ItemList
- **Sections:**
  - Ranked list linking every 2026 review
  - By genre
  - Coming soon
  - FAQ
- **FAQ (PAA):**
  - What is the best movie of 2026 so far?
  - What movies are coming out later in 2026?
  - Is Project Hail Mary good?
- **Internal links:** `/blog/project-hail-mary review`, `/blog/the-odyssey-2026-movie-review`, `/blog/toy-story-5-2026-movie-review`

## 15. `/blog/the-housemaid-movie-review`
- **Target keyword:** the housemaid movie reviews — 27,100/mo, KD 2
- **SEO title (41 chars):** The Housemaid Review: Plot, Cast & Ending
- **H1:** The Housemaid Review: Plot, Cast & Ending
- **Schema:** Review (Movie) + FAQPage — rating only if scored
- **Sections:**
  - Spoiler-free verdict
  - Plot summary
  - Cast guide
  - Ending explained (spoiler-flagged)
  - Where to stream
  - FAQ
- **FAQ (PAA):**
  - Is The Housemaid worth watching?
  - Who is in the cast of The Housemaid?
  - Is The Housemaid based on a book?
- **Internal links:** `/blog/best-psychological-horror-movies`, `/blog/new-movies-streaming`, `/blog/best-movies-of-2026`

## 16. `/blog/wuthering-heights-movie-review`
- **Target keyword:** wuthering heights movie reviews — 8,100/mo, KD 0
- **SEO title (47 chars):** Wuthering Heights Review: Cast, Story & Verdict
- **H1:** Wuthering Heights Review: Cast, Story & Verdict
- **Schema:** Review (Movie) + FAQPage
- **Sections:**
  - Verdict
  - Story vs the novel
  - Cast guide
  - Where to stream
  - FAQ
- **FAQ (PAA):**
  - Is the new Wuthering Heights faithful to the book?
  - Who plays Heathcliff?
  - Is Wuthering Heights worth watching?
- **Internal links:** `/blog/best-movies-of-2026`, `/blog/new-movies-streaming`, `/blog/people-we-meet-on-vacation review`

## 17. `/blog/shutter-island-ending-explained`
- **Target keyword:** shutter island movie explained — 14,800/mo, KD 10
- **SEO title (31 chars):** Shutter Island Ending Explained
- **H1:** Shutter Island Ending Explained
- **Schema:** Article + FAQPage
- **Sections:**
  - Answer-first: what the ending means
  - Plot recap
  - The final line
  - Clues you missed
  - Theories
  - FAQ
- **FAQ (PAA):**
  - Was Teddy crazy the whole time?
  - What does the last line of Shutter Island mean?
  - Is Shutter Island based on a book?
- **Internal links:** `/blog/best-psychological-horror-movies`, `/blog/memento-explained`, `/blog/donnie-darko-explained`

## 18. `/blog/donnie-darko-explained`
- **Target keyword:** donnie darko movie explained — 14,800/mo, KD 11
- **SEO title (41 chars):** Donnie Darko Explained: Ending & Timeline
- **H1:** Donnie Darko Explained: Ending & Timeline
- **Schema:** Article + FAQPage
- **Sections:**
  - Answer-first summary
  - Tangent universe timeline
  - Who is Frank?
  - Ending explained
  - FAQ
- **FAQ (PAA):**
  - What happens at the end of Donnie Darko?
  - Who is Frank the rabbit?
  - Is there a director's cut difference?
- **Internal links:** `/blog/memento-explained`, `/blog/shutter-island-ending-explained`, `/blog/best-psychological-horror-movies`

## 19. `/blog/sinners-movie-explained`
- **Target keyword:** sinners movie explained — 9,900/mo, KD 12
- **SEO title (42 chars):** Sinners (2025) Explained: Ending & Meaning
- **H1:** Sinners (2025) Explained: Ending & Meaning
- **Schema:** Article + FAQPage
- **Sections:**
  - Answer-first summary
  - Plot recap
  - Ending & mid/post-credit scene
  - Themes & meaning
  - FAQ
- **FAQ (PAA):**
  - What does the ending of Sinners mean?
  - Is there a post-credits scene in Sinners?
  - What are the vampires in Sinners a metaphor for?
- **Internal links:** `/blog/horror-movies-2026`, `/blog/a24-horror-movies-ranked`, `/blog/best-movies-of-2026`

## 20. `/blog/memento-explained`
- **Target keyword:** memento movie explained — 6,600/mo, KD 6
- **SEO title (36 chars):** Memento Explained: Timeline & Ending
- **H1:** Memento Explained: Timeline & Ending
- **Schema:** Article + FAQPage
- **Sections:**
  - Answer-first summary
  - Chronological timeline
  - Colour vs black-and-white sequences
  - Ending explained
  - FAQ
- **FAQ (PAA):**
  - What really happened in Memento?
  - Who killed Leonard's wife?
  - How do you watch Memento in order?
- **Internal links:** `/blog/shutter-island-ending-explained`, `/blog/donnie-darko-explained`, `/blog/best-psychological-horror-movies`

## Existing post upgrades (edit in Sanity)
- `backrooms-2026-movie-review`: add H2 “Backrooms Ending Explained” + FAQ (backrooms movie explained, 22.2k/KD 0); fix H2→H4 skips (now auto-corrected in rendering, but fix the source); link to found-footage list.
- `project-hail-mary-2026-review-…`: seoTitle “Project Hail Mary (2026) Review: Plot, Cast & Ending”; add FAQ “Is Project Hail Mary worth watching?”; fix heading skips.
- `people-we-meet-on-vacation…`: fix heading skips.
- Obsession / The Last House / Frankenstein: add “Where to stream” box and links to psychological-horror, horror-2026, Netflix/Prime lists.
- Every review: add a “Cast guide” H2.
