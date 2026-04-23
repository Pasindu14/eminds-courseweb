import { redirect } from "next/navigation";
import Stripe from "stripe";
import { saveStripePayment } from "@/server/actions/stripe-payment.actions";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; course?: string; type?: string; promo?: string };
}) {
  const { session_id, type, promo } = searchParams;

  if (!session_id) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">Invalid payment session.</p>
      </div>
    );
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">Could not verify payment. Please contact support.</p>
      </div>
    );
  }

  if (session.payment_status !== "paid") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-red-500 text-lg">Payment not completed. Please try again.</p>
      </div>
    );
  }

  const meta = session.metadata ?? {};

  try {
    await saveStripePayment({
      course_id: Number(meta.courseId),
      course_name: meta.courseName ?? "",
      customer_name: meta.customerName ?? "",
      customer_email: session.customer_email ?? "",
      customer_phone: meta.customerPhone || null,
      payment_type: (type === "installment" ? "installment" : "one_time") as "one_time" | "installment",
      amount_paid: Number(meta.amountPaid),
      promo_code_used: meta.promoCodeUsed || null,
      discount_applied: Number(meta.discountApplied ?? 0),
      stripe_session_id: session_id,
      status: "completed",
    });
  } catch (err) {
    console.error("Failed to save payment record:", err);
  }

  redirect(process.env.PAYMENT_REDIRECT_URL!);
}
