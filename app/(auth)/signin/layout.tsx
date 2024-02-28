import Providers from "@/app/Providers";
import { NavigationAdmin } from "@/components/navbar-admin";
import { signIn } from "@/constants/paths";
import { authOption } from "@/lib/auth-options";
import { getServerSession } from "next-auth";
import { Jost } from "next/font/google";
import { redirect } from "next/navigation";
import React from "react";
const jost = Jost({ subsets: ["latin"] });

const RootLayout = async ({ children }: { children: React.ReactNode }) => {
  const session: any = await getServerSession(authOption);
  console.log(session);

  /*   if (session) {
    if (session.role == "ADMIN") {
      redirect("/admin-dashboard");
    } else if (session.role == "STUDENT") {
      redirect("/dashboard");
    }
  } */
  return (
    <div className={jost.className}>
      <div className="background-image min-h-screen flex flex-col">
        <div className="container mx-auto pt-4">
          <Providers>{children}</Providers>
        </div>
      </div>
    </div>
  );
};

export default RootLayout;
