type SavingsInput = {
  estimatedRideshareLowCents: number | null;
  estimatedRideshareHighCents: number | null;
  passengerCount: number;
  shuttlePricePerTravelerCents: number;
};

export function calculateRideshareSavings({
  estimatedRideshareLowCents,
  estimatedRideshareHighCents,
  passengerCount,
  shuttlePricePerTravelerCents,
}: SavingsInput) {
  if (!estimatedRideshareLowCents || !estimatedRideshareHighCents || passengerCount < 1) return null;

  const typicalRideshareCents = Math.round((estimatedRideshareLowCents + estimatedRideshareHighCents) / 2);
  const ridesharePerTravelerCents = Math.round(typicalRideshareCents / passengerCount);
  const savingsPerTravelerCents = ridesharePerTravelerCents - shuttlePricePerTravelerCents;

  if (savingsPerTravelerCents <= 0) return null;

  const estimatedSavingsPercent = Math.round((savingsPerTravelerCents / ridesharePerTravelerCents) * 100);
  const estimatedSavingsAmount = Math.round(savingsPerTravelerCents / 100);

  if (estimatedSavingsPercent < 25 && estimatedSavingsAmount < 10) return null;

  return {
    estimatedRideshareLow: Math.round(estimatedRideshareLowCents / 100),
    estimatedRideshareHigh: Math.round(estimatedRideshareHighCents / 100),
    estimatedSavingsPercent,
    estimatedSavingsAmount,
    label:
      estimatedSavingsPercent >= 25
        ? `Travelers often save ${estimatedSavingsPercent}%+ vs typical rideshare`
        : `Save approximately $${estimatedSavingsAmount}`,
  };
}
