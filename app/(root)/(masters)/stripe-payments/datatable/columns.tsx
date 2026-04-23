"use client";

import { ColumnDef } from "@tanstack/react-table";
import { StripePayment } from "@/server/types/stripe-payment.type";
import { Badge } from "@/components/ui/badge";

export const columns: ColumnDef<StripePayment>[] = [
  {
    accessorKey: "created_at",
    header: "Date",
    cell: ({ row }) =>
      new Date(row.original.created_at).toLocaleString("en-AU", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
  },
  {
    accessorKey: "customer_name",
    header: "Name",
  },
  {
    accessorKey: "customer_email",
    header: "Email",
  },
  {
    accessorKey: "customer_phone",
    header: "Phone",
    cell: ({ row }) => row.original.customer_phone ?? "—",
  },
  {
    accessorKey: "customer_country",
    header: "Country",
    cell: ({ row }) => row.original.customer_country ?? "—",
  },
  {
    accessorKey: "course_name",
    header: "Course",
  },
  {
    accessorKey: "payment_type",
    header: "Type",
    cell: ({ row }) => (
      <Badge variant={row.original.payment_type === "one_time" ? "default" : "secondary"}>
        {row.original.payment_type === "one_time" ? "Full Payment" : "Installment"}
      </Badge>
    ),
  },
  {
    accessorKey: "amount_paid",
    header: "Amount",
    cell: ({ row }) => `$${Number(row.original.amount_paid).toLocaleString()}`,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <Badge variant="default" className="bg-green-600 hover:bg-green-600">
        {row.original.status}
      </Badge>
    ),
  },
];
