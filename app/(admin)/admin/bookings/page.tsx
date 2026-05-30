import { requireRole } from "@/lib/auth/session";
import { prisma } from "@/lib/prisma";

export default async function AdminBookingsPage() {
  await requireRole(["ADMIN"]);

  const bookings = await prisma.booking.findMany({
    include: {
      customer: { include: { user: true } },
      operator: true,
      route: true,
    },
    orderBy: { createdAt: "desc" },
  });

  return (
    <main className="foundation-panel wide">
      <p className="eyebrow">Admin</p>
      <h1>Bookings</h1>
      <table className="data-table">
        <thead>
          <tr>
            <th>Route</th>
            <th>Customer</th>
            <th>Operator</th>
            <th>Status</th>
            <th>Revenue</th>
          </tr>
        </thead>
        <tbody>
          {bookings.map((booking) => (
            <tr key={booking.id}>
              <td>{booking.route.name}</td>
              <td>{booking.customer.user.fullName}</td>
              <td>{booking.operator.companyName}</td>
              <td>{booking.bookingStatus}</td>
              <td>${(booking.platformRevenueCents / 100).toFixed(2)}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
}
