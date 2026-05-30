import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminLocationsPage() {
  await requireRole(["ADMIN"]);

  const locations = await prisma.location.findMany({
    include: { city: { include: { region: { include: { country: true } } } } },
    orderBy: { name: "asc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Locations</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Full name</th>
            <th>Customer label</th>
            <th>Type</th>
            <th>City</th>
            <th>Region</th>
            <th>Booking</th>
          </tr>
        </thead>
        <tbody>
          {locations.map((location) => (
            <tr key={location.id}>
              <td>{location.name}</td>
              <td>{location.displayName}</td>
              <td>{location.locationType}</td>
              <td>{location.city.name}</td>
              <td>
                {location.city.region.name}, {location.city.region.country.code}
              </td>
              <td>{location.bookingEnabled ? "ENABLED" : "DISABLED"}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
