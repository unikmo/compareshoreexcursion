import Link from "next/link";
import { requireRole } from "@/lib/auth/session";

export default async function AdminPage() {
  await requireRole(["ADMIN"]);

  return (
    <main className="foundation-panel">
      <p className="eyebrow">Admin</p>
      <h1>Marketplace operations</h1>
      <div className="foundation-links">
        <Link href="/admin/operators">Operators</Link>
        <Link href="/admin/bookings">Bookings</Link>
        <Link href="/admin/manifests">Passenger manifests</Link>
        <Link href="/admin/payments">Payments</Link>
        <Link href="/admin/countries">Countries</Link>
        <Link href="/admin/regions">Regions</Link>
        <Link href="/admin/cities">Cities</Link>
        <Link href="/admin/routes">Routes</Link>
        <Link href="/admin/departures">Departures</Link>
        <Link href="/admin/operator-routes">Operator routes</Link>
        <Link href="/admin/locations">Locations</Link>
        <Link href="/admin/events">Events</Link>
        <Link href="/admin/claims">Claims</Link>
      </div>
    </main>
  );
}
