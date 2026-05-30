import { requireRole } from "@/lib/auth/session";
import { locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";

export default async function AdminOperatorRoutesPage() {
  await requireRole(["ADMIN"]);
  const rows = await prisma.operatorRoute.findMany({ include: { operator: true, route: { include: { origin: true, destination: true } } }, orderBy: { createdAt: "desc" } });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Operator routes</h1>
      <table className="data-table"><thead><tr><th>Operator</th><th>Route</th><th>Enabled</th></tr></thead><tbody>{rows.map((item) => <tr key={item.id}><td>{item.operator.companyName}</td><td>{locationDisplayName(item.route.origin)} to {locationDisplayName(item.route.destination)}</td><td>{item.enabled ? "YES" : "NO"}</td></tr>)}</tbody></table>
    </main>
  );
}
