"use client";

import { ColumnDef } from "@tanstack/react-table";

export const resultsColumns: ColumnDef<any>[] = [
  {
    accessorKey: "exams.exam_code",
    header: "Exam",
  },
  {
    accessorKey: "result",
    header: "Result",
  },
];
