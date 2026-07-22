import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json().catch(() => null);

  if (!body?.email) {
    return NextResponse.json({ error: "Email is required." }, { status: 400 });
  }

  // TODO: Persist with Prisma Lead model once the pivot schema is migrated.
  return NextResponse.json({ ok: true, lead: body });
}
