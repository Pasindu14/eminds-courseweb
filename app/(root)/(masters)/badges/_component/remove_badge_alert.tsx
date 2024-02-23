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
import { Loader } from "@/lib/spinners";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { deleteBadgeById } from "@/server/actions/badge.actions";

import { useState } from "react";

export function ConfirmDeleteAlertDialog({
  badge_auto_id,
  fileUrl,
}: {
  badge_auto_id: number | null;
  fileUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteFunction = async () => {
    setLoading(true);
    const result = await deleteBadgeById(badge_auto_id!.toString(), fileUrl);
    if (!result.success) {
      toastError(result.message);
    } else {
      toastSuccess(result.message);
      setOpen(false);
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
            This action cannot be undone. This will permanently delete your data
            and remove your data from our servers.
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
              "Save changes"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
