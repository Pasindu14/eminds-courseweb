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
import examSchema from "@/validations/exam.validation"; // Define this validation schema
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { addExam, removeExam } from "@/server/actions/exams.actions";
import CourseSelect from "@/components/common/course_select";
import BatchSelect from "@/components/common/batch_select";

export function ExamForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof examSchema>>({
    resolver: zodResolver(examSchema),
    defaultValues: {
      batch_code: data?.batch_code ?? "",
      course_code: data?.course_code ?? "",
      exam_code: data?.exam_code ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof examSchema>) {
    try {
      setLoading(true);
      let result;

      result = await addExam(values);

      if (!result.success) {
        toastError(result.message);
      } else {
        if (data?.exam_auto_id == null) {
          form.reset();
        }
        toastSuccess(successMessage);
      }
    } catch (error) {
      console.log(error);
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const courseCode = useWatch({
    control: form.control,
    name: "course_code",
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CourseSelect control={form.control} name="course_code" />

        <BatchSelect
          control={form.control}
          name="batch_code"
          filter={courseCode}
        />

        <FormField
          control={form.control}
          name="exam_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Exam Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter exam code..." {...field} />
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
