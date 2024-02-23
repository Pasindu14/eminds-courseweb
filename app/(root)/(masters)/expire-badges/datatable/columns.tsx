"use client";

import { formatDate } from "@/lib/utils";
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDeleteAlertDialog } from "../_component/confirm-delete-alert-dialog";

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
    accessorKey: "courses.course_name",
    header: "Course",
  },
  {
    accessorKey: "created_date",
    header: "Date",
    cell: ({ row }) => {
      return formatDate(row.original.created_date);
    },
  },
  {
    accessorKey: "created_date",
    header: "Date",
    cell: ({ row }) => {
      return (
        <ConfirmDeleteAlertDialog
          badge_auto_id={row.original.auto_id}
          fileUrl={row.original.link}
        />
      );
    },
  },
];
