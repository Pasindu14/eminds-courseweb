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
import { DataTable } from "../../../../components/datatable";
import { fetchSessions } from "@/server/actions/sessions.actions";
import { AddSessionDialog } from "./_component/add_session_dialog";
import { columns } from "./datatable/columns";

const Sessions = async () => {
  const data = await fetchSessions();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Sessions</CardTitle>
          <CardDescription>
            Efficiently manage and organize session details on this platform,
            ensuring easy access and updates to vital information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddSessionDialog />
          </div>
          <DataTable columns={columns} data={data} />
          {/* Ensure sessionColumns are relevant for sessions */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Sessions;
