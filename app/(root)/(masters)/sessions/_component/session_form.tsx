import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, useWatch } from "react-hook-form";
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
import sessionSchema from "@/validations/session.validation"; // Define this validation schema
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { addSession } from "@/server/actions/sessions.actions"; // Adjust these action imports
import CourseSelect from "@/components/common/course_select";
import BatchSelect from "@/components/common/batch_select";

export function SessionForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof sessionSchema>>({
    resolver: zodResolver(sessionSchema),
    defaultValues: {
      title: "",
      zoom_link: "",
      zoom_password: "",
      slide_extension: "",
      batch_auto_id: "",
      course_auto_id: "",
      file: undefined,
    },
  });

  const courseCode = useWatch({
    control: form.control,
    name: "course_auto_id",
  });

  async function onSubmit(values: z.infer<typeof sessionSchema>) {
    try {
      setLoading(true);
      let result;
      const fileFormData = new FormData();
      fileFormData.append("file", values.file[0]);

      const formData = new FormData();
      for (const [key, value] of Object.entries(values)) {
        if (key !== "file") {
          formData.append(key, value);
        }
      }

      const response = await fetch(
        "https://eminds.com.au/coursewebslides/upload.php",
        {
          method: "POST",
          body: fileFormData,
          cache: "no-store",
        }
      );

      if (!response.ok) {
        throw new Error("Something went wrong while uploading the slide.");
      }

      const jsonResponse = await response.json();

      const filePath = jsonResponse.filePath;

      result = await addSession(formData, filePath);

      if (!result.success) {
        toastError(result.message);
      } else {
        if (data?.session_auto_id == null) {
          //form.reset();
        }
        toastSuccess(successMessage);
      }
    } catch (error) {
      toastError(errorMessage);
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
        <CourseSelect control={form.control} name="course_auto_id" />

        <BatchSelect
          control={form.control}
          name="batch_auto_id"
          filter={courseCode}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Session Title</FormLabel>
              <FormControl>
                <Input placeholder="Enter session title..." {...field} />
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
              <FormLabel>Dropbox link</FormLabel>
              <FormControl>
                <Input placeholder="Dropbox link..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="zoom_password"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Dropbox password</FormLabel>
              <FormControl>
                <Input placeholder="Dropbox password..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="file"
          render={({ field }) => (
            <FormItem>
              <FormLabel>File</FormLabel>
              <FormControl>
                <Input
                  placeholder="Zoom password..."
                  type="file"
                  onChange={(event) => field.onChange(event.target.files)}
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
