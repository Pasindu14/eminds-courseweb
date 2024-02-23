"use client";

import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { formatDate } from "@/lib/utils";

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
    accessorKey: "course_name",
    header: "Course",
  },
  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => {
      return (
        <Button>
          <Link href={row.original.link} target="_blank">
            Submission Link
          </Link>
        </Button>
      );
    },
  },
  {
    accessorKey: "date",
    header: "Submitted Date",
    cell: ({ row }) => formatDate(row.original.date),
  },
];
