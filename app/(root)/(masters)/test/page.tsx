"use client";
import { Button } from "@/components/ui/button";
import transporter from "@/utils/mail.util";
import React from "react";

const page = () => {
  const sendEmail = async () => {
    const info = await transporter.sendMail({
      from: '"Course Web Admin" <admin@courseweb.eminds.com.au>', // sender address
      to: "pasindu14@gmail.com", // recipient's email
      subject: "Test Email from Course Web Admin",
      text: "This is a plain text test message.",
      html: "<h1>This is a test email</h1><p>Sent from the Course Web Admin.</p>",
    });
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
