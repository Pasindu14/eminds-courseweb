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
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
        <Button variant="outline" className="md:ml-2">
          Reset Fingerprint
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent className="md:max-w-4xl overflow-x-scroll">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div>
              This action cannot be undone. This will permanently delete your
              data and remove your data from our servers.
              <h1 className="mt-4 text-yellow-500 ">
                Currently logged in devices
              </h1>
              <Separator className="bg-yellow-500 h-0.5 w-full" />
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead>Fingerprint</TableHead>
                    <TableHead>ID</TableHead>
                    <TableHead>Browser</TableHead>
                    <TableHead>Time</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  <TableRow>
                    <TableCell className="font-medium">
                      Fingerprint 01
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_01}
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_01_browser_agent}
                    </TableCell>
                    <TableCell>
                      {fingerprint &&
                        fingerprint.fingerprint_01_time &&
                        convertToLocaleDateTime(
                          fingerprint.fingerprint_01_time
                        )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Fingerprint 02
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_02}
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_02_browser_agent}
                    </TableCell>
                    <TableCell>
                      {fingerprint &&
                        fingerprint.fingerprint_02_time &&
                        convertToLocaleDateTime(
                          fingerprint.fingerprint_02_time
                        )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Fingerprint 03
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_03}
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_03_browser_agent}
                    </TableCell>
                    <TableCell>
                      {fingerprint &&
                        fingerprint.fingerprint_03_time &&
                        convertToLocaleDateTime(
                          fingerprint.fingerprint_03_time
                        )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Fingerprint 04
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_04}
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_04_browser_agent}
                    </TableCell>
                    <TableCell>
                      {fingerprint &&
                        fingerprint.fingerprint_04_time &&
                        convertToLocaleDateTime(
                          fingerprint.fingerprint_04_time
                        )}
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell className="font-medium">
                      Fingerprint 05
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_05}
                    </TableCell>
                    <TableCell>
                      {fingerprint && fingerprint.fingerprint_05_browser_agent}
                    </TableCell>
                    <TableCell>
                      {fingerprint &&
                        fingerprint.fingerprint_05_time &&
                        convertToLocaleDateTime(
                          fingerprint.fingerprint_05_time
                        )}
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </div>
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
              "Reset fingerprint"
            )}
          </Button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
