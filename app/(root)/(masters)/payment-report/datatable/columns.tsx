"use client";

import { ColumnDef } from "@tanstack/react-table";
import { convertToLocaleDateTime } from "@/lib/utils";

export const columns: ColumnDef<Payment>[] = [
  {
    accessorKey: "student_phone",
    header: "Phone",
  },
  {
    header: "Date",
    cell: ({ row }) => {
      return <p>{convertToLocaleDateTime(row.original.created_at)}</p>;
    },
  },
  {
    accessorKey: "batches.batch_name",
    header: "Batch",
  },
  {
    accessorKey: "batch_price",
    header: "Full",
  },
  {
    accessorKey: "current",
    header: "Paid",
  },
  {
    accessorKey: "payments_line_auto_id",
    header: "Balance",
    cell: ({ row }) => {
      return <p>{row.original.batch_price - row.original.current}</p>;
    },
  },
];
