import type { ResolvedCredit } from "@/lib/imageCredits";
import styles from "./blog.module.css";

export function ImageCreditLine({ credit }: { credit: ResolvedCredit | null }) {
  if (!credit) return null;
  return (
    <span className={styles.imageCredit}>
      {credit.text}
      {credit.href ? (
        <>
          {" · "}
          <a href={credit.href} target="_blank" rel="nofollow noopener noreferrer">
            Source
          </a>
        </>
      ) : null}
    </span>
  );
}
