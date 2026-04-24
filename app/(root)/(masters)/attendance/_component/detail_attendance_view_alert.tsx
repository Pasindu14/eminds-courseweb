"use client";
import { DataTable } from "@/components/datatable";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";

import { Loader } from "@/lib/spinners";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { convertToLocaleDateTime } from "@/lib/utils";
import { resetFingerprint, unblockUser } from "@/server/actions/auth.action";
import { fetchFingerprintData } from "@/server/actions/students-auth.actions";

import { useEffect, useState } from "react";
import { columns } from "../datatable/columns";
import { fetchTotalAttendanceForBatch } from "@/server/actions/attendance.actions";
import { detailViewColumns } from "../datatable/detail_view_columns";
import { Badge } from "@/components/ui/badge";

export function DetailAttendanceViewAlert({
  auto_id,
  batch_auto_id,
  student_auto_id,
}: {
  auto_id: number | null;
  batch_auto_id: string;
  student_auto_id: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState<any[]>([]);
  const resetFunction = async () => {
    try {
      setLoading(true);
      await resetFingerprint(auto_id!.toString());
      await unblockUser(student_auto_id, batch_auto_id);
      toastSuccess("Fingerprint reset successfully");
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      const fetch = async () => {
        const result = await fetchTotalAttendanceForBatch(
          student_auto_id,
          batch_auto_id
        );
        setData(result);
        return result;
      };
      fetch();
    }
  }, [open, student_auto_id, batch_auto_id]);
  // Calculate attendance metrics
  const totalDays = data ? data.length : 0;
  const totalPresentDays = data
    ? data.filter((day: any) => day.attendance_status === 1).length
    : 0;
  const attendancePercentage =
    totalDays > 0 ? ((totalPresentDays / totalDays) * 100).toFixed(2) : "0.00";

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="default" className="md:ml-2">
          Detail View
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:max-w-7xl ">
        <AlertDialogHeader>
          <AlertDialogTitle>Detail View</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <>
              <DataTable columns={detailViewColumns} data={data} />
              <div className="mt-4">
                <Badge variant={"secondary"} className="ml-4 mr-4 text-xl p-2">
                  Total Days: {totalDays}
                </Badge>
                <Badge variant={"secondary"} className="ml-4 mr-4 text-xl p-2">
                  Total Present Days: {totalPresentDays}
                </Badge>
                <Badge variant={"secondary"} className="ml-4 mr-4 text-xl p-2">
                  Attendance Percentage: {attendancePercentage} %
                </Badge>
              </div>
            </>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Close</AlertDialogCancel>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
