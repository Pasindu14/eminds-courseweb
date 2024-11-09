"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";

export const detailViewColumns: ColumnDef<any>[] = [
  {
    accessorKey: "schedule_date",
    header: "Date",
  },
  {
    accessorKey: "attendance_status",
    header: "Attendance",
    cell: ({ row }) => {
      if (row.original.attendance_status == 1) {
        return <Badge variant="default">Present</Badge>;
      } else {
        return <Badge variant="destructive">Absent</Badge>;
      }
    },
  },
];
