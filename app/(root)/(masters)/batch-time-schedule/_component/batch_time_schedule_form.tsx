"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Form, FormField, FormItem, FormMessage } from "@/components/ui/form";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import BatchSelect from "../../../../../components/common/batch_select"; // Assuming you have this component
import { addStudentMapping } from "@/server/actions/student-mapping.actions";
import CourseSelect from "@/components/common/course_select";
import { DayPicker } from "react-day-picker";
import "react-day-picker/style.css";
import batchTimeScheduleSchema from "@/validations/batch-time-schedule.validation";
import { addBatchTimeSchedule } from "@/server/actions/batch-time-schedule.actions";

export function BatchTimeScheduleForm({
  closeDialog,
}: {
  closeDialog: () => void;
}) {
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof batchTimeScheduleSchema>>({
    resolver: zodResolver(batchTimeScheduleSchema),
    defaultValues: {
      batch_auto_id: "",
      course_auto_id: "",
      dates: [],
    },
  });

  async function onSubmit(values: z.infer<typeof batchTimeScheduleSchema>) {
    try {
      setLoading(true);
      let result;
      result = await addBatchTimeSchedule(values);
      if (!result.success) {
        toastError(result.message);
      } else {
        toastSuccess(successMessage);
        closeDialog();
      }
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }
  // Update selected dates and form's dates field
  const handleSelect = (dates: Date[] | undefined) => {
    const newDates = dates || [];
    form.setValue("dates", newDates); // Update the `dates` array in the form
  };
  const courseCode = useWatch({
    control: form.control,
    name: "course_auto_id",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-row"></div>
        <CourseSelect control={form.control} name="course_auto_id" />

        <BatchSelect
          control={form.control}
          name="batch_auto_id"
          filter={courseCode}
        />

        <FormField
          control={form.control}
          name="dates"
          render={({ field }) => (
            <FormItem className="flex flex-col items-center">
              <DayPicker
                mode="multiple"
                className="border-2 p-6 rounded-lg"
                selected={field.value}
                onSelect={handleSelect}
              />
              <FormMessage />
            </FormItem>
          )}
        />
        <hr />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <p>Save changes</p>
              <Loader size={13} />
            </div>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
}
