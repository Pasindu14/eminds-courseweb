import { Switch } from "@/components/ui/switch";
import { toastError } from "@/lib/toast/toast";
import { updateMapping } from "@/server/actions/student-mapping.actions";
import React, { useState } from "react";

const MappginSwitch = ({
  auto_id,
  block_status,
}: {
  auto_id: number;
  block_status: number;
}) => {
  const [checked, setChecked] = useState(block_status == 1 ? false : true);

  const onCheckedChange = async (value: boolean) => {
    setChecked(value);
    const result = await updateMapping(auto_id, checked);
    if (!result.success) {
      toastError(result.message);
    }
  };
  return (
    <div>
      <Switch checked={checked} onCheckedChange={onCheckedChange} />
    </div>
  );
};

export default MappginSwitch;
