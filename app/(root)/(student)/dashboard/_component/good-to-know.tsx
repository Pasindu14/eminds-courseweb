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

const GoodToKnowComponent = () => {
  return (
    <div>
      <Dialog>
        <DialogTrigger asChild>
          <Button className="rounded-xl md:w-[200px] w-[200px] mb-1">
            Good To Know
          </Button>
        </DialogTrigger>
        <DialogContent
          className={"lg:max-w-screen-lg overflow-y-scroll max-h-screen"}
        >
          <DialogHeader>
            <Separator />
            <DialogDescription
              className={"min-h-[calc(100vh-200px)] max-h-full"}
            >
              <PdfViewer
                url={`/pdf/good-to-know.pdf#embedded=true&toolbar=0&navpanes=0`}
              />
            </DialogDescription>
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default GoodToKnowComponent;
