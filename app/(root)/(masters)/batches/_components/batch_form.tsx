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
import batchSchema from "@/validations/batch.validation"; // Define this schema
import { addBatch, updateBatch } from "@/server/actions/batch.actions"; // Define these actions
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import CourseSelect from "../../../../../components/common/course_select";
import { Switch } from "@/components/ui/switch";

export function BatchForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof batchSchema>>({
    resolver: zodResolver(batchSchema),
    defaultValues: {
      batch_no: data?.batch_no ?? "",
      batch_name: data?.batch_name ?? "",
      zoom_link: data?.zoom_link ?? "",
      password: data?.password ?? "",
      start_date: data?.start_date ?? new Date().toISOString().split("T")[0],
      end_date: data?.end_date ?? new Date().toISOString().split("T")[0],
      status: data?.status ?? 1,
      price: data?.price ?? 0,
      course_auto_id: data?.course_auto_id.toString() ?? 1,
    },
  });

  async function onSubmit(values: z.infer<typeof batchSchema>) {
    try {
      setLoading(true);
      let result;
      if (data != null) {
        result = await updateBatch(data.auto_id, values);
      } else {
        result = await addBatch(values);
      }
      if (!result.success) {
        toastError(result.message);
      } else {
        if (data == null) {
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
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        onError={(e) => {
          console.log(e);
        }}
        className="space-y-2"
      >
        <CourseSelect control={form.control} name="course_auto_id" />

        <FormField
          control={form.control}
          name="batch_no"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch No</FormLabel>
              <FormControl>
                <Input placeholder="Enter batch number..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="batch_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Batch Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter batch name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="zoom_link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zoom Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter zoom link..." {...field} />
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
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input
                  type="password"
                  placeholder="Enter password..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="start_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Start Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="end_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>End Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="price"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Price</FormLabel>
              <FormControl>
                <Input type="number" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center gap-4">
              <FormLabel className="mt-1">Status</FormLabel>
              <FormControl>
                <Switch
                  checked={field.value == 1 ? true : false}
                  onCheckedChange={(checked) => field.onChange(checked ? 1 : 0)}
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
}
