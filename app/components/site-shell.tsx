import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="cse-nav">
      <Link className="cse-brand" href="/" aria-label="Compare Shore Excursions home">
        <span className="cse-brand-mark">CSE</span>
        <span>Compare Shore Excursions</span>
      </Link>
      <nav className="cse-nav-links" aria-label="Main navigation">
        <Link href="/ports">All ports</Link>
        <Link href="/#how-it-works">How it works</Link>
        <Link className="cse-nav-cta" href="/ports">Find my port</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="cse-footer">
      <div className="cse-brand">
        <span className="cse-brand-mark">CSE</span>
        <span>Compare Shore Excursions</span>
      </div>
      <p>Independent port-day ideas. Booking completed on Viator.</p>
      <p>We may earn a commission from qualifying bookings, at no extra cost to you.</p>
    </footer>
  );
}
