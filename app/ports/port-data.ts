export type ProviderLink = {
  label: string;
  url: string;
  source: "Viator" | "GetYourGuide" | "Independent" | "Cruise line";
};

export type ShortTour = {
  provider: "Viator" | "GetYourGuide" | "Independent";
  title: string;
  duration: string;
  price: string;
  note: string;
  url: string;
};

export type Port = {
  slug: string;
  name: string;
  region: string;
  country: string;
  image: string;
  imageAlt: string;
  intro: string;
  heroActivity: string;
  officialPrice: string;
  independentPrice: string;
  savings: string;
  officialDuration: string;
  independentDuration: string;
  activities: string[];
  providerLinks: ProviderLink[];
  shorterTours: ShortTour[];
};

const defaultShortTours = (portName: string): ShortTour[] => [
  {
    provider: "Viator",
    title: `${portName} express highlights`,
    duration: "2 hours",
    price: "from €39",
    note: "Shorter route with more return buffer before all aboard.",
    url: `https://www.viator.com/searchResults/all?text=${encodeURIComponent(portName + " shore excursion")}`,
  },
  {
    provider: "GetYourGuide",
    title: `${portName} small-group local tour`,
    duration: "2.5 hours",
    price: "from €54",
    note: "Good when the ship leaves earlier or you want a lighter port day.",
    url: `https://www.getyourguide.com/s/?q=${encodeURIComponent(portName + " shore excursion")}`,
  },
  {
    provider: "Independent",
    title: `${portName} private quick route`,
    duration: "3 hours",
    price: "from €75",
    note: "More control over timing, pickup, and return buffer.",
    url: `https://www.google.com/search?q=${encodeURIComponent(portName + " independent shore excursion private tour")}`,
  },
];

const providerLinks = (portName: string): ProviderLink[] => [
  {
    label: "Search Viator excursions",
    source: "Viator",
    url: `https://www.viator.com/searchResults/all?text=${encodeURIComponent(portName + " shore excursion")}`,
  },
  {
    label: "Search GetYourGuide tours",
    source: "GetYourGuide",
    url: `https://www.getyourguide.com/s/?q=${encodeURIComponent(portName + " shore excursion")}`,
  },
  {
    label: "Search independent local options",
    source: "Independent",
    url: `https://www.google.com/search?q=${encodeURIComponent(portName + " local shore excursion")}`,
  },
];

