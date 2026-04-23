import Stripe from "stripe";
import { saveStripePayment } from "@/server/actions/stripe-payment.actions";
import SuccessView from "./_components/SuccessView";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

function ErrorScreen({ message }: { message: string }) {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        background: "#EEF2FF",
        fontFamily: "'Plus Jakarta Sans', sans-serif",
      }}
    >
      <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#EF4444" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
      </svg>
      <p style={{ fontSize: 16, fontWeight: 600, color: "#374151" }}>{message}</p>
      <a href="/checkout" style={{ fontSize: 13, color: "#2563EB", fontWeight: 600 }}>← Back to checkout</a>
    </div>
  );
}

export default async function CheckoutSuccessPage({
  searchParams,
}: {
  searchParams: { session_id?: string; type?: string };
}) {
  const { session_id, type } = searchParams;

  if (!session_id) {
    return <ErrorScreen message="Invalid payment session." />;
  }

  let session: Stripe.Checkout.Session;
  try {
    session = await stripe.checkout.sessions.retrieve(session_id);
  } catch {
    return <ErrorScreen message="Could not verify payment. Please contact support." />;
  }

  if (session.payment_status !== "paid") {
    return <ErrorScreen message="Payment not completed. Please try again." />;
  }

  const meta = session.metadata ?? {};
  const paymentType = type === "installment" ? "installment" : "one_time";

  try {
    await saveStripePayment({
      course_id: Number(meta.courseId),
      course_name: meta.courseName ?? "",
      customer_name: meta.customerName ?? "",
      customer_email: session.customer_email ?? "",
      customer_phone: meta.customerPhone || null,
      customer_country: meta.customerCountry || null,
      payment_type: paymentType as "one_time" | "installment",
      amount_paid: Number(meta.amountPaid),
      promo_code_used: meta.promoCodeUsed || null,
      discount_applied: Number(meta.discountApplied ?? 0),
      stripe_session_id: session_id,
      status: "completed",
    });
  } catch (err) {
    console.error("Failed to save payment record:", err);
  }

  return (
    <SuccessView
      courseName={meta.courseName ?? ""}
      customerName={meta.customerName ?? ""}
      customerEmail={session.customer_email ?? ""}
      amountPaid={Number(meta.amountPaid)}
      paymentType={paymentType as "one_time" | "installment"}
      redirectUrl={process.env.PAYMENT_REDIRECT_URL!}
    />
  );
}
