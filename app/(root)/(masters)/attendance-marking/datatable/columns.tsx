"use client";

import { ColumnDef } from "@tanstack/react-table";
import MappingSwitch from "../_component/mapping_switch";

export const columns: ColumnDef<any>[] = [
  {
    accessorKey: "studentName",
    header: "Name",
  },
  {
    accessorKey: "phoneNumber",
    header: "Phone",
  },
  {
    accessorKey: "attendanceStatus",
    header: () => <div>Attendance</div>,
    cell: ({ row }) => (
      <MappingSwitch
        attendance_status={row.original.attendanceStatus}
        batch_time_schedule_auto_id={row.original.batchTimeScheduleId}
        student_auto_id={row.original.studentId}
      />
    ),
  },
];
