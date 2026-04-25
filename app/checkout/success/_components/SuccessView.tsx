"use client";

import Image from "next/image";
import "@/app/checkout/success/_components/success.css";

type Props = {
  courseName: string;
  customerName: string;
  customerEmail: string;
  amountPaid: number;
  paymentType: "one_time" | "installment";
  redirectUrl: string;
};

export default function SuccessView({
  courseName,
  customerName,
  customerEmail,
  amountPaid,
  paymentType,
  redirectUrl,
}: Props) {
  return (
    <div className="success-root success-bg min-h-screen flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-[460px] space-y-5">
        <div className="fade-up-1 flex justify-center">
          <Image
            src="/eminds_logo.png"
            width={130}
            height={0}
            sizes="130px"
            className="h-auto drop-shadow-sm"
            alt="Logo"
            priority
          />
        </div>

        <div className="success-card">
          <div
            style={{
              height: 4,
              background: "linear-gradient(90deg, #2563EB, #6366F1)",
            }}
          />

          <div style={{ padding: "36px 28px 32px", textAlign: "center" }}>
            <div
              className="check-wrapper glow-ring"
              style={{
                width: 80,
                height: 80,
                margin: "0 auto 24px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <svg width="80" height="80" viewBox="0 0 80 80" fill="none">
                <circle cx="40" cy="40" r="38" fill="#EFF6FF" />
                <circle
                  className="check-circle"
                  cx="40"
                  cy="40"
                  r="36"
                  stroke="#2563EB"
                  strokeWidth="3"
                  fill="none"
                  strokeLinecap="round"
                  transform="rotate(-90 40 40)"
                />
                <polyline
                  className="check-mark"
                  points="24,40 35,52 56,28"
                  stroke="#2563EB"
                  strokeWidth="4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </svg>
            </div>

            <div className="fade-up-2">
              <p
                style={{
                  fontSize: 12,
                  fontWeight: 700,
                  letterSpacing: "0.08em",
                  textTransform: "uppercase",
                  color: "#6366F1",
                  marginBottom: 6,
                }}
              >
                Payment Confirmed
              </p>
              <h1
                style={{
                  fontSize: 26,
                  fontWeight: 800,
                  color: "#111827",
                  marginBottom: 8,
                  lineHeight: 1.2,
                }}
              >
                All set, {customerName.split(" ")[0]}!
              </h1>
              <p style={{ fontSize: 14, color: "#6B7280", lineHeight: 1.6 }}>
                Your enrollment for{" "}
                <strong style={{ color: "#374151" }}>{courseName}</strong> has
                been confirmed. A receipt has been sent to your email.
              </p>
            </div>
          </div>

          <div style={{ padding: "0 28px" }}>
            <div
              style={{
                background: "linear-gradient(135deg, #EFF6FF 0%, #E0E7FF 100%)",
                border: "1.5px solid #C7D2FE",
                borderRadius: 14,
                padding: "6px 18px",
                marginBottom: 24,
              }}
              className="fade-up-3"
            >
              <div className="detail-row">
                <span
                  style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}
                >
                  Course
                </span>
                <span
                  style={{
                    fontSize: 13,
                    fontWeight: 700,
                    color: "#1E40AF",
                    maxWidth: "60%",
                    textAlign: "right",
                    lineHeight: 1.4,
                  }}
                >
                  {courseName}
                </span>
              </div>
              <div className="detail-row">
                <span
                  style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}
                >
                  Plan
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                >
                  {paymentType === "installment"
                    ? "Installment"
                    : "Full Payment"}
                </span>
              </div>
              <div className="detail-row">
                <span
                  style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}
                >
                  Email
                </span>
                <span
                  style={{ fontSize: 13, fontWeight: 600, color: "#374151" }}
                >
                  {customerEmail}
                </span>
              </div>
              <div className="detail-row">
                <span
                  style={{ fontSize: 13, color: "#6B7280", fontWeight: 500 }}
                >
                  Amount Paid
                </span>
                <span
                  style={{ fontSize: 20, fontWeight: 800, color: "#1E40AF" }}
                >
                  ${amountPaid.toLocaleString()}
                </span>
              </div>
            </div>
          </div>

          <div style={{ padding: "0 28px 28px" }} className="fade-up-4">
            <button
              className="continue-btn"
              onClick={() => {
                window.location.href = redirectUrl;
              }}
            >
              Go Back
              <svg
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M5 12h14M12 5l7 7-7 7" />
              </svg>
            </button>
          </div>
        </div>

        <div
          className="fade-up-5"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: 6,
          }}
        >
          <svg
            width="13"
            height="13"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#9CA3AF"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          </svg>
          <p
            style={{
              fontSize: 12,
              color: "#9CA3AF",
              fontFamily: "'Plus Jakarta Sans', sans-serif",
            }}
          >
            256-bit SSL encryption · Secured by{" "}
            <strong style={{ color: "#6B7280" }}>Stripe</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
