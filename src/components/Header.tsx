import Link from "next/link";
import Image from "next/image";
import { site } from "@/lib/site";
import { DesktopNavLinks } from "./NavLinks";
import { MobileNav } from "./MobileNav";

export function Header() {
  return (
    <header className="sticky top-0 z-50">
      {/* contact bar */}
      <div className="bg-stream-ink text-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-1.5 text-xs sm:px-6">
          <p className="font-display font-semibold uppercase tracking-widest text-stream-blue-bright">
            {site.tagline}
          </p>
          <div className="hidden items-center gap-5 sm:flex">
            <a href={`tel:${site.phones.main.replace(/\D/g, "")}`} className="hover:text-stream-blue-bright">
              {site.phones.main}
            </a>
            <a href={`mailto:${site.emails.general}`} className="hover:text-stream-blue-bright break-words">
              {site.emails.general}
            </a>
          </div>
        </div>
      </div>

      {/* main nav */}
      <div className="border-b border-stream-grey-300 bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3 sm:px-6">
          <Link href="/" className="flex items-center" aria-label="Stream home">
            <Image
              src="/logos/UAX-Stream-BlueLime.svg"
              alt="Stream Remarketing Services"
              width={1167}
              height={189}
              priority
              className="h-9 w-auto"
            />
          </Link>

          <DesktopNavLinks />

          <MobileNav />
        </div>
      </div>
    </header>
  );
}
