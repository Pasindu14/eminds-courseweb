"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatDate } from "@/lib/utils";
import { DetailAttendanceViewAlert } from "../_component/detail_attendance_view_alert";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "students.name",
    header: "Student",
  },
  {
    accessorKey: "students.phonenumber",
    header: "Phone",
  },
  {
    accessorKey: "total_attendance",
    header: () => <div>Detail View</div>,
    cell: ({ row }) => (
      <>
        <DetailAttendanceViewAlert
          auto_id={row.original.student_auto_id}
          batch_auto_id={row.original.batch_auto_id?.toString()!}
          student_auto_id={row.original.student_auto_id?.toString()!}
        />
      </>
    ),
  },
];
