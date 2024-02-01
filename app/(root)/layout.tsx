import { NavigationAdmin } from "@/components/navbar-admin";
import { getServerSession } from "next-auth";
import React from "react";
import { Toaster } from "react-hot-toast";
import { authOption } from "../api/auth/[...nextauth]/route";
import { redirect } from "next/navigation";
import { signIn } from "@/constants/paths";

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session = await getServerSession(authOption);

  if (!session) {
    redirect(signIn);
  }

  return (
    <div className="background-image min-h-screen flex flex-col">
      <NavigationAdmin />
      <div className="container mx-auto pt-4 pb-4">{children}</div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
