"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
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

import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import CourseSelect from "@/components/common/course_select";
import { MultiSelect } from "@/components/common/multi-select";
import badgeSchema from "@/validations/badge.validation";
import { Input } from "@/components/ui/input";
import { addBadge } from "@/server/actions/badge.actions";

export function BadgeForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof badgeSchema>>({
    resolver: zodResolver(badgeSchema),
    defaultValues: {
      course_auto_id: data?.course_auto_id ?? "",
      students: [],
      file: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof badgeSchema>) {
    try {
      setLoading(true);
      let result;
      const fileFormData = new FormData();
      fileFormData.append("file", values.file[0]);

      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key !== "file") {
          formData.append(key, value);
        }
      }

      result = await addBadge(formData, fileFormData);
      if (!result.success) {
        toastError(result.message);
      } else {
        toastSuccess(successMessage);
      }
    } catch (error) {
      console.log(error);
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <div className="flex flex-row"></div>
        <CourseSelect control={form.control} name="course_auto_id" />

        <MultiSelect control={form.control} name="students" max={1} />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  placeholder="Zoom password..."
                  type="file"
                  onChange={(event) => field.onChange(event.target.files)}
                />
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
