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

const StudentPayment = () => {
  const studentId = "0711803295";
  const password = "1122334";

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
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default StudentPayment;
