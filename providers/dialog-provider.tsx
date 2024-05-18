"use client";

import { EmbeddedVideo } from "@/app/(root)/(student)/dashboard/_component/embedded_video";
import { useMountedState } from "react-use";

export const SheetProvider = () => {
  const isMounted = useMountedState();

  if (!isMounted) return;
  return (
    <>
      <EmbeddedVideo />
    </>
  );
};
