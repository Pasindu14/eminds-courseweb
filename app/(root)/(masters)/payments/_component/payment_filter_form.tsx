"use client";
import { paymentFilterSchema } from "@/validations/payment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/common/multi-select";
import { Loader } from "@/lib/spinners";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { errorMessage, successMessage } from "@/constants/messages";
import { DataTable } from "@/components/datatable";
import { columns } from "../datatable/columns";
import { fetchPaymentLinesWithBatchNo } from "@/server/actions/payments.actions";
import { Separator } from "@/components/ui/separator";

const PaymentFilterForm = () => {
  const [loading, setLoading] = useState(false);
  const [paymentLines, setPaymentLines] = useState<PaymentLines[]>([]);
  const form = useForm<z.infer<typeof paymentFilterSchema>>({
    resolver: zodResolver(paymentFilterSchema),
    defaultValues: {
      students: [],
    },
  });

  async function onSubmit(values: z.infer<typeof paymentFilterSchema>) {
    try {
      setLoading(true);
      await fetchPaymentLinesWithFilter(values);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const fetchPaymentLinesWithFilter = async (values: any) => {
    const result = await fetchPaymentLinesWithBatchNo(
      Number(values.students[0])
    );
    setPaymentLines(result);
  };

  const fetchPaymentLines = async () => {
    try {
      setLoading(true);
      const result = await fetchPaymentLinesWithBatchNo(undefined, 0);
      setPaymentLines(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="flex flex-row items-end gap-2">
            <div className="w-1/3">
              <MultiSelect control={form.control} name="students" max={1} />
            </div>
            <div className="gap-2 flex flex-col md:flex-row md:items-center">
              <Button type="submit" disabled={loading}>
                {loading ? (
                  <div className="md:flex items-center justify-center gap-2">
                    <p>Filter</p>
                    <Loader size={13} />
                  </div>
                ) : (
                  "Filter"
                )}
              </Button>

              <Button
                type="button"
                disabled={loading}
                onClick={fetchPaymentLines}
              >
                {loading ? (
                  <div className="md:flex items-center justify-center gap-2">
                    <p>Get pending approvals</p>
                    <Loader size={13} />
                  </div>
                ) : (
                  "Get pending approvals"
                )}
              </Button>
            </div>
          </div>
        </form>
      </Form>
      <Separator className="mt-2" />
      <DataTable columns={columns} data={paymentLines} />
    </div>
  );
};

export default PaymentFilterForm;
