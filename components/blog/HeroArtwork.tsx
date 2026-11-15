import type { SeasonKey } from "@/lib/season";
import styles from "./blog.module.css";

const BULBS = [142, 156.5, 171, 185.5, 200, 214.5, 229, 243.5, 258];
const HOLES = Array.from({ length: 20 }, (_, i) => 6 + i * 20);
const FRAMES = [26, 122, 218, 314];
const STARS = [
  { cx: 36, cy: 34, r: 1.8 },
  { cx: 84, cy: 62, r: 1.3 },
  { cx: 132, cy: 28, r: 1.5 },
  { cx: 196, cy: 48, r: 1.2 },
  { cx: 238, cy: 24, r: 1.7 },
  { cx: 356, cy: 118, r: 1.3 },
  { cx: 58, cy: 104, r: 1.2 },
  { cx: 300, cy: 140, r: 1.1 }
];
const SNOW_DOTS = [
  { cx: 30, cy: 52, r: 2.2 },
  { cx: 70, cy: 130, r: 1.6 },
  { cx: 108, cy: 74, r: 2 },
  { cx: 160, cy: 40, r: 1.5 },
  { cx: 222, cy: 66, r: 2.3 },
  { cx: 262, cy: 120, r: 1.6 },
  { cx: 330, cy: 44, r: 1.8 },
  { cx: 372, cy: 96, r: 2.1 },
  { cx: 44, cy: 176, r: 1.5 },
  { cx: 348, cy: 176, r: 1.7 },
  { cx: 128, cy: 158, r: 1.4 },
  { cx: 286, cy: 158, r: 1.4 }
];

