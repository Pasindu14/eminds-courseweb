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
import { columns } from "./datatable/columns";
import { AddCourseDialog } from "./_components/add_course_dialog";
import { fetchCourses } from "@/server/actions/course.actions";

const Courses = async () => {
  const data = await fetchCourses();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Courses</CardTitle>
          <CardDescription>
            Efficiently manage and organize course details, ensuring easy access
            and updates.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddCourseDialog />
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Courses;
