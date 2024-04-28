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
import { getServerSession } from "next-auth";
import { authOption } from "@/lib/auth-options";
import PasswordResetForm from "./_component/reset-form";

const PasswordResetInitial = async () => {
  return (
    <div>
      <Card className="w-full rounded-sm">
        <CardHeader>
          <CardTitle className="text-4xl">Change your password</CardTitle>
          <CardDescription>Manage your own password here</CardDescription>
        </CardHeader>
        <Separator />
        <CardContent className="pt-4">
          <div className="md:flex flex-row justify-between items-center"></div>
          <div className="max-w-xl ">
            <PasswordResetForm />
          </div>
        </CardContent>
        <CardFooter className="flex justify-between"></CardFooter>
      </Card>
    </div>
  );
};

export default PasswordResetInitial;
