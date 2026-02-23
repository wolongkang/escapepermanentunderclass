import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { searchLocalJobs } from "@/lib/local-jobs";

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q");

  if (!query || query.length < 1) {
    return NextResponse.json({ jobs: [] });
  }

  // Try Supabase first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const supabase = createServiceClient();
      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, category, onet_code")
        .or(`title.ilike.%${query}%`)
        .order("title")
        .limit(20);

      if (!error && data && data.length > 0) {
        return NextResponse.json({ jobs: data });
      }
    } catch {
      // Fall through to local search
    }
  }

  // Fallback: search local job data
  const jobs = searchLocalJobs(query);
  return NextResponse.json({ jobs });
}
