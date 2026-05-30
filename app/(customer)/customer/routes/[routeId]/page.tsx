import Link from "next/link";
import { createBookingAction } from "@/app/actions";
import { requireRole } from "@/lib/auth/session";
import { formatMoney, formatTime, locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";

type RouteBookingPageProps = {
  params: Promise<{
    routeId: string;
  }>;
  searchParams?: Promise<{
    travelDate?: string;
    passengerCount?: string;
    departureId?: string;
  }>;
};

function localIsoDate(value: Date) {
  const year = value.getFullYear();
  const month = String(value.getMonth() + 1).padStart(2, "0");
  const day = String(value.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

function formatTravelDate(value: Date) {
  return value.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function UnavailableRide() {
  return (
    <main className="checkout-page">
      <section className="checkout-unavailable-card">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>This ride is no longer available.</h1>
        <p>Choose another fixed shuttle departure to continue your booking.</p>
        <Link href="/customer">Back to search</Link>
      </section>
    </main>
  );
}

function additionalPassengerFields(count: number) {
  return Array.from({ length: Math.max(count - 1, 0) }, (_, index) => index + 2);
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

function SummaryIcon({ type }: { type: "calendar" | "passengers" | "bags" }) {
  if (type === "calendar") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <path d="M7 3v4M17 3v4M4 9h16" />
        <rect x="4" y="5" width="16" height="15" rx="2" />
      </svg>
    );
  }

  if (type === "passengers") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
        <path d="M9 11a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM3.5 19a5.5 5.5 0 0 1 11 0" />
        <path d="M17 11a2.5 2.5 0 1 0 0-5M16 14.5a4.5 4.5 0 0 1 4.5 4.5" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
      <path d="M9 7V5a3 3 0 0 1 6 0v2" />
      <rect x="5" y="7" width="14" height="13" rx="2" />
      <path d="M9 12h6" />
    </svg>
  );
}

export default async function RouteBookingPage({ params, searchParams }: RouteBookingPageProps) {
  await requireRole(["CUSTOMER", "ADMIN"]);
  const { routeId } = await params;
  const query = await searchParams;
  const selectedDepartureId = query?.departureId ?? "";
  const selectedPassengerCount = Math.max(Number.parseInt(query?.passengerCount ?? "1", 10) || 1, 1);

  const route = await prisma.route.findFirst({
    where: { id: routeId, active: true },
    include: {
      origin: { include: { city: { include: { region: true } } } },
      destination: true,
      departures: { where: { active: true }, orderBy: { departureAt: "asc" } },
      pricingRules: { where: { active: true }, orderBy: [{ fareType: "asc" }, { priceSource: "asc" }] },
    },
  });

  if (!route) return <UnavailableRide />;

  const selectedDeparture = route.departures.find((departure) => departure.id === selectedDepartureId);
  if (!selectedDeparture) return <UnavailableRide />;

  const standardPriceCents =
    route.pricingRules.find((rule) => rule.fareType === "STANDARD")?.basePriceCents ?? route.defaultPriceCents ?? 5000;
  const totalCents = standardPriceCents * selectedPassengerCount;
  const routeLabel = `${locationDisplayName(route.origin)} \u2192 ${locationDisplayName(route.destination)}`;
  const travelDate = localIsoDate(selectedDeparture.departureAt);
  const passengerCountValue = String(selectedPassengerCount);
  const backSearchParams = new URLSearchParams({
    countryId: route.origin.city.region.countryId,
    cityId: route.origin.cityId,
    fromLocationId: route.originLocationId,
    toLocationId: route.destinationLocationId,
    travelDate,
    passengerCount: passengerCountValue,
    departureId: selectedDeparture.id,
    searched: "true",
    searchSignature: searchSignature(
      route.origin.city.region.countryId,
      route.origin.cityId,
      route.originLocationId,
      route.destinationLocationId,
      travelDate,
      passengerCountValue,
    ),
  });
  const backToResultsHref = `/customer?${backSearchParams.toString()}#search-results`;

  return (
    <main className="checkout-page">
      <header className="checkout-header">
        <p className="checkout-brand">ShuttleFlow</p>
        <h1>Complete your booking</h1>
        <p>{routeLabel}</p>
      </header>

      <form className="checkout-shell" action={createBookingAction}>
        <input type="hidden" name="routeId" value={route.id} />
        <input type="hidden" name="departureId" value={selectedDeparture.id} />
        <input type="hidden" name="travelDate" value={travelDate} />
        <input type="hidden" name="fareType" value="STANDARD" />
        <input type="hidden" name="passengerCount" value={selectedPassengerCount} />
        <input type="hidden" name="luggageCount" value="0" />

        <section className="checkout-form-card" aria-label="Passenger details">
          <div className="checkout-section">
            <h2>Lead passenger</h2>
            <div className="checkout-field-grid">
              <label>
                Full name*
                <input name="leadPassengerName" required placeholder="Full name" />
              </label>
              <label>
                Email*
                <input name="leadPassengerEmail" type="email" required placeholder="name@example.com" />
              </label>
              <label>
                Phone*
                <input name="leadPassengerPhone" required placeholder="+1 555 0100" />
              </label>
            </div>
            {selectedPassengerCount > 1 && (
              <div className="checkout-field-grid additional-passengers">
                {additionalPassengerFields(selectedPassengerCount).map((passengerNumber) => (
                  <label key={passengerNumber}>
                    Passenger {passengerNumber}*
                    <input name={`passenger${passengerNumber}Name`} placeholder="Full name" required />
                  </label>
                ))}
              </div>
            )}
          </div>

          <div className="checkout-section">
            <h2>Notes (optional)</h2>
            <label>
              <textarea name="specialNotes" placeholder="Accessibility needs or pickup notes" />
            </label>
          </div>

          <section className="booking-summary-card" aria-label="Booking summary">
            <div className="summary-details">
              <strong>{routeLabel}</strong>
              <span><SummaryIcon type="calendar" /> {formatTravelDate(selectedDeparture.departureAt)} {"\u00b7"} {formatTime(selectedDeparture.departureAt)}</span>
              <span><SummaryIcon type="passengers" /> {selectedPassengerCount} passengers {"\u00b7"} Standard</span>
              <span><SummaryIcon type="bags" /> Up to 2 bags included per passenger</span>
            </div>
            <div className="summary-action">
              <div className="summary-total">
                <span>TOTAL</span>
                <strong>{formatMoney(totalCents)}</strong>
              </div>
              <button type="submit">Continue to payment <span aria-hidden="true">{"\u2192"}</span></button>
            </div>
            <Link className="checkout-back-action" href={backToResultsHref}>
              <span aria-hidden="true">{"\u2190"}</span> Back to search results
            </Link>
          </section>
        </section>
      </form>
      <p className="checkout-security">
        <svg aria-hidden="true" viewBox="0 0 24 24" focusable="false">
          <rect x="5" y="10" width="14" height="10" rx="2" />
          <path d="M8 10V7a4 4 0 0 1 8 0v3" />
        </svg>
        Secure checkout {"\u00b7"} Your information is encrypted
      </p>
    </main>
  );
}
