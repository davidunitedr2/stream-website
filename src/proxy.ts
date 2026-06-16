import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Only the real production hosts should be indexable. Every other host
// (Vercel preview/staging URLs, etc.) gets noindex so the work-in-progress
// site never shows up in search results before the DNS flip to thestream.com.
const CANONICAL_HOSTS = new Set(["thestream.com", "www.thestream.com"]);

export function proxy(req: NextRequest) {
  const res = NextResponse.next();
  const host = (req.headers.get("host") ?? "").split(":")[0].toLowerCase();
  if (!CANONICAL_HOSTS.has(host)) {
    res.headers.set("X-Robots-Tag", "noindex, nofollow");
  }
  return res;
}

export const config = {
  matcher: "/((?!_next/static|_next/image|favicon.ico).*)",
};
