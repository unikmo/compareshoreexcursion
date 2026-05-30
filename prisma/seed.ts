import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const platformFeeRate = 0.15;

function localIsoDate(value = new Date()) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

type LocationSeed = {
  key: string;
  cityKey: string;
  name: string;
  displayName: string;
  locationType: string;
  shortCode?: string;
  type: string;
  bookingEnabled?: boolean;
};

type RouteSeed = {
  key: string;
  originKey: string;
  destinationKey: string;
  standard: number;
  flex: number;
  minutes: number;
  transferMin: number;
  transferMax: number;
  rideshareLow: number;
  rideshareHigh: number;
};

type OperatorSeed = {
  key: string;
  cityKey: string;
  companyName: string;
};

const countries = [
  { key: "us", code: "US", name: "United States" },
  { key: "es", code: "ES", name: "Spain" },
  { key: "de", code: "DE", name: "Germany" },
];

const regions = [
  { key: "fl", countryKey: "us", code: "FL", name: "Florida" },
  { key: "ny", countryKey: "us", code: "NY", name: "New York" },
  { key: "nv", countryKey: "us", code: "NV", name: "Nevada" },
  { key: "ct", countryKey: "es", code: "CT", name: "Catalonia" },
  { key: "be", countryKey: "de", code: "BE", name: "Berlin" },
];

const cities = [
  { key: "miami", regionKey: "fl", name: "Miami" },
  { key: "orlando", regionKey: "fl", name: "Orlando" },
  { key: "new-york", regionKey: "ny", name: "New York" },
  { key: "las-vegas", regionKey: "nv", name: "Las Vegas" },
  { key: "barcelona", regionKey: "ct", name: "Barcelona" },
  { key: "berlin", regionKey: "be", name: "Berlin" },
];

