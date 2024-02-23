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
import { columns } from "./datatable/columns"; // Ensure this is updated for exams
import { fetchExams } from "@/server/actions/exams.actions";
import { AddExamDialog } from "./_components/add_exam_dialog";

const Exams = async () => {
  const data = await fetchExams();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Exams</CardTitle>
          <CardDescription>
            Efficiently manage and organize exam details on this platform,
            ensuring easy access and updates to vital information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddExamDialog /> {/* Updated/Added component */}
          </div>
          <DataTable columns={columns} data={data} />
          {/* Ensure columns are relevant for exams */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Exams;
