import { NavigationAdmin } from "@/components/navbar-admin";
import { getServerSession } from "next-auth";
import React from "react";

import { redirect } from "next/navigation";
import { signIn } from "@/constants/paths";
import { NavigationStudent } from "@/components/navbar-student";

import Providers from "@/app/Providers";
import { authOption } from "@/lib/auth-options";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOption);
  console.log(session);
  /*   if (!session) {
    redirect(signIn);
  } else {
    if (session.role == "ADMIN") {
      redirect("/admin-dashboard");
    }
  }
 */
  return (
    <Providers>
      <div className="background-image min-h-screen flex flex-col">
        <div>
          {session.role === "ADMIN" ? (
            <NavigationAdmin />
          ) : (
            <NavigationStudent />
          )}
        </div>
        <div className="container mx-auto pt-4 pb-4">{children}</div>
      </div>
    </Providers>
  );
};

export default RootLayout;
