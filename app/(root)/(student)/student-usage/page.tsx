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
import { useSession } from "next-auth/react";

const StudentUsage = () => {
  const { data: session } = useSession();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Usage Summary</CardTitle>
          <CardDescription>
            The Usage Summary shows your attendance for each subject, helping
            you keep track of your class participation easily.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex flex-row justify-between"></div>
          <div></div>
          <Separator className="mt-3" />

          {/* <DataTable columns={columns} data={paymentLines} /> */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentUsage;
