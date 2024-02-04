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
import { fetchEvents } from "@/server/actions/events.actions";
import Image from "next/image";
import { columns } from "./datatable/columns";
import { fetchFinalSubmissionMarks } from "@/server/actions/exams.actions";
import { FilteringForm } from "./_component/filtering-form";

const ExamResults = async () => {
  /*   const data = await fetchFinalSubmissionMarks(10); */
  /*  console.log(data); */
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
