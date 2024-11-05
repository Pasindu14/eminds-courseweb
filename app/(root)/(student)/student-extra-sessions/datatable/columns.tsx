"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type";
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { StudentMapping } from "@/server/types/student-mapping.type";
import { SpecialSession } from "@/server/types/special-session.type";
import Link from "next/link";
import ActionButton from "../_component/action_button";

export const columns: ColumnDef<SpecialSession>[] = [
  {
    accessorKey: "batches.batch_name",
    header: "Batch",
    size: 100, // Width in pixels
  },
  {
    accessorKey: "title",
    header: "Title",
    size: 200, // Width in pixels
  },
  {
    accessorKey: "zoom_link",
    header: "Video",
    cell: ({ row }) => (
      <div style={{ width: "15px" }}>
        <ActionButton link={row.original.video_link} />
      </div>
    ),
  },
];
