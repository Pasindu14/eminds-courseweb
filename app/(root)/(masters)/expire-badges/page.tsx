import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

import { getStudentBadgesOlderThan3Years } from "@/server/actions/badge.actions";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { ConfirmDeleteAlertDialog } from "./_component/confirm-delete-alert-dialog";

const ExpireBadges = async () => {
  const data = await getStudentBadgesOlderThan3Years();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Expire Badges</CardTitle>
          <CardDescription>
            The Expire Badges page provides an intuitive interface to manage
            badge expiration details for badges.
          </CardDescription>
        </CardHeader>
        <Separator />

        <CardContent className="pt-4">
          <ConfirmDeleteAlertDialog badges={data} fileUrl="" />
          <div className="flex mb-4"></div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default ExpireBadges;
