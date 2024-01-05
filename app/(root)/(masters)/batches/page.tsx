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
import { fetchBatches } from "@/server/actions/batch.actions"; // Update the import to fetchBatches
import { AddBatchDialog } from "./_components/add_batch_dialog"; // Update/Add this component
import { columns } from "./datatable/columns";

const Batches = async () => {
  const data = await fetchBatches();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Batches</CardTitle>
          <CardDescription>
            Efficiently manage and organize batch details on this platform,
            ensuring easy access and updates to vital information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddBatchDialog /> {/* Update/Add this component */}
          </div>
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Batches;
