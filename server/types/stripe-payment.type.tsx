export type CoursePricing = {
  id: string;
  course_id: number;
  course_name: string;
  one_time_price: number;
  one_time_discounted_price: number | null;
  installment_amount: number;
  installment_discounted_price: number | null;
  promo_code: string | null;
  promo_expires_at: string | null;
  is_active: boolean;
  created_at: string;
};

export type StripePayment = {
  id: string;
  course_id: number;
  course_name: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string | null;
  customer_country: string | null;
  payment_type: "one_time" | "installment";
  amount_paid: number;
  promo_code_used: string | null;
  discount_applied: number;
  stripe_session_id: string;
  status: string;
  registration_status: string;
  created_at: string;
};
