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
import { FilteringForm } from "./_component/filtering-form";

const FinalExamSubmission = async () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Final Submission Marks</CardTitle>
          <CardDescription>
            View the final marks and grades for student submissions. Students
            can see their individual marks here after grading is complete.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <FilteringForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default FinalExamSubmission;
