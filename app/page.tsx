import Link from "next/link";
import "./shore-excursions.css";

type Offer = {
  provider: string;
  providerType: "Official" | "Independent";
  title: string;
  price: number;
  currency: string;
  duration: string;
  pickup: string;
  rating?: string;
  protection: string;
  verdict: string;
};

const ports = [
  { slug: "barcelona", name: "Barcelona", country: "Spain", activity: "City highlights and Sagrada Família" },
  { slug: "cozumel", name: "Cozumel", country: "Mexico", activity: "Snorkeling, beach clubs, catamarans" },
  { slug: "port-canaveral", name: "Port Canaveral", country: "USA", activity: "Kennedy Space Center and Orlando day trips" },
];

const mockOffers: Offer[] = [
  {
    provider: "Cruise line official",
    providerType: "Official",
    title: "Barcelona city highlights",
    price: 149,
    currency: "€",
    duration: "4.5 hours",
    pickup: "Pier pickup",
    protection: "Ship-backed timing protection",
    verdict: "Safety edge",
  },
  {
    provider: "Viator",
    providerType: "Independent",
    title: "Barcelona highlights small-group tour",
    price: 92,
    currency: "€",
    duration: "4 hours",
    pickup: "Meet near port shuttle stop",
    rating: "4.7 / 5",
    protection: "Check timing buffer and cancellation terms",
    verdict: "Same port day. Lower price.",
  },
  {
    provider: "GetYourGuide",
    providerType: "Independent",
    title: "Sagrada Família and city tour",
    price: 104,
    currency: "€",
    duration: "5 hours",
    pickup: "Central meeting point",
    rating: "4.6 / 5",
    protection: "Independent booking; consider travel protection",
    verdict: "Similar tour. Better value.",
  },
];

function formatMoney(currency: string, amount: number) {
  return `${currency}${amount}`;
}

export default function HomePage() {
  const official = mockOffers.find((offer) => offer.providerType === "Official");
  const bestIndependent = mockOffers
    .filter((offer) => offer.providerType === "Independent")
    .sort((a, b) => a.price - b.price)[0];
  const saving = official && bestIndependent ? official.price - bestIndependent.price : 0;

  return (
    <main className="cse-page">
      <nav className="cse-nav" aria-label="Main navigation">
        <Link className="cse-logo" href="/">Compare Shore Excursions</Link>
        <div className="cse-nav-links">
          <Link href="/ports">Ports</Link>
          <Link href="/group-matching">Group matching</Link>
        </div>
      </nav>

      <section className="cse-hero">
        <div className="cse-hero-copy">
          <p className="cse-eyebrow">Value + protection for your port day</p>
          <h1>Compare shore excursions before you overpay on board.</h1>
          <p className="cse-subheadline">
            See cruise-line prices, independent alternatives, savings, timing trade-offs, and protection options side by side for your port day.
          </p>
          <div className="cse-hero-actions">
            <a className="cse-primary" href="#compare">Compare my port day</a>
            <Link className="cse-secondary" href="/ports">Browse popular ports</Link>
          </div>
          <p className="cse-proof">Cruise-line price · Independent options · Timing trade-off · Protection check</p>
        </div>

        <section className="cse-search-card" id="compare" aria-labelledby="compare-title">
          <p className="cse-card-kicker">Start comparison</p>
          <h2 id="compare-title">What port are you visiting?</h2>
          <form className="cse-form">
            <label>
              <span>Cruise port</span>
              <select defaultValue="barcelona" name="port">
                {ports.map((port) => (
                  <option key={port.slug} value={port.slug}>{port.name}</option>
                ))}
              </select>
            </label>
            <label>
              <span>Sailing / port date</span>
              <input type="date" name="sailingDate" />
            </label>
            <label>
              <span>Activity type</span>
              <select defaultValue="city-tour" name="activityType">
                <option value="city-tour">City tour</option>
                <option value="snorkeling">Snorkeling</option>
                <option value="beach-club">Beach club</option>
                <option value="private-driver">Private driver</option>
                <option value="food-tour">Food tour</option>
              </select>
            </label>
            <button type="button">Show mock comparison</button>
          </form>
        </section>
      </section>

      <section className="cse-snapshot" aria-label="Example comparison result">
        <div className="cse-section-heading">
          <p className="cse-eyebrow">Example comparison</p>
          <h2>Official vs independent, side by side.</h2>
          <p>
            The first release uses curated/mock data so the product can validate the comparison flow before expensive integrations.
          </p>
        </div>

        <div className="cse-savings-strip">
          <span>Example saving</span>
          <strong>{formatMoney("€", saving)} per person</strong>
          <small>Independent option compared with official cruise-line price.</small>
        </div>

        <div className="cse-offer-grid">
          {mockOffers.map((offer) => (
            <article className={offer.providerType === "Official" ? "cse-offer official" : "cse-offer"} key={`${offer.provider}-${offer.title}`}>
              <div className="cse-offer-topline">
                <span>{offer.providerType}</span>
                <strong>{offer.provider}</strong>
              </div>
              <h3>{offer.title}</h3>
              <p className="cse-price">{formatMoney(offer.currency, offer.price)}</p>
              <ul>
                <li>{offer.duration}</li>
                <li>{offer.pickup}</li>
                {offer.rating && <li>{offer.rating}</li>}
              </ul>
              <div className="cse-verdict">
                <strong>{offer.verdict}</strong>
                <p>{offer.protection}</p>
              </div>
              {offer.providerType === "Independent" && (
                <div className="cse-protection-box">
                  <strong>Protection check</strong>
                  <p>Independent booking can save money, but check return timing and consider trip delay/interruption protection.</p>
                </div>
              )}
              <button type="button" className="cse-card-button">Review option</button>
            </article>
          ))}
        </div>
      </section>

      <section className="cse-port-section">
        <div className="cse-section-heading">
          <p className="cse-eyebrow">First SEO ports</p>
          <h2>Start narrow. Compare deeply.</h2>
          <p>Launch with a few ports and the highest-intent activities before expanding coverage.</p>
        </div>
        <div className="cse-port-grid">
          {ports.map((port) => (
            <Link className="cse-port-card" href={`/ports/${port.slug}`} key={port.slug}>
              <span>{port.country}</span>
              <h3>{port.name}</h3>
              <p>{port.activity}</p>
            </Link>
          ))}
        </div>
      </section>

      <section className="cse-waitlist">
        <div>
          <p className="cse-eyebrow">Later, after traffic</p>
          <h2>Group matching waits until comparison demand is proven.</h2>
          <p>Capture sailing-date interest now. Build matching only after real users return around the same port and activity.</p>
        </div>
        <form className="cse-inline-form">
          <input type="email" placeholder="Email for group-matching waitlist" />
          <button type="button">Join waitlist</button>
        </form>
      </section>
    </main>
  );
}
