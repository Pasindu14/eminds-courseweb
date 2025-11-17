"use client";
import React, { useState, useEffect, use } from "react";
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
import { toastError, toastSuccess } from "@/lib/toast/toast";
import { errorMessage } from "@/constants/messages";
import Image from "next/image";
import animationData from "@/public/lottie/animation_02.json";
import { signIn, useSession } from "next-auth/react";
import { Loader } from "@/lib/spinners";
import { useRouter } from "next/navigation";
import { studentDashboardPath } from "@/constants/paths";
import dynamic from "next/dynamic";
import { validateStudent } from "@/server/actions/students-auth.actions";
import { encryptToken } from "@/lib/encrypter";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const SignIn = () => {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [browser, setBrowser] = useState(false);
  const [browserChecked, setBrowserChecked] = useState(false);

  const form = useForm<z.infer<typeof authSchema>>({
    resolver: zodResolver(authSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  });

  useEffect(() => {
    const manageBrowser = async () => {
      const { ClientJS } = await import("clientjs"); // Dynamically import clientjs
      const client = new ClientJS();
      const browser = client.getBrowser();

      if (
        browser == "Chrome" ||
        browser == "Firefox" ||
        browser == "Safari" ||
        browser == "Opera"
      ) {
        setBrowser(true);
      }

      setBrowserChecked(true);
    };

    manageBrowser();

    return () => {};
  }, []);

  async function onSubmit(values: z.infer<typeof authSchema>) {
    try {
      setLoading(true);

      /* remove this after fix*/
      /*       if (values.username != "admin") {
        toastError("Down for maintenance!");
        return;
      } */

      const result = await validateStudent(values.username, values.password);

      if (result == null) {
        const res = await signIn("credentials", {
          redirect: false,
          username: values.username,
          password: values.password,
          callbackUrl: studentDashboardPath,
        });

        if (res?.ok === false) {
          if (res?.error == "CredentialsSignin") {
            toastError("Invalid credentials please try again!");
          } else {
            toastError(res.error ?? "Invalid credentials please try again!");
          }

          setLoading(false);
        } else {
          if (values.username != "admin") {
            router.replace("/password-reset-initial");
          } else {
            if (values.password == "Eminds@587854") {
              router.replace("/admin-dashboard");
            } else {
              toastError("Invalid credentials please try again! ");
            }
          }
        }
      } else {
        const encrypted = encryptToken(result.student_auto_id);
        router.replace(`/student-choose-course/${encrypted}`);
      }
    } catch (error: any) {
      if (error.message === "Invalid credentials please try again!") {
        toastError(error.message);
      } else {
        toastError(errorMessage);
      }
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen mx-auto flex justify-center items-center md:py-16 md:px-32 py-6">
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

              <Button
                type="submit"
                disabled={loading || (!browser && browserChecked)}
                className="w-full"
              >
                {loading ? (
                  <div className="flex items-center justify-center gap-2">
                    <p>Login</p>
                    <Loader size={13} />
                  </div>
                ) : (
                  "Login"
                )}
              </Button>
              {/*               <p className="text-sm text-center mt-10 text-red-700">
                Please be informed that the student portal will be temporarily
                disabled for system development from June 30 to July 4. We
                apologize for any inconvenience this may cause and appreciate
                your understanding.
              </p>
 */}
              {!browser && browserChecked && (
                <Alert variant="destructive">
                  <AlertDescription>
                    <h1 className="text-center">
                      Unsupported browser detected. Please use Chrome, Firefox,
                      Safari, or Opera.
                    </h1>
                  </AlertDescription>
                </Alert>
              )}
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
