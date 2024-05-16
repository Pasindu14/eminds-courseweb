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
import { Separator } from "@/components/ui/separator";
import { Loader } from "@/lib/spinners";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { convertToLocaleDateTime } from "@/lib/utils";
import { resetFingerprint, unblockUser } from "@/server/actions/auth.action";
import { fetchFingerprintData } from "@/server/actions/students-auth.actions";

import { useEffect, useState } from "react";

export function ResetFingerprintAlertDIalog({
  auto_id,
  batch_auto_id,
  student_auto_id,
}: {
  auto_id: number | null;
  batch_auto_id: string;
  student_auto_id: string;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fingerprint, setFingerprint] = useState<any>(null);
  const resetFunction = async () => {
    try {
      setLoading(true);
      await resetFingerprint(auto_id!.toString());
      await unblockUser(student_auto_id, batch_auto_id);
      toastSuccess("Fingerprint reset successfully");
    } catch (error: any) {
      toastError(error.message);
    } finally {
      setOpen(false);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      const fetch = async () => {
        const result = await fetchFingerprintData(student_auto_id!.toString());
        setFingerprint(result);
        return result;
      };
      fetch();
    }
  }, [open, student_auto_id]);
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button variant="outline" className="ml-2">
          Reset Fingerprint
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your data
            and remove your data from our servers.
            <h1 className="mt-4 text-yellow-500 ">
              Currently logged in devices
            </h1>
            <Separator className="bg-yellow-500 h-0.5 w-full" />
            <h1>
              Fingerprint 01 : {fingerprint && fingerprint.fingerprint_01} -{" "}
              {fingerprint && fingerprint.fingerprint_01_browser_agent} -{" "}
              {fingerprint &&
                fingerprint.fingerprint_01_time &&
                convertToLocaleDateTime(fingerprint.fingerprint_01_time)}
            </h1>
            <h1>
              Fingerprint 02 : {fingerprint && fingerprint.fingerprint_02} -{" "}
              {fingerprint && fingerprint.fingerprint_02_browser_agent} -{" "}
              {fingerprint &&
                fingerprint.fingerprint_02_time &&
                convertToLocaleDateTime(fingerprint.fingerprint_02_time)}
            </h1>
            <h1>
              Fingerprint 03 : {fingerprint && fingerprint.fingerprint_03} -
              {"  "}
              {fingerprint && fingerprint.fingerprint_03_browser_agent} -{" "}
              {fingerprint &&
                fingerprint.fingerprint_03_time &&
                convertToLocaleDateTime(fingerprint.fingerprint_03_time)}
            </h1>
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
