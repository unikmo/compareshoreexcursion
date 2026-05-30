import {
  acceptBookingAction,
  declineBookingAction,
  sendBookingMessageAction,
  updateOperatorBookingAction,
} from "@/app/actions";
import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";
import Link from "next/link";
import { locationDisplayName } from "@/lib/display";

export default async function OperatorPage() {
  await requireRole(["OPERATOR", "ADMIN"]);

  const operator = await prisma.operatorProfile.findFirst({
    where: { status: "VERIFIED" },
    include: {
      routes: { where: { enabled: true }, include: { route: { include: { origin: true, destination: true } } } },
      drivers: { include: { user: true } },
      vehicles: true,
    },
    orderBy: { createdAt: "asc" },
  });

  if (!operator) {
    return (
      <main className="foundation-panel">
        <h1>Operator dashboard</h1>
        <p>No verified operator exists. Run the seed command to create sample operators.</p>
      </main>
    );
  }

  const bookings = await prisma.booking.findMany({
    where: {
      routeId: { in: operator.routes.map((operatorRoute) => operatorRoute.routeId) },
    },
    include: {
      customer: { include: { user: true } },
      route: { include: { origin: true, destination: true } },
      assignedDriver: { include: { user: true } },
      vehicle: true,
      messages: { include: { sender: true }, orderBy: { createdAt: "asc" } },
    },
    orderBy: { scheduledPickupTime: "asc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Operator</p>
      <h1>{operator.companyName}</h1>
      <p>{operator.routes.length} enabled marketplace routes</p>
      <div className="foundation-links">
        <Link href="/operator/boarding">Boarding and check-in</Link>
      </div>

      <div className="list-stack">
        {bookings.map((booking) => (
          <article className="operator-booking" key={booking.id}>
            <div className="panel-header compact">
              <div>
                <h2>{locationDisplayName(booking.route.origin)} to {locationDisplayName(booking.route.destination)}</h2>
                <p>
                  {booking.customer.user.fullName} / {booking.scheduledPickupTime.toLocaleString("en-US")}
                </p>
              </div>
              <span className="status-pill">{booking.rideStatus ?? booking.bookingStatus}</span>
            </div>

            <div className="money-grid">
              <span>Total ${(booking.totalAmountCents / 100).toFixed(2)}</span>
              <span>Fee ${(booking.marketplaceFeeCents / 100).toFixed(2)}</span>
              <span>Payout ${(booking.operatorPayoutCents / 100).toFixed(2)}</span>
              <span>Source {booking.bookingSource}</span>
            </div>

            <div className="inline-actions">
              <form action={acceptBookingAction}>
                <input type="hidden" name="bookingId" value={booking.id} />
                <button type="submit" disabled={booking.bookingStatus !== "REQUESTED"}>
                  Accept
                </button>
              </form>
              <form action={declineBookingAction}>
                <input type="hidden" name="bookingId" value={booking.id} />
                <button type="submit" disabled={booking.bookingStatus !== "REQUESTED"}>
                  Decline
                </button>
              </form>
            </div>

            <form className="stack-form" action={updateOperatorBookingAction}>
              <input type="hidden" name="bookingId" value={booking.id} />
              <div className="form-grid">
                <label>
                  Driver
                  <select name="driverId" defaultValue={booking.assignedDriverId ?? operator.drivers[0]?.id} required>
                    {operator.drivers.map((driver) => (
                      <option value={driver.id} key={driver.id}>
                        {driver.user.fullName}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Vehicle
                  <select name="vehicleId" defaultValue={booking.vehicleId ?? operator.vehicles[0]?.id} required>
                    {operator.vehicles.map((vehicle) => (
                      <option value={vehicle.id} key={vehicle.id}>
                        {vehicle.color ?? ""} {vehicle.make} {vehicle.model} {vehicle.plateNumber}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Ride status
                  <select name="rideStatus" defaultValue={booking.rideStatus ?? "DRIVER_ASSIGNED"} required>
                    {["DRIVER_ASSIGNED", "EN_ROUTE", "ARRIVING_SOON", "ARRIVED", "PICKED_UP", "COMPLETED"].map((status) => (
                      <option value={status} key={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                </label>
                <label>
                  Arrival window
                  <input name="estimatedArrivalWindow" defaultValue={booking.estimatedArrivalWindow ?? ""} required />
                </label>
              </div>
              <button type="submit">Update booking</button>
            </form>

            <section className="communication">
              <h3>Messages</h3>
              <div className="message-history compact-history">
                {booking.messages.map((message) => (
                  <div className="message-row" key={message.id}>
                    <div className="message-bubble">
                      <span className="message-meta">
                        {message.sender.fullName} / {message.messageType}
                      </span>
                      <div>{message.message}</div>
                    </div>
                  </div>
                ))}
              </div>
              <form className="message-form" action={sendBookingMessageAction}>
                <input type="hidden" name="bookingId" value={booking.id} />
                <input type="hidden" name="senderRole" value="OPERATOR" />
                <input type="hidden" name="recipient" value="customer" />
                <input name="message" placeholder="Message customer inside ShuttleFlow" required />
                <button type="submit">Send</button>
              </form>
            </section>
          </article>
        ))}
      </div>
    </main>
  );
}
