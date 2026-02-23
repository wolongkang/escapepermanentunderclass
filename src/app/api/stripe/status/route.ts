import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

const REPORT_SECRET = process.env.REPORT_GENERATE_SECRET || "";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");
  const shouldTrigger = request.nextUrl.searchParams.get("trigger") === "1";

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ status: "error" }, { status: 500 });
    }

    const res = await fetch(`https://api.stripe.com/v1/checkout/sessions/${sessionId}`, {
      headers: { "Authorization": `Bearer ${stripeKey}` },
    });
    const session = await res.json();

    if (!res.ok) {
      return NextResponse.json({ status: "error" }, { status: 500 });
    }

    if (session.payment_status !== "paid") {
      return NextResponse.json({ status: "unpaid" });
    }

    const jobId = session.metadata?.jobId;
    const email = session.metadata?.email;

    if (!jobId || !email) {
      return NextResponse.json({ status: "error" }, { status: 400 });
    }

    // Check if report already exists
    const supabase = createServiceClient();
    const { data: report } = await supabase
      .from("reports")
      .select("slug, status")
      .eq("stripe_payment_id", session.payment_intent)
      .single();

    if (report?.status === "completed") {
      return NextResponse.json({
        status: "completed",
        reportUrl: `/report/${report.slug}`,
      });
    }

    if (report?.status === "generating") {
      return NextResponse.json({ status: "generating" });
    }

    // No report yet — trigger generation server-side if requested
    if (shouldTrigger) {
      const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").trim();
      try {
        // Fire-and-forget — don't await (it takes 30-60s)
        fetch(`${appUrl}/api/report/generate`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "x-report-secret": REPORT_SECRET,
          },
          body: JSON.stringify({
            jobId,
            email,
            paymentId: session.payment_intent,
            age: session.metadata?.age ? parseInt(session.metadata.age) : undefined,
            country: session.metadata?.country || undefined,
            yearsExperience: session.metadata?.yearsExperience ? parseInt(session.metadata.yearsExperience) : undefined,
          }),
        }).catch((err) => console.error("Report trigger failed:", err));
      } catch (err) {
        console.error("Report trigger error:", err);
      }
    }

    return NextResponse.json({ status: "pending" });
  } catch (err) {
    console.error("Status check error:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
