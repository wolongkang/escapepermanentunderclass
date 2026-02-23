import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const { jobId, jobTitle, email } = await request.json();

    if (!jobId || !jobTitle || !email) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      );
    }

    const stripeKey = process.env.STRIPE_SECRET_KEY;
    if (!stripeKey) {
      return NextResponse.json(
        { error: "Stripe not configured" },
        { status: 500 }
      );
    }

    const appUrl = (process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000").trim();
    const successUrl = `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}`;
    const cancelUrl = `${appUrl}/checkout?job=${encodeURIComponent(jobId)}&title=${encodeURIComponent(jobTitle)}`;

    const params = new URLSearchParams();
    params.append("payment_method_types[]", "card");
    params.append("customer_email", email);
    params.append("line_items[0][price_data][currency]", "usd");
    params.append("line_items[0][price_data][product_data][name]", "AI Job Risk Report");
    params.append("line_items[0][price_data][product_data][description]", `Personalized AI risk assessment for: ${jobTitle}`);
    params.append("line_items[0][price_data][unit_amount]", "2999");
    params.append("line_items[0][quantity]", "1");
    params.append("mode", "payment");
    params.append("success_url", successUrl);
    params.append("cancel_url", cancelUrl);
    params.append("metadata[jobId]", jobId);
    params.append("metadata[jobTitle]", jobTitle);
    params.append("metadata[email]", email);

    const res = await fetch("https://api.stripe.com/v1/checkout/sessions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${stripeKey}`,
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: params.toString(),
    });

    const session = await res.json();

    if (!res.ok) {
      console.error("Stripe API error:", session);
      return NextResponse.json(
        { error: "Stripe error", detail: session.error?.message || "Unknown" },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: session.url });
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Unknown error";
    console.error("Stripe checkout error:", message);
    return NextResponse.json(
      { error: "Failed to create checkout session", detail: message },
      { status: 500 }
    );
  }
}
