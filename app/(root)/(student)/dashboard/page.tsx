import React from "react";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import AnimationComponent from "./_component/animation_component";
import { fetchStudentByPhoneNumber } from "@/server/actions/student.actions";
import StudentDetails from "./_component/student_details";
import { fetchBatchByPassword } from "@/server/actions/batch.actions";
import { fetchSessionsByBatchId } from "@/server/actions/sessions.actions";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchAllExamResults } from "@/server/actions/exam-marks.actions";
import { resultsColumns } from "./datatable/resultsColumns";

const Dashboard = async () => {
  const studentPhone = "0711803295";
  const password = "1122334";

  const studentDetails = await fetchStudentByPhoneNumber(studentPhone);
  const batchDetails = await fetchBatchByPassword(password);
  const sessions = await fetchSessionsByBatchId(batchDetails.auto_id);
  const examResults = await fetchAllExamResults(studentPhone);

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">
            Welcome, {studentDetails.name}
          </CardTitle>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex flex-row justify-between">
            <StudentDetails
              studentData={studentDetails}
              batchData={batchDetails}
            />
            <AnimationComponent />
          </div>
          <h1 className="text-2xl mt-2 mb-2 font-semibold">Sessions</h1>
          <Separator className="mt-3" />
          <div>
            <DataTable columns={columns} data={sessions} />
          </div>

          <h1 className="text-2xl mt-2 mb-2 font-semibold">Exam Results</h1>
          <Separator className="mt-3" />
          <div>
            <DataTable columns={resultsColumns} data={examResults} />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Dashboard;
