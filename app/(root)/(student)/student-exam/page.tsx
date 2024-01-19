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
import { StudentExamSelectionForm } from "./_component/student_exam_filter_form";

const StudentExam = () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Exams</CardTitle>
          <CardDescription>
            Approach the final stretch of your exam with confidence. Trust in
            your preparation, stay calm, and give it your best. You&apos;ve got
            this!
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <StudentExamSelectionForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentExam;
