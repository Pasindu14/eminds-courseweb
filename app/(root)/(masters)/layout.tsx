import { NavigationAdmin } from "@/components/navbar-admin";
import { getServerSession } from "next-auth";
import React from "react";
import { Toaster } from "react-hot-toast";

import { redirect } from "next/navigation";
import { signIn } from "@/constants/paths";
import { NavigationStudent } from "@/components/navbar-student";
import { authOption } from "@/app/api/auth/[...nextauth]/route";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOption);

  if (!session) {
    return;
  }
  if (session) {
    if (session?.role != "ADMIN") {
      redirect(signIn);
    }
  }

  return (
    <div className="background-image min-h-screen flex flex-col">
      <div className="hidden md:block">
        {session.role === "ADMIN" ? <NavigationAdmin /> : <NavigationStudent />}
      </div>
      <div className="container mx-auto pt-4 pb-4">{children}</div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
