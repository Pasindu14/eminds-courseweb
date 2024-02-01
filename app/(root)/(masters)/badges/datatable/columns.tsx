"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";
import { ConfirmDeleteAlertDialog } from "../_component/remove_badge_alert";
import { Badge } from "@/server/types/badge.type";

export const columns: ColumnDef<Badge>[] = [
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
    accessorKey: "link",
    header: "Slide Url",
    cell: ({ row }) => (
      <Link
        href={`/profile/${row.original.course_auto_id}_${row.original.student_auto_id}`}
        target="_blank"
      >
        <p className="text-blue-600">Slide</p>
      </Link>
    ), // Use or create a component for exam updates
  },
  {
    accessorKey: "exam_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <ConfirmDeleteAlertDialog badge_auto_id={row.original.auto_id} />
    ), // Use or create a component for exam updates
  },
];
