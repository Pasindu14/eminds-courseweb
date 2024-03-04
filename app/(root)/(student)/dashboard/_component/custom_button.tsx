"use client";
import { Button } from "@/components/ui/button";
import {
  upsertUserDropboxCount,
  upsertUserLoginCount,
  upsertUserSlidesClicksCount,
} from "@/server/actions/student-usage.actions";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React from "react";

const CustomButton = ({ row, type }: { row: any; type: string }) => {
  const { data: session }: any = useSession();
  const router = useRouter();

  const onClick = async () => {
    if (type == "slide") {
      await upsertUserSlidesClicksCount(
        session.phoneNumber,
        row.original.session_auto_id
      );
    } else if (type == "dropbox") {
      await upsertUserDropboxCount(
        session.phoneNumber,
        row.original.session_auto_id
      );
    }
  };

  return (
    <div>
      <Button onClick={onClick}>
        <Link
          href={
            type == "slide"
              ? row.original.slide_extension == null
                ? `https://eminds.com.au/coursewebfiles/downloadfiles.php?id=${row.original.new_url}`
                : `https://courseweb.eminds.lk/upload/${row.original.session_auto_id}.${row.original.slide_extension}`
              : `${row.original.zoom_link}`
          }
          target="_blank"
        >
          <p> {type == "slide" ? "Slide Url" : "Dropbox"} </p>
        </Link>
      </Button>
    </div>
  );
};

export default CustomButton;
