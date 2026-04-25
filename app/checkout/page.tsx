"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import {
  fetchCoursePricing,
  fetchAllCoursePricings,
} from "@/server/actions/stripe-payment.actions";
import { CoursePricing } from "@/server/types/stripe-payment.type";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Image from "next/image";
import "./checkout.css";

type PaymentType = "one_time" | "installment";

const COUNTRIES = [
  "Afghanistan","Albania","Algeria","Andorra","Angola","Argentina","Armenia","Australia",
  "Austria","Azerbaijan","Bahrain","Bangladesh","Belarus","Belgium","Bolivia","Bosnia and Herzegovina",
  "Brazil","Bulgaria","Cambodia","Cameroon","Canada","Chile","China","Colombia","Croatia",
  "Cuba","Cyprus","Czech Republic","Denmark","Ecuador","Egypt","Estonia","Ethiopia",
  "Finland","France","Georgia","Germany","Ghana","Greece","Guatemala","Honduras","Hungary",
  "India","Indonesia","Iran","Iraq","Ireland","Israel","Italy","Jamaica","Japan","Jordan",
  "Kazakhstan","Kenya","Kuwait","Kyrgyzstan","Latvia","Lebanon","Libya","Lithuania",
  "Luxembourg","Malaysia","Maldives","Malta","Mexico","Moldova","Mongolia","Morocco",
  "Mozambique","Myanmar","Nepal","Netherlands","New Zealand","Nigeria","North Korea",
  "Norway","Oman","Pakistan","Palestine","Panama","Paraguay","Peru","Philippines","Poland",
  "Portugal","Qatar","Romania","Russia","Saudi Arabia","Senegal","Serbia","Singapore",
  "Slovakia","Slovenia","Somalia","South Africa","South Korea","Spain","Sri Lanka","Sudan",
  "Sweden","Switzerland","Syria","Taiwan","Tajikistan","Tanzania","Thailand","Tunisia",
  "Turkey","Turkmenistan","Uganda","Ukraine","United Arab Emirates","United Kingdom",
  "United States","Uruguay","Uzbekistan","Venezuela","Vietnam","Yemen","Zambia","Zimbabwe",
];

function PriceDisplay({
  fullPrice,
  discountedPrice,
}: {
  fullPrice: number;
  discountedPrice: number | null;
}) {
  if (discountedPrice !== null) {
    return (
      <div className="flex items-center gap-2 flex-wrap mt-0.5">
        <span className="text-gray-300 line-through text-sm font-medium">
          ${fullPrice.toLocaleString()}
        </span>
        <span className="text-[#2563EB] font-bold text-xl leading-none">
          ${discountedPrice.toLocaleString()}
        </span>
        <span className="text-xs text-emerald-600 font-semibold bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded-full">
          Save ${(fullPrice - discountedPrice).toLocaleString()}
        </span>
      </div>
    );
  }
  return (
    <span className="text-[#2563EB] font-bold text-xl leading-none mt-0.5 block">
      ${fullPrice.toLocaleString()}
    </span>
  );
}

function CheckIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
      <circle cx="9" cy="9" r="9" fill="#2563EB" />
      <path d="M5 9l3 3 5-5" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ShieldIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
    </svg>
  );
}

function ArrowIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <path d="M5 12h14M12 5l7 7-7 7" />
    </svg>
  );
}

