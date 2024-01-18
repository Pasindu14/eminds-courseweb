"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { convertToLocaleDateTime } from "@/lib/utils";

export const columns: ColumnDef<PaymentLines>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return convertToLocaleDateTime(row.original.created_at);
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "approve_status",
    header: "Approve Status",
    cell: ({ row }) => {
      if (row.original.approve_status == 1) {
        return <Badge variant="secondary">Approved</Badge>;
      } else {
        return <Badge variant="destructive">Pending</Badge>;
      }
    },
  },
  {
    accessorKey: "image_url",
    header: "Receipt Url",
    cell: ({ row }) => {
      if (row.original.image_url) {
        return (
          <Link
            href={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.image_url}`}
            target="_blank"
          >
            <Badge>Reciept</Badge>
          </Link>
        );
      } else {
        <p className="text-blue-600">Added By Admin</p>;
      }
    },
  },
];
