import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasStripeKey: !!process.env.STRIPE_SECRET_KEY,
    stripeKeyPrefix: process.env.STRIPE_SECRET_KEY?.substring(0, 12) || "NOT SET",
    stripeKeyLength: process.env.STRIPE_SECRET_KEY?.length || 0,
    hasSupabaseUrl: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
    hasAnthropicKey: !!process.env.ANTHROPIC_API_KEY,
  });
}
