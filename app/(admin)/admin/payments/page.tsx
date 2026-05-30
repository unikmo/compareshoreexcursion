import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminPaymentsPage() {
  await requireRole(["ADMIN"]);
  const payments = await prisma.payment.findMany({ include: { booking: true }, orderBy: { createdAt: "desc" } });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Payments</h1>
      <table className="data-table"><thead><tr><th>Booking</th><th>Status</th><th>Amount</th><th>Fee</th><th>Payout</th></tr></thead><tbody>{payments.map((item) => <tr key={item.id}><td>{item.bookingId}</td><td>{item.status}</td><td>${(item.amountCents / 100).toFixed(2)}</td><td>${(item.marketplaceFeeCents / 100).toFixed(2)}</td><td>${(item.operatorPayoutCents / 100).toFixed(2)}</td></tr>)}</tbody></table>
    </main>
  );
}
