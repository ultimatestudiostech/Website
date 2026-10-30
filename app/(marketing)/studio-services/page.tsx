import Link from "next/link";
import { JsonLd } from "@/components/seo/JsonLd";
import { buildMetadata } from "@/lib/seo";
import { getSite, getSiteUrl } from "@/lib/cms/store";

const TITLE = "Video Production & Motion Design Studio";
const DESCRIPTION =
  "Ultimate Cineverse is a video production and motion design studio offering editing, motion graphics and audio post-production for creators and brands.";

export async function generateMetadata() {
  return buildMetadata({ title: TITLE, description: DESCRIPTION, pathname: "/studio-services" });
}

const services = [
  {
    name: "Video production",
    text: "Concept, scripting support, shooting plans and editing for promos, trailers, branded content and creator videos — taken from idea to final cut."
  },
  {
    name: "Video editing & post-production",
    text: "Story-first editing, pacing, colour and finishing for long-form and short-form video, delivered in the formats each platform needs."
  },
  {
    name: "Motion design",
    text: "Motion graphics, animated titles, logo animation and kinetic typography that give videos a cinematic, on-brand finish."
  },
  {
    name: "Audio post-production",
    text: "Dialogue clean-up, sound design and mixing so your video sounds as good as it looks."
  }
];

const steps = [
  { name: "Brief", text: "Tell us about the project, audience, deadline and where the video will live." },
  { name: "Plan", text: "We agree scope, creative direction and deliverables before work starts." },
  { name: "Produce", text: "Production, editing, motion design and audio post run in one place." },
  { name: "Deliver", text: "Review rounds, then final files exported for every channel you need." }
];

const faqs = [
  {
    q: "What does a video production studio do?",
    a: "A video production studio plans, films, edits and finishes video. Ultimate Cineverse covers production, editing, motion design and audio post-production so a project can move from concept to final cut with one team."
  },
  {
    q: "Do you offer motion design on its own?",
    a: "Yes. Motion design and motion graphics can be booked as a standalone service or added to a wider video production project."
  },
  {
    q: "How do I start a project?",
    a: "Send a short brief through the contact page with your goals, timeline and deliverables, and we will reply with next steps."
  }
];

const h2 = "mt-12 text-2xl font-semibold text-uc-fg";

export default async function StudioServicesPage() {
  const site = await getSite();
  const siteUrl = getSiteUrl();
  const url = `${siteUrl}/studio-services`;

  const jsonLd = [
    {
      "@context": "https://schema.org",
      "@type": "ProfessionalService",
      "@id": `${url}#service`,
      name: `${site.brandName} Studio`,
      url,
      description: DESCRIPTION,
      image: `${siteUrl}${site.seo.ogImagePath}`,
      parentOrganization: { "@id": `${siteUrl}/#organization` },
      ...(site.contact.email ? { email: site.contact.email } : {}),
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Studio services",
        itemListElement: services.map((s) => ({
          "@type": "Offer",
          itemOffered: { "@type": "Service", name: s.name, description: s.text }
        }))
      }
    },
    {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: faqs.map((f) => ({
        "@type": "Question",
        name: f.q,
        acceptedAnswer: { "@type": "Answer", text: f.a }
      }))
    },
    {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${siteUrl}/` },
        { "@type": "ListItem", position: 2, name: "Studio Services", item: url }
      ]
    }
  ];

  return (
    <>
      <JsonLd data={jsonLd} />
      <main className="uc-page mx-auto w-full max-w-4xl px-4 py-12 pb-24">
        <p className="text-sm uppercase tracking-widest text-uc-red">Ultimate Cineverse Studio</p>
        <h1 className="mt-2 text-3xl font-bold text-uc-fg sm:text-4xl">
          Video Production, Motion Design &amp; Audio Post
        </h1>
        <p className="mt-4 text-lg text-uc-muted leading-relaxed">
          Ultimate Cineverse is a video production studio and motion design studio run by people who spend
          their days thinking about film. We bring that cinematic eye to promos, trailers, branded content
          and creator videos — handling editing, motion graphics and audio post-production under one roof.
        </p>
        <p className="mt-6">
          <Link
            href="/contact"
            className="inline-block rounded-md bg-uc-red px-5 py-3 font-semibold text-white no-underline"
          >
            Start a project
          </Link>
        </p>

        <h2 className={h2}>Studio services</h2>
        <div className="mt-6 grid gap-6 sm:grid-cols-2">
          {services.map((s) => (
            <div key={s.name} className="rounded-lg border border-uc-border bg-uc-elevated p-5">
              <h3 className="text-lg font-semibold text-uc-fg">{s.name}</h3>
              <p className="mt-2 text-uc-muted leading-relaxed">{s.text}</p>
            </div>
          ))}
        </div>

        <h2 className={h2}>How we work</h2>
        <ol className="mt-6 grid gap-4 sm:grid-cols-4">
          {steps.map((s, i) => (
            <li key={s.name} className="rounded-lg border border-uc-border p-4">
              <p className="text-sm text-uc-faint">Step {i + 1}</p>
              <h3 className="mt-1 font-semibold text-uc-fg">{s.name}</h3>
              <p className="mt-2 text-sm text-uc-muted leading-relaxed">{s.text}</p>
            </li>
          ))}
        </ol>

        <h2 className={h2}>See our work</h2>
        <p className="mt-4 text-uc-muted leading-relaxed">
          Our videos live on{" "}
          {site.socials.map((s, i) => (
            <span key={s.id}>
              {i > 0 ? ", " : ""}
              <a className="uc-link" href={s.href} target="_blank" rel="noopener noreferrer">
                {s.label}
              </a>
            </span>
          ))}
          , and our editorial side publishes{" "}
          <Link className="uc-link" href="/blog">
            film reviews and streaming guides
          </Link>
          .
        </p>

        <h2 className={h2}>Frequently asked questions</h2>
        <div className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.q}>
              <h3 className="font-semibold text-uc-fg">{f.q}</h3>
              <p className="mt-2 text-uc-muted leading-relaxed">{f.a}</p>
            </div>
          ))}
        </div>

        <h2 className={h2}>Talk to the studio</h2>
        <p className="mt-4 text-uc-muted leading-relaxed">
          Email{" "}
          <a className="uc-link" href={`mailto:${site.contact.email}`}>
            {site.contact.email}
          </a>{" "}
          or use the{" "}
          <Link className="uc-link" href="/contact">
            contact form
          </Link>{" "}
          with a short brief.
        </p>
        <p className="mt-6 text-uc-muted leading-relaxed">
          Want to see how we think about pictures before you hire us? Read our 
          <Link className="uc-link" href="/blog/category/movie-reviews">film reviews</Link>, learn 
          <Link className="uc-link" href="/about">who we are and how we work</Link>, or browse the 
          <Link className="uc-link" href="/blog">Ultimate Cineverse blog</Link>. Our audio mixes follow the 
          <a className="uc-link" href="https://tech.ebu.ch/publications/r128" target="_blank" rel="noopener">EBU R 128 loudness recommendation</a>, and
          deliverables can be matched to platform specs such as 
          <a className="uc-link" href="https://support.google.com/youtube/answer/1722171" target="_blank" rel="noopener">YouTube&apos;s recommended upload settings</a>.
        </p>
      </main>
    </>
  );
}
