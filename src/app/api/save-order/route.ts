import { createClient } from "@supabase/supabase-js";

export async function POST(req: Request) {
  const body = await req.json();

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!
  );

  const { error } = await supabase.from("orders").insert([
    {
      user_id: body.userId,
      product_name: body.product,
      amount: body.amount,
      payment_id: body.paymentId,
      status: "Paid",
    },
  ]);

  if (error) {
    return Response.json({ error });
  }

  return Response.json({ success: true });
}