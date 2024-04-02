"use client";

import { motion } from "framer-motion";
import React, { useCallback, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ZoomComponent from "./zoom_component";
import { signOut, useSession } from "next-auth/react";
import { getSessionValidity } from "@/server/actions/auth.action";
import AccountRestrictionComponent from "./account_restriction_component";
import StudentGuideComponent from "./student_guide";

const StudentDetails = ({
  studentData,
  batchData,
}: {
  studentData: any;
  batchData: any;
}) => {
  const { data: session }: any = useSession();

  const validateSession = useCallback(async () => {
    if (session) {
      const result = await getSessionValidity(session.id, session.accessToken);
      if (result == false) {
        signOut();
      }
    }
  }, [session]);

  useEffect(() => {
    validateSession();
  }, [validateSession]);

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

          <Button asChild className="rounded-xl md:w-[200px]">
            <Link href="/zoom" target="_blank">
              Live Class
            </Link>
          </Button>
        </div>
      )}
    </motion.div>
  );
};

export default StudentDetails;
