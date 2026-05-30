import Link from "next/link";

export default function HomePage() {
  return (
    <main className="foundation-panel">
      <p className="eyebrow">WAYLO foundation</p>
      <h1>Fixed-price shuttle marketplace</h1>
      <p>
        Waylo connects passengers with verified shuttle operators on scheduled hub-to-hub routes between airports, ports, city hubs, and event locations.
      </p>
      <div className="foundation-links" aria-label="Role areas">
        <Link href="/customer">Customer</Link>
        <Link href="/operator">Operator</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </main>
  );
}

