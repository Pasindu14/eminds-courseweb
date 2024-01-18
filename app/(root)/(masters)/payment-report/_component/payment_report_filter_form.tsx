"use client";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "@/lib/spinners";
import { toastError } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
import { DataTable } from "@/components/datatable";
import { columns } from "../datatable/columns";

import { Separator } from "@/components/ui/separator";
import CourseSelect from "@/components/common/course_select";
import { paymentReportSchema } from "@/validations/payment-report.validation";
import BatchSelect from "@/components/common/batch_select";
import { fetchAllPaymentsForReport } from "@/server/actions/payments.actions";
import DownloadExcel from "./download_excel";

const PaymentFilterForm = () => {
  const [loading, setLoading] = useState(false);
  const [payments, setPayments] = useState<Payment[]>([]);
  const form = useForm<z.infer<typeof paymentReportSchema>>({
    resolver: zodResolver(paymentReportSchema),
    defaultValues: {
      course_auto_id: "",
      batch_auto_id: "",
    },
  });

  async function onSubmit(values: z.infer<typeof paymentReportSchema>) {
    try {
      setLoading(true);
      await fetchPaymentLinesWithFilter(values);
    } catch (error) {
      console.log(error);
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const fetchPaymentLinesWithFilter = async (values: any) => {
    const result = await fetchAllPaymentsForReport(
      values.batch_auto_id,
      values.course_auto_id
    );

    setPayments(result);
  };

  const courseCode = useWatch({
    control: form.control,
    name: "course_auto_id",
  });

  return (
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="md:flex flex-row items-end gap-2">
            <div className="md:w-1/3">
              <CourseSelect control={form.control} name="course_auto_id" />
            </div>
          </div>
          <div className="md:w-1/3">
            <BatchSelect
              control={form.control}
              name="batch_auto_id"
              filter={courseCode}
            />
          </div>
          <div className="gap-2 flex flex-col md:flex-row md:items-center">
            <Button type="submit" disabled={loading}>
              {loading ? (
                <div className="md:flex items-center justify-center gap-2">
                  <p>Generate Report</p>
                  <Loader size={13} />
                </div>
              ) : (
                "Generate Report"
              )}
            </Button>
          </div>
        </form>
      </Form>
      <Separator className="mt-2 mb-2" />
      <div className="flex flex-row justify-end">
        <DownloadExcel data={payments} />
      </div>
      <DataTable columns={columns} data={payments} />
    </div>
  );
};

export default PaymentFilterForm;