const locations: LocationSeed[] = [
  { key: "mia", cityKey: "miami", name: "Miami International Airport", displayName: "MIA Airport", locationType: "AIRPORT", shortCode: "MIA", type: "AIRPORT", bookingEnabled: true },
  { key: "fll", cityKey: "miami", name: "Fort Lauderdale-Hollywood International Airport", displayName: "FLL Airport", locationType: "AIRPORT", shortCode: "FLL", type: "AIRPORT", bookingEnabled: true },
  { key: "port-miami", cityKey: "miami", name: "PortMiami Cruise Terminal", displayName: "PortMiami", locationType: "CRUISE", type: "CRUISE_TERMINAL", bookingEnabled: true },
  { key: "port-everglades", cityKey: "miami", name: "Port Everglades Cruise Terminal", displayName: "Port Everglades", locationType: "CRUISE", type: "CRUISE_TERMINAL", bookingEnabled: true },
  { key: "miami-beach-convention", cityKey: "miami", name: "Miami Beach Convention Center", displayName: "Miami Beach Convention", locationType: "EVENT", type: "CONVENTION_CENTER" },
  { key: "brickell", cityKey: "miami", name: "Brickell Transportation Hub", displayName: "Brickell", locationType: "CITY", type: "TRANSIT_HUB", bookingEnabled: true },
  { key: "downtown-miami", cityKey: "miami", name: "Downtown Miami Transportation Hub", displayName: "Downtown Miami", locationType: "CITY", type: "TRANSIT_HUB", bookingEnabled: true },
  { key: "miami-beach", cityKey: "miami", name: "Miami Beach Hotel Zone", displayName: "Miami Beach", locationType: "CITY", type: "HOTEL_ZONE", bookingEnabled: true },
  { key: "jfk", cityKey: "new-york", name: "John F. Kennedy International Airport", displayName: "JFK Airport", locationType: "AIRPORT", shortCode: "JFK", type: "AIRPORT", bookingEnabled: true },
  { key: "lga", cityKey: "new-york", name: "LaGuardia Airport", displayName: "LGA Airport", locationType: "AIRPORT", shortCode: "LGA", type: "AIRPORT", bookingEnabled: true },
  { key: "ewr", cityKey: "new-york", name: "Newark Liberty International Airport", displayName: "Newark Airport", locationType: "AIRPORT", shortCode: "EWR", type: "AIRPORT", bookingEnabled: true },
  { key: "manhattan-cruise", cityKey: "new-york", name: "Manhattan Cruise Terminal", displayName: "Manhattan Cruise", locationType: "CRUISE", type: "CRUISE_TERMINAL", bookingEnabled: true },
  { key: "manhattan-midtown", cityKey: "new-york", name: "Manhattan Midtown", displayName: "Manhattan Midtown", locationType: "CITY", type: "CITY_CENTER", bookingEnabled: true },
  { key: "cape-liberty", cityKey: "new-york", name: "Cape Liberty Cruise Port", displayName: "Cape Liberty", locationType: "CRUISE", type: "CRUISE_TERMINAL", bookingEnabled: true },
  { key: "javits", cityKey: "new-york", name: "Javits Center", displayName: "Javits Center", locationType: "EVENT", type: "CONVENTION_CENTER", bookingEnabled: true },
  { key: "penn-station", cityKey: "new-york", name: "Penn Station", displayName: "Penn Station", locationType: "STATION", type: "TRANSIT_HUB" },
  { key: "grand-central", cityKey: "new-york", name: "Grand Central Terminal", displayName: "Grand Central", locationType: "STATION", type: "TRANSIT_HUB" },
  { key: "port-authority", cityKey: "new-york", name: "Port Authority Bus Terminal", displayName: "Port Authority", locationType: "STATION", type: "TRANSIT_HUB" },
  { key: "las-airport", cityKey: "las-vegas", name: "Harry Reid International Airport", displayName: "LAS Airport", locationType: "AIRPORT", shortCode: "LAS", type: "AIRPORT", bookingEnabled: true },
  { key: "las-convention", cityKey: "las-vegas", name: "Las Vegas Convention Center", displayName: "Las Vegas Convention", locationType: "EVENT", type: "CONVENTION_CENTER", bookingEnabled: true },
  { key: "allegiant", cityKey: "las-vegas", name: "Allegiant Stadium", displayName: "Allegiant Stadium", locationType: "EVENT", type: "STADIUM", bookingEnabled: true },
  { key: "strip", cityKey: "las-vegas", name: "Las Vegas Strip Hotel Zone", displayName: "Las Vegas Strip", locationType: "CITY", type: "HOTEL_ZONE", bookingEnabled: true },
  { key: "mco", cityKey: "orlando", name: "Orlando International Airport", displayName: "MCO Airport", locationType: "AIRPORT", shortCode: "MCO", type: "AIRPORT", bookingEnabled: true },
  { key: "occc", cityKey: "orlando", name: "Orange County Convention Center", displayName: "Orange County Convention", locationType: "EVENT", type: "CONVENTION_CENTER" },
  { key: "port-canaveral", cityKey: "orlando", name: "Port Canaveral Cruise Terminal", displayName: "Port Canaveral", locationType: "CRUISE", type: "CRUISE_TERMINAL", bookingEnabled: true },
  { key: "disney-resort", cityKey: "orlando", name: "Disney/Resort Area Hub", displayName: "Disney/Resort Area", locationType: "CITY", type: "HOTEL_ZONE", bookingEnabled: true },
  { key: "bcn", cityKey: "barcelona", name: "Barcelona Airport", displayName: "Barcelona Airport", locationType: "AIRPORT", shortCode: "BCN", type: "AIRPORT", bookingEnabled: true },
  { key: "port-barcelona", cityKey: "barcelona", name: "Port of Barcelona Cruise Terminal", displayName: "Barcelona Port", locationType: "CRUISE", type: "CRUISE_TERMINAL", bookingEnabled: true },
  { key: "barcelona-center", cityKey: "barcelona", name: "Barcelona City Center", displayName: "Barcelona City Center", locationType: "CITY", type: "CITY_CENTER", bookingEnabled: true },
  { key: "fira-barcelona", cityKey: "barcelona", name: "Fira Barcelona Gran Via", displayName: "Fira Barcelona", locationType: "EVENT", type: "CONVENTION_CENTER", bookingEnabled: true },
  { key: "barcelona-sants", cityKey: "barcelona", name: "Barcelona Sants Station", displayName: "Barcelona Sants", locationType: "STATION", type: "TRANSIT_HUB" },
];

const operatorSeeds: OperatorSeed[] = [
  { key: "south-florida-shuttle", cityKey: "miami", companyName: "South Florida Shuttle Co." },
  { key: "miami-port-transfer", cityKey: "miami", companyName: "Miami Port Transfer Group" },
  { key: "everglades-van", cityKey: "miami", companyName: "Everglades Van Service" },
  { key: "nyc-airport-shuttle", cityKey: "new-york", companyName: "NYC Airport Shuttle Partners" },
  { key: "hudson-transfer", cityKey: "new-york", companyName: "Hudson Transfer Co." },
  { key: "metro-port-shuttle", cityKey: "new-york", companyName: "Metro Port Shuttle" },
  { key: "orlando-resort-shuttle", cityKey: "orlando", companyName: "Orlando Resort Shuttle Co." },
  { key: "central-florida-transfer", cityKey: "orlando", companyName: "Central Florida Transfer Group" },
  { key: "vegas-convention-shuttle", cityKey: "las-vegas", companyName: "Vegas Convention Shuttle" },
  { key: "strip-airport-transfers", cityKey: "las-vegas", companyName: "Strip Airport Transfers" },
  { key: "barcelona-port-transfers", cityKey: "barcelona", companyName: "Barcelona Port Transfers" },
  { key: "bcn-shuttle-partners", cityKey: "barcelona", companyName: "BCN Shuttle Partners" },
  { key: "catalonia-airport-shuttle", cityKey: "barcelona", companyName: "Catalonia Airport Shuttle" },
];

