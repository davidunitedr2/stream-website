"use client";

import { useMemo, useState } from "react";
import type { Vehicle, Channel } from "@/lib/runlist";

type SortKey = "idx" | "status" | "vin" | "year" | "make" | "model" | "mileage" | "dateValue" | "platform";
type SortDir = "asc" | "desc";

const COLUMNS: { key: SortKey; label: string; align?: "right"; mono?: boolean; hideSm?: boolean }[] = [
  { key: "idx", label: "#", hideSm: true },
  { key: "status", label: "Status" },
  { key: "vin", label: "VIN", mono: true },
  { key: "year", label: "Year", align: "right" },
  { key: "make", label: "Make" },
  { key: "model", label: "Model" },
  { key: "mileage", label: "Mileage", align: "right" },
  { key: "dateValue", label: "Sale Date", hideSm: true },
  { key: "platform", label: "Where it sells" },
];

const CHANNELS: (Channel | "All")[] = ["All", "Online", "In-lane", "Upcoming"];
const STATUSES = ["All", "On Sale", "Scheduled"] as const;

function compare(a: Vehicle, b: Vehicle, key: SortKey): number {
  const av = a[key];
  const bv = b[key];
  if (av == null && bv == null) return 0;
  if (av == null) return 1; // nulls last
  if (bv == null) return -1;
  if (typeof av === "number" && typeof bv === "number") return av - bv;
  return String(av).localeCompare(String(bv), undefined, { numeric: true });
}

