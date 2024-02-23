"use client";
import { paymentFilterSchema } from "@/validations/payment.validation";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { MultiSelect } from "@/components/common/multi-select";
import { Loader } from "@/lib/spinners";
import { toastError } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
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
      studentMapping: [],
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
    setPaymentLines([]);
    const result = await fetchPaymentLinesWithBatchNo(
      undefined,
      Number(values.students[0]),
      undefined
    );
    setPaymentLines(result);
  };

  const fetchPaymentLines = async () => {
    try {
      setLoading(true);
      setPaymentLines([]);
      const result = await fetchPaymentLinesWithBatchNo(
        undefined,
        undefined,
        0
      );
      setPaymentLines(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = Object.keys(form.formState.errors).length === 0;

  return (
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="md:flex flex-row  gap-2">
            <div className="w-1/3">
              <MultiSelect control={form.control} name="students" max={1} />
            </div>
            <div className="gap-2 flex flex-col md:flex-row md:items-center">
              <Button
                type="submit"
                disabled={loading}
                className={`md:mt-8 mt-2 ${!hasErrors && "md:mt-1"}`}
              >
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
                className={`md:mt-8 mt-2 ${!hasErrors && "md:mt-1"}`}
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
