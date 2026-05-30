import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminRegionsPage() {
  await requireRole(["ADMIN"]);
  const regions = await prisma.region.findMany({ include: { country: true, cities: true }, orderBy: { name: "asc" } });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Regions</h1>
      <table className="data-table"><thead><tr><th>Name</th><th>Code</th><th>Country</th><th>Cities</th></tr></thead><tbody>{regions.map((item) => <tr key={item.id}><td>{item.name}</td><td>{item.code}</td><td>{item.country.name}</td><td>{item.cities.length}</td></tr>)}</tbody></table>
    </main>
  );
}
