"use client";
import { Button } from "@/components/ui/button";
import transporter from "@/utils/mail.util";
import React from "react";

const page = () => {
  const sendEmail = async () => {
    try {
      const asd = await fetch("/api/testemail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
      });
      console.log("Email sent successfully", asd);
    } catch (error) {
      console.error("Error sending email:", error);
    }
  };

  return (
    <div>
      <Button type="button" onClick={sendEmail}>
        Click
      </Button>
    </div>
  );
};

export default page;
