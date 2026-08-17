import Link from "next/link";

export default function NotFound() {
  return (
    <main className="cse-page">
      <section className="cse-empty-state">
        <p className="cse-eyebrow">Port not found</p>
        <h1>That port guide is not available yet.</h1>
        <p>Browse the ports we have already researched.</p>
        <Link className="cse-button cse-button-primary" href="/ports">Browse ports</Link>
      </section>
    </main>
  );
}
