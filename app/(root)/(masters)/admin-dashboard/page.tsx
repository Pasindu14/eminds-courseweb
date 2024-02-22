"use client";
import React from "react";
import animationData from "@/public/lottie/animation_06.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const AdminDashboard = () => {
  return (
    <div className="w-full flex flex-col justify-center items-center">
      <div className="text-5xl flex w-full justify-center items-center mt-4">
        Welcome Administrator
      </div>
      <div className="md:w-[40vw]">
        <Lottie
          animationData={animationData}
          loop={true}
          className="bg-transparent"
        />
      </div>
    </div>
  );
};

export default AdminDashboard;
