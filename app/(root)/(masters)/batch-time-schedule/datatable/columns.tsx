"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDeleteAlertDialog } from "../_component/remove_batch_time_schedule_alert";
import { BatchTimeSchedule } from "@/server/types/batch-time-schedule";

export const columns = (
  handleDelete: () => void
): ColumnDef<BatchTimeSchedule>[] => [
  {
    accessorKey: "date",
    header: "Date",
  },
  {
    accessorKey: "batches.batch_name",
    header: "Batch",
  },
  {
    accessorKey: "auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <>
        <ConfirmDeleteAlertDialog
          auto_id={row.original.auto_id}
          onDelete={handleDelete}
        />
        {/*   <ResetFingerprintAlertDIalog
          auto_id={row.original.student_auto_id}
          batch_auto_id={row.original.batch_auto_id?.toString()!}
          student_auto_id={row.original.student_auto_id?.toString()!}
        /> */}
      </>
    ),
  },
];
