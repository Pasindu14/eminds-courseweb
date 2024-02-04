"use client";

import { ColumnDef } from "@tanstack/react-table";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "student_name",
    header: "Student",
  },
  {
    accessorKey: "student_phone",
    header: "Phone",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
];
