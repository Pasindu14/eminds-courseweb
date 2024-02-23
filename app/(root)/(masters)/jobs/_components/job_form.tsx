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
import jobSchema from "@/validations/job.validation";
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { addJob, updateJob } from "@/server/actions/jobs.actions";
import { Switch } from "@/components/ui/switch";
import { deleteHtmlFile } from "@/server/actions/file.actions";

export function JobForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof jobSchema>>({
    resolver: zodResolver(jobSchema),
    defaultValues: {
      title: data?.title ?? "",
      expire_date: data?.expire_date ?? new Date().toISOString().split("T")[0],
      link: data?.link ?? "",
      status: data?.status ?? 1,
    },
  });

  async function onSubmit(values: z.infer<typeof jobSchema>) {
    try {
      setLoading(true);
      let result;
      if (data != null) {
        result = await updateJob(data.job_auto_id, values);
      } else {
        result = await addJob(values);
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter job title..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="expire_date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Expiration Date</FormLabel>
              <FormControl>
                <Input type="date" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="link"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Job Link</FormLabel>
              <FormControl>
                <Input placeholder="Enter job link..." {...field} />
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
