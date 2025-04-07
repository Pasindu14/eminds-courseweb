"use client";

import { Switch } from "@/components/ui/switch";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { updateSessionProgressCompletion } from "@/server/actions/sessions-progress.actions";
import React, { useState } from "react";

const SessionProgressSwitch = ({
  session_progress_auto_id,
  is_completed,
  refetch, // optional
}: {
  session_progress_auto_id: number;
  is_completed: number | null;
  refetch?: () => Promise<void>;
}) => {
  const [checked, setChecked] = useState(is_completed === 1);
  const [loading, setLoading] = useState(false);

  const onCheckedChange = async (value: boolean) => {
    setLoading(true);
    const completionStatus = value ? 1 : 0;
    const result = await updateSessionProgressCompletion(
      session_progress_auto_id,
      completionStatus
    );

    if (!result?.success) {
      toastError(result.message);
    } else {
      setChecked(value); // update only after success
      toastSuccess(result.message || "Progress updated successfully");
      refetch && (await refetch()); // re-fetch table data if needed
    }
    setLoading(false);
  };

  return (
    <div>
      <Switch
        checked={checked}
        onCheckedChange={onCheckedChange}
        disabled={loading}
      />
    </div>
  );
};

export default SessionProgressSwitch;
