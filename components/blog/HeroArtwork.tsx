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
  { cx: 1180, cy: 470, r: 1.6 },
  { cx: 150, cy: 200, r: 2.2 },
  { cx: 420, cy: 330, r: 1.8 },
  { cx: 560, cy: 60, r: 2.1 },
  { cx: 760, cy: 380, r: 1.7 },
  { cx: 880, cy: 60, r: 2 },
  { cx: 1040, cy: 350, r: 1.8 },
  { cx: 1260, cy: 120, r: 2.2 },
  { cx: 1360, cy: 520, r: 1.7 },
  { cx: 260, cy: 560, r: 1.9 },
  { cx: 640, cy: 540, r: 1.6 }
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

function SleighRide() {
  return (
    <g transform="translate(1155 172) rotate(-4)" className={styles.artSleigh} opacity="0.92">
      {/* Reins */}
      <path d="M-58 -12 C0 -20 44 -26 84 -30" stroke="currentColor" strokeWidth="1.6" fill="none" opacity="0.75" />
      <path d="M112 -32 C128 -34 140 -35 152 -36" stroke="currentColor" strokeWidth="1.4" fill="none" opacity="0.75" />
      {/* Lead reindeer */}
      <g transform="translate(196 -38) scale(0.82)">
        <ellipse cx="0" cy="0" rx="27" ry="12.5" />
        <path d="M15 -7 L33 -21 L41 -16 L27 3 L16 2 Z" />
        <ellipse cx="40" cy="-19" rx="10.5" ry="5.8" transform="rotate(-18 40 -19)" />
        <path d="M35 -24 C33 -33 29 -38 24 -43 M35 -24 C39 -32 44 -35 50 -38 M28 -34 C25 -36 22 -36 19 -35 M43 -30 C46 -32 49 -32 52 -31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M14 8 L27 18 L36 15 M7 10 L15 22 L24 21 M-15 8 L-28 15 L-37 10 M-9 10 L-17 22 L-26 19" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        <path d="M-26 -8 L-34 -13 L-30 -3 Z" />
      </g>
      {/* Second reindeer */}
      <g transform="translate(128 -30)">
        <ellipse cx="0" cy="0" rx="27" ry="12.5" />
        <path d="M15 -7 L33 -21 L41 -16 L27 3 L16 2 Z" />
        <ellipse cx="40" cy="-19" rx="10.5" ry="5.8" transform="rotate(-18 40 -19)" />
        <path d="M35 -24 C33 -33 29 -38 24 -43 M35 -24 C39 -32 44 -35 50 -38 M28 -34 C25 -36 22 -36 19 -35 M43 -30 C46 -32 49 -32 52 -31" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
        <path d="M14 8 L27 18 L36 15 M7 10 L15 22 L24 21 M-15 8 L-28 15 L-37 10 M-9 10 L-17 22 L-26 19" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        <path d="M-26 -8 L-34 -13 L-30 -3 Z" />
      </g>
      {/* Sleigh + Santa + toy sack */}
      <g transform="translate(-88 0)">
        <ellipse cx="-32" cy="-16" rx="11" ry="13" transform="rotate(-14 -32 -16)" />
        <path d="M-42 8 C-47 -8 -32 -18 -12 -17 L30 -13 C43 -12 48 -4 43 5 L36 14 L-32 14 Z" />
        <path d="M43 5 C54 1 56 -9 49 -16" stroke="currentColor" strokeWidth="3.4" strokeLinecap="round" fill="none" />
        <path d="M-48 22 L52 22 M52 22 C63 22 65 13 58 8" stroke="currentColor" strokeWidth="3" strokeLinecap="round" fill="none" />
        <path d="M-24 -16 C-25 -26 -16 -31 -9 -29 L4 -25 C10 -23 11 -17 7 -13 L4 2 L-20 2 Z" />
        <circle cx="-8" cy="-36" r="7.5" />
        <path d="M-16 -39 L1 -41 L-4 -30 Z" />
        <rect x="-16.5" y="-40.5" width="17" height="3.4" rx="1.7" transform="rotate(-4 -8 -38)" />
        <circle cx="1.5" cy="-41" r="2.6" />
      </g>
    </g>
  );
}

