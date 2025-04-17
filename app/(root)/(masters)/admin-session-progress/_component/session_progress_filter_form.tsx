"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState, useCallback, useEffect } from "react";
import { useForm, useWatch } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { Loader } from "@/lib/spinners";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { errorMessage, successMessage } from "@/constants/messages";
import { DataTable } from "@/components/datatable";
import { Separator } from "@/components/ui/separator";
import { SessionProgress } from "@/server/types/sessions-progress.type";
import { sessionProgressFilterSchema } from "@/validations/session-progress.validation";
import { columns as getColumns } from "../datatable/columns";
import BatchSelect from "@/components/common/batch_select";
import { motion } from "framer-motion";
import { fetchSessionProgress } from "@/server/actions/sessions-progress.actions";
import CourseSelect from "@/components/common/course_select";
import { AddSessionProgressDialog } from "./add_session_progress_dialog";
import BatchTimeScheduleSelect from "@/components/common/batch_time_schedule_select";

const SessionProgressFilterForm = () => {
  const [loading, setLoading] = useState(false);
  const [sessionProgress, setSessionProgress] = useState<SessionProgress[]>([]);
  const [batchId, setBatchId] = useState<string>("");
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [selectedCourseAutoId, setSelectedCourseAutoId] = useState<
    string | undefined
  >(undefined);
  const [selectedBatchId, setSelectedBatchId] = useState<string | undefined>(
    undefined
  );

  const form = useForm<z.infer<typeof sessionProgressFilterSchema>>({
    resolver: zodResolver(sessionProgressFilterSchema),
    defaultValues: {
      batchId: "",
      courseAutoId: "",
    },
  });

  const fetchProgress = useCallback(async (id?: string) => {
    try {
      setLoading(true);
      const result = await fetchSessionProgress(id?.toString());
      setSessionProgress(result);
      setShowAddDialog(true);
    } catch {
      toastError(errorMessage);
      setShowAddDialog(false);
    } finally {
      setLoading(false);
    }
  }, []);

  const handleProgressAdded = useCallback(() => {
    // After adding progress, refetch the data to update the table
    fetchProgress(selectedBatchId);
  }, [fetchProgress, selectedBatchId]);

  async function onSubmit(values: z.infer<typeof sessionProgressFilterSchema>) {
    setSelectedBatchId(values.batchId);
    setSelectedCourseAutoId(values.courseAutoId);
    setBatchId(values.batchId); // Keep batchId for the columns function
    await fetchProgress(values.batchId);
  }

  const columns = getColumns(() => fetchProgress(batchId));
  const courseCode = useWatch({
    control: form.control,
    name: "courseAutoId",
  });

  const batchCode = useWatch({
    control: form.control,
    name: "courseAutoId",
  });

  useEffect(() => {
    setShowAddDialog(false);
    setSelectedBatchId(undefined);
    setSelectedCourseAutoId(undefined);
    setSessionProgress([]);
  }, [courseCode]);

  useEffect(() => {
    setShowAddDialog(false);
    setSelectedBatchId(undefined);
    setSessionProgress([]);
  }, [batchCode]);

  return (
    <div className="mt-2">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
      >
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
            <div className="md:flex flex-row gap-2">
              <div className="md:w-1/4">
                <CourseSelect control={form.control} name="courseAutoId" />
              </div>

              <div className="md:w-1/3">
                <BatchSelect
                  control={form.control}
                  name="batchId"
                  filter={courseCode}
                />
              </div>
              <div className="gap-2 flex flex-col md:flex-row md:items-center">
                <Button
                  type="submit"
                  disabled={loading}
                  className={`md:mt-8 mt-2`}
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
                {showAddDialog && (
                  <AddSessionProgressDialog
                    batchId={selectedBatchId}
                    courseAutoId={selectedCourseAutoId}
                    onProgressAdded={handleProgressAdded}
                  />
                )}
              </div>
            </div>
          </form>
        </Form>
        <Separator className="mt-2" />
        <DataTable columns={columns} data={sessionProgress} />
      </motion.div>
    </div>
  );
};

export default SessionProgressFilterForm;
