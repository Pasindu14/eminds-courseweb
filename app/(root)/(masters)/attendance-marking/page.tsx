"use client";
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
import AttendanceMarkingFilterForm from "./_component/attendance_marking_filter_form";

const AttendanceMarking = () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Attendance Marking</CardTitle>
          <CardDescription>
            Streamline the attendance process by marking and tracking student
            presence effortlessly, ensuring accurate records and improved
            management of each class.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4"></div>
          <Separator />
          <AttendanceMarkingFilterForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default AttendanceMarking;
