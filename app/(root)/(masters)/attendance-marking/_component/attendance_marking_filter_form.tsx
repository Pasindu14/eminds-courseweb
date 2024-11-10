"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useCallback, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "@/lib/spinners";
import { toastError } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
import { DataTable } from "@/components/datatable";
import { Separator } from "@/components/ui/separator";
import BatchSelect from "@/components/common/batch_select";
import { motion } from "framer-motion";
import attendanceMarkingFilterSchema from "@/validations/attendance.validation";
import BatchTimeScheduleSelect from "@/components/common/batch_time_schedule_select";
import { columns } from "../datatable/columns";
import { fetchAttendanceRecords } from "@/server/actions/attendance.actions";
import { AttendanceRecord } from "@/server/types/attendance-record.type";

const AttendanceMarkingFilterForm = () => {
  const [loading, setLoading] = useState(false);

  const [attendanceRecords, setAttendanceRecords] = useState<
    AttendanceRecord[]
  >([]);
  const form = useForm<z.infer<typeof attendanceMarkingFilterSchema>>({
    resolver: zodResolver(attendanceMarkingFilterSchema),
    defaultValues: {
      batchId: "",
      batchTimeScheduleId: "",
    },
  });

  async function onSubmit(
    values: z.infer<typeof attendanceMarkingFilterSchema>
  ) {
    fetchResults(values.batchTimeScheduleId, values.batchId);
  }

  const fetchResults = useCallback(
    async (batchTimeScheduleId: string, batchId?: string) => {
      try {
        setLoading(true);
        const result = await fetchAttendanceRecords(
          batchTimeScheduleId,
          batchId
        );
        console.log(result);
        setAttendanceRecords(result);
      } catch (error) {
        toastError(errorMessage);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  const hasErrors = Object.keys(form.formState.errors).length === 0;

  const batchCode = useWatch({
    control: form.control,
    name: "batchId",
  });

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
              <div className="w-1/3">
                <BatchTimeScheduleSelect
                  control={form.control}
                  name="batchTimeScheduleId"
                  filter={batchCode}
                />
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
        <DataTable columns={columns} data={attendanceRecords} />
      </motion.div>
    </div>
  );
};

export default AttendanceMarkingFilterForm;
