"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ApproveAlertDialog } from "../_component/approve_payment_alert";
import { convertToLocaleDateTime } from "@/lib/utils";
import { Badge } from "@/components/ui/badge";

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
      if (row.original.image_ext) {
        return (
          <Link
            href={`https://courseweb.eminds.lk/paymentUploads/${row.original.image_url}.${row.original.image_ext}`}
            target="_blank"
          >
            <Badge>Receipt</Badge>
          </Link>
        );
      } else if (row.original.image_url) {
        return (
          <Link
            href={`https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.image_url}`}
            target="_blank"
          >
            <Badge>Receipt</Badge>
          </Link>
        );
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
