"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
import * as z from "zod";

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

import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import BatchSelect from "../../../../../components/common/batch_select"; // Assuming you have this component
import studentMappingSchema from "@/validations/student-mapping.validation";
import { addStudentMapping } from "@/server/actions/student-mapping.actions";
import CourseSelect from "@/components/common/course_select";
import { MultiSelect } from "@/components/common/multi-select";
import dynamic from "next/dynamic";

export function StudentMappingForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof studentMappingSchema>>({
    resolver: zodResolver(studentMappingSchema),
    defaultValues: {
      batch_auto_id: data?.batch_auto_id ?? "",
      course_auto_id: data?.course_auto_id ?? "",
      block_status: data?.block_status ?? 1,
      students: [],
    },
  });

  async function onSubmit(values: z.infer<typeof studentMappingSchema>) {
    try {
      setLoading(true);
      let result;
      result = await addStudentMapping(values);
      if (!result.success) {
        toastError(result.message);
      } else {
        toastSuccess(successMessage);
      }
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

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

        <MultiSelect control={form.control} name="students" />
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
