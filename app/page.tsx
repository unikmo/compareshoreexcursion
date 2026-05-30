import Link from "next/link";

export default function HomePage() {
  return (
    <main className="foundation-panel">
      <p className="eyebrow">ShuttleFlow foundation</p>
      <h1>Role-based MVP shell</h1>
      <p>
        The app is now structured around Customer, Operator, and Admin areas with Prisma, local SQLite configuration,
        and Supabase Auth placeholders ready for integration.
      </p>
      <div className="foundation-links" aria-label="Role areas">
        <Link href="/customer">Customer</Link>
        <Link href="/operator">Operator</Link>
        <Link href="/admin">Admin</Link>
      </div>
    </main>
  );
}
