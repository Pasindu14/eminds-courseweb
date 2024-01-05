import Link from "next/link";
import { Control, useController } from "react-hook-form";

import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import React, { useEffect, useMemo, useState } from "react";
import { fetchCourses } from "@/server/actions/course.actions";
import { Course } from "@/server/types/course.type";

type CourseSelectProps = {
  control: Control<any>;
  name: string;
};

const CourseSelect = ({ control, name }: CourseSelectProps) => {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchCourses();
      setCourses(data);
    };

    fetchData();
  }, []);

  return (
    <div>
      <FormField
        control={control}
        name={name}
        render={({ field }) => (
          <FormItem>
            <FormLabel>Course</FormLabel>
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Select a course" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {courses.map((course) => (
                  <SelectItem
                    key={course.auto_id}
                    value={course.auto_id!.toString()}
                  >
                    {course.course_name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default CourseSelect;
