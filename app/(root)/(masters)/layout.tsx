import { NavigationAdmin } from "@/components/navbar-admin";
import { getServerSession } from "next-auth";
import React, { Suspense } from "react";

import { redirect } from "next/navigation";
import { signIn } from "@/constants/paths";
import { NavigationStudent } from "@/components/navbar-student";

import Providers from "@/app/Providers";
import { authOption } from "@/lib/auth-options";
import { Loader, LoaderFull } from "@/lib/spinners";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOption);

  if (!session) {
    redirect(signIn);
  } else {
    if (session.role == "STUDENT") {
      redirect("/dashboard");
    }
  }
  return (
    <Providers>
      <div className="background-image min-h-screen flex flex-col ">
        <div className="md:block">
          {session.role === "ADMIN" ? (
            <NavigationAdmin />
          ) : (
            <NavigationStudent />
          )}
        </div>
        <div className="container mx-auto pt-4 pb-4 min-h-[50vh]">
          <Suspense fallback={<LoaderFull size={25} color="#2563eb" />}>
            {children}
          </Suspense>
        </div>
      </div>
    </Providers>
  );
};

export default RootLayout;
