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
import { ColumnDef } from "@tanstack/react-table"; // Updated/Added component
import { columns } from "./datatable/columns"; // Ensure this is updated for exams
import { fetchExams } from "@/server/actions/exams.actions";
import { AddExamDialog } from "./_components/add_exam_dialog";

const Exams = async () => {
  const data = await fetchExams();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Exams</CardTitle>
          <CardDescription>
            Efficiently manage and organize exam details on this platform,
            ensuring easy access and updates to vital information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddExamDialog /> {/* Updated/Added component */}
          </div>
          <DataTable columns={columns} data={data} />
          {/* Ensure columns are relevant for exams */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Exams;
