"use client";
import { DataTable } from "@/components/datatable";
import React, { useState } from "react";
import { columns } from "../datatable/columns";
import { useForm } from "react-hook-form";
import { errorMessage } from "@/constants/messages";
import { toastError } from "@/lib/toast/toast";
import { fetchFinalSubmissionMarks } from "@/server/actions/exams.actions";

import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { finalSubmissionFilterSchema } from "@/validations/final-submission.validation";
import { Form } from "@/components/ui/form";
import BatchSelect from "@/components/common/batch_select";
import { LoaderFull } from "@/lib/spinners";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

export const FilteringForm = () => {
  const [data, setData] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof finalSubmissionFilterSchema>>({
    resolver: zodResolver(finalSubmissionFilterSchema),
    defaultValues: {
      batchId: "",
    },
  });

  const hasErrors = Object.keys(form.formState.errors).length === 0;

  async function onSubmit(values: z.infer<typeof finalSubmissionFilterSchema>) {
    try {
      setLoading(true);
      const result = await fetchFinalSubmissionMarks(values.batchId);
      setData(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <div className="md:flex items-center gap-2">
            <div className="w-full md:basis-1/3">
              <BatchSelect control={form.control} name="batchId" />
            </div>

            <Button
              type="submit"
              className={`md:mt-8 mt-2 ${!hasErrors && "md:mt-1"}`}
            >
              Filter
            </Button>
          </div>

          <Separator className="mt-4" />
          {loading && <LoaderFull size={25} color="#2563EB" />}
          {!loading && <DataTable columns={columns} data={data} />}
        </form>
      </Form>
    </div>
  );
};
