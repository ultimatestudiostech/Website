"use client";

import Image from "next/image";
import { PortableText, type PortableTextComponents } from "@portabletext/react";
import type { PortableTextBlock } from "@portabletext/types";
import type { ReactNode } from "react";
import { urlForImage } from "@/lib/sanity/image";
import { getTocEntries } from "@/lib/blog-toc";
import { resolveCredit, type ImageCredit } from "@/lib/imageCredits";
import { ImageCreditLine } from "./ImageCreditLine";
import styles from "./blog.module.css";

type BodyImage = ImageCredit & {
  alt?: string;
  caption?: string;
  asset?: { _ref?: string };
  dims?: { width?: number; height?: number };
};

function getComponents(ids: Map<string, { id: string; level: 2 | 3 }>, studio?: string): PortableTextComponents {
  const heading = ({ children, value }: { children?: ReactNode; value: { _key?: string } }) => {
    const meta = value._key ? ids.get(value._key) : undefined;
    if (meta?.level === 3) {
      return (
        <h3 id={meta.id} className={styles.proseH3}>
          {children}
        </h3>
      );
    }
    return (
      <h2 id={meta?.id} className={styles.proseH2}>
        {children}
      </h2>
    );
  };

  return {
    block: {
      // Post title is the page's only H1; body headings start at H2 and never skip levels.
      h1: heading,
      h2: heading,
      h3: heading,
      h4: heading,
      h5: heading,
      h6: heading,
      blockquote: ({ children }) => <blockquote className={styles.proseQuote}>{children}</blockquote>,
      normal: ({ children }) => <p>{children}</p>
    },
    list: {
      bullet: ({ children }) => <ul className={styles.proseList}>{children}</ul>,
      number: ({ children }) => <ol className={styles.proseList}>{children}</ol>
    },
    marks: {
      strong: ({ children }) => <strong className={styles.proseStrong}>{children}</strong>,
      em: ({ children }) => <em>{children}</em>,
      link: ({ children, value }) => {
        const href = value?.href || "#";
        const external = href.startsWith("http");
        return (
          <a href={href} {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
            {children}
          </a>
        );
      }
    },
    types: {
      image: ({ value }: { value: BodyImage }) => {
        const alt = value?.alt || "";
        let src: string | undefined;
        try {
          src = urlForImage(value)?.width(1440).fit("max").auto("format").url();
        } catch {
          src = undefined;
        }
        if (!src || !value?.asset?._ref) return null;
        const w = value.dims?.width || 1200;
        const h = value.dims?.height || 675;
        const portrait = h > w * 1.05;
        const small = w < 640;
        const credit = resolveCredit(value, { studio });
        const caption = value.caption || alt;
        return (
          <figure className={styles.proseFigure}>
            <div
              className={`${styles.proseFigureFrame} ${portrait || small ? styles.proseFigureContain : ""}`}
              style={portrait || small ? undefined : { aspectRatio: `${w} / ${h}` }}
            >
              <Image
                src={src}
                alt={alt}
                width={w}
                height={h}
                loading="lazy"
                sizes="(max-width: 800px) 100vw, 720px"
                className={styles.proseFigureImg}
              />
            </div>
            {caption || credit ? (
              <figcaption className={styles.proseFigcaption}>
                {caption ? <span>{caption}</span> : null}
                <ImageCreditLine credit={credit} />
              </figcaption>
            ) : null}
          </figure>
        );
      }
    }
  };
}

export function PostBody({
  body,
  fallbackParagraphs,
  studio
}: {
  body?: PortableTextBlock[];
  fallbackParagraphs: string[];
  studio?: string;
}) {
  if (body?.length) {
    const ids = new Map(getTocEntries(body).map((e) => [e.key, { id: e.id, level: e.level }]));
    return (
      <div className={styles.prose}>
        <PortableText value={body} components={getComponents(ids, studio)} />
      </div>
    );
  }

  return (
    <div className={styles.prose}>
      {fallbackParagraphs.map((p, i) => (
        <p key={i}>{p}</p>
      ))}
    </div>
  );
}
