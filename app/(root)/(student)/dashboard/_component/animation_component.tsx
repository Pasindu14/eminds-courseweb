"use client";
import React from "react";
import animationData from "@/public/lottie/animation_01.json";
import dynamic from "next/dynamic";
const Lottie = dynamic(() => import("lottie-react"), { ssr: false });
const AnimationComponent = () => {
  return (
    <div className="md:w-80">
      <Lottie animationData={animationData} loop={true} />
    </div>
  );
};

export default AnimationComponent;
