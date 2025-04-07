// columns.tsx
"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SessionProgress } from "@/server/types/sessions-progress.type";
import { RemoveSessionProgressAlertDialog } from "../_component/remove_session_progress_alert";
import SessionProgressSwitch from "../_component/mapping_switch";

export function columns(
  refetch: () => Promise<void>
): ColumnDef<SessionProgress>[] {
  return [
    {
      accessorKey: "title",
      header: () => <div className="text-left">Title</div>,
      cell: ({ row }) => (
        <div className="text-left">{row.getValue("title")}</div>
      ),
    },
    {
      accessorKey: "is_completed",
      header: () => <div className="text-center">Completed</div>,
      cell: ({ row }) => (
        <div className="flex justify-center">
          <SessionProgressSwitch
            session_progress_auto_id={row.original.session_progress_auto_id}
            is_completed={row.original.is_completed}
            refetch={refetch}
          />
        </div>
      ),
    },
    {
      accessorKey: "actions",
      header: () => <div className="text-center">Actions</div>,
      cell: ({ row }) => (
        <div className="flex justify-center gap-2">
          <RemoveSessionProgressAlertDialog
            sessionProgressAutoId={row.original.session_progress_auto_id}
            refetch={refetch}
          />
        </div>
      ),
    },
  ];
}
