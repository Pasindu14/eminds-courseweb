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
import { ColumnDef } from "@tanstack/react-table";
import { fetchSessions } from "@/server/actions/sessions.actions";
import PaymentFilterForm from "./_component/payment_report_filter_form";

const PaymentReport = async () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Payment Report</CardTitle>
          <CardDescription>
            Manage and organize session details efficiently, ensuring convenient
            access and timely updates to essential information.
          </CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <PaymentFilterForm />
          {/* Ensure sessionColumns are relevant for sessions */}
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default PaymentReport;
