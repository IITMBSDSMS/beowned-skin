import { NextResponse } from "next/server";
import crypto from "crypto";
import { createClient } from "@supabase/supabase-js";

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY! // ⚠️ use service role (secure)
);

export async function POST(req: Request) {
  const body = await req.json();

  const {
    razorpay_order_id,
    razorpay_payment_id,
    razorpay_signature,
    product,
    amount,
    name,
    phone,
    userId,
  } = body;

  const secret = process.env.RAZORPAY_KEY_SECRET!;

  const generatedSignature = crypto
    .createHmac("sha256", secret)
    .update(razorpay_order_id + "|" + razorpay_payment_id)
    .digest("hex");

  // 🔐 VERIFY SIGNATURE
  if (generatedSignature !== razorpay_signature) {
    return NextResponse.json({ success: false });
  }

  // ✅ SAVE ORDER (ONLY AFTER VERIFICATION)
  await supabase.from("orders").insert([
    {
      product_name: product,
      amount,
      status: "Paid",
      user_id: userId,
      phone,
      customer_name: name,
      payment_id: razorpay_payment_id,
    },
  ]);

  return NextResponse.json({ success: true });
}