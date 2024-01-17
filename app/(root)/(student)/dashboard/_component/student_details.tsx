"use client";

import { motion } from "framer-motion";
import React from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ZoomComponent from "./zoom_component";

const StudentDetails = ({
  studentData,
  batchData,
}: {
  studentData: any;
  batchData: any;
}) => {
  return (
    <motion.div initial={{ opacity: 0, y: -50 }} animate={{ opacity: 1, y: 0 }}>
      {studentData && (
        <div className="text-xl flex flex-col gap-3">
          <h1>Name: {studentData.name}</h1>
          <h1>Phone: {studentData.phonenumber}</h1>
          <h1>NIC: {studentData.nic}</h1>
          <h1>Address: {studentData.address}</h1>
          <h1>Email: {studentData.email}</h1>
          <h1>Birth Day: {studentData.birthday}</h1>

          <ZoomComponent />
        </div>
      )}
    </motion.div>
  );
};

export default StudentDetails;
