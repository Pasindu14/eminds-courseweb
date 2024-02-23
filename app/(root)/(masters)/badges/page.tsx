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
import { Button } from "@/components/ui/button";
import { fetchStudentByPhoneNumber } from "@/server/actions/student.actions";
import { AddBadgeDialog } from "./_component/add_badge_dialog";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchBadges } from "@/server/actions/badge.actions";

const Badges = async () => {
  const data = await fetchBadges();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Badges</CardTitle>
          <CardDescription></CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddBadgeDialog />
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Badges;
