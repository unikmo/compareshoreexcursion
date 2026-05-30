import Link from "next/link";
import { prisma } from "@/lib/prisma";
import { requireRole } from "@/lib/auth/session";
import { formatMoney, formatTime, locationDisplayName } from "@/lib/display";
import { CustomerSearchForm } from "./search-form";

const locationSelect = {
  id: true,
  cityId: true,
  name: true,
  displayName: true,
  shortCode: true,
  type: true,
  locationType: true,
} as const;

type CustomerPageProps = {
  searchParams?: Promise<{
    countryId?: string;
    cityId?: string;
    fromHubId?: string;
    toHubId?: string;
    fromLocationId?: string;
    toLocationId?: string;
    travelDate?: string;
    passengerCount?: string;
    searched?: string;
    searchSignature?: string;
    debug?: string;
  }>;
};

function localIsoDate(value = new Date()) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function matchesSelectedDate(value: Date, selectedDate: string) {
  return localIsoDate(value) === selectedDate || value.toISOString().slice(0, 10) === selectedDate;
}

function ResultIcon({ type }: { type: "clock" | "shuttle" | "seat" }) {
  if (type === "clock") {
    return (
      <svg className="result-line-icon" viewBox="0 0 24 24" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 7v5l3 2" />
      </svg>
    );
  }
  if (type === "shuttle") {
    return (
      <svg className="result-line-icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M5 8h11l3 4v5H5z" />
        <path d="M7 8V6h7v2" />
        <circle cx="8" cy="18" r="1.5" />
        <circle cx="17" cy="18" r="1.5" />
      </svg>
    );
  }
  return (
    <svg className="result-line-icon" viewBox="0 0 24 24" aria-hidden="true">
      <path d="M8 6h6a3 3 0 0 1 3 3v4" />
      <path d="M6 11h9a3 3 0 0 1 3 3v3H6z" />
      <path d="M6 17v2M18 17v2" />
    </svg>
  );
}

function searchSignature(
  countryId: string,
  cityId: string,
  fromLocationId: string,
  toLocationId: string,
  travelDate: string,
  passengerCount: string,
) {
  return [countryId, cityId, fromLocationId, toLocationId, travelDate, passengerCount].join("|");
}

