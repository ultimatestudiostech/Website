import type { SeasonKey } from "@/lib/season";
import styles from "./blog.module.css";

/**
 * Full-bleed hero backdrop — one cinematic landscape composition, recoloured
 * per season. The scene spans the entire hero behind the copy: a glowing
 * moon over layered hills, a lit cinema marquee in the middle distance,
 * seasonal foreground dressing in the corners, and a film strip running
 * along the hero's bottom edge as its base border. Pure inline SVG (no
 * image files), driven by the --blog-* variables so the data-season
 * palette keeps working. Decorative only: aria-hidden, motion respects
 * prefers-reduced-motion.
 */

const BULBS = Array.from({ length: 13 }, (_, i) => 848 + i * 28);
const HOLES = Array.from({ length: 40 }, (_, i) => 12 + i * 36);
const FRAMES = Array.from({ length: 10 }, (_, i) => 20 + i * 144);
const STARS = [
  { cx: 60, cy: 70, r: 2.2 },
  { cx: 150, cy: 150, r: 1.5 },
  { cx: 235, cy: 52, r: 1.8 },
  { cx: 330, cy: 120, r: 1.3 },
  { cx: 420, cy: 66, r: 2 },
  { cx: 505, cy: 168, r: 1.4 },
  { cx: 585, cy: 44, r: 1.6 },
  { cx: 660, cy: 128, r: 1.2 },
  { cx: 730, cy: 74, r: 1.9 },
  { cx: 812, cy: 176, r: 1.3 },
  { cx: 880, cy: 92, r: 1.5 },
  { cx: 952, cy: 40, r: 1.2 },
  { cx: 1010, cy: 300, r: 1.3 },
  { cx: 90, cy: 250, r: 1.3 },
  { cx: 560, cy: 262, r: 1.1 },
  { cx: 700, cy: 300, r: 1.2 },
  { cx: 1290, cy: 330, r: 1.4 },
  { cx: 1380, cy: 120, r: 1.8 },
  { cx: 1420, cy: 240, r: 1.3 }
];
const SNOW_DOTS = [
  { cx: 90, cy: 120, r: 2.6 },
  { cx: 210, cy: 300, r: 2 },
  { cx: 340, cy: 90, r: 2.3 },
  { cx: 470, cy: 210, r: 1.8 },
  { cx: 610, cy: 110, r: 2.5 },
  { cx: 690, cy: 330, r: 1.9 },
  { cx: 790, cy: 200, r: 2.2 },
  { cx: 905, cy: 130, r: 1.7 },
  { cx: 985, cy: 260, r: 2.4 },
  { cx: 1085, cy: 90, r: 1.8 },
  { cx: 1245, cy: 300, r: 2.1 },
  { cx: 1330, cy: 170, r: 2.4 },
  { cx: 1400, cy: 420, r: 1.9 },
  { cx: 180, cy: 470, r: 1.7 },
  { cx: 520, cy: 430, r: 1.6 },
  { cx: 1180, cy: 470, r: 1.6 }
];

function Pine({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={styles.artPine}>
      <path d="M0 -34 L9 -14 L4 -14 L12 2 L-12 2 L-4 -14 L-9 -14 Z" />
      <rect x="-1.6" y="2" width="3.2" height="5" />
    </g>
  );
}

