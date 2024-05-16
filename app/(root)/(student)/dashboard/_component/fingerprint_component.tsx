"use client";
import { toastError } from "@/lib/toast/toast";
import { unblockUser, validateFingerprint } from "@/server/actions/auth.action";
import { getCurrentBrowserFingerPrint } from "@rajesh896/broprint.js";
import { signOut } from "next-auth/react";
import React, { useEffect, useState } from "react";
import BrowserDetector from "browser-dtector";

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
    const browser = new BrowserDetector(window.navigator.userAgent);
    browser.parseUserAgent();

    const manageFingerprint = async () => {
      try {
        const fingerPrint = await getCurrentBrowserFingerPrint();
        await validateFingerprint(
          userId,
          phoneNumber,
          fingerPrint,
          batchId,
          browser?.userAgent ?? ""
        );
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
