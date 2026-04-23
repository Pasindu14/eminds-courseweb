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
import { columns } from "./datatable/columns";
import { fetchStripePayments } from "@/server/actions/stripe-payment.actions";

const StripePayments = async () => {
  const data = await fetchStripePayments();

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Online Payments</CardTitle>
          <CardDescription>
            All Stripe payment transactions — enrollments, amounts, and customer details.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <DataTable columns={columns} data={data} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StripePayments;
