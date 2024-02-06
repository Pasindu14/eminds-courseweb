"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/animation_05.json";

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