export default async function CustomerPage({ searchParams }: CustomerPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const params = await searchParams;
  const today = localIsoDate();
  const countryId = params?.countryId?.trim() ?? "";
  const cityId = params?.cityId?.trim() ?? "";
  const fromLocationId = (params?.fromLocationId ?? params?.fromHubId ?? "").trim();
  const toLocationId = (params?.toLocationId ?? params?.toHubId ?? "").trim();
  const travelDate = params?.travelDate?.trim() || today;
  const rawPassengerCount = params?.passengerCount?.trim() ?? "";
  const passengerCount = Math.max(Number.parseInt(rawPassengerCount || "1", 10) || 1, 1);
  const passengerCountValue = rawPassengerCount || String(passengerCount);
  const expectedSearchSignature = searchSignature(countryId, cityId, fromLocationId, toLocationId, travelDate, passengerCountValue);
  const hasSubmittedSearch = params?.searched === "true" && params?.searchSignature === expectedSearchSignature;
  const showDebug = params?.debug === "true";

  const countries = await prisma.country.findMany({
    where: { code: { in: ["US", "ES", "DE"] } },
    orderBy: { name: "asc" },
  });

  const allCities = await prisma.city.findMany({
    where: { region: { country: { code: { in: ["US", "ES", "DE"] } } } },
    include: { region: { include: { country: true } } },
    orderBy: [{ name: "asc" }],
  });

  const allLocations = await prisma.location.findMany({
    where: { bookingEnabled: true, city: { region: { country: { code: { in: ["US", "ES", "DE"] } } } } },
    orderBy: { displayName: "asc" },
    select: locationSelect,
  });

  const activeRouteLinks = await prisma.route.findMany({
    where: {
      active: true,
      origin: { bookingEnabled: true },
      destination: { bookingEnabled: true },
    },
    select: { originLocationId: true, destinationLocationId: true },
  });

  const selectedCountryId = countries.some((country) => country.id === countryId) ? countryId : "";
  const countryCities = selectedCountryId ? allCities.filter((city) => city.region.countryId === selectedCountryId) : [];
  const selectedCityId = countryCities.some((city) => city.id === cityId) ? cityId : "";

  const cityLocations = selectedCityId ? allLocations.filter((location) => location.cityId === selectedCityId) : [];
  const cityOriginLocations = cityLocations.filter((location) =>
    activeRouteLinks.some((route) => route.originLocationId === location.id),
  );
  const activeOutgoingRoutesCount = selectedCityId
    ? activeRouteLinks.filter((route) => cityLocations.some((location) => location.id === route.originLocationId)).length
    : 0;
  const selectedFromLocationId = cityOriginLocations.some((location) => location.id === fromLocationId) ? fromLocationId : "";

  const destinationIds = new Set(
    activeRouteLinks
      .filter((route) => route.originLocationId === selectedFromLocationId)
      .map((route) => route.destinationLocationId),
  );
  const toLocations = cityLocations.filter((location) => destinationIds.has(location.id));
  const selectedToLocationId = toLocations.some((location) => location.id === toLocationId) ? toLocationId : "";

  const routes =
    selectedFromLocationId && selectedToLocationId && travelDate
      ? await prisma.route.findMany({
          where: {
            active: true,
            originLocationId: selectedFromLocationId,
            destinationLocationId: selectedToLocationId,
          },
          include: {
            origin: { select: locationSelect },
            destination: { select: locationSelect },
            departures: {
              where: {
                active: true,
              },
              orderBy: { departureAt: "asc" },
            },
            pricingRules: {
              where: { active: true },
              orderBy: { fareType: "asc" },
            },
          },
          orderBy: { name: "asc" },
        })
      : [];
  const routesForSelectedDate = routes.map((route) => ({
    ...route,
    departures: route.departures.filter((departure) => matchesSelectedDate(departure.departureAt, travelDate)),
  }));

  const availableRoutes = routesForSelectedDate.filter((route) =>
    route.departures.some((departure) => departure.seatsTotal - departure.seatsBooked >= passengerCount),
  );
  const departureResults = availableRoutes
    .flatMap((route) =>
      route.departures
        .filter((departure) => departure.seatsTotal - departure.seatsBooked >= passengerCount)
        .map((departure) => ({ route, departure })),
    )
    .sort((first, second) => first.departure.departureAt.getTime() - second.departure.departureAt.getTime())
    .slice(0, 6);
  const hasSearched = hasSubmittedSearch && Boolean(selectedCountryId && selectedCityId && selectedFromLocationId && selectedToLocationId && travelDate && rawPassengerCount);
  const selectedRouteIds = routes.map((route) => route.id);
  const matchingDeparturesCount = routesForSelectedDate.reduce((count, route) => count + route.departures.length, 0);

  return (
    <main className="foundation-panel wide customer-home">
      <div className="customer-topbar">
        <div className="customer-brand">
          <span className="brand-mark" aria-hidden="true" />
          <span>WAYLO</span>
        </div>
      </div>

      <section className="customer-hero customer-hero-with-visual" aria-labelledby="customer-search-title"><div className="customer-hero-copy"><h1 id="customer-search-title">Fixed-price shuttles between airports, ports &amp; city hubs</h1><p>Scheduled shared rides. Verified operators. No surge pricing.</p></div><div className="shuttle-visual" aria-hidden="true"><div className="shuttle-skyline"><span></span><span></span><span></span></div><div className="shuttle-road"></div><div className="shuttle-bus"><div className="shuttle-window"></div><div className="shuttle-window small"></div><div className="shuttle-door"></div><span className="wheel left"></span><span className="wheel right"></span></div><div className="hub-label">Airport ? City hub</div></div></section>

      <section className="search-card" aria-label="Search fixed shuttle departures">
        <CustomerSearchForm
          countries={countries.map((country) => ({ id: country.id, name: country.name, code: country.code }))}
          cities={allCities.map((city) => ({
            id: city.id,
            name: city.name,
            countryId: city.region.countryId,
          }))}
          locations={allLocations.map((location) => ({
            id: location.id,
            cityId: location.cityId,
            label: locationDisplayName(location),
          }))}
          routes={activeRouteLinks.map((route) => ({
            originLocationId: route.originLocationId,
            destinationLocationId: route.destinationLocationId,
          }))}
          debugEnabled={showDebug}
          initialValues={{
            countryId: selectedCountryId,
            cityId: selectedCityId,
            fromLocationId: selectedFromLocationId,
            toLocationId: selectedToLocationId,
            travelDate,
            passengerCount,
          }}
        />
        <div className="trust-badges" aria-label="WAYLO travel commitments">
          <span><b aria-hidden="true">{"\u2713"}</b> Guaranteed seat</span>
          <span><b aria-hidden="true">{"\u2713"}</b> Up to 2 bags included</span>
          <span><b aria-hidden="true">{"\u2713"}</b> No surge pricing</span>
        </div>

        {hasSearched && (
          <section className="departure-results" id="search-results" aria-labelledby="next-departures-title">
            {departureResults.length > 0 ? (
              <>
                <h2 id="next-departures-title">Next departures</h2>
                <div className="departure-card-grid">
                  {departureResults.map(({ route, departure }) => {
                    const seatsLeft = departure.seatsTotal - departure.seatsBooked;
                    const shuttlePricePerTravelerCents = Math.min(
                      ...route.pricingRules
                        .filter((rule) => rule.fareType === "STANDARD")
                        .map((rule) => rule.basePriceCents),
                      route.defaultPriceCents ?? 5000,
                    );
                    const transferLabel =
                      route.estimatedTransferMinMinutes && route.estimatedTransferMaxMinutes
                        ? `~${route.estimatedTransferMinMinutes}-${route.estimatedTransferMaxMinutes} min`
                        : "Varies by conditions";
                    return (
                      <article className="departure-card" key={departure.id}>
                        <p className="departure-kicker">Shared shuttle</p>
                        <div className="departure-card-main">
                          <h3 className="departure-route">
                            {locationDisplayName(route.origin)} {"\u2192"} {locationDisplayName(route.destination)}
                          </h3>
                          <div className="departure-meta-row">
                            <span><ResultIcon type="clock" /> <span className="meta-label">Departure</span> <strong>{formatTime(departure.departureAt)}</strong></span>
                            <span><ResultIcon type="shuttle" /> <strong>{transferLabel}</strong></span>
                            <span><ResultIcon type="seat" /> <strong>{seatsLeft}</strong> <span className="meta-label">seats left</span></span>
                          </div>
                        </div>
                        <div className="departure-card-action">
                          <p className="departure-price">
                            <span>{formatMoney(shuttlePricePerTravelerCents)}</span>
                            <small>/passenger</small>
                          </p>
                          <Link
                            href={`/customer/routes/${route.id}?travelDate=${encodeURIComponent(travelDate)}&passengerCount=${passengerCount}&departureId=${departure.id}`}
                          >
                            Continue {"\u2192"}
                          </Link>
                        </div>
                      </article>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="departure-empty">
                <p>No rides scheduled at this time.</p>
                <p>Choose another date to see available departures.</p>
              </div>
            )}
            {showDebug && (
              <div className="search-debug-panel">
                <strong>Debug:</strong>
                <span>Selected country: {selectedCountryId || "none"}</span>
                <span>Selected city: {selectedCityId || "none"}</span>
                <span>Selected fromLocationId: {selectedFromLocationId || "none"}</span>
                <span>Selected toLocationId: {selectedToLocationId || "none"}</span>
                <span>Selected routeId: {selectedRouteIds.join(", ") || "none"}</span>
                <span>Selected date: {travelDate || "none"}</span>
                <span>City locations count: {cityLocations.length}</span>
                <span>Active outgoing routes count: {activeOutgoingRoutesCount}</span>
                <span>Valid destinations count: {toLocations.length}</span>
                <span>Matching routes count: {routes.length}</span>
                <span>Matching departures count: {matchingDeparturesCount}</span>
                <span>Departures count: {matchingDeparturesCount}</span>
              </div>
            )}
          </section>
        )}
      </section>
    </main>
  );
}

