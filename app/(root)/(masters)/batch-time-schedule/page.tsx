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
import { AddBatchTimeScheduleDialog } from "./_component/add_batch_time_schedule_dialog";
import BatchTimeScheduleFilterForm from "./_component/batch_time_schedule_filter_form";

const BatchTimeSchedule = () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Batch Time Schedule</CardTitle>
          <CardDescription>
            Simplify the scheduling process by organizing and managing class
            times for each batch, ensuring efficient coordination and easy
            tracking of student schedules.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddBatchTimeScheduleDialog />
          </div>
          <Separator />
          <BatchTimeScheduleFilterForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default BatchTimeSchedule;
