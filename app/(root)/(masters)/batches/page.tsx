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
import { DataTable } from "../../../../components/datatable";
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
