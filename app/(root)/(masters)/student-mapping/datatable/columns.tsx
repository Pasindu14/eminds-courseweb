"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { StudentMapping } from "@/server/types/student-mapping.type";
import { ConfirmDeleteAlertDialog } from "../_component/remove_mapping_alert";
import MappginSwitch from "../_component/mapping_switch";

export const columns: ColumnDef<StudentMapping>[] = [
  {
    accessorKey: "students.name",
    header: "Student",
  },
  {
    accessorKey: "batches.batch_name",
    header: "Batch",
  },
  {
    accessorKey: "block_status",
    header: () => <div>Status</div>,
    cell: ({ row }) => (
      <MappginSwitch
        auto_id={row.original.auto_id}
        block_status={row.original.block_status}
      />
    ),
  },
  {
    accessorKey: "auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <ConfirmDeleteAlertDialog auto_id={row.original.auto_id} />
    ),
  },
];