function Pine({ x, y, s }: { x: number; y: number; s: number }) {
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`} className={styles.artPine}>
      <path d="M0 -34 L9 -14 L4 -14 L12 2 L-12 2 L-4 -14 L-9 -14 Z" />
      <rect x="-1.6" y="2" width="3.2" height="5" />
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

function WheatStalk({ x, flip = false }: { x: number; flip?: boolean }) {
  return (
    <g
      transform={`translate(${x} 268) ${flip ? "scale(-1 1)" : ""}`}
      className={styles.artWheat}
      strokeWidth="1.6"
      strokeLinecap="round"
      fill="none"
    >
      <path d="M0 8 C-1 -14 -2 -30 -4 -48" />
      <path d="M-3 -46 C-9 -48 -13 -53 -14 -60 C-7 -59 -3 -54 -3 -46 Z" />
      <path d="M-3 -46 C3 -48 7 -53 8 -60 C1 -59 -3 -54 -3 -46 Z" />
      <path d="M-2 -32 C-8 -34 -12 -39 -13 -46 C-6 -45 -2 -40 -2 -32 Z" />
      <path d="M-2 -32 C4 -34 8 -39 9 -46 C2 -45 -2 -40 -2 -32 Z" />
    </g>
  );
}

/**
 * Editorial hero illustration — one composition, recoloured per season.
 * A harvest-moon cinema scene in autumn; the same hills, marquee and film
 * strip under snow at Christmas. Pure inline SVG (no image files), driven
 * by the --blog-* variables so the data-season palette keeps working.
 * Decorative only: aria-hidden, motion respects prefers-reduced-motion.
 */
export function HeroArtwork({ season }: { season: SeasonKey }) {
  const christmas = season === "christmas";
  const thanksgiving = season === "thanksgiving";
  return (
    <div className={styles.heroArt} aria-hidden="true">
      <svg viewBox="0 0 400 310" preserveAspectRatio="xMidYMid slice" focusable="false">
        <defs>
          <linearGradient id="heroSkyGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" className={styles.artSkyStopA} />
            <stop offset="58%" className={styles.artSkyStopB} />
            <stop offset="100%" className={styles.artSkyStopC} />
          </linearGradient>
        </defs>

        <rect x="0" y="0" width="400" height="310" fill="url(#heroSkyGrad)" />

        {STARS.map((s, i) => (
          <circle key={i} cx={s.cx} cy={s.cy} r={s.r} className={`${styles.artSparkle} ${i % 3 === 0 ? styles.artTwinkle : ""}`} />
        ))}
        <path d="M104 84 l1.8 4.2 4.2 1.8 -4.2 1.8 -1.8 4.2 -1.8 -4.2 -4.2 -1.8 4.2 -1.8 Z" className={styles.artSparkle} />
        <path d="M268 92 l1.4 3.3 3.3 1.4 -3.3 1.4 -1.4 3.3 -1.4 -3.3 -3.3 -1.4 3.3 -1.4 Z" className={styles.artSparkle} />

        {/* Moon */}
        <circle cx="318" cy="60" r="46" className={styles.artMoonGlow} />
        <circle cx="318" cy="60" r="29" className={styles.artMoon} />
        <circle cx="308" cy="52" r="5" className={styles.artMoonCrater} />
        <circle cx="326" cy="68" r="3.6" className={styles.artMoonCrater} />
        <circle cx="320" cy="46" r="2.6" className={styles.artMoonCrater} />

        {/* Rolling hills */}
        <path d="M0 168 C60 140 120 156 190 146 C260 136 330 150 400 138 L400 310 L0 310 Z" className={styles.artHillBack} />
        <path d="M0 208 C70 184 150 200 230 188 C300 178 350 192 400 184 L400 310 L0 310 Z" className={styles.artHillMid} />
        {christmas ? (
          <path d="M0 208 C70 184 150 200 230 188 C300 178 350 192 400 184 L400 193 C350 201 300 187 230 197 C150 209 70 193 0 217 Z" className={styles.artSnowCap} />
        ) : null}
        <path d="M0 252 C80 232 170 246 250 236 C320 228 360 240 400 234 L400 310 L0 310 Z" className={styles.artHillFront} />
        {christmas ? (
          <path d="M0 252 C80 232 170 246 250 236 C320 228 360 240 400 234 L400 243 C360 249 320 237 250 245 C170 255 80 241 0 261 Z" className={styles.artSnowCap} />
        ) : null}

        {christmas ? (
          <>
            <Pine x={52} y={206} s={1} />
            <Pine x={76} y={214} s={0.7} />
            <Pine x={330} y={200} s={1.15} />
            <Pine x={356} y={210} s={0.8} />
            <Pine x={108} y={238} s={0.9} />
            <Pine x={300} y={232} s={0.75} />
          </>
        ) : null}

        {/* Cinema marquee in the middle distance */}
        <ellipse cx="200" cy="158" rx="98" ry="56" className={styles.artScreenGlow} />
        <rect x="146" y="166" width="5" height="36" className={styles.artMarquee} />
        <rect x="249" y="166" width="5" height="36" className={styles.artMarquee} />
        <rect x="140" y="116" width="120" height="56" rx="4" className={styles.artScreen} />
        <rect x="148" y="124" width="104" height="40" rx="2" className={styles.artScreenInner} />
        <rect x="132" y="98" width="136" height="14" rx="7" className={styles.artMarqueeBar} />
        {BULBS.map((cx, i) => (
          <circle key={cx} cx={cx} cy="105" r="2.6" className={i % 2 === 0 ? styles.artBulb : styles.artBulbAlt} />
        ))}
        {christmas ? (
          <>
            <path d="M138 120 Q200 140 262 120" className={styles.artLightWire} />
            {[150, 168, 186, 204, 222, 240].map((cx, i) => (
              <circle
                key={cx}
                cx={cx}
                cy={126 + Math.sin((cx - 138) / 124 * Math.PI) * 8}
                r="2.4"
                className={i % 3 === 0 ? styles.artBulb : i % 3 === 1 ? styles.artBulbAlt : styles.artBulbCool}
              />
            ))}
            <circle cx="200" cy="146" r="9.5" className={styles.artWreath} />
            <circle cx="200" cy="139.5" r="1.9" className={styles.artBerry} />
            <circle cx="193.5" cy="150" r="1.9" className={styles.artBerry} />
            <circle cx="206.5" cy="150" r="1.9" className={styles.artBerry} />
          </>
        ) : null}

        {/* Foreground seasonal dressing */}
        {thanksgiving ? (
          <>
            <WheatStalk x={20} />
            <WheatStalk x={382} flip />
            <Pumpkin x={88} y={262} s={1} />
            <Pumpkin x={116} y={270} s={0.62} />
            <Pumpkin x={306} y={266} s={0.8} />
            <path d="M150 96 c4 5 4 9 0 13 c-4 -4 -4 -8 0 -13 Z" className={`${styles.artLeafFloat} ${styles.artFloatA}`} />
            <path d="M96 150 c4 5 4 9 0 13 c-4 -4 -4 -8 0 -13 Z" className={`${styles.artLeafFloat} ${styles.artFloatB}`} />
            <path d="M282 168 c4 5 4 9 0 13 c-4 -4 -4 -8 0 -13 Z" className={`${styles.artLeafFloat} ${styles.artFloatC}`} />
          </>
        ) : null}
        {christmas
          ? SNOW_DOTS.map((s, i) => <circle key={i} cx={s.cx} cy={s.cy} r={s.r} className={styles.artSnowDot} />)
          : null}

        {/* Film strip along the poster's bottom edge */}
        <g>
          <rect x="0" y="278" width="400" height="32" className={styles.artStrip} />
          {HOLES.map((x) => (
            <rect key={`t${x}`} x={x} y="281.5" width="10" height="5" rx="1.5" className={styles.artHole} />
          ))}
          {HOLES.map((x) => (
            <rect key={`b${x}`} x={x} y="303.5" width="10" height="5" rx="1.5" className={styles.artHole} />
          ))}
          {FRAMES.map((x) => (
            <rect key={x} x={x} y="287" width="76" height="14" rx="2" className={styles.artFrame} />
          ))}
        </g>
      </svg>
    </div>
  );
}
