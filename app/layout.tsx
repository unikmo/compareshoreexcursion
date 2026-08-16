import type { Metadata } from "next";
import "./globals.css";
import "./shore-excursions.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://portdaypicks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "PortDay Picks",
    template: "%s | PortDay Picks",
  },
  description:
    "Find three standout independent shore excursions and three worthwhile alternatives for 60 major cruise ports.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "PortDay Picks",
    description:
      "The best of every port—without the endless searching.",
    url: siteUrl,
    siteName: "PortDay Picks",
    type: "website",
  },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
