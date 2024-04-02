"use client";
import React from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import PdfViewer from "./PdfViewer";

const AccountRestrictionComponent = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-xl md:w-[200px]">
            Account Restriction Guide
          </Button>
        </DialogTrigger>
        <DialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <DialogHeader>
            <DialogTitle className="text-xs">
              Our Student Support Line helps course participants with any
              course-related issues during the course. Assistant lecturers and
              instructors are here to help. You can make an appointment at
              https://calendly.com/ijaazfarook/eminds-academy-student-support to
              get help easier. After booking, you&apos;ll get an email with a
              Zoom link for the meeting. If you have trouble joining the Zoom
              meeting, please call Mr. Ijaaz Farook at +9477 8601113 before your
              appointment. This way, we ensure you get the help you need quickly
              and directly, making learning smoother. Please read the eMinds
              Academy—Account Restriction Guidelines &apos; on the portal about
              Facebook account restrictions before requesting an appointment.
              This guide can help you with common issues.
            </DialogTitle>
            <Separator />
            <DialogDescription
              className={"min-h-[calc(100vh-200px)] max-h-full"}
            >
              <PdfViewer
                url={
                  "/pdf/eminds_academy_account_restriction_guideline.pdf#embedded=true&toolbar=0&navpanes=0"
                }
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AccountRestrictionComponent;
