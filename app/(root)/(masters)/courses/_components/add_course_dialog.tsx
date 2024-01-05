"use client";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { PlusSquare } from "lucide-react";
import { CourseForm } from "./course_form";
import { motion } from "framer-motion";

export function AddCourseDialog() {
  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      <Dialog>
        <DialogTrigger asChild>
          <Button>
            <PlusSquare className="mr-2 h-4 w-4" /> Add
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px] md:max-w-xl overflow-y-scroll max-h-[95vh]">
          <DialogHeader>
            <DialogTitle className="text-3xl">Add Course</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Separator />
          <CourseForm />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
