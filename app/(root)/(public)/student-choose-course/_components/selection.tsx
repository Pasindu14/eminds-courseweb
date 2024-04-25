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

const SelectionComponent = ({ courses }: { courses: any }) => {
  const [coursePassword, setCoursePassword] = useState<any>(undefined);

  const handleSubmit = async () => {
    console.log(coursePassword);
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
                {course.batches.courses.course_name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <Button
        className="mt-4"
        disabled={coursePassword == undefined ? true : false}
        onClick={handleSubmit}
      >
        Go To Dashboard
      </Button>
    </>
  );
};

export default SelectionComponent;
