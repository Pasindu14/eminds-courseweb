import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { fetchStudentByPhoneNumber } from "@/server/actions/student.actions";
import { fetchBatchByPassword } from "@/server/actions/batch.actions";
import { fetchSessionsByBatchId } from "@/server/actions/sessions.actions";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchAllExamResults } from "@/server/actions/exam-marks.actions";
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth-options";
import { fetchSpecialSessions } from "@/server/actions/special-session.actions";

const Dashboard = async () => {
  const session: any = await getServerSession(authOption);
  const password = session?.password;
  const batchDetails = await fetchBatchByPassword(password);
  const specialSessions = await fetchSpecialSessions(batchDetails.auto_id);

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Extra Sessions</CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <DataTable columns={columns} data={specialSessions} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
