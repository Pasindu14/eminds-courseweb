"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "@/lib/spinners";
import { toastError } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
import { DataTable } from "@/components/datatable";
import { Separator } from "@/components/ui/separator";
import { StudentMapping } from "@/server/types/student-mapping.type";
import { fetchStudentMappings } from "@/server/actions/student-mapping.actions";
import { studentMappingFilterSchema } from "@/validations/student-mapping.validation";
import { columns } from "../datatable/columns";
import BatchSelect from "@/components/common/batch_select";

const StudentMappingFilterForm = () => {
  const [loading, setLoading] = useState(false);
  const [studentMapping, setStudentMapping] = useState<StudentMapping[]>([]);
  const form = useForm<z.infer<typeof studentMappingFilterSchema>>({
    resolver: zodResolver(studentMappingFilterSchema),
    defaultValues: {
      batchId: "",
    },
  });

  async function onSubmit(values: z.infer<typeof studentMappingFilterSchema>) {
    await fetchBatches(values.batchId);
  }

  const fetchBatches = async (batchId?: string) => {
    try {
      setLoading(true);
      const result = await fetchStudentMappings(batchId);
      setStudentMapping(result);
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const hasErrors = Object.keys(form.formState.errors).length === 0;

  return (
    <div className="mt-2">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
          <div className="md:flex flex-row  gap-2">
            <div className="w-1/3">
              <BatchSelect control={form.control} name="batchId" />
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
      <DataTable columns={columns} data={studentMapping} />
    </div>
  );
};

export default StudentMappingFilterForm;
