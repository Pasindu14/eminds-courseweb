"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Session } from "@/server/types/sessions.type";

export const columns: ColumnDef<UsageData>[] = [
  {
    accessorKey: "sessionTitle",
    header: "Session",
  },

  {
    accessorKey: "dropClicksCount",
    header: "Dropbox Clicks",
    cell: ({ row }) => {
      return <p>{`${row.original.dropClicksCount}`}</p>;
    },
  },
  {
    accessorKey: "slidesClicksCount",
    header: "Slides Clicks",
    cell: ({ row }) => {
      return <p>{`${row.original.slidesClicksCount}`}</p>;
    },
  },
];