const activeRoutes: RouteSeed[] = [
  { key: "mia-port-miami", originKey: "mia", destinationKey: "port-miami", standard: 3400, flex: 4900, minutes: 30, transferMin: 35, transferMax: 45, rideshareLow: 5200, rideshareHigh: 7800 },
  { key: "port-miami-mia", originKey: "port-miami", destinationKey: "mia", standard: 3600, flex: 5100, minutes: 45, transferMin: 35, transferMax: 50, rideshareLow: 5600, rideshareHigh: 8200 },
  { key: "fll-port-miami", originKey: "fll", destinationKey: "port-miami", standard: 6900, flex: 8400, minutes: 60, transferMin: 45, transferMax: 70, rideshareLow: 9800, rideshareHigh: 14500 },
  { key: "port-miami-fll", originKey: "port-miami", destinationKey: "fll", standard: 7200, flex: 8700, minutes: 60, transferMin: 45, transferMax: 70, rideshareLow: 10200, rideshareHigh: 15000 },
  { key: "fll-port-everglades", originKey: "fll", destinationKey: "port-everglades", standard: 3500, flex: 5000, minutes: 30, transferMin: 20, transferMax: 35, rideshareLow: 4800, rideshareHigh: 7000 },
  { key: "port-everglades-fll", originKey: "port-everglades", destinationKey: "fll", standard: 3700, flex: 5200, minutes: 45, transferMin: 20, transferMax: 35, rideshareLow: 5000, rideshareHigh: 7200 },
  { key: "mia-port-everglades", originKey: "mia", destinationKey: "port-everglades", standard: 7600, flex: 9100, minutes: 60, transferMin: 45, transferMax: 75, rideshareLow: 10800, rideshareHigh: 16000 },
  { key: "port-everglades-mia", originKey: "port-everglades", destinationKey: "mia", standard: 7900, flex: 9400, minutes: 60, transferMin: 45, transferMax: 75, rideshareLow: 11200, rideshareHigh: 16400 },
  { key: "mia-downtown", originKey: "mia", destinationKey: "downtown-miami", standard: 2800, flex: 4300, minutes: 30, transferMin: 25, transferMax: 40, rideshareLow: 4200, rideshareHigh: 6500 },
  { key: "mia-miami-beach", originKey: "mia", destinationKey: "miami-beach", standard: 3200, flex: 4700, minutes: 30, transferMin: 30, transferMax: 50, rideshareLow: 5200, rideshareHigh: 7800 },
  { key: "mia-brickell", originKey: "mia", destinationKey: "brickell", standard: 3400, flex: 4900, minutes: 30, transferMin: 25, transferMax: 40, rideshareLow: 5000, rideshareHigh: 7600 },
  { key: "bcn-port-barcelona", originKey: "bcn", destinationKey: "port-barcelona", standard: 3900, flex: 5400, minutes: 45, transferMin: 35, transferMax: 45, rideshareLow: 5800, rideshareHigh: 8600 },
  { key: "port-barcelona-bcn", originKey: "port-barcelona", destinationKey: "bcn", standard: 4100, flex: 5600, minutes: 45, transferMin: 35, transferMax: 50, rideshareLow: 6000, rideshareHigh: 8800 },
  { key: "bcn-barcelona-center", originKey: "bcn", destinationKey: "barcelona-center", standard: 2900, flex: 4400, minutes: 30, transferMin: 25, transferMax: 40, rideshareLow: 4300, rideshareHigh: 6500 },
  { key: "barcelona-center-bcn", originKey: "barcelona-center", destinationKey: "bcn", standard: 3100, flex: 4600, minutes: 30, transferMin: 25, transferMax: 45, rideshareLow: 4500, rideshareHigh: 6800 },
  { key: "bcn-fira-barcelona", originKey: "bcn", destinationKey: "fira-barcelona", standard: 2600, flex: 4100, minutes: 30, transferMin: 15, transferMax: 25, rideshareLow: 3900, rideshareHigh: 5900 },
  { key: "fira-barcelona-bcn", originKey: "fira-barcelona", destinationKey: "bcn", standard: 2800, flex: 4300, minutes: 30, transferMin: 15, transferMax: 30, rideshareLow: 4100, rideshareHigh: 6200 },
  { key: "jfk-manhattan-cruise", originKey: "jfk", destinationKey: "manhattan-cruise", standard: 4400, flex: 5900, minutes: 60, transferMin: 45, transferMax: 75, rideshareLow: 8500, rideshareHigh: 13000 },
  { key: "manhattan-cruise-jfk", originKey: "manhattan-cruise", destinationKey: "jfk", standard: 4600, flex: 6100, minutes: 60, transferMin: 45, transferMax: 80, rideshareLow: 8800, rideshareHigh: 13400 },
  { key: "jfk-manhattan-midtown", originKey: "jfk", destinationKey: "manhattan-midtown", standard: 4200, flex: 5700, minutes: 60, transferMin: 45, transferMax: 75, rideshareLow: 8200, rideshareHigh: 12800 },
  { key: "manhattan-midtown-jfk", originKey: "manhattan-midtown", destinationKey: "jfk", standard: 4400, flex: 5900, minutes: 60, transferMin: 45, transferMax: 80, rideshareLow: 8500, rideshareHigh: 13200 },
  { key: "lga-manhattan-midtown", originKey: "lga", destinationKey: "manhattan-midtown", standard: 3600, flex: 5100, minutes: 60, transferMin: 30, transferMax: 60, rideshareLow: 7200, rideshareHigh: 11200 },
  { key: "manhattan-midtown-lga", originKey: "manhattan-midtown", destinationKey: "lga", standard: 3800, flex: 5300, minutes: 60, transferMin: 30, transferMax: 65, rideshareLow: 7500, rideshareHigh: 11600 },
  { key: "ewr-manhattan-midtown", originKey: "ewr", destinationKey: "manhattan-midtown", standard: 4300, flex: 5800, minutes: 60, transferMin: 40, transferMax: 70, rideshareLow: 8400, rideshareHigh: 13000 },
  { key: "manhattan-midtown-ewr", originKey: "manhattan-midtown", destinationKey: "ewr", standard: 4500, flex: 6000, minutes: 60, transferMin: 40, transferMax: 75, rideshareLow: 8700, rideshareHigh: 13400 },
  { key: "lga-manhattan-cruise", originKey: "lga", destinationKey: "manhattan-cruise", standard: 3900, flex: 5400, minutes: 60, transferMin: 35, transferMax: 65, rideshareLow: 7600, rideshareHigh: 11800 },
  { key: "ewr-cape-liberty", originKey: "ewr", destinationKey: "cape-liberty", standard: 3400, flex: 4900, minutes: 60, transferMin: 25, transferMax: 45, rideshareLow: 6800, rideshareHigh: 9800 },
  { key: "mco-disney-resort", originKey: "mco", destinationKey: "disney-resort", standard: 2800, flex: 4300, minutes: 30, transferMin: 25, transferMax: 40, rideshareLow: 5200, rideshareHigh: 8200 },
  { key: "disney-resort-mco", originKey: "disney-resort", destinationKey: "mco", standard: 3000, flex: 4500, minutes: 30, transferMin: 25, transferMax: 45, rideshareLow: 5400, rideshareHigh: 8500 },
  { key: "mco-port-canaveral", originKey: "mco", destinationKey: "port-canaveral", standard: 6400, flex: 7900, minutes: 60, transferMin: 50, transferMax: 75, rideshareLow: 11000, rideshareHigh: 16500 },
  { key: "port-canaveral-mco", originKey: "port-canaveral", destinationKey: "mco", standard: 6600, flex: 8100, minutes: 60, transferMin: 50, transferMax: 80, rideshareLow: 11400, rideshareHigh: 17000 },
  { key: "las-airport-strip", originKey: "las-airport", destinationKey: "strip", standard: 1800, flex: 3300, minutes: 30, transferMin: 15, transferMax: 30, rideshareLow: 3600, rideshareHigh: 6200 },
  { key: "strip-las-airport", originKey: "strip", destinationKey: "las-airport", standard: 2000, flex: 3500, minutes: 30, transferMin: 15, transferMax: 35, rideshareLow: 3800, rideshareHigh: 6600 },
  { key: "las-airport-convention", originKey: "las-airport", destinationKey: "las-convention", standard: 2200, flex: 3700, minutes: 30, transferMin: 20, transferMax: 35, rideshareLow: 4200, rideshareHigh: 7000 },
  { key: "las-convention-airport", originKey: "las-convention", destinationKey: "las-airport", standard: 2400, flex: 3900, minutes: 30, transferMin: 20, transferMax: 40, rideshareLow: 4500, rideshareHigh: 7400 },
  { key: "las-airport-allegiant", originKey: "las-airport", destinationKey: "allegiant", standard: 2400, flex: 3900, minutes: 30, transferMin: 20, transferMax: 35, rideshareLow: 4400, rideshareHigh: 7200 },
  { key: "allegiant-las-airport", originKey: "allegiant", destinationKey: "las-airport", standard: 2600, flex: 4100, minutes: 30, transferMin: 20, transferMax: 40, rideshareLow: 4700, rideshareHigh: 7600 },
];

