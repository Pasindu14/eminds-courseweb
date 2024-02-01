"use client";

import * as React from "react";

import { Progress } from "@/components/ui/progress";

export function ProgressBar({ percentage }: { percentage: number }) {
  return <Progress value={percentage} className="w-full h-8 rounded-xl" />;
}
