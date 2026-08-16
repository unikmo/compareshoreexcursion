import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "./components/site-shell";
import { getRegionTone, ports } from "./ports/port-data";

export const metadata: Metadata = {
  title: "Curated Independent Shore Excursions",
  description:
    "Three standout experiences and a few worthwhile alternatives, carefully selected for each cruise port.",
};

const featuredSlugs = ["roatan", "cozumel", "barcelona", "santorini", "juneau", "civitavecchia-rome"];

export default function HomePage() {
  const featuredPorts = featuredSlugs.flatMap((slug) => {
    const match = ports.find((item) => item.slug === slug);
    return match ? [match] : [];
  });

  return (
    <main className="cse-page">
      <SiteHeader />

      <section className="cse-home-hero">
        <div className="cse-home-hero-copy">
          <p className="cse-eyebrow">Curated independent shore excursions</p>
          <h1>Make the most of every port day</h1>
          <p className="cse-lead">
            Three standout experiences and a few worthwhile alternatives—carefully selected for each cruise port.
          </p>
          <div className="cse-actions">
            <Link className="cse-button cse-button-primary" href="/ports">Choose your port</Link>
            <Link className="cse-button cse-button-secondary" href="/ports#all-ports">Browse all ports</Link>
          </div>
          <ul className="cse-trust-list" aria-label="What to expect">
            <li>60 major cruise ports</li>
            <li>3 top picks per port</li>
            <li>No checkout on this site</li>
          </ul>
        </div>

        <div className="cse-editorial-card" aria-label="How a port guide is organised">
          <div className="cse-editorial-topline">
            <span>Roatán</span>
            <span>3 top picks</span>
          </div>
          <ol>
            <li><span>01</span><strong>Sloth sanctuary & island highlights</strong></li>
            <li><span>02</span><strong>West Bay reef snorkel & beach</strong></li>
            <li><span>03</span><strong>Custom private driver tour</strong></li>
          </ol>
          <p>Plus three quieter alternatives when the obvious choices are not your style.</p>
        </div>
      </section>

      <section className="cse-model-strip" aria-label="Affiliate business model">
        <strong>The best of every port—without the endless searching.</strong>
        <span>Check the live options on Viator.</span>
        <span>Book and get support there.</span>
      </section>

      <section className="cse-section">
        <div className="cse-section-heading">
          <div>
            <p className="cse-eyebrow">Popular starting points</p>
            <h2>Find the day that belongs to this port.</h2>
          </div>
          <Link className="cse-text-link" href="/ports">Browse all 60 ports →</Link>
        </div>
        <div className="cse-featured-grid">
          {featuredPorts.map((port) => (
            <Link className={`cse-featured-port cse-region-${getRegionTone(port.region)}`} href={`/ports/${port.slug}`} key={port.slug}>
              <span>{port.region}</span>
              <h3>{port.name}</h3>
              <p>{port.topActivities[0].title}</p>
              <strong>See the six picks →</strong>
            </Link>
          ))}
        </div>
      </section>

      <section className="cse-section cse-how" id="how-it-works">
        <div className="cse-section-heading cse-centered">
          <div>
            <p className="cse-eyebrow">How it works</p>
            <h2>Enough choice to decide. Not enough to get lost.</h2>
          </div>
        </div>
        <div className="cse-step-grid">
          <article><span>1</span><h3>Choose the port</h3><p>Every guide starts with the realities and distinctive experiences of that specific call.</p></article>
          <article><span>2</span><h3>Review three strong options</h3><p>The dominant section contains only the activities most likely to define the day.</p></article>
          <article><span>3</span><h3>Check live tours</h3><p>Viator shows the available local operators, current prices, reviews and booking terms.</p></article>
        </div>
      </section>

      <section className="cse-section cse-affiliate-explainer">
        <div>
          <p className="cse-eyebrow">Deliberately affiliate-only</p>
          <h2>We help you choose. We do not operate the excursion.</h2>
        </div>
        <div>
          <p>
            PortDay Picks does not take payments, manage drivers, verify insurance or provide a return-to-ship guarantee.
            The local supplier operates the experience and Viator handles the booking transaction and customer-service process.
          </p>
          <p className="cse-disclosure">Affiliate disclosure: we may earn a commission if you book after following one of our Viator links.</p>
        </div>
      </section>

      <SiteFooter />
    </main>
  );
}
