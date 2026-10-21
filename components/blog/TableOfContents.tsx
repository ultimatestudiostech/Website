"use client";

import { useEffect, useState } from "react";
import type { TocEntry } from "@/lib/blog-toc";
import styles from "./blog.module.css";

type Props = { entries: TocEntry[]; variant: "sidebar" | "inline" };

function useActiveHeading(ids: string[]) {
  const [active, setActive] = useState<string | null>(ids[0] ?? null);
  useEffect(() => {
    if (!ids.length || typeof IntersectionObserver === "undefined") return;
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[];
    const visible = new Map<string, number>();
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) visible.set(e.target.id, e.boundingClientRect.top);
          else visible.delete(e.target.id);
        }
        if (visible.size) {
          const top = [...visible.entries()].sort((a, b) => a[1] - b[1])[0][0];
          setActive(top);
        } else {
          // Nothing in band: pick the last heading above the viewport.
          const above = els.filter((el) => el.getBoundingClientRect().top < 120);
          if (above.length) setActive(above[above.length - 1].id);
        }
      },
      { rootMargin: "-90px 0px -65% 0px", threshold: 0 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, [ids]);
  return active;
}

function TocList({ entries, active, onNavigate }: { entries: TocEntry[]; active: string | null; onNavigate?: () => void }) {
  let n = 0;
  return (
    <ol className={styles.tocList}>
      {entries.map((e) => {
        if (e.level === 2) n += 1;
        const isActive = e.id === active;
        return (
          <li key={e.id} className={e.level === 3 ? styles.tocSub : styles.tocItem}>
            <a
              href={`#${e.id}`}
              className={`${styles.tocLink} ${isActive ? styles.tocActive : ""}`}
              aria-current={isActive ? "location" : undefined}
              onClick={(ev) => {
                const el = document.getElementById(e.id);
                if (!el) return;
                ev.preventDefault();
                const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
                el.scrollIntoView({ behavior: reduce ? "auto" : "smooth", block: "start" });
                history.replaceState(null, "", `#${e.id}`);
                onNavigate?.();
              }}
            >
              {e.level === 2 ? <span className={styles.tocNum} aria-hidden="true">{String(n).padStart(2, "0")}</span> : null}
              <span>{e.text}</span>
            </a>
          </li>
        );
      })}
    </ol>
  );
}

export function TableOfContents({ entries, variant }: Props) {
  const active = useActiveHeading(entries.map((e) => e.id));
  const [open, setOpen] = useState(false);
  if (entries.length < 2) return null;

  if (variant === "inline") {
    return (
      <nav className={`${styles.toc} ${styles.tocInline}`} aria-label="Table of contents">
        <details open={open} onToggle={(e) => setOpen((e.currentTarget as HTMLDetailsElement).open)}>
          <summary className={styles.tocSummary}>
            <span className={styles.tocTitle}>In this article</span>
            <span className={styles.tocCount}>{entries.filter((e) => e.level === 2).length} sections</span>
          </summary>
          <TocList entries={entries} active={active} onNavigate={() => setOpen(false)} />
        </details>
      </nav>
    );
  }

  return (
    <nav className={`${styles.toc} ${styles.tocSidebar}`} aria-labelledby="toc-heading">
      <p id="toc-heading" className={styles.tocTitle}>
        In this article
      </p>
      <TocList entries={entries} active={active} />
    </nav>
  );
}
