type LocationDisplayInput = {
  name?: string | null;
  displayName: string;
  shortCode: string | null;
  type?: string | null;
  locationType?: string | null;
};

function stripSuffix(value: string, suffixes: string[]) {
  return suffixes.reduce((label, suffix) => label.replace(new RegExp(`\\s*${suffix}$`, "i"), ""), value).trim();
}

export function locationDisplayName(location: LocationDisplayInput) {
  const semanticType = location.locationType && location.locationType !== "CITY" ? location.locationType : location.type ?? location.locationType ?? "";
  const sourceName = location.name ?? location.displayName;

  if (semanticType === "AIRPORT" && location.shortCode) {
    if (/Barcelona Airport/i.test(sourceName)) return "Barcelona Airport";
    return `${location.shortCode} Airport`;
  }

  if (semanticType === "AIRPORT") {
    if (/Fort Lauderdale-Hollywood/i.test(sourceName)) return "FLL Airport";
    if (/Miami International/i.test(sourceName)) return "MIA Airport";
    if (/John F\. Kennedy/i.test(sourceName)) return "JFK Airport";
    if (/LaGuardia/i.test(sourceName)) return "LGA Airport";
    if (/Newark Liberty/i.test(sourceName)) return "EWR Airport";
    if (/Harry Reid/i.test(sourceName)) return "LAS Airport";
    if (/Orlando International/i.test(sourceName)) return "MCO Airport";
    if (/Barcelona Airport/i.test(sourceName)) return "Barcelona Airport";
  }

  if (semanticType === "CRUISE" || semanticType === "CRUISE_TERMINAL") {
    if (/Port of Barcelona/i.test(sourceName)) return "Barcelona Port";
    return stripSuffix(sourceName, ["Cruise Terminal", "Cruise Port"]);
  }

  if (semanticType === "EVENT" || semanticType === "CONVENTION_CENTER" || semanticType === "STADIUM" || semanticType === "EVENT_VENUE") {
    if (/Fira Barcelona/i.test(sourceName)) return "Fira Barcelona";
    return stripSuffix(sourceName, ["Convention Center"]);
  }

  if (semanticType === "STATION" || semanticType === "TRANSIT_HUB") {
    if (/Brickell/i.test(sourceName)) return "Brickell";
    if (/Downtown Miami/i.test(sourceName)) return "Downtown Miami";
    return stripSuffix(sourceName, ["Transportation Hub"]);
  }

  if (semanticType === "CITY" || semanticType === "CITY_CENTER" || semanticType === "HOTEL_ZONE") {
    return stripSuffix(sourceName, ["Hotel Zone", "Transportation Hub"]);
  }

  return location.displayName;
}

export function formatMoney(cents: number) {
  return `$${(cents / 100).toFixed(0)}`;
}

export function formatTime(value: Date) {
  return value.toLocaleTimeString("en-US", { hour: "numeric", minute: "2-digit" });
}

export function departureFrequencyLabel(departures: Array<{ departureAt: Date }>) {
  if (departures.length < 2) return "Scheduled departure";
  const first = departures[0].departureAt.getTime();
  const second = departures[1].departureAt.getTime();
  const minutes = Math.round((second - first) / 60000);
  if (minutes <= 0) return "Scheduled departure";
  return `Every ${minutes} min`;
}
