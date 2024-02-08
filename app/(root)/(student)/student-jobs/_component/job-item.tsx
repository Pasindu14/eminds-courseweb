"use client";

import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import React from "react";

const JobItem = ({ job }: { job: any }) => {
  return (
    <Link href={job.link}>
      <div className="rounded-xl border-8 w-full px-8 py-4 mb-4">
        <div className="flex items-center justify-between">
          <div className="md:text-4xl font-bold">{job.title}</div>
          <div>Expires : {job.expire_date}</div>
        </div>
      </div>
    </Link>
  );
};

export default JobItem;
