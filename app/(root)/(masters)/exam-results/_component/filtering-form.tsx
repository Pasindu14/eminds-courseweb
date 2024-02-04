"use client";
import { DataTable } from "@/components/datatable";
import React, { useState } from "react";
import { columns } from "../datatable/columns";
import { useForm, useWatch } from "react-hook-form";
import { errorMessage } from "@/constants/messages";
import { toastError } from "@/lib/toast/toast";
import {
  fetchExamMarks,
  fetchFinalSubmissionMarks,
} from "@/server/actions/exams.actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { finalSubmissionFilterSchema } from "@/validations/final-submission.validation";
import { Form } from "@/components/ui/form";
import BatchSelect from "@/components/common/batch_select";
import { LoaderFull } from "@/lib/spinners";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { examResultsilterSchema } from "@/validations/exam.validation";
import CourseSelect from "@/components/common/course_select";
import ExamSelect from "@/components/common/exam_select";
import { fetchMarksByExamId } from "@/server/actions/exam-marks.actions";

export const FilteringForm = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof examResultsilterSchema>>({
    resolver: zodResolver(examResultsilterSchema),
    defaultValues: {
      courseId: "",
      batchId: "",
      examId: "",
    },
  });

  const hasErrors = Object.keys(form.formState.errors).length === 0;

  async function onSubmit(values: z.infer<typeof examResultsilterSchema>) {
    try {
      setLoading(true);
      const result = await fetchExamMarks(values.examId);
      console.log(result);
      setData(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  const courseCode = useWatch({
    control: form.control,
    name: "courseId",
  });

  const batchCode = useWatch({
    control: form.control,
    name: "batchId",
  });

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="md:flex items-center gap-2">
            <div className="w-full">
              <div className="md:grid grid-cols-4 gap-4">
                <div className="grid-cols-1">
                  <CourseSelect control={form.control} name="courseId" />
                </div>
                <div className="grid-cols-1">
                  <BatchSelect
                    control={form.control}
                    name="batchId"
                    filter={courseCode}
                  />
                </div>
                <div className="grid-cols-1">
                  <ExamSelect
                    control={form.control}
                    name="examId"
                    course={courseCode}
                    batch={batchCode}
                  />
                </div>
                <div className="flex md:justify-end items-center">
                  <Button
                    type="submit"
                    className={`md:mt-8 mt-2 ${!hasErrors && "md:mt-1"}`}
                  >
                    Filter
                  </Button>
                </div>
              </div>
            </div>
          </div>

          <Separator className="mt-4" />
          {loading && <LoaderFull size={25} color="#2563EB" />}
          {!loading && <DataTable columns={columns} data={data} />}
        </form>
      </Form>
    </div>
  );
};
