import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { DataTable } from "@/components/datatable";
// Ensure you have columns defined for session progress
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth-options";
import { fetchBatchByPassword } from "@/server/actions/batch.actions";
import { fetchSessionProgress } from "@/server/actions/sessions-progress.actions";
import { columns } from "./datatable/columns";
// Import the correct action

const SessionProgressDashboard = async () => {
  const session: any = await getServerSession(authOption);
  const password = session?.password;
  const batchDetails = await fetchBatchByPassword(password);
  const sessionProgressData = await fetchSessionProgress(batchDetails.auto_id); // Fetch session progress data

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Session Progress</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <DataTable columns={columns} data={sessionProgressData} />{" "}
          {/* Use the fetched data */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default SessionProgressDashboard;
