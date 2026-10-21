import type { PortableTextBlock } from "@portabletext/types";

export type TocEntry = { key: string; id: string; text: string; level: 2 | 3 };

type Block = PortableTextBlock & { _key?: string; style?: string; children?: Array<{ text?: string }> };

function slugify(text: string) {
  return (
    text
      .toLowerCase()
      .normalize("NFKD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-+|-+$/g, "")
      .slice(0, 60) || "section"
  );
}

/** Headings as rendered (h1→h2; h3–h6→h3 when an h2 exists, else h2), with unique ids. */
export function getTocEntries(body?: PortableTextBlock[]): TocEntry[] {
  if (!body?.length) return [];
  const blocks = body as Block[];
  const seen = new Map<string, number>();
  const out: TocEntry[] = [];
  // A sub-heading only stays H3 once an H2 has appeared above it (no H1→H3 jumps).
  let sawH2 = false;
  blocks.forEach((b, i) => {
    if (b._type !== "block" || !b.style || !/^h[1-6]$/.test(b.style)) return;
    const text = (b.children ?? []).map((c) => c.text ?? "").join("").trim();
    if (!text) return;
    const isTop = b.style === "h1" || b.style === "h2";
    const level: 2 | 3 = isTop || !sawH2 ? 2 : 3;
    if (isTop) sawH2 = true;
    const base = slugify(text);
    const n = seen.get(base) ?? 0;
    seen.set(base, n + 1);
    out.push({ key: b._key ?? `h-${i}`, id: n ? `${base}-${n + 1}` : base, text, level });
  });
  return out;
}

type LinkDef = { _key?: string; _type?: string; href?: string };

/**
 * Word imports often include a manual table of contents: paragraphs whose only content is a
 * link to a Word bookmark (`#_abc123`). Those anchors don't exist on the page, and we render a
 * real TOC, so drop them.
 */
export function stripWordToc(body?: PortableTextBlock[]): PortableTextBlock[] | undefined {
  if (!body?.length) return body;
  return body.filter((raw) => {
    const b = raw as unknown as {
      _type: string;
      style?: string;
      markDefs?: LinkDef[];
      children?: Array<{ text?: string; marks?: string[] }>;
    };
    if (b._type !== "block" || (b.style && b.style !== "normal")) return true;
    const bookmarkKeys = new Set(
      (b.markDefs ?? []).filter((m) => m._type === "link" && m.href?.startsWith("#_")).map((m) => m._key)
    );
    if (!bookmarkKeys.size) return true;
    const spans = (b.children ?? []).filter((c) => (c.text ?? "").trim());
    return !spans.length || !spans.every((c) => (c.marks ?? []).some((m: string) => bookmarkKeys.has(m)));
  });
}
