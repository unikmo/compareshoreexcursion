import Link from "next/link";

export function SiteHeader() {
  return (
    <header className="cse-nav">
      <Link className="cse-brand" href="/" aria-label="PortDay Picks home">
        <span className="cse-brand-mark">PDP</span>
        <span>PortDay Picks</span>
      </Link>
      <nav className="cse-nav-links" aria-label="Main navigation">
        <Link href="/ports">All ports</Link>
        <Link href="/#how-it-works">How it works</Link>
        <Link className="cse-nav-cta" href="/ports">Choose your port</Link>
      </nav>
    </header>
  );
}

export function SiteFooter() {
  return (
    <footer className="cse-footer">
      <div className="cse-brand">
        <span className="cse-brand-mark">PDP</span>
        <span>PortDay Picks</span>
      </div>
      <p>The best of every port—without the endless searching.</p>
      <p>We may earn a commission from qualifying bookings, at no extra cost to you.</p>
    </footer>
  );
}
