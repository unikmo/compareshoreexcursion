import type { MetadataRoute } from "next";
import { ports } from "./ports/port-data";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://08waylo-temp.vercel.app";

  return [
    { url: baseUrl, changeFrequency: "weekly", priority: 1 },
    { url: `${baseUrl}/ports`, changeFrequency: "weekly", priority: 0.9 },
    ...ports.map((port) => ({
      url: `${baseUrl}/ports/${port.slug}`,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    })),
  ];
}
