import type { Metadata } from "next";
import "./globals.css";
import "./shore-excursions.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://shoreexcursionpicks.com";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Shore Excursion Picks",
    template: "%s | Shore Excursion Picks",
  },
  description:
    "Find three standout independent shore excursions and three worthwhile alternatives for 60 major cruise ports.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Shore Excursion Picks",
    description:
      "The best shore excursions—without endless searching.",
    url: siteUrl,
    siteName: "Shore Excursion Picks",
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
