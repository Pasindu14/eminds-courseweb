"use client";

import { ColumnDef } from "@tanstack/react-table";
import Link from "next/link";
import { ConfirmDeleteAlertDialog } from "../_component/remove_badge_alert";
import { Badge } from "@/server/types/badge.type";

export const columns: ColumnDef<Badge>[] = [
  {
    accessorKey: "students.name",
    header: "Student",
  },
  {
    accessorKey: "students.phonenumber",
    header: "Phone",
  },
  {
    accessorKey: "courses.course_name",
    header: "Course",
  },
  /*   {
    header: "Profile Link",
    cell: ({ row }) => (
      <Link
        href={`/profile/${row.original.course_auto_id}_${row.original.student_auto_id}`}
        target="_blank"
      >
        <p className="text-blue-600">Link</p>
      </Link>
    ), // Use or create a component for exam updates
  }, */
  {
    header: "Badge Link",
    cell: ({ row }) => (
      <Link href={`${row.original.link}`} target="_blank">
        <p className="text-blue-600">Link</p>
      </Link>
    ), // Use or create a component for exam updates
  },
  {
    accessorKey: "exam_auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => (
      <ConfirmDeleteAlertDialog
        badge_auto_id={row.original.auto_id}
        fileUrl={row.original.link}
      />
    ), // Use or create a component for exam updates
  },
];
