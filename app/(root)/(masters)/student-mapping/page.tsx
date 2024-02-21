"use client";
import React, { useEffect, useState } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { AddMappingDialog } from "./_component/add_mapping_dialog";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchStudentMappings } from "@/server/actions/student-mapping.actions";
import { StudentMapping } from "@/server/types/student-mapping.type";
import StudentMappingFilterForm from "./_component/student_mapping_filter_form";

const StudentMapping = () => {
  const [StudentMappings, setStudentMappings] = useState<StudentMapping[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchStudentMappings();
      setStudentMappings(data);
    };
    fetchData();
  }, []);

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
          <Separator />
          <StudentMappingFilterForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentMapping;
