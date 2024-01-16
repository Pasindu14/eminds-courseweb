"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/animation_01.json";

const AnimationComponent = () => {
  return (
    <div className="md:w-80">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimationComponent;
