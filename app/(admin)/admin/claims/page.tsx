import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminClaimsPage() {
  await requireRole(["ADMIN"]);

  const claims = await prisma.operatorClaim.findMany({
    include: { operator: true },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Operator claims</h1>
      <div className="list-stack">
        {claims.map((claim) => (
          <article className="list-row" key={claim.id}>
            <div>
              <h2>{claim.companyName}</h2>
              <p>{claim.contactEmail}</p>
              <p>{claim.operator ? `Linked to ${claim.operator.companyName}` : "Unlinked claim"}</p>
            </div>
            <span className="status-pill">{claim.status}</span>
          </article>
        ))}
      </div>
    </main>
  );
}
