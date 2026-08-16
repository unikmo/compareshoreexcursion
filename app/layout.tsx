import type { Metadata } from "next";
import "./globals.css";
import "./shore-excursions.css";

const siteUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://08waylo-temp.vercel.app";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Compare Shore Excursions",
    template: "%s | Compare Shore Excursions",
  },
  description:
    "Find three standout independent shore excursions and three niche alternatives for 60 major cruise ports, with live tours and booking on Viator.",
  alternates: { canonical: "/" },
  openGraph: {
    title: "Compare Shore Excursions",
    description:
      "Port-specific independent shore-excursion ideas, edited down to the six choices worth considering.",
    url: siteUrl,
    siteName: "Compare Shore Excursions",
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
