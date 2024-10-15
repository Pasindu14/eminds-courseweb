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
import CourseSelect from "@/components/common/course_select";
import specialSessionSchema from "@/validations/special-session.validation";
import { MultiSelectBatches } from "@/components/common/multi-select-batches";
import { addSpecialSession } from "@/server/actions/special-session.actions";

export function SpecialSessionForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof specialSessionSchema>>({
    resolver: zodResolver(specialSessionSchema),
    defaultValues: {
      course_auto_id: data?.course_auto_id ?? "",
      batches: [],
    },
  });

  async function onSubmit(values: z.infer<typeof specialSessionSchema>) {
    try {
      setLoading(true);
      let result;
      result = await addSpecialSession(values);
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

        <MultiSelectBatches
          control={form.control}
          name="batches"
          filter={courseCode}
        />
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="video_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Video Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter video link..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
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
