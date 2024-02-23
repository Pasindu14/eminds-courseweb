"use client";

import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDeleteAlertDialog } from "../_components/remove_exam_alert";
// Assuming you have an update dialog for exams

export const columns: ColumnDef<Exam>[] = [
  {
    accessorKey: "exam_code",
    header: "Exam Code",
  },
  {
    accessorKey: "batches.batch_no",
    header: "Batch",
  },
  {
    accessorKey: "courses.course_code",
    header: "Course Code",
  },
  {
    accessorKey: "exam_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <ConfirmDeleteAlertDialog exam_auto_id={row.original.exam_auto_id} />
    ), // Use or create a component for exam updates
  },
];
