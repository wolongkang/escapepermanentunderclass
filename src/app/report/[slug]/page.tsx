import { createServiceClient } from "@/lib/supabase";
import { notFound } from "next/navigation";
import ReportContent from "@/components/ReportContent";

// Force dynamic rendering - reports are always fetched at request time
export const dynamic = "force-dynamic";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ReportPage({ params }: PageProps) {
  const { slug } = await params;
  const supabase = createServiceClient();

  const { data: report, error } = await supabase
    .from("reports")
    .select(`*, jobs(*)`)
    .eq("slug", slug)
    .single();

  if (error || !report) {
    notFound();
  }

  if (report.status === "generating") {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-accent border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h1 className="text-2xl font-bold mb-2">Generating Your Report</h1>
          <p className="text-muted">
            Our AI is analyzing your role. This usually takes 30-60 seconds.
          </p>
          <p className="text-sm text-muted mt-4">
            This page will refresh automatically.
          </p>
          <meta httpEquiv="refresh" content="5" />
        </div>
      </div>
    );
  }

  return <ReportContent report={report} />;
}
