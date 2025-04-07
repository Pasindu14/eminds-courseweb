"use client";

import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { successMessage } from "@/constants/messages";
import { Loader } from "@/lib/spinners";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { removeSessionProgress } from "@/server/actions/sessions-progress.actions";
import { useState } from "react";

interface RemoveSessionProgressAlertDialogProps {
  sessionProgressAutoId: number | null;
  refetch: () => Promise<void>;
}

export function RemoveSessionProgressAlertDialog({
  sessionProgressAutoId,
  refetch,
}: RemoveSessionProgressAlertDialogProps) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const deleteFunction = async () => {
    setLoading(true);
    if (sessionProgressAutoId) {
      const result = await removeSessionProgress(sessionProgressAutoId);
      if (!result?.success) {
        toastError(result?.message);
      } else {
        toastSuccess(successMessage);
        setOpen(false);
        await refetch(); // ✅ re-fetch data
      }
    } else {
      toastError("Session Progress ID is missing.");
    }
    setLoading(false);
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete this
            session progress entry.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="submit"
            disabled={loading}
            onClick={deleteFunction}
            variant="destructive"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <p>Remove</p>
                <Loader size={13} />
              </div>
            ) : (
              "Delete"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
