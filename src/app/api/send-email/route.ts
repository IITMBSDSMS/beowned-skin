import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  const body = await req.json();

  const {
    name,
    email,
    phone,
    product,
    amount,
    paymentId,
  } = body;

  // 👤 CUSTOMER EMAIL
  await resend.emails.send({
    from: "Be-Owned Skin <onboarding@resend.dev>",
    to: email,
    subject: "🧴 Order Confirmed - Be-Owned Skin",
    html: `
      <h2>Thank you for your order, ${name} 💖</h2>
      <p>Your order has been successfully placed.</p>

      <h3>Order Details:</h3>
      <ul>
        <li>Product: ${product}</li>
        <li>Amount: ₹${amount}</li>
        <li>Payment ID: ${paymentId}</li>
      </ul>

      <p>We’ll notify you when your order is shipped 🚚</p>
    `,
  });

  // 🧑‍💼 ADMIN EMAIL
  await resend.emails.send({
    from: "Be-Owned Skin <onboarding@resend.dev>",
    to: process.env.ADMIN_EMAIL!,
    subject: "💰 New Order Received",
    html: `
      <h2>New Order Alert 🚀</h2>

      <p><b>Name:</b> ${name}</p>
      <p><b>Email:</b> ${email}</p>
      <p><b>Phone:</b> ${phone}</p>

      <hr/>

      <p><b>Product:</b> ${product}</p>
      <p><b>Amount:</b> ₹${amount}</p>
      <p><b>Payment ID:</b> ${paymentId}</p>
    `,
  });

  return Response.json({ success: true });
}