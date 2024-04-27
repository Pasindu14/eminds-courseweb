"use client";
import React, { useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";
import { toastError } from "@/lib/toast/toast";
import { useRouter } from "next/navigation";
import { studentDashboardPath } from "@/constants/paths";
import { Loader } from "@/lib/spinners";

const SelectionComponent = ({ courses }: { courses: any }) => {
  const [coursePassword, setCoursePassword] = useState<any>(undefined);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async () => {
    setLoading(true);
    try {
      const res = await signIn("credentials", {
        redirect: false,
        username: "0711803296",
        password: coursePassword,
        callbackUrl: studentDashboardPath,
      });

      if (res?.ok === false) {
        if (res?.error == "CredentialsSignin") {
          toastError("Invalid credentials please try again!");
        } else {
          toastError(res.error ?? "Invalid credentials please try again!");
        }
        setLoading(false);
      } else {
        router.replace(studentDashboardPath);
      }
    } catch (error: any) {
      setLoading(false);
      toastError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <div className="w-full flex items-center justify-center">
        <Select onValueChange={(value) => setCoursePassword(value)}>
          <SelectTrigger className="max-w-xl">
            <SelectValue placeholder="Choose your course" />
          </SelectTrigger>
          <SelectContent>
            {courses.map((course: any) => (
              <SelectItem
                value={course.batches.password}
                key={course.batches.password}
              >
                {course.batches.courses.course_name +
                  " - " +
                  course.batches.batch_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={handleSubmit}
        disabled={(coursePassword == undefined ? true : false) || loading}
        className="mt-4"
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <p> Go To Dashboard </p>
            <Loader size={13} />
          </div>
        ) : (
          " Go To Dashboard"
        )}
      </Button>
    </>
  );
};

export default SelectionComponent;
