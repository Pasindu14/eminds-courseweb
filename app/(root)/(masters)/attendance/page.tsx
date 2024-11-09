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
import AttendanceFilterForm from "./_component/attendance_filter_form";

const Attendance = () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">View Attendance</CardTitle>
          <CardDescription>
            Efficiently track and manage student attendance with real-time
            records for streamlined class management.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4"></div>
          <Separator />
          <AttendanceFilterForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Attendance;
