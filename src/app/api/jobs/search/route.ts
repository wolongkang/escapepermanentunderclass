import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";
import { searchLocalJobs } from "@/lib/local-jobs";
import { expandSearchQuery } from "@/lib/job-aliases";

// Escape PostgREST special characters in ilike patterns
function escapePostgrest(str: string): string {
  return str
    .replace(/\\/g, "\\\\")
    .replace(/%/g, "\\%")
    .replace(/_/g, "\\_")
    .replace(/[().,]/g, ""); // Strip PostgREST operators
}

export async function GET(request: NextRequest) {
  const query = request.nextUrl.searchParams.get("q")?.trim();

  if (!query || query.length < 1 || query.length > 200) {
    return NextResponse.json({ jobs: [] });
  }

  // Try Supabase first
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  if (supabaseUrl && !supabaseUrl.includes("placeholder")) {
    try {
      const supabase = createServiceClient();
      const safeQuery = escapePostgrest(query);

      // Build filter: direct match OR alias-expanded matches
      const aliasExpansions = expandSearchQuery(query);
      const filters = [`title.ilike.%${safeQuery}%`];
      for (const expansion of aliasExpansions.slice(0, 5)) {
        filters.push(`title.ilike.%${escapePostgrest(expansion)}%`);
      }

      const { data, error } = await supabase
        .from("jobs")
        .select("id, title, category, onet_code")
        .or(filters.join(","))
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
