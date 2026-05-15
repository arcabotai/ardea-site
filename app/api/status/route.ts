import { NextResponse } from "next/server";
import { fetchPublicStatus } from "@/lib/status";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function GET() {
  const status = await fetchPublicStatus();

  return NextResponse.json(status, {
    headers: {
      "Cache-Control": "public, s-maxage=30, stale-while-revalidate=90",
      "X-Robots-Tag": "noindex",
    },
  });
}
