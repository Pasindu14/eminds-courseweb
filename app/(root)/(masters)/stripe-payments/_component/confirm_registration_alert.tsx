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
import { confirmStripeRegistration } from "@/server/actions/stripe-payment.actions";
import { useState } from "react";

export function ConfirmRegistrationAlertDialog({
  id,
  registration_status,
}: {
  id: string;
  registration_status: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [confirmed, setConfirmed] = useState(registration_status === "confirmed");

  const confirmFunction = async () => {
    setLoading(true);
    const result = await confirmStripeRegistration(id);
    if (!result.success) {
      toastError(result.message);
    } else {
      setOpen(false);
      toastSuccess(result.message);
      setConfirmed(true);
    }
    setLoading(false);
  };

  return confirmed ? (
    <Button className="bg-green-500 hover:bg-green-500 cursor-default" disabled>
      Confirmed
    </Button>
  ) : (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button className="bg-yellow-500 hover:bg-yellow-700">Confirm</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Confirm Registration?</AlertDialogTitle>
          <AlertDialogDescription>
            This will mark the registration as confirmed. This action cannot be undone.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <Button
            type="submit"
            disabled={loading}
            onClick={confirmFunction}
            variant="default"
          >
            {loading ? (
              <div className="flex items-center justify-center gap-2">
                <p>Confirming</p>
                <Loader size={13} />
              </div>
            ) : (
              "Confirm"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
