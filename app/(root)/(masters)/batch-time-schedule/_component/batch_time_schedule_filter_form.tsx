"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "@/lib/spinners";
import { toastError } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
import { DataTable } from "@/components/datatable";
import { Separator } from "@/components/ui/separator";
import { StudentMapping } from "@/server/types/student-mapping.type";
import { fetchStudentMappings } from "@/server/actions/student-mapping.actions";
import { studentMappingFilterSchema } from "@/validations/student-mapping.validation";
import { columns } from "../datatable/columns";
import BatchSelect from "@/components/common/batch_select";
import { motion } from "framer-motion";
import { BatchTimeSchedule } from "@/server/types/batch-time-schedule";
import { fetchBatchTimeSchedules } from "@/server/actions/batch-time-schedule.actions";
import { batchTimeScheduleFilterSchema } from "@/validations/batch-time-schedule.validation";

const BatchTimeScheduleFilterForm = () => {
  const [loading, setLoading] = useState(false);
  const [batchTimeSchedule, setBatchTimeSchedule] = useState<
    BatchTimeSchedule[]
  >([]);
  const form = useForm<z.infer<typeof batchTimeScheduleFilterSchema>>({
    resolver: zodResolver(batchTimeScheduleFilterSchema),
    defaultValues: {
      batchId: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof batchTimeScheduleFilterSchema>
  ) {
    await fetchBatches(values.batchId);
  }

  const fetchBatches = useCallback(async (batchId?: string) => {
    try {
      setLoading(true);
      const result = await fetchBatchTimeSchedules(batchId);
      setBatchTimeSchedule(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleDelete = useCallback(() => {
    fetchBatches(form.getValues("batchId"));
    console.log("first");
  }, [form, fetchBatches]);

  const hasErrors = Object.keys(form.formState.errors).length === 0;

  return (
    <div className="mt-2">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="md:flex flex-row  gap-2">
              <div className="w-1/3">
                <BatchSelect control={form.control} name="batchId" />
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
              </div>
            </div>
          </form>
        </Form>
        <Separator className="mt-2" />
        <DataTable columns={columns(handleDelete)} data={batchTimeSchedule} />
      </motion.div>
    </div>
  );
};

export default BatchTimeScheduleFilterForm;
