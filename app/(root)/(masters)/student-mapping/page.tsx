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
import { StudentMappingForm } from "./_component/student_mapping_form";
import { AddMappingDialog } from "./_component/add_mapping_dialog";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchStudentMappings } from "@/server/actions/student-mapping.actions";

const StudentMapping = async () => {
  const data = await fetchStudentMappings();
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Student Mapping</CardTitle>
          <CardDescription>
            Streamline the process of assigning students to courses and batches,
            facilitating effective management and tracking of student
            enrollments.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddMappingDialog />
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentMapping;
