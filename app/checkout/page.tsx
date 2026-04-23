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
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import Image from "next/image";

type PaymentType = "one_time" | "installment";

function PriceDisplay({
  fullPrice,
  discountedPrice,
}: {
  fullPrice: number;
  discountedPrice: number | null;
}) {
  if (discountedPrice !== null) {
    return (
      <div className="flex items-baseline gap-2">
        <span className="text-gray-400 line-through text-sm">
          $ {fullPrice.toLocaleString()}
        </span>
        <span className="text-[#2563EB] font-bold text-lg">
          $ {discountedPrice.toLocaleString()}
        </span>
      </div>
    );
  }
  return (
    <span className="text-[#2563EB] font-bold text-lg">
      $ {fullPrice.toLocaleString()}
    </span>
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

  const chargeAmount =
    selectedPricing
      ? paymentType === "one_time"
        ? (selectedPricing.one_time_discounted_price ?? selectedPricing.one_time_price)
        : (selectedPricing.installment_discounted_price ?? selectedPricing.installment_amount)
      : 0;

  if (stage === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <p className="text-gray-400">Loading...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center py-12 px-4">
      <div className="w-full max-w-lg space-y-6">
        <div className="flex justify-center">
          <Image
            src="/eminds_logo.png"
            width={140}
            height={0}
            sizes="140px"
            className="h-auto"
            alt="Logo"
            priority
          />
        </div>

        {stage === "select-course" && (
          <Card>
            <CardHeader>
              <CardTitle className="text-2xl text-[#2563EB]">Select a Course</CardTitle>
              <CardDescription>Choose the course you'd like to enroll in.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {allCourses.length === 0 && (
                <p className="text-gray-400 text-sm">No courses available at the moment.</p>
              )}
              {allCourses.map((course) => (
                <button
                  key={course.id}
                  onClick={() => selectCourse(course)}
                  className="w-full text-left border border-gray-200 rounded-lg px-4 py-4 hover:border-[#2563EB] hover:bg-blue-50 transition-colors group"
                >
                  <p className="font-semibold text-gray-800 group-hover:text-[#2563EB] text-sm">
                    {course.course_name}
                  </p>
                  <div className="mt-1 flex gap-4 text-xs text-gray-500">
                    <span>
                      One-time:{" "}
                      {course.one_time_discounted_price !== null ? (
                        <>
                          <span className="line-through mr-1">
                            $ {course.one_time_price.toLocaleString()}
                          </span>
                          <span className="text-[#2563EB] font-medium">
                            $ {course.one_time_discounted_price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-[#2563EB] font-medium">
                          $ {course.one_time_price.toLocaleString()}
                        </span>
                      )}
                    </span>
                    <span>
                      Installment:{" "}
                      {course.installment_discounted_price !== null ? (
                        <>
                          <span className="line-through mr-1">
                            $ {course.installment_amount.toLocaleString()}
                          </span>
                          <span className="text-[#2563EB] font-medium">
                            $ {course.installment_discounted_price.toLocaleString()}
                          </span>
                        </>
                      ) : (
                        <span className="text-[#2563EB] font-medium">
                          $ {course.installment_amount.toLocaleString()}
                        </span>
                      )}
                    </span>
                  </div>
                </button>
              ))}
            </CardContent>
          </Card>
        )}

        {stage === "payment" && selectedPricing && (
          <Card>
            <CardHeader>
              <div className="flex items-start justify-between gap-2">
                <div>
                  <CardTitle className="text-xl text-[#2563EB]">
                    {selectedPricing.course_name}
                  </CardTitle>
                  <CardDescription className="mt-1">
                    Select your payment option and complete the form.
                  </CardDescription>
                </div>
                {!courseParam && (
                  <button
                    onClick={() => setStage("select-course")}
                    className="text-xs text-gray-400 hover:text-gray-600 mt-1 shrink-0"
                  >
                    ← Change course
                  </button>
                )}
              </div>
            </CardHeader>

            <CardContent className="space-y-6">
              <div>
                <Label className="text-sm font-medium mb-3 block">Payment Option</Label>
                <RadioGroup
                  value={paymentType}
                  onValueChange={(v) => setPaymentType(v as PaymentType)}
                  className="space-y-3"
                >
                  <label
                    htmlFor="one_time"
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                      paymentType === "one_time"
                        ? "border-[#2563EB] bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value="one_time" id="one_time" />
                    <div>
                      <p className="font-medium text-sm">One-time Payment</p>
                      <PriceDisplay
                        fullPrice={selectedPricing.one_time_price}
                        discountedPrice={selectedPricing.one_time_discounted_price}
                      />
                    </div>
                  </label>

                  <label
                    htmlFor="installment"
                    className={`flex items-center gap-3 border rounded-lg px-4 py-3 cursor-pointer transition-colors ${
                      paymentType === "installment"
                        ? "border-[#2563EB] bg-blue-50"
                        : "border-gray-200"
                    }`}
                  >
                    <RadioGroupItem value="installment" id="installment" />
                    <div>
                      <p className="font-medium text-sm">First Installment</p>
                      <PriceDisplay
                        fullPrice={selectedPricing.installment_amount}
                        discountedPrice={selectedPricing.installment_discounted_price}
                      />
                    </div>
                  </label>
                </RadioGroup>
              </div>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    placeholder="Your full name"
                    value={customerName}
                    onChange={(e) => setCustomerName(e.target.value)}
                    className="mt-1"
                  />
                  {errors.customerName && (
                    <p className="text-red-500 text-xs mt-1">{errors.customerName}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="you@example.com"
                    value={customerEmail}
                    onChange={(e) => setCustomerEmail(e.target.value)}
                    className="mt-1"
                  />
                  {errors.customerEmail && (
                    <p className="text-red-500 text-xs mt-1">{errors.customerEmail}</p>
                  )}
                </div>

                <div>
                  <Label htmlFor="phone">Phone Number</Label>
                  <Input
                    id="phone"
                    type="tel"
                    placeholder="07X XXX XXXX"
                    value={customerPhone}
                    onChange={(e) => setCustomerPhone(e.target.value)}
                    className="mt-1"
                  />
                  {errors.customerPhone && (
                    <p className="text-red-500 text-xs mt-1">{errors.customerPhone}</p>
                  )}
                </div>
              </div>

              <div className="border-t pt-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500">Total to pay</p>
                  <p className="text-2xl font-bold text-[#2563EB]">
                    $ {chargeAmount.toLocaleString()}
                  </p>
                </div>
                <Button onClick={handlePay} disabled={submitting} className="px-8">
                  {submitting ? "Redirecting..." : "Pay Now"}
                </Button>
              </div>
            </CardContent>
          </Card>
        )}

        <p className="text-center text-xs text-gray-400">
          Secured by Stripe. Your payment information is encrypted.
        </p>
      </div>
    </div>
  );
}
