import Link from "next/link";
import "../shore-excursions.css";

const ports = [
  { slug: "barcelona", name: "Barcelona", country: "Spain", description: "City highlights, Sagrada Família, food tours, and private drivers." },
  { slug: "cozumel", name: "Cozumel", country: "Mexico", description: "Snorkeling, beach clubs, catamarans, ATV tours, and island highlights." },
  { slug: "port-canaveral", name: "Port Canaveral", country: "USA", description: "Kennedy Space Center, Orlando transfers, airboat tours, and beach days." },
];

export default function PortsPage() {
  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link className="cse-logo" href="/">Compare Shore Excursions</Link>
        <div className="cse-nav-links"><Link href="/">Home</Link></div>
      </nav>
      <section className="cse-port-section">
        <div className="cse-section-heading">
          <p className="cse-eyebrow">Port directory</p>
          <h2>Compare excursions by cruise port.</h2>
          <p>Start with a focused set of high-volume ports before expanding coverage.</p>
        </div>
        <div className="cse-port-grid" style={{ marginTop: 28 }}>
          {ports.map((port) => (
            <Link className="cse-port-card" href={`/ports/${port.slug}`} key={port.slug}>
              <span>{port.country}</span>
              <h3>{port.name}</h3>
              <p>{port.description}</p>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
