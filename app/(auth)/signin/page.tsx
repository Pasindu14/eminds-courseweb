"use client";
import React, { useState, useEffect } from "react";
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

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import authSchema from "@/validations/auth.validation";
import { toastError } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
import Image from "next/image";
import animationData from "@/public/lottie/animation_02.json";
import Lottie from "lottie-react";
import { signIn, useSession } from "next-auth/react";
import { Loader } from "@/lib/spinners";
import { useRouter } from "next/navigation";
import { studentDashboardPath } from "@/constants/paths";

const SignIn = () => {
  const router = useRouter();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "admin",
      password: "admin",
    },
  });

  async function onSubmit(values: z.infer<typeof authSchema>) {
    try {
      setLoading(true);
      const res = await signIn("credentials", {
        redirect: false,
        username: values.username,
        password: values.password,
        callbackUrl: studentDashboardPath,
      });

      if (res?.ok === false) {
        toastError("Invalid credentials please try again!");
        setLoading(false);
      } else {
        if (values.username != "admin") {
          router.replace(studentDashboardPath);
        } else {
          router.replace("/students");
        }
      }
    } catch (error) {
      toastError(errorMessage);
    } finally {
    }
  }

  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center md:py-32 md:px-32 py-6">
      <div className="md:w-1/2 bg-white h-full md:rounded-l-3xl flex flex-1 flex-col items-center justify-center px-6 py-12 lg:px-8 border-2 border-gray-200">
        <div className="relative rounded-md md:w-1/3">
          <Image
            src="/eminds_logo.png"
            width="0"
            height="0"
            sizes="100vw"
            className="w-full h-auto"
            alt="Logo"
            priority
          />
        </div>

        <h2 className="mt-10 text-center text-4xl font-bold leading-9 tracking-tight text-[#2563EB]">
          Sign in
        </h2>

        <div className="w-full px-6 py-4">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
              <FormField
                control={form.control}
                name="username"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Username</FormLabel>
                    <FormControl>
                      <Input placeholder="" {...field} />
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
                      <Input placeholder="" {...field} type="password" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <Button type="submit" disabled={loading} className="w-full">
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <p>Login</p>
                    <Loader size={13} />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
      <div className="md:w-1/2 relative bg-[#2563EB]  h-full rounded-r-3xl p-16 items-center justify-center hidden md:flex border-2 border-gray-200">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default SignIn;
