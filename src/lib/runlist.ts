// Fetches the Stream run list from the external SvelteKit app and parses its
// server-rendered table into structured data we can sort/filter/brand ourselves.
// The source markup is stable: a single <table> with one row per vehicle.

import { site } from "./site";

export type Channel = "Online" | "In-lane" | "Upcoming";

export interface Vehicle {
  idx: number;
  status: string; // "On Sale" | "Scheduled"
  vin: string;
  year: number | null;
  make: string;
  model: string;
  mileage: number | null;
  mileageText: string;
  date: string; // raw, e.g. "6/8/26"
  dateValue: number | null; // epoch ms for sorting
  platform: string;
  channel: Channel;
}

export interface RunList {
  vehicles: Vehicle[];
  total: number;
  fetchedAt: string;
}

function stripTags(s: string): string {
  return s
    .replace(/<!--[\s\S]*?-->/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/&amp;/g, "&")
    .replace(/&#39;|&apos;/g, "'")
    .replace(/&quot;/g, '"')
    .replace(/\s+/g, " ")
    .trim();
}

function parseDate(d: string): number | null {
  const m = d.match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!m) return null;
  let year = parseInt(m[3], 10);
  if (year < 100) year += 2000;
  const t = Date.UTC(year, parseInt(m[1], 10) - 1, parseInt(m[2], 10));
  return Number.isNaN(t) ? null : t;
}

function classifyChannel(platform: string): Channel {
  if (/upcoming/i.test(platform)) return "Upcoming";
  if (/smartauction|(\bove\b)|listed on/i.test(platform)) return "Online";
  return "In-lane";
}

export async function fetchRunList(): Promise<RunList> {
  const res = await fetch(site.external.runListEmbed, {
    next: { revalidate: 900 }, // refresh at most every 15 min
    headers: { "User-Agent": "StreamWebsite/1.0 (+https://thestream.com)" },
  });
  if (!res.ok) throw new Error(`Run list source returned ${res.status}`);
  const html = await res.text();

  const rows = [...html.matchAll(/<tr[^>]*>([\s\S]*?)<\/tr>/g)].map((m) => m[1]);
  const vehicles: Vehicle[] = [];

  for (const row of rows) {
    const cells = [...row.matchAll(/<td[^>]*>([\s\S]*?)<\/td>/g)].map((m) =>
      stripTags(m[1]),
    );
    if (cells.length < 9) continue; // header row (<th>) and any stray rows

    const platform = cells[8];
    const mileageDigits = cells[6].replace(/[^\d]/g, "");

    vehicles.push({
      idx: parseInt(cells[0], 10) || vehicles.length + 1,
      status: cells[1],
      vin: cells[2],
      year: parseInt(cells[3], 10) || null,
      make: cells[4],
      model: cells[5],
      mileage: mileageDigits ? parseInt(mileageDigits, 10) : null,
      mileageText: cells[6] || "—",
      date: cells[7],
      dateValue: parseDate(cells[7]),
      platform,
      channel: classifyChannel(platform),
    });
  }

  return {
    vehicles,
    total: vehicles.length,
    fetchedAt: new Date().toISOString(),
  };
}