function Snowman({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="21" ry="4.5" className={styles.artShadow} />
      <circle cx="0" cy="-15" r="17" className={styles.artSnowman} />
      <circle cx="0" cy="-42" r="12.5" className={styles.artSnowman} />
      <circle cx="0" cy="-63" r="9.5" className={styles.artSnowman} />
      <path d="M-11 -44 C-20 -52 -27 -54 -34 -60 M11 -44 C19 -50 25 -51 31 -57" className={styles.artStickArm} />
      <path d="M-10 -52 C-4 -49 4 -49 10 -52 L9 -45 C3 -43 -3 -43 -9 -45 Z" className={styles.artScarf} />
      <path d="M5 -46 L11 -46 L10 -32 L4 -33 Z" className={styles.artScarf} />
      <circle cx="-3.2" cy="-65" r="1.5" className={styles.artCoal} />
      <circle cx="3.2" cy="-65" r="1.5" className={styles.artCoal} />
      <path d="M0 -62 L11 -59.5 L0 -57.5 Z" className={styles.artCarrot} />
      <circle cx="0" cy="-44" r="1.7" className={styles.artCoal} />
      <circle cx="0" cy="-36" r="1.7" className={styles.artCoal} />
      <circle cx="0" cy="-24" r="1.7" className={styles.artCoal} />
      <path d="M-9.5 -68 L9 -70.5 L3 -79 L-4 -79.5 Z" className={styles.artScarf} />
      <rect x="-10.5" y="-69.5" width="20" height="3.6" rx="1.8" className={styles.artSnowman} />
      <circle cx="3.5" cy="-80" r="2.8" className={styles.artSnowman} />
    </g>
  );
}

function Rudolph({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <ellipse cx="0" cy="2" rx="30" ry="4.5" className={styles.artShadow} />
      <path d="M-14 -34 L-16 -2 M14 -34 L13 -2 M-20 -32 L-24 -2 M20 -32 L24 -2" stroke="#54331c" strokeWidth="4.6" strokeLinecap="round" fill="none" />
      <ellipse cx="0" cy="-38" rx="27" ry="14.5" className={styles.artDeer} />
      <ellipse cx="2" cy="-33" rx="17" ry="8.5" className={styles.artDeerBelly} opacity="0.65" />
      <path d="M24 -6 L31 -2 L25 -1 Z" transform="translate(-52 -38)" className={styles.artDeerDark} />
      <path d="M-20 -46 L-33 -62 L-25 -66 L-14 -52 Z" className={styles.artDeer} />
      <ellipse cx="-33" cy="-64" rx="11" ry="6.4" transform="rotate(24 -33 -64)" className={styles.artDeer} />
      <ellipse cx="-40" cy="-59" rx="5.4" ry="4" transform="rotate(24 -40 -59)" className={styles.artDeerBelly} />
      <circle cx="-44" cy="-57" r="8" className={styles.artNoseGlow} />
      <circle cx="-44" cy="-57" r="3.4" className={styles.artNose} />
      <circle cx="-30" cy="-67" r="1.7" className={styles.artCoal} />
      <path d="M-26 -70 C-27 -78 -31 -83 -36 -87 M-26 -70 C-22 -77 -17 -80 -11 -82 M-31 -78 C-34 -79 -37 -79 -39 -78 M-18 -76 C-15 -78 -12 -78 -9 -77" className={styles.artDeerDark} stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
      <path d="M-24 -52 C-18 -49 -13 -48 -8 -49 L-9 -43 C-15 -42 -20 -44 -25 -47 Z" className={styles.artScarf} />
      <circle cx="-11" cy="-41" r="2.6" className={styles.artBulb} />
    </g>
  );
}

function ChristmasTree({ x, y, s }: { x: number; y: number; s: number }) {
  const ornaments: Array<[number, number, string]> = [
    [-5, -22, styles.artBulbAlt], [4, -17, styles.artBulbCool], [-2, -11, styles.artBulb],
    [7, -25, styles.artBulb], [-8, -15, styles.artBulbCool], [3, -4, styles.artBulbAlt],
    [-6, -3, styles.artBulb], [0, -28, styles.artBulbAlt], [9, -8, styles.artBulbCool]
  ];
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <path d="M0 -34 L9 -14 L4 -14 L12 2 L-12 2 L-4 -14 L-9 -14 Z" className={styles.artPine} />
      <rect x="-1.6" y="2" width="3.2" height="5" className={styles.artPine} />
      <path d="M-8 -19 C-3 -16 3 -16 8 -20 M-10 -8 C-4 -5 4 -5 10 -9" className={styles.artGarland} />
      {ornaments.map(([cx, cy, cls], i) => (
        <circle key={i} cx={cx} cy={cy} r="1.7" className={cls} />
      ))}
      <path d="M0 -41 l1.9 4 4.3 0.6 -3.1 3 0.7 4.3 -3.8 -2 -3.8 2 0.7 -4.3 -3.1 -3 4.3 -0.6 Z" className={styles.artBulb} />
    </g>
  );
}

