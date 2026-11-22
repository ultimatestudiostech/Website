import { buildMetadata } from "@/lib/seo";
import "./tailwind.css";

export async function generateMetadata() {
  const meta = await buildMetadata({
    title: "Page Not Found",
    description: "The page you’re looking for doesn’t exist. Go back to the homepage.",
    pathname: "/404"
  });
  // Next.js adds its own <meta name="robots" content="noindex"> to 404
  // responses; buildMetadata's index/follow tag would be a second,
  // conflicting robots meta, so drop it and keep only the framework's.
  delete meta.robots;
  // A 404 must not carry a canonical (buildMetadata points it at /404).
  delete meta.alternates;
  return meta;
}

export default function NotFound() {
  return (
    <main className="uc-page mx-auto w-full max-w-3xl px-4 py-12">
      <h1 className="text-3xl font-bold text-uc-fg">Page Not Found</h1>
      <p className="mt-4 text-uc-muted leading-relaxed">The requested page wasn’t found.</p>
      <a className="uc-btn mt-6 inline-block" href="/">
        Back to home
      </a>
    </main>
  );
}
