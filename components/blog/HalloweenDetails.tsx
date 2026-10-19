import styles from "./blog.module.css";

export function Cobweb({ className = "" }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 100 100" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="0.7">
        <path d="M0 0H100M0 0V100M0 0L92 38M0 0L71 71M0 0L38 92" />
        <path d="M22 0Q18 5 20 8Q15 10 16 16Q10 15 8 20Q5 18 0 22M46 0Q37 10 42 18Q31 21 33 33Q21 31 18 42Q10 37 0 46M72 0Q58 15 66 28Q48 34 51 51Q34 48 28 66Q15 58 0 72M98 0Q80 21 90 38Q66 46 69 69Q46 66 38 90Q21 80 0 98" />
      </g>
    </svg>
  );
}

function Bat({ className }: { className: string }) {
  return (
    <svg className={className} viewBox="0 0 80 40" aria-hidden="true" focusable="false">
      <g className={styles.batWings} fill="currentColor">
        <path d="M39 19C29 5 16 8 2 2C7 15 5 21 1 27C12 22 17 25 19 32C27 26 32 30 38 36ZM41 19C51 5 64 8 78 2C73 15 75 21 79 27C68 22 63 25 61 32C53 26 48 30 42 36Z" />
      </g>
      <path fill="currentColor" d="M34 14L34 7L39 12H41L46 7V14C50 23 46 32 40 38C34 32 30 23 34 14Z" />
    </svg>
  );
}

export function HalloweenFlight() {
  return (
    <div className={styles.halloweenFlight} aria-hidden="true">
      <Bat className={styles.batOne} />
      <Bat className={styles.batTwo} />
      <Bat className={styles.batThree} />
    </div>
  );
}

export function PumpkinAccent() {
  return (
    <svg className={styles.pumpkinAccent} viewBox="0 0 90 66" fill="none" aria-hidden="true" focusable="false">
      <g stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M34 16C29 6 36 3 39 3M35 17C13 6 2 26 8 43C11 54 22 58 35 54C48 59 60 52 63 40C68 20 52 7 35 17Z" />
        <ellipse cx="35" cy="36" rx="13" ry="20" />
        <path d="M24 18C12 29 16 48 24 54M46 18C59 30 53 49 46 54M69 33C68 28 71 25 74 24M69 34C59 28 50 40 55 53C59 62 76 64 83 53C91 40 79 27 69 34Z" />
        <ellipse cx="69" cy="47" rx="7" ry="13" />
        <path d="M19 33L27 29L27 35ZM43 29L51 33L43 35ZM28 44L34 47L41 43" />
      </g>
    </svg>
  );
}