function Gift({ x, y, s, box, ribbon }: { x: number; y: number; s: number; box: string; ribbon: string }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <rect x="-11" y="-12" width="22" height="12" rx="1.5" className={box} />
      <rect x="-12.5" y="-15.5" width="25" height="4" rx="1.5" className={box} />
      <rect x="-2" y="-15.5" width="4" height="15.5" className={ribbon} />
      <circle cx="-3.4" cy="-17.6" r="2.3" className={ribbon} />
      <circle cx="3.4" cy="-17.6" r="2.3" className={ribbon} />
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
          <clipPath id="heroScreenClip">
            <rect x="858" y="350" width="314" height="110" rx="6" />
          </clipPath>
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
        {christmas ? <SleighRide /> : null}

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
            {/* The film playing on the marquee screen: a tiny Christmas scene */}
            <g clipPath="url(#heroScreenClip)">
              <rect x="858" y="350" width="314" height="110" className={styles.artScreenScene} />
              <circle cx="886" cy="368" r="1.6" className={styles.artSparkle} />
              <circle cx="952" cy="360" r="1.3" className={styles.artSparkle} />
              <circle cx="1030" cy="366" r="1.5" className={styles.artSparkle} />
              <circle cx="1096" cy="356" r="1.2" className={styles.artSparkle} />
              <circle cx="1122" cy="380" r="15" className={styles.artMoon} />
              <g transform="translate(1116 376) scale(0.42)" className={styles.artSleigh}>
                <ellipse cx="34" cy="-4" rx="17" ry="7.5" />
                <path d="M44 -9 L56 -19 L61 -15 L51 -2 L44 -3 Z" />
                <path d="M54 -20 C53 -26 50 -29 46 -32 M54 -20 C57 -25 60 -27 64 -28" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" fill="none" />
                <path d="M40 2 L48 9 M24 2 L30 10 M22 1 L14 7" stroke="currentColor" strokeWidth="2.8" strokeLinecap="round" fill="none" />
                <path d="M-34 2 C-36 -6 -28 -10 -18 -9 L6 -7 C13 -6 15 -1 12 4 L8 8 L-28 8 Z" />
                <path d="M-38 13 L16 13" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" fill="none" />
                <circle cx="-14" cy="-14" r="4.6" />
                <path d="M-18 -16 L-8 -17 L-11 -11 Z" />
                <path d="M8 -4 C18 -6 26 -7 34 -7" stroke="currentColor" strokeWidth="1.2" fill="none" opacity="0.8" />
              </g>
              <path d="M858 428 C940 414 1020 424 1090 418 C1130 415 1155 420 1172 416 L1172 460 L858 460 Z" className={styles.artScreenHill} />
              <ChristmasTree x={940} y={446} s={1.35} />
              <g transform="translate(1012 446)">
                <rect x="-16" y="-20" width="32" height="20" className={styles.artHouse} />
                <path d="M-20 -20 L0 -32 L20 -20 Z" className={styles.artHouseRoof} />
                <rect x="-9" y="-13" width="7" height="8" className={styles.artBulb} />
                <rect x="4" y="-11" width="7" height="11" className={styles.artHouseRoof} />
              </g>
              <g transform="translate(1150 448) scale(0.8)">
                <rect x="-16" y="-20" width="32" height="20" className={styles.artHouse} />
                <path d="M-20 -20 L0 -32 L20 -20 Z" className={styles.artHouseRoof} />
                <rect x="-3" y="-13" width="7" height="8" className={styles.artBulb} />
              </g>
              <Snowman x={1072} y={450} s={0.5} />
              <circle cx="905" cy="392" r="1.8" className={styles.artSnowDot} />
              <circle cx="985" cy="382" r="1.5" className={styles.artSnowDot} />
              <circle cx="1052" cy="398" r="1.7" className={styles.artSnowDot} />
              <circle cx="1108" cy="416" r="1.5" className={styles.artSnowDot} />
              <circle cx="880" cy="420" r="1.5" className={styles.artSnowDot} />
              <circle cx="1140" cy="392" r="1.6" className={styles.artSnowDot} />
            </g>
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
            <circle cx="1015" cy="532" r="21" className={styles.artWreath} />
            <circle cx="1015" cy="515" r="4.4" className={styles.artBerry} />
            <circle cx="1001" cy="541" r="4.4" className={styles.artBerry} />
            <circle cx="1029" cy="541" r="4.4" className={styles.artBerry} />
            <path d="M1015 553 L1004 545 L1005 560 Z" className={styles.artBerry} />
            <path d="M1015 553 L1026 545 L1025 560 Z" className={styles.artBerry} />
            <circle cx="1015" cy="552" r="3.2" className={styles.artBerry} />
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
            <ChristmasTree x={96} y={742} s={2} />
            <ellipse cx="1318" cy="750" rx="150" ry="14" className={styles.artSnowCap} />
            <Pine x={1246} y={744} s={2.4} />
            <ChristmasTree x={1340} y={750} s={3.2} />
            <Pine x={1412} y={752} s={2} />
            <Snowman x={688} y={664} s={1.15} />
            <Rudolph x={1150} y={694} s={1.45} />
            <Gift x={872} y={604} s={1.1} box={styles.artGiftRed} ribbon={styles.artRibbonLight} />
            <Gift x={1130} y={606} s={0.9} box={styles.artGiftGold} ribbon={styles.artRibbonDark} />
            <Gift x={722} y={676} s={0.85} box={styles.artGiftGreen} ribbon={styles.artRibbonLight} />
            <Gift x={1304} y={766} s={1} box={styles.artGiftRed} ribbon={styles.artRibbonLight} />
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
