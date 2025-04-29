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
import { resetPassword } from "@/server/actions/students-auth.actions";

import { useState } from "react";

export function ConfirmResetPasswordAlertDialog({
  phoneNumber,
  studentAutoIId,
}: {
  phoneNumber: string | null;
  studentAutoIId: number | null;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);

  const resetFunction = async () => {
    try {
      setLoading(true);
      await resetPassword(phoneNumber!.toString(), studentAutoIId!);
      toastSuccess("Password reset successfully");
      setOpen(false);
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="destructive" size={"sm"}>
          Reset Password
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will reset the password to default value as abc@123.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            type="submit"
            disabled={loading}
            onClick={resetFunction}
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
