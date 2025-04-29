"use client";

import { Student } from "@/server/types/student.type";
import { ColumnDef } from "@tanstack/react-table";
import { UpdateStudentDialog } from "../_components/update_student_dialog";
import { ConfirmResetPasswordAlertDialog } from "../_components/reset_password_alert";
export const columns: ColumnDef<any>[] = [
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
    cell: ({ row }) => (
      <div className="flex gap-2">
        <ConfirmResetPasswordAlertDialog
          phoneNumber={row.original.phonenumber}
          studentAutoIId={row.original.auto_id}
        />
        <UpdateStudentDialog data={row.original} />
      </div>
    ),
  },
];
