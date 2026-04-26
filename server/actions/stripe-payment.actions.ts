"use server";
import { revalidatePath } from "next/cache";
import ResponseHandler from "../models/response.model";
import { supabaseCacheFreeClient } from "../server";
import { CoursePricing, StripePayment } from "../types/stripe-payment.type";

export async function fetchCoursePricing(courseId: number): Promise<CoursePricing | null> {
  const { data, error } = await supabaseCacheFreeClient
    .from("course_pricing")
    .select("*")
    .eq("course_id", courseId)
    .eq("is_active", true)
    .single();

  if (error) return null;
  return data as CoursePricing;
}

export async function fetchAllCoursePricings(): Promise<CoursePricing[]> {
  const { data, error } = await supabaseCacheFreeClient
    .from("course_pricing")
    .select("*")
    .eq("is_active", true)
    .order("created_at", { ascending: true });

  if (error) return [];
  return data as CoursePricing[];
}

export async function fetchStripePayments(): Promise<StripePayment[]> {
  const { data, error } = await supabaseCacheFreeClient
    .from("stripe_payments")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) return [];
  return data as StripePayment[];
}

export async function confirmStripeRegistration(id: string) {
  const responseHandler = new ResponseHandler<any>();
  try {
    const { error } = await supabaseCacheFreeClient
      .from("stripe_payments")
      .update({ registration_status: "confirmed" })
      .eq("id", id);

    if (error) return responseHandler.setError(error.message ?? "Failed to confirm registration");

    revalidatePath("/stripe-payments", "page");
    return responseHandler.setSuccess("Registration confirmed successfully");
  } catch (error: any) {
    return responseHandler.setError(error.message ?? "Failed to confirm registration");
  }
}

export async function saveStripePayment(payload: Omit<StripePayment, "id" | "created_at">): Promise<void> {
  const { error } = await supabaseCacheFreeClient
    .from("stripe_payments")
    .insert([payload]);

  if (error) {
    throw new Error(error.message ?? "Failed to save payment record");
  }
}