function locationLabel(location: { displayName: string; shortCode: string | null }) {
  return location.displayName;
}

function centsWithFee(baseCents: number, passengers: number) {
  const totalAmountCents = baseCents * passengers;
  const marketplaceFeeCents = Math.round(totalAmountCents * platformFeeRate);
  const operatorPayoutCents = totalAmountCents - marketplaceFeeCents;
  return { totalAmountCents, marketplaceFeeCents, operatorPayoutCents, platformRevenueCents: marketplaceFeeCents };
}

async function main() {
  const countryByKey = new Map<string, { id: string }>();
  for (const item of countries) {
    countryByKey.set(item.key, await prisma.country.upsert({ where: { code: item.code }, update: { name: item.name }, create: { code: item.code, name: item.name } }));
  }

  const regionByKey = new Map<string, { id: string }>();
  for (const item of regions) {
    const country = countryByKey.get(item.countryKey)!;
    regionByKey.set(item.key, await prisma.region.upsert({
      where: { countryId_code: { countryId: country.id, code: item.code } },
      update: { name: item.name },
      create: { countryId: country.id, code: item.code, name: item.name },
    }));
  }

  const cityByKey = new Map<string, { id: string }>();
  for (const item of cities) {
    const region = regionByKey.get(item.regionKey)!;
    cityByKey.set(item.key, await prisma.city.upsert({
      where: { regionId_name: { regionId: region.id, name: item.name } },
      update: {},
      create: { regionId: region.id, name: item.name },
    }));
  }

  await prisma.location.updateMany({
    where: { cityId: cityByKey.get("barcelona")!.id, name: "Port of Barcelona" },
    data: { bookingEnabled: false },
  });

  const locationByKey = new Map<string, { id: string; displayName: string; shortCode: string | null }>();
  for (const item of locations) {
    const city = cityByKey.get(item.cityKey)!;
    locationByKey.set(item.key, await prisma.location.upsert({
      where: { cityId_name: { cityId: city.id, name: item.name } },
      update: { displayName: item.displayName, locationType: item.locationType, shortCode: item.shortCode, type: item.type, bookingEnabled: item.bookingEnabled ?? false },
      create: { cityId: city.id, name: item.name, displayName: item.displayName, locationType: item.locationType, shortCode: item.shortCode, type: item.type, bookingEnabled: item.bookingEnabled ?? false },
    }));
  }

  const adminUser = await upsertUser("admin@shuttleflow.local", "ShuttleFlow Admin", "ADMIN");
  const customerUser = await upsertUser("customer@shuttleflow.local", "Jordan Customer", "CUSTOMER");
  const customer = await prisma.customerProfile.upsert({
    where: { userId: customerUser.id },
    update: { phone: "+1-555-0100" },
    create: { userId: customerUser.id, phone: "+1-555-0100" },
  });

  const operatorByKey = new Map<string, { id: string; userId: string; cityKey: string; companyName: string }>();
  for (const item of operatorSeeds) {
    const operator = await upsertOperator(item);
    operatorByKey.set(item.key, { ...operator, cityKey: item.cityKey, companyName: item.companyName });
  }

  const routeByKey = new Map<string, { id: string }>();
  for (const item of activeRoutes) {
    const origin = locationByKey.get(item.originKey)!;
    const destination = locationByKey.get(item.destinationKey)!;
    const displayName = `${locationLabel(origin)} to ${locationLabel(destination)}`;
    const route = await prisma.route.upsert({
      where: { originLocationId_destinationLocationId: { originLocationId: origin.id, destinationLocationId: destination.id } },
      update: { name: displayName, displayName, defaultPriceCents: item.standard, adminFallbackPriceCents: item.standard, estimatedTransferMinMinutes: item.transferMin, estimatedTransferMaxMinutes: item.transferMax, estimatedRideshareLowCents: item.rideshareLow, estimatedRideshareHighCents: item.rideshareHigh, active: true },
      create: { originLocationId: origin.id, destinationLocationId: destination.id, name: displayName, displayName, defaultPriceCents: item.standard, adminFallbackPriceCents: item.standard, estimatedTransferMinMinutes: item.transferMin, estimatedTransferMaxMinutes: item.transferMax, estimatedRideshareLowCents: item.rideshareLow, estimatedRideshareHighCents: item.rideshareHigh, active: true },
    });
    routeByKey.set(item.key, route);
  }

  for (const [forward, reverse] of [
    ["mia-port-miami", "port-miami-mia"],
    ["fll-port-miami", "port-miami-fll"],
    ["fll-port-everglades", "port-everglades-fll"],
    ["mia-port-everglades", "port-everglades-mia"],
    ["bcn-port-barcelona", "port-barcelona-bcn"],
    ["bcn-barcelona-center", "barcelona-center-bcn"],
    ["bcn-fira-barcelona", "fira-barcelona-bcn"],
    ["jfk-manhattan-cruise", "manhattan-cruise-jfk"],
    ["jfk-manhattan-midtown", "manhattan-midtown-jfk"],
    ["lga-manhattan-midtown", "manhattan-midtown-lga"],
    ["ewr-manhattan-midtown", "manhattan-midtown-ewr"],
    ["mco-disney-resort", "disney-resort-mco"],
    ["mco-port-canaveral", "port-canaveral-mco"],
    ["las-airport-strip", "strip-las-airport"],
    ["las-airport-convention", "las-convention-airport"],
    ["las-airport-allegiant", "allegiant-las-airport"],
  ]) {
    const forwardRoute = routeByKey.get(forward)!;
    const reverseRoute = routeByKey.get(reverse)!;
    await prisma.route.update({ where: { id: forwardRoute.id }, data: { reverseRouteId: reverseRoute.id, isBidirectional: true } });
    await prisma.route.update({ where: { id: reverseRoute.id }, data: { reverseRouteId: forwardRoute.id, isBidirectional: true } });
  }

  const vehicleByOperatorKey = new Map<string, { id: string }>();
  const driverByOperatorKey = new Map<string, { id: string }>();
  for (const [key, operator] of operatorByKey) {
    vehicleByOperatorKey.set(key, await upsertVehicle(operator.id, "Mercedes", "Sprinter", "white", `${key.slice(0, 2).toUpperCase()}-${operator.id.slice(0, 4)}`, 15));
    driverByOperatorKey.set(key, await upsertDriver(`${key}.driver@shuttleflow.local`, `${operator.companyName} Driver`, operator.id));
  }

  for (const item of activeRoutes) {
    const route = routeByKey.get(item.key)!;
    const cityKey = locations.find((location) => location.key === item.originKey)!.cityKey;
    const cityOperators = Array.from(operatorByKey.values()).filter((operator) => operator.cityKey === cityKey);
    const primaryOperator = cityOperators[0] ?? Array.from(operatorByKey.values())[0];
    const secondaryOperator = cityOperators[1];
    await prisma.operatorRoute.upsert({
      where: { operatorId_routeId: { operatorId: primaryOperator.id, routeId: route.id } },
      update: { enabled: true },
      create: { operatorId: primaryOperator.id, routeId: route.id, enabled: true },
    });
    if (secondaryOperator) {
      await prisma.operatorRoute.upsert({
        where: { operatorId_routeId: { operatorId: secondaryOperator.id, routeId: route.id } },
        update: { enabled: true },
        create: { operatorId: secondaryOperator.id, routeId: route.id, enabled: true },
      });
    }
    await upsertPricingRule(route.id, primaryOperator.id, "STANDARD", item.standard, "OPERATOR_RULE");
    await upsertPricingRule(route.id, primaryOperator.id, "FLEX", item.flex, "OPERATOR_RULE");
    await upsertPricingRule(route.id, null, "STANDARD", item.standard, "ROUTE_DEFAULT");
    await upsertPricingRule(route.id, null, "FLEX", item.flex, "ROUTE_DEFAULT");
    const seededDepartures = serviceDeparturesForMayAndJune(item.minutes);
    for (const departureAt of seededDepartures) {
      await upsertDeparture(route.id, departureAt, item.minutes <= 30 ? 12 : 15);
    }
    const origin = locationByKey.get(item.originKey)!;
    const destination = locationByKey.get(item.destinationKey)!;
    console.log(`Seeded route: ${origin.displayName} to ${destination.displayName} - ${seededDepartures.length} departures`);
  }

  await ensureDeparturesForAllActiveRoutes();

  const legacyOperators = await prisma.operatorProfile.findMany({
    where: { companyName: { in: ["Atlantic Shuttle Co.", "Bayside Transfers"] } },
  });
  for (const operator of legacyOperators) {
    for (const route of routeByKey.values()) {
      await prisma.operatorRoute.updateMany({
        where: { operatorId: operator.id, routeId: route.id },
        data: { enabled: false },
      });
    }
  }

  const operatorOne = operatorByKey.get("south-florida-shuttle")!;
  const operatorOneUser = await prisma.user.findFirst({ where: { id: operatorOne.userId } });
  const vehicleOne = vehicleByOperatorKey.get("south-florida-shuttle")!;
  const driverOne = driverByOperatorKey.get("south-florida-shuttle")!;

  await seedEvents(cityByKey, locationByKey);
  await seedCruiseSchedules(locationByKey);

  const sampleRoute = routeByKey.get("mia-brickell")!;
  const sampleDeparture = await prisma.routeDeparture.findFirst({ where: { routeId: sampleRoute.id }, orderBy: { departureAt: "asc" } });
  if (!sampleDeparture) throw new Error("Seed expected a sample departure for the Miami to Brickell route.");
  const sampleAmounts = centsWithFee(3400, 4);
  const existingBooking = await prisma.booking.findFirst({
    where: { customerId: customer.id, routeId: sampleRoute.id, departureId: sampleDeparture.id, leadPassengerEmail: "customer@shuttleflow.local" },
  });
  const booking = existingBooking ?? (await prisma.booking.create({
    data: {
      customerId: customer.id,
      operatorId: operatorOne.id,
      routeId: sampleRoute.id,
      departureId: sampleDeparture.id,
      assignedDriverId: driverOne.id,
      vehicleId: vehicleOne.id,
      fareType: "FLEX",
      priceSource: "OPERATOR_RULE",
      scheduledPickupTime: sampleDeparture.departureAt,
      estimatedArrivalWindow: "08:45-09:00",
      leadPassengerName: "Jordan Customer",
      leadPassengerEmail: "customer@shuttleflow.local",
      leadPassengerPhone: "+1-555-0100",
      passengerCount: 4,
      luggageCount: 3,
      flightNumber: "AA123",
      childSeats: 1,
      specialNotes: "Family booking.",
      travelDetails: "Flight arrival.",
      bookingSource: "MARKETPLACE",
      bookingStatus: "CONFIRMED",
      rideStatus: "DRIVER_ASSIGNED",
      ...sampleAmounts,
      passengers: { create: passengerRecords(4, "Jordan Customer") },
      payments: { create: { amountCents: sampleAmounts.totalAmountCents, marketplaceFeeCents: sampleAmounts.marketplaceFeeCents, operatorPayoutCents: sampleAmounts.operatorPayoutCents, platformRevenueCents: sampleAmounts.platformRevenueCents, status: "PAID", provider: "placeholder" } },
    },
  }));

  await prisma.routeDeparture.update({ where: { id: sampleDeparture.id }, data: { seatsBooked: Math.max(sampleDeparture.seatsBooked, 4) } });
  if (operatorOneUser) {
    const existingMessage = await prisma.bookingMessage.findFirst({ where: { bookingId: booking.id, messageType: "SYSTEM" } });
    if (!existingMessage) {
      await prisma.bookingMessage.createMany({ data: [
        { senderId: operatorOneUser.id, receiverId: customerUser.id, bookingId: booking.id, message: "Your booking has been accepted by South Florida Shuttle Co.", messageType: "SYSTEM" },
        { senderId: operatorOneUser.id, receiverId: customerUser.id, bookingId: booking.id, message: "Your ride has an assigned driver inside ShuttleFlow.", messageType: "SYSTEM" },
      ] });
    }
  }

  await prisma.auditLog.create({ data: { actorId: adminUser.id, action: "SEED_DATA_CREATED", entity: "system", metadata: JSON.stringify({ area: "global_mvp_refinement" }) } });
}

