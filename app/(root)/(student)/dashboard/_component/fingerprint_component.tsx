"use client";
import { toastError } from "@/lib/toast/toast";
import { validateFingerprint } from "@/server/actions/auth.action";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

interface FingerprintComponentProps {
  userId: string;
  phoneNumber: string;
  batchId: string;
}

const FingerprintComponent = ({
  userId,
  phoneNumber,
  batchId,
}: FingerprintComponentProps) => {
  useEffect(() => {
    const manageFingerprint = async () => {
      try {
        const fingerPrint = await getCurrentBrowserFingerPrint();
        await validateFingerprint(userId, phoneNumber, fingerPrint, batchId);
      } catch (error: any) {
        if (
          error.message ==
          "More than two devices are not allowed, Please contact the administrator"
        ) {
          setTimeout(async () => {
            await signOut();
          }, 1000);
        }
        toastError(error.message);
      }
    };

    manageFingerprint();
  }, [phoneNumber, userId, batchId]);
  return <div></div>;
};

export default FingerprintComponent;
