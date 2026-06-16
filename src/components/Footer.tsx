import Link from "next/link";
import Image from "next/image";
import { nav, site } from "@/lib/site";

export function Footer() {
  const { address, phones, emails } = site;
  return (
    <footer className="bg-stream-ink text-stream-grey-300">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-3">
        {/* brand + pitch */}
        <div>
          <Image
            src="/logos/UAX-Stream-White.svg"
            alt="Stream Remarketing Services"
            width={1167}
            height={189}
            className="h-9 w-auto"
          />
          <p className="mt-4 max-w-xs text-sm leading-relaxed">
            {site.tagline} Stream vehicles are listed in-lane and online at top auctions nationwide.
          </p>
        </div>

        {/* contact */}
        <div className="text-sm">
          <h3 className="font-display text-xs font-bold uppercase tracking-widest text-white">
            Contact
          </h3>
          <address className="mt-4 space-y-1 not-italic leading-relaxed">
            <p>{address.line1}</p>
            <p>
              {address.city}, {address.state} {address.zip}
            </p>
            <p className="pt-2">{site.hours}</p>
            <p className="pt-2">
              <span className="text-stream-grey">Main</span>{" "}
              <a className="hover:text-white" href={`tel:${phones.main.replace(/\D/g, "")}`}>{phones.main}</a>
            </p>
            <p>
              <span className="text-stream-grey">Toll Free</span>{" "}
              <a className="hover:text-white" href={`tel:${phones.tollFree.replace(/\D/g, "")}`}>{phones.tollFree}</a>
            </p>
            <p>
              <span className="text-stream-grey">Fax</span> {phones.fax}
            </p>
          </address>
        </div>

        {/* nav + departments */}
        <div className="text-sm">
          <h3 className="font-display text-xs font-bold uppercase tracking-widest text-white">
            Explore
          </h3>
          <ul className="mt-4 space-y-2">
            {nav.map((item) => (
              <li key={item.label}>
                <Link
                  href={item.href}
                  {...("external" in item && item.external
                    ? { target: "_blank", rel: "noopener noreferrer" }
                    : {})}
                  className="hover:text-white"
                >
                  {item.label}
                </Link>
              </li>
            ))}
            <li>
              <Link href="/causes" className="hover:text-white">Our Causes</Link>
            </li>
            <li>
              <Link href="/contact" className="hover:text-white">Contact</Link>
            </li>
          </ul>
          <div className="mt-6 space-y-1">
            <p className="font-display text-xs font-bold uppercase tracking-widest text-white">Departments</p>
            <a className="block break-words hover:text-white" href={`mailto:${emails.notify}`}>{emails.notify}</a>
            <a className="block break-words hover:text-white" href={`mailto:${emails.invoices}`}>{emails.invoices}</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col gap-2 px-4 py-5 text-xs text-stream-grey sm:flex-row sm:items-center sm:justify-between sm:px-6">
          <p>
            © {new Date().getFullYear()} {site.legalName}. An operating company of United Recovery &amp; Remarketing.
          </p>
          <div className="flex gap-4">
            <Link href="/privacy" className="hover:text-white">Privacy</Link>
            <Link href="/terms" className="hover:text-white">Terms</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
