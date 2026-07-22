import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.provider || !body?.targetUrl) {
    return NextResponse.json({ error: "Provider and targetUrl are required." }, { status: 400 });
  }

  // TODO: Persist with Prisma AffiliateClick model once the pivot schema is migrated.
  return NextResponse.json({ ok: true, click: body });
}
