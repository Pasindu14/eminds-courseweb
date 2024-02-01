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
import { motion } from "framer-motion";
import { BadgeForm } from "./badge_form";

export function AddBadgeDialog() {
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
            <DialogTitle className="text-3xl">Add Badge</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <Separator />
          <BadgeForm />
        </DialogContent>
      </Dialog>
    </motion.div>
  );
}
