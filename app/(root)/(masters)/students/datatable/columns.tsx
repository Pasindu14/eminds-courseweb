"use client";

import { Student } from "@/server/types/student.type";
import { ColumnDef } from "@tanstack/react-table";
import { UpdateStudentDialog } from "../_components/update_student_dialog";
export const columns: ColumnDef<Student>[] = [
  {
    accessorKey: "name",
    header: "Name",
  },
  {
    accessorKey: "phonenumber",
    header: "Phone",
  },
  {
    accessorKey: "address",
    header: "Address",
  },
  {
    accessorKey: "nic",
    header: "NIC",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "birthday",
    header: "Birthday",
  },
  {
    accessorKey: "auto_id",
    header: () => <div>Actions</div>,
    cell: ({ row }) => {
      return <UpdateStudentDialog data={row.original} />;
    },
  },
];
