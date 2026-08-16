export function viatorAffiliateUrl(productUrl: string) {
  const url = new URL(productUrl);
  const pid = process.env.VIATOR_AFFILIATE_PID;
  const mcid = process.env.VIATOR_AFFILIATE_MCID;

  if (pid && !url.searchParams.has("pid")) url.searchParams.set("pid", pid);
  if (mcid && !url.searchParams.has("mcid")) url.searchParams.set("mcid", mcid);
  if ((pid || mcid) && !url.searchParams.has("medium")) url.searchParams.set("medium", "link");

  return url.toString();
}
