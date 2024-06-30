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
import { sessionUpdateSchema } from "@/validations/session.validation"; // Define this validation schema
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { useState } from "react";
import { Loader } from "@/lib/spinners";
import { errorMessage, successMessage } from "@/constants/messages";
import { updateSessionDropboxLink } from "@/server/actions/sessions.actions"; // Adjust these action imports

export function UpdateSessionForm({ data }: { data?: any }) {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof sessionUpdateSchema>>({
    resolver: zodResolver(sessionUpdateSchema),
    defaultValues: {
      zoom_link: data?.zoom_link ?? "",
    },
  });

  async function onSubmit(values: z.infer<typeof sessionUpdateSchema>) {
    try {
      setLoading(true);
      let result;

      result = await updateSessionDropboxLink(data.session_auto_id, values);

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