export default function CheckoutPage() {
  const searchParams = useSearchParams();
  const courseParam = searchParams.get("course");

  const [allCourses, setAllCourses] = useState<CoursePricing[]>([]);
  const [selectedPricing, setSelectedPricing] = useState<CoursePricing | null>(null);
  const [stage, setStage] = useState<"loading" | "select-course" | "payment">("loading");

  const [paymentType, setPaymentType] = useState<PaymentType>("one_time");
  const [customerName, setCustomerName] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerCountry, setCustomerCountry] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (courseParam) {
      fetchCoursePricing(Number(courseParam)).then((data) => {
        if (data) {
          setSelectedPricing(data);
          setStage("payment");
        } else {
          setStage("select-course");
        }
      });
    } else {
      fetchAllCoursePricings().then((data) => {
        setAllCourses(data);
        setStage("select-course");
      });
    }
  }, [courseParam]);

  function selectCourse(pricing: CoursePricing) {
    setSelectedPricing(pricing);
    setPaymentType("one_time");
    setStage("payment");
  }

  function validate() {
    const errs: Record<string, string> = {};
    if (!customerName.trim()) errs.customerName = "Name is required";
    if (!customerEmail.trim()) errs.customerEmail = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customerEmail))
      errs.customerEmail = "Invalid email";
    if (!customerPhone.trim()) errs.customerPhone = "Phone is required";
    if (!customerCountry.trim()) errs.customerCountry = "Country is required";
    return errs;
  }

  async function handlePay() {
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/stripe/create-session", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          courseId: selectedPricing!.course_id,
          paymentType,
          customerName,
          customerEmail,
          customerPhone,
          customerCountry,
        }),
      });

      const json = await res.json();
      if (!res.ok || !json.url) {
        alert(json.error ?? "Something went wrong. Please try again.");
        return;
      }
      window.location.href = json.url;
    } catch {
      alert("Something went wrong. Please try again.");
    } finally {
      setSubmitting(false);
    }
  }

  const chargeAmount = selectedPricing ? (selectedPricing.course_id === 999 ? 5 : 30) : 0;

  return (
    <div className="checkout-root checkout-bg min-h-screen flex flex-col items-center justify-center py-12 px-4">

        {stage === "loading" && (
          <div className="flex flex-col items-center gap-4">
            <div className="loading-pulse" />
            <p style={{ fontFamily: "'Plus Jakarta Sans', sans-serif", color: '#9CA3AF', fontSize: 14 }}>
              Loading...
            </p>
          </div>
        )}

        {stage !== "loading" && (
          <div className="w-full max-w-[480px] space-y-5">

            <div className="fade-up fade-up-1 flex justify-center">
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

            <div key={stage} className="checkout-card fade-up fade-up-2">
              <div style={{ height: 4, background: 'linear-gradient(90deg, #2563EB, #6366F1)' }} />

              <div style={{ padding: '28px 28px 32px' }}>

                {stage === "select-course" && (
                  <>
                    <div style={{ marginBottom: 12, display: 'flex', justifyContent: 'center' }}>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#DC2626', background: '#FEF2F2', border: '1px solid #FECACA', borderRadius: 6, padding: '4px 12px', letterSpacing: '0.02em' }}>
                        Offer valid only for 7 days
                      </span>
                    </div>
                    <div style={{ marginBottom: 24 }}>
                      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 4 }}>
                        Choose Your Course
                      </h1>
                      <p style={{ fontSize: 14, color: '#6B7280' }}>
                        Select the programme you&apos;d like to enroll in.
                      </p>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                      {allCourses.length === 0 && (
                        <p style={{ fontSize: 14, color: '#9CA3AF', textAlign: 'center', padding: '24px 0' }}>
                          No courses available at the moment.
                        </p>
                      )}
                      {allCourses.map((course, i) => (
                        <button
                          key={course.id}
                          onClick={() => selectCourse(course)}
                          className={`course-card fade-up fade-up-${Math.min(i + 3, 5)}`}
                        >
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: 12 }}>
                            <div style={{ flex: 1 }}>
                              <p style={{ fontSize: 14, fontWeight: 700, color: '#111827', marginBottom: 10, lineHeight: 1.4 }}>
                                {course.course_name}
                              </p>
                              <div style={{ display: 'flex', gap: 16, flexWrap: 'wrap' }}>
                                <div>
                                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', display: 'none', marginBottom: 2 }}>
                                    One-time
                                  </span>
                                  <PriceDisplay
                                    fullPrice={course.one_time_price}
                                    discountedPrice={course.one_time_discounted_price}
                                  />
                                </div>
                                <div style={{ display: 'none' }}>
                                  <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.06em', textTransform: 'uppercase', color: '#9CA3AF', display: 'block', marginBottom: 2 }}>
                                    Installment
                                  </span>
                                  <span style={{ fontSize: 14, fontWeight: 700, color: '#2563EB' }}>$30</span>
                                  <span style={{ fontSize: 10, color: '#6B7280', display: 'block', marginTop: 2 }}>
                                    Pay AUD 30 and reserve a seat
                                  </span>
                                </div>
                              </div>
                            </div>
                            <div style={{ color: '#9CA3AF', marginTop: 2, flexShrink: 0, transition: 'color 0.15s, transform 0.15s' }}>
                              <ArrowIcon />
                            </div>
                          </div>
                        </button>
                      ))}
                    </div>
                  </>
                )}

                {stage === "payment" && selectedPricing && (
                  <>
                    <div style={{ marginBottom: 24 }}>
                      {!courseParam && (
                        <button className="back-btn" onClick={() => setStage("select-course")} style={{ marginBottom: 14 }}>
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                            <path d="M19 12H5M12 19l-7-7 7-7" />
                          </svg>
                          Back to courses
                        </button>
                      )}
                      <div style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: 6,
                        background: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        borderRadius: 8,
                        padding: '4px 10px',
                        marginBottom: 12,
                      }}>
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="#2563EB">
                          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" stroke="#2563EB" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round"/>
                        </svg>
                        <span style={{ fontSize: 12, fontWeight: 600, color: '#2563EB' }}>
                          {selectedPricing.course_name}
                        </span>
                      </div>
                      <h1 style={{ fontSize: 22, fontWeight: 800, color: '#111827', marginBottom: 4 }}>
                        Complete Enrollment
                      </h1>
                      <p style={{ fontSize: 14, color: '#6B7280' }}>
                        Choose a payment plan and fill in your details.
                      </p>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <span className="section-label">Payment Plan</span>
                      <RadioGroup
                        value={paymentType}
                        onValueChange={(v) => setPaymentType(v as PaymentType)}
                        style={{ display: 'flex', flexDirection: 'column', gap: 10 }}
                      >
                        <label htmlFor="one_time" className={`payment-option ${paymentType === "one_time" ? "selected" : ""}`} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <RadioGroupItem value="one_time" id="one_time" className="sr-only" />
                          <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            border: paymentType === "one_time" ? 'none' : '2px solid #D1D5DB',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}>
                            {paymentType === "one_time" && <CheckIcon />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 2 }}>
                              Full Payment
                            </p>
                            <PriceDisplay
                              fullPrice={selectedPricing.one_time_price}
                              discountedPrice={selectedPricing.one_time_discounted_price}
                            />
                            <p style={{ fontSize: 11, color: '#6B7280', marginTop: 4 }}>
                              Pay AUD 30 and reserve a seat to be eligible for this discount
                            </p>
                          </div>
                          {selectedPricing.one_time_discounted_price !== null && (
                            <span style={{ fontSize: 10, fontWeight: 700, letterSpacing: '0.04em', background: '#2563EB', color: 'white', borderRadius: 6, padding: '3px 8px' }}>
                              BEST DEAL
                            </span>
                          )}
                        </label>

                        <label htmlFor="installment" className={`payment-option ${paymentType === "installment" ? "selected" : ""}`} style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                          <RadioGroupItem value="installment" id="installment" className="sr-only" />
                          <div style={{
                            width: 20,
                            height: 20,
                            borderRadius: '50%',
                            border: paymentType === "installment" ? 'none' : '2px solid #D1D5DB',
                            flexShrink: 0,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            transition: 'all 0.15s ease',
                          }}>
                            {paymentType === "installment" && <CheckIcon />}
                          </div>
                          <div style={{ flex: 1 }}>
                            <p style={{ fontSize: 13, fontWeight: 600, color: '#374151', marginBottom: 2 }}>
                              Installment <span style={{ fontWeight: 400, color: '#6B7280' }}>(4 equally divided installments)</span>
                            </p>
                            <p style={{ fontSize: 11, color: '#6B7280', marginTop: 2 }}>
                              Pay AUD 30 and reserve a seat
                            </p>
                          </div>
                        </label>
                      </RadioGroup>
                    </div>

                    <div style={{ marginBottom: 24 }}>
                      <span className="section-label">Your Details</span>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                        <div>
                          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                            Full Name
                          </label>
                          <input
                            className={`checkout-input ${errors.customerName ? "error" : ""}`}
                            placeholder="Your full name"
                            value={customerName}
                            onChange={(e) => setCustomerName(e.target.value)}
                          />
                          {errors.customerName && (
                            <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.customerName}</p>
                          )}
                        </div>

                        <div>
                          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                            Email Address
                          </label>
                          <input
                            className={`checkout-input ${errors.customerEmail ? "error" : ""}`}
                            type="email"
                            placeholder="you@example.com"
                            value={customerEmail}
                            onChange={(e) => setCustomerEmail(e.target.value)}
                          />
                          {errors.customerEmail && (
                            <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.customerEmail}</p>
                          )}
                        </div>

                        <div>
                          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                            Phone Number
                          </label>
                          <input
                            className={`checkout-input ${errors.customerPhone ? "error" : ""}`}
                            type="tel"
                            placeholder="07X XXX XXXX"
                            value={customerPhone}
                            onChange={(e) => setCustomerPhone(e.target.value)}
                          />
                          {errors.customerPhone && (
                            <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.customerPhone}</p>
                          )}
                        </div>

                        <div>
                          <label style={{ fontSize: 13, fontWeight: 600, color: '#374151', display: 'block', marginBottom: 6 }}>
                            Country
                          </label>
                          <select
                            className={`checkout-input ${errors.customerCountry ? "error" : ""}`}
                            value={customerCountry}
                            onChange={(e) => setCustomerCountry(e.target.value)}
                            style={{ cursor: 'pointer' }}
                          >
                            <option value="">Select your country</option>
                            {COUNTRIES.map((c) => (
                              <option key={c} value={c}>{c}</option>
                            ))}
                          </select>
                          {errors.customerCountry && (
                            <p style={{ fontSize: 12, color: '#EF4444', marginTop: 4 }}>{errors.customerCountry}</p>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="total-box" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 12 }}>
                      <div>
                        <p style={{ fontSize: 11, fontWeight: 700, letterSpacing: '0.07em', textTransform: 'uppercase', color: '#6366F1', marginBottom: 4 }}>
                          Total Due Today
                        </p>
                        <p style={{ fontSize: 30, fontWeight: 800, color: '#1E40AF', lineHeight: 1 }}>
                          ${chargeAmount.toLocaleString()}
                        </p>
                      </div>
                      <button
                        className="pay-btn"
                        onClick={handlePay}
                        disabled={submitting}
                      >
                        {submitting ? (
                          <span style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                            <span style={{ width: 14, height: 14, borderRadius: '50%', border: '2px solid rgba(255,255,255,0.3)', borderTopColor: 'white', display: 'inline-block', animation: 'spin 0.7s linear infinite' }} />
                            Redirecting
                          </span>
                        ) : "Pay Now →"}
                      </button>
                    </div>
                    <p style={{ fontSize: 11, color: '#EF4444', fontWeight: 600, marginTop: 10, textAlign: 'center' }}>
                      Limited seats
                    </p>
                    <p style={{ fontSize: 10, color: '#9CA3AF', marginTop: 3, textAlign: 'center' }}>
                      Terms and conditions apply
                    </p>
                  </>
                )}
              </div>
            </div>

            <div className="fade-up fade-up-3" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 6 }}>
              <ShieldIcon />
              <p style={{ fontSize: 12, color: '#9CA3AF', fontFamily: "'Plus Jakarta Sans', sans-serif" }}>
                256-bit SSL encryption · Secured by <strong style={{ color: '#6B7280' }}>Stripe</strong>
              </p>
            </div>

          </div>
        )}
      </div>
  );
}
