import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminCitiesPage() {
  await requireRole(["ADMIN"]);
  const cities = await prisma.city.findMany({ include: { region: { include: { country: true } }, locations: true }, orderBy: { name: "asc" } });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Cities</h1>
      <table className="data-table"><thead><tr><th>Name</th><th>Region</th><th>Country</th><th>Locations</th></tr></thead><tbody>{cities.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.region.name}</td><td>{item.region.country.name}</td><td>{item.locations.length}</td></tr>)}</tbody></table>
    </main>
  );
}
