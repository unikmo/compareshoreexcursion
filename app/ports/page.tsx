import Link from "next/link";
import "../shore-excursions.css";
import { PORTS } from "./port-data";

export default function PortsPage() {
  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link href="/" className="cse-logo">Compare Shore Excursions</Link>
        <div className="cse-nav-links">
          <Link href="/">Home</Link>
          <Link href="/group-matching">Group matching</Link>
        </div>
      </nav>

      <section className="cse-card cse-stack-section">
        <p className="cse-eyebrow">Indexed cruise ports</p>
        <h1 className="cse-page-title">Build many port pages now. Deepen pricing data where demand appears.</h1>
        <p className="cse-subhead small">
          The first version should index broad port coverage for SEO while using mock comparison scaffolds until live provider and official cruise-line pricing is connected.
        </p>
        <div className="cse-port-grid">
          {PORTS.map((port) => (
            <Link href={`/ports/${port.slug}`} key={port.slug} className="cse-port-card with-image">
              <img src={port.image} alt={port.imageAlt} />
              <span>{port.region} · {port.country}</span>
              <strong>{port.name}</strong>
              <small>{port.activities.slice(0, 3).join(" · ")}</small>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
