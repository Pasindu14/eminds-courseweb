"use client";

import { Button } from "@/components/ui/button";
import { Exam } from "@/server/types/exam.type"; // Make sure you have an Exam type defined
import { ColumnDef } from "@tanstack/react-table";
import { removeExam } from "@/server/actions/exams.actions";
import { Session } from "@/server/types/sessions.type";
import Link from "next/link";
import { ApproveAlertDialog } from "../_component/approve_payment_alert";
import { convertToLocaleDateTime } from "@/lib/utils";

export const columns: ColumnDef<PaymentLines>[] = [
  {
    accessorKey: "payments.student_phone",
    header: "Phone",
  },
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) => {
      return convertToLocaleDateTime(row.original.created_at);
    },
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
    },
  },
  {
    accessorKey: "payments_line_auto_id",
    header: "Actions",
    cell: ({ row }) => {
      return (
        <ApproveAlertDialog
          payment_line_auto_id={row.original.payments_line_auto_id}
          status={row.original.approve_status}
        />
      );
    },
  },
];
