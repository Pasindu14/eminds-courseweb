import { Button } from "@/components/ui/button";
import { useOpenEmbeddedVideo } from "@/zustand/dialog-store";
import React from "react";
import {
  upsertUserDropboxCount,
  upsertUserLoginCount,
  upsertUserSlidesClicksCount,
} from "@/server/actions/student-usage.actions";
import { useSession } from "next-auth/react";

const ActionButton = ({ link, row }: { link: string; row: any }) => {
  const { data: session }: any = useSession();
  const { onOpen } = useOpenEmbeddedVideo();

  const handleClick = async () => {
    await upsertUserDropboxCount(
      session.phoneNumber,
      row.original.session_auto_id
    );
    onOpen(link);
  };

  return (
    <div>
      <Button onClick={handleClick}>Open Video</Button>
    </div>
  );
};

export default ActionButton;
