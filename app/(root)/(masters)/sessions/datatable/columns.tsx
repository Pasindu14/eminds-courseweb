"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDeleteAlertDialog } from "../_component/remove_session_alert";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "zoom_link",
    header: "Zoom Link",
    cell: ({ row }) => (
      <Link href={`${row.original.zoom_link}`} target="_blank">
        <p className="text-blue-600">Zoom Link</p>
      </Link>
    ), // Use or create a component for exam updates
  },

  {
    accessorKey: "zoom_password",
    header: "Password",
  },
  {
    accessorKey: "batches.batch_no",
    header: "Batch No",
  },
  {
    accessorKey: "batches.batch_name",
    header: "Batch Name",
  },
  {
    accessorKey: "slide_extension",
    header: "Slide Url",
    cell: ({ row }) => {
      if (row.original.slide_extension == null) {
        return (
          <Link
            href={`https://eminds.com.au/coursewebslides/slides/${row.original.new_url}`}
            target="_blank"
          >
            <p className="text-blue-600">Slide</p>
          </Link>
        );
      } else {
        return (
          <Link
            href={`https://eminds.com.au/coursewebslides/slides/${row.original.session_auto_id}.${row.original.slide_extension}`}
            target="_blank"
          >
            <p className="text-blue-600">Slide</p>
          </Link>
        );
      }
    },
  },
  {
    accessorKey: "exam_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <ConfirmDeleteAlertDialog
        session_auto_id={row.original.session_auto_id}
        filePath={row.original.new_url}
      />
    ), // Use or create a component for exam updates
  },
];
