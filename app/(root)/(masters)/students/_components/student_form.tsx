"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";

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
import studentSchema from "@/validations/student.validation";
import { addStudent, updateStudent } from "@/server/actions/student.actions";
import toast from "react-hot-toast";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";

export function StudentForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof studentSchema>>({
    resolver: zodResolver(studentSchema),
    defaultValues: {
      auto_id: data?.auto_id ?? null,
      name: data?.name ?? "",
      phoneNumber: data?.phonenumber ?? undefined,
      address: data?.address ?? "",
      nic: data?.nic ?? "",
      email: data?.email ?? "",
      birthDay: data?.birthDay ?? new Date().toISOString().split("T")[0],
    },
  });
  async function onSubmit(values: z.infer<typeof studentSchema>) {
    try {
      setLoading(true);
      let result;

      if (data != undefined) {
        result = await updateStudent(data.auto_id, values);
      } else {
        result = await addStudent(values);
      }
      if (!result.success) {
        toastError(result.message);
      } else {
        if (data == undefined) {
          form.reset();
        }
        toastSuccess(successMessage);
      }
    } catch (error) {
      console.log(error);
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="phoneNumber"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter phone number..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Input placeholder="Enter address..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="nic"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NIC</FormLabel>
              <FormControl>
                <Input placeholder="Enter NIC..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Enter email..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="birthDay"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Birthday</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={loading}>
          {loading == true ? (
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
}
