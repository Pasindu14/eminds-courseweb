"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { StudentMapping } from "@/server/types/student-mapping.type";
import { ConfirmDeleteAlertDialog } from "../_component/remove_exam_alert";
// Assuming you have an update dialog for exams

export const columns: ColumnDef<StudentMapping>[] = [
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
      <ConfirmDeleteAlertDialog exam_auto_id={row.original.auto_id} />
    ), // Use or create a component for exam updates
  },
];
