import { Button } from "@/components/ui/button";
import { useOpenEmbeddedVideo } from "@/zustand/dialog-store";
import React from "react";

const ActionButton = ({ link }: { link: string }) => {
  const { onOpen } = useOpenEmbeddedVideo();
  return (
    <div>
      <Button onClick={() => onOpen(link)}>Open Video</Button>
    </div>
  );
};

export default ActionButton;
