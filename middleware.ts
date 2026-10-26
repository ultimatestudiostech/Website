import { NextResponse, type NextRequest } from "next/server";

/**
 * Force HTTPS. Cloudflare sets x-forwarded-proto / cf-visitor to the scheme the
 * visitor used; we only redirect when it is explicitly "http", so HTTPS
 * requests (and local dev without these headers) pass straight through.
 */
export function middleware(req: NextRequest) {
  const host = req.headers.get("host") || "";
  if (!/(^|\.)ultimatecineverse\.com$/i.test(host.split(":")[0])) return NextResponse.next();

  const xfp = (req.headers.get("x-forwarded-proto") || "").split(",")[0].trim().toLowerCase();
  let visitor = "";
  try {
    visitor = (JSON.parse(req.headers.get("cf-visitor") || "{}").scheme || "").toLowerCase();
  } catch {}

  const scheme = visitor || xfp;
  if (scheme === "http") {
    const url = new URL(req.url);
    url.protocol = "https:";
    url.host = host.split(":")[0];
    url.port = "";
    return NextResponse.redirect(url, 301);
  }
  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image).*)"]
};
