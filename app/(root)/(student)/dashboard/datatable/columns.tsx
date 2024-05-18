"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import CustomButton from "../_component/custom_button";
import { EmbeddedVideo } from "../_component/embedded_video";

export const columns: ColumnDef<Session>[] = [
  {
    accessorKey: "title",
    header: "Title",
  },
  {
    accessorKey: "zoom_link",
    header: "Dropbox Link",
    cell: ({ row }) => <CustomButton row={row} type="dropbox" />,
  },
  {
    accessorKey: "zoom_password",
    header: "Password",
  },
  {
    accessorKey: "slide_extension",
    header: "Slide Url",
    cell: ({ row }) => {
      return (
        <>
          <CustomButton row={row} type="slide" />
          {/* <EmbeddedVideo /> */}
        </>
      );
    },
  },
];
