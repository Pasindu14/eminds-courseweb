import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import { fetchCoursePricing } from "@/server/actions/stripe-payment.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export async function POST(req: NextRequest) {
  try {
    const { courseId, paymentType, customerName, customerEmail, customerPhone, customerCountry } = await req.json();

    if (!courseId || !paymentType || !customerName || !customerEmail) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
    }

    const pricing = await fetchCoursePricing(Number(courseId));
    if (!pricing) {
      return NextResponse.json({ error: "Course not found or inactive" }, { status: 404 });
    }

    const fullAmount =
      paymentType === "one_time" ? pricing.one_time_price : pricing.installment_amount;
    const discountedAmount =
      paymentType === "one_time"
        ? pricing.one_time_discounted_price
        : pricing.installment_discounted_price;

    const chargeAmount = discountedAmount ?? fullAmount;
    const discountApplied = discountedAmount ? fullAmount - discountedAmount : 0;

    const appUrl = process.env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000";
    const successUrl = `${appUrl}/checkout/success?session_id={CHECKOUT_SESSION_ID}&type=${paymentType}`;
    const cancelUrl = `${appUrl}/checkout?course=${courseId}`;

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: customerEmail,
      line_items: [
        {
          price_data: {
            currency: "usd",
            product_data: {
              name: pricing.course_name,
              description:
                paymentType === "installment" ? "First Installment Payment" : "One-time Full Payment",
            },
            unit_amount: Math.round(chargeAmount * 100),
          },
          quantity: 1,
        },
      ],
      metadata: {
        courseId: String(courseId),
        courseName: pricing.course_name,
        paymentType,
        customerName,
        customerPhone: customerPhone ?? "",
        customerCountry: customerCountry ?? "",
        discountApplied: String(discountApplied),
        amountPaid: String(chargeAmount),
      },
      success_url: successUrl,
      cancel_url: cancelUrl,
    });

    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    console.error("Stripe session creation error:", err);
    return NextResponse.json({ error: err.message ?? "Internal server error" }, { status: 500 });
  }
}
