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

const ExamResults = async () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Exam Results</CardTitle>
          <CardDescription>
            Exam Results View final exam scores and letter grades for all
            students.
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

export default ExamResults;
