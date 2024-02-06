import ForbiddenAnimationComponent from "@/components/common/unauthorized-component";
import Image from "next/image";
import React from "react";

const UnAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center w-screen h-screen gap-12 py-8">
      <ForbiddenAnimationComponent />
      <div className="flex flex-col items-center gap-4"></div>
    </div>
  );
};

export default UnAuthorized;
