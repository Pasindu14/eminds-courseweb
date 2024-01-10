"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";

export const columns: ColumnDef<PaymentLines>[] = [
  {
    accessorKey: "payments.created_at",
    header: "Date",
  },
  {
    accessorKey: "payments.batches.batch_name",
    header: "Batch",
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    accessorKey: "image_url",
    header: "Receipt Url",
    cell: ({ row }) => {
      if (row.original.image_url) {
        <Link
          href={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.image_url}`}
          target="_blank"
        >
          <p className="text-blue-600">Receipt</p>
        </Link>;
      }
    }, // Use or create a component for exam updates
  },
  {
    accessorKey: "payments_line_auto_id",
    header: "Actions",
    cell: ({ row }) => {
      if (row.original.approve_status == 1) {
        return <Button>Approved</Button>;
      } else {
        return <Button variant="secondary">Pending</Button>;
      }
    },
  },
  /*   {
    accessorKey: "slide_extension",
    header: "Slide Url",
    cell: ({ row }) => (
      <Link
        href={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.}`}
        target="_blank"
      >
        <p className="text-blue-600">Slide</p>
      </Link>
    ), // Use or create a component for exam updates
  }, */
];
