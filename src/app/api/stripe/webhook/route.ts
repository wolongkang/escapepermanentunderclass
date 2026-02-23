import Stripe from "stripe";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");

  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  let event;

  if (webhookSecret && signature) {
    try {
      // Use Stripe SDK only for webhook signature verification
      const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "");
      event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
    } catch (err) {
      console.error("Webhook signature verification failed:", err);
      return NextResponse.json({ error: "Invalid signature" }, { status: 400 });
    }
  } else {
    event = JSON.parse(body);
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object;
    const { jobId, email } = session.metadata || {};

    if (jobId && email) {
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
