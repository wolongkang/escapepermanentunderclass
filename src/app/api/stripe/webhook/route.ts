import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

const REPORT_SECRET = process.env.REPORT_GENERATE_SECRET || "";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  // Require signature verification in production
  if (!webhookSecret || !signature) {
    console.error("Webhook missing secret or signature");
    return NextResponse.json({ error: "Missing signature" }, { status: 400 });
  }

  let event;
  try {
    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Webhook signature verification failed:", err);
    return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { jobId, email, age, country, yearsExperience } = session.metadata || {};

    if (jobId && email) {
      const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").trim();
      try {
        // Fire-and-forget with auth header
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
            age: age ? parseInt(age) : undefined,
            country: country || undefined,
            yearsExperience: yearsExperience ? parseInt(yearsExperience) : undefined,
          }),
        }).catch((err) => console.error("Report generation trigger failed:", err));
      } catch (err) {
        console.error("Report generation trigger failed:", err);
      }
    }
  }

  return NextResponse.json({ received: true });
}
