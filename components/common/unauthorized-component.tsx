"use client";
import React from "react";
import animationData from "@/public/lottie/animation_05.json";
import dynamic from "next/dynamic";

const Lottie = dynamic(() => import("lottie-react"), { ssr: false });

const ForbiddenAnimationComponent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="md:w-[40vw]">
        <Lottie animationData={animationData} loop={true} />
      </div>
    </div>
  );
};

export default ForbiddenAnimationComponent;