function passengerRecords(count: number, leadName?: string) {
  return Array.from({ length: count }, (_, index) => ({
    passengerNumber: index + 1,
    passengerName: index === 0 ? leadName : null,
    status: index === 0 && leadName ? "READY" : "PENDING_NAME",
    qrCodeToken: `TEMP-${Date.now()}-${index + 1}-${Math.random().toString(36).slice(2, 9)}`,
  }));
}

async function upsertUser(email: string, fullName: string, role: string) {
  return prisma.user.upsert({ where: { email }, update: { fullName, role }, create: { email, fullName, role } });
}

async function upsertOperator(item: OperatorSeed) {
  const user = await upsertUser(`${item.key}@shuttleflow.local`, `${item.companyName} Dispatch`, "OPERATOR");
  return prisma.operatorProfile.upsert({
    where: { userId: user.id },
    update: { companyName: item.companyName, status: "VERIFIED" },
    create: { userId: user.id, companyName: item.companyName, status: "VERIFIED" },
  });
}

async function upsertVehicle(operatorId: string, make: string, model: string, color: string, plateNumber: string, capacity: number) {
  return prisma.vehicle.upsert({ where: { operatorId_plateNumber: { operatorId, plateNumber } }, update: { make, model, color, capacity, status: "ACTIVE" }, create: { operatorId, make, model, color, plateNumber, capacity, status: "ACTIVE" } });
}