function BareTree({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${s})`}
      className={styles.artTree}
      strokeWidth="3.4"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M0 0 C-1 -24 -2 -44 -5 -66" />
      <path d="M-4 -50 C-15 -58 -24 -61 -33 -70" />
      <path d="M-4 -57 C7 -65 13 -74 15 -85" />
      <path d="M-5 -66 C-13 -74 -15 -83 -16 -93" />
      <path d="M-5 -66 C3 -76 9 -81 18 -89" />
    </g>
  );
}

function Pumpkin({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="0" rx="17" ry="12" className={styles.artPumpkin} />
      <ellipse cx="0" cy="0" rx="9.5" ry="11.5" className={styles.artPumpkinShade} />
      <path d="M-1.5 -11 C-1 -14 1 -15.5 3 -16 L2 -10.5 Z" className={styles.artStem} />
    </g>
  );
}

function WheatStalk({ x, y, s, flip = false }: { x: number; y: number; s: number; flip?: boolean }) {
  return (
    <g
      transform={`translate(${x} ${y}) scale(${flip ? -s : s} ${s})`}
      className={styles.artWheat}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M0 0 C-1 -22 -2 -44 -4 -70" />
      <path d="M-3 -66 C-10 -68 -15 -74 -16 -82 C-8 -81 -3 -75 -3 -66 Z" />
      <path d="M-3 -66 C4 -68 9 -74 10 -82 C2 -81 -3 -75 -3 -66 Z" />
      <path d="M-2 -46 C-9 -48 -14 -54 -15 -62 C-7 -61 -2 -55 -2 -46 Z" />
      <path d="M-2 -46 C5 -48 10 -54 11 -62 C3 -61 -2 -55 -2 -46 Z" />
      <path d="M-1 -27 C-8 -29 -12 -34 -13 -42 C-6 -41 -1 -36 -1 -27 Z" />
      <path d="M-1 -27 C6 -29 10 -34 11 -42 C4 -41 -1 -36 -1 -27 Z" />
    </g>
  );
}

export function HeroArtwork({ season }: { season: SeasonKey }) {
  const christmas = season === "christmas";
  const thanksgiving = season === "thanksgiving";
  return (
    <div className={styles.heroArt} aria-hidden="true">
      <svg viewBox="0 0 1440 810" preserveAspectRatio="xMaxYMid slice" focusable="false">
        <defs>
          <linearGradient id="heroSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className={styles.artSkyStopA} />
            <stop offset="55%" className={styles.artSkyStopB} />
            <stop offset="100%" className={styles.artSkyStopC} />
          </linearGradient>
          <radialGradient id="heroMoonHalo" cx="50%" cy="50%" r="50%">
            <stop offset="0%" className={styles.artHaloStopA} />
            <stop offset="100%" className={styles.artHaloStopB} />
          </radialGradient>
          <radialGradient id="heroVignette" cx="50%" cy="42%" r="78%">
            <stop offset="60%" className={styles.artVinStopA} />
            <stop offset="100%" className={styles.artVinStopB} />
          </radialGradient>
        </defs>

        <rect x="0" y="0" width="1440" height="810" fill="url(#heroSkyGrad)" />

        {/* Stars + sparkles */}
        {STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} className={`${styles.artSparkle} ${i % 4 === 0 ? styles.artTwinkle : ""}`} />
        ))}
        <path d="M392 196 l2.6 6 6 2.6 -6 2.6 -2.6 6 -2.6 -6 -6 -2.6 6 -2.6 Z" className={styles.artSparkle} />
        <path d="M756 214 l2 4.6 4.6 2 -4.6 2 -2 4.6 -2 -4.6 -4.6 -2 4.6 -2 Z" className={styles.artSparkle} />
        <path d="M1332 262 l2.2 5.2 5.2 2.2 -5.2 2.2 -2.2 5.2 -2.2 -5.2 -5.2 -2.2 5.2 -2.2 Z" className={styles.artSparkle} />

        {/* Moon with halo, upper right */}
        <circle cx="1155" cy="185" r="225" fill="url(#heroMoonHalo)" />
        <circle cx="1155" cy="185" r="128" className={styles.artMoonGlow} />
        <circle cx="1155" cy="185" r="92" className={styles.artMoon} />
        <circle cx="1122" cy="160" r="15" className={styles.artMoonCrater} />
        <circle cx="1184" cy="212" r="11" className={styles.artMoonCrater} />
        <circle cx="1162" cy="140" r="8" className={styles.artMoonCrater} />
        <circle cx="1196" cy="168" r="6" className={styles.artMoonCrater} />

        {/* Back hill */}
        <path d="M0 470 C240 420 480 452 760 428 C1040 404 1240 438 1440 412 L1440 810 L0 810 Z" className={styles.artHillBack} />
        {christmas ? (
          <>
            <Pine x={150} y={452} s={2} />
            <Pine x={428} y={440} s={1.5} />
            <Pine x={1312} y={444} s={2.2} />
          </>
        ) : (
          <>
            <BareTree x={208} y={452} s={0.95} />
            <BareTree x={1340} y={450} s={1.2} />
          </>
        )}

        {/* Mid hill */}
        <path d="M0 566 C260 512 520 548 820 522 C1100 498 1280 532 1440 506 L1440 810 L0 810 Z" className={styles.artHillMid} />
        {christmas ? (
          <>
            <path d="M0 566 C260 512 520 548 820 522 C1100 498 1280 532 1440 506 L1440 522 C1280 548 1100 514 820 538 C520 564 260 528 0 582 Z" className={styles.artSnowCap} />
            <Pine x={64} y={548} s={2.1} />
            <Pine x={762} y={530} s={1.9} />
          </>
        ) : (
          <BareTree x={798} y={534} s={1.05} />
        )}

        {/* Light path from the marquee down to the foreground */}
        <path d="M1015 602 C962 652 902 692 824 764 L912 764 C954 702 992 652 1042 608 Z" className={styles.artPath} />

        {/* Cinema marquee in the middle distance, mid-right */}
        <ellipse cx="1015" cy="472" rx="285" ry="140" className={styles.artScreenGlow} />
        <ellipse cx="1015" cy="598" rx="215" ry="20" className={styles.artShadow} />
        <rect x="862" y="468" width="13" height="126" className={styles.artMarquee} />
        <rect x="1155" y="468" width="13" height="126" className={styles.artMarquee} />
        <rect x="838" y="330" width="354" height="150" rx="10" className={styles.artScreen} />
        <rect x="858" y="350" width="314" height="110" rx="6" className={styles.artScreenInner} />
        <rect x="818" y="292" width="394" height="34" rx="17" className={styles.artMarqueeBar} />
        {BULBS.map((cx, i) => (
          <circle key={cx} cx={cx} cy="309" r="5.4" className={i % 2 === 0 ? styles.artBulb : styles.artBulbAlt} />
        ))}
        {christmas ? (
          <>
            <path d="M846 494 Q1015 552 1184 494" className={styles.artLightWire} />
            {[872, 920, 968, 1015, 1062, 1110, 1158].map((cx, i) => (
              <circle
                key={cx}
                cx={cx}
                cy={502 + Math.sin(((cx - 846) / 338) * Math.PI) * 26}
                r="5"
                className={i % 3 === 0 ? styles.artBulb : i % 3 === 1 ? styles.artBulbAlt : styles.artBulbCool}
              />
            ))}
            <circle cx="1015" cy="405" r="25" className={styles.artWreath} />
            <circle cx="1015" cy="386" r="5" className={styles.artBerry} />
            <circle cx="998" cy="416" r="5" className={styles.artBerry} />
            <circle cx="1032" cy="416" r="5" className={styles.artBerry} />
          </>
        ) : null}

        {/* Front hill + foreground ground */}
        <path d="M0 676 C280 628 560 662 880 636 C1140 616 1300 646 1440 624 L1440 810 L0 810 Z" className={styles.artHillFront} />
        {christmas ? (
          <path d="M0 676 C280 628 560 662 880 636 C1140 616 1300 646 1440 624 L1440 642 C1300 664 1140 634 880 654 C560 680 280 646 0 694 Z" className={styles.artSnowCap} />
        ) : null}
        <path d="M0 744 C300 718 640 738 960 722 C1180 712 1320 728 1440 718 L1440 810 L0 810 Z" className={styles.artGround} />

        {/* Foreground corners */}
        {thanksgiving ? (
          <>
            <g opacity="0.75">
              <WheatStalk x={30} y={756} s={1.05} />
              <Pumpkin x={92} y={730} s={1.25} />
            </g>
            <ellipse cx="1312" cy="742" rx="120" ry="13" className={styles.artShadow} />
            <WheatStalk x={1204} y={762} s={1.35} />
            <Pumpkin x={1306} y={706} s={2.3} />
            <Pumpkin x={1376} y={724} s={1.5} />
            <Pumpkin x={1244} y={732} s={1.05} />
            <WheatStalk x={1422} y={764} s={1.5} flip />
          </>
        ) : null}
        {christmas ? (
          <>
            <ellipse cx="96" cy="748" rx="86" ry="12" className={styles.artSnowCap} />
            <Pine x={96} y={742} s={2} />
            <ellipse cx="1318" cy="750" rx="150" ry="14" className={styles.artSnowCap} />
            <Pine x={1246} y={744} s={2.4} />
            <Pine x={1340} y={750} s={3.2} />
            <Pine x={1412} y={752} s={2} />
          </>
        ) : null}

        {/* Atmosphere: drifting leaves / falling snow dots inside the scene */}
        {thanksgiving ? (
          <>
            <path d="M620 300 c6 8 6 14 0 20 c-6 -6 -6 -12 0 -20 Z" className={`${styles.artLeafFloat} ${styles.artFloatA}`} />
            <path d="M905 240 c6 8 6 14 0 20 c-6 -6 -6 -12 0 -20 Z" className={`${styles.artLeafFloat} ${styles.artFloatB}`} />
            <path d="M1240 380 c6 8 6 14 0 20 c-6 -6 -6 -12 0 -20 Z" className={`${styles.artLeafFloat} ${styles.artFloatC}`} />
            <path d="M420 420 c6 8 6 14 0 20 c-6 -6 -6 -12 0 -20 Z" className={`${styles.artLeafFloat} ${styles.artFloatB}`} />
            <path d="M1090 560 c6 8 6 14 0 20 c-6 -6 -6 -12 0 -20 Z" className={`${styles.artLeafFloat} ${styles.artFloatA}`} />
          </>
        ) : null}
        {christmas
          ? SNOW_DOTS.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} className={styles.artSnowDot} />)
          : null}

        {/* Cinematic vignette over the scene (film strip stays crisp above it) */}
        <rect x="0" y="0" width="1440" height="810" fill="url(#heroVignette)" />

        {/* Film strip along the hero's bottom edge — its base border */}
        <g>
          <rect x="0" y="764" width="1440" height="46" className={styles.artStrip} />
          {HOLES.map((x) => (
            <rect key={`t${x}`} x={x} y="768.5" width="16" height="7" rx="2" className={styles.artHole} />
          ))}
          {HOLES.map((x) => (
            <rect key={`b${x}`} x={x} y="798.5" width="16" height="7" rx="2" className={styles.artHole} />
          ))}
          {FRAMES.map((x) => (
            <rect key={x} x={x} y="780" width="118" height="17" rx="2.5" className={styles.artFrame} />
          ))}
        </g>
      </svg>
    </div>
  );
}
