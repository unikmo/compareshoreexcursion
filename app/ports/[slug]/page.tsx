import Link from "next/link";
import "../../shore-excursions.css";

const portData: Record<string, { name: string; country: string; activities: string[] }> = {
  barcelona: {
    name: "Barcelona",
    country: "Spain",
    activities: ["City highlights", "Sagrada Família", "Food tour", "Private driver"],
  },
  cozumel: {
    name: "Cozumel",
    country: "Mexico",
    activities: ["Snorkeling", "Beach club", "Catamaran", "ATV / jeep tour"],
  },
  "port-canaveral": {
    name: "Port Canaveral",
    country: "USA",
    activities: ["Kennedy Space Center", "Orlando day trip", "Airboat tour", "Beach day"],
  },
};

export default function PortPage({ params }: { params: { slug: string } }) {
  const port = portData[params.slug] ?? portData.barcelona;

  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link className="cse-logo" href="/">Compare Shore Excursions</Link>
        <div className="cse-nav-links"><Link href="/ports">Ports</Link></div>
      </nav>
      <section className="cse-port-section">
        <div className="cse-section-heading">
          <p className="cse-eyebrow">{port.country}</p>
          <h2>{port.name} shore excursion comparison.</h2>
          <p>Compare official cruise-line excursions with independent alternatives, timing trade-offs, and protection options.</p>
        </div>
        <div className="cse-port-grid" style={{ marginTop: 28 }}>
          {port.activities.map((activity) => (
            <article className="cse-port-card" key={activity}>
              <span>Activity</span>
              <h3>{activity}</h3>
              <p>Official vs independent comparison scaffold. Add live data after affiliate and manual price sourcing are ready.</p>
            </article>
          ))}
        </div>
      </section>
    </main>
  );
}
