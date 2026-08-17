import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { ports, regions } from "./port-data";

export const metadata: Metadata = {
  title: "Cruise Ports: Curated Independent Shore Excursions",
  description:
    "Browse 60 major cruise ports across the Caribbean, Mediterranean, Alaska, Europe, Asia-Pacific, Africa, the Middle East and South America.",
  alternates: { canonical: "/ports" },
};

const regionId = (region: string) => region.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");

export default function PortsPage() {
  return (
    <main className="cse-page">
      <SiteHeader />

      <section className="cse-directory-hero" id="all-ports">
        <p className="cse-eyebrow">60 curated cruise ports</p>
        <h1>Choose your port. See the six experiences that fit it.</h1>
        <p>
          Every guide leads with three strong independent activities. Three less-obvious alternatives stay secondary, so the page remains useful without becoming another endless marketplace.
        </p>
      </section>

      <nav className="cse-region-nav" aria-label="Jump to a cruise region">
        {regions.map((region) => <a href={`#${regionId(region)}`} key={region}>{region}</a>)}
      </nav>

      <div className="cse-region-directory">
        {regions.map((region) => {
          const regionPorts = ports.filter((item) => item.region === region);
          return (
            <section className="cse-region-section" id={regionId(region)} key={region}>
              <div className="cse-region-heading">
                <div><p className="cse-eyebrow">Cruise region</p><h2>{region}</h2></div>
                <span>{regionPorts.length} ports</span>
              </div>
              <div className="cse-port-link-grid">
                {regionPorts.map((port) => (
                  <Link href={`/ports/${port.slug}`} key={port.slug}>
                    <span>{port.country}</span>
                    <strong>{port.name}</strong>
                    <small>{port.topActivities[0].title}</small>
                    <b>View guide →</b>
                  </Link>
                ))}
              </div>
            </section>
          );
        })}
      </div>

      <aside className="cse-coverage-note">
        <strong>Why not list every harbour?</strong>
        <p>We publish a port only when independent inventory exists and six recommendations can be made genuinely specific. Thin or duplicated pages stay out of the index.</p>
      </aside>

      <SiteFooter />
    </main>
  );
}
