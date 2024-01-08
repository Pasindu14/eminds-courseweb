import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ArrowUpDown, PlusSquare } from "lucide-react";
import { DataTable } from "../../../../components/datatable";
import { ColumnDef } from "@tanstack/react-table";
import { fetchSessions } from "@/server/actions/sessions.actions";
import { AddSessionDialog } from "./_component/add_session_dialog";
import FileUpload from "./_component/upload";

const Sessions = () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Sessions</CardTitle>
          <CardDescription>
            Efficiently manage and organize session details on this platform,
            ensuring easy access and updates to vital information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddSessionDialog />
          </div>
          {/*           <DataTable columns={sessionColumns} data={data} /> */}
          {/* Ensure sessionColumns are relevant for sessions */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Sessions;