export function RunListTable({ vehicles }: { vehicles: Vehicle[] }) {
  const [sortKey, setSortKey] = useState<SortKey>("idx");
  const [sortDir, setSortDir] = useState<SortDir>("asc");
  const [query, setQuery] = useState("");
  const [status, setStatus] = useState<(typeof STATUSES)[number]>("All");
  const [channel, setChannel] = useState<Channel | "All">("All");

  const rows = useMemo(() => {
    const q = query.trim().toLowerCase();
    let out = vehicles.filter((v) => {
      if (status !== "All" && v.status !== status) return false;
      if (channel !== "All" && v.channel !== channel) return false;
      if (q) {
        const hay = `${v.vin} ${v.make} ${v.model} ${v.year ?? ""} ${v.platform}`.toLowerCase();
        if (!hay.includes(q)) return false;
      }
      return true;
    });
    out = [...out].sort((a, b) => {
      const c = compare(a, b, sortKey);
      return sortDir === "asc" ? c : -c;
    });
    return out;
  }, [vehicles, query, status, channel, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (key === sortKey) {
      setSortDir((d) => (d === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      // sensible default direction: numeric/date desc-friendly, text asc
      setSortDir(key === "mileage" || key === "year" || key === "dateValue" ? "desc" : "asc");
    }
  }

  return (
    <div>
      {/* controls */}
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
        <div className="flex flex-wrap items-center gap-2">
          <FacetGroup label="Status" options={STATUSES as readonly string[]} value={status} onChange={(v) => setStatus(v as typeof status)} />
          <FacetGroup label="Channel" options={CHANNELS} value={channel} onChange={(v) => setChannel(v as Channel | "All")} />
        </div>
        <div className="relative w-full lg:w-72">
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search VIN, make, model…"
            className="w-full rounded-md border border-stream-grey-300 bg-white py-2.5 pl-9 pr-3 text-sm text-stream-ink outline-none focus:border-stream-blue focus:ring-2 focus:ring-stream-blue/20"
            aria-label="Search the run list"
          />
          <svg className="pointer-events-none absolute left-3 top-2.5 h-4 w-4 text-stream-grey" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="11" cy="11" r="7" />
            <line x1="21" y1="21" x2="16.65" y2="16.65" />
          </svg>
        </div>
      </div>

      <p className="mt-4 text-sm text-stream-grey-700">
        Showing <span className="font-semibold text-stream-ink">{rows.length}</span> of {vehicles.length} vehicles
      </p>

      {/* mobile: sort control (the table headers that sort on desktop are hidden below md) */}
      <div className="mt-3 flex items-center gap-2 md:hidden">
        <label htmlFor="rl-sort" className="font-display text-xs font-bold uppercase tracking-widest text-stream-grey-700">
          Sort
        </label>
        <select
          id="rl-sort"
          value={sortKey}
          onChange={(e) => setSortKey(e.target.value as SortKey)}
          className="flex-1 rounded-md border border-stream-grey-300 bg-white px-3 py-2 text-sm text-stream-ink focus:border-stream-blue"
        >
          {COLUMNS.map((c) => (
            <option key={c.key} value={c.key}>
              {c.key === "idx" ? "Run order" : c.label}
            </option>
          ))}
        </select>
        <button
          type="button"
          onClick={() => setSortDir((d) => (d === "asc" ? "desc" : "asc"))}
          aria-label={`Sort ${sortDir === "asc" ? "ascending" : "descending"}, tap to reverse`}
          className="inline-flex h-10 w-10 items-center justify-center rounded-md border border-stream-grey-300 bg-white text-stream-blue"
        >
          {sortDir === "asc" ? "▲" : "▼"}
        </button>
      </div>

      {/* desktop: table (md+) */}
      <div className="mt-3 hidden overflow-x-auto rounded-lg border border-stream-grey-300 md:block">
        <table className="w-full min-w-[760px] border-collapse text-sm">
          <thead>
            <tr className="bg-stream-blue text-white">
              {COLUMNS.map((col) => {
                const active = sortKey === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    className={`px-3 py-2.5 font-display text-xs font-bold uppercase tracking-wide ${
                      col.align === "right" ? "text-right" : "text-left"
                    } ${col.hideSm ? "hidden md:table-cell" : ""}`}
                  >
                    <button
                      type="button"
                      onClick={() => toggleSort(col.key)}
                      className={`inline-flex items-center gap-1 transition-colors hover:text-stream-lime ${
                        col.align === "right" ? "flex-row-reverse" : ""
                      } ${active ? "text-stream-lime" : ""}`}
                    >
                      {col.label}
                      <Sortcaret active={active} dir={sortDir} />
                    </button>
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {rows.map((v, i) => (
              <tr
                key={`${v.vin}-${v.idx}`}
                className={`border-t border-stream-grey-300 transition-colors hover:bg-stream-blue-100 ${
                  i % 2 ? "bg-stream-paper" : "bg-white"
                }`}
              >
                <td className="hidden px-3 py-2 text-stream-grey md:table-cell">{v.idx}</td>
                <td className="px-3 py-2">
                  <StatusPill status={v.status} />
                </td>
                <td className="px-3 py-2 font-mono text-xs text-stream-grey-700">{v.vin}</td>
                <td className="px-3 py-2 text-right tabular-nums">{v.year ?? "—"}</td>
                <td className="px-3 py-2 font-medium text-stream-ink">{v.make}</td>
                <td className="px-3 py-2 text-stream-grey-700">{v.model}</td>
                <td className="px-3 py-2 text-right tabular-nums text-stream-grey-700">{v.mileageText}</td>
                <td className="hidden px-3 py-2 text-stream-grey-700 md:table-cell">{v.date || "—"}</td>
                <td className="px-3 py-2">
                  <PlatformTag vehicle={v} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* mobile: card list (below md) */}
      <ul className="mt-3 space-y-3 md:hidden">
        {rows.map((v) => (
          <li
            key={`${v.vin}-${v.idx}`}
            className="rounded-lg border border-stream-grey-300 bg-white p-4"
          >
            <div className="flex items-start justify-between gap-3">
              <p className="font-display text-base font-bold text-stream-ink">
                {v.year ?? "—"} {v.make}{" "}
                <span className="font-medium text-stream-grey-700">{v.model}</span>
              </p>
              <StatusPill status={v.status} />
            </div>
            <p className="mt-1 font-mono text-xs text-stream-grey-700">{v.vin}</p>
            <dl className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-stream-grey-700">Mileage</dt>
                <dd className="tabular-nums text-stream-ink">{v.mileageText}</dd>
              </div>
              <div>
                <dt className="text-xs font-semibold uppercase tracking-wide text-stream-grey-700">Sale date</dt>
                <dd className="tabular-nums text-stream-ink">{v.date || "—"}</dd>
              </div>
            </dl>
            <div className="mt-3">
              <PlatformTag vehicle={v} />
            </div>
          </li>
        ))}
      </ul>

      {rows.length === 0 && (
        <p className="mt-3 rounded-lg border border-stream-grey-300 px-3 py-10 text-center text-stream-grey-700">
          No vehicles match your filters.
        </p>
      )}
    </div>
  );
}

function Sortcaret({ active, dir }: { active: boolean; dir: SortDir }) {
  return (
    <span className={`text-[0.65rem] leading-none ${active ? "opacity-100" : "opacity-30"}`}>
      {active ? (dir === "asc" ? "▲" : "▼") : "▲"}
    </span>
  );
}

function StatusPill({ status }: { status: string }) {
  const onSale = /on sale/i.test(status);
  return (
    <span
      className={`inline-block whitespace-nowrap rounded-full px-2 py-0.5 text-xs font-semibold ${
        onSale ? "bg-stream-lime/20 text-[#5a7a08]" : "bg-stream-blue-100 text-stream-blue"
      }`}
    >
      {status}
    </span>
  );
}

function PlatformTag({ vehicle }: { vehicle: Vehicle }) {
  const { platform, channel } = vehicle;
  const color =
    channel === "Online"
      ? "border-stream-blue/30 text-stream-blue"
      : channel === "Upcoming"
        ? "border-stream-grey-300 text-stream-grey-700 italic"
        : "border-stream-grey-300 text-stream-grey-700";
  return (
    <span className={`inline-block rounded border px-2 py-0.5 text-xs ${color}`}>
      {platform || "—"}
    </span>
  );
}

function FacetGroup({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex items-center gap-1.5">
      <span className="font-display text-xs font-bold uppercase tracking-widest text-stream-grey">
        {label}
      </span>
      <div className="flex rounded-md border border-stream-grey-300 p-0.5">
        {options.map((opt) => (
          <button
            key={opt}
            type="button"
            onClick={() => onChange(opt)}
            className={`rounded px-2.5 py-1 text-xs font-semibold transition-colors ${
              value === opt
                ? "bg-stream-blue text-white"
                : "text-stream-grey-700 hover:bg-stream-blue-100"
            }`}
          >
            {opt}
          </button>
        ))}
      </div>
    </div>
  );
}
