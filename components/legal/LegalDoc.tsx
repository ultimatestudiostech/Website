import Link from "next/link";
import type { ReactNode } from "react";

type Props = {
  title: string;
  updated: string;
  children: ReactNode;
};

export function LegalDoc({ title, updated, children }: Props) {
  return (
    <main className="uc-page mx-auto w-full max-w-3xl px-4 py-12 pb-24">
      <h1 className="text-3xl font-bold tracking-tight text-uc-fg">{title}</h1>
      <p className="mt-2 text-sm text-uc-muted">Last updated: {updated}</p>
      <div className="legal-prose mt-8 space-y-6 text-uc-fg leading-relaxed [&_h2]:mt-10 [&_h2]:text-xl [&_h2]:font-semibold [&_h2]:text-uc-fg [&_h3]:mt-6 [&_h3]:text-lg [&_h3]:font-semibold [&_h3]:text-uc-fg [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_a]:text-uc-red [&_a]:underline [&_a]:underline-offset-2">
        {children}
      </div>
      <p className="mt-10 text-uc-muted leading-relaxed">
        This page should be read together with our <Link className="uc-link" href="/privacy">Privacy Policy</Link>, 
        <Link className="uc-link" href="/cookies">Cookie Policy</Link> and <Link className="uc-link" href="/terms">Terms of Use</Link>. Questions
        can go through the <Link className="uc-link" href="/contact">contact page</Link>. Ads on the site are served under 
        <a className="uc-link" href="https://policies.google.com/technologies/ads" target="_blank" rel="noopener">Google&apos;s advertising policies</a>, and
        you can control ad personalisation at any time in 
        <a className="uc-link" href="https://myadcenter.google.com/" target="_blank" rel="noopener">Google My Ad Center</a>.
      </p>
      <p className="mt-10 text-xs leading-relaxed text-uc-faint">
        This page is provided for transparency and AdSense / privacy compliance. It is not formal
        legal advice. Have counsel review before relying on it in regulated markets.
      </p>
    </main>
  );
}
