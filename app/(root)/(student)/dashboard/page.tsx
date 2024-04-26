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
import AnimatedComponent from "@/components/common/animated-component";
import GoodToKnowComponent from "./_component/good-to-know";
import WelcomeAlertDialog from "@/components/common/welcome-message";

const Dashboard = async () => {
  const session: any = await getServerSession(authOption);
  const studentPhone = session?.phoneNumber;
  const password = session?.password;
  const studentDetails = await fetchStudentByPhoneNumber(studentPhone);
  const batchDetails = await fetchBatchByPassword(password);

  const sessions = await fetchSessionsByBatchId(batchDetails.auto_id);
  const examResults = await fetchAllExamResults(studentPhone);

  ///////// due to invalid data insertion in the database, we have to use the following code to get the valid data
  const startDate = new Date(batchDetails.start_date);
  const currentDate = new Date("2024-04-01");

  return (
    <div>
      {/*       <WelcomeAlertDialog /> */}
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">
            Welcome, {studentDetails.name}
            <FingerprintComponent
              phoneNumber={studentPhone}
              userId={studentDetails.auto_id}
              batchId={batchDetails.auto_id}
            />
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

          {/* showing the guides based on the start date of the batch */}
          {startDate < currentDate && (
            <AnimatedComponent>
              <div className="md:flex gap-4">
                <AccountRestrictionComponent />
                <StudentGuideComponent courseId={"4"} />
                <StudentGuideComponent courseId={"5"} />
                <GoodToKnowComponent />
              </div>
            </AnimatedComponent>
          )}

          {startDate >= currentDate && (
            <AnimatedComponent>
              <div className="flex gap-4">
                <AccountRestrictionComponent />
                <StudentGuideComponent courseId={batchDetails.course_auto_id} />
              </div>
            </AnimatedComponent>
          )}

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
