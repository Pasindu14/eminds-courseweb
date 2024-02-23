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
import { AddPaymentsDialog } from "./_component/add_payments_dialog";
import PaymentFilterForm from "./_component/payment_filter_form";

const Payment = async () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Payments</CardTitle>
          <CardDescription>
            Streamline the management and tracking of payments, ensuring
            seamless transactions and easy access to crucial financial
            information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="flex mb-4">
            <AddPaymentsDialog />
          </div>
          <Separator />
          <PaymentFilterForm />

          {/* Ensure sessionColumns are relevant for sessions */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default Payment;
