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
import { Separator } from "@/components/ui/separator";
import BatchSelect from "@/components/common/batch_select";
import { motion } from "framer-motion";
import { attendanceFilterSchema } from "@/validations/attendance.validation";
import CourseSelect from "@/components/common/course_select";
import { DataTable } from "@/components/datatable";
import { columns } from "../datatable/columns";
import { fetchStudentMappings } from "@/server/actions/student-mapping.actions";

const AttendanceFilterForm = () => {
  const [loading, setLoading] = useState(false);
  const [attendance, setaAttendance] = useState<any[]>([]);
  const form = useForm<z.infer<typeof attendanceFilterSchema>>({
    resolver: zodResolver(attendanceFilterSchema),
    defaultValues: {
      batchId: "",
      courseId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof attendanceFilterSchema>) {
    try {
      setLoading(true);
      const result = await fetchStudentMappings(values.batchId);
      setaAttendance(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const courseId = useWatch({
    control: form.control,
    name: "courseId",
  });

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
                <CourseSelect control={form.control} name="courseId" />
              </div>
              <div className="w-1/3">
                <BatchSelect
                  control={form.control}
                  name="batchId"
                  filter={courseId}
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

        <DataTable columns={columns} data={attendance} />
      </motion.div>
    </div>
  );
};

export default AttendanceFilterForm;
