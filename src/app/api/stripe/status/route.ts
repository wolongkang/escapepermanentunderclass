import { createServiceClient } from "@/lib/supabase";
import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const sessionId = request.nextUrl.searchParams.get("session_id");

  if (!sessionId) {
    return NextResponse.json({ error: "Missing session_id" }, { status: 400 });
  }

  try {
    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json({ status: "error", error: "Stripe not configured" }, { status: 500 });
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
      return NextResponse.json({ status: "error", error: "Missing metadata" });
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

    // No report yet — return info needed to trigger generation
    return NextResponse.json({
      status: "pending",
      jobId,
      email,
      paymentId: session.payment_intent,
    });
  } catch (err) {
    console.error("Status check error:", err);
    return NextResponse.json({ status: "error" }, { status: 500 });
  }
}
