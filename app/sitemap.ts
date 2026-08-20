import type { MetadataRoute } from "next";
import { ports } from "./ports/port-data";
import { regionGuides } from "./ports/region-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shoreexcursionpicks.com";

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ports`, changeFrequency: "weekly", priority: 0.9 },
    ...regionGuides.map((region) => ({
      url: `${baseUrl}/ports/regions/${region.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.85,
    })),
    ...ports.map((port) => ({
      url: `${baseUrl}/ports/${port.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
