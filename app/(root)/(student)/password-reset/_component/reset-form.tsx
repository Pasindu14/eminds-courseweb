"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { errorMessage, successMessage } from "@/constants/messages";
import { Loader } from "@/lib/spinners";
import { useSession } from "next-auth/react";
import { addPaymentsByStudent } from "@/server/actions/payments.actions";
import { studentPasswordSchema } from "@/validations/student.validation";
import { updateStudentPassword } from "@/server/actions/student.actions";

const PasswordResetForm = () => {
  const { data: session }: any = useSession();
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof studentPasswordSchema>>({
    resolver: zodResolver(studentPasswordSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
      oldPassword: "",
    },
  });

  async function onSubmit(values: z.infer<typeof studentPasswordSchema>) {
    try {
      setLoading(true);

      await updateStudentPassword(
        session?.id,
        session.phoneNumber,
        values.oldPassword,
        values.password,
        values.confirmPassword
      );
      toastSuccess("Password updated successfully");
    } catch (error: any) {
      toastError("Error while updating the password");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="oldPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">Old Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter old password..."
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-black">New Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter new password..."
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Confirm Password</FormLabel>
              <FormControl>
                <Input
                  placeholder="Enter confirm password..."
                  {...field}
                  type="text"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading ? (
            <div className="flex items-center justify-center gap-2">
              <p>Save changes</p>
              <Loader size={13} />
            </div>
          ) : (
            "Save changes"
          )}
        </Button>
      </form>
    </Form>
  );
};

export default PasswordResetForm;
