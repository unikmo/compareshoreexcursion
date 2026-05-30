import { requireRole } from "@/lib/auth/session";
import { locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";

export default async function AdminDeparturesPage() {
  await requireRole(["ADMIN"]);
  const departures = await prisma.routeDeparture.findMany({ include: { route: { include: { origin: true, destination: true } } }, orderBy: { departureAt: "asc" }, take: 100 });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Departures</h1>
      <table className="data-table"><thead><tr><th>Route</th><th>Departure</th><th>Seats</th><th>Status</th></tr></thead><tbody>{departures.map((item) => <tr key={item.id}><td>{locationDisplayName(item.route.origin)} to {locationDisplayName(item.route.destination)}</td><td>{item.departureAt.toLocaleString("en-US")}</td><td>{item.seatsBooked}/{item.seatsTotal}</td><td>{item.active ? "ACTIVE" : "DISABLED"}</td></tr>)}</tbody></table>
    </main>
  );
}
