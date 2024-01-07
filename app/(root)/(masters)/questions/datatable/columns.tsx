"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Question } from "@/server/types/question.type"; // Ensure you have a Question type defined
import { ConfirmDeleteAlertDialog } from "../_component/remove_question_alert";

export const columns: ColumnDef<Question>[] = [
  {
    accessorKey: "courses.course_code",
    header: "Course Code",
  },
  {
    accessorKey: "batches.batch_name",
    header: "Batch",
  },
  {
    accessorKey: "exams.exam_code",
    header: "Exam Code",
  },
  {
    accessorKey: "question",
    header: "Question",
  },
  {
    accessorKey: "correct_answer",
    header: "Correct Answer",
  },

  {
    accessorKey: "answer_01",
    header: "Answer 1",
  },
  {
    accessorKey: "answer_02",
    header: "Answer 2",
  },
  {
    accessorKey: "answer_03",
    header: "Answer 3",
  },
  {
    accessorKey: "answer_04",
    header: "Answer 4",
  },
  {
    accessorKey: "question_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <ConfirmDeleteAlertDialog exam_auto_id={row.original.question_auto_id} />
    ), // Use or create a component for exam updates
  },
];
