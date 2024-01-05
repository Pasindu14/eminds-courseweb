import React from "react";
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
import { columns } from "./datatable/columns";
import { fetchStudents } from "@/server/actions/student.actions";
import { AddStudentDialog } from "./_components/add_student_dialog";

const Students = async () => {
  const data = await fetchStudents();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Students</CardTitle>
          <CardDescription>
            You can efficiently manage and organize student details using this
            platform, ensuring easy access and updates to vital information
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddStudentDialog />
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Students;
