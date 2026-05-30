import { requireRole } from "@/lib/auth/session";
import { locationDisplayName } from "@/lib/display";
import { prisma } from "@/lib/prisma";

export default async function AdminRoutesPage() {
  await requireRole(["ADMIN"]);

  const routes = await prisma.route.findMany({
    include: {
      origin: true,
      destination: true,
      operatorRoutes: { include: { operator: true } },
      departures: true,
      pricingRules: true,
    },
    orderBy: { name: "asc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Routes</h1>
      <div className="list-stack">
        {routes.map((route) => (
          <article className="list-row" key={route.id}>
            <div>
              <h2>{locationDisplayName(route.origin)} to {locationDisplayName(route.destination)}</h2>
              <p>
                Default price {route.defaultPriceCents ? `$${(route.defaultPriceCents / 100).toFixed(2)}` : "None"} / Reverse route {route.reverseRouteId ? "linked" : "none"}
              </p>
              <p>
                {route.operatorRoutes.length} operators / {route.departures.length} departures / {route.pricingRules.length} fares
              </p>
            </div>
            <span className="status-pill">{route.active ? "ACTIVE" : "INACTIVE"}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
