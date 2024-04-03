"use client";

import { Batch } from "@/server/types/batch.type"; // Make sure you have a Batch type defined
import { ColumnDef } from "@tanstack/react-table";
import { UpdateBatchDialog } from "../_components/update_batch_dialog"; // Assuming you have an update dialog for batches

export const columns: ColumnDef<Batch>[] = [
  {
    accessorKey: "batch_no",
    header: "Batch No",
  },
  {
    accessorKey: "batch_name",
    header: "Batch Name",
    cell: ({ row }) => (
      <div className="w-[350px]">{row.getValue("batch_name")}</div>
    ),
  },
  {
    accessorKey: "courses.course_code",
    header: "Code",
  },
  {
    accessorKey: "courses.course_name",
    header: "Course Name",
  },
  {
    accessorKey: "zoom_link",
    header: "Zoom",
    cell: ({ row }) => (
      <a href={row.original.zoom_link} className="text-blue-500">
        Link
      </a>
    ), // Use or create a component for batch updates
  },
  {
    accessorKey: "start_date",
    header: "Start Date",
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("start_date")}</div>
    ),
  },
  {
    accessorKey: "end_date",
    header: "End Date",
    cell: ({ row }) => (
      <div className="w-[100px]">{row.getValue("end_date")}</div>
    ),
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>{row.original.status == 1 ? "Active" : "Deactive"}</div>
    ),
  },
  {
    accessorKey: "password",
    header: "Password",
  },
  {
    accessorKey: "price",
    header: "Price",
  },
  {
    accessorKey: "auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => <UpdateBatchDialog data={row.original} />, // Use or create a component for batch updates
  },
];
