"use client";

import { useEffect, useState } from "react";
import styles from "./blog.module.css";

const MAX_LEN = 90;

type Props = {
  /** Per-season copy + storage key; every default below is the Thanksgiving original. */
  kicker?: string;
  title?: string;
  copy?: string;
  label?: string;
  placeholder?: string;
  savedMessage?: string;
  /** Season-specific so a Thanksgiving note never leaks into another season's wall. */
  storageKey?: string;
  seedNotes?: string[];
};

/**
 * A small, warm interactive: visitors leave one line of thanks.
 * Their note is kept only in their own browser (localStorage) —
 * no account, no server, no tracking.
 */
export function GratitudeWall({
  kicker = "The gratitude wall",
  title = "One line of thanks, before the film starts.",
  copy = "Add yours — it stays on this device, pinned next to ours.",
  label = "I am thankful for…",
  placeholder = "a film, a person, a second helping…",
  savedMessage = "Pinned. Happy Thanksgiving.",
  storageKey = "uc-gratitude-note",
  seedNotes = [
    "Grateful for films that bring the whole table together.",
    "Thankful for one more story night with family.",
    "Grateful for the cook, the critic and the dishwasher."
  ]
}: Props = {}) {
  const [draft, setDraft] = useState("");
  const [mine, setMine] = useState<string | null>(null);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    try {
      const v = window.localStorage.getItem(storageKey);
      if (v) setMine(v);
    } catch {
      /* private mode — the wall still works for this visit */
    }
  }, [storageKey]);

  const submit = (event: React.FormEvent) => {
    event.preventDefault();
    const note = draft.trim().slice(0, MAX_LEN);
    if (!note) return;
    setMine(note);
    setDraft("");
    setSaved(true);
    try {
      window.localStorage.setItem(storageKey, note);
    } catch {
      /* ignore */
    }
  };

  const notes = mine ? [mine, ...seedNotes] : seedNotes;

  return (
    <section className={styles.gratitude} aria-labelledby="gratitude-heading">
      <div className={styles.gratitudeHead}>
        <p className={styles.brandKicker}>{kicker}</p>
        <h2 id="gratitude-heading" className={styles.gratitudeTitle}>{title}</h2>
        <p className={styles.gratitudeCopy}>
          {copy}
        </p>
      </div>

      <ul className={styles.gratitudeNotes}>
        {notes.map((note, i) => (
          <li key={`${note}-${i}`} className={`${styles.gratitudeNote} ${mine && i === 0 ? styles.gratitudeNoteMine : ""}`}>
            <span aria-hidden="true">✦</span> {note}
            {mine && i === 0 ? <em> — yours</em> : null}
          </li>
        ))}
      </ul>

      <form className={styles.gratitudeForm} onSubmit={submit}>
        <label className={styles.gratitudeLabel} htmlFor="gratitude-input">
          {label}
        </label>
        <div className={styles.gratitudeRow}>
          <input
            id="gratitude-input"
            type="text"
            value={draft}
            maxLength={MAX_LEN}
            onChange={(e) => {
              setDraft(e.target.value);
              setSaved(false);
            }}
            placeholder={placeholder}
            autoComplete="off"
          />
          <button type="submit" className={styles.gratitudeBtn}>Pin it</button>
        </div>
        <p className={styles.gratitudeHint} role="status">
          {saved ? savedMessage : `${MAX_LEN - draft.length} characters left · saved only in your browser`}
        </p>
      </form>
    </section>
  );
}
