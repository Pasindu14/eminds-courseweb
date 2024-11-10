"use client";
import { Switch } from "@/components/ui/switch";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { updateAttendanceStatus } from "@/server/actions/attendance.actions";
import React, { useState, useEffect } from "react";

const MappingSwitch = ({
  attendance_status,
  batch_time_schedule_auto_id,
  student_auto_id,
}: {
  attendance_status: number;
  batch_time_schedule_auto_id: number;
  student_auto_id: number;
}) => {
  // Initialize state with proper conversion of attendance_status
  const [checked, setChecked] = useState(attendance_status === 1);

  // Use useEffect to handle prop changes
  useEffect(() => {
    setChecked(attendance_status === 1);
  }, [attendance_status]);

  const onCheckedChange = async (value: boolean) => {
    try {
      setChecked(value);
      const result = await updateAttendanceStatus(
        student_auto_id,
        batch_time_schedule_auto_id,
        value ? 1 : 0
      );

      if (!result.success) {
        // Revert the switch state if the API call fails
        setChecked(!value);
        toastError(result.message);
      } else {
        toastSuccess(result.message);
      }
    } catch (error) {
      // Revert the switch state on error
      setChecked(!value);
      toastError("An error occurred while updating attendance");
      console.error("Attendance update error:", error);
    }
  };

  return (
    <div className="flex items-center">
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        aria-label="Attendance status"
      />
    </div>
  );
};

export default MappingSwitch;
