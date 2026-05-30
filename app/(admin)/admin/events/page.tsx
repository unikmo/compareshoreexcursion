import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminEventsPage() {
  await requireRole(["ADMIN"]);
  const events = await prisma.event.findMany({ include: { venue: true, city: true }, orderBy: { startDate: "asc" } });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Events and disabled future venues</h1>
      <table className="data-table"><thead><tr><th>Name</th><th>Venue</th><th>City</th><th>Attendance</th><th>Booking</th></tr></thead><tbody>{events.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.venue.name}</td><td>{item.city.name}</td><td>{item.expectedAttendance ?? "TBD"}</td><td>{item.bookingEnabled ? "ENABLED" : "DISABLED"}</td></tr>)}</tbody></table>
    </main>
  );
}
