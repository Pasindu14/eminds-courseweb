"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/animation_04.json";

const NotFoundAnimationComponent = () => {
  return (
    <div className="w-full flex justify-center items-center">
      <div className="md:w-80">
        <Lottie animationData={animationData} loop={true} />
        <p className="text-center text-2xl mt-4 font-semibold">
          We are unable to find any data matching your criteria
        </p>
      </div>
    </div>
  );
};

export default NotFoundAnimationComponent;
