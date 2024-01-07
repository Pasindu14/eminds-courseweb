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
import questionSchema from "@/validations/question.validation"; // Adjusted to question validation schema
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { addQuestion } from "@/server/actions/question.actions";
import CourseSelect from "@/components/common/course_select";
import BatchSelect from "@/components/common/batch_select";
import ExamSelect from "@/components/common/exam_select";

export function QuestionForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      course_code: data?.course_code ?? "",
      batch_code: data?.batch_code ?? "",
      exam_code: data?.exam_code ?? "",
      question: data?.question ?? "adaasdasasd",
      answer_01: data?.answer_01 ?? "adasdsad",
      answer_02: data?.answer_02 ?? "asdassa",
      answer_03: data?.answer_03 ?? "asdassad",
      answer_04: data?.answer_04 ?? "asdsasadasd",
      correct_answer: data?.correct_answer ?? null,
    },
  });

  const courseCode = useWatch({
    control: form.control,
    name: "course_code",
  });

  const batchCode = useWatch({
    control: form.control,
    name: "batch_code",
  });

  async function onSubmit(values: z.infer<typeof questionSchema>) {
    try {
      setLoading(true);
      let result;

      result = await addQuestion(values);

      if (!result.success) {
        toastError(result.message);
      } else {
        if (data == null) {
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

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CourseSelect control={form.control} name="course_code" />
        <BatchSelect
          control={form.control}
          name="batch_code"
          filter={courseCode}
        />
        <ExamSelect
          control={form.control}
          name="exam_code"
          batch={batchCode}
          course={courseCode}
        />
        <FormField
          control={form.control}
          name="answer_01"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer 01</FormLabel>
              <FormControl>
                <Input placeholder="Enter answer 01..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_02"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer 02</FormLabel>
              <FormControl>
                <Input placeholder="Enter answer 02..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_03"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer 03</FormLabel>
              <FormControl>
                <Input placeholder="Enter answer 03..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="answer_04"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Answer 04</FormLabel>
              <FormControl>
                <Input placeholder="Enter answer 04..." {...field} />
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
