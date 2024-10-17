"use client";
import { toastError } from "@/lib/toast/toast";
import {
  getBlockedStatus,
  validateFingerprint,
} from "@/server/actions/auth.action";
import { signOut } from "next-auth/react";
import React, { useEffect } from "react";

interface AutoLockingComponentProps {
  studentAutoId: string;
  batchAutoId: string;
}

const AutoLockingComponent = ({
  studentAutoId,
  batchAutoId,
}: AutoLockingComponentProps) => {
  useEffect(() => {
    const fetchBlockStatus = async () => {
      try {
        const result = await getBlockedStatus(batchAutoId, studentAutoId);
        if (result != null) {
          if (result.block_status == 0) {
            await signOut();
          }
        }
      } catch (error: any) {
        toastError(error.message);
      }
    };

    fetchBlockStatus();
  }, [studentAutoId, batchAutoId]);

  return <div></div>;
};

export default AutoLockingComponent;
