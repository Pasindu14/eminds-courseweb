"use client";

import { ColumnDef } from "@tanstack/react-table";
import { ConfirmDeleteAlertDialog } from "../_component/remove_session_alert";
import Link from "next/link";
import { Event } from "@/server/types/events.type"; // Make sure you have an Event type defined
import { formatDate } from "@/lib/utils";

export const columns: ColumnDef<Event>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "description",
    header: "Description",
  },
  {
    accessorKey: "date",
    header: "Date",
    cell: ({ row }) => formatDate(row.original.date), //
  },

  {
    accessorKey: "link",
    header: "Link",
    cell: ({ row }) => (
      <Link
        href={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.link}`}
        target="_blank"
      >
        <p className="text-blue-600">Link</p>
      </Link>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (row.original.status === 1 ? "Active" : "Deactive"), //
  },
  {
    accessorKey: "event_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return (
        <div>
          <ConfirmDeleteAlertDialog
            event_auto_id={row.original.event_auto_id}
          />
        </div>
      );
    },
  },
];
