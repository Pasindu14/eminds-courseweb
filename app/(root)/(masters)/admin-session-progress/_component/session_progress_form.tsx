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
import { Input } from "@/components/ui/input";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { sessionProgressSchema } from "@/validations/session-progress.validation";
import { addSessionProgress } from "@/server/actions/sessions-progress.actions";

interface AddSessionProgressFormProps {
  defaultBatchId: string | undefined;
  defaultCourseAutoId: string | undefined;
  onProgressAdded?: () => void; // Optional callback
}

export function AddSessionProgressForm({
  defaultBatchId,
  defaultCourseAutoId,
  onProgressAdded,
}: AddSessionProgressFormProps) {
  console.log(defaultBatchId, defaultCourseAutoId);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof sessionProgressSchema>>({
    resolver: zodResolver(sessionProgressSchema),
    defaultValues: {
      title: "",
      batch_auto_id: defaultBatchId, // Set default value from prop
      course_auto_id: defaultCourseAutoId, // Set default value from prop
    },
  });

  async function onSubmit(values: z.infer<typeof sessionProgressSchema>) {
    try {
      setLoading(true);
      const result = await addSessionProgress(
        values.title,
        values.batch_auto_id
      );

      if (!result?.success) {
        toastError(result?.message ?? errorMessage);
      } else {
        toastSuccess(successMessage);
        form.reset(); // Optionally reset the form after success
        onProgressAdded?.(); // Call the callback if provided
      }
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        {/* Remove CourseSelect */}
        {defaultCourseAutoId && (
          <input
            type="hidden"
            value={defaultCourseAutoId}
            {...form.register("course_auto_id")}
          />
        )}

        {/* Remove BatchSelect */}
        {defaultBatchId && (
          <input
            type="hidden"
            value={defaultBatchId}
            {...form.register("batch_auto_id")}
          />
        )}

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Progress Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter progress title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <p>Add Progress</p>
              <Loader size={13} />
            </div>
          ) : (
            "Add Progress"
          )}
        </Button>
      </form>
    </Form>
  );
}
