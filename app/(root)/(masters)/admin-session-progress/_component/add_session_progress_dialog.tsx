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
import { AddSessionProgressForm } from "./session_progress_form";

interface AddSessionProgressDialogProps {
  batchId: string | undefined;
  courseAutoId: string | undefined;
  onProgressAdded?: () => void; // Optional callback for when progress is added
}

export function AddSessionProgressDialog({
  batchId,
  courseAutoId,
  onProgressAdded,
}: AddSessionProgressDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="mt-8">
          <PlusSquare className="mr-2 h-4 w-4" /> Add Progress
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-xl overflow-y-scroll max-h-[95vh]">
        <DialogHeader>
          <DialogTitle className="text-3xl">Add Session Progress</DialogTitle>
          <DialogDescription>
            Add a new session progress entry for the selected course and batch.
          </DialogDescription>
        </DialogHeader>
        <Separator />
        <AddSessionProgressForm
          defaultBatchId={batchId}
          defaultCourseAutoId={courseAutoId}
          onProgressAdded={onProgressAdded} // Pass the callback
        />
      </DialogContent>
    </Dialog>
  );
}
