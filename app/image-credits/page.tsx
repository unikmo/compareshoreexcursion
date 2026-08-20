import type { Metadata } from "next";
import Link from "next/link";
import { SiteFooter, SiteHeader } from "../components/site-shell";
import { ports } from "../ports/port-data";
import { getPortImage } from "../ports/port-images";

export const metadata: Metadata = {
  title: "Destination Image Credits",
  description: "Source and licence links for destination photography used by Shore Excursion Picks.",
  robots: { index: false, follow: true },
  alternates: { canonical: "/image-credits" },
};

export default function ImageCreditsPage() {
  return (
    <main className="cse-page">
      <SiteHeader />

      <section className="cse-credits-page">
        <div className="cse-credits-heading">
          <p className="cse-eyebrow">Transparency</p>
          <h1>Destination image credits</h1>
          <p>Each port uses a distinct destination image. The links below open the original Wikimedia Commons file page with creator and licence information.</p>
        </div>

        <div className="cse-credits-grid">
          {ports.map((port) => {
            const image = getPortImage(port);
            return (
              <article key={port.slug}>
                <span>{port.country}</span>
                <strong>{port.name}</strong>
                {image.sourceUrl ? (
                  <a href={image.sourceUrl} target="_blank" rel="noreferrer noopener">Source & licence ↗</a>
                ) : (
                  <small>Editorial image</small>
                )}
              </article>
            );
          })}
        </div>

        <Link className="cse-text-link" href="/ports">← Return to cruise regions</Link>
      </section>

      <SiteFooter />
    </main>
  );
}
