import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 2) {
    return NextResponse.json({ jobs: [] });
  }

  const supabase = createServiceClient();

  // Search by title and aliases using full-text search + ILIKE fallback
  const { data, error } = await supabase
    .from("jobs")
    .select("id, title, category, ai_risk_score, onet_code")
    .or(`title.ilike.%${query}%`)
    .order("ai_risk_score", { ascending: false })
    .limit(20);

  if (error) {
    console.error("Job search error:", error);
    return NextResponse.json({ jobs: [] }, { status: 500 });
  }

  return NextResponse.json({ jobs: data || [] });
}
