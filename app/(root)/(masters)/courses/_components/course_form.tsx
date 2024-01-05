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
import courseSchema from "@/validations/course.validation"; // Define this validation schema
import { addCourse, updateCourse } from "@/server/actions/course.actions"; // Adjust these functions for courses
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";

export function CourseForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof courseSchema>>({
    resolver: zodResolver(courseSchema),
    defaultValues: {
      auto_id: data?.auto_id ?? null,
      course_code: data?.course_code ?? "",
      course_name: data?.course_name ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof courseSchema>) {
    try {
      setLoading(true);
      let result;
      if (data.auto_id != null) {
        result = await updateCourse(data.auto_id, values);
      } else {
        result = await addCourse(values);
      }
      if (!result.success) {
        toastError(result.message);
      } else {
        if (data.auto_id == null) {
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
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="course_code"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Code</FormLabel>
              <FormControl>
                <Input placeholder="Enter course code..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="course_name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Course Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter course name..." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        {/* Add more fields as necessary for your course attributes */}
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
