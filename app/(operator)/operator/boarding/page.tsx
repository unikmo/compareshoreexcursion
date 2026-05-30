import { passengerCheckInAction, qrLookupAction } from "@/app/actions";
import { requireRole } from "@/lib/auth/session";
import { locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";

type BoardingPageProps = {
  searchParams?: Promise<{
    departureId?: string;
    qr?: string;
  }>;
};

export default async function BoardingPage({ searchParams }: BoardingPageProps) {
  await requireRole(["OPERATOR", "ADMIN"]);
  const params = await searchParams;
  const operator = await prisma.operatorProfile.findFirstOrThrow({
    where: { status: "VERIFIED" },
    include: { routes: { where: { enabled: true } } },
    orderBy: { createdAt: "asc" },
  });

  const routeIds = operator.routes.map((route) => route.routeId);
  const departures = await prisma.routeDeparture.findMany({
    where: { active: true, routeId: { in: routeIds } },
    include: { route: { include: { origin: true, destination: true } } },
    orderBy: { departureAt: "asc" },
    take: 30,
  });

  const selectedDepartureId = params?.departureId ?? departures[0]?.id;
  const qr = params?.qr?.trim();
  const passengers = await prisma.bookingPassenger.findMany({
    where: {
      ...(qr ? { qrCodeToken: qr } : {}),
      booking: {
        departureId: selectedDepartureId,
        operatorId: operator.id,
        bookingStatus: { in: ["BOOKED", "CONFIRMED", "COMPLETED"] },
      },
    },
    include: {
      booking: {
        include: {
          route: { include: { origin: true, destination: true } },
          departure: true,
        },
      },
    },
    orderBy: { passengerNumber: "asc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Operator boarding</p>
      <h1>Passenger manifest and check-in</h1>

      <form className="inline-form" action="/operator/boarding">
        <select name="departureId" defaultValue={selectedDepartureId}>
          {departures.map((departure) => (
            <option value={departure.id} key={departure.id}>
              {locationDisplayName(departure.route.origin)} to {locationDisplayName(departure.route.destination)} /{" "}
              {departure.departureAt.toLocaleString("en-US")}
            </option>
          ))}
        </select>
        <button type="submit">View manifest</button>
      </form>

      <form className="inline-form" action={qrLookupAction}>
        <input name="qrCodeToken" placeholder="QR token lookup" defaultValue={qr ?? ""} required />
        <button type="submit">Lookup</button>
      </form>

      <div className="list-stack">
        {passengers.map((passenger) => (
          <article className="list-row" key={passenger.id}>
            <div>
              <h2>
                Passenger {passenger.passengerNumber}: {passenger.passengerName ?? "Pending name"}
              </h2>
              <p>
                {locationDisplayName(passenger.booking.route.origin)} to {locationDisplayName(passenger.booking.route.destination)}
              </p>
              <p>
                Fare {passenger.booking.fareType} / Booking {passenger.booking.bookingStatus} / Pass {passenger.status}
              </p>
              <p>QR token: {passenger.qrCodeToken}</p>
            </div>
            <form className="inline-actions" action={passengerCheckInAction}>
              <input type="hidden" name="passengerId" value={passenger.id} />
              <button name="status" value="CHECKED_IN" disabled={passenger.status === "CANCELLED" || passenger.status === "CHECKED_IN"}>
                Check in
              </button>
              <button name="status" value="NO_SHOW" disabled={passenger.status === "CANCELLED" || passenger.status === "CHECKED_IN"}>
                No-show
              </button>
            </form>
          </article>
        ))}
      </div>
    </main>
  );
}
