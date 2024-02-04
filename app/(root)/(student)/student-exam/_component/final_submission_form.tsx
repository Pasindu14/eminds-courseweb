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

import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import CourseSelect from "@/components/common/course_select";
import { MultiSelect } from "@/components/common/multi-select";
import badgeSchema from "@/validations/badge.validation";
import { Input } from "@/components/ui/input";
import { addBadge } from "@/server/actions/badge.actions";
import finalSubmissionSchema from "@/validations/final-submission.validation";
import { useSession } from "next-auth/react";
import { addFinalExamSubmission } from "@/server/actions/exams.actions";

export function FinalSubmissionForm({ data }: { data?: any }) {
  const { data: session }: any = useSession();

  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof finalSubmissionSchema>>({
    resolver: zodResolver(finalSubmissionSchema),
    defaultValues: {
      link: "",
    },
  });

  async function onSubmit(values: z.infer<typeof finalSubmissionSchema>) {
    try {
      const phoneNumber = session.phoneNumber;
      const batchId = session.batchId;
      const courseId = session.courseId;

      setLoading(true);
      let result;

      result = await addFinalExamSubmission({
        student_phone: phoneNumber,
        batch_auto_id: batchId,
        course_auto_id: courseId,
        link: values.link,
      });
      if (!result.success) {
        toastError(result.message);
      } else {
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
