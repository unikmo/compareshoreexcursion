import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminManifestsPage() {
  await requireRole(["ADMIN"]);
  const passengers = await prisma.bookingPassenger.findMany({ include: { booking: true }, orderBy: { createdAt: "desc" }, take: 100 });
  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Passenger manifests</h1>
      <table className="data-table"><thead><tr><th>Booking</th><th>Passenger</th><th>Name</th><th>Status</th><th>QR token</th></tr></thead><tbody>{passengers.map((item) => <tr key={item.id}><td>{item.bookingId}</td><td>{item.passengerNumber}</td><td>{item.passengerName ?? "Pending"}</td><td>{item.status}</td><td>{item.qrCodeToken}</td></tr>)}</tbody></table>
    </main>
  );
}
