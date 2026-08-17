import type { Activity, Port } from "./port-data";

export type EditorialImage = {
  src: string;
  alt: string;
  position?: string;
};

const unsplash = (photoId: string, alt: string, position = "center"): EditorialImage => ({
  src: `https://images.unsplash.com/${photoId}?auto=format&fit=crop&w=1600&q=84`,
  alt,
  position,
});

const portImages: Record<string, EditorialImage> = {
  roatan: unsplash("photo-1540202404-a2f29016b523", "Turquoise Caribbean water and a palm-lined island shore"),
  cozumel: unsplash("photo-1507525428034-b723cf961d3e", "Clear Caribbean water meeting a sandy island beach"),
  barcelona: unsplash("photo-1539037116277-4db20889f2d4", "Barcelona cityscape in warm Mediterranean light"),
  santorini: unsplash("photo-1570077188670-e3a8d69ac5ff", "Whitewashed Santorini buildings above the Aegean Sea"),
  juneau: unsplash("photo-1464822759023-fed622ff2c3b", "Dramatic mountain landscape in Alaska"),
  "civitavecchia-rome": unsplash("photo-1552832230-c0197dd311b5", "The Colosseum in Rome under a blue sky"),
  nassau: unsplash("photo-1510414842594-a61c69b5ae57", "Tropical beach and clear blue water in the Bahamas"),
};

const regionImages: Record<string, EditorialImage> = {
  "Caribbean & Bahamas": unsplash("photo-1507525428034-b723cf961d3e", "A bright Caribbean beach and turquoise water"),
  "Mediterranean & Adriatic": unsplash("photo-1516483638261-f4dbaf036963", "A sunlit Mediterranean destination"),
  "Alaska & Pacific Americas": unsplash("photo-1464822759023-fed622ff2c3b", "Mountain scenery in Alaska"),
  "Northern Europe": unsplash("photo-1501785888041-af3ef285b470", "A dramatic northern landscape"),
  "Asia-Pacific": unsplash("photo-1537996194471-e657df975ab4", "A lush temple landscape in the Asia-Pacific region"),
  "Africa, Middle East & South America": unsplash("photo-1483729558449-99ef09a8c325", "A dramatic coastal destination between mountains and sea"),
};

const activityImageGroups = [
  {
    terms: ["snorkel", "reef", "beach", "catamaran", "sail", "boat", "island", "lagoon", "water"],
    ids: ["photo-1540202404-a2f29016b523", "photo-1507525428034-b723cf961d3e", "photo-1510414842594-a61c69b5ae57"],
  },
  {
    terms: ["food", "rum", "tasting", "chocolate", "cacao", "cooking", "market", "wine", "brewery"],
    ids: ["photo-1504674900247-0877df9cc836", "photo-1414235077428-338989a2e8c0", "photo-1559339352-11d035aa65de"],
  },
  {
    terms: ["ruin", "history", "heritage", "culture", "museum", "temple", "old town", "art", "architecture"],
    ids: ["photo-1516483638261-f4dbaf036963", "photo-1539037116277-4db20889f2d4", "photo-1552832230-c0197dd311b5"],
  },
  {
    terms: ["rainforest", "waterfall", "mangrove", "cave", "mountain", "glacier", "nature", "wildlife", "sloth", "turtle", "whale"],
    ids: ["photo-1501785888041-af3ef285b470", "photo-1464822759023-fed622ff2c3b", "photo-1469474968028-56623f02e42e"],
  },
  {
    terms: ["driver", "drive", "private", "jeep", "highlights", "viewpoint", "countryside", "route"],
    ids: ["photo-1476514525535-07fb3b4ae5f1", "photo-1500530855697-b586d89ba3ee", "photo-1501785888041-af3ef285b470"],
  },
  {
    terms: ["kayak", "surf", "hike", "zip", "adventure", "bike", "fishing", "paddle"],
    ids: ["photo-1526772662000-3f88f10405ff", "photo-1500530855697-b586d89ba3ee", "photo-1469474968028-56623f02e42e"],
  },
] as const;

export function getPortImage(port: Pick<Port, "slug" | "name" | "region">): EditorialImage {
  return portImages[port.slug] ?? regionImages[port.region] ?? unsplash(
    "photo-1500530855697-b586d89ba3ee",
    `Travel inspiration for a port day in ${port.name}`,
  );
}

export function getActivityImage(
  port: Pick<Port, "slug" | "name" | "region">,
  activity: Activity,
  index: number,
): EditorialImage {
  const text = `${activity.title} ${activity.search}`.toLowerCase();
  const match = activityImageGroups.find((group) => group.terms.some((term) => text.includes(term)));

  if (!match) return getPortImage(port);

  const photoId = match.ids[index % match.ids.length];
  return unsplash(photoId, `Travel inspiration for ${activity.title} in ${port.name}`);
}