async function upsertDriver(email: string, fullName: string, operatorId: string) {
  const user = await upsertUser(email, fullName, "OPERATOR");
  return prisma.driverProfile.upsert({ where: { userId: user.id }, update: { operatorId }, create: { userId: user.id, operatorId } });
}

async function upsertPricingRule(routeId: string, operatorId: string | null, fareType: string, basePriceCents: number, priceSource: string) {
  const existing = await prisma.pricingRule.findFirst({ where: { routeId, operatorId, fareType } });
  if (existing) return prisma.pricingRule.update({ where: { id: existing.id }, data: { basePriceCents, priceSource, active: true } });
  return prisma.pricingRule.create({ data: { routeId, operatorId, fareType, basePriceCents, priceSource, active: true } });
}

function serviceDeparturesForMayAndJune(frequencyMinutes: number) {
  const departures: Date[] = [];
  for (const month of [4, 5]) {
    const daysInMonth = new Date(2026, month + 1, 0).getDate();
    for (let day = 1; day <= daysInMonth; day += 1) {
      for (let hour = 8; hour <= 11; hour += 1) {
        departures.push(new Date(2026, month, day, hour, 0, 0));
        if (frequencyMinutes <= 30) departures.push(new Date(2026, month, day, hour, 30, 0));
      }
    }
  }
  return departures;
}

