"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDeleteAlertDialog } from "../_component/remove_special_session_alert";
import { SpecialSession } from "@/server/types/special-session.type";
import Link from "next/link";

export const columns = (
  handleDelete: () => void
): ColumnDef<SpecialSession>[] => [
  {
    accessorKey: "batches.batch_name",
    header: "Batch",
  },
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "video_link",
    header: "Video Link",
    cell: ({ row }) => (
      <Link href={`${row.original.video_link}`} target="_blank">
        <p className="text-blue-600">Open Video</p>
      </Link>
    ),
  },
  {
    accessorKey: "auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <>
        <ConfirmDeleteAlertDialog
          auto_id={row.original.auto_id}
          onDelete={handleDelete}
        />
      </>
    ),
  },
];
