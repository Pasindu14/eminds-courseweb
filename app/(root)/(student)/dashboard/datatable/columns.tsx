"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "zoom_link",
    header: "Dropbox Link",
    cell: ({ row }) => (
      <Button asChild>
        <Link href={`${row.original.zoom_link}`} target="_blank">
          <p>Dropbox Link</p>
        </Link>
      </Button>
    ),
  },
  {
    accessorKey: "zoom_password",
    header: "Password",
  },
  {
    accessorKey: "slide_extension",
    header: "Slide Url",
    cell: ({ row }) => (
      <Button asChild>
        <Link
          href={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.slide_extension}`}
          target="_blank"
        >
          <p>Slide Url</p>
        </Link>
      </Button>
    ),
  },
];