function seededSeatsBooked(departureAt: Date, seatsTotal: number) {
  const marker = departureAt.getDate() + departureAt.getHours() + departureAt.getMinutes();
  if (marker % 5 === 0) return Math.min(4, seatsTotal - 2);
  if (marker % 3 === 0) return Math.min(2, seatsTotal - 2);
  return 0;
}

async function upsertDeparture(routeId: string, departureAt: Date, seatsTotal = 12) {
  const seatsBooked = seededSeatsBooked(departureAt, seatsTotal);
  const existing = await prisma.routeDeparture.findFirst({ where: { routeId, departureAt } });
  if (existing) return prisma.routeDeparture.update({ where: { id: existing.id }, data: { active: true, seatsTotal, seatsBooked: Math.min(existing.seatsBooked, seatsTotal - 1) || seatsBooked } });
  return prisma.routeDeparture.create({ data: { routeId, departureAt, seatsTotal, seatsBooked, active: true } });
}

async function ensureDeparturesForAllActiveRoutes() {
  const activeMarketplaceRoutes = await prisma.route.findMany({
    where: {
      active: true,
      origin: { bookingEnabled: true },
      destination: { bookingEnabled: true },
    },
    include: {
      origin: true,
      destination: true,
    },
    orderBy: { displayName: "asc" },
  });

  for (const route of activeMarketplaceRoutes) {
    const frequencyMinutes = (route.estimatedTransferMaxMinutes ?? 60) <= 45 ? 30 : 60;
    const seededDepartures = serviceDeparturesForMayAndJune(frequencyMinutes);
    for (const departureAt of seededDepartures) {
      await upsertDeparture(route.id, departureAt, frequencyMinutes <= 30 ? 12 : 15);
    }
    const count = await prisma.routeDeparture.count({ where: { routeId: route.id, active: true } });
    console.log(`Verified route departures: ${route.displayName} - ${count} active departures`);
  }
}

