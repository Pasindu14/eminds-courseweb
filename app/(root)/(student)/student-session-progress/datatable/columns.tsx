"use client";

import { ColumnDef } from "@tanstack/react-table";
import { SessionProgress } from "@/server/types/sessions-progress.type";
import { Badge, badgeVariants } from "@/components/ui/badge";
import { Check, X } from "lucide-react";

export const columns: ColumnDef<SessionProgress>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "is_completed",
    header: () => <div className="text-center">Status</div>,

    cell: ({ row }) => {
      const isCompleted = row.original.is_completed === 1;
      return (
        <div className="flex justify-center">
          <Badge
            className={`inline-flex items-center gap-1 ${
              isCompleted ? "bg-green-500 text-white" : "bg-red-500 text-white"
            }`}
          >
            {isCompleted ? <Check size={14} /> : <X size={14} />}
            {isCompleted ? "Completed" : "No"}
          </Badge>
        </div>
      );
    },
  },
];
