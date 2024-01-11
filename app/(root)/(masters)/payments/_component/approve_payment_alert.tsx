"use client";
import {
  AlertDialog,
  AlertDialogAction,
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
import { removeExam } from "@/server/actions/exams.actions";
import { updatePaymentLine } from "@/server/actions/payments.actions";

import { useState } from "react";

export function ApproveAlertDialog({
  payment_line_auto_id,
  status,
}: {
  payment_line_auto_id: number | null;
  status: number;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [internalState, setInternalState] = useState(
    status == 1 ? true : false
  );

  const approveFunction = async () => {
    setLoading(true);
    const result = await updatePaymentLine(payment_line_auto_id!.toString());
    if (!result.success) {
      toastError(result.message);
    } else {
      setOpen(false);
      toastSuccess(result.message);
      setInternalState(true);
    }
    setLoading(false);
  };
  return internalState != true ? (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-700">Approve</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently approve your
            data.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>

          <Button
            type="submit"
            disabled={loading}
            onClick={approveFunction}
            variant="default"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <p>Approve</p>
                <Loader size={13} />
              </div>
            ) : (
              "Approve"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  ) : (
    <>
      <Button className="bg-green-500">Already Approved</Button>
    </>
  );
}
