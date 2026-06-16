import type { Metadata } from "next";
import { site } from "@/lib/site";
import { fetchRunList, type RunList } from "@/lib/runlist";
import { PageHeader } from "@/components/ui";
import { RunListTable } from "@/components/RunListTable";

export const metadata: Metadata = {
  title: "Run List",
  description:
    "Browse vehicles currently on sale or scheduled from Stream Remarketing Services, in-lane and online. Sort and filter by status, year, mileage, and channel.",
};

// Refresh the cached page at most every 15 minutes.
export const revalidate = 900;

export default async function RunListPage() {
  let data: RunList | null = null;
  try {
    data = await fetchRunList();
  } catch {
    data = null;
  }

  const updated = data
    ? new Date(data.fetchedAt).toLocaleString("en-US", {
        timeZone: "America/Chicago",
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title="Run List"
        intro="Every vehicle Stream has on sale or scheduled, in-lane and online. Sort any column, filter by status or channel, or search by VIN, make, or model."
      />

      <section className="bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-14">
          {data ? (
            <>
              <div className="mb-6 flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-stream-grey-700">
                  <span className="font-display text-3xl font-extrabold text-stream-blue">
                    {data.total}
                  </span>{" "}
                  vehicles on sale or scheduled for sale
                </p>
                {updated && (
                  <p className="text-xs text-stream-grey">Updated {updated} CT</p>
                )}
              </div>

              <RunListTable vehicles={data.vehicles} />

              <p className="mt-6 text-center text-sm text-stream-grey-700">
                Questions on a unit? Email{" "}
                <a
                  className="font-semibold text-stream-blue hover:text-stream-blue-bright break-words"
                  href={`mailto:${site.emails.general}`}
                >
                  {site.emails.general}
                </a>{" "}
                or call{" "}
                <a
                  className="font-semibold text-stream-blue hover:text-stream-blue-bright"
                  href={`tel:${site.phones.main.replace(/\D/g, "")}`}
                >
                  {site.phones.main}
                </a>
                .
              </p>
            </>
          ) : (
            // Fallback: source unavailable to parse — embed it directly.
            <div className="overflow-hidden rounded-lg border border-stream-grey-300">
              <iframe
                src={site.external.runListEmbed}
                title="Stream Run List"
                loading="lazy"
                className="block w-full"
                style={{ height: 5800, border: "none" }}
              />
            </div>
          )}
        </div>
      </section>
    </>
  );
}
