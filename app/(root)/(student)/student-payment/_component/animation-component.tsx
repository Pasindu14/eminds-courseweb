"use client";
import React from "react";
import Lottie from "lottie-react";
import animationData from "@/public/lottie/animation_03.json";

const AnimationComponent = () => {
  return (
    <div className="md:w-35">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimationComponent;
