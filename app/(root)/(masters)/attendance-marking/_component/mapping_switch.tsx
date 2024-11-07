import { Switch } from "@/components/ui/switch";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { updateAttendanceStatus } from "@/server/actions/attendance.actions";
import { updateMapping } from "@/server/actions/student-mapping.actions";
import React, { useState } from "react";

const MappginSwitch = ({
  attendance_status,
  batch_time_schedule_auto_id,
  student_auto_id,
}: {
  attendance_status: number;
  batch_time_schedule_auto_id: number;
  student_auto_id: number;
}) => {
  const [checked, setChecked] = useState(attendance_status == 0 ? false : true);

  const onCheckedChange = async (value: boolean) => {
    setChecked(value);
    const result = await updateAttendanceStatus(
      student_auto_id,
      batch_time_schedule_auto_id,
      value == true ? 1 : 0
    );
    if (!result.success) {
      toastError(result.message);
    } else {
      toastSuccess(result.message);
    }
  };
  return (
    <div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default MappginSwitch;
