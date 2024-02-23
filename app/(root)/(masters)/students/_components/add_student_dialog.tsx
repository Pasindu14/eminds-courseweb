"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PlusSquare } from "lucide-react";
import { StudentForm } from "./student_form";
import AnimatedComponent from "@/components/common/animated-component";

export function AddStudentDialog() {
  return (
    <AnimatedComponent>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusSquare className="mr-2 h-4 w-4" /> Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-xl max-h-[95vh]">
          <DialogHeader>
            <DialogTitle className="text-3xl">Add student</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Separator />
          <StudentForm />
        </DialogContent>
      </Dialog>
    </AnimatedComponent>
  );
}
