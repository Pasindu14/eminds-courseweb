"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UpdateJobDialog } from "../_components/update_job_dialog";
import { Job } from "@/server/types/job.type"; // Ensure you have a Job type defined

export const columns: ColumnDef<Job>[] = [
  {
    accessorKey: "title",
    header: "Job Title",
  },
  {
    accessorKey: "expire_date",
    header: "Expiration Date",
  },
  {
    accessorKey: "link",
    header: "Job Link",
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div>{row.original.status == 1 ? "Active" : "Deactive"}</div>
    ),
  },
  {
    accessorKey: "job_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <UpdateJobDialog data={row.original} />;
    },
  },
];
