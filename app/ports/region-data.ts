import type { EditorialImage } from "./port-images";

export type RegionGuide = {
  slug: string;
  name: string;
  eyebrow: string;
  title: string;
  description: string;
  image: EditorialImage;
};

const unsplash = (photoId: string, alt: string, position = "center"): EditorialImage => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1800&q=86`,
  alt,
  position,
});

export const regionGuides: readonly RegionGuide[] = [
  {
    slug: "caribbean-bahamas",
    name: "Caribbean & Bahamas",
    eyebrow: "Reefs · beaches · island culture",
    title: "Caribbean & Bahamas shore excursions",
    description: "Clear-water escapes, private island drives and local culture across the region's most visited cruise calls.",
    image: unsplash("photo-1507525428034-b723cf961d3e", "Turquoise Caribbean water meeting a pale sand beach"),
  },
  {
    slug: "mediterranean-adriatic",
    name: "Mediterranean & Adriatic",
    eyebrow: "Old cities · coast · food",
    title: "Mediterranean & Adriatic shore excursions",
    description: "Historic cities, archaeological landmarks and coastal routes where timing and port transfers matter.",
    image: unsplash("photo-1570077188670-e3a8d69ac5ff", "Whitewashed Mediterranean buildings above the Aegean Sea"),
  },
  {
    slug: "alaska-pacific-coast",
    name: "Alaska & Pacific Coast",
    eyebrow: "Wildlife · glaciers · coastal routes",
    title: "Alaska & Pacific Coast shore excursions",
    description: "Wild landscapes, small coastal cities and port days built around wildlife, water and mountain scenery.",
    image: unsplash("photo-1464822759023-fed622ff2c3b", "Dramatic mountains and glacial scenery in Alaska"),
  },
  {
    slug: "northern-europe",
    name: "Northern Europe",
    eyebrow: "Fjords · design · living history",
    title: "Northern Europe shore excursions",
    description: "Walkable capitals, dramatic fjords and compact cultural days from Baltic, Atlantic and North Sea ports.",
    image: unsplash("photo-1521295121783-8a321d551ad2", "Historic streets and architecture in northern Europe"),
  },
  {
    slug: "asia-pacific",
    name: "Asia-Pacific",
    eyebrow: "Harbours · temples · island landscapes",
    title: "Asia-Pacific shore excursions",
    description: "Distinctive city harbours, temple routes and island landscapes across Asia, Australia and New Zealand.",
    image: unsplash("photo-1537996194471-e657df975ab4", "A lush temple landscape in the Asia-Pacific region"),
  },
  {
    slug: "middle-east",
    name: "Middle East",
    eyebrow: "Architecture · desert · heritage",
    title: "Middle East shore excursions",
    description: "Contemporary landmarks, old trading quarters and desert landscapes from the Gulf's leading cruise ports.",
    image: unsplash("photo-1500534314209-a25ddb2bd429", "Warm desert dunes beneath a clear sky"),
  },
  {
    slug: "africa-indian-ocean",
    name: "Africa & Indian Ocean",
    eyebrow: "Mountains · lagoons · food culture",
    title: "Africa & Indian Ocean shore excursions",
    description: "Big landscapes and layered local cultures, from Cape Town's peninsula to Mauritius's volcanic interior.",
    image: unsplash("photo-1483729558449-99ef09a8c325", "A dramatic African coastline between mountains and sea"),
  },
  {
    slug: "south-america",
    name: "South America",
    eyebrow: "Neighbourhoods · nature · live culture",
    title: "South America shore excursions",
    description: "Iconic cities and end-of-the-world landscapes shaped into realistic, port-aware independent days.",
    image: unsplash("photo-1488646953014-85cb44e25828", "A sweeping South American travel landscape"),
  },
];

export function getRegionGuide(slug: string) {
  return regionGuides.find((region) => region.slug === slug);
}

export function getRegionSlug(name: string) {
  return regionGuides.find((region) => region.name === name)?.slug;
}
