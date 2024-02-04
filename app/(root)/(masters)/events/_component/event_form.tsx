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
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { addSession } from "@/server/actions/sessions.actions"; // Adjust these action imports
import eventSchema from "@/validations/event.validation";
import { Switch } from "@/components/ui/switch";
import { addEvent, updateEvent } from "@/server/actions/events.actions";
import createEventSchema from "@/validations/event.validation";

export function EventForm({ data }: { data?: any }) {
  const eventSchema = createEventSchema(data != null ? false : true);
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof eventSchema>>({
    resolver: zodResolver(eventSchema),
    defaultValues: {
      name: data?.name ?? "hgfdghfdghdfg",
      description: data?.description ?? "ghdghdfggfdfdgf",
      date: data?.start_date ?? new Date().toISOString().split("T")[0],
      status: data?.status != null ? (data?.status == 1 ? true : false) : true,
      link: "https://www.google.com",
      image: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof eventSchema>) {
    try {
      setLoading(true);
      let result;
      const fileFormData = new FormData();

      if (values.image != null) {
        fileFormData.append("file", values.image[0]);
      }

      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key !== "file") {
          formData.append(key, value);
        }
      }

      if (data != null) {
        result = await updateEvent(
          data.event_auto_id,
          formData,
          values.image != null ? fileFormData : undefined
        );
      } else {
        result = await addEvent(formData, fileFormData);
      }

      if (!result.success) {
        toastError(result.message);
      } else {
        toastSuccess(successMessage);
      }
    } catch (error) {
      alert(error);
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
                <Input placeholder="Name ..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description </FormLabel>
              <FormControl>
                <Input placeholder="Description..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="date"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date</FormLabel>
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
              <FormLabel>Link</FormLabel>
              <FormControl>
                <Input placeholder="Link..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  placeholder="link..."
                  type="file"
                  onChange={(event) => field.onChange(event.target.files)}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Status</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  aria-readonly
                />
              </FormControl>
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
