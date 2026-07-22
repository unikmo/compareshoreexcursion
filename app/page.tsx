import Link from "next/link";
import "./shore-excursions.css";
import { PORTS } from "./ports/port-data";

export default function HomePage() {
  const featured = PORTS.slice(0, 6);

  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link href="/" className="cse-logo">Compare Shore Excursions</Link>
        <div className="cse-nav-links">
          <Link href="/ports">Ports</Link>
          <Link href="/group-matching">Group matching</Link>
        </div>
      </nav>

      <section className="cse-hero cse-hero-vertical">
        <div className="cse-hero-copy">
          <p className="cse-eyebrow">Value + protection for your port day</p>
          <h1>Compare shore excursions before you overpay on board.</h1>
          <p className="cse-subhead">
            See cruise-line prices, independent alternatives, shorter tours, timing trade-offs, and protection options side by side.
          </p>
          <div className="cse-cta-row">
            <Link href="/ports" className="cse-button dark">Browse cruise ports</Link>
            <Link href="/group-matching" className="cse-button light">Find cruisers to split a tour</Link>
          </div>
        </div>
        <figure className="cse-hero-image-card">
          <img src="https://images.unsplash.com/photo-1548574505-5e239809ee19?auto=format&fit=crop&w=1400&q=80" alt="Cruise ship near a tropical port" />
          <figcaption>Compare the ship option, independent tours, and the protection trade-off before booking.</figcaption>
        </figure>
      </section>

      <section className="cse-card cse-stack-section" aria-labelledby="start-comparison">
        <div>
          <p className="cse-eyebrow">Start comparison</p>
          <h2 id="start-comparison">What port are you visiting?</h2>
          <p>Start with a port page. The MVP uses mock comparisons now, then connects Viator, GetYourGuide, and curated independent sources.</p>
        </div>
        <div className="cse-port-grid compact">
          {featured.map((port) => (
            <Link href={`/ports/${port.slug}`} key={port.slug} className="cse-port-card with-image">
              <img src={port.image} alt={port.imageAlt} />
              <span>{port.region} · {port.country}</span>
              <strong>{port.name}</strong>
              <small>{port.heroActivity}</small>
            </Link>
          ))}
        </div>
      </section>

      <section className="cse-card cse-stack-section">
        <p className="cse-eyebrow">How comparisons work</p>
        <div className="cse-vertical-steps">
          <article>
            <strong>1. Compare the official excursion</strong>
            <p>Use the cruise-line price as the safety-net baseline.</p>
          </article>
          <article>
            <strong>2. Check independent options</strong>
            <p>Link out to Viator, GetYourGuide, and independent sources with clear savings and trade-offs.</p>
          </article>
          <article>
            <strong>3. Protect the decision</strong>
            <p>If the user leaves the cruise-line safety net, show timing buffer and travel protection context.</p>
          </article>
        </div>
      </section>
    </main>
  );
}
