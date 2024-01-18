import { NavigationAdmin } from "@/components/navbar-admin";
import { Jost } from "next/font/google";
import React from "react";
import { Toaster } from "react-hot-toast";
const jost = Jost({ subsets: ["latin"] });

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className={jost.className}>
      <div className="background-image min-h-screen flex flex-col">
        <div className="container mx-auto pt-4">{children}</div>
        <Toaster />
      </div>
    </div>
  );
};

export default RootLayout;