async function seedEvents(cityByKey: Map<string, { id: string }>, locationByKey: Map<string, { id: string }>) {
  const eventSeeds = [
    { name: "Miami Beach Convention Future Event", venueKey: "miami-beach-convention", cityKey: "miami", expectedAttendance: 12000 },
    { name: "Javits Center Future Event", venueKey: "javits", cityKey: "new-york", expectedAttendance: 40000 },
    { name: "Las Vegas Convention Center Future Event", venueKey: "las-convention", cityKey: "las-vegas", expectedAttendance: 50000 },
    { name: "Orange County Convention Center Future Event", venueKey: "occc", cityKey: "orlando", expectedAttendance: 30000 },
  ];
  for (const item of eventSeeds) {
    const existing = await prisma.event.findFirst({ where: { name: item.name } });
    const data = { name: item.name, venueId: locationByKey.get(item.venueKey)!.id, cityId: cityByKey.get(item.cityKey)!.id, startDate: new Date("2026-07-01T09:00:00Z"), endDate: new Date("2026-07-03T17:00:00Z"), expectedAttendance: item.expectedAttendance, bookingEnabled: false, status: "PLANNED" };
    if (existing) await prisma.event.update({ where: { id: existing.id }, data });
    else await prisma.event.create({ data });
  }
}

async function seedCruiseSchedules(locationByKey: Map<string, { id: string }>) {
  const ship = await prisma.cruiseShip.upsert({
    where: { shipName_cruiseLine: { shipName: "Example of the Seas", cruiseLine: "Sample Cruise Line" } },
    update: {},
    create: { shipName: "Example of the Seas", cruiseLine: "Sample Cruise Line" },
  });
  const existing = await prisma.cruiseSchedule.findFirst({ where: { shipId: ship.id, terminalId: locationByKey.get("port-miami")!.id, arrivalDate: new Date("2026-06-01T00:00:00Z") } });
  const data = { shipId: ship.id, terminalId: locationByKey.get("port-miami")!.id, arrivalDate: new Date("2026-06-01T00:00:00Z"), arrivalTime: "07:00", departureTime: "16:00", estimatedPassengers: 4200, disembarkStart: "08:00", disembarkEnd: "10:30", source: "seed-placeholder", activeStatus: "ACTIVE" };
  if (existing) await prisma.cruiseSchedule.update({ where: { id: existing.id }, data });
  else await prisma.cruiseSchedule.create({ data });
}

main()
  .then(async () => prisma.$disconnect())
  .catch(async (error) => {
    console.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
