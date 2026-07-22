import Link from "next/link";
import { notFound } from "next/navigation";
import "../../shore-excursions.css";
import { getPort, PORTS } from "../port-data";

export function generateStaticParams() {
  return PORTS.map((port) => ({ slug: port.slug }));
}

export default async function PortPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const port = getPort(slug);

  if (!port) {
    notFound();
  }

  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link href="/" className="cse-logo">Compare Shore Excursions</Link>
        <div className="cse-nav-links">
          <Link href="/ports">Ports</Link>
          <Link href="/group-matching">Group matching</Link>
        </div>
      </nav>

      <article className="cse-card cse-port-page">
        <img className="cse-port-hero-image" src={port.image} alt={port.imageAlt} />
        <p className="cse-eyebrow">{port.region} / {port.country}</p>
        <h1>{port.name} shore excursion comparison.</h1>
        <p>{port.intro}</p>

        <section className="cse-savings-strip">
          <span>Mock official vs independent gap</span>
          <strong>{port.savings}</strong>
          <small>Use this page as the SEO scaffold until live provider data is connected.</small>
        </section>

        <section className="cse-vertical-comparison" aria-label="Official vs independent comparison">
          <article className="cse-option-card official">
            <div>
              <p className="cse-eyebrow">Official cruise-line option</p>
              <h2>Cruise-line official {port.heroActivity}</h2>
              <p>Ship-backed timing protection. Higher price, lower return anxiety.</p>
            </div>
            <div className="cse-price-block">
              <strong>{port.officialPrice}</strong>
              <span>{port.officialDuration}</span>
            </div>
          </article>

          <article className="cse-option-card independent">
            <div>
              <p className="cse-eyebrow">Independent alternative</p>
              <h2>Independent {port.heroActivity}</h2>
              <p>Lower price. Check meeting point, cancellation terms, reviews, and return buffer before booking.</p>
              <div className="cse-provider-row">
                {port.providerLinks.map((link) => (
                  <a key={link.label} href={link.url} target="_blank" rel="noreferrer" className="cse-provider-link">
                    {link.source}
                  </a>
                ))}
              </div>
            </div>
            <div className="cse-price-block">
              <strong>{port.independentPrice}</strong>
              <span>{port.independentDuration}</span>
            </div>
          </article>
        </section>

        <section className="cse-protection-callout">
          <div>
            <p className="cse-eyebrow">Protection check</p>
            <h2>Saving money outside the ship’s excursion desk?</h2>
            <p>Compare the timing buffer and consider travel protection before giving up the cruise-line safety net.</p>
          </div>
          <a href="https://www.insuremytrip.com/" target="_blank" rel="noreferrer" className="cse-button dark">Check protection options</a>
        </section>

        <section className="cse-section-divider">
          <p className="cse-eyebrow">Shorter tour options</p>
          <h2>Three shorter {port.name} tours for more return buffer.</h2>
          <p>Below the official comparison, show shorter independent options. Shorter tours can mean lower prices and more time back near the ship.</p>
          <div className="cse-short-tour-list">
            {port.shorterTours.map((tour) => (
              <a href={tour.url} target="_blank" rel="noreferrer" className="cse-short-tour" key={tour.title}>
                <span>{tour.provider} · {tour.duration}</span>
                <strong>{tour.title}</strong>
                <b>{tour.price}</b>
                <small>{tour.note}</small>
              </a>
            ))}
          </div>
        </section>

        <section className="cse-section-divider">
          <p className="cse-eyebrow">Activity ideas</p>
          <h2>Popular {port.name} excursion searches.</h2>
          <div className="cse-activity-grid">
            {port.activities.map((activity) => (
              <article key={activity}>
                <span>Activity</span>
                <strong>{activity}</strong>
                <p>Official vs independent comparison scaffold. Add live affiliate and official pricing when sourcing is ready.</p>
              </article>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
