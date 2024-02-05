"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";
import { Badge } from "@/server/types/badge.type";
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
