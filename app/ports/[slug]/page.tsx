import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteFooter, SiteHeader } from "../../components/site-shell";
import { viatorAffiliateUrl } from "../../lib/viator";
import { getPort, getRegionTone, getViatorSearchUrl, ports } from "../port-data";
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

  return (
    <article className={quiet ? "cse-activity-card cse-activity-card-quiet" : "cse-activity-card"}>
      <div className="cse-activity-rank">{String(rank).padStart(2, "0")}</div>
      <div className="cse-activity-copy">
        <h3>{item.title}</h3>
        <p>{item.note}</p>
      </div>
      <a href={href} target="_blank" rel="sponsored noreferrer noopener">
        See live tours <span aria-hidden="true">↗</span>
      </a>
    </article>
  );
}

export function generateStaticParams() {
  return ports.map((port) => ({ slug: port.slug }));
}

export async function generateMetadata({ params }: PortPageProps): Promise<Metadata> {
  const { slug } = await params;
  const port = getPort(slug);
  if (!port) return {};

  return {
    title: `6 Best Independent ${port.name} Shore Excursions`,
    description: `${port.heroLine} Compare three top ${port.name} shore-excursion ideas and three less-obvious alternatives, with live options on Viator.`,
    alternates: { canonical: `/ports/${port.slug}` },
    openGraph: {
      title: `6 Best Independent ${port.name} Shore Excursions`,
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
        <aside>
          <span>Port-day note</span>
          <p>{port.portNote}</p>
        </aside>
      </section>

      <section className="cse-section cse-picks-section">
        <div className="cse-section-heading">
          <div>
            <p className="cse-eyebrow">Start here</p>
            <h2>The three strongest ways to spend the day</h2>
          </div>
          <p className="cse-heading-note">We rank activity types, not operators. Viator shows live suppliers, prices, reviews and terms. These are affiliate links; booking through them may earn us a commission at no extra cost to you.</p>
        </div>
        <div className="cse-primary-activities">
          {port.topActivities.map((item, index) => <ActivityCard item={item} port={port} rank={index + 1} key={item.title} />)}
        </div>
      </section>

      <section className="cse-niche-section">
        <details>
          <summary>
            <span><small>Less obvious</small><strong>See three niche {port.name} ideas</strong></span>
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
          <p className="cse-eyebrow">Before you click through</p>
          <h2>Three checks protect the port day.</h2>
        </div>
        <div className="cse-check-grid">
          <article><span>01</span><h3>Match the terminal</h3><p>Confirm the exact berth, tender or independent meeting point named in the listing.</p></article>
          <article><span>02</span><h3>Work backward from all-aboard</h3><p>Allow for local traffic, tender queues and a return margin you are comfortable with.</p></article>
          <article><span>03</span><h3>Read the operator's terms</h3><p>Check inclusions, cancellation rules and what happens if the ship's schedule changes.</p></article>
        </div>
      </section>

      <section className="cse-compact-explainer">
        <div><p className="cse-eyebrow">Affiliate-only by design</p><h2>One clean handoff.</h2></div>
        <div>
          <p>Compare Shore Excursions provides independent research. It does not operate tours, collect payment or guarantee return to the ship.</p>
          <p>When you follow a link, Viator displays the live inventory and handles the booking process. The selected local supplier delivers the experience.</p>
          <p className="cse-disclosure">We may earn a commission from qualifying Viator bookings, at no additional cost to you.</p>
        </div>
      </section>

      <div className="cse-next-port">
        <Link href="/ports">← Compare another cruise port</Link>
      </div>

      <SiteFooter />
    </main>
  );
}
