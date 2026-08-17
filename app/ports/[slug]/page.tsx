import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { viatorAffiliateUrl } from "../../lib/viator";
import { getPort, getRegionTone, getViatorSearchUrl, ports } from "../port-data";
import { getActivityImage, getPortImage } from "../port-images";
import type { Activity, Port } from "../port-data";

type PortPageProps = { params: Promise<{ slug: string }> };

type ActivityCardProps = {
  item: Activity;
  port: Port;
  rank: number;
  quiet?: boolean;
};

function ActivityCard({ item, port, rank, quiet = false }: ActivityCardProps) {
  const href = viatorAffiliateUrl(getViatorSearchUrl(port, item));
  const image = getActivityImage(port, item, rank - 1);

  return (
    <article className={quiet ? "cse-activity-card cse-activity-card-quiet" : "cse-activity-card"}>
      {!quiet && (
        <div className="cse-activity-card-media">
          <img src={image.src} alt={image.alt} width="720" height="440" loading="lazy" />
        </div>
      )}
      <div className="cse-activity-rank">{String(rank).padStart(2, "0")}</div>
      <div className="cse-activity-copy">
        <h3>{item.title}</h3>
        <p>{item.note}</p>
      </div>
      <a href={href} target="_blank" rel="sponsored noreferrer noopener">
        View options on Viator <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

const seoTitles: Record<string, string> = {
  cozumel: "Best Cozumel Shore Excursions: 6 Curated Picks",
  nassau: "Best Things to Do in Nassau on a Cruise Port Day",
  barcelona: "Independent Shore Excursions in Barcelona",
  "civitavecchia-rome": "Rome Cruise Port: Best Tours from Civitavecchia",
};

function getSeoTitle(port: Port) {
  return seoTitles[port.slug] ?? `Best ${port.name} Shore Excursions: 6 Curated Picks`;
}

export function generateStaticParams() {
  return ports.map((port) => ({ slug: port.slug }));
}

export async function generateMetadata({ params }: PortPageProps): Promise<Metadata> {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) return {};

  const title = getSeoTitle(port);

  return {
    title,
    description: `${port.heroLine} Compare three top ${port.name} shore-excursion ideas and three less-obvious alternatives, with live options on Viator.`,
    alternates: { canonical: `/ports/${port.slug}` },
    openGraph: {
      title,
      description: port.heroLine,
      url: `/ports/${port.slug}`,
      type: "article",
    },
  };
}

export default async function PortPage({ params }: PortPageProps) {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) notFound();

  const allActivities = [...port.topActivities, ...port.nicheActivities];
  const heroImage = getPortImage(port);
  const itemList = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: `Best independent shore excursions in ${port.name}`,
    numberOfItems: allActivities.length,
    itemListElement: allActivities.map((item, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: item.title,
      url: viatorAffiliateUrl(getViatorSearchUrl(port, item)),
    })),
  };

  return (
    <main className="cse-page">
      <SiteHeader />

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(itemList) }} />

      <div className="cse-breadcrumbs" aria-label="Breadcrumb">
        <Link href="/">Home</Link><span>/</span><Link href="/ports">Ports</Link><span>/</span><span>{port.name}</span>
      </div>

      <section className={`cse-port-intro cse-region-${getRegionTone(port.region)}`}>
        <div>
          <p className="cse-eyebrow">{port.region} · {port.country}</p>
          <h1>Best independent shore excursions in {port.name}</h1>
          <p className="cse-lead">{port.heroLine}</p>
          <div className="cse-port-trust">
            <span>3 top picks</span><span>3 niche alternatives</span><span>Live options on Viator</span>
          </div>
        </div>
        <div className="cse-port-intro-media">
          <img src={heroImage.src} alt={heroImage.alt} width="900" height="700" fetchPriority="high" />
          <aside>
            <span>Port-day note</span>
            <p>{port.portNote}</p>
          </aside>
        </div>
      </section>

      <section className="cse-section cse-picks-section">
        <div className="cse-section-heading">
          <div>
            <p className="cse-eyebrow">Start here</p>
            <h2>The 3 Best Picks</h2>
          </div>
          <p className="cse-heading-note">We rank activity types, not operators. Viator shows live suppliers, prices, reviews and terms. These are affiliate links; booking through them may earn us a commission at no extra cost to you.</p>
        </div>
        <div className="cse-primary-activities">
          {port.topActivities.map((item, index) => <ActivityCard item={item} port={port} rank={index + 1} key={item.title} />)}
        </div>
      </section>

      <section className="cse-first-time-pick">
        <div>
          <p className="cse-eyebrow">Best for First-Time Visitors</p>
          <h2>{port.topActivities[0].title}</h2>
        </div>
        <p>{port.topActivities[0].note}</p>
      </section>

      <section className="cse-niche-section">
        <details>
          <summary>
            <span><small>Worth a look</small><strong>3 Less-Obvious Alternatives</strong></span>
            <b aria-hidden="true">+</b>
          </summary>
          <div className="cse-niche-activities">
            {port.nicheActivities.map((item, index) => (
              <ActivityCard item={item} port={port} rank={index + 4} quiet key={item.title} />
            ))}
          </div>
        </details>
      </section>

      <section className="cse-section cse-booking-checks">
        <div>
          <p className="cse-eyebrow">Getting Back to the Ship</p>
          <h2>Plan the return before you book.</h2>
          <p className="cse-heading-note">{port.portNote}</p>
        </div>
        <div className="cse-check-grid">
          <article><span>01</span><h3>Match the terminal</h3><p>Confirm the exact berth, tender or independent meeting point named in the listing.</p></article>
          <article><span>02</span><h3>Work backward from all-aboard</h3><p>Allow for local traffic, tender queues and a return margin you are comfortable with.</p></article>
          <article><span>03</span><h3>Read the operator's terms</h3><p>Check inclusions, cancellation rules and what happens if the ship's schedule changes.</p></article>
        </div>
      </section>

      <section className="cse-compact-explainer">
        <div><p className="cse-eyebrow">Book with Our Partner</p><h2>Check live options on Viator.</h2></div>
        <div>
          <p>Shore Excursion Picks provides independent research. It does not operate tours, collect payment or guarantee return to the ship.</p>
          <p>When you follow a link, Viator displays the live inventory and handles the booking process. The selected local supplier delivers the experience.</p>
          <p className="cse-disclosure">We may earn a commission from qualifying Viator bookings, at no additional cost to you.</p>
        </div>
      </section>

      <div className="cse-next-port">
        <Link href="/ports">← Choose another cruise port</Link>
      </div>

      <SiteFooter />
    </main>
  );
}
