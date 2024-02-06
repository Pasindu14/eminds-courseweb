import { NavigationAdmin } from "@/components/navbar-admin";
import { getServerSession } from "next-auth";
import React from "react";
import { Toaster } from "react-hot-toast";

import { redirect } from "next/navigation";
import { signIn } from "@/constants/paths";
import { NavigationStudent } from "@/components/navbar-student";

import Providers from "@/app/Providers";
import { authOption } from "@/lib/auth-options";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOption);

  if (!session) {
    redirect(signIn);
  }

  return (
    <Providers>
      <div className="background-image min-h-screen flex flex-col">
        <div className="md:block">
          {session.role === "ADMIN" ? (
            <NavigationAdmin />
          ) : (
            <NavigationStudent />
          )}
        </div>

        <div className="container mx-auto pt-4 pb-4">{children}</div>
        <Toaster />
      </div>
    </Providers>
  );
};

export default RootLayout;
