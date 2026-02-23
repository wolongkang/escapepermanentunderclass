import { getStripe } from "@/lib/stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  // If webhook secret is configured, verify signature
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  if (webhookSecret && signature) {
    try {
      event = getStripe().webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    // No webhook secret configured, parse event directly
    event = JSON.parse(body);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { jobId, email } = session.metadata || {};

    if (jobId && email) {
      // Trigger report generation
      const appUrl = process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000";
      try {
        await fetch(`${appUrl}/api/report/generate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            jobId,
            email,
            paymentId: session.payment_intent,
          }),
        });
      } catch (err) {
        console.error("Report generation trigger failed:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
