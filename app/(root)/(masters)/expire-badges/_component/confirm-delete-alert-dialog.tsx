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
import {
  deleteBadgeById,
  deleteBadgesByIds,
} from "@/server/actions/badge.actions";

import { useState } from "react";

export function ConfirmDeleteAlertDialog({
  badge_auto_id,
  badges,
  fileUrl,
}: {
  badge_auto_id?: number | null;
  badges?: any[];
  fileUrl: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const deleteFunction = async () => {
    setLoading(true);
    let result;
    if (badges != null || badges != undefined) {
      const autoIdsAsStringArray = badges.map((item) =>
        item.auto_id.toString()
      );
      result = await deleteBadgesByIds(autoIdsAsStringArray);
    } else {
      result = await deleteBadgeById(badge_auto_id!.toString(), fileUrl);
    }

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
        <Button variant="destructive">
          {badges != null ? "Delete all expired badges" : "Delete"}
        </Button>
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