export const PORTS: Port[] = [
  {
    slug: "barcelona",
    name: "Barcelona",
    region: "Mediterranean",
    country: "Spain",
    image: "https://images.unsplash.com/photo-1583422409516-2895a77efded?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Barcelona city and Mediterranean skyline",
    intro: "Architecture, food, Gothic Quarter walks, and quick city highlights from one of Europe's busiest cruise ports.",
    heroActivity: "Barcelona city highlights",
    officialPrice: "€119",
    independentPrice: "€62",
    savings: "€57 per person",
    officialDuration: "4.5 hours",
    independentDuration: "4 hours",
    activities: ["City highlights", "Sagrada Família", "Gothic Quarter", "Food tour", "Montserrat"],
    providerLinks: providerLinks("Barcelona"),
    shorterTours: defaultShortTours("Barcelona"),
  },
  {
    slug: "cozumel",
    name: "Cozumel",
    region: "Caribbean",
    country: "Mexico",
    image: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Caribbean beach and blue water near Cozumel",
    intro: "Beach clubs, snorkel reefs, catamarans, Mayan culture, and flexible independent operators near the cruise piers.",
    heroActivity: "Cozumel beach and snorkel day",
    officialPrice: "€128",
    independentPrice: "€69",
    savings: "€59 per person",
    officialDuration: "5 hours",
    independentDuration: "4 hours",
    activities: ["Snorkeling", "Beach club", "Catamaran", "ATV tour", "Mayan ruins"],
    providerLinks: providerLinks("Cozumel"),
    shorterTours: defaultShortTours("Cozumel"),
  },
  {
    slug: "port-canaveral",
    name: "Port Canaveral",
    region: "Caribbean / Florida",
    country: "USA",
    image: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Rocket launch and Florida coast atmosphere for Port Canaveral",
    intro: "Kennedy Space Center, airboat tours, beach time, Orlando day trips, and private transfer-style port days.",
    heroActivity: "Kennedy Space Center",
    officialPrice: "€149",
    independentPrice: "€92",
    savings: "€57 per person",
    officialDuration: "4.5 hours",
    independentDuration: "4 hours",
    activities: ["Kennedy Space Center", "Airboat tour", "Beach day", "Orlando day trip", "Private transfer"],
    providerLinks: providerLinks("Port Canaveral"),
    shorterTours: defaultShortTours("Port Canaveral"),
  },
  {
    slug: "civitavecchia-rome",
    name: "Civitavecchia / Rome",
    region: "Mediterranean",
    country: "Italy",
    image: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Rome historic city view",
    intro: "Rome-in-a-day tours, Vatican routes, Colosseum highlights, and private driver comparisons from Civitavecchia.",
    heroActivity: "Rome from Civitavecchia",
    officialPrice: "€169",
    independentPrice: "€108",
    savings: "€61 per person",
    officialDuration: "9 hours",
    independentDuration: "8 hours",
    activities: ["Rome highlights", "Vatican", "Colosseum", "Private driver", "Food walk"],
    providerLinks: providerLinks("Civitavecchia Rome"),
    shorterTours: defaultShortTours("Civitavecchia Rome"),
  },
  {
    slug: "nassau",
    name: "Nassau",
    region: "Caribbean",
    country: "Bahamas",
    image: "https://images.unsplash.com/photo-1540541338287-41700207dee6?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Bahamas clear water and beach",
    intro: "Beach resorts, snorkel trips, Blue Lagoon, food tours, and shorter port-friendly independent options.",
    heroActivity: "Nassau beach day",
    officialPrice: "€109",
    independentPrice: "€64",
    savings: "€45 per person",
    officialDuration: "4 hours",
    independentDuration: "3.5 hours",
    activities: ["Beach day", "Blue Lagoon", "Snorkeling", "Food tour", "Island highlights"],
    providerLinks: providerLinks("Nassau shore excursion"),
    shorterTours: defaultShortTours("Nassau"),
  },
  {
    slug: "juneau",
    name: "Juneau",
    region: "Alaska",
    country: "USA",
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Mountain and water landscape similar to Alaska cruise scenery",
    intro: "Whale watching, glacier tours, helicopters, salmon bakes, and high-value independent Alaska operators.",
    heroActivity: "Juneau whale watching",
    officialPrice: "€189",
    independentPrice: "€139",
    savings: "€50 per person",
    officialDuration: "4 hours",
    independentDuration: "3.5 hours",
    activities: ["Whale watching", "Mendenhall Glacier", "Helicopter tour", "Salmon bake", "Nature walk"],
    providerLinks: providerLinks("Juneau shore excursion"),
    shorterTours: defaultShortTours("Juneau"),
  },
  {
    slug: "dubrovnik",
    name: "Dubrovnik",
    region: "Mediterranean",
    country: "Croatia",
    image: "https://images.unsplash.com/photo-1555990538-c48dbe64d4cf?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Dubrovnik old town and sea",
    intro: "Old Town walks, cable car views, island trips, Game of Thrones routes, and short independent tours.",
    heroActivity: "Dubrovnik Old Town walk",
    officialPrice: "€89",
    independentPrice: "€42",
    savings: "€47 per person",
    officialDuration: "3.5 hours",
    independentDuration: "2.5 hours",
    activities: ["Old Town", "Cable car", "City walls", "Lokrum", "Game of Thrones tour"],
    providerLinks: providerLinks("Dubrovnik shore excursion"),
    shorterTours: defaultShortTours("Dubrovnik"),
  },
  {
    slug: "santorini",
    name: "Santorini",
    region: "Mediterranean",
    country: "Greece",
    image: "https://images.unsplash.com/photo-1570077188670-e3a8d69ac5ff?auto=format&fit=crop&w=1400&q=80",
    imageAlt: "Santorini white buildings and sea",
    intro: "Oia views, wine tasting, caldera tours, and timing-sensitive routes back to the tender point.",
    heroActivity: "Oia and island highlights",
    officialPrice: "€129",
    independentPrice: "€78",
    savings: "€51 per person",
    officialDuration: "5 hours",
    independentDuration: "4 hours",
    activities: ["Oia", "Wine tasting", "Caldera", "Fira", "Beach stop"],
    providerLinks: providerLinks("Santorini shore excursion"),
    shorterTours: defaultShortTours("Santorini"),
  },
];

export function getPort(slug: string) {
  return PORTS.find((port) => port.slug === slug);
}
