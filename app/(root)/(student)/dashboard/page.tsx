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
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth-options";
import FingerprintComponent from "./_component/fingerprint_component";
import AccountRestrictionComponent from "./_component/account_restriction_component";
import StudentGuideComponent from "./_component/student_guide";

const Dashboard = async () => {
  const session: any = await getServerSession(authOption);
  const studentPhone = session?.phoneNumber;
  const password = session?.password;
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
            {/*             <FingerprintComponent
              phoneNumber={studentPhone}
              userId={studentDetails.auto_id}
              batchId={batchDetails.auto_id}
            /> */}
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

          <div className="flex gap-4">
            <AccountRestrictionComponent />
            <StudentGuideComponent courseId={session.courseId} />
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
