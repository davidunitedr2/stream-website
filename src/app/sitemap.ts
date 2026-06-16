import type { MetadataRoute } from "next";
import { site } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ["", "/run-list", "/title-services", "/team", "/causes", "/contact", "/privacy", "/terms"];
  return routes.map((r) => ({
    url: `${site.url}${r}`,
    changeFrequency: "weekly",
    priority: r === "" ? 1 : 0.7,
  }));
}
