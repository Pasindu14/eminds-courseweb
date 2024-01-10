"use client";
import { Button } from "@/components/ui/button";
import { addPaymentByAdmin } from "@/server/actions/payments.actions";
import React from "react";

const TestPAy = () => {
  const onClick = async () => {
    /*  const result = await addPaymentByAdmin(11, 10, 2000); 

    console.log(result);*/
  };

  return (
    <div>
      <Button onClick={onClick}>Click</Button>
    </div>
  );
};

export default TestPAy;
