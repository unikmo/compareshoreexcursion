import Link from "next/link";
import "../shore-excursions.css";
import { PORTS } from "../ports/port-data";

export default function GroupMatchingPage() {
  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link href="/" className="cse-logo">Compare Shore Excursions</Link>
        <div className="cse-nav-links">
          <Link href="/">Home</Link>
          <Link href="/ports">Ports</Link>
        </div>
      </nav>

      <section className="cse-hero cse-hero-vertical">
        <div className="cse-hero-copy">
          <p className="cse-eyebrow">Phase 2 · group matching waitlist</p>
          <h1>Split a better private tour with cruisers on your sailing.</h1>
          <p className="cse-subhead">
            Group matching should stay waitlist-first until comparison traffic proves demand. Capture port, sailing date, activity, and email now; build matching only when enough users overlap.
          </p>
        </div>
        <figure className="cse-hero-image-card">
          <img src="https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=1400&q=80" alt="Travelers exploring a scenic destination together" />
          <figcaption>Private tours become more affordable when the right passengers split the same port day.</figcaption>
        </figure>
      </section>

      <section className="cse-card cse-waitlist-card">
        <div>
          <p className="cse-eyebrow">Group matching waitlist</p>
          <h2>Tell us your sailing and port day.</h2>
          <p>We will use this as a lightweight demand signal before building full passenger-to-passenger matching.</p>
          <div className="cse-vertical-steps small">
            <article><strong>1. Choose a port</strong><p>Start where your ship stops.</p></article>
            <article><strong>2. Name the activity</strong><p>Private driver, snorkeling, Rome day trip, beach club, or similar.</p></article>
            <article><strong>3. Join the signal</strong><p>If enough users overlap, we can build the matching layer.</p></article>
          </div>
        </div>
        <form className="cse-form">
          <label>
            <span>Cruise port</span>
            <select name="port" defaultValue="barcelona">
              {PORTS.map((port) => <option key={port.slug} value={port.slug}>{port.name}</option>)}
            </select>
          </label>
          <label>
            <span>Sailing / port date</span>
            <input type="date" name="date" />
          </label>
          <label>
            <span>Activity you want to split</span>
            <input name="activity" placeholder="Private driver, snorkeling, Rome day trip" />
          </label>
          <label>
            <span>Email</span>
            <input type="email" name="email" placeholder="name@example.com" />
          </label>
          <button type="submit">Join group-matching waitlist</button>
        </form>
      </section>
    </main>
  );
}
