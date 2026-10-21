import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { ContactForm } from "@/components/contact/ContactForm";
import { buildMetadata } from "@/lib/seo";
import { getSite, getSiteUrl } from "@/lib/cms/store";

export async function generateMetadata() {
  const site = await getSite();
  return buildMetadata({
    title: `Contact ${site.brandName}`,
    description: `Contact ${site.brandName} for review screeners, press releases, corrections, or video production, motion design and audio post-production projects.`,
    pathname: "/contact"
  });
}

export default async function ContactPage() {
  const site = await getSite();
  const siteUrl = getSiteUrl();
  const { phone, email, addressLines } = site.contact;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ContactPage",
      name: `Contact ${site.brandName}`,
      url: `${siteUrl}/contact`,
      isPartOf: { "@id": `${siteUrl}/#website` },
      about: { "@id": `${siteUrl}/#organization` }
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Contact", item: `${siteUrl}/contact` }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="uc-page mx-auto w-full max-w-3xl px-4 py-12 pb-24">
        <h1 className="text-3xl font-bold text-uc-fg">Contact {site.brandName}</h1>
        <p className="mt-4 text-uc-muted leading-relaxed">
          Connect with the Ultimate Cineverse newsroom and creative studio. Whether you have an editorial lead, a screening invitation, or a production inquiry, our team is ready to collaborate.
        </p>

        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          <div className="rounded-lg border border-uc-border bg-uc-elevated p-5">
            <h2 className="text-base font-semibold text-uc-fg">Editorial &amp; Press</h2>
            <p className="mt-2 text-sm text-uc-muted leading-relaxed">
              For review screeners, press releases, festival coverage, and film interview requests, email our writing desk at{" "}
              <a className="uc-link" href={`mailto:${email}`}>
                {email}
              </a>.
            </p>
          </div>
          <div className="rounded-lg border border-uc-border bg-uc-elevated p-5">
            <h2 className="text-base font-semibold text-uc-fg">Studio &amp; Production</h2>
            <p className="mt-2 text-sm text-uc-muted leading-relaxed">
              Inquire about video production, video editing, motion design and audio post-production projects.
              See{" "}
              <Link className="uc-link" href="/studio-services">
                studio services
              </Link>{" "}
              for what we offer.
            </p>
          </div>
        </div>

        <h2 className="mt-10 text-xl font-semibold text-uc-fg">Corrections &amp; feedback</h2>
        <p className="mt-3 text-uc-muted leading-relaxed">
          Found an error in a review, an outdated streaming listing, or a broken link? Send us the page URL
          and what needs fixing and we will update it. Reader suggestions for reviews, ending explainers and
          streaming guides are always welcome too.
        </p>

        <h2 className="mt-10 text-xl font-semibold text-uc-fg">What to include</h2>
        <ul className="mt-3 list-disc space-y-2 pl-5 text-uc-muted leading-relaxed">
          <li>Editorial: the film or show, release date, and any screening or embargo details.</li>
          <li>Studio: a short brief, your deadline, the deliverables you need and where the video will be published.</li>
          <li>Corrections: the article link and the specific line that needs changing.</li>
        </ul>

        <h2 className="mt-10 text-xl font-semibold text-uc-fg">Send a message</h2>

        {addressLines.length > 0 ? (
          <p className="mt-4 text-uc-faint text-sm leading-relaxed">{addressLines.join(" · ")}</p>
        ) : null}

        <div className="mt-4">
          <ContactForm email={email} />
        </div>
      </main>
    </>
  );
}
