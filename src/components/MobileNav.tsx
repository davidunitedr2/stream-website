"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { nav, site } from "@/lib/site";
import { isActive } from "./NavLinks";

export function MobileNav() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <div className="md:hidden">
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open menu"
        className="inline-flex h-11 w-11 items-center justify-center rounded-md text-stream-ink"
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
          <line x1="3" y1="6" x2="21" y2="6" />
          <line x1="3" y1="12" x2="21" y2="12" />
          <line x1="3" y1="18" x2="21" y2="18" />
        </svg>
      </button>

      {open && (
        // explicit h-screen w-screen — a fixed child of a sticky header collapses otherwise
        <div className="fixed left-0 top-0 z-[100] flex h-screen w-screen flex-col brand-gradient text-white">
          <div className="flex items-center justify-between px-4 py-3">
            <span className="font-display text-lg font-extrabold uppercase tracking-widest">
              Stream
            </span>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close menu"
              className="inline-flex h-11 w-11 items-center justify-center rounded-md"
            >
              <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round">
                <line x1="6" y1="6" x2="18" y2="18" />
                <line x1="18" y1="6" x2="6" y2="18" />
              </svg>
            </button>
          </div>

          <nav className="flex flex-1 flex-col gap-1 px-6 pt-6">
            {nav.map((item) => {
              const external = "external" in item && item.external;
              const active = isActive(pathname, item.href, external);
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  aria-current={active ? "page" : undefined}
                  {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
                  className={`flex items-center gap-3 border-b border-white/20 py-4 font-display text-2xl font-bold uppercase tracking-wide transition-colors ${
                    active ? "text-stream-lime" : "text-white"
                  }`}
                >
                  {active && <span className="h-2 w-2 rounded-full bg-stream-lime" aria-hidden="true" />}
                  {item.label}
                </Link>
              );
            })}
          </nav>

          <div className="space-y-1 px-6 py-8 text-sm">
            <a href={`tel:${site.phones.main.replace(/\D/g, "")}`} className="block">
              {site.phones.main}
            </a>
            <a href={`mailto:${site.emails.general}`} className="block break-words">
              {site.emails.general}
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
