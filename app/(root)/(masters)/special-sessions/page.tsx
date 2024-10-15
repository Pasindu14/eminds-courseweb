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
import { AddSpecialSessionDialog } from "./_component/add_special_session_dialog";
import StudentMappingFilterForm from "./_component/special_session_filter_form";
import SpecialSessionFilterForm from "./_component/special_session_filter_form";

const SpecialSession = () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Special Sessions</CardTitle>
          <CardDescription>
            Special Session: Display special sessions for specific batches,
            enabling effective management and tracking of these unique sessions
            for targeted groups of students.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddSpecialSessionDialog />
          </div>
          <Separator />
          <SpecialSessionFilterForm />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default SpecialSession;
