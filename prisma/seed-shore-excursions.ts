// Seed scaffold for manual official cruise-line prices and mock independent offers.
// Wire to Prisma after adding the models to prisma/schema.prisma.

const ports = [
  { slug: "barcelona", name: "Barcelona", country: "Spain" },
  { slug: "cozumel", name: "Cozumel", country: "Mexico" },
  { slug: "port-canaveral", name: "Port Canaveral", country: "USA" },
];

const activities = [
  { portSlug: "barcelona", slug: "city-highlights", name: "City highlights", category: "CITY_TOUR" },
  { portSlug: "cozumel", slug: "snorkeling", name: "Snorkeling", category: "WATER" },
  { portSlug: "port-canaveral", slug: "kennedy-space-center", name: "Kennedy Space Center", category: "LANDMARK" },
];

const offers = [
  {
    portSlug: "barcelona",
    activitySlug: "city-highlights",
    provider: "Cruise line official",
    providerType: "OFFICIAL",
    title: "Barcelona city highlights",
    priceCents: 14900,
    currency: "EUR",
    durationMinutes: 270,
    pickupIncluded: true,
    returnToShipSignal: "Ship-backed timing protection",
    sourceType: "MANUAL_OFFICIAL_PRICE",
  },
  {
    portSlug: "barcelona",
    activitySlug: "city-highlights",
    provider: "Viator",
    providerType: "INDEPENDENT",
    title: "Barcelona highlights small-group tour",
    priceCents: 9200,
    currency: "EUR",
    durationMinutes: 240,
    pickupIncluded: false,
    rating: 4.7,
    reviewCount: 1120,
    returnToShipSignal: "Independent booking; check timing buffer",
    sourceType: "MOCK_AFFILIATE",
  },
];

console.log({ ports, activities, offers });
