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
import PaymentForm from "./_component/payment_form";
import { AddPaymentDialog } from "./_component/add_payment_dialog";
import { DataTable } from "@/components/datatable";
import { columns } from "./datatable/columns";
import { fetchPaymentLinesWithBatchNo } from "@/server/actions/payments.actions";
import { getServerSession } from "next-auth";
import { authOption } from "../../../api/auth/[...nextauth]/route";

const StudentPayment = async () => {
  const session: any = await getServerSession(authOption);

  const paymentLines = await fetchPaymentLinesWithBatchNo(Number(session.id));

  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Payments</CardTitle>
          <CardDescription>
            Efficient and Secure Student Payment Portal
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex flex-row justify-between"></div>
          <div>
            <AddPaymentDialog />
          </div>
          <Separator className="mt-3" />

          <DataTable columns={columns} data={paymentLines} />
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentPayment;
