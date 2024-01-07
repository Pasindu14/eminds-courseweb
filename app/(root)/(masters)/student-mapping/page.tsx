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

const StudentMapping = () => {
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
          <div className="md:max-w-xl">
            <StudentMappingForm />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentMapping;
