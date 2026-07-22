export type ViatorSearchParams = {
  portName: string;
  activityType: string;
  currency?: string;
};

export type NormalizedExcursionOffer = {
  provider: "Viator";
  title: string;
  priceCents?: number;
  currency: string;
  durationMinutes?: number;
  rating?: number;
  reviewCount?: number;
  affiliateUrl?: string;
  sourceType: "VIATOR_API" | "VIATOR_AFFILIATE" | "MOCK";
};

export async function searchViatorExcursions(params: ViatorSearchParams): Promise<NormalizedExcursionOffer[]> {
  const apiKey = process.env.VIATOR_API_KEY;
  const affiliateId = process.env.VIATOR_AFFILIATE_ID;

  if (!apiKey || !affiliateId) {
    return [
      {
        provider: "Viator",
        title: `${params.portName} ${params.activityType} excursion`,
        priceCents: 9200,
        currency: params.currency ?? "EUR",
        durationMinutes: 240,
        rating: 4.7,
        reviewCount: 1120,
        affiliateUrl: "#viator-affiliate-placeholder",
        sourceType: "MOCK",
      },
    ];
  }

  // TODO: Replace with the approved Viator Affiliate API endpoint and request shape.
  // Keep bookings as link-out only. Do not process transactions in this app.
  return [];
}
