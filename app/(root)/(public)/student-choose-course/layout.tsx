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
  return (
    <div className="background-image min-h-screen flex flex-col ">
      <div className="md:block"></div>
      <div className="container mx-auto ">
        <Suspense fallback={<LoaderFull size={25} color="#2563eb" />}>
          {children}
        </Suspense>
      </div>
    </div>
  );
};

export default RootLayout;
