import { operatorPlaceholderAction } from "@/app/actions";
import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminOperatorsPage() {
  await requireRole(["ADMIN"]);

  const operators = await prisma.operatorProfile.findMany({
    include: { user: true, routes: true, vehicles: true, drivers: true },
    orderBy: { companyName: "asc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Operators</h1>
      <div className="list-stack">
        {operators.map((operator) => (
          <article className="list-row" key={operator.id}>
            <div>
              <h2>{operator.companyName}</h2>
              <p>
                {operator.status} / {operator.user.email}
              </p>
              <p>
                {operator.routes.length} routes / {operator.vehicles.length} vehicles / {operator.drivers.length} drivers
              </p>
            </div>
            <form className="inline-actions" action={operatorPlaceholderAction}>
              <input type="hidden" name="operatorId" value={operator.id} />
              <button name="action" value="APPROVE_OPERATOR_PLACEHOLDER">
                Approve
              </button>
              <button name="action" value="VERIFY_OPERATOR_PLACEHOLDER">
                Verify
              </button>
              <button name="action" value="SUSPEND_OPERATOR_PLACEHOLDER">
                Suspend
              </button>
            </form>
          </article>
        ))}
      </div>
    </main>
  );
}
