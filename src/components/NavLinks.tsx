"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav } from "@/lib/site";

function isActive(pathname: string, href: string, external?: boolean) {
  if (external) return false;
  return href === "/" ? pathname === "/" : pathname.startsWith(href);
}

// Desktop nav with an animated lime active-underline + aria-current.
export function DesktopNavLinks() {
  const pathname = usePathname();
  return (
    <nav className="hidden items-center gap-7 md:flex">
      {nav.map((item) => {
        const external = "external" in item && item.external;
        const active = isActive(pathname, item.href, external);
        return (
          <Link
            key={item.label}
            href={item.href}
            aria-current={active ? "page" : undefined}
            {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
            className={`relative font-display text-sm font-semibold uppercase tracking-wide transition-colors ${
              active ? "text-stream-blue" : "text-stream-grey-700 hover:text-stream-blue"
            }`}
          >
            {item.label}
            <span
              className={`absolute -bottom-1.5 left-0 h-0.5 w-full origin-left rounded-full bg-stream-lime transition-transform duration-300 ${
                active ? "scale-x-100" : "scale-x-0"
              }`}
              aria-hidden="true"
            />
          </Link>
        );
      })}
    </nav>
  );
}

export { isActive };
