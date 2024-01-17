import { studentPaymentSchema } from "@/validations/payment.validation";
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
import { addSession } from "@/server/actions/sessions.actions";
import { errorMessage, successMessage } from "@/constants/messages";
import { Loader } from "@/lib/spinners";

const PaymentForm = () => {
  const [loading, setLoading] = useState(false);
  const form = useForm<z.infer<typeof studentPaymentSchema>>({
    resolver: zodResolver(studentPaymentSchema),
    defaultValues: {
      amount: 1000,
      file: undefined,
    },
  });

  async function onSubmit(values: z.infer<typeof studentPaymentSchema>) {
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

      result = await addSession(formData, fileFormData);

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
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Amount</FormLabel>
              <FormControl>
                <Input placeholder="Enter amount..." {...field} type="number" />
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
                  placeholder=""
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
};

export default PaymentForm;
