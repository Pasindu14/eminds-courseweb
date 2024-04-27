"use client";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import { useState, useEffect } from "react";

const WelcomeAlertDialog = () => {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Retrieve the dialog show count from localStorage
    const isShowDialog = localStorage.getItem("isShowDialog");

    if (!isShowDialog) {
      setIsOpen(true); // Open the dialog if it has been shown less than 3 times
      localStorage.setItem("isShowDialog", "true"); // Increment the show count
    }
  }, []);

  if (!isOpen) {
    return null;
  }

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>Open</DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-red-500">
            Did you change your password?
          </DialogTitle>
          <DialogDescription className="text-black">
            Create your own password using the key icon in the top right corner
            to prevent your account from getting blocked.
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeAlertDialog;
