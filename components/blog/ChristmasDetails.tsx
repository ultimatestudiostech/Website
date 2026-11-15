import styles from "./blog.module.css";

/**
 * Slow, sparse falling snow over the hero. Pure CSS animation,
 * pointer-events disabled, and fully off under prefers-reduced-motion
 * (see blog.module.css).
 */
export function Snowfall() {
  return (
    <div className={styles.snowField} aria-hidden="true">
      <span className={`${styles.snow} ${styles.snowOne}`} />
      <span className={`${styles.snow} ${styles.snowTwo}`} />
      <span className={`${styles.snow} ${styles.snowThree}`} />
      <span className={`${styles.snow} ${styles.snowFour}`} />
      <span className={`${styles.snow} ${styles.snowFive}`} />
      <span className={`${styles.snow} ${styles.snowSix}`} />
      <span className={`${styles.snow} ${styles.snowSeven}`} />
      <span className={`${styles.snow} ${styles.snowEight}`} />
    </div>
  );
}

/** Small pine sprig used as a quiet card corner accent (the Christmas LeafSprig). */
export function PineSprig({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 94C30 62 58 34 94 8" />
        <path d="M24 70l-9 3M24 70l-2-9M36 57l-10 2M36 57l-3-10M48 45l-10 1M48 45l-3-10M60 34l-10 0M60 34l-2-10M71 24l-9-1M71 24l-1-9M30 63l3-9M42 51l3-10M54 39l4-9M66 29l4-9" />
      </g>
    </svg>
  );
}

/** Holly line mark for the journal footer (the Christmas WheatAccent). */
export function HollyAccent() {
  return (
    <svg className={styles.hollyAccent} viewBox="0 0 72 72" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M33 44C24 42 15 33 14 21c4 1 7 0 10-2 0 4 1 7 4 9-4 1-6 3-7 6 3-1 6 0 8 2 1 3 2 6 4 8Z" />
        <path d="M39 44c9-2 18-11 19-23-4 1-7 0-10-2 0 4-1 7-4 9 4 1 6 3 7 6-3-1-6 0-8 2-1 3-2 6-4 8Z" />
        <path d="M36 46v14M30 66c2-3 4-4 6-4s4 1 6 4" />
      </g>
      <g fill="currentColor">
        <circle cx="30" cy="50" r="3.4" />
        <circle cx="42" cy="50" r="3.4" />
        <circle cx="36" cy="56" r="3.4" />
      </g>
    </svg>
  );
}
