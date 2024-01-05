"use client";

import { ColumnDef } from "@tanstack/react-table";
import { UpdateCourseDialog } from "../_components/update_course_dialog";
import { Course } from "@/server/types/course.type";
export const columns: ColumnDef<Course>[] = [
  {
    accessorKey: "course_code",
    header: "Course Code",
  },
  {
    accessorKey: "course_name",
    header: "Course Name",
  },
  {
    accessorKey: "auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <UpdateCourseDialog data={row.original} />;
    },
  },
];
