import type { Metadata } from "next";
import Link from "next/link";
import { PortFinder } from "../components/port-finder";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { ports } from "./port-data";
import { regionGuides } from "./region-data";

export const metadata: Metadata = {
  title: "Cruise Ports: Curated Independent Shore Excursions",
  description:
    "Choose a cruise region, then find six carefully selected independent shore-excursion ideas for your port.",
  alternates: { canonical: "/ports" },
};

const gatewayFeatures = [
  {
    region: regionGuides[0],
    src: "https://images.unsplash.com/photo-1540202404-a2f29016b523?auto=format&fit=crop&w=1400&q=86",
    alt: "A palm-lined Caribbean island coastline",
  },
  {
    region: regionGuides[1],
    src: "https://images.unsplash.com/photo-1552832230-c0197dd311b5?auto=format&fit=crop&w=1400&q=86",
    alt: "Historic architecture in the Mediterranean",
  },
  {
    region: regionGuides[2],
    src: "https://images.unsplash.com/photo-1501785888041-af3ef285b470?auto=format&fit=crop&w=1400&q=86",
    alt: "A rugged mountain landscape in the north",
  },
] as const;

export default function PortsPage() {
  const searchablePorts = ports.map((port) => ({
    slug: port.slug,
    name: port.name,
    country: port.country,
    region: port.region,
    topPick: port.topActivities[0].title,
  }));

  return (
    <main className="cse-page">
      <SiteHeader />

      <section className="cse-ports-gateway-hero">
        <div className="cse-ports-gateway-copy">
          <p className="cse-eyebrow">60 ports · 8 cruise regions</p>
          <h1>Find your port without searching an endless directory.</h1>
          <p>Choose the region, open the port, and start with the three experiences most worth considering.</p>
          <a className="cse-button cse-button-primary" href="#cruise-regions">Choose a region</a>
        </div>

        <div className="cse-ports-gateway-visual" aria-label="Cruise regions featured in the directory">
          {gatewayFeatures.map(({ region, src, alt }, index) => (
            <Link className={`cse-gateway-image cse-gateway-image-${index + 1}`} href={`/ports/regions/${region.slug}`} key={region.slug}>
              <img src={src} alt={alt} width="1000" height="760" fetchPriority={index === 0 ? "high" : undefined} />
              <span>{region.name}</span>
            </Link>
          ))}
        </div>
      </section>

      <section className="cse-ports-region-section" id="cruise-regions">
        <div className="cse-ports-region-heading">
          <div>
            <p className="cse-eyebrow">Browse by cruise region</p>
            <h2>Start broad. Decide quickly.</h2>
          </div>
          <p>No wall of 60 nearly identical cards. Each regional page contains only the ports relevant to that itinerary.</p>
        </div>

        <div className="cse-region-card-grid">
          {regionGuides.map((region) => {
            const portCount = ports.filter((port) => port.region === region.name).length;
            return (
              <Link className="cse-region-card" href={`/ports/regions/${region.slug}`} key={region.slug}>
                <img src={region.image.src} alt={region.image.alt} width="1000" height="700" loading="lazy" />
                <div className="cse-region-card-shade" aria-hidden="true" />
                <div className="cse-region-card-copy">
                  <span>{portCount} ports</span>
                  <h2>{region.name}</h2>
                  <p>{region.eyebrow}</p>
                  <strong>Explore region <b aria-hidden="true">↗</b></strong>
                </div>
              </Link>
            );
          })}
        </div>
      </section>

      <section className="cse-directory-search">
        <div className="cse-directory-search-heading">
          <div>
            <p className="cse-eyebrow">Know the port already?</p>
            <h2>Go straight to it.</h2>
          </div>
          <p>Search by port, country, region or the kind of experience you want.</p>
        </div>
        <PortFinder ports={searchablePorts} />
      </section>

      <aside className="cse-coverage-note">
        <strong>Why 60 ports?</strong>
        <p>We publish only where independent inventory exists and six recommendations can be made genuinely specific.</p>
      </aside>

      <SiteFooter />
    </main>
  );
}
