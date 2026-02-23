import { NextResponse } from "next/server";

export async function GET() {
  const appUrl = process.env.NEXT_PUBLIC_APP_URL;
  return NextResponse.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 12) || "NOT SET",
    stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
    appUrl: appUrl || "NOT SET",
    appUrlLength: appUrl?.length || 0,
    appUrlCharCodes: appUrl ? Array.from(appUrl.slice(-5)).map(c => c.charCodeAt(0)) : [],
  });
}
