import { NavigationAdmin } from "@/components/navbar-admin";
import React from "react";
import { Toaster } from "react-hot-toast";

const RootLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="background-image min-h-screen flex flex-col">
      <NavigationAdmin />
      <div className="container mx-auto pt-4">{children}</div>
      <Toaster />
    </div>
  );
};

export default RootLayout;
